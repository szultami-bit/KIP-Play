// This is a view of completed observer checks, never a task scheduler.
export const STALE_MS=605000;
export const AGENTS=[
 {id:'health',name:'Pemantau layanan',short:'PL',activity:'Arcade',color:'#79c2bd'},
 {id:'release',name:'Penjaga rilis',short:'PR',activity:'Biliar',color:'#d5ba93'}
];
const states={HEALTHY:'Sehat',DEGRADED:'Perlu perhatian',INCIDENT:'Gangguan',RECOVERING:'Pemulihan',UNKNOWN:'Belum diketahui'};
const codes=new Set(['OK','INVALID_PAYLOAD','IDENTITY_MISMATCH','UNEXPECTED_PROFILE','UNEXPECTED_RELEASE','ADMISSION_DRAINING','HTTP_STATUS','INVALID_JSON','BODY_TOO_LARGE','NETWORK','TIMEOUT']);
const validTime=v=>Number.isSafeInteger(v)&&v>0;
export const fresh=(v,now)=>validTime(v)&&v<=now&&now-v<=STALE_MS;
export function readAgents(report,now=Date.now(),connection='ready'){
 return AGENTS.map(agent=>{
  const matches=Array.isArray(report?.checks)?report.checks.filter(c=>c?.id===agent.id):[];
  const c=matches.length===1?matches[0]:null;
  const lastAt=validTime(c?.lastAt)?c.lastAt:null;
  const old=!!lastAt&&lastAt<=now&&now-lastAt>STALE_MS;
  const clock=!!lastAt&&lastAt>now;
  const observerFresh=report?.observer?.status==='HEALTHY'&&fresh(report.observer.lastCycleAt,now);
  const trusted=connection==='ready'&&report?.source==='observer'&&observerFresh&&fresh(lastAt,now)&&Object.hasOwn(states,c?.status)&&codes.has(c?.lastCode);
  const status=trusted&&!(c.status==='HEALTHY'&&c.lastCode!=='OK')?c.status:'UNKNOWN';
  const freshness=old?'Data lama':clock?'Waktu tidak valid':connection==='session'?'Sesi berakhir':connection==='error'?'Koneksi terputus':connection==='loading'?'Mengambil laporan':report?.source==='snapshot'?'Data snapshot':!lastAt?'Belum ada laporan':!observerFresh?'Pemantau belum terverifikasi':status==='UNKNOWN'?'Hasil belum terverifikasi':'Data terbaru';
  return {...agent,status,label:states[status],freshness,lastAt,canRest:status==='HEALTHY',tone:status==='HEALTHY'?'good':status==='UNKNOWN'?'unknown':'attention',
   source:report?.source==='observer'?'Pemantau VPS':report?.source==='snapshot'?'Snapshot tersimpan':'Belum tersedia',
   lastCode:codes.has(c?.lastCode)?c.lastCode:null,latencyMs:Number.isFinite(c?.latencyMs)&&c.latencyMs>=0&&c.latencyMs<=60000?c.latencyMs:null,
   release:/^[0-9a-f]{40}$/.test(c?.observed?.release)?c.observed.release:null,
   lastCycleAt:validTime(report?.observer?.lastCycleAt)?report.observer.lastCycleAt:null,
   nextDueAt:trusted&&validTime(report?.observer?.nextDueAt)?report.observer.nextDueAt:null,
   // A retained failed/stale result is evidence only; it never drives leisure.
   lastResult:c&&Object.hasOwn(states,c.status)?states[c.status]:'Belum tersedia',
   reason:old?'Pemeriksaan ini berusia lebih dari 10 menit 5 detik. Kondisi saat ini belum diketahui.':clock?'Waktu laporan berada di masa depan. Kondisi saat ini belum diketahui.':connection==='error'?'Laporan terakhir tetap ditampilkan sebagai arsip. Koneksi akan dicoba lagi.':connection==='session'?'Masuk kembali untuk membaca laporan.':!trusted?'Menunggu hasil yang dapat diverifikasi dari pemantau VPS.':status==='HEALTHY'?'Hasil pemeriksaan terakhir sehat. Karakter boleh rehat sambil menunggu laporan berikutnya.':'Hasil ini membutuhkan perhatian. Karakter berada atau kembali ke ruang operasi.'};
 });
}
export function timeLabel(value){return validTime(value)?new Intl.DateTimeFormat('id-ID',{day:'2-digit',month:'short',year:'numeric',hour:'2-digit',minute:'2-digit',second:'2-digit',timeZone:'Asia/Pontianak',hour12:false}).format(value)+' WIB':'Belum ada';}
export function ageLabel(value,now=Date.now()){
 if(!validTime(value))return 'Belum pernah tercatat';if(value>now)return 'Waktu tidak valid';
 const s=Math.floor((now-value)/1000);return s<60?s+' detik lalu':s<3600?Math.floor(s/60)+' menit lalu':s<86400?Math.floor(s/3600)+' jam lalu':Math.floor(s/86400)+' hari lalu';
}
