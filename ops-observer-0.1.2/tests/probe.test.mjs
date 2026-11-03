import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {validateConfig} from '../src/config.mjs';
import {probe} from '../src/probe.mjs';
const config=JSON.parse(readFileSync(new URL('../config.json',import.meta.url)));
config.expected={...config.expected,release:'ed042a6bc8554264073d41282e312914e865f76d',fingerprint:'be8340a1590dd1beb602d37d094e68e349a023d3a62aa8b88b77743d4aa30ab6'};
const profile={environment:'production',publicOrigin:'https://games.kampunginggrispontianak.com',projectRef:'lqoaqkhaxprwbwjfbjjt',configurationFingerprint:'1d466e8d20bc2297a87d1b325d0897eb483ec89a4b4e4a48222a76a1c777039f'};
const health={ok:true,service:'kip-vps-runtime',storage:'sqlite-local',release:'ed042a6bc8554264073d41282e312914e865f76d',deployment:profile,roomAdmission:'open',secret:'DO_NOT_SAVE_THIS'};
const release={commit:'ed042a6bc8554264073d41282e312914e865f76d',fingerprint:'be8340a1590dd1beb602d37d094e68e349a023d3a62aa8b88b77743d4aa30ab6',deployment:profile,roomAdmission:'open',auditScope:'DO_NOT_SAVE_THIS'};
const response=v=>new Response(JSON.stringify(v),{headers:{'content-type':'application/json'}});
const check=(id,value,options={})=>probe(config,config.checks.find(x=>x.id===id),{fetcher:async()=>response(value),...options});

test('valid production identity succeeds and arbitrary response text is not retained',async()=>{
 const r=await check('health',health);assert.equal(r.ok,true);assert.equal(r.code,'OK');assert.equal(r.observed.release,'ed042a6bc8554264073d41282e312914e865f76d');assert.ok(!JSON.stringify(r).includes('DO_NOT_SAVE_THIS'));
 assert.equal((await check('release',release)).ok,true);
});
test('fetch boundary makes exactly one credential-free GET and refuses redirects',async()=>{
 let calls=0;const r=await check('health',health,{fetcher:async(url,opt)=>{calls++;assert.equal(url,'https://games.kampunginggrispontianak.com/healthz');assert.equal(opt.method,'GET');assert.equal(opt.credentials,'omit');assert.equal(opt.redirect,'error');assert.equal(opt.headers.Authorization,undefined);return response(health);}});
 assert.equal(r.ok,true);assert.equal(calls,1);
});
test('identity and release failures cannot produce green status',async()=>{
 for(const [id,value,code] of [
  ['health',{...health,ok:false},'INVALID_PAYLOAD'],['health',{...health,service:'other'},'IDENTITY_MISMATCH'],
  ['health',{...health,storage:'remote'},'IDENTITY_MISMATCH'],['health',{...health,release:'a'.repeat(40)},'UNEXPECTED_RELEASE'],
  ['release',{...release,fingerprint:'b'.repeat(64)},'UNEXPECTED_RELEASE'],['release',{...release,deployment:{...profile,environment:'staging'}},'UNEXPECTED_PROFILE'],
  ['health',{...health,deployment:{...profile,projectRef:'other'}},'UNEXPECTED_PROFILE'],['health',{...health,roomAdmission:'draining'},'ADMISSION_DRAINING']
 ]){const r=await check(id,value);assert.equal(r.ok,false);assert.equal(r.code,code);}
});
test('configuration cannot redirect traffic or increase polling rate',()=>{
 for(const patch of [{origin:'http://localhost'},{origin:'https://evil.example'},{origin:config.origin+'?x=1'},{intervalMs:1000},{timeoutMs:60000},{maxBytes:10000000},{checks:[{id:'health',path:'/api/rooms/create'}]},{checks:[...config.checks,config.checks[0]]}])assert.throws(()=>validateConfig({...config,...patch}));
 assert.throws(()=>validateConfig({...config,expected:{...config.expected,release:'unapproved'}}));
});
test('HTTP failure has a finite code and does not expose response body',async()=>{
 const r=await check('health',health,{fetcher:async()=>new Response('PRIVATE_TOKEN',{status:503})});assert.equal(r.code,'HTTP_STATUS');assert.equal(r.httpStatus,503);assert.ok(!JSON.stringify(r).includes('PRIVATE_TOKEN'));
});
test('malformed JSON and primitive payloads fail closed',async()=>{
 assert.equal((await check('health',health,{fetcher:async()=>new Response('<html>secret</html>')})).code,'INVALID_JSON');
 for(const v of [null,[],7,'private'])assert.equal((await check('health',v)).code,'INVALID_PAYLOAD');
});
test('oversized response is cancelled without retaining it',async()=>{
 let cancelled=false;const r=await check('health',health,{fetcher:async()=>new Response(new ReadableStream({pull(c){c.enqueue(new Uint8Array(65537));},cancel(){cancelled=true;}}))});
 assert.equal(r.code,'BODY_TOO_LARGE');assert.equal(cancelled,true);
});
test('timeout bounds missing headers even when external transport ignores abort',async()=>{
 const start=Date.now();const r=await check('health',health,{timeoutMs:30,fetcher:()=>new Promise(()=>{})});assert.equal(r.code,'TIMEOUT');assert.ok(Date.now()-start<1000);
});
test('timeout also bounds stalled body after successful headers',async()=>{
 let cancelled=false;const r=await check('health',health,{timeoutMs:30,fetcher:async()=>new Response(new ReadableStream({start(){},cancel(){cancelled=true;}}))});assert.equal(r.code,'TIMEOUT');assert.equal(cancelled,true);
});
test('network errors do not leak secrets embedded in exception messages',async()=>{
 const r=await check('health',health,{fetcher:async()=>{throw Error('SECRET_KEY=user@example.com');}});assert.equal(r.code,'NETWORK');assert.ok(!JSON.stringify(r).includes('SECRET'));
});
test('operator cancellation is distinct from an outage',async()=>{
 const controller=new AbortController();controller.abort();let called=false;const r=await check('health',health,{signal:controller.signal,fetcher:async()=>{called=true;return response(health);}});assert.equal(r.code,'ABORTED');assert.equal(called,false);
});
