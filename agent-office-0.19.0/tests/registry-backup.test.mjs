import test from 'node:test';import assert from 'node:assert/strict';import {mkdtempSync,readFileSync,writeFileSync,symlinkSync,rmSync,mkdirSync} from 'node:fs';import {join} from 'node:path';import {tmpdir} from 'node:os';import {makeSkills} from '../server/skills.mjs';
const api=await import('../server/registry-backup.mjs').catch(()=>({}));
test('backup restores latest registry bytes and DM settings without modifying source',t=>{
 assert.equal(typeof api.backupRegistry,'function');const dir=mkdtempSync(join(tmpdir(),'backup-'));t.after(()=>rmSync(dir,{recursive:true,force:true}));
 const sourcePath=join(dir,'skills.json'),store=makeSkills({path:sourcePath});let state=store.read();state=store.update({action:'agent.authority',agentId:'health',level:'advisor',revision:state.revision});const before=readFileSync(sourcePath);
 const receipt=api.backupRegistry({sourcePath,backupDirectory:join(dir,'backups'),restoreDirectory:join(dir,'restore')});
 assert.equal(receipt.revision,state.revision);assert.equal(receipt.restored,true);assert.deepEqual(readFileSync(sourcePath),before);assert.deepEqual(readFileSync(join(dir,'restore',receipt.id,'skills.json')),before);
 assert.equal(makeSkills({path:join(dir,'restore',receipt.id,'skills.json')}).read().agents.find(a=>a.id==='health').authority,'advisor');
 const latest=store.update({action:'agent.authority',agentId:'health',level:'draft',revision:state.revision});const next=api.backupRegistry({sourcePath,backupDirectory:join(dir,'backups'),restoreDirectory:join(dir,'restore')});assert.equal(next.revision,latest.revision);assert.notEqual(next.sha256,receipt.sha256);
});
test('backup fails on invalid or symlink input; restore refuses tampered snapshot and occupied target',t=>{
 assert.equal(typeof api.restoreRegistry,'function');const dir=mkdtempSync(join(tmpdir(),'backup-'));t.after(()=>rmSync(dir,{recursive:true,force:true}));const sourcePath=join(dir,'skills.json');makeSkills({path:sourcePath}).read();const options={sourcePath,backupDirectory:join(dir,'backups'),restoreDirectory:join(dir,'restore')};const r=api.backupRegistry(options),snapshotPath=join(dir,'backups',r.id,'skills.json');
 assert.throws(()=>api.restoreRegistry({snapshotPath,sha256:r.sha256,targetPath:join(dir,'restore',r.id,'skills.json')}));
 writeFileSync(snapshotPath,'{}');assert.throws(()=>api.restoreRegistry({snapshotPath,sha256:r.sha256,targetPath:join(dir,'new.json')}));
 writeFileSync(sourcePath,'{"schemaVersion":2');assert.throws(()=>api.backupRegistry(options));
 const link=join(dir,'link.json');symlinkSync(sourcePath,link);assert.throws(()=>api.backupRegistry({...options,sourcePath:link}));
});
