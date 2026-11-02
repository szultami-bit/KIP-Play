export const roleLabels={ACTIVE:'Aktif sesuai cakupan',PARTIAL:'Sebagian terbukti',BLOCKED:'Terhalang',PLANNED:'Direncanakan',HISTORICAL:'Bukti historis',UNKNOWN:'Belum terverifikasi',HEALTHY:'Sehat',DEGRADED:'Perlu diperiksa',INCIDENT:'Ada gangguan',RECOVERING:'Sedang pulih'};
export const freshnessLabels={current:'Bukti terkini',historical:'Bukti historis',unknown:'Belum diketahui'};
export const GROWTH_DASHBOARD_URL='https://games.kampunginggrispontianak.com/dashboard.html#fun';
const count=value=>Number.isSafeInteger(value)&&value>=0;
const countText=value=>new Intl.NumberFormat('id-ID').format(value);
export function isGrowthMetrics(metrics){
 if(!metrics||metrics.kind!=='growth'||!['registeredToday','totalRegistered','activeToday','recent5m','excludedTestAccounts'].every(key=>count(metrics[key])))return false;
 if(metrics.registeredToday>metrics.totalRegistered||metrics.activeToday>metrics.totalRegistered||metrics.recent5m>metrics.totalRegistered)return false;
 if(metrics.timezone!=='Asia/Pontianak'||metrics.activityWindowMinutes!==5||metrics.testExclusion!=='MARKED_ONLY'||metrics.scope!=='PUBLIC_ACCOUNTS'||metrics.activityCoverage!=='OBSERVED_DEVICE_ACTIVITY')return false;
 if(!count(metrics.dayStart)||!count(metrics.dayEnd)||metrics.dayEnd-metrics.dayStart!==86400000||typeof metrics.localDate!=='string'||!/^\d{4}-\d\d-\d\d$/.test(metrics.localDate))return false;
 const localStart=new Date(metrics.dayStart+7*3600000);
 return Number.isFinite(localStart.getTime())&&localStart.toISOString()===metrics.localDate+'T00:00:00.000Z';
}
export function growthMetricRows(metrics){return isGrowthMetrics(metrics)?[
 ['Pendaftar hari ini',countText(metrics.registeredToday)],
 ['Total pendaftar publik',countText(metrics.totalRegistered)],
 ['Akun aktif tercatat hari ini',countText(metrics.activeToday)],
 ['Akun beraktivitas ≤5 menit',countText(metrics.recent5m)]
]:[];}
export function growthMetricNotes(metrics){return isGrowthMetrics(metrics)?[
 `Tanggal laporan: ${new Intl.DateTimeFormat('id-ID',{timeZone:'Asia/Pontianak',day:'2-digit',month:'long',year:'numeric'}).format(metrics.dayStart)} · WIB. “Hari ini” mengikuti tanggal laporan.`,
 'Aktivitas menghitung akun publik unik dari waktu aktivitas perangkat. Satu akun dengan beberapa perangkat tetap dihitung sekali. Akun internal dan pengunjung anonim tidak termasuk.',
 'Catatan perangkat diperbarui paling cepat tiap 5 menit. Jendela ≤5 menit dihitung mundur dari waktu bukti; ini indikasi aktivitas terbaru, bukan kepastian sedang online.',
 `${countText(metrics.excludedTestAccounts)} akun uji bertanda dikecualikan. Akun uji yang belum bertanda masih mungkin terhitung.`
]:[];}
/** A local expiry is mandatory: a stopped poll must not leave an old green badge. */
export function roleEvidenceAt(report,id,now=Date.now(),connected=true){
 const empty={id,status:'UNKNOWN',recordedStatus:null,freshness:'unknown',lastAt:null,maxAgeMs:null,source:'unavailable',scope:'Cakupan belum dapat diverifikasi.',blocker:'Bukti belum tersedia atau tidak valid.',evidence:[],capabilities:[],metrics:null};
 if(report?.schemaVersion!==1||!Number.isSafeInteger(report.generatedAt)||report.generatedAt>now||!Array.isArray(report.roles))return empty;
 const matches=report.roles.filter(r=>r?.id===id),r=matches.length===1?matches[0]:null;
 if(!r||!Object.hasOwn(roleLabels,r.status)||!['current','historical','unknown'].includes(r.freshness)||!Number.isSafeInteger(r.lastAt)||r.lastAt>now||r.lastAt<0||!Number.isSafeInteger(r.maxAgeMs)||r.maxAgeMs<=0||r.maxAgeMs>2592000000||!Array.isArray(r.evidence)||!Array.isArray(r.capabilities)||typeof r.scope!=='string'||typeof r.blocker!=='string')return empty;
 if(id==='growth-stats'&&r.metrics!==null&&r.metrics?.kind!=='growth')return empty;
 if(r.metrics?.kind==='growth'&&(id!=='growth-stats'||!isGrowthMetrics(r.metrics)||r.maxAgeMs!==120000||r.lastAt<r.metrics.dayStart||r.lastAt>=r.metrics.dayEnd))return empty;
 if(!connected)return {...r,status:'UNKNOWN',freshness:'unknown',blocker:'Koneksi laporan terputus. Bukti tersimpan bukan kondisi saat ini. '+r.blocker};
 if(r.freshness==='unknown')return {...r,status:'UNKNOWN'};
 if(now-r.lastAt>r.maxAgeMs||r.freshness==='historical'||r.metrics?.kind==='growth'&&now>=r.metrics.dayEnd)return {...r,status:'HISTORICAL',freshness:'historical'};
 return r;
}
export function roleTime(at){return Number.isSafeInteger(at)&&at>=0?new Intl.DateTimeFormat('id-ID',{timeZone:'Asia/Pontianak',day:'2-digit',month:'short',year:'numeric',hour:'2-digit',minute:'2-digit',second:'2-digit',hour12:false}).format(at)+' WIB':'Belum ada bukti';}
export function metricSummary(metrics){
 if(!metrics)return '';
 if(metrics.kind==='growth')return isGrowthMetrics(metrics)?`${countText(metrics.registeredToday)} pendaftar hari ini · ${countText(metrics.totalRegistered)} total publik · ${countText(metrics.activeToday)} akun beraktivitas tercatat hari ini · ${countText(metrics.recent5m)} dalam ≤5 menit`:'Metrik pertumbuhan belum tersedia.';
 return `CPU ${metrics.cpu.usagePct.toFixed(2)}% · RAM ${metrics.ram.usedPct.toFixed(2)}% · Disk ${metrics.disk.usedPct.toFixed(2)}%`;
}
