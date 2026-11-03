import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync,writeFileSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import * as subject from '../server/gameplay.mjs';
const now=1793688000000;
test('only fresh matching-release gameplay failures enqueue once per observed scenario run',()=>{
 assert.equal(typeof subject.collectGameplayFailures,'function');
 const s={status:'FAIL',sourceRelease:'a'.repeat(40),observedAt:now,scenarios:[{id:'edurace-kart-screen',game:'eduracing',mode:'screen',status:'FAIL',finishedAt:now,checkpoints:['login','start'],errors:['TIMEOUT_AFTER_start']}]};
 const events=subject.collectGameplayFailures({synthetic:s});assert.equal(events.length,1);assert.equal(events[0].source,'gameplay-monitor');assert.equal(events[0].scenarioId,'edurace-kart-screen');
 assert.equal(subject.collectGameplayFailures({synthetic:s})[0].eventId,events[0].eventId);
 assert.notEqual(subject.collectGameplayFailures({synthetic:{...s,scenarios:[{...s.scenarios[0],finishedAt:now+1}]}})[0].eventId,events[0].eventId);
 for(const status of ['UNVERIFIED_RELEASE','STALE_RELEASE','STALE','UNAVAILABLE','PASS','PARTIAL'])assert.deepEqual(subject.collectGameplayFailures({synthetic:{...s,status}}),[]);
 assert.deepEqual(subject.collectGameplayFailures({synthetic:{...s,scenarios:[{...s.scenarios[0],status:'BLOCKED'}]}}),[]);
});
test('missing gameplay evidence remains unknown instead of inheriting HTTP health',()=>{
 assert.equal(typeof subject.makeGameplayReader,'function');
 const result=subject.makeGameplayReader({directory:'/missing',clock:()=>now})();
 assert.equal(result.synthetic.status,'NOT_RUN');assert.equal(result.sessions.status,'UNAVAILABLE');
});
test('completion counts cannot exceed starts, and stale or future records are not current',()=>{
 assert.equal(typeof subject.validateSessionMetrics,'function');
 const value={schemaVersion:1,observedAt:now,windowStart:now-2592000000,windowEnd:now,scope:'recorded-material-playthroughs',includesTests:true,games:[{game:'eduracing',started:12,completed:5,incompleteOver3h:7}]};
 assert.equal(subject.validateSessionMetrics(value,now).status,'CURRENT');
 assert.equal(subject.validateSessionMetrics({...value,observedAt:now+1},now).status,'UNAVAILABLE');
 assert.equal(subject.validateSessionMetrics({...value,games:[{game:'eduracing',started:12,completed:13,incompleteOver3h:0}]},now).status,'UNAVAILABLE');
 assert.equal(subject.validateSessionMetrics(value,now+7200001).status,'STALE');
});
test('synthetic pass needs completed gameplay and checkpoints; old release results stay stale',()=>{
 assert.equal(typeof subject.validateSynthetic,'function');
 const v={schemaVersion:1,observedAt:now,sourceRelease:'a'.repeat(40),sourceFingerprint:'b'.repeat(64),backend:'isolated-synthetic',scenarios:[{id:'eduracing-screen',game:'eduracing',mode:'screen',status:'PASS',startedAt:now-10000,finishedAt:now,checkpoints:['login','start','answer','result','replay'],completedSessions:1,errors:[]}]};
 assert.equal(subject.validateSynthetic(v,now,{release:'a'.repeat(40),fingerprint:'b'.repeat(64)}).status,'PASS');
 assert.equal(subject.validateSynthetic(v,now,{release:'c'.repeat(40),fingerprint:'b'.repeat(64)}).status,'STALE_RELEASE');
 assert.equal(subject.validateSynthetic({...v,scenarios:[{...v.scenarios[0],checkpoints:['login']}]},now).status,'UNAVAILABLE');
});
test('repair duration excludes natural recovery and unfinished jobs; repeating errors retain observed counts',()=>{
 assert.equal(typeof subject.operationalMetrics,'function');
 const r=subject.operationalMetrics({jobs:[{id:'1',kind:'game',createdAt:1000,updatedAt:6000,status:'completed',resolution:'verified-game-repair'},{id:'2',kind:'game',createdAt:1000,updatedAt:9000,status:'recovered',resolution:'observed-recovery'},{id:'3',kind:'game',createdAt:2000,updatedAt:9000,status:'queued'}],issues:[{game:'eduracing',kind:'runtime',errorClass:'TypeError',occurrences:4},{game:'eduracing',kind:'resource',errorClass:'ResourceError',occurrences:2,source:'http-monitor'}]},10000);
 assert.equal(r.verifiedRepairs,1);assert.equal(r.meanResolutionMs,5000);assert.equal(r.openJobs,1);assert.equal(r.repeatedErrors,3);
});
