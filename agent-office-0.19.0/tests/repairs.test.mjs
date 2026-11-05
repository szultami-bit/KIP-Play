import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {makeRepairs} from '../server/repairs.mjs';
const T=1800000000000,sha='a'.repeat(40),fp='b'.repeat(64);
const report=(now,status='INCIDENT',release=sha)=>({source:'observer',observer:{status:'HEALTHY',lastCycleAt:now},checks:['health','release'].map((id,i)=>({id,status,lastAt:now,lastCode:status==='HEALTHY'?'OK':'UNEXPECTED_RELEASE',incidentId:status==='HEALTHY'?null:`00000000-0000-4000-8000-00000000000${i}`,observed:id==='health'?{release}:{fingerprint:fp}}))});
function setup(t){const dir=mkdtempSync(join(tmpdir(),'repairs-'));let now=T;const path=join(dir,'repairs.sqlite'),r=makeRepairs({path,clock:()=>now});t.after(()=>{r.close();rmSync(dir,{recursive:true,force:true});});return {r,path,advance:n=>now+=n,now:()=>now};}
const receipt=at=>({summary:'Patched verified observer baseline',rootCause:'Approved deployment was newer than observer baseline',patchSha:sha,deployedRelease:sha,tests:{passed:4,failed:0},deploymentAt:at,verification:{at,passed:true,expectedRelease:sha,expectedFingerprint:fp},evidence:['Exact source receipt and public health matched']});
test('fresh monitor failures automatically enqueue once and survive reopening; no stale or untrusted intake',t=>{const {r,path}=setup(t);r.observeMonitor(report(T));r.observeMonitor(report(T));assert.equal(r.list().jobs.length,2);assert.ok(r.list().jobs.every(j=>j.status==='queued'));const other=makeRepairs({path,clock:()=>T});assert.equal(other.list().jobs.length,2);other.close();r.observeMonitor({...report(T+1),source:'snapshot'});r.observeMonitor(report(T-605001));assert.equal(r.list().jobs.length,2);});
test('one actual repair at a time; expired leases recover and stale agent cannot finish',t=>{const {r,advance}=setup(t);r.observeMonitor(report(T));const j=r.claim({worker:'chatgpt'});assert.equal(j.status,'running');assert.equal(r.claim({worker:'other'}),null);assert.equal('token'in r.list().jobs[0],false);advance(1800001);const next=r.claim({worker:'other'});assert.ok(next);assert.throws(()=>r.result({id:j.id,token:j.token,status:'verifying',receipt:receipt(T)}));});
test('changed evidence invalidates an in-progress claim',t=>{const {r,advance,now}=setup(t);r.observeMonitor(report(T));const j=r.claim({worker:'chatgpt'});advance(1000);r.observeMonitor(report(now(),'INCIDENT','c'.repeat(40)));assert.throws(()=>r.result({id:j.id,token:j.token,status:'verifying',receipt:receipt(now())}));assert.ok(r.list().jobs.every(j=>j.status!=='completed'));});
test('repair receipt is required and completion waits for newer healthy matching observations',t=>{const {r,advance,now}=setup(t);r.observeMonitor(report(T));const j=r.claim({worker:'chatgpt'});assert.throws(()=>r.result({id:j.id,token:j.token,status:'completed',receipt:{summary:'done'}}));r.result({id:j.id,token:j.token,status:'verifying',receipt:receipt(T)});r.observeMonitor(report(T,'HEALTHY'));assert.equal(r.list().jobs.find(x=>x.id===j.id).status,'verifying');advance(1000);r.observeMonitor(report(now(),'HEALTHY'));const done=r.list().jobs.find(x=>x.id===j.id);assert.equal(done.status,'completed');assert.equal(done.resolution,'verified-repair');assert.ok(done.history.some(e=>e.event==='completed'));});
test('natural recovery is distinct from an agent repair and recurring incident can enqueue again',t=>{const {r,advance,now}=setup(t);r.observeMonitor(report(T));advance(1000);r.observeMonitor(report(now(),'HEALTHY'));assert.ok(r.list().jobs.every(j=>j.status==='recovered'));advance(1000);r.observeMonitor(report(now()));assert.equal(r.list().jobs.filter(j=>j.status==='queued').length,2);});
test('game reports queue even without a diagnosis; duplicate client events do not duplicate work',t=>{const {r}=setup(t),i={id:'00000000-0000-4000-8000-000000000003',game:'lucky-wheel',mode:'live',release:'019-pilot-1',kind:'runtime',errorClass:'TypeError',asset:'live.mjs',line:1,column:1,firstAt:T,lastAt:T,occurrences:2};r.observeIncidents([i]);r.observeIncidents([i]);assert.equal(r.list().jobs.length,1);assert.equal(r.list().jobs[0].status,'queued');});
test('verification timeout releases queue without claiming success',t=>{const {r,advance}=setup(t);r.observeMonitor(report(T));const j=r.claim({worker:'chatgpt'});r.result({id:j.id,token:j.token,status:'verifying',receipt:receipt(T)});advance(1800001);const next=r.claim({worker:'next'});assert.ok(next);assert.notEqual(next.id,j.id);assert.equal(r.list().jobs.find(x=>x.id===j.id).status,'blocked');});
test('game backlog and newer recurrence are not silently dropped',t=>{const {r,advance,now}=setup(t),i={id:'00000000-0000-4000-8000-000000000003',game:'lucky-wheel',mode:'live',kind:'runtime',errorClass:'TypeError',asset:'live.mjs',line:1,column:1,lastAt:T-700000};r.observeIncidents([i]);const j=r.claim({worker:'agent'});assert.ok(j);r.result({id:j.id,token:j.token,status:'verifying',receipt:{...receipt(T),verification:{...receipt(T).verification,scenario:'Open room, spin and result',gameplayPassed:true,steps:{start:true,play:true,result:true}}}});r.observeIncidents([i]);assert.equal(r.list().jobs.length,1);advance(1000);r.observeIncidents([{...i,lastAt:now()}]);assert.equal(r.list().jobs.filter(x=>x.status==='queued').length,1);});
test('receiver unhandled rejection reports enter repair queue',t=>{const {r}=setup(t);r.observeIncidents([{id:'00000000-0000-4000-8000-000000000003',game:'lucky-wheel',mode:'live',kind:'unhandled',errorClass:'UnhandledRejection',asset:'live.mjs',line:1,column:1,lastAt:T}]);assert.equal(r.list().jobs.length,1);});
test('a game failure after verification rejects stale success proof',t=>{const {r,advance,now}=setup(t),i={id:'00000000-0000-4000-8000-000000000003',game:'lucky-wheel',mode:'live',kind:'runtime',errorClass:'TypeError',asset:'live.mjs',line:1,column:1,lastAt:T};r.observeIncidents([i]);const j=r.claim({worker:'agent'});advance(1000);r.observeIncidents([{...i,lastAt:now()}]);assert.throws(()=>r.result({id:j.id,token:j.token,status:'verifying',receipt:{...receipt(T),verification:{...receipt(T).verification,scenario:'Play live room',gameplayPassed:true}}}),/GAMEPLAY_PROOF_REQUIRED/);});
test('repair receipt rejects extra secrets, capability text and malformed UI evidence',t=>{const {r}=setup(t);r.observeMonitor(report(T));const j=r.claim({worker:'chatgpt'});for(const receipt of [{summary:'blocked',credentials:{example:'test'}},{summary:j.token},{summary:'blocked',evidence:'not-an-array'}])assert.throws(()=>r.result({id:j.id,token:j.token,status:'blocked',receipt}));r.result({id:j.id,token:j.token,status:'blocked',receipt:{summary:'Need exact release source',evidence:['Current source not yet verified']}});assert.equal(r.list().jobs.find(x=>x.id===j.id).status,'blocked');});

