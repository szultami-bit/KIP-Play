import assert from 'node:assert/strict';
import {mkdtempSync,rmSync,readFileSync} from 'node:fs';import {tmpdir} from 'node:os';import {join} from 'node:path';import {createHash,randomUUID} from 'node:crypto';
import {makeSkills} from '../server/skills.mjs';import {makeTasks} from '../server/tasks.mjs';import {makeTaskWorker} from '../server/task-worker.mjs';import {createTaskRequest} from '../server/task-runners.mjs';
const statePath=process.env.REGISTRY_SOURCE||'/source/skills.json',bytes=readFileSync(statePath),hash=b=>createHash('sha256').update(b).digest('hex'),source=JSON.parse(bytes);
assert.equal(source.schemaVersion,2);assert(source.agents.some(a=>a.id==='instagram-admin'));assert(source.skills.some(s=>s.id==='instagram-dm-support'));
const dir=mkdtempSync(join(tmpdir(),'office019-proof-'));
try{
 const skills=makeSkills({path:join(dir,'skills.json')}),path=join(dir,'tasks.sqlite');let tasks=makeTasks({path});
 tasks.enqueue(createTaskRequest(skills.read(),{taskId:'health-check',requestId:randomUUID()}));const interrupted=tasks.claim();assert(interrupted);tasks.close();
 tasks=makeTasks({path,clock:()=>Date.now()+31000});tasks.recover();assert.equal(tasks.list().jobs[0].status,'queued');tasks.close();
 tasks=makeTasks({path});const record={eventId:randomUUID(),game:'lucky-wheel',mode:'live',release:'019-pilot-1',kind:'runtime',errorClass:'TypeError',asset:'live.mjs',line:1,column:1};tasks.incident(record);tasks.incident(record);
 const readRoles=()=>({roles:[{id:'health',status:'HEALTHY',freshness:'current',lastAt:Date.now(),maxAgeMs:605000,source:'isolated-runtime-fixture',evidence:['Synthetic isolated fixture; not live service evidence.']}]});
 const worker=makeTaskWorker({tasks,skills,readRoles});await worker.runOnce();await worker.runOnce();assert.equal(tasks.list().jobs.length,2);assert(tasks.list().jobs.every(j=>j.status==='completed'));assert.equal(tasks.incidents().issues[0].occurrences,1);tasks.close();
 tasks=makeTasks({path});assert.equal(tasks.list().jobs.length,2);tasks.close();assert.equal(hash(readFileSync(statePath)),hash(bytes));
 console.log(JSON.stringify({type:'OPS019_RUNTIME_PROBE',status:'PASS',version:'0.19.0',isolated:true,ownerRegistryUnchanged:true,agents:source.agents.length,revision:source.revision,tests:['durable-reopen','lease-recovery','incident-dedup','coordinator-routing','stored-results'],ownerAcceptance:'BLOCKED',gamePilotDeployment:'NOT_RUN',liveGameDiagnosis:'NOT_PROVEN'}));
}finally{rmSync(dir,{recursive:true,force:true});}
