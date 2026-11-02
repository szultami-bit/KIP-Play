import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync,writeFileSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {createHash} from 'node:crypto';
import {request} from 'node:http';
import {makeAuth} from '../server/auth.mjs';
import {makeServer} from '../server/http.mjs';
const config={origin:'https://agent.example.com',supabaseUrl:'https://example.supabase.co',publishableKey:'public-test-key',allowedEmail:'owner@example.com',allowedUserId:'owner-id'};
function provider(){
 const state={now:1700000000000,user:{id:'owner-id',email:'owner@example.com',email_confirmed_at:'2023-01-01'},calls:[],fail:false,authCodes:new Map()};
 state.auth=makeAuth({...config,clock:()=>state.now,fetcher:async(url,options)=>{
  state.calls.push({url,options});if(state.fail)throw Error('provider-secret');
  if(url.includes('/token?grant_type=pkce')){const body=JSON.parse(options.body);if(state.authCodes.get(body.auth_code)!==createHash('sha256').update(body.code_verifier).digest('base64url'))return Response.json({error:'bad pkce'},{status:400});state.authCodes.delete(body.auth_code);return Response.json({access_token:'private-provider-token',refresh_token:'private-refresh-token',provider_token:'private-google-token',expires_in:3600});}
  if(url.includes('/token?')){const body=JSON.parse(options.body);if(body.password!=='valid-test-password')return Response.json({error:'bad'}, {status:400});return Response.json({access_token:'private-provider-token',refresh_token:'private-refresh-token',expires_in:3600});}
  if(url.endsWith('/user'))return Response.json(state.user);
  if(url.endsWith('/logout?scope=local'))return new Response(null,{status:204});
  throw Error('unexpected provider route');
 }});return state;
}
const anonymous={headers:{}};
async function login(state,email='owner@example.com',password='valid-test-password'){return state.auth.login(anonymous,{email,password});}
function cookieReq(result){return {headers:{cookie:result.cookie.split(';')[0]}};}
test('only canonical verified owner identity is accepted; provider credentials stay server-side',async()=>{
 const s=provider();const r=await login(s,' OWNER@EXAMPLE.COM ');assert.equal(r.email,'owner@example.com');assert.match(r.cookie,/^__Host-kip_office=[A-Za-z0-9_-]{43}; Path=\/; Secure; HttpOnly; SameSite=Lax; Max-Age=3600$/);assert(!JSON.stringify(r).includes('provider-token'));assert(!JSON.stringify(r).includes('refresh-token'));assert.equal((await s.auth.session(cookieReq(r))).email,'owner@example.com');assert.equal(s.calls.length,2);assert.equal(s.calls[0].options.headers.apikey,'public-test-key');assert.equal(JSON.parse(s.calls[0].options.body).email,'owner@example.com');
});
test('email outside allowlist is rejected before contacting auth provider',async()=>{const s=provider();await assert.rejects(login(s,'other@example.com'),{code:'ACCESS_DENIED'});assert.equal(s.calls.length,0);});
test('user metadata cannot grant access; UUID, verified email, anonymous, MFA and bans checked',async()=>{
 for(const change of [{id:'other-id',user_metadata:{email:'owner@example.com'}},{email:'other@example.com'},{email_confirmed_at:null},{is_anonymous:true},{factors:[{status:'verified',factor_type:'totp'}]},{banned_until:'2099-01-01'}]){
  const s=provider();Object.assign(s.user,change);await assert.rejects(login(s),{code:'ACCESS_DENIED'});assert(s.calls.at(-1).url.endsWith('/logout?scope=local'));
 }
});
test('forged, duplicated, expired and pre-restart cookies cannot grant access',async()=>{
 const s=provider();const r=await login(s);assert.equal(await s.auth.session({headers:{cookie:'__Host-kip_office='+'a'.repeat(43)}}),null);assert.equal(await s.auth.session({headers:{cookie:r.cookie.split(';')[0]+'; '+r.cookie.split(';')[0]}}),null);assert.equal(await provider().auth.session(cookieReq(r)),null);s.now+=3600001;assert.equal(await s.auth.session(cookieReq(r)),null);
});
test('identity is rechecked after 30s and provider failures fail closed',async()=>{
 const s=provider();const r=await login(s);s.now+=30001;s.fail=true;await assert.rejects(s.auth.session(cookieReq(r)),{status:503});s.fail=false;s.user.email='other@example.com';assert.equal(await s.auth.session(cookieReq(r)),null);assert.equal(await s.auth.session(cookieReq(r)),null);
});
test('logout invalidates immediately and revokes only this provider session',async()=>{const s=provider();const r=await login(s);await s.auth.logout(cookieReq(r));assert.equal(await s.auth.session(cookieReq(r)),null);assert(s.calls.at(-1).url.endsWith('/logout?scope=local'));assert.match(s.auth.clearCookie,/Max-Age=0/);});
test('login budget is bounded and recovers after 15 minutes',async()=>{const s=provider();for(let i=0;i<8;i++)await assert.rejects(login(s,'other@example.com'),{status:401});await assert.rejects(login(s),e=>e.status===429&&e.retryAfter===900);s.now+=900001;assert((await login(s)).cookie);});
test('origin is exact and cross-site requests rejected',()=>{const s=provider();assert(s.auth.sameOrigin({headers:{origin:config.origin,'sec-fetch-site':'same-origin'}}));for(const headers of [{},{origin:'https://evil.example'},{origin:config.origin,'sec-fetch-site':'cross-site'},{origin:config.origin+'.evil'}])assert.equal(s.auth.sameOrigin({headers}),false);});
async function setup(t){
 const s=provider(),dir=mkdtempSync(join(tmpdir(),'kip-auth-'));for(const [name,content] of Object.entries({'index.html':'PRIVATE OFFICE','login.html':'LOGIN GATE','login.js':'public login','private.js':'private asset'}))writeFileSync(join(dir,name),content);
 let reads=0;const server=makeServer({directory:dir,auth:s.auth,readReport:()=>{reads++;return {source:'observer'};}});await new Promise(r=>server.listen(0,'127.0.0.1',r));t.after(async()=>{await new Promise(r=>server.close(r));rmSync(dir,{recursive:true,force:true});});
 const call=(path,{method='GET',body,headers={}}={})=>new Promise((resolve,reject)=>{const req=request({hostname:'127.0.0.1',port:server.address().port,path,method,headers:{Host:'agent.example.com',...headers}},res=>{const chunks=[];res.on('data',c=>chunks.push(c));res.on('end',()=>resolve({status:res.statusCode,headers:res.headers,body:Buffer.concat(chunks).toString()}));});req.on('error',reject);if(body!==undefined)req.write(body);req.end();});return {s,call,reads:()=>reads};
}
test('HTTP denies anonymous reports/assets/alternate host and never reads observer before auth',async t=>{
 const {call,reads}=await setup(t);assert.equal((await call('/')).body,'LOGIN GATE');assert.equal((await call('/index.html')).body,'LOGIN GATE');assert.equal((await call('/login.js')).status,200);for(const path of ['/api/report','/private.js','/auth/session','/%2eenv','/agent-office/api/report']){assert.equal((await call(path)).status,401);assert.equal((await call(path,{method:'HEAD'})).status,401);}assert.equal((await call('/api/report',{headers:{Host:'srv2091961.hstgr.cloud'}})).status,401);const old=await call('/',{headers:{Host:'srv2091961.hstgr.cloud'}});assert.equal(old.status,308);assert.equal(old.headers.location,config.origin+'/');assert.equal(reads(),0);assert.equal(JSON.parse((await call('/healthz')).body).access,'owner-only');
});
test('HTTP password login, authenticated office/report/session, logout and cookie replay',async t=>{
 const {call}=await setup(t),headers={Origin:config.origin,'Content-Type':'application/json'};const r=await call('/auth/login',{method:'POST',headers,body:JSON.stringify({email:'owner@example.com',password:'valid-test-password'})});assert.equal(r.status,200);assert.deepEqual(Object.keys(JSON.parse(r.body)).sort(),['expiresAt','ok']);const cookie=r.headers['set-cookie'][0].split(';')[0];assert.equal((await call('/',{headers:{Cookie:cookie}})).body,'PRIVATE OFFICE');const report=await call('/api/report',{headers:{Cookie:cookie}});assert.equal(report.status,200);assert.match(report.headers['cache-control'],/private, no-store/);assert.equal(report.headers.vary,'Cookie');assert.equal(JSON.parse((await call('/auth/session',{headers:{Cookie:cookie}})).body).email,'owner@example.com');assert.equal((await call('/auth/logout',{method:'POST',headers:{Origin:config.origin,Cookie:cookie}})).status,200);assert.equal((await call('/api/report',{headers:{Cookie:cookie}})).status,401);
});
test('HTTP rejects CSRF, malformed/oversized bodies, methods and bad password without leaking errors',async t=>{
 const {call,s}=await setup(t),good={Origin:config.origin,'Content-Type':'application/json'};assert.equal((await call('/auth/login',{method:'POST',body:'{}'})).status,403);assert.equal((await call('/auth/logout',{method:'POST',headers:{Origin:'https://evil.example'}})).status,403);assert.equal((await call('/auth/login',{method:'POST',headers:{Origin:config.origin},body:'{}'})).status,415);assert.equal((await call('/auth/login',{method:'POST',headers:good,body:'{'})).status,400);assert.equal((await call('/auth/login',{method:'POST',headers:{...good,'Content-Length':5000},body:'x'.repeat(5000)})).status,413);assert.equal((await call('/api/deploy',{method:'POST',headers:good,body:'{}'})).status,405);assert.equal((await call('/auth/login',{method:'PUT'})).status,405);const body=JSON.stringify({email:'owner@example.com',password:'invalid'});assert.equal((await call('/auth/login',{method:'POST',headers:good,body})).status,401);s.fail=true;const fail=await call('/auth/login',{method:'POST',headers:good,body:body.replace('invalid','valid-test-password')});assert.equal(fail.status,503);assert(!fail.body.includes('provider-secret'));
});
test('missing or insecure production auth configuration cannot start a public office',()=>{assert.throws(()=>makeServer({directory:'.',readReport:()=>({})}),/AUTH_CONFIGURATION_REQUIRED/);assert.throws(()=>makeAuth({...config,origin:'http://agent.example.com'}));assert.throws(()=>makeAuth({...config,publishableKey:''}));assert.throws(()=>makeAuth({...config,supabaseUrl:'https://supabase.co.evil.example'}));});

