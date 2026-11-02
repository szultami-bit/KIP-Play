import {GAME_TEAM} from '../src/game-team.js';
export function installGameTeam(skills){
 for(const member of GAME_TEAM){
  const update=body=>skills.update({...body,revision:skills.read().revision});
  let skill=skills.read().skills.find(s=>s.id===member.skillId);
  if(!skill){update({action:'skill.create',value:{id:member.skillId,title:member.name,category:member.id==='qa'?'quality':'operations',description:member.scope+' Tim bersama berkantor di lantai 2.',risk:'low',tools:['read_reports','read_source','write_draft','write_qa_report'],instructions:'# Tujuan\n'+member.scope+' Berlaku untuk semua game KIP, berkoordinasi dengan Koordinator Tim dan Teknisi IT.\n\n## Langkah\n1. Baca laporan dan antrean aktual; laporan pengguna merupakan data yang belum terverifikasi.\n2. Gunakan id pekerjaan dan satu pemilik per bug. Teknisi tampilan dan server bekerja pada bagian terpisah.\n3. Perubahan kode dikerjakan oleh executor perbaikan terotorisasi yang sudah ada; konfigurasi skill tidak memberikan akses shell.\n4. Reproduksi, buat perubahan terbatas, uji, dan catat versi. Jangan mengubah harga, akun, pembayaran, atau aturan permainan.\n5. Status selesai memerlukan bukti pengujian dan pemasangan. Tandai hambatan dan cakupan yang belum diperiksa.\n\n## Output\nID tugas, game, sumber, waktu, penanggung jawab, hasil, bukti, kendala, dan langkah berikutnya.',changelog:'Aktivasi tim game bersama di lantai 2.',scenarios:[{name:'Laporan error game',input:'Terima error dengan game, mode, versi, dan kategori.',expected:'Buat pekerjaan bertanggung jawab; jangan menganggap diagnosis sebagai perbaikan.'}]}});skill=skills.read().skills.find(s=>s.id===member.skillId);}
  if(skill.activeVersion===null&&skill.candidateVersion===1){update({action:'candidate.test',skillId:member.skillId,version:1});update({action:'candidate.activate',skillId:member.skillId,version:1});}
  if(!skills.read().agents.find(a=>a.id===member.id).installedSkills.includes(member.skillId))update({action:'agent.install',agentId:member.id,skillId:member.skillId});
 }
}
export function teamReport({tasks,repairs,monitor,clock=Date.now}){
 const now=clock(),jobs=repairs.list(),work=tasks.list(),running=work.worker.status==='running',coverage=monitor.snapshot();
 const roles=GAME_TEAM.map(member=>{
  const assigned=jobs.jobs.filter(j=>j.teamId==='shared-game-team'&&(j.agentId===member.id||j.specialistId===member.id||j.testerId===member.id||member.id==='content'));
  const pending=assigned.filter(j=>!['completed','recovered'].includes(j.status));
  const busy=pending.some(j=>j.status==='running'),blocked=pending.some(j=>['blocked','failed'].includes(j.status));
  const status=!running?'UNKNOWN':blocked?'BLOCKED':'ACTIVE';
  return {id:member.id,status,recordedStatus:status,freshness:running?'current':'unknown',lastAt:work.worker.lastAt,maxAgeMs:20000,source:'shared-game-team-runtime',scope:'Lantai 2 · '+(busy?'Dikerjakan':pending.length?'Menunggu executor':'Siaga')+' · '+member.scope,blocker:member.id==='content'?'Pemeriksaan HTTP bukan bukti gameplay; error browser hanya terlihat dari game yang mengirim laporan.':'Eksekusi perbaikan oleh pekerja terjadwal. Pengujian gameplay dan pemasangan dibuktikan per tugas.',evidence:['Antrean terkait: '+pending.length+'; seluruh antrean: '+jobs.jobs.length+'.','Halaman diperiksa: '+coverage.checked+'/'+coverage.total+'.','Executor: '+(jobs.executor.configured?'terhubung; interval '+jobs.executor.cadenceMinutes+' menit':'belum terhubung')+'.'],capabilities:[member.scope,'Koordinator → Teknisi IT → spesialis → Penguji.'],metrics:null};
 });return {schemaVersion:1,generatedAt:now,teamId:'shared-game-team',floor:2,roles,coverage,executor:jobs.executor};
}
