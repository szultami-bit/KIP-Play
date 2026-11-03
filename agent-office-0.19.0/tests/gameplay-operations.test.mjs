import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {makeRepairs} from '../server/repairs.mjs';
import {makeTasks} from '../server/tasks.mjs';
import {collectGameplayFailures} from '../server/gameplay.mjs';
import {repairView} from '../campus/src/task-board.js';
test('gameplay repair metrics include all retained jobs, not only the display page, without payload or tokens',t=>{
 const dir=mkdtempSync(join(tmpdir(),'gameplay-metrics-')),repairs=makeRepairs({path:join(dir,'repairs.sqlite')});
 t.after(()=>{repairs.close();rmSync(dir,{recursive:true,force:true});});
 const at=Date.now();for(let n=0;n<101;n++)repairs.observeIncidents([{id:'00000000-0000-4000-8000-'+String(n).padStart(12,'0'),game:'lucky-wheel',mode:'live',kind:'runtime',errorClass:'TypeError',asset:'live.mjs',line:n,column:1,lastAt:at}]);
 repairs.claim({worker:'internal-qa'});
 const records=repairs.metricsRecords();assert.equal(records.length,101);assert.equal(repairs.list().jobs.length,100);
 for(const row of records)assert.deepEqual(Object.keys(row).sort(),['createdAt','resolution','status','updatedAt']);
 assert.equal(records.filter(row=>row.status==='running').length,1);
});
test('isolated gameplay failure keeps its scenario and checkpoint through deduplicated incident-to-repair intake',t=>{
 const dir=mkdtempSync(join(tmpdir(),'gameplay-intake-')),tasks=makeTasks({path:join(dir,'tasks.sqlite')}),repairs=makeRepairs({path:join(dir,'repairs.sqlite')});
 t.after(()=>{tasks.close();repairs.close();rmSync(dir,{recursive:true,force:true});});
 const synthetic={status:'FAIL',sourceRelease:'a'.repeat(40),scenarios:[{id:'edurace-kart-screen',game:'eduracing',mode:'screen',status:'FAIL',finishedAt:Date.now(),checkpoints:['login','start','answer']}]};
 const record=collectGameplayFailures({synthetic})[0];assert.ok(record);
 tasks.incident(record);tasks.incident(record);repairs.observeIncidents(tasks.incidents({forRepair:true}).issues);
 assert.equal(tasks.incidents().issues[0].occurrences,1);
 const job=repairs.list().jobs[0];assert.equal(job.kind,'game');assert.equal(job.source,'gameplay-monitor');assert.equal(job.backend,'isolated-synthetic');assert.equal(job.scenarioId,'edurace-kart-screen');assert.equal(job.checkpoint,'answer');assert.equal(job.leadId,'support');assert.equal(job.testerId,'qa');
 assert.match(repairView(job).result.scope,/terisolasi/);assert.match(repairView(job).result.evidence.join(' '),/edurace-kart-screen/);
});
test('unrecognized sources cannot acquire synthetic provenance and malformed internal scenario metadata is refused',t=>{
 const dir=mkdtempSync(join(tmpdir(),'gameplay-provenance-')),repairs=makeRepairs({path:join(dir,'repairs.sqlite')});
 t.after(()=>{repairs.close();rmSync(dir,{recursive:true,force:true});});
 const base={game:'eduracing',mode:'screen',kind:'runtime',lastAt:Date.now(),asset:'screen.mjs',errorClass:'GameplayAssertion',line:0,column:0,source:'gameplay-monitor',backend:'isolated-synthetic',scenarioId:'edurace-kart-screen',checkpoint:'answer'};
 for(const [n,extra] of [{scenarioId:'../../secret'},{checkpoint:'token=value'},{scenarioId:'a'.repeat(81)},{backend:'production'}].entries())repairs.observeIncidents([{...base,...extra,id:'00000000-0000-4000-8000-'+String(n).padStart(12,'0')}]);
 assert.equal(repairs.list().jobs.length,0);
 repairs.observeIncidents([{...base,id:'00000000-0000-4000-8000-000000000009',source:'client'}]);const job=repairs.list().jobs[0];
 for(const key of ['source','backend','scenarioId','checkpoint'])assert.equal(Object.hasOwn(job,key),false);
});
