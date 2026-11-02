import test from 'node:test';import assert from 'node:assert/strict';import {mkdtempSync,rmSync} from 'node:fs';import {tmpdir} from 'node:os';import {join} from 'node:path';import {randomUUID} from 'node:crypto';import {makeSkills} from '../server/skills.mjs';
const api=await import('../server/tasks.mjs').catch(()=>({})),runners=await import('../server/task-runners.mjs').catch(()=>({}));
function fixture(t){const dir=mkdtempSync(join(tmpdir(),'tasks-'));let now=1770000000000;const skills=makeSkills({path:join(dir,'skills.json'),clock:()=>now});t.after(()=>rmSync(dir,{recursive:true,force:true}));return {dir,skills,clock:()=>now,advance:ms=>now+=ms};}
test('task is durable and idempotent; request reuse with different content conflicts',t=>{
 assert.equal(typeof api.makeTasks,'function');const f=fixture(t),path=join(f.dir,'tasks.sqlite'),q=api.makeTasks({path,clock:f.clock}),requestId=randomUUID();t.after(()=>q.close());
 const req=runners.createTaskRequest(f.skills.read(),{taskId:'health-check',requestId}),job=q.enqueue(req);assert.equal(job.status,'queued');assert.equal(q.enqueue(req).id,job.id);assert.throws(()=>q.enqueue({...req,taskId:'release-check'}),{code:'REQUEST_ID_CONFLICT'});
 const reopened=api.makeTasks({path,clock:f.clock});assert.equal(reopened.list().jobs.length,1);reopened.close();
});
test('leases recover interrupted work and stale workers cannot complete recovered tasks',t=>{
 assert.equal(typeof api.makeTasks,'function');const f=fixture(t),q=api.makeTasks({path:join(f.dir,'tasks.sqlite'),clock:f.clock});t.after(()=>q.close());
 const job=q.enqueue(runners.createTaskRequest(f.skills.read(),{taskId:'capacity-check',requestId:randomUUID()})),first=q.claim();assert.equal(first.id,job.id);assert.equal(q.claim(),null);f.advance(31000);q.recover();const second=q.claim();assert.equal(second.id,job.id);assert.notEqual(second.leaseToken,first.leaseToken);assert.equal(q.finish(first.id,first.leaseToken,{status:'completed',summary:'stale'}),false);assert.equal(q.finish(second.id,second.leaseToken,{status:'completed',summary:'latest',evidence:[],nextSteps:[]}),true);assert.equal(q.list().jobs[0].result.summary,'latest');
});
test('execution is limited to installed active skill and real fresh evidence',async t=>{
 assert.equal(typeof runners.executeTask,'function');const f=fixture(t),state=f.skills.read();const request=runners.createTaskRequest(state,{taskId:'health-check',requestId:randomUUID()});assert.throws(()=>runners.createTaskRequest(state,{taskId:'run-shell',requestId:randomUUID()}));
 const role={id:'health',status:'HEALTHY',freshness:'current',lastAt:f.clock(),maxAgeMs:605000,source:'observer',scope:'HTTP probe',evidence:['HTTP OK'],blocker:''};
 const result=await runners.executeTask(request,{registry:state,readRoles:()=>({roles:[role]}),clock:f.clock});assert.equal(result.status,'completed');assert.match(result.summary,/layanan/i);assert.equal(result.externalActions,false);
 const old=await runners.executeTask(request,{registry:state,readRoles:()=>({roles:[{...role,lastAt:f.clock()-700000}]}),clock:f.clock});assert.equal(old.status,'blocked');
 const changed=structuredClone(state);changed.skills.find(s=>s.id===request.skill.id).versions[0].instructions+=' changed';assert.equal((await runners.executeTask(request,{registry:changed,readRoles:()=>({roles:[role]}),clock:f.clock})).status,'blocked');
 const missing=structuredClone(state);missing.agents.find(a=>a.id==='health').installedSkills=[];assert.throws(()=>runners.createTaskRequest(missing,{taskId:'health-check',requestId:randomUUID()}));
});
