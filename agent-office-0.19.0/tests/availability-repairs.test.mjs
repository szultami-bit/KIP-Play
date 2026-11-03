import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {makeTasks} from '../server/tasks.mjs';
import {makeRepairs} from '../server/repairs.mjs';
import {makeGameMonitor} from '../server/game-monitor.mjs';
import {normalizeIncident} from '../server/incidents.mjs';
const T=1800000000000,sha='a'.repeat(40),fp='b'.repeat(64);
const record={eventId:'12345678-1234-4123-8123-123456789abc',game:'speaking-studio',mode:'screen',release:'021-availability-1',kind:'resource',errorClass:'ResourceError',asset:'index.html',line:0,column:0};
function fixture(t){const dir=mkdtempSync(join(tmpdir(),'availability-'));let now=T;const tasks=makeTasks({path:join(dir,'tasks.sqlite'),clock:()=>now}),repairs=makeRepairs({path:join(dir,'repairs.sqlite'),clock:()=>now});t.after(()=>{tasks.close();repairs.close();rmSync(dir,{recursive:true,force:true});});return {tasks,repairs,advance:n=>now+=n,now:()=>now};}
const proof=at=>({summary:'Corrected HTTP monitor target',rootCause:'Wrong page path',patchSha:sha,deployedRelease:sha,tests:{passed:1,failed:0},deploymentAt:at,verification:{at,passed:true,expectedRelease:sha,expectedFingerprint:fp,scope:'http-availability',path:'/speaking-studio'},evidence:['Target path regression passed']});
test('real monitor intake persists trusted HTTP provenance and does not become gameplay',async t=>{
 const {tasks,repairs,now}=fixture(t);const monitor=makeGameMonitor({tasks,clock:now,targets:[{game:'speaking-studio',path:'/speaking-studio'}],fetcher:async()=>({status:503})});
 await monitor.runOnce();await monitor.runOnce();repairs.observeIncidents(tasks.incidents().issues);
 assert.equal(repairs.list().jobs[0].kind,'availability');assert.equal(repairs.list().jobs[0].path,'/speaking-studio');
});
test('public clients cannot request trusted availability classification',()=>{
 assert.throws(()=>normalizeIncident(record),/BAD_INCIDENT/);
 assert.throws(()=>normalizeIncident({...record,release:sha,source:'http-monitor'}),/BAD_INCIDENT/);
});
test('HTTP repair requires two distinct fresh healthy samples for the exact path, after deployment',t=>{
 const {tasks,repairs,advance,now}=fixture(t);tasks.recordAvailability(record);repairs.observeIncidents(tasks.incidents().issues);const j=repairs.claim({worker:'test'});
 advance(1000);repairs.result({id:j.id,token:j.token,status:'verifying',receipt:proof(now())});
 const sample=(at,path='/speaking-studio',status=200)=>({samples:[{game:'speaking-studio',path,status,at}]});
 repairs.observeAvailability(sample(now()));assert.equal(repairs.list().jobs[0].status,'verifying');
 advance(1000);repairs.observeAvailability(sample(now(),'/wrong'));repairs.observeAvailability(sample(now()));repairs.observeAvailability(sample(now()));assert.equal(repairs.list().jobs[0].status,'verifying');
 advance(1000);repairs.observeAvailability(sample(now(),'/speaking-studio',503));advance(1000);repairs.observeAvailability(sample(now()));assert.equal(repairs.list().jobs[0].status,'verifying');
 advance(1000);repairs.observeAvailability(sample(now()));const done=repairs.list().jobs[0];assert.equal(done.status,'completed');assert.equal(done.resolution,'verified-availability-repair');assert.equal(done.receipt.verification.gameplayPassed,undefined);
});
test('legacy HTTP classification requires internal evidence, a blocked task and exact revision',t=>{
 const {tasks,repairs,advance,now}=fixture(t);tasks.incident(record);const incident=tasks.incidents().issues[0];repairs.observeIncidents([incident]);const j=repairs.claim({worker:'test'});repairs.result({id:j.id,token:j.token,status:'blocked',receipt:{summary:'Wrong verification class'}});advance(1000);
 const input={id:j.id,expectedUpdatedAt:T,reason:'Confirmed internal monitor report from the reserved legacy release',incident};
 assert.throws(()=>repairs.classifyAvailability({...input,expectedUpdatedAt:T-1}));
 assert.throws(()=>repairs.classifyAvailability({...input,incident:{...incident,release:sha}}));
 repairs.classifyAvailability(input);repairs.observeIncidents([incident]);assert.equal(repairs.list().jobs[0].kind,'availability');assert.equal(repairs.list().jobs[0].status,'blocked');
 repairs.retry({id:j.id,reason:'HTTP verification implemented'});const claimed=repairs.claim({worker:'test'});assert.equal(claimed.id,j.id);repairs.result({id:j.id,token:claimed.token,status:'verifying',receipt:proof(now())});assert.equal(repairs.list().jobs[0].status,'verifying');
});
test('a browser gameplay report still requires actual gameplay proof',t=>{
 const {repairs,advance,now}=fixture(t);repairs.observeIncidents([{...record,id:record.eventId,release:sha,lastAt:T}]);const j=repairs.claim({worker:'test'});advance(1000);assert.throws(()=>repairs.result({id:j.id,token:j.token,status:'verifying',receipt:proof(now())}),/GAMEPLAY_PROOF_REQUIRED/);
});
