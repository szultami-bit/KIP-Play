import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync,writeFileSync,readFileSync,statSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {makeBoard} from '../server/board.mjs';
import {makeServer} from '../server/http.mjs';
import {boardColumn} from '../campus/src/workboard.js';
const now=1800000000000;
const report=()=>({source:'observer',observer:{status:'HEALTHY',lastCycleAt:now},checks:[{id:'health',status:'HEALTHY',lastAt:now,lastCode:'OK'},{id:'release',status:'HEALTHY',lastAt:now,lastCode:'OK'}]});
function setup(t){const dir=mkdtempSync(join(tmpdir(),'kip-board-')),path=join(dir,'board.json');t.after(()=>rmSync(dir,{recursive:true,force:true}));return {dir,path,board:makeBoard({path,clock:()=>now})};}
test('review persists across process recreation, completion requires observed latest result, writes are private',t=>{
 const {path,board}=setup(t);assert.equal(board.read().revision,0);board.update({id:'health',action:'start',revision:0},report);const restarted=makeBoard({path,clock:()=>now});assert.equal(restarted.read().reviews.health.reviewing,true);assert.equal(statSync(path).mode&0o777,0o600);
 assert.throws(()=>restarted.update({id:'health',action:'complete',revision:1,resultAt:now-1},report),{code:'RESULT_CHANGED'});assert.equal(restarted.read().revision,1);
 const done=restarted.update({id:'health',action:'complete',revision:1,resultAt:now},report);assert.equal(done.reviews.health.reviewing,false);assert.equal(done.revision,2);
});
test('concurrent owner views cannot overwrite each other, cancel persists and invalid tasks fail',t=>{
 const {board}=setup(t);board.update({id:'release',action:'start',revision:0},report);assert.throws(()=>board.update({id:'health',action:'start',revision:0},report),{code:'BOARD_CHANGED'});assert.equal(board.read().reviews.health,null);board.update({id:'release',action:'cancel',revision:1},report);assert.equal(board.read().reviews.release.reviewing,false);
 for(const body of [{id:'__proto__',action:'start',revision:2},{id:'health',action:'deploy',revision:2},{id:'health',action:'start',revision:-1},{id:'health',action:'start',revision:2,command:'x'}])assert.throws(()=>board.update(body,report),{code:'BAD_BOARD_REQUEST'});assert.equal(board.read().revision,2);
});
test('stale, future, missing, duplicated, untrusted and incident results cannot complete review',t=>{
 const {board}=setup(t);board.update({id:'health',action:'start',revision:0},report);
 const changes=[r=>r.source='snapshot',r=>r.observer.status='UNKNOWN',r=>r.observer.lastCycleAt=now-605001,r=>r.checks[0].lastAt=now-605001,r=>r.checks[0].lastAt=now+1,r=>r.checks[0].status='INCIDENT',r=>r.checks[0].lastCode='NETWORK',r=>r.checks=[],r=>r.checks.push(r.checks[0])];
 for(const change of changes){const r=report();change(r);assert.throws(()=>board.update({id:'health',action:'complete',revision:1,resultAt:now},()=>r),{code:'RESULT_NOT_VERIFIED'});assert.equal(board.read().reviews.health.reviewing,true);}
});
test('corrupt storage is preserved and unavailable storage fails without success',t=>{
 const {path,board,dir}=setup(t);writeFileSync(path,'broken');assert.throws(()=>board.read(),{code:'BOARD_UNAVAILABLE'});assert.throws(()=>board.update({id:'health',action:'start',revision:0},report),{code:'BOARD_UNAVAILABLE'});assert.equal(readFileSync(path,'utf8'),'broken');const missing=makeBoard({path:join(dir,'missing','board.json')});assert.throws(()=>missing.update({id:'health',action:'start',revision:0},report),{code:'BOARD_UNAVAILABLE'});
});
test('done immediately returns to needs review when result ages or loses trust; owner review stays distinct',()=>{
 assert.equal(boardColumn({canRest:true},null),'done');assert.equal(boardColumn({canRest:false},{reviewing:false}),'todo');assert.equal(boardColumn({canRest:false},{reviewing:true}),'todo');assert.equal(boardColumn({canRest:true},{reviewing:true}),'done');
});
test('HTTP board requires owner session and exact origin; only approved actions are exposed',async t=>{
 const {dir,board}=setup(t);writeFileSync(join(dir,'login.html'),'LOGIN');let reads=0;const auth={host:'127.0.0.1',origin:'https://agent.example.com',clearCookie:'',session:async req=>req.headers.cookie==='test-owner'?{email:'owner@example.com'}:null,sameOrigin:req=>req.headers.origin===auth.origin};
 const server=makeServer({directory:dir,auth,board,readReport:()=>{reads++;return report();}});
 await new Promise(r=>server.listen(0,'127.0.0.1',r));t.after(()=>new Promise(r=>server.close(r)));auth.host='127.0.0.1:'+server.address().port;auth.origin='http://'+auth.host;
 const call=(method='GET',headers={},body)=>fetch(auth.origin+'/api/board',{method,headers,body:body===undefined?undefined:JSON.stringify(body)});
 const valid={id:'health',action:'start',revision:0};assert.equal((await call()).status,401);assert.equal((await call('POST',{'Content-Type':'application/json',Origin:auth.origin},valid)).status,401);assert.equal(board.read().revision,0);assert.equal(reads,0);
 const headers={Cookie:'test-owner',Origin:auth.origin,'Content-Type':'application/json'};assert.equal((await call('POST',{...headers,Origin:'https://evil.example'},valid)).status,403);assert.equal((await call('POST',headers,valid)).status,200);assert.equal((await call('POST',headers,valid)).status,409);
 assert.equal((await call('POST',headers,{id:'health',action:'complete',revision:1,resultAt:now})).status,200);const r=await call('GET',{Cookie:'test-owner'});assert.equal((await r.json()).reviews.health.reviewing,false);assert.match(r.headers.get('cache-control'),/no-store/);assert.equal((await call('DELETE',headers)).status,405);
});
