import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {randomUUID} from 'node:crypto';
import {makeSkills} from '../server/skills.mjs';
import {makeTasks} from '../server/tasks.mjs';
import {makeTaskWorker} from '../server/task-worker.mjs';
import {createTaskRequest,executeTask} from '../server/task-runners.mjs';
const at=Date.parse('2026-11-02T12:00:00Z'),fingerprint='a'.repeat(64);
function snapshot(){return {schemaVersion:1,source:'VPS_ROOM_LIFECYCLE',fingerprint,heartbeatAt:at,lastCycleAt:at-1000,intervalMs:60000,singleExecutor:true,policy:'CREATED_GT_3H_VERIFIED_IDLE',coverage:[{backend:'dragon',status:'COVERED'},{backend:'monster',status:'NOT_COVERED'}],counts:{inspected:10,closed:2,failed:1,unknown:3,skipped:4}};}
function fixture(t){const dir=mkdtempSync(join(tmpdir(),'expiry-task-'));t.after(()=>rmSync(dir,{recursive:true,force:true}));const skills=makeSkills({path:join(dir,'skills.json'),clock:()=>at});return {dir,skills,registry:skills.read()};}
const request=registry=>createTaskRequest(registry,{taskId:'room-expiry-check',requestId:randomUUID()});
const release=()=>({fingerprint,observedAt:at});
test('room expiry report runs through durable Office worker using existing health agent',async t=>{
 const {dir,skills,registry}=fixture(t),tasks=makeTasks({path:join(dir,'tasks.sqlite'),clock:()=>at});t.after(()=>tasks.close());
 const job=request(registry);assert.equal(job.agentId,'health');tasks.enqueue(job);tasks.enqueue(job);
 const worker=makeTaskWorker({tasks,skills,clock:()=>at,readRoomExpirySnapshot:snapshot,readRoomExpiryRelease:release});await worker.runOnce();
 const jobs=tasks.list().jobs;assert.equal(jobs.length,1);assert.equal(jobs[0].status,'completed');assert.equal(jobs[0].result.jobState,'ACTIVE');assert.equal(jobs[0].result.finding,'PARTIAL');
 assert.deepEqual(jobs[0].result.metrics,{inspected:10,closed:2,failed:1,unknown:3,skipped:4});assert.equal(jobs[0].result.externalActions,false);assert.equal(jobs[0].result.evidenceAt,at-1000);
 const reopened=makeTasks({path:join(dir,'tasks.sqlite'),clock:()=>at});assert.equal(reopened.list().jobs[0].result.metrics.closed,2);reopened.close();
});
test('missing source and reader errors stay BLOCKED with UNKNOWN counts, never zero or leaked error',async t=>{
 const {registry}=fixture(t),job=request(registry);
 for(const readRoomExpirySnapshot of [undefined,()=>null,()=>{throw Error('private-token');}]){
  const r=await executeTask(job,{registry,clock:()=>at,readRoomExpirySnapshot,readRoomExpiryRelease:release});assert.equal(r.status,'blocked');assert.equal(r.jobState,'BLOCKED');assert.equal(r.metrics,null);assert(!JSON.stringify(r).includes('private-token'));
 }
});
test('stale, future, inconsistent, ambiguous or sensitive runner evidence cannot claim ACTIVE',async t=>{
 const {registry}=fixture(t),job=request(registry);
 for(const change of [s=>({...s,heartbeatAt:at-60001}),s=>({...s,lastCycleAt:at+1}),s=>({...s,lastCycleAt:at-120001}),s=>({...s,singleExecutor:false}),s=>({...s,policy:'CLOSE_ALL'}),s=>({...s,fingerprint:'b'.repeat(64)}),s=>({...s,counts:{...s.counts,closed:-1}}),s=>({...s,counts:{...s.counts,inspected:11}}),s=>({...s,counts:{...s.counts,unknown:null}}),s=>({...s,email:'private-email'}),s=>({...s,coverage:[]}),s=>({...s,coverage:[{backend:'dragon',status:'NOT_COVERED'}]}),s=>({...s,coverage:[...s.coverage,s.coverage[0]]}),s=>({...s,coverage:[{backend:'private-room-id',status:'COVERED'}]})]){
  const r=await executeTask(job,{registry,clock:()=>at,readRoomExpirySnapshot:()=>change(snapshot()),readRoomExpiryRelease:release});assert.equal(r.status,'blocked');assert.equal(r.metrics,null);assert(!JSON.stringify(r).includes('private-'));
 }
});
test('live deployment proof is mandatory and skill revocation still blocks the task',async t=>{
 const {registry}=fixture(t),job=request(registry);
 for(const readRoomExpiryRelease of [undefined,()=>({fingerprint,observedAt:at-60001}),()=>({fingerprint,observedAt:at+1}),()=>({fingerprint:'b'.repeat(64),observedAt:at})]){
  const r=await executeTask(job,{registry,clock:()=>at,readRoomExpirySnapshot:snapshot,readRoomExpiryRelease});assert.equal(r.status,'blocked');assert.equal(r.metrics,null);
 }
 registry.agents.find(a=>a.id==='health').installedSkills=[];
 const r=await executeTask(job,{registry,clock:()=>at,readRoomExpirySnapshot:snapshot,readRoomExpiryRelease:release});assert.equal(r.status,'blocked');
});
test('freshness is evaluated after both reads, including time spent fetching evidence',async t=>{
 const {registry}=fixture(t),job=request(registry);let now=at;
 const r=await executeTask(job,{registry,clock:()=>now,readRoomExpirySnapshot:async()=>{now=at+500;return {...snapshot(),heartbeatAt:now,lastCycleAt:now};},readRoomExpiryRelease:async()=>{now=at+1000;return {fingerprint,observedAt:now};}});
 assert.equal(r.status,'completed');assert.equal(r.checkedAt,at+1000);
 now=at;
 const old=await executeTask(job,{registry,clock:()=>now,readRoomExpirySnapshot:snapshot,readRoomExpiryRelease:async()=>{now=at+60001;return {fingerprint,observedAt:now};}});
 assert.equal(old.status,'blocked');assert.equal(old.metrics,null);
});
