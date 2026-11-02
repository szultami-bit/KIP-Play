import {skillDigest} from './skills.mjs';
import {growthRole} from './growth.mjs';
import {TaskError,REQUEST_ID} from './tasks.mjs';
export const TASK_CATALOG=Object.freeze([
 {id:'active-accounts-check',title:'Pantau akun aktif',agentId:'growth-stats',skillId:'game-statistics',tools:['read_aggregate_analytics'],manual:true},
 {id:'health-check',title:'Periksa layanan',agentId:'health',skillId:'service-monitoring',tools:['read_health'],manual:true},
 {id:'release-check',title:'Periksa versi rilis',agentId:'release',skillId:'release-verification',tools:['read_release'],manual:true},
 {id:'capacity-check',title:'Periksa kapasitas VPS',agentId:'capacity',skillId:'capacity-monitoring',tools:['read_vps_metrics'],manual:true},
 {id:'qa-incident',title:'Diagnosis laporan permainan',agentId:'qa',skillId:'game-qa',tools:['read_staging','write_qa_report'],manual:false},
 {id:'account-incident',title:'Diagnosis laporan akses',agentId:'accounts',skillId:'account-access-review',tools:['read_auth_staging','write_qa_report'],manual:false},
 {id:'service-incident',title:'Diagnosis pemuatan aset',agentId:'health',skillId:'service-monitoring',tools:['read_health'],manual:false}
]);
const COORDINATOR={agentId:'coordinator',skillId:'team-coordination',tools:['read_reports','write_plan']};
export function createIncidentTask(registry,incident){
 const coordinator=pin(registry,COORDINATOR);if(coordinator.authority==='observer')throw new TaskError('TASK_SKILL_UNAVAILABLE',409);
 const taskId=['game-session.js','account-bridge.js'].includes(incident.asset)?'account-incident':incident.kind==='resource'?'service-incident':'qa-incident';
 return {...createTaskRequest(registry,{taskId,requestId:incident.id},{incident}),coordinator};
}