function googleFlow(s,code='valid-google-code',req=anonymous){const r=s.auth.startGoogle(req);s.authCodes.set(code,new URL(r.url).searchParams.get('code_challenge'));return r;}
function googleUser(s){s.user.identities=[{provider:'google'}];}
test('Google starts S256 PKCE with fixed callback and opaque short-lived host cookie',()=>{
 const s=provider(),r=googleFlow(s),u=new URL(r.url);assert.equal(u.origin,config.supabaseUrl);assert.equal(u.pathname,'/auth/v1/authorize');assert.equal(u.searchParams.get('provider'),'google');assert.equal(u.searchParams.get('redirect_to'),config.origin+'/auth/callback');assert.equal(u.searchParams.get('code_challenge_method'),'s256');assert.equal(u.searchParams.get('scopes'),'openid');assert.equal(u.searchParams.get('prompt'),'select_account');assert.match(u.searchParams.get('code_challenge'),/^[A-Za-z0-9_-]{43}$/);assert.equal(u.searchParams.has('code_verifier'),false);assert.equal(u.searchParams.has('access_type'),false);assert.match(r.cookie,/^__Host-kip_google=[A-Za-z0-9_-]{43}; Path=\/; Secure; HttpOnly; SameSite=Lax; Max-Age=300$/);assert.equal(s.calls.length,0);
});
test('Google verifies PKCE and canonical owner before minting an office session',async()=>{
 const s=provider();googleUser(s);const flow=googleFlow(s);const result=await s.auth.finishGoogle(cookieReq(flow),new URLSearchParams({code:'valid-google-code'}));assert.equal((await s.auth.session(cookieReq(result))).email,config.allowedEmail);assert(!JSON.stringify(result).includes('private-'));assert.equal(s.calls.length,2);assert.equal(s.calls[0].url,config.supabaseUrl+'/auth/v1/token?grant_type=pkce');assert.equal(s.calls[1].url,config.supabaseUrl+'/auth/v1/user');await assert.rejects(s.auth.finishGoogle(cookieReq(flow),new URLSearchParams({code:'valid-google-code'})),{code:'GOOGLE_EXPIRED'});
});
test('Google rejects missing, duplicated, forged, expired and restarted flow cookies before exchange',async()=>{
 for(const scenario of ['missing','duplicate','forged','expired','restart']){let s=provider();googleUser(s);const flow=googleFlow(s);let req=cookieReq(flow);if(scenario==='missing')req=anonymous;if(scenario==='duplicate')req={headers:{cookie:req.headers.cookie+'; '+req.headers.cookie}};if(scenario==='forged')req={headers:{cookie:'__Host-kip_google='+'a'.repeat(43)}};if(scenario==='expired')s.now+=300001;if(scenario==='restart')s=provider();await assert.rejects(s.auth.finishGoogle(req,new URLSearchParams({code:'valid-google-code'})),{code:'GOOGLE_EXPIRED'});assert.equal(s.calls.length,0);}
});
test('a code from a different browser cannot be exchanged with the victim flow',async()=>{
 const s=provider();googleUser(s);const first=googleFlow(s,'code-one'),second=googleFlow(s,'code-two');assert.notEqual(first.cookie,second.cookie);await assert.rejects(s.auth.finishGoogle(cookieReq(second),new URLSearchParams({code:'code-one'})),{code:'ACCESS_DENIED'});assert.equal(await s.auth.session(cookieReq(second)),null);await assert.rejects(s.auth.finishGoogle(cookieReq(second),new URLSearchParams({code:'code-two'})),{code:'GOOGLE_EXPIRED'});
});
test('Google retains owner allowlist, UUID, verified-email, MFA and linked-provider requirements',async()=>{
 for(const change of [{id:'another-id'},{email:'other@gmail.com'},{email_confirmed_at:null},{is_anonymous:true},{factors:[{status:'verified'}]},{identities:[{provider:'email'}]},{banned_until:'2099-01-01'}]){const s=provider();googleUser(s);Object.assign(s.user,change);const flow=googleFlow(s);await assert.rejects(s.auth.finishGoogle(cookieReq(flow),new URLSearchParams({code:'valid-google-code'})),{code:'ACCESS_DENIED'});assert(s.calls.at(-1).url.endsWith('/logout?scope=local'));}
});
test('cancelled, malformed and failed provider exchanges consume flow without tokens',async()=>{
 for(const value of ['error=access_denied&error_description=private-untrusted','code=a&code=b','','code=%0A']){const s=provider();const flow=googleFlow(s);await assert.rejects(s.auth.finishGoogle(cookieReq(flow),new URLSearchParams(value)));assert.equal(s.calls.length,0);await assert.rejects(s.auth.finishGoogle(cookieReq(flow),new URLSearchParams({code:'valid-google-code'})),{code:'GOOGLE_EXPIRED'});}
 const s=provider(),flow=googleFlow(s);s.fail=true;await assert.rejects(s.auth.finishGoogle(cookieReq(flow),new URLSearchParams({code:'valid-google-code'})),{status:503});s.fail=false;await assert.rejects(s.auth.finishGoogle(cookieReq(flow),new URLSearchParams({code:'valid-google-code'})),{code:'GOOGLE_EXPIRED'});
});
test('new Google attempt and logout invalidate previous pending flow; budget is separate from password',async()=>{
 const s=provider(),first=googleFlow(s),second=googleFlow(s,'new-code',cookieReq(first));await assert.rejects(s.auth.finishGoogle(cookieReq(first),new URLSearchParams({code:'valid-google-code'})),{code:'GOOGLE_EXPIRED'});await s.auth.logout(cookieReq(second));await assert.rejects(s.auth.finishGoogle(cookieReq(second),new URLSearchParams({code:'new-code'})),{code:'GOOGLE_EXPIRED'});for(let i=0;i<10;i++)googleFlow(s);assert.throws(()=>googleFlow(s),{status:429});assert((await login(s)).cookie);s.now+=900001;assert(googleFlow(s).cookie);
});
test('HTTP Google flow rejects CSRF and HEAD callback; successful callback fixes redirect and protects reports',async t=>{
 const {s,call}=await setup(t);googleUser(s);assert.equal((await call('/auth/google',{method:'POST',body:'{}'})).status,403);assert.equal((await call('/auth/google',{method:'POST',headers:{Origin:config.origin,'Sec-Fetch-Site':'cross-site'},body:'{}'})).status,403);assert.equal((await call('/auth/google',{headers:{Host:'old.example.com'}})).status,401);
 const start=await call('/auth/google',{method:'POST',headers:{Origin:config.origin,'Content-Type':'application/json'},body:JSON.stringify({redirectTo:'https://evil.example'})});assert.equal(start.status,200);const flowCookie=start.headers['set-cookie'][0].split(';')[0],u=new URL(JSON.parse(start.body).url);assert.equal(u.searchParams.get('redirect_to'),config.origin+'/auth/callback');s.authCodes.set('http-code',u.searchParams.get('code_challenge'));
 assert.equal((await call('/auth/callback?code=http-code',{method:'HEAD',headers:{Cookie:flowCookie}})).status,405);const r=await call('/auth/callback?code=http-code&next=https://evil.example',{headers:{Cookie:flowCookie}});assert.equal(r.status,303);assert.equal(r.headers.location,'/');assert.equal(r.body,'');assert.equal(r.headers['referrer-policy'],'no-referrer');assert.match(r.headers['cache-control'],/no-store/);const cookie=r.headers['set-cookie'].find(c=>c.startsWith('__Host-kip_office=')).split(';')[0];assert.equal((await call('/api/report',{headers:{Cookie:cookie}})).status,200);assert.equal((await call('/api/report')).status,401);assert.match(r.headers['set-cookie'][0],/Max-Age=0/);
});
test('HTTP callbacks return fixed safe notices, never raw OAuth errors or attacker redirects',async t=>{
 const {call}=await setup(t);const r=await call('/auth/callback?error=evil&error_description=<script>&next=https://evil.example');assert.equal(r.status,303);assert.equal(r.headers.location,'/login.html?notice=GOOGLE_EXPIRED');assert.equal(r.body,'');assert(!JSON.stringify(r.headers).includes('<script>'));assert.equal((await call('/api/report')).status,401);
});
