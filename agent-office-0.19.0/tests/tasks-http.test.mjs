import test from 'node:test';import assert from 'node:assert/strict';import {mkdtempSync,writeFileSync,rmSync} from 'node:fs';import {tmpdir} from 'node:os';import {join} from 'node:path';import {randomUUID} from 'node:crypto';import {makeServer} from '../server/http.mjs';import {makeSkills} from '../server/skills.mjs';import {makeTasks} from '../server/tasks.mjs';import {makeTaskWorker} from '../server/task-worker.mjs';
test('owner-only HTTP enqueues once, runs with evidence and returns stored result without leases',async t=>{
 const dir=mkdtempSync(join(tmpdir(),'jobs-http-'));writeFileSync(join(dir,'index.html'),'test');const skills=makeSkills({path:join(dir,'skills.json')}),tasks=makeTasks({path:join(dir,'tasks.sqlite')});
 const auth={host:'127.0.0.1',origin:'https://office.example',session:async req=>req.headers.cookie==='owner=test'?{id:'owner'}:null,sameOrigin:req=>req.headers.origin==='https://office.example',clearCookie:'owner=; Max-Age=0'};
 const readRoles=()=>({roles:[{id:'health',status:'HEALTHY',freshness:'current',lastAt:Date.now(),maxAgeMs:605000,source:'observer',evidence:['HTTP OK']}]});const server=makeServer({directory:dir,readReport:()=>({}),readRoles,auth,skills,tasks});await new Promise(r=>server.listen(0,'127.0.0.1',r));auth.host='127.0.0.1:'+server.address().port;const url='http://'+auth.host;
 t.after(async()=>{await new Promise(r=>server.close(r));tasks.close();rmSync(dir,{recursive:true,force:true});});
 const body=JSON.stringify({taskId:'health-check',requestId:randomUUID()}),headers={cookie:'owner=test','content-type':'application/json',origin:auth.origin};
 assert.equal((await fetch(url+'/api/jobs')).status,401);assert.equal((await fetch(url+'/api/jobs',{method:'POST',headers:{...headers,origin:'https://evil.example'},body})).status,403);
 for(let i=0;i<2;i++)assert.equal((await fetch(url+'/agent-office/api/jobs',{method:'POST',headers,body})).status,202);
 assert.equal((await fetch(url+'/api/jobs',{method:'POST',headers,body:JSON.stringify({...JSON.parse(body),command:'rm'})})).status,400);
 let config=skills.read();skills.update({action:'agent.authority',agentId:'health',level:'advisor',revision:config.revision});
 assert.equal((await fetch(url+'/api/jobs',{method:'POST',headers,body})).status,202);
 config=skills.read();skills.update({action:'agent.remove',agentId:'health',skillId:'service-monitoring',revision:config.revision});
 assert.equal((await fetch(url+'/api/jobs',{method:'POST',headers,body})).status,202);
 assert.equal((await fetch(url+'/api/jobs',{method:'POST',headers,body:JSON.stringify({...JSON.parse(body),taskId:'release-check'})})).status,409);
 config=skills.read();skills.update({action:'agent.install',agentId:'health',skillId:'service-monitoring',revision:config.revision});
 config=skills.read();skills.update({action:'agent.authority',agentId:'health',level:'observer',revision:config.revision});
 const worker=makeTaskWorker({tasks,skills,readRoles});await worker.runOnce();const result=await(await fetch(url+'/api/jobs',{headers})).json();assert.equal(result.jobs.length,1);assert.equal(result.jobs[0].status,'completed');assert.equal(result.jobs[0].result.externalActions,false);assert.equal('leaseToken'in result.jobs[0],false);assert.equal(result.worker.status,'running');assert.equal(result.catalog.length,3);
});
