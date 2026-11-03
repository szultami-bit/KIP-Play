import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync,rmSync,writeFileSync} from 'node:fs';
import {join} from 'node:path';
import {tmpdir} from 'node:os';
import {spawnSync,spawn} from 'node:child_process';
import {once} from 'node:events';
import {Store} from '../src/store.mjs';
import {loadConfig} from '../src/config.mjs';
import {cycle} from '../src/runner.mjs';
const config=loadConfig(),now=1793412000000;
const good={ok:true,code:'OK',latencyMs:1,observed:{release:config.expected.release}};
function setup(t){const dir=mkdtempSync(join(tmpdir(),'kip-run-test-')),file=join(dir,'ops.sqlite');t.after(()=>rmSync(dir,{recursive:true,force:true}));return {dir,file,s:new Store(file)};}
test('one scheduled cycle uses exactly two probes; repeated invocations do not poll early',async t=>{
 const {s}=setup(t);t.after(()=>s.close());let calls=0;const logs=[];
 const opts={now:()=>now,probe:async()=>{calls++;return good;},log:x=>logs.push(x)};
 assert.equal((await cycle(s,config,opts)).status,'complete');assert.equal(calls,2);assert.equal(s.report(now).sampleCount,2);
 assert.equal((await cycle(s,config,opts)).status,'skipped');assert.equal(calls,2);assert.equal(logs.filter(x=>x.type==='CYCLE').length,1);
});
test('competing cycles cannot issue duplicate requests during an await',async t=>{
 const {s,file}=setup(t),other=new Store(file);t.after(()=>{s.close();other.close();});let calls=0,release;
 const gate=new Promise(r=>{release=r;});const first=cycle(s,config,{owner:'first',now:()=>now,log:()=>{},probe:async()=>{calls++;await gate;return good;}});
 await new Promise(r=>setImmediate(r));assert.equal((await cycle(other,config,{owner:'second',now:()=>now,probe:async()=>{calls++;return good;}})).status,'skipped');release();await first;assert.equal(calls,2);
});
test('abort prevents second probe and does not fabricate a failure or heartbeat',async t=>{
 const {s}=setup(t);t.after(()=>s.close());const controller=new AbortController();let calls=0;
 const r=await cycle(s,config,{now:()=>now,signal:controller.signal,probe:async()=>{calls++;controller.abort();return {...good,ok:false,code:'ABORTED'};}});
 assert.equal(r.status,'aborted');assert.equal(calls,1);assert.equal(s.report(now).sampleCount,0);assert.equal(s.report(now).observer.status,'UNKNOWN');assert.equal(s.acquireLease('after',now,60000,{force:true}),true);
});
test('lease expiry during first probe discards result and prevents second probe',async t=>{
 const {s}=setup(t);t.after(()=>s.close());let clock=now,calls=0;
 await assert.rejects(cycle(s,config,{now:()=>clock,probe:async()=>{calls++;clock+=61000;return good;}}),/Lease/);assert.equal(calls,1);assert.equal(s.report(clock).sampleCount,0);
});
test('storage write failure prevents any network request',async t=>{
 const {s,file}=setup(t);s.close();const read=new Store(file,{readOnly:true});t.after(()=>read.close());let calls=0;
 await assert.rejects(cycle(read,config,{now:()=>now,probe:async()=>{calls++;return good;}}));assert.equal(calls,0);
});
const main=new URL('../src/main.mjs',import.meta.url).pathname;
const noFetch='data:text/javascript,globalThis.fetch=()=>{process.exit(77)}';
test('CLI report and healthcheck are offline and do not confuse target failure with observer failure',t=>{
 const {s,file}=setup(t),time=Date.now();s.acquireLease('seed',time,60000);for(const id of ['health','release'])s.record(id,{...good,ok:false,code:'NETWORK'},time,'seed');s.completeCycle('seed',time);s.releaseLease('seed');s.close();
 const run=args=>spawnSync(process.execPath,['--import',noFetch,main,...args,'--state',file],{encoding:'utf8'});
 const report=run(['report','--json']);assert.equal(report.status,0,report.stderr);assert.equal(JSON.parse(report.stdout).checks[0].status,'DEGRADED');assert.equal(run(['healthcheck']).status,0);
 assert.match(run(['report']).stdout,/WIB/);
});
test('CLI rejects uninitialized, corrupt storage and unknown arguments',t=>{
 const {s,file,dir}=setup(t);s.close();writeFileSync(file,'DO_NOT_REPLACE');
 for(const args of [['report','--state',join(dir,'missing.sqlite')],['check','--state',file],['check','--url','https://elsewhere.invalid']]){
  const r=spawnSync(process.execPath,['--import',noFetch,main,...args],{encoding:'utf8'});assert.equal(r.status,2);assert.ok(!r.stderr.includes('DO_NOT_REPLACE'));
 }
});
test('SIGTERM interrupts in-flight work, exits and leaves no invented outage',async t=>{
 const {s,file}=setup(t);s.close();const fake='data:text/javascript,globalThis.fetch=()=>new Promise(()=>{})';
 const child=spawn(process.execPath,['--import',fake,main,'run','--state',file],{stdio:['ignore','pipe','pipe']});let output='';child.stdout.on('data',x=>{output+=x;});child.stderr.resume();
 t.after(()=>{if(child.exitCode===null)child.kill('SIGKILL');});
 const ended=once(child,'exit');
 for(let i=0;i<500&&!output.includes('STARTED')&&child.exitCode===null;i++)await new Promise(r=>setTimeout(r,10));
 assert.match(output,/STARTED/);child.kill('SIGTERM');const [code]=await ended;assert.equal(code,0);
 const result=new Store(file,{readOnly:true});try{assert.equal(result.report().sampleCount,0);}finally{result.close();}
});

test('CLI cannot poll after history has been truncated',t=>{
 const {s,file}=setup(t);s.close();writeFileSync(file,'');
 const r=spawnSync(process.execPath,['--import',noFetch,main,'check','--state',file],{encoding:'utf8'});assert.equal(r.status,2);
});

test('SQLITE_FULL during result persistence rolls back history and stops remaining probes',async t=>{
 const {s}=setup(t);t.after(()=>s.close());
 const pages=s.db.prepare('PRAGMA page_count').get().page_count;s.db.exec('PRAGMA max_page_count='+pages);
 let full=false;
 for(let i=0;i<1000;i++){
  s.acquireLease('seed',now,60000,{force:true});
  try{s.record('health',good,now,'seed');}catch(e){assert.match(e.message,/full/);full=true;break;}finally{s.releaseLease('seed');}
 }
 assert.equal(full,true);const before=s.report(now).sampleCount;let calls=0;const logs=[];
 await assert.rejects(cycle(s,config,{force:true,now:()=>now,log:e=>logs.push(e),probe:async()=>{calls++;return good;}}),/full/);
 assert.equal(calls,1);assert.equal(s.report(now).sampleCount,before);assert.equal(logs.length,0);
});
