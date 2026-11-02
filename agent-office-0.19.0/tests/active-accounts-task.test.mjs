import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync,writeFileSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {randomUUID} from 'node:crypto';
import {makeGrowthReader} from '../server/growth.mjs';
import {makeSkills} from '../server/skills.mjs';
import {makeTasks} from '../server/tasks.mjs';
import {makeTaskWorker} from '../server/task-worker.mjs';
import {makeServer} from '../server/http.mjs';
import {createTaskRequest,executeTask} from '../server/task-runners.mjs';
const at=Date.parse('2026-11-02T06:00:00Z');
function raw(){return {schemaVersion:1,source:'SUPABASE_AGGREGATE',sourceVersion:'growth-v1',observedAt:at,period:{timezone:'Asia/Pontianak',localDate:'2026-11-02',startAt:Date.parse('2026-11-01T17:00:00Z'),endAt:Date.parse('2026-11-02T17:00:00Z')},counts:{registeredToday:2,totalRegistered:107,activeToday:3,recent5m:1,excludedTestAccounts:0},coverage:{scope:'PUBLIC_ACCOUNTS',activity:'OBSERVED_DEVICE_ACTIVITY',activityWindowMinutes:5,testExclusion:'MARKED_ONLY'},anomalies:{invalidRegistrationTimes:0,futureActivityTimes:0}};}
function fixture(t){const dir=mkdtempSync(join(tmpdir(),'active-accounts-'));t.after(()=>rmSync(dir,{recursive:true,force:true}));return {dir,skills:makeSkills({path:join(dir,'skills.json'),clock:()=>at})};}
test('existing statistics agent runs a durable owner-requested task; no credential is retained',async t=>{
 const {dir,skills}=fixture(t);writeFileSync(join(dir,'index.html'),'fixture');
 const tasks=makeTasks({path:join(dir,'tasks.sqlite'),clock:()=>at});t.after(()=>tasks.close());
 let loads=0;const readGrowth=makeGrowthReader({clock:()=>at,load:async req=>{assert.equal(req.headers.cookie,'owner=fixture-secret');loads++;return raw();}});
 const auth={host:'127.0.0.1',origin:'https://office.example',clearCookie:'owner=; Max-Age=0',session:async req=>req.headers.cookie==='owner=fixture-secret'?{id:'fixture'}:null,sameOrigin:req=>req.headers.origin==='https://office.example'};
 const server=makeServer({directory:dir,auth,skills,tasks,readGrowth,clock:()=>at});await new Promise(r=>server.listen(0,'127.0.0.1',r));auth.host='127.0.0.1:'+server.address().port;t.after(()=>new Promise(r=>server.close(r)));
 const url='http://'+auth.host+'/api/jobs',body=JSON.stringify({taskId:'active-accounts-check',requestId:randomUUID()}),headers={'content-type':'application/json',origin:auth.origin,cookie:'owner=fixture-secret'};
 assert.equal((await fetch(url,{method:'POST',body,headers:{'content-type':'application/json'}})).status,401);
 assert.equal((await fetch(url,{method:'POST',body,headers:{...headers,origin:'https://evil.example'}})).status,403);assert.equal(loads,0);
 assert.equal((await fetch(url,{method:'POST',body,headers})).status,202);
 assert.equal((await fetch(url,{method:'POST',body,headers})).status,202);
 const worker=makeTaskWorker({tasks,skills,clock:()=>at,readGrowthSnapshot:()=>readGrowth.snapshot()});await worker.runOnce();
 const result=await(await fetch(url,{headers})).json();assert.equal(result.jobs.length,1);const job=result.jobs[0];assert.equal(job.agentId,'growth-stats');assert.equal(job.status,'completed');assert.equal(job.result.finding,'PARTIAL');assert.equal(job.result.metrics.accountsObserved5m,1);assert.equal(job.result.metrics.accountsConfirmedPlaying,null);assert.equal(job.result.metrics.scope,'PUBLIC_ACCOUNTS');assert.equal(job.result.externalActions,false);assert.equal(loads,1);assert(!JSON.stringify(result).includes('fixture-secret'));
 const reopened=makeTasks({path:join(dir,'tasks.sqlite'),clock:()=>at});assert.equal(reopened.list().jobs[0].result.metrics.accountsObserved5m,1);reopened.close();
});
test('missing, stale, future or malformed snapshots block the task instead of reporting zero',async t=>{
 const {skills}=fixture(t),registry=skills.read(),job=createTaskRequest(registry,{taskId:'active-accounts-check',requestId:randomUUID()});
 for(const mutate of [()=>null,r=>({...r,observedAt:at-120001}),r=>({...r,observedAt:at+1}),r=>({...r,email:'private'}),r=>({...r,counts:{...r.counts,recent5m:-1}})]){
  const r=mutate(raw()),result=await executeTask(job,{registry,clock:()=>at,readGrowthSnapshot:()=>r?{schemaVersion:1,status:'ACTIVE',report:r}:null});assert.equal(result.status,'blocked');assert.equal(result.metrics,undefined);assert(!JSON.stringify(result).includes('private'));
 }
});
test('snapshot reads never load credentials, cannot mutate cache, and invalidate on load failure',async()=>{
 let now=at,fail=false,loads=0;const reader=makeGrowthReader({clock:()=>now,load:()=>{loads++;if(fail)throw Error('secret');return raw();}});
 assert.equal(typeof reader.snapshot,'function');assert.equal(reader.snapshot().status,'UNKNOWN');assert.equal(loads,0);
 await reader({});const s=reader.snapshot();s.report.counts.recent5m=99;assert.equal(reader.snapshot().report.counts.recent5m,1);
 now=at+120001;assert.equal(reader.snapshot().status,'HISTORICAL');assert.equal(loads,1);fail=true;await reader({});assert.equal(reader.snapshot().status,'UNKNOWN');assert.equal(loads,2);
});
