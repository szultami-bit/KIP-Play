import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync,writeFileSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {makeServer} from '../server/http.mjs';
async function setup(t,readGameplay){
 const directory=mkdtempSync(join(tmpdir(),'gameplay-api-'));writeFileSync(join(directory,'index.html'),'office');
 const auth={host:'127.0.0.1',origin:'https://office.example',clearCookie:'session=; Max-Age=0',session:async req=>req.headers.cookie==='owner=1'?{email:'owner@example.invalid'}:null};
 const server=makeServer({directory,auth,readReport:()=>({}),readGameplay});
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));auth.host='127.0.0.1:'+server.address().port;
 t.after(async()=>{await new Promise(resolve=>server.close(resolve));rmSync(directory,{recursive:true,force:true});});
 return 'http://'+auth.host;
}
test('gameplay evidence is private, read-only, uncached and available under the campus API alias',async t=>{
 let calls=0;const url=await setup(t,()=>({schemaVersion:1,sessions:{completed:++calls},synthetic:{status:'NOT_RUN'}}));
 for(const path of ['/api/gameplay','/agent-office/api/gameplay'])assert.equal((await fetch(url+path)).status,401);
 assert.equal(calls,0);
 for(const path of ['/api/gameplay','/agent-office/api/gameplay']){
  const response=await fetch(url+path,{headers:{cookie:'owner=1'}});assert.equal(response.status,200);assert.match(response.headers.get('cache-control'),/no-store/);
  assert.equal((await response.json()).sessions.completed,calls);
 }
 assert.equal(calls,2);
 assert.equal((await fetch(url+'/api/gameplay',{method:'POST',headers:{cookie:'owner=1'},body:'{}'})).status,405);
 assert.equal(calls,2);
});
test('missing or broken gameplay sources fail closed without leaking internal errors',async t=>{
 for(const reader of [undefined,()=>{throw Error('/private/token.json');}]){
  const url=await setup(t,reader),response=await fetch(url+'/api/gameplay',{headers:{cookie:'owner=1'}});
  assert.equal(response.status,503);assert.deepEqual(await response.json(),{error:'GAMEPLAY_UNAVAILABLE'});
 }
});
