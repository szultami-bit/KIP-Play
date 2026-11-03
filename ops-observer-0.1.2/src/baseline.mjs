import assert from 'node:assert/strict';
import {existsSync,lstatSync,readFileSync,openSync,writeFileSync,fsyncSync,closeSync,renameSync,unlinkSync} from 'node:fs';
import {dirname} from 'node:path';
import {createHash,randomUUID} from 'node:crypto';
import {validateConfig} from './config.mjs';
import {probe as productionProbe} from './probe.mjs';
const fields=['release','fingerprint','configurationFingerprint','projectRef'];
const same=(a,b)=>fields.every(k=>a?.[k]===b?.[k]);
const digest=x=>createHash('sha256').update(JSON.stringify(x)).digest('hex');
const text=x=>typeof x==='string'&&x.trim().length>=6&&x.length<=12000;
function regular(file,max=131072){const s=lstatSync(file);assert.ok(s.isFile()&&!s.isSymbolicLink()&&s.size<=max,'INVALID_BASELINE_FILE');}
function state(base,file){
 validateConfig(base);if(!existsSync(dirname(file)))return {schema:1,revision:0,history:[]};assert.ok(lstatSync(dirname(file)).isDirectory()&&!lstatSync(dirname(file)).isSymbolicLink(),'INVALID_BASELINE_DIRECTORY');
 try{lstatSync(file);}catch(e){if(e.code==='ENOENT')return {schema:1,revision:0,history:[]};throw e;}regular(file);
 const value=JSON.parse(readFileSync(file,'utf8'));assert.equal(value.schema,1);assert.ok(Number.isSafeInteger(value.revision)&&value.revision>0);assert.ok(Array.isArray(value.history)&&value.history.length>0&&value.history.length<=20);
 let previous;
 for(const row of value.history){
  validateConfig({...base,expected:row.expected});validateConfig({...base,expected:row.previous});
  assert.equal(row.expected.projectRef,base.expected.projectRef);assert.equal(row.expected.configurationFingerprint,base.expected.configurationFingerprint);
  assert.equal(row.review?.status,'approved');assert.ok(text(row.review.reviewedBy)&&text(row.review.scope));assert.ok(Number.isSafeInteger(row.acceptedAt));assert.ok(Number.isSafeInteger(row.revision)&&row.revision>0);
  assert.equal(row.build?.fingerprint,row.expected.fingerprint);assert.equal(row.build?.gate,'kip-release-safety-v1');assert.ok(Number.isSafeInteger(row.build.passedTests)&&row.build.passedTests>0);
  if(previous){assert.equal(row.revision,previous.revision+1);assert.ok(same(row.previous,previous.expected),'BROKEN_BASELINE_HISTORY');}previous=row;
 }
 assert.equal(value.history.at(-1).revision,value.revision);return value;
}
export function loadBaseline(base,file){const value=state(base,file);return value.revision?{...base,expected:value.history.at(-1).expected}:base;}
export function validateCandidate(base,input,at=Date.now()){
 validateConfig(base);assert.equal(input?.schema,1);const {audit,build,deployment:d,release,previous}=input;
 assert.match(release,/^[a-f0-9]{40}$/);validateConfig({...base,expected:previous});
 assert.equal(audit?.status,'approved','EXPLICIT_SOURCE_REVIEW_REQUIRED');assert.ok(text(audit.reviewedBy)&&text(audit.scope));
 for(const date of [audit.reviewedAt,build?.builtAt])assert.ok(Number.isFinite(Date.parse(date))&&Date.parse(date)<=at,'INVALID_EVIDENCE_TIME');
 assert.match(audit.fingerprint,/^[a-f0-9]{64}$/);assert.equal(build?.schema,1);assert.equal(build.gate,'kip-release-safety-v1');assert.equal(build.fingerprint,audit.fingerprint);
 assert.ok(build.commit===null||build.commit===release,'BUILD_COMMIT_MISMATCH');assert.ok(Number.isSafeInteger(build.passedTests)&&build.passedTests>0);assert.ok(Number.isSafeInteger(build.sourceFiles)&&build.sourceFiles>0);
 assert.ok(Array.isArray(audit.tests)&&audit.tests.length>0&&audit.tests.every(p=>/^tests\/[a-zA-Z0-9_./-]+\.mjs$/.test(p)&&!p.split('/').includes('..')));
 assert.equal(build.testFiles,new Set(audit.tests).size,'TEST_FILE_COUNT_MISMATCH');
 assert.equal(d?.environment,'production');assert.equal(d.publicOrigin,base.origin);assert.equal(d.projectRef,base.expected.projectRef);assert.equal(d.configurationFingerprint,base.expected.configurationFingerprint);
 return {expected:{release,fingerprint:build.fingerprint,configurationFingerprint:d.configurationFingerprint,projectRef:d.projectRef},previous,review:{status:'approved',reviewedBy:audit.reviewedBy,reviewedAt:audit.reviewedAt,scope:audit.scope,testFiles:build.testFiles,testsHash:digest([...new Set(audit.tests)].sort())},build:{schema:1,gate:build.gate,fingerprint:build.fingerprint,commit:build.commit,builtAt:build.builtAt,sourceFiles:build.sourceFiles,passedTests:build.passedTests,testFiles:build.testFiles}};
}
export async function applyBaseline({base,file,input,now=Date.now,probe=productionProbe}){
 const candidate=validateCandidate(base,input,now()),lock=file+'.lock';let lockFd;
 try{lockFd=openSync(lock,'wx',0o600);}catch(e){if(e.code==='EEXIST')throw Error('BASELINE_BUSY');throw e;}
 let temporary;
 try{
  const current=state(base,file),expected=current.revision?current.history.at(-1).expected:base.expected;
  const repeated=current.revision>0&&same(expected,candidate.expected);
  assert.ok(repeated||same(expected,candidate.previous),'STALE_BASELINE_REVISION');
  const config=validateConfig({...base,expected:candidate.expected});
  // These bounded probes verify a reviewed target; they never choose a target.
  for(let i=0;i<2;i++){
   const health=await probe(config,config.checks.find(c=>c.id==='health'),{});assert.ok(health.ok&&health.code==='OK','LIVE_RELEASE_NOT_VERIFIED');
   const release=await probe(config,config.checks.find(c=>c.id==='release'),{healthResult:health});assert.ok(release.ok&&release.code==='OK','LIVE_RELEASE_NOT_VERIFIED');
  }
  if(repeated)return {changed:false,revision:current.revision,expected};
  const revision=current.revision+1,entry={...candidate,previous:expected,acceptedAt:now(),revision};
  const updated={schema:1,revision,history:[...current.history,entry].slice(-20)},raw=JSON.stringify(updated)+'\n';assert.ok(Buffer.byteLength(raw)<=131072,'BASELINE_HISTORY_TOO_LARGE');
  temporary=file+'.'+randomUUID()+'.tmp';const fd=openSync(temporary,'wx',0o600);try{writeFileSync(fd,raw);fsyncSync(fd);}finally{closeSync(fd);}
  renameSync(temporary,file);temporary=null;const dir=openSync(dirname(file),'r');try{fsyncSync(dir);}finally{closeSync(dir);}
  return {changed:true,revision,expected:candidate.expected,acceptedAt:entry.acceptedAt};
 }finally{if(temporary)try{unlinkSync(temporary);}catch{}closeSync(lockFd);unlinkSync(lock);}
}
