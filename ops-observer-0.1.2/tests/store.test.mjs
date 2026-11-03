import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync,rmSync,writeFileSync,readFileSync,symlinkSync,statSync} from 'node:fs';
import {join} from 'node:path';
import {tmpdir} from 'node:os';
import {Store} from '../src/store.mjs';
import {markdown} from '../src/report.mjs';
const now=1793412000000,day=86400000;
const good={ok:true,code:'OK',latencyMs:12,observed:{release:'1178f9f9fee070d6d3a868085cffac80a8877d5e'}};
const bad={ok:false,code:'NETWORK',latencyMs:50,observed:{}};
function setup(t){const dir=mkdtempSync(join(tmpdir(),'kip-ops-test-'));const file=join(dir,'ops.sqlite');t.after(()=>rmSync(dir,{recursive:true,force:true}));return {dir,file,store:new Store(file)};}
function put(s,r,time=now,id='health'){
 assert.equal(s.acquireLease('writer',time,60000,{force:true}),true);
 try{return s.record(id,r,time,'writer');}finally{s.releaseLease('writer');}
}
const check=(s,t=now)=>s.report(t).checks.find(x=>x.id==='health');

test('one failure degrades, second opens one incident, repeated failures stay on it',t=>{
 const {store:s}=setup(t);t.after(()=>s.close());
 assert.equal(put(s,bad),null);assert.equal(check(s).status,'DEGRADED');
 const event=put(s,bad,now+1);assert.equal(event?.type,'OPEN');
 for(let i=2;i<12;i++)assert.equal(put(s,bad,now+i),null);
 const r=s.report(now+12);assert.equal(r.incidents.length,1);assert.equal(r.events.length,1);assert.equal(r.incidents[0].failures,12);assert.equal(check(s,now+12).status,'INCIDENT');
});
test('recovery requires two successes and subsequent outage opens a distinct incident',t=>{
 const {store:s}=setup(t);t.after(()=>s.close());put(s,bad);const a=put(s,bad,now+1);
 assert.equal(put(s,good,now+2),null);assert.equal(check(s,now+2).status,'RECOVERING');
 const b=put(s,good,now+3);assert.equal(b?.type,'RECOVERED');assert.equal(b.incidentId,a.incidentId);assert.equal(check(s,now+3).status,'HEALTHY');
 put(s,bad,now+4);const c=put(s,bad,now+5);assert.notEqual(c.incidentId,a.incidentId);
});
test('restart persists counters and incident identity without replaying events',t=>{
 const {store:s,file}=setup(t);put(s,bad);s.close();const b=new Store(file);t.after(()=>b.close());
 const event=put(b,bad,now+1);assert.equal(event?.type,'OPEN');const id=event.incidentId;
 assert.equal(put(b,bad,now+2),null);assert.equal(b.report(now+2).incidents[0].id,id);assert.equal(b.report(now+2).events.length,1);assert.equal(statSync(file).mode&0o777,0o600);
});
test('stale last success reports UNKNOWN while preserving last observation',t=>{
 const {store:s}=setup(t);t.after(()=>s.close());put(s,good);assert.equal(check(s).status,'HEALTHY');
 const c=check(s,now+605001);assert.equal(c.status,'UNKNOWN');assert.equal(c.lastCode,'OK');
});
test('aborted work never becomes a target failure',t=>{
 const {store:s}=setup(t);t.after(()=>s.close());assert.throws(()=>put(s,{...bad,code:'ABORTED'}));assert.equal(s.report(now).sampleCount,0);
});
test('two independent DB handles cannot own the same cycle, even when staggered',t=>{
 const {store:a,file}=setup(t),b=new Store(file);t.after(()=>{a.close();b.close();});
 assert.equal(a.acquireLease('a',now,60000),true);assert.equal(b.acquireLease('b',now+100,60000),false);a.releaseLease('a');
 assert.equal(b.acquireLease('b',now+100000,60000),false);assert.equal(b.acquireLease('b',now+300000,60000),true);
});
test('crashed lease expires but next scheduled time and stale-owner fencing are respected',t=>{
 const {store:a,file}=setup(t),b=new Store(file);t.after(()=>{a.close();b.close();});a.acquireLease('a',now,60000);
 assert.equal(b.acquireLease('b',now+60001,60000),false);
 assert.equal(b.acquireLease('b',now+300000,60000),true);assert.throws(()=>a.record('health',good,now+300001,'a'));assert.equal(b.hasLease('b',now+300001),true);
});
test('clock rollback cannot cause extra requests or steal the lease',t=>{
 const {store:s}=setup(t);t.after(()=>s.close());s.acquireLease('a',now,60000);s.releaseLease('a');assert.equal(s.acquireLease('b',now-5000,60000,{force:true}),false);
});
test('retention removes old samples and resolved incidents but keeps open incidents',t=>{
 const {store:s}=setup(t);t.after(()=>s.close());put(s,bad);put(s,bad,now+1);put(s,good,now+2);put(s,good,now+3);
 put(s,bad,now+4,'release');put(s,bad,now+5,'release');
 put(s,good,now+181*day);const r=s.report(now+181*day);assert.equal(r.sampleCount,1);assert.equal(r.incidents.length,1);assert.equal(r.incidents[0].checkId,'release');assert.equal(r.incidents[0].resolvedAt,null);
});
test('raw response details never enter storage or owner report',t=>{
 const {store:s,file}=setup(t);t.after(()=>s.close());put(s,{...good,secret:'PRIVATE_KEY',observed:{...good.observed,email:'SECRET_EMAIL',raw:'SECRET_BODY'}});
 const r=s.report(now);assert.ok(!JSON.stringify(r).includes('SECRET'));assert.ok(!readFileSync(file).includes(Buffer.from('PRIVATE_KEY')));
 assert.match(markdown(r),/WIB/);assert.match(markdown(r),/health/);
});
test('corrupt storage is rejected without replacing existing bytes',t=>{
 const {store:s,file}=setup(t);s.close();writeFileSync(file,'corrupt private database');assert.throws(()=>new Store(file));assert.equal(readFileSync(file,'utf8'),'corrupt private database');
});
test('symlink storage is rejected and readonly report cannot create a missing database',t=>{
 const {store:s,dir,file}=setup(t);s.close();const alias=join(dir,'alias.sqlite');symlinkSync(file,alias);assert.throws(()=>new Store(alias));assert.throws(()=>new Store(join(dir,'missing.sqlite'),{readOnly:true}));
});
test('observer heartbeat is independent of whether target is healthy',t=>{
 const {store:s}=setup(t);t.after(()=>s.close());s.acquireLease('a',now,60000);s.record('health',bad,now,'a');s.record('release',bad,now,'a');s.completeCycle('a',now+1);s.releaseLease('a');
 assert.equal(s.report(now+2).observer.status,'HEALTHY');assert.equal(s.report(now+605002).observer.status,'UNKNOWN');
});

test('an existing database truncated to zero bytes fails closed without recreating history',t=>{
 const {store:s,file}=setup(t);put(s,good);s.close();writeFileSync(file,'');
 assert.throws(()=>new Store(file));assert.equal(readFileSync(file).length,0);
});
test('an existing v1 database with a missing table is rejected rather than repaired as empty',async t=>{
 const {store:s,file}=setup(t);put(s,good);s.close();const {DatabaseSync}=await import('node:sqlite');const db=new DatabaseSync(file);db.exec('DROP TABLE observations');db.close();
 assert.throws(()=>new Store(file));const check=new DatabaseSync(file,{readOnly:true});try{assert.equal(check.prepare("SELECT count(*) n FROM sqlite_master WHERE name='observations'").get().n,0);}finally{check.close();}
});
