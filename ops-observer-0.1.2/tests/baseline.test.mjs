import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync,readFileSync,writeFileSync,rmSync,existsSync,symlinkSync,unlinkSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {loadConfig} from '../src/config.mjs';
import {applyBaseline,loadBaseline,validateCandidate} from '../src/baseline.mjs';
const base=loadConfig(),now=1793667600000;
function candidate(previous=base.expected,release='a'.repeat(40),fingerprint='b'.repeat(64)){
 return {schema:1,previous:{...previous},release,audit:{status:'approved',fingerprint,reviewedBy:'Codex explicit source review',reviewedAt:'2026-11-03T00:55:00Z',scope:'Reviewed exact source, network lifecycle and required regressions',tests:['tests/game.mjs']},build:{schema:1,gate:'kip-release-safety-v1',fingerprint,commit:release,builtAt:'2026-11-03T00:57:00Z',sourceFiles:100,passedTests:20,testFiles:1},deployment:{environment:'production',publicOrigin:base.origin,projectRef:base.expected.projectRef,configurationFingerprint:base.expected.configurationFingerprint}};
}
function setup(t){const dir=mkdtempSync(join(tmpdir(),'kip-baseline-'));t.after(()=>rmSync(dir,{recursive:true,force:true}));return join(dir,'approved-baseline.json');}
const healthy=async(c,check)=>({ok:true,code:'OK',latencyMs:1,observed:{release:c.expected.release,fingerprint:c.expected.fingerprint,configurationFingerprint:c.expected.configurationFingerprint,environment:'production',roomAdmission:'open'}});
test('audited release needs two fresh paired checks and survives reload',async t=>{
 const file=setup(t),calls=[],input=candidate();const r=await applyBaseline({base,file,input,now:()=>now,probe:async(c,ch,o)=>{calls.push(ch.id);if(ch.id==='release')assert.equal(o.healthResult.code,'OK');return healthy(c,ch);}});
 assert.deepEqual(calls,['health','release','health','release']);assert.equal(r.changed,true);assert.equal(r.revision,1);
 assert.equal(loadBaseline(base,file).expected.release,input.release);const stored=JSON.parse(readFileSync(file));assert.equal(stored.history[0].review.reviewedBy,input.audit.reviewedBy);assert.equal(stored.history[0].build.passedTests,20);
});
test('unapproved, mismatched or incomplete evidence is refused before any request',async t=>{
 const file=setup(t);for(const edit of [c=>c.audit.status='pending',c=>c.audit.fingerprint='c'.repeat(64),c=>c.audit.reviewedBy='',c=>c.build.passedTests=0,c=>c.build.testFiles=2,c=>c.build.commit='d'.repeat(40),c=>c.deployment.environment='staging',c=>c.previous.release='e'.repeat(40),c=>c.build.builtAt='2099-01-01T00:00:00Z']){
  const input=candidate();edit(input);await assert.rejects(applyBaseline({base,file,input,now:()=>now,probe:()=>{throw Error('must not request');}}));assert.equal(existsSync(file),false);
 }
});
test('a failed live check preserves the existing baseline and its audit history',async t=>{
 const file=setup(t);await applyBaseline({base,file,input:candidate(),now:()=>now,probe:healthy});const before=readFileSync(file,'utf8'),current=loadBaseline(base,file).expected;let calls=0;
 await assert.rejects(applyBaseline({base,file,input:candidate(current,'c'.repeat(40),'d'.repeat(64)),now:()=>now,probe:async(c,ch)=>++calls===3?{ok:false,code:'UNEXPECTED_RELEASE'}:healthy(c,ch)}),/LIVE_RELEASE_NOT_VERIFIED/);
 assert.equal(readFileSync(file,'utf8'),before);
});
test('repeat delivery is idempotent and an explicit audited rollback is recorded',async t=>{
 const file=setup(t),first=candidate();await applyBaseline({base,file,input:first,now:()=>now,probe:healthy});const r=await applyBaseline({base,file,input:first,now:()=>now,probe:healthy});assert.equal(r.changed,false);assert.equal(JSON.parse(readFileSync(file)).history.length,1);
 const current=loadBaseline(base,file).expected;await applyBaseline({base,file,input:candidate(current,base.expected.release,base.expected.fingerprint),now:()=>now+1,probe:healthy});assert.deepEqual(loadBaseline(base,file).expected,base.expected);assert.equal(JSON.parse(readFileSync(file)).history.length,2);
});
test('concurrent hooks cannot overwrite each other',async t=>{
 const file=setup(t);let release,started;const ready=new Promise(r=>started=r);const gate=new Promise(r=>release=r);
 const one=applyBaseline({base,file,input:candidate(),now:()=>now,probe:async(c,ch)=>{started();await gate;return healthy(c,ch);}});await ready;
 await assert.rejects(applyBaseline({base,file,input:candidate(),now:()=>now,probe:healthy}),/BASELINE_BUSY/);release();await one;assert.equal(JSON.parse(readFileSync(file)).history.length,1);
});
test('corrupt or linked state fails closed rather than accepting an observed live hash',t=>{
 const file=setup(t);writeFileSync(file,JSON.stringify({schema:1,history:[{expected:{release:'a'.repeat(40)}}]}));assert.throws(()=>loadBaseline(base,file));assert.deepEqual(base.expected,loadConfig().expected);
});
test('legacy null build commit is allowed only with the separately pinned release',()=>{
 const input=candidate();input.build.commit=null;assert.equal(validateCandidate(base,input,now).expected.release,input.release);input.release='';assert.throws(()=>validateCandidate(base,input,now));
});

test('dangling symlink cannot stand in for an absent baseline',t=>{const file=setup(t);symlinkSync(file+'.missing',file);assert.throws(()=>loadBaseline(base,file));});
test('new state directory keeps the bundled baseline until Store initializes it',t=>{const file=setup(t);assert.deepEqual(loadBaseline(base,join(file+'.new','approved-baseline.json')),base);});