test('cases reopen with a stable identity, preserve episodes and keep different release evidence separate',t=>{
 const {r,path,advance,now}=setup(t);
 r.observeMonitor(report(T));const original=r.list().cases.find(c=>c.checkId==='health');
 advance(1000);r.observeMonitor(report(now(),'HEALTHY'));
 assert.equal(r.list().cases.find(c=>c.id===original.id).disposition,'monitor');
 advance(1000);r.observeMonitor(report(now()));
 const reopened=r.list().cases.find(c=>c.id===original.id);
 assert.equal(reopened.occurrences,2);assert.equal(reopened.reopened,true);assert.equal(reopened.episodes.length,2);
 assert.ok(reopened.observations.some(o=>o.kind==='verification'&&o.code==='OK'));
 const restarted=makeRepairs({path,clock:now});assert.equal(restarted.list().cases.find(c=>c.id===original.id).occurrences,2);restarted.close();
 advance(1000);r.observeMonitor(report(now(),'INCIDENT','c'.repeat(40)));
 assert.equal(r.list().cases.filter(c=>c.checkId==='health').length,2);
});
test('only proven repairs enter history and teach a durable procedure to a matching future claim',t=>{
 const {r,path,advance,now}=setup(t);r.observeMonitor(report(T));const j=r.claim({worker:'agent'});
 const procedure={conditions:['Exact failure fingerprint matches and source release is authorized'],steps:['Apply verified baseline correction'],rollback:['Restore the prior approved baseline']};
 r.result({id:j.id,token:j.token,status:'verifying',receipt:{...receipt(T),procedure}});
 advance(1000);r.observeMonitor(report(now(),'HEALTHY'));
 const archived=r.list().cases.find(c=>c.jobId===j.id);
 assert.equal(archived.disposition,'history');assert.deepEqual(archived.matchedSkill.steps,procedure.steps);
 advance(1000);r.observeMonitor(report(now()));const next=r.claim({worker:'agent'});
 assert.deepEqual(next.matchedSkill.steps,procedure.steps);assert.equal(next.matchedSkill.requiresFreshVerification,true);
 const restarted=makeRepairs({path,clock:now});assert.ok(restarted.list().cases.find(c=>c.id===archived.id).matchedSkill);restarted.close();
});
test('game completion requires individual start, play and result evidence',t=>{
 const {r}=setup(t);r.observeIncidents([{id:'00000000-0000-4000-8000-000000000003',game:'lucky-wheel',mode:'live',kind:'runtime',errorClass:'TypeError',asset:'live.mjs',line:1,column:1,lastAt:T-1}]);
 const j=r.claim({worker:'agent'}),proof=receipt(T);
 for(const steps of [undefined,{start:true,play:true,result:false}])assert.throws(()=>r.result({id:j.id,token:j.token,status:'verifying',receipt:{...proof,verification:{...proof.verification,scenario:'Open and spin',gameplayPassed:true,steps}}}),/GAMEPLAY_PROOF_REQUIRED/);
 r.result({id:j.id,token:j.token,status:'verifying',receipt:{...proof,verification:{...proof.verification,scenario:'Start, spin and final result',gameplayPassed:true,httpPassed:true,steps:{start:true,play:true,result:true}}}});
 assert.equal(r.list().cases[0].disposition,'history');
});

