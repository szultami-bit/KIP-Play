import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {loadConfig} from '../src/config.mjs';
import {probe} from '../src/probe.mjs';
import {cycle} from '../src/runner.mjs';
import {Store} from '../src/store.mjs';
const config=loadConfig();
config.expected={...config.expected,release:'ed042a6bc8554264073d41282e312914e865f76d',fingerprint:'be8340a1590dd1beb602d37d094e68e349a023d3a62aa8b88b77743d4aa30ab6'};
const deployment={environment:'production',publicOrigin:'https://games.kampunginggrispontianak.com',supabaseOrigin:'https://lqoaqkhaxprwbwjfbjjt.supabase.co',projectRef:'lqoaqkhaxprwbwjfbjjt',configurationFingerprint:'1d466e8d20bc2297a87d1b325d0897eb483ec89a4b4e4a48222a76a1c777039f'};
const health={ok:true,service:'kip-vps-runtime',release:'ed042a6bc8554264073d41282e312914e865f76d',storage:'sqlite-local',namespaces:11,deployment,roomAdmission:'open',roomAdmissionDetails:{global:false,pausedGames:[],configValid:true}};
const release={schema:1,gate:'kip-release-safety-v1',fingerprint:'be8340a1590dd1beb602d37d094e68e349a023d3a62aa8b88b77743d4aa30ab6',sourceFiles:2181,commit:null,builtAt:'2026-11-01T09:18:07.514Z',passedTests:3313,testFiles:276,deployment,roomAdmission:'open'};
function setup(t){const dir=mkdtempSync(join(tmpdir(),'kip-correlate-'));const store=new Store(join(dir,'ops.sqlite'));t.after(()=>{store.close();rmSync(dir,{recursive:true,force:true});});return store;}
function transport(h,r,calls){return async url=>{calls.push(url);return new Response(JSON.stringify(url.endsWith('/healthz')?h:r),{headers:{'content-type':'application/json'}});};}
async function run(store,time,h=health,r=release,c=config){const calls=[];const result=await cycle(store,c,{now:()=>time,probe:(cfg,check,opts)=>probe(cfg,check,{...opts,fetcher:transport(h,r,calls)})});assert.equal(result.status,'complete');assert.equal(calls.length,2);return result.report;}
test('approved production with null proof commit recovers only after two real paired cycles',async t=>{
 const store=setup(t),at=1793533000000;
 const wrong={...health,release:'a'.repeat(40)};
 await run(store,at,wrong);const incident=await run(store,at+300000,wrong);
 assert.deepEqual(incident.checks.map(c=>c.status),['INCIDENT','INCIDENT']);
 const recovering=await run(store,at+600000);
 assert.deepEqual(recovering.checks.map(c=>c.status),['RECOVERING','RECOVERING']);
 const done=await run(store,at+900000);
 assert.deepEqual(done.checks.map(c=>[c.status,c.lastCode]),[['HEALTHY','OK'],['HEALTHY','OK']]);
 assert.equal(done.sampleCount,8);assert.equal(done.incidents.length,2);
 assert.ok(done.incidents.every(i=>i.resolvedAt===at+900000));
});
test('null proof commit without a verified health result remains rejected',async()=>{
 const result=await probe(config,config.checks[1],{fetcher:transport(health,release,[])});
 assert.equal(result.ok,false);assert.equal(result.code,'UNEXPECTED_RELEASE');
});
test('previous healthy cycle cannot authorize a proof after the current health identity changes',async t=>{
 const store=setup(t),at=1793533000000;await run(store,at);
 const r=await run(store,at+300000,{...health,release:'b'.repeat(40)});
 assert.deepEqual(r.checks.map(c=>c.lastCode),['UNEXPECTED_RELEASE','UNEXPECTED_RELEASE']);
});
test('verified health cannot authorize a wrong fingerprint or an explicit mismatching proof commit',async t=>{
 const store=setup(t);let at=1793533000000;
 for(const bad of [{...release,fingerprint:'c'.repeat(64)},{...release,commit:'d'.repeat(40)},{...release,commit:''},{...release,commit:42}]){
  const r=await run(store,at,health,bad);at+=300000;
  assert.equal(r.checks[0].lastCode,'OK');assert.equal(r.checks[1].lastCode,'UNEXPECTED_RELEASE');
 }
});
test('failed health profile or draining admission cannot supply correlation',async t=>{
 const store=setup(t);let at=1793533000000;
 for(const bad of [{...health,deployment:{...deployment,environment:'staging'}},{...health,roomAdmission:'draining'}]){
  const r=await run(store,at,bad);at+=300000;assert.equal(r.checks[1].lastCode,'UNEXPECTED_RELEASE');
 }
});
test('reordered configured checks still verify health before release without extra requests',async t=>{
 const store=setup(t),r=await run(store,1793533000000,health,release,{...config,checks:[...config.checks].reverse()});
 assert.deepEqual(r.checks.map(c=>c.lastCode),['OK','OK']);
});
test('missing proof gate or test evidence cannot use null-commit correlation',async t=>{
 const store=setup(t);let at=1793533000000;
 for(const bad of [{...release,schema:2},{...release,gate:'other'},{...release,passedTests:0}]){
  const r=await run(store,at,health,bad);at+=300000;assert.equal(r.checks[1].lastCode,'UNEXPECTED_RELEASE');
 }
});