function pin(registry,task){
 const agent=registry?.agents.find(a=>a.id===task.agentId),skill=registry?.skills.find(s=>s.id===task.skillId),version=skill?.versions.find(v=>v.version===skill.activeVersion);
 if(!agent||!['observer','advisor','draft','operator'].includes(agent.authority)||!agent.installedSkills.includes(task.skillId)||!version?.validation?.valid||!task.tools.every(t=>version.tools.includes(t)))throw new TaskError('TASK_SKILL_UNAVAILABLE',409);
 return {id:skill.id,version:version.version,digest:skillDigest(version),authority:agent.authority};
}
export function createTaskRequest(registry,{taskId,requestId},options={}){
 const task=TASK_CATALOG.find(t=>t.id===taskId);if(!task||!REQUEST_ID.test(requestId)||!task.manual&&!options.incident)throw new TaskError('BAD_TASK_REQUEST');
 return {requestId,taskId:task.id,title:task.title,agentId:task.agentId,source:options.incident?'incident':'manual',skill:pin(registry,task),...(options.incident?{incident:options.incident}:{})};
}
export async function executeTask(job,{registry,readRoles,readGrowthSnapshot,clock=Date.now}){
 const task=TASK_CATALOG.find(t=>t.id===job.taskId),base={checkedAt:clock(),externalActions:false,scope:'Pemeriksaan baca saja; tidak memperbaiki atau menerbitkan game.',evidence:[],nextSteps:[]};
 try{if(!task||JSON.stringify(pin(registry,task))!==JSON.stringify(job.skill))throw Error();}catch{return {...base,status:'blocked',summary:'Skill aktif atau kewenangan berubah. Jalankan tugas baru menggunakan konfigurasi terbaru.'};}
 if(task.id==='active-accounts-check'){
  let role;try{role=growthRole(readGrowthSnapshot?.(),clock());}catch{}
  if(!role||role.status!=='ACTIVE'||role.freshness!=='current')return {...base,status:'blocked',summary:'Statistik akun terbaru belum tersedia. Jumlah tidak dianggap nol.',nextSteps:['Buka Statistik Game dengan akun pemilik, lalu jalankan tugas kembali.']};
  return {...base,status:'completed',finding:'PARTIAL',source:role.source,evidenceAt:role.lastAt,scope:role.scope,
   summary:`${role.metrics.recent5m} akun publik teramati aktif dalam 5 menit terakhir. Sedang bermain: belum terukur.`,
   evidence:role.evidence,metrics:{kind:'account-activity',accountsObserved5m:role.metrics.recent5m,accountsConfirmedPlaying:null,playingStatus:'UNKNOWN',scope:'PUBLIC_ACCOUNTS',activityWindowMinutes:5,testExclusion:'MARKED_ONLY'},
   limitations:role.blocker+' Lease game dan status bermain peserta belum tercakup. Cakupan akun publik berbeda dari pemantauan ChatGPT yang juga mencakup akun internal.',nextSteps:['Baca waktu sampel; aktivitas perangkat bukan bukti sedang bermain.']};
 }
 if(job.incident){
  try{if(JSON.stringify(pin(registry,COORDINATOR))!==JSON.stringify(job.coordinator)||job.coordinator.authority==='observer')throw Error();}catch{return {...base,status:'blocked',summary:'Konfigurasi koordinator berubah. Diagnosis otomatis ditahan.'};}
  const i=job.incident;
  const nextSteps=task.agentId==='accounts'?['Reproduksi akses pada akun uji di staging.','Periksa masa sesi dan pemulihan login; jangan mencatat token.']:task.agentId==='health'?['Periksa respons aset dan jaringan di staging.','Bandingkan dengan pemantau layanan terbaru.']:['Reproduksi alur start, play, score, result dan replay di staging.','Periksa refresh dan reconnect untuk mode Live.'];
  return {...base,status:'completed',finding:'UNVERIFIED',incidentId:i.id,source:'untrusted-client-observation',evidenceAt:i.observedAt,scope:'Diagnosis awal berbasis aturan tetap; tidak menjalankan permainan atau memperbaiki bug.',summary:'Diagnosis awal selesai · laporan belum terverifikasi',evidence:[`Game: ${i.game}; mode: ${i.mode}; penanda pilot: ${i.release}.`,`Kategori: ${i.kind}; kelas: ${i.errorClass}; aset: ${i.asset}; posisi: ${i.line}:${i.column}.`,`Ditugaskan koordinator ke ${task.agentId}.`],nextSteps,limitations:'Kategori error hanya petunjuk awal. Akar masalah dan perbaikan belum dibuktikan; pesan dan stack tidak dikumpulkan.'};
 }
 let role;try{role=readRoles().roles.find(r=>r.id===task.agentId);}catch{}
 if(!role||role.freshness!=='current'||!Number.isSafeInteger(role.lastAt)||role.lastAt>clock()||clock()-role.lastAt>Math.min(role.maxAgeMs||0,605000)||!['HEALTHY','DEGRADED','INCIDENT','RECOVERING','ACTIVE','PARTIAL'].includes(role.status))return {...base,status:'blocked',summary:'Bukti terbaru belum tersedia. Pemeriksaan belum dapat disimpulkan.',nextSteps:['Periksa pemantau dan muat laporan terbaru.']};
 return {...base,status:'completed',summary:task.title+': '+({HEALTHY:'sehat',DEGRADED:'perlu diperiksa',INCIDENT:'gangguan teramati',RECOVERING:'sedang pulih',ACTIVE:'aktif',PARTIAL:'bukti terbatas'}[role.status]),finding:role.status,source:role.source,evidenceAt:role.lastAt,evidence:role.evidence.slice(0,8).map(x=>String(x).slice(0,300)),nextSteps:role.status==='HEALTHY'?['Pantau pemeriksaan berikutnya.']:['Tinjau bukti dan tentukan langkah perbaikan sesuai cakupan.'],...(role.metrics?{metrics:role.metrics}:{}),limitations:String(role.blocker||role.scope||'').slice(0,600)};
}

