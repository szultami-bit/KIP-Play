import test from 'node:test';
import assert from 'node:assert/strict';
import {isGrowthMetrics,growthMetricRows,growthMetricNotes,metricSummary,roleEvidenceAt} from '../src/role-evidence.js';
const dayStart=Date.parse('2026-10-31T17:00:00.000Z'),dayEnd=dayStart+86400000;
const metrics={kind:'growth',registeredToday:0,totalRegistered:107,activeToday:1,recent5m:0,timezone:'Asia/Pontianak',localDate:'2026-11-01',dayStart,dayEnd,activityWindowMinutes:5,testExclusion:'MARKED_ONLY',scope:'PUBLIC_ACCOUNTS',activityCoverage:'OBSERVED_DEVICE_ACTIVITY',excludedTestAccounts:0};
function report(at=dayStart+1000,value=metrics){return {schemaVersion:1,generatedAt:at,roles:[{id:'growth-stats',status:'ACTIVE',recordedStatus:'ACTIVE',freshness:'current',lastAt:at,maxAgeMs:120000,source:'aggregate',scope:'Public account activity',blocker:'Observed devices only',evidence:['Aggregate snapshot'],capabilities:['Read counts'],metrics:value}]};}
test('growth UI preserves measured zero and labels observed activity instead of asserting online users',()=>{
 assert.equal(isGrowthMetrics(metrics),true);
 assert.deepEqual(growthMetricRows(metrics),[['Pendaftar hari ini','0'],['Total pendaftar publik','107'],['Akun aktif tercatat hari ini','1'],['Akun beraktivitas ≤5 menit','0']]);
 assert.match(metricSummary(metrics),/0 pendaftar hari ini/);
 const notes=growthMetricNotes(metrics).join(' ');
 assert.match(notes,/pengunjung anonim tidak termasuk/);assert.match(notes,/bukan kepastian sedang online/);assert.match(notes,/belum bertanda masih mungkin terhitung/);
 assert.match(notes,/dihitung mundur dari waktu bukti/);
});
test('growth counters cannot become current with invalid counts, time windows or unsupported coverage',()=>{
 for(const value of [{...metrics,registeredToday:-1},{...metrics,activeToday:108},{...metrics,recent5m:NaN},{...metrics,totalRegistered:1.5},{...metrics,dayEnd:dayEnd+1},{...metrics,localDate:'2026-11-02'},{...metrics,dayStart:8640000000000001,dayEnd:8640000086400001},{...metrics,activityCoverage:'ALL_VISITORS'},{...metrics,testExclusion:'ALL_TESTS'},{...metrics,kind:'unexpected'}]){
  assert.equal(isGrowthMetrics(value),false);assert.deepEqual(growthMetricRows(value),[]);assert.equal(roleEvidenceAt(report(dayStart+1000,value),'growth-stats',dayStart+1000).status,'UNKNOWN');
 }
});
test('growth UI expires at midnight WIB even while the two-minute evidence TTL remains valid',()=>{
 const before=dayEnd-1000,r=report(before);
 assert.equal(roleEvidenceAt(r,'growth-stats',before).status,'ACTIVE');
 const old=roleEvidenceAt(r,'growth-stats',dayEnd);assert.equal(old.status,'HISTORICAL');assert.equal(old.freshness,'historical');assert.equal(old.metrics.localDate,'2026-11-01');
 assert.match(growthMetricNotes(old.metrics)[0],/01 November 2026/);
});
test('growth UI respects TTL boundary and disconnected evidence remains unknown',()=>{
 const at=dayStart+1000,r=report(at);
 assert.equal(roleEvidenceAt(r,'growth-stats',at+120000).status,'ACTIVE');
 assert.equal(roleEvidenceAt(r,'growth-stats',at+120001).status,'HISTORICAL');
 assert.equal(roleEvidenceAt(r,'growth-stats',at,false).status,'UNKNOWN');
 assert.equal(roleEvidenceAt({...r,roles:[{...r.roles[0],maxAgeMs:3600000}]},'growth-stats',at).status,'UNKNOWN');
});
test('a recent observation before midnight may exceed current-day activity and capacity summaries remain intact',()=>{
 assert.equal(isGrowthMetrics({...metrics,activeToday:0,recent5m:1}),true);
 assert.equal(metricSummary({cpu:{usagePct:7.5},ram:{usedPct:14.8},disk:{usedPct:11.9}}),'CPU 7.50% · RAM 14.80% · Disk 11.90%');
});

test('statistic metrics bind only to the dedicated robot while the growth pilot keeps its own scope',()=>{
 const r=report(),at=r.generatedAt,pilot={...r.roles[0],id:'growth',metrics:null,maxAgeMs:86400000,scope:'Pilot guru',capabilities:['Draf pilot']};
 r.roles.push(pilot);
 assert.equal(roleEvidenceAt(r,'growth-stats',at).metrics.totalRegistered,107);
 assert.deepEqual(roleEvidenceAt(r,'growth',at),pilot);
 const wrong={...r,roles:[{...pilot,metrics,maxAgeMs:120000}]};
 assert.equal(roleEvidenceAt(wrong,'growth',at).status,'UNKNOWN');
 assert.equal(roleEvidenceAt(wrong,'growth-stats',at).status,'UNKNOWN');
});
