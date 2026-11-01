import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync,writeFileSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {makeAuth} from '../server/auth.mjs';
import {makeServer} from '../server/http.mjs';
import {validateGrowth,growthEnvelope,growthRole,makeGrowthReader} from '../server/growth.mjs';
const at=Date.parse('2026-11-01T01:00:00Z');
function fixture(now=at){const day=new Date(now+25200000).toISOString().slice(0,10),start=Date.parse(day+'T00:00:00+07:00');return {schemaVersion:1,source:'SUPABASE_AGGREGATE',sourceVersion:'growth-v1',observedAt:now,period:{timezone:'Asia/Pontianak',localDate:day,startAt:start,endAt:start+86400000},counts:{registeredToday:2,totalRegistered:107,activeToday:3,recent5m:1,excludedTestAccounts:0},coverage:{scope:'PUBLIC_ACCOUNTS',activity:'OBSERVED_DEVICE_ACTIVITY',activityWindowMinutes:5,testExclusion:'MARKED_ONLY'},anomalies:{invalidRegistrationTimes:0,futureActivityTimes:0}};}
test('growth retains true zeros and becomes historical after TTL or local midnight',()=>{
 const zero=fixture();for(const key of Object.keys(zero.counts))zero.counts[key]=0;
 assert.equal(growthRole(growthEnvelope(zero,at),at).metrics.totalRegistered,0);
 assert.equal(growthEnvelope(zero,at+120000).status,'ACTIVE');assert.equal(growthEnvelope(zero,at+120001).status,'HISTORICAL');
 const midnight=Date.parse('2026-11-01T17:00:00Z'),near=fixture(midnight-1);near.counts.activeToday=0;assert.doesNotThrow(()=>validateGrowth(near,midnight));assert.equal(growthEnvelope(near,midnight).status,'HISTORICAL');
});
test('invalid counts, private fields, future time, timezone and anomalies fail closed',()=>{
 const mutators=[r=>r.counts.totalRegistered=-1,r=>r.counts.activeToday=108,r=>r.counts.recent5m=1.2,r=>r.counts.registeredToday=Infinity,r=>r.email='private',r=>r.observedAt=at+1,r=>r.period.timezone='UTC',r=>r.period.localDate='2026-11-02',r=>r.anomalies.futureActivityTimes=1,r=>r.coverage.activity='ONLINE'];
 for(const mutate of mutators){const r=fixture();mutate(r);assert.throws(()=>validateGrowth(r,at),/INVALID_GROWTH_REPORT/);assert.equal(growthRole({schemaVersion:1,status:'ACTIVE',report:r},at).status,'UNKNOWN');}
});
test('reader coalesces concurrent reads, caches 60 seconds and recovers synchronous load failure',async()=>{
 let now=at,calls=0,fail=false;const reader=makeGrowthReader({clock:()=>now,load:()=>{calls++;if(fail)throw Error('private');return fixture(now);}});
 await Promise.all([reader({}),reader({}),reader({})]);assert.equal(calls,1);now+=59999;await reader({});assert.equal(calls,1);
 now++;fail=true;const bad=await reader({});assert.equal(bad.status,'UNKNOWN');assert(!JSON.stringify(bad).includes('private'));assert.equal(calls,2);
 now+=60000;fail=false;assert.equal((await reader({})).status,'ACTIVE');assert.equal(calls,3);
 now-=100000;assert.equal((await reader({})).status,'ACTIVE');assert.equal(calls,4);
});
test('reader refreshes across WIB midnight even inside the cache interval',async()=>{
 let now=Date.parse('2026-11-01T16:59:50Z'),calls=0;const reader=makeGrowthReader({clock:()=>now,load:()=>{calls++;return fixture(now);}});
 await reader({});now+=10000;const r=await reader({});assert.equal(calls,2);assert.equal(r.report.period.localDate,'2026-11-02');
});
test('old-day source response cannot bypass retry budget after midnight',async()=>{
 let now=Date.parse('2026-11-01T16:59:50Z'),calls=0;const yesterday=fixture(now);
 const reader=makeGrowthReader({clock:()=>now,load:()=>{calls++;return yesterday;}});
 await reader({});now+=10000;
 assert.equal((await reader({})).status,'HISTORICAL');assert.equal(calls,2);
 for(let i=0;i<5;i++){now+=1000;assert.equal((await reader({})).status,'HISTORICAL');}
 assert.equal(calls,2);now+=55000;await reader({});assert.equal(calls,3);
});
test('growth transport requires genuine office session and uses only fixed aggregate RPC',async()=>{
 let now=at,calls=[],huge=false;const auth=makeAuth({origin:'https://agent.example.com',supabaseUrl:'https://example.supabase.co',publishableKey:'public-test-key',allowedEmail:'owner@example.com',allowedUserId:'owner-id',clock:()=>now,fetcher:async(url,options)=>{
  calls.push({url,options});if(url.endsWith('/token?grant_type=password'))return Response.json({access_token:'private-test-token',expires_in:3600});
  if(url.endsWith('/auth/v1/user'))return Response.json({id:'owner-id',email:'owner@example.com',email_confirmed_at:'2026-01-01'});
  if(url.endsWith('/rest/v1/rpc/eu_office_growth_summary'))return huge?new Response('x'.repeat(16385)):Response.json(fixture(now));
  if(url.endsWith('/logout?scope=local'))return new Response(null,{status:204});throw Error('unexpected');
 }});
 await assert.rejects(auth.growthSummary({headers:{}}),{code:'ACCESS_DENIED'});assert.equal(calls.length,0);
 const login=await auth.login({headers:{}},{email:'owner@example.com',password:'fixture-password'}),req={headers:{cookie:login.cookie.split(';')[0]}};
 assert.equal((await auth.growthSummary(req)).counts.totalRegistered,107);const rpc=calls.at(-1);assert.equal(rpc.url,'https://example.supabase.co/rest/v1/rpc/eu_office_growth_summary');assert.equal(rpc.options.body,'{}');assert.equal(rpc.options.redirect,'error');
 assert(!JSON.stringify(login).includes('private-test-token'));huge=true;await assert.rejects(auth.growthSummary(req),{code:'GROWTH_UNAVAILABLE'});await auth.logout(req);await assert.rejects(auth.growthSummary(req),{code:'ACCESS_DENIED'});
});
test('HTTP growth and role overlay reject anonymous access, preserve legacy report and never leak source errors',async t=>{
 const dir=mkdtempSync(join(tmpdir(),'kip-growth-'));writeFileSync(join(dir,'index.html'),'fixture');let reads=0,fail=false;
 const auth={host:'127.0.0.1',origin:'https://agent.example.com',clearCookie:'fixture=; Max-Age=0; HttpOnly',session:async req=>req.headers.cookie==='valid-fixture'?{email:'owner@example.com'}:null};
 const server=makeServer({directory:dir,auth,clock:()=>at,readReport:()=>({source:'observer',checks:[{id:'health'}]}),readRoles:()=>({roles:[{id:'capacity',status:'HEALTHY'},{id:'growth',status:'ACTIVE',scope:'Pilot drafts'},{id:'growth-stats',status:'UNKNOWN'}]}),readGrowth:async()=>{reads++;if(fail)throw Error('private failure');return growthEnvelope(fixture(),at);}});
 await new Promise(r=>server.listen(0,'127.0.0.1',r));auth.host='127.0.0.1:'+server.address().port;const url='http://'+auth.host;
 t.after(async()=>{await new Promise(r=>server.close(r));rmSync(dir,{recursive:true,force:true});});
 for(const path of ['/api/growth','/api/roles'])assert.equal((await fetch(url+path)).status,401);assert.equal(reads,0);
 const options={headers:{cookie:'valid-fixture'}};const response=await fetch(url+'/api/growth',options);assert.equal(response.headers.get('cache-control'),'private, no-store');assert.equal((await response.json()).report.counts.totalRegistered,107);
 const roles=await(await fetch(url+'/api/roles',options)).json();assert.equal(roles.roles[0].status,'HEALTHY');assert.deepEqual(roles.roles[1],{id:'growth',status:'ACTIVE',scope:'Pilot drafts'});assert.equal(roles.roles[2].id,'growth-stats');assert.equal(roles.roles[2].metrics.activeToday,3);
 const legacy=await(await fetch(url+'/api/report',options)).json();assert.deepEqual(legacy,{source:'observer',checks:[{id:'health'}]});
 assert.equal((await fetch(url+'/api/growth',{...options,method:'POST'})).status,405);
 fail=true;const bad=await(await fetch(url+'/api/growth',options)).json();assert.equal(bad.status,'UNKNOWN');assert(!JSON.stringify(bad).includes('private failure'));
});
