import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync,writeFileSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {sanitize,STALE} from '../server/report.mjs';
import * as gameplay from '../server/gameplay.mjs';
const now=1793688000000,release='a'.repeat(40),fingerprint='b'.repeat(64);
const report=()=>sanitize({observer:{lastCycleAt:now},checks:[{id:'health',status:'HEALTHY',lastCode:'OK',lastAt:now,observed:{release}},{id:'release',status:'HEALTHY',lastCode:'OK',lastAt:now,observed:{fingerprint}}]},'observer',now);
test('gameplay identity joins the real observer shape: health release and separate release fingerprint',t=>{
 assert.equal(typeof gameplay.gameplayIdentity,'function');
 const observed=report();assert.deepEqual(gameplay.gameplayIdentity(observed,now),{release,fingerprint});
 assert.equal(observed.checks[1].observed.release,undefined);
 const dir=mkdtempSync(join(tmpdir(),'gameplay-identity-'));t.after(()=>rmSync(dir,{recursive:true,force:true}));
 writeFileSync(join(dir,'synthetic.json'),JSON.stringify({schemaVersion:1,observedAt:now,sourceRelease:release,sourceFingerprint:fingerprint,backend:'isolated-synthetic',scenarios:[{id:'edurace-kart-screen',game:'eduracing',mode:'screen',status:'PASS',startedAt:now-1000,finishedAt:now,completedSessions:1,checkpoints:['login','start','answer','result','replay'],errors:[]}]}));
 const read=gameplay.makeGameplayReader({directory:dir,clock:()=>now,readIdentity:()=>gameplay.gameplayIdentity(observed,now)});
 assert.equal(read().synthetic.status,'PASS');
 observed.checks[0].observed.release='c'.repeat(40);assert.equal(read().synthetic.status,'STALE_RELEASE');
});
test('identity requires fresh healthy observer and two unique healthy OK checks with valid hashes',()=>{
 assert.equal(typeof gameplay.gameplayIdentity,'function');
 assert.deepEqual(gameplay.gameplayIdentity(report(),now+STALE),{release,fingerprint});
 assert.deepEqual(gameplay.gameplayIdentity(report(),now+STALE+1),{});
 const edits=[r=>r.source='snapshot',r=>r.observer.status='UNKNOWN',r=>r.observer.lastCycleAt=now-STALE-1,r=>r.observer.lastCycleAt=now+1,r=>r.checks[0].status='INCIDENT',r=>r.checks[1].status='UNKNOWN',r=>r.checks[0].lastCode='UNEXPECTED_RELEASE',r=>r.checks[1].lastCode='IDENTITY_MISMATCH',r=>r.checks[0].lastAt=now-STALE-1,r=>r.checks[1].lastAt=now+1,r=>r.checks[0].observed.release='invalid',r=>r.checks[1].observed.fingerprint='bad',r=>r.checks.push(r.checks[0]),r=>r.checks.pop()];
 for(const edit of edits){const r=report();edit(r);assert.deepEqual(gameplay.gameplayIdentity(r,now),{});}
 for(const r of [null,{}, {source:'observer',observer:{status:'HEALTHY',lastCycleAt:now},checks:null}])assert.deepEqual(gameplay.gameplayIdentity(r,now),{});
});
