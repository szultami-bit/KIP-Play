import test from 'node:test';
import assert from 'node:assert/strict';
import {readAgents,STALE_MS,timeLabel} from '../campus/src/observer-model.js';
import {createMotion,agentRoute,pointOnRoute} from '../campus/src/agent-motion.js';
const now=1793475600000;
function report(age=0){return {source:'observer',observer:{status:'HEALTHY',lastCycleAt:now-age,nextDueAt:now+300000},checks:['health','release'].map(id=>({id,status:'HEALTHY',lastAt:now-age,lastCode:'OK',latencyMs:42,observed:{release:'a'.repeat(40)}}))};}
const healthy={lastAt:now,canRest:true};
function settle(m,n=1000){let v;for(let i=0;i<n;i++){v=m.step(.1);if(!v.active)break;}return v;}
test('fresh real checks may rest and expose WIB timestamps, result and release',()=>{
 const v=readAgents(report(),now);assert.equal(v.length,2);assert.ok(v.every(x=>x.canRest));assert.equal(v[1].release,'a'.repeat(40));assert.equal(v[0].latencyMs,42);assert.match(timeLabel(now),/WIB$/);
});
test('age expires locally even without a new response',()=>{
 const r=report();assert.ok(readAgents(r,now+STALE_MS)[0].canRest);const v=readAgents(r,now+STALE_MS+1)[0];assert.equal(v.canRest,false);assert.equal(v.freshness,'Data lama');assert.equal(v.lastAt,now);
});
test('future, stale observer, snapshot, unavailable and failed connection never imply healthy',()=>{
 for(const edit of [r=>r.checks[0].lastAt=now+1,r=>r.observer.lastCycleAt=now-STALE_MS-1,r=>r.observer.status='UNKNOWN',r=>r.source='snapshot',r=>r.source='unavailable',r=>r.checks[0].lastCode='TIMEOUT',r=>r.checks.push(r.checks[0])]){
  const r=report();edit(r);assert.equal(readAgents(r,now)[0].canRest,false);
 }
 for(const connection of ['error','loading','session'])assert.equal(readAgents(report(),now,connection)[0].canRest,false);
 assert.equal(readAgents(null,now)[0].status,'UNKNOWN');
});
test('incident remains attention; retained evidence survives connection failure',()=>{
 const r=report();r.checks[1].status='INCIDENT';r.checks[1].lastCode='UNEXPECTED_RELEASE';
 assert.equal(readAgents(r,now)[1].tone,'attention');const v=readAgents(r,now,'error')[1];assert.equal(v.status,'UNKNOWN');assert.equal(v.lastCode,'UNEXPECTED_RELEASE');assert.equal(v.lastAt,now);assert.equal(v.lastResult,'Gangguan');
});
test('both paths stay continuous and climb only in the attached stair core',()=>{
 for(const id of ['health','release']){
  const r=agentRoute(id);assert.equal(r.points.at(-1)[1],9.2);
  for(let i=1;i<r.points.length;i++){const a=r.points[i-1],b=r.points[i];if(a[1]!==b[1]){for(const p of[a,b]){assert.ok(p[0]>=-17.55&&p[0]<=-13);assert.ok(p[2]>=-5.5&&p[2]<=1.55);}assert.equal(a[0],b[0]);}}
  assert.deepEqual(pointOnRoute(r,0).position,r.points[0]);assert.deepEqual(pointOnRoute(r,r.length).position,r.points.at(-1));
 }
});
test('healthy initial report takes character to level 3 and repeated snapshot does not replay',()=>{
 const m=createMotion('health');m.update(healthy);let v=settle(m);assert.equal(v.phase,'resting');assert.equal(v.level,2);
 for(let i=0;i<5;i++){m.update(healthy);v=m.step(.1);assert.equal(v.phase,'resting');assert.equal(v.active,false);}
});
test('a strictly newer result returns to desk, reviews once, then rests again',()=>{
 const m=createMotion('release');m.update(healthy);settle(m);m.update({...healthy,lastAt:now+300000});assert.equal(m.step(.1).phase,'returning');
 let reviewed=false;for(let i=0;i<1000;i++){const p=m.step(.1);reviewed||=p.phase==='reviewing';if(p.phase==='reviewing')assert.deepEqual(p.position,[.3,0,-1.9]);if(p.phase==='resting')break;}
 assert.ok(reviewed);assert.equal(m.step(0).phase,'resting');
});
test('stale or failed check interrupts leisure and takes character back to operations',()=>{
 const m=createMotion('health');m.update(healthy);settle(m);m.update({...healthy,canRest:false});assert.equal(m.step(.1).phase,'returning');const v=settle(m);assert.equal(v.phase,'waiting');assert.equal(v.level,0);
});
test('pause freezes position, resumes; reduced motion and hidden tabs settle without a loop',()=>{
 const m=createMotion('health');m.update(healthy);const a=m.step(.2);const b=m.step(.2,{pause:true});assert.deepEqual(a.position,b.position);assert.equal(b.active,false);assert.notDeepEqual(m.step(.2).position,b.position);
 const v=m.step(0,{snap:true});assert.equal(v.phase,'resting');assert.equal(v.active,false);m.update({...healthy,canRest:false});const end=m.step(0,{snap:true});assert.equal(end.phase,'waiting');assert.equal(end.level,0);
});
