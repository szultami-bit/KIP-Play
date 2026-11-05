import test from 'node:test';
import assert from 'node:assert/strict';
import {repairView,incidentView} from '../campus/src/task-board.js';
const base={id:'repair',kind:'game',game:'chibi-rally',status:'verifying',updatedAt:1793667600000,history:[]};
const receipt={summary:'Keluar gagal mempertahankan sesi',rootCause:'finally membuang room setelah jaringan gagal',patchSha:'a'.repeat(40),deployedRelease:'b'.repeat(40),tests:{passed:3586,failed:0},deploymentAt:1793667400000,verification:{at:1793667500000,passed:true,scenario:'Keluar gagal lalu coba lagi',gameplayPassed:true},evidence:['Tujuh regresi tambahan lulus']};
test('task details show cause, commit, tests, deploy and verification without losing submitted evidence',()=>{
 const {result}=repairView({...base,receipt});const evidence=result.evidence.join('\n');
 for(const value of [receipt.rootCause,receipt.patchSha,receipt.deployedRelease,'3586 lulus','0 gagal',receipt.verification.scenario,receipt.evidence[0]])assert.ok(evidence.includes(value),value);
 assert.match(result.summary,/Menunggu verifikasi/);assert.match(evidence,/Deploy tercatat/);
});
test('HTTP completion is explicitly availability evidence, not gameplay acceptance',()=>{
 const {result}=repairView({...base,kind:'availability',status:'completed',receipt:{...receipt,verification:{passed:true,scope:'http-availability',path:'/speaking-studio',at:1793667500000}}});
 assert.match(result.summary,/Akses HTTP terverifikasi/);assert.match(result.evidence.join('\n'),/\/speaking-studio/);assert.match(result.limitations,/belum membuktikan gameplay/);
});
test('queued tasks never invent commit, tests or a successful deployment',()=>{
 const {result}=repairView({...base,status:'queued'}),text=result.evidence.join('\n');assert.match(text,/Commit: belum tersedia/);assert.match(text,/Pengujian: belum tersedia/);assert.match(text,/Deploy: belum ada bukti/);assert.doesNotMatch(text,/0 gagal|Deploy tercatat/);
});
test('blocked reason and root cause remain separate and visible',()=>{
 const {result}=repairView({...base,status:'blocked',receipt:{summary:'Sesi pengujian belum tersedia',rootCause:'Perlu reproduksi dengan akun',evidence:['Belum ada patch']}});
 assert.match(result.summary,/Sesi pengujian belum tersedia/);assert.ok(result.evidence.includes('Penghalang: Sesi pengujian belum tersedia'));assert.ok(result.evidence.includes('Penyebab: Perlu reproduksi dengan akun'));assert.match(result.nextSteps.join('\n'),/penghalang/);
});
test('recovered status does not claim a patch and does not mutate its stored receipt',()=>{
 const input={...base,status:'recovered',receipt:{summary:'Pulih',evidence:['Dua sampel sehat']}};const saved=JSON.stringify(input);const view=repairView(input);assert.match(view.result.summary,/penyebab belum diketahui/);assert.equal(JSON.stringify(input),saved);
});
test('incident names follow their actual game instead of a hardcoded Lucky Wheel label',()=>{
 const item={game:'speaking-studio',mode:'screen',errorClass:'ResourceError',occurrences:2};assert.match(incidentView(item),/^Speaking Studio/);assert.match(incidentView({...item,game:'chibi-rally'}),/^Chibi Rally/);assert.match(incidentView({...item,game:'lucky-wheel'}),/^Lucky Wheel/);assert.doesNotMatch(incidentView({...item,game:undefined}),/Lucky Wheel/);
});
