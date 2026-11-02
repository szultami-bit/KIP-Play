import {randomBytes,createHash} from 'node:crypto';

const COOKIE='__Host-kip_office';
const FLOW_COOKIE='__Host-kip_google';
const digest=value=>createHash('sha256').update(value).digest('hex');
export class AuthError extends Error{constructor(code,status=401,retryAfter){super(code);this.code=code;this.status=status;this.retryAfter=retryAfter;}}
export function makeAuth({origin,supabaseUrl,publishableKey,allowedEmail,allowedUserId,fetcher=fetch,clock=Date.now}){
 const site=new URL(origin),provider=new URL(supabaseUrl);
 if(site.protocol!=='https:'||site.pathname!=='/'||site.search||site.hash||site.username||site.password||provider.protocol!=='https:'||provider.pathname!=='/'||provider.search||provider.hash||provider.username||provider.password||provider.port||!provider.hostname.endsWith('.supabase.co')||!publishableKey||!allowedEmail||!allowedUserId)throw Error('AUTH_CONFIGURATION_REQUIRED');
 const email=allowedEmail.trim().toLowerCase(),sessions=new Map(),flows=new Map();let attempts=[],googleAttempts=[],loginPending=false;
 const clearCookie=`${COOKIE}=; Path=/; Secure; HttpOnly; SameSite=Lax; Max-Age=0`;
 const clearFlowCookie=`${FLOW_COOKIE}=; Path=/; Secure; HttpOnly; SameSite=Lax; Max-Age=0`;
 const prune=()=>{const now=clock();attempts=attempts.filter(at=>at>now-900000&&at<=now);googleAttempts=googleAttempts.filter(at=>at>now-900000&&at<=now);for(const map of [sessions,flows])for(const [key,s] of map)if(now>=s.expiresAt||now<s.createdAt)map.delete(key);};
 const keyFrom=(req,name=COOKIE)=>{const matches=(req.headers.cookie||'').split(';').map(s=>s.trim()).filter(s=>s.startsWith(name+'='));if(matches.length!==1)return null;const value=matches[0].slice(name.length+1);return /^[A-Za-z0-9_-]{43}$/.test(value)?digest(value):null;};
 const permitted=user=>user?.id===allowedUserId&&typeof user.email==='string'&&user.email.toLowerCase()===email&&!!user.email_confirmed_at&&!user.is_anonymous&&!user.factors?.some(f=>f.status==='verified')&&!(user.banned_until&&Date.parse(user.banned_until)>clock());
 async function request(path,{method='GET',body,token}={}){
  let response;try{response=await fetcher(provider.origin+'/auth/v1'+path,{method,headers:{apikey:publishableKey,'Content-Type':'application/json',...(token?{Authorization:'Bearer '+token}:{})},body:body?JSON.stringify(body):undefined,redirect:'error',signal:AbortSignal.timeout(7000)});}catch{throw new AuthError('AUTH_UNAVAILABLE',503);}
  if(!response.ok){if(response.status===429)throw new AuthError('TRY_LATER',429,60);if(response.status>=500)throw new AuthError('AUTH_UNAVAILABLE',503);throw new AuthError('ACCESS_DENIED',401);}
  if(response.status===204)return null;
  const reader=response.body?.getReader();if(!reader)throw new AuthError('AUTH_UNAVAILABLE',503);let size=0;const chunks=[];
  try{for(;;){const {done,value}=await reader.read();if(done)break;size+=value.length;if(size>65536){await reader.cancel();throw new Error();}chunks.push(value);}}catch{throw new AuthError('AUTH_UNAVAILABLE',503);}
  try{return JSON.parse(Buffer.concat(chunks).toString('utf8'));}catch{throw new AuthError('AUTH_UNAVAILABLE',503);}
 }
 async function revoke(token){try{await request('/logout?scope=local',{method:'POST',token});}catch{/* Local office session is already invalidated. Never sign out other KIP sessions. */}}
 async function establish(req,data,{google=false}={}){
  const token=data?.access_token;
  try{
   if(typeof token!=='string'||!token||token.length>16000||!Number.isFinite(data.expires_in)||data.expires_in<=0)throw new AuthError('AUTH_UNAVAILABLE',503);
   const user=await request('/user',{token});
   if(!permitted(user)||(google&&!user.identities?.some(identity=>identity.provider==='google')))throw new AuthError('ACCESS_DENIED',401);
   const now=clock(),expiresAt=Math.min(now+Math.min(3600,data.expires_in)*1000,Number.isFinite(data.expires_at)?data.expires_at*1000:Infinity);if(expiresAt<=now)throw new AuthError('ACCESS_DENIED',401);
   const previous=keyFrom(req);if(previous)sessions.delete(previous);
   while(sessions.size>=12)sessions.delete(sessions.keys().next().value);
   const value=randomBytes(32).toString('base64url');sessions.set(digest(value),{token,createdAt:now,expiresAt,checkedAt:now,pending:null});
   return {cookie:`${COOKIE}=${value}; Path=/; Secure; HttpOnly; SameSite=Lax; Max-Age=${Math.floor((expiresAt-now)/1000)}`,expiresAt,email};
  }catch(error){if(typeof token==='string'&&token&&token.length<=16000)await revoke(token);throw error;}
 }
 const api={
  origin:site.origin,host:site.host,clearCookie,clearFlowCookie,
  sameOrigin(req){return req.headers.origin===site.origin&&(!req.headers['sec-fetch-site']||req.headers['sec-fetch-site']==='same-origin');},
  async login(req,{email:submitted,password}){
   prune();if(loginPending||attempts.length>=8){const retry=attempts.length>=8?Math.ceil((attempts[0]+900000-clock())/1000):2;throw new AuthError('TRY_LATER',429,Math.max(1,retry));}
   attempts.push(clock());
   if(typeof submitted!=='string'||submitted.trim().toLowerCase()!==email||typeof password!=='string'||!password||password.length>128)throw new AuthError('ACCESS_DENIED',401);
   loginPending=true;
   try{
    return await establish(req,await request('/token?grant_type=password',{method:'POST',body:{email,password}}));
   }finally{loginPending=false;}
  },
  startGoogle(req){
   prune();if(googleAttempts.length>=12)throw new AuthError('TRY_LATER',429,Math.max(1,Math.ceil((googleAttempts[0]+900000-clock())/1000)));
   googleAttempts.push(clock());const old=keyFrom(req,FLOW_COOKIE);if(old)flows.delete(old);
   const value=randomBytes(32).toString('base64url'),verifier=randomBytes(48).toString('base64url'),now=clock();
   while(flows.size>=12)flows.delete(flows.keys().next().value);
   flows.set(digest(value),{verifier,createdAt:now,expiresAt:now+300000});
   const url=new URL(provider.origin+'/auth/v1/authorize');
   url.search=new URLSearchParams({provider:'google',redirect_to:site.origin+'/auth/callback',code_challenge:createHash('sha256').update(verifier).digest('base64url'),code_challenge_method:'s256',scopes:'openid',prompt:'select_account'}).toString();
   // The browser receives only an opaque flow cookie and public S256 challenge.
   // The verifier stays server-side; a code from another browser cannot be exchanged.
   return {url:url.href,cookie:`${FLOW_COOKIE}=${value}; Path=/; Secure; HttpOnly; SameSite=Lax; Max-Age=300`};
  },
  async finishGoogle(req,params){
   prune();const key=keyFrom(req,FLOW_COOKIE),flow=key&&flows.get(key);
   if(!flow)throw new AuthError('GOOGLE_EXPIRED',401);
   flows.delete(key); // Single use, also on cancellation, malformed response or provider failure.
   if(params.has('error'))throw new AuthError('GOOGLE_CANCELLED',401);
   const codes=params.getAll('code');
   if(codes.length!==1||!/^[a-zA-Z0-9._~-]{1,512}$/.test(codes[0]))throw new AuthError('GOOGLE_EXPIRED',401);
   return establish(req,await request('/token?grant_type=pkce',{method:'POST',body:{auth_code:codes[0],code_verifier:flow.verifier}}),{google:true});
  },
  async session(req){
   prune();const key=keyFrom(req),session=key&&sessions.get(key);if(!session)return null;
   if(clock()-session.checkedAt>=30000){
    if(!session.pending)session.pending=(async()=>{try{if(!permitted(await request('/user',{token:session.token}))){sessions.delete(key);return;}session.checkedAt=clock();}catch(error){if(error.status===401)sessions.delete(key);else throw error;}finally{session.pending=null;}})();
    await session.pending;
   }
   if(!sessions.has(key)||clock()>=session.expiresAt)return null;
   return {email,expiresAt:session.expiresAt};
  },
  async growthSummary(req){
   // A single fixed aggregate RPC. No credential getter, arbitrary URL, or customer directory.
   if(!await api.session(req))throw new AuthError('ACCESS_DENIED',401);
   const key=keyFrom(req),session=key&&sessions.get(key);if(!session)throw new AuthError('ACCESS_DENIED',401);
   let response;try{response=await fetcher(provider.origin+'/rest/v1/rpc/eu_office_growth_summary',{method:'POST',headers:{apikey:publishableKey,Authorization:'Bearer '+session.token,'Content-Type':'application/json'},body:'{}',redirect:'error',signal:AbortSignal.timeout(5000)});}catch{throw new AuthError('GROWTH_UNAVAILABLE',503);}
   if(!response.ok)throw new AuthError('GROWTH_UNAVAILABLE',503);
   const reader=response.body?.getReader();if(!reader)throw new AuthError('GROWTH_UNAVAILABLE',503);let size=0;const chunks=[];
   try{for(;;){const {done,value}=await reader.read();if(done)break;size+=value.length;if(size>16384){await reader.cancel();throw Error();}chunks.push(value);}return JSON.parse(Buffer.concat(chunks).toString('utf8'));}catch{throw new AuthError('GROWTH_UNAVAILABLE',503);}
  },
  async logout(req){const key=keyFrom(req),session=key&&sessions.get(key);if(key)sessions.delete(key);const flowKey=keyFrom(req,FLOW_COOKIE);if(flowKey)flows.delete(flowKey);if(session)await revoke(session.token);}
 };
 return api;
}
