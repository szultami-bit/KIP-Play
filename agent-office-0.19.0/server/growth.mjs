export const GROWTH_MAX_AGE_MS=120000;
const CACHE_MS=60000;
const count=n=>Number.isSafeInteger(n)&&n>=0;
const exact=(value,keys)=>value&&typeof value==='object'&&!Array.isArray(value)&&Object.keys(value).length===keys.length&&Object.keys(value).every(k=>keys.includes(k));
const fail=()=>{throw Error('INVALID_GROWTH_REPORT');};
export function validateGrowth(raw,now=Date.now()){
 if(!exact(raw,['schemaVersion','source','sourceVersion','observedAt','period','counts','coverage','anomalies'])||raw.schemaVersion!==1||raw.source!=='SUPABASE_AGGREGATE'||raw.sourceVersion!=='growth-v1'||!count(raw.observedAt)||raw.observedAt>now)fail();
 const p=raw.period,c=raw.counts,v=raw.coverage,a=raw.anomalies;
 if(!exact(p,['timezone','localDate','startAt','endAt'])||p.timezone!=='Asia/Pontianak'||typeof p.localDate!=='string'||!/^\d{4}-\d{2}-\d{2}$/.test(p.localDate)||!count(p.startAt)||!count(p.endAt)||p.endAt-p.startAt!==86400000||raw.observedAt<p.startAt||raw.observedAt>=p.endAt||new Date(p.startAt+25200000).toISOString()!==p.localDate+'T00:00:00.000Z')fail();
 if(!exact(c,['registeredToday','totalRegistered','activeToday','recent5m','excludedTestAccounts'])||!Object.values(c).every(count)||c.registeredToday>c.totalRegistered||c.activeToday>c.totalRegistered||c.recent5m>c.totalRegistered)fail();
 // At midnight, recent activity may belong to yesterday: do not require recent5m<=activeToday.
 if(!exact(v,['scope','activity','activityWindowMinutes','testExclusion'])||v.scope!=='PUBLIC_ACCOUNTS'||v.activity!=='OBSERVED_DEVICE_ACTIVITY'||v.activityWindowMinutes!==5||v.testExclusion!=='MARKED_ONLY')fail();
 if(!exact(a,['invalidRegistrationTimes','futureActivityTimes'])||!Object.values(a).every(count)||Object.values(a).some(n=>n!==0))fail();
 return structuredClone(raw);
}
export function unavailableGrowth(now=Date.now(),reason='GROWTH_UNAVAILABLE'){
 return {schemaVersion:1,generatedAt:now,status:'UNKNOWN',freshness:'unknown',reason:['GROWTH_UNAVAILABLE','SOURCE_UNAVAILABLE','SOURCE_INVALID','SOURCE_STALE'].includes(reason)?reason:'GROWTH_UNAVAILABLE',report:null};
}
export function growthEnvelope(raw,now=Date.now()){
 const report=validateGrowth(raw,now),old=now-report.observedAt>GROWTH_MAX_AGE_MS||now>=report.period.endAt;
 return {schemaVersion:1,generatedAt:now,status:old?'HISTORICAL':'ACTIVE',freshness:old?'historical':'current',reason:old?'SOURCE_STALE':null,report};
}
export function makeGrowthReader({load,clock=Date.now}={}){
 if(typeof load!=='function')throw Error('GROWTH_LOADER_REQUIRED');
 let cached=null,nextReadAt=0,lastClock=0,lastAttemptAt=0,pending=null,lastError=null;
 const reader=async req=>{
  const now=clock();if(now<lastClock){cached=null;nextReadAt=0;lastAttemptAt=0;lastError=null;}lastClock=now;
  const mustRead=now>=nextReadAt||(cached&&now>=cached.period.endAt&&lastAttemptAt<cached.period.endAt);
  if(mustRead&&!pending){
   nextReadAt=now+CACHE_MS;lastAttemptAt=now;
   // Defer invoking load so even a synchronous failure releases pending correctly.
   pending=Promise.resolve().then(()=>load(req)).then(raw=>{cached=validateGrowth(raw,clock());lastError=null;}).catch(error=>{cached=null;lastError=error?.message==='INVALID_GROWTH_REPORT'?'SOURCE_INVALID':'SOURCE_UNAVAILABLE';}).finally(()=>{pending=null;});
  }
  if(pending)await pending;
  if(!cached)return unavailableGrowth(clock(),lastError||'GROWTH_UNAVAILABLE');
  try{return growthEnvelope(cached,clock());}catch{return unavailableGrowth(clock(),'SOURCE_INVALID');}
 };
 // Only the sanitized aggregate is available to the worker; no request or Auth token.
 reader.snapshot=()=>{
  if(!cached)return unavailableGrowth(clock(),lastError||'GROWTH_UNAVAILABLE');
  try{return growthEnvelope(cached,clock());}catch{return unavailableGrowth(clock(),'SOURCE_INVALID');}
 };
 return reader;
}
export function growthRole(envelope,now=Date.now()){
 const base={id:'growth-stats',recordedStatus:null,lastAt:null,maxAgeMs:GROWTH_MAX_AGE_MS,source:'unavailable',status:'UNKNOWN',freshness:'unknown',scope:'Rekap pendaftar publik dan aktivitas perangkat yang tercatat; hanya angka agregat.',blocker:'Statistik game belum dapat dibaca. Tidak dianggap nol.',capabilities:['Membaca pendaftar hari ini dan total akun publik.','Membaca akun unik dengan aktivitas perangkat tercatat.'],evidence:[],metrics:null};
 if(envelope?.schemaVersion!==1||!envelope.report||envelope.status==='UNKNOWN')return base;
 let valid;try{valid=growthEnvelope(envelope.report,now);}catch{return base;}
 const r=valid.report;
 return {...base,recordedStatus:'ACTIVE',lastAt:r.observedAt,source:r.source,status:valid.status,freshness:valid.freshness,blocker:'Aktivitas berasal dari last_seen perangkat (pembaruan paling cepat 5 menit), bukan bukti online pasti. Akun uji tanpa penanda mungkin masih terhitung; pengunjung anonim tidak tercakup.',evidence:['Agregasi database pada waktu sampel; tanpa nama, email, ID pengguna, token, atau daftar akun.'],metrics:{kind:'growth',...r.counts,timezone:r.period.timezone,localDate:r.period.localDate,dayStart:r.period.startAt,dayEnd:r.period.endAt,activityWindowMinutes:5,testExclusion:'MARKED_ONLY',scope:'PUBLIC_ACCOUNTS',activityCoverage:'OBSERVED_DEVICE_ACTIVITY'}};
}