test('changed error code invalidates the old claim even when release evidence is unchanged',t=>{
 const {r,advance,now}=setup(t);r.observeMonitor(report(T));const j=r.claim({worker:'agent'});advance(1000);
 const changed=report(now());changed.checks.forEach(c=>c.lastCode='IDENTITY_MISMATCH');r.observeMonitor(changed);
 assert.throws(()=>r.result({id:j.id,token:j.token,status:'verifying',receipt:receipt(now())}),/REPAIR_LEASE_LOST/);
});
test('explicit HTTP failure cannot be accepted as a verified repair',t=>{
 const {r}=setup(t);r.observeMonitor(report(T));const j=r.claim({worker:'agent'}),p=receipt(T);
 assert.throws(()=>r.result({id:j.id,token:j.token,status:'verifying',receipt:{...p,verification:{...p.verification,httpPassed:false}}}),/REPAIR_PROOF_REQUIRED/);
 assert.equal(r.list().caseCounts.history,0);
});
test('retry exposes the previous failed attempt to the next worker',t=>{
 const {r}=setup(t);r.observeMonitor(report(T));const j=r.claim({worker:'agent'});
 r.result({id:j.id,token:j.token,status:'blocked',receipt:{summary:'Need source',rootCause:'Missing audited source',evidence:['Attempt one evidence']}});
 r.retry({id:j.id,reason:'Source now available'});const next=r.claim({worker:'agent'});
 assert.equal(next.id,j.id);assert.equal(next.attemptHistory.at(-1).receipt.evidence[0],'Attempt one evidence');
});
