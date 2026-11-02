// Read-only report adapter. These readers must be supplied by a verified
// server-side transport, never by an HTTP request body or client observation.
// No transport, scheduler or room mutation is installed by this module.
const exact=(v,keys)=>v&&typeof v==='object'&&!Array.isArray(v)&&Object.keys(v).length===keys.length&&Object.keys(v).every(k=>keys.includes(k));
const integer=v=>Number.isSafeInteger(v)&&v>=0;
const fingerprint=v=>typeof v==='string'&&/^[a-f0-9]{64}$/.test(v);
const fresh=(v,now,age)=>integer(v)&&v>0&&v<=now&&now-v<=age;
const countKeys=['inspected','closed','failed','unknown','skipped'];
export async function readRoomExpiryResult({readRoomExpirySnapshot,readRoomExpiryRelease,clock=Date.now}){
 let now=clock();const base={checkedAt:now,externalActions:false,scope:'Membaca hasil runner lifecycle VPS; tidak menutup room dari Agent Office.',evidence:[],nextSteps:[],metrics:null,coverage:'PARTIAL'};
 const blocked=()=>({...base,status:'blocked',jobState:'BLOCKED',finding:'UNKNOWN',summary:'Bukti runner penutupan room belum terverifikasi. Jumlah UNKNOWN.',nextSteps:['Hubungkan laporan runner dan verifikasi rilis aktif melalui jalur resmi.']});
 try{
  if(typeof readRoomExpirySnapshot!=='function'||typeof readRoomExpiryRelease!=='function')return blocked();
  const s=await readRoomExpirySnapshot(),r=await readRoomExpiryRelease();
  now=clock();base.checkedAt=now;
  if(!integer(now)||!exact(r,['fingerprint','observedAt'])||!fingerprint(r.fingerprint)||!fresh(r.observedAt,now,60000)||
   !exact(s,['schemaVersion','source','fingerprint','heartbeatAt','lastCycleAt','intervalMs','singleExecutor','policy','coverage','counts'])||
   s.schemaVersion!==1||s.source!=='VPS_ROOM_LIFECYCLE'||s.fingerprint!==r.fingerprint||s.singleExecutor!==true||s.policy!=='CREATED_GT_3H_VERIFIED_IDLE'||
   !integer(s.intervalMs)||s.intervalMs<1000||s.intervalMs>3600000||!fresh(s.heartbeatAt,now,60000)||!fresh(s.lastCycleAt,now,s.intervalMs+60000)||s.lastCycleAt>s.heartbeatAt||
   !exact(s.counts,countKeys)||!countKeys.every(k=>integer(s.counts[k]))||
   s.counts.inspected!==s.counts.closed+s.counts.failed+s.counts.unknown+s.counts.skipped||
   !Array.isArray(s.coverage)||s.coverage.length<1||s.coverage.length>3||
   !s.coverage.every(c=>exact(c,['backend','status'])&&['tower','dragon','monster'].includes(c.backend)&&['COVERED','NOT_COVERED'].includes(c.status))||
   new Set(s.coverage.map(c=>c.backend)).size!==s.coverage.length||!s.coverage.some(c=>c.status==='COVERED'))return blocked();
  return {...base,status:'completed',jobState:'ACTIVE',finding:'PARTIAL',source:s.source,evidenceAt:s.lastCycleAt,
   summary:`Runner teramati aktif: ${s.counts.inspected} diperiksa, ${s.counts.closed} ditutup, ${s.counts.failed} gagal, ${s.counts.unknown} UNKNOWN.`,
   metrics:{...s.counts},runner:{heartbeatAt:s.heartbeatAt,intervalMs:s.intervalMs,fingerprint:s.fingerprint},
   backendCoverage:s.coverage.map(c=>({...c})),evidence:['Siklus runner dan fingerprint rilis cocok; Office hanya membaca laporan.'],
   limitations:'Cakupan parsial. Backend yang tidak tercantum belum tercakup. ACTIVE menyatakan runner pada waktu bukti, bukan semua room telah diperiksa. Penutupan dapat terlambat hingga satu interval; aktivitas ambigu wajib dilewati.'};
 }catch{return blocked();}
}
