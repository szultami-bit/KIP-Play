import test from 'node:test';import assert from 'node:assert/strict';import {mkdtempSync,writeFileSync,rmSync} from 'node:fs';import {tmpdir} from 'node:os';import {join} from 'node:path';import {makeServer} from '../server/http.mjs';import {makeSkills} from '../server/skills.mjs';
test('real HTTP protects registry and persists create/test/activate through prefixed API',async t=>{
 const dir=mkdtempSync(join(tmpdir(),'skills-http-')),path=join(dir,'skills.json');writeFileSync(join(dir,'index.html'),'test');
 const auth={host:'127.0.0.1',origin:'https://office.example',session:async req=>req.headers.cookie==='owner=test'?{id:'owner'}:null,sameOrigin:req=>req.headers.origin==='https://office.example',clearCookie:'owner=; Max-Age=0'};
 const server=makeServer({directory:dir,readReport:()=>({}),auth,skills:makeSkills({path})});await new Promise(r=>server.listen(0,'127.0.0.1',r));auth.host='127.0.0.1:'+server.address().port;const url='http://'+auth.host;
 t.after(async()=>{await new Promise(r=>server.close(r));rmSync(dir,{recursive:true,force:true});});
 assert.equal((await fetch(url+'/api/skills')).status,401);
 const headers={cookie:'owner=test','content-type':'application/json',origin:auth.origin};let state=await(await fetch(url+'/agent-office/api/skills',{headers})).json();assert.equal(state.schemaVersion,2);
 const original=state.skills[0],{version,createdAt,validation,...value}=original.versions[0];
 const denied=await fetch(url+'/api/skills',{method:'POST',headers:{...headers,origin:'https://evil.example'},body:JSON.stringify({action:'skill.create',revision:state.revision,value:{id:'http-test',...value}})});assert.equal(denied.status,403);
 for(const action of [{action:'skill.create',value:{id:'http-test',...value}},{action:'candidate.test',skillId:'http-test',version:1},{action:'candidate.activate',skillId:'http-test',version:1}]){const r=await fetch(url+'/agent-office/api/skills',{method:'POST',headers,body:JSON.stringify({...action,revision:state.revision})});assert.equal(r.status,200);state=await r.json();}
 assert.equal(makeSkills({path}).read().skills.at(-1).activeVersion,1);
 const stale=await fetch(url+'/api/skills',{method:'POST',headers,body:JSON.stringify({action:'candidate.create',skillId:'http-test',revision:0})});assert.equal(stale.status,409);
});
