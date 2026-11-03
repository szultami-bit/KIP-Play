import {openSync,readFileSync,closeSync,fstatSync,constants} from 'node:fs';
import {join} from 'node:path';
import {createHash} from 'node:crypto';
import {GAME_TARGETS} from './game-monitor.mjs';
const integer=n=>Number.isSafeInteger(n)&&n>=0;
const id=s=>typeof s==='string'&&/^[a-z0-9][a-z0-9-]{0,79}$/.test(s);
const hash=(s,n)=>typeof s==='string'&&new RegExp('^[a-f0-9]{'+n+'}$').test(s);
const current=(at,now)=>integer(at)&&at>0&&at<=now;
const unavailable={status:'UNAVAILABLE',observedAt:null};
// Called only on locally validated, release-matched evidence; never public input.
export function collectGameplayFailures(report){
 const v=report?.synthetic;if(v?.status!=='FAIL')return [];
 const games=new Set(GAME_TARGETS.map(t=>t.game));
 return v.scenarios.filter(s=>s.status==='FAIL'&&games.has(s.game)).map(s=>{
  const h=createHash('sha256').update(JSON.stringify([v.sourceRelease,s.id,s.finishedAt])).digest('hex');
  const eventId=h.slice(0,8)+'-'+h.slice(8,12)+'-4'+h.slice(13,16)+'-8'+h.slice(17,20)+'-'+h.slice(20,32);
  return {eventId,game:s.game,mode:s.mode,release:v.sourceRelease,kind:'runtime',errorClass:'GameplayAssertion',asset:'screen.mjs',line:0,column:0,source:'gameplay-monitor',scenarioId:s.id,checkpoint:s.checkpoints.at(-1)||'initialization',backend:'isolated-synthetic'};
 });
}
export function validateSessionMetrics(v,now=Date.now()){
 if(v?.schemaVersion!==1||!current(v.observedAt,now)||!integer(v.windowStart)||!integer(v.windowEnd)||v.windowEnd>v.observedAt||v.windowStart>=v.windowEnd||v.scope!=='recorded-material-playthroughs'||v.includesTests!==true||!Array.isArray(v.games)||v.games.length>200)return {...unavailable};
 if(new Set(v.games.map(g=>g.game)).size!==v.games.length||v.games.some(g=>!id(g.game)||![g.started,g.completed,g.incompleteOver3h].every(integer)||g.completed>g.started||g.incompleteOver3h>g.started-g.completed))return {...unavailable};
 const games=v.games.map(({game,started,completed,incompleteOver3h})=>({game,started,completed,incompleteOver3h}));
 return {status:now-v.observedAt>7200000?'STALE':'CURRENT',observedAt:v.observedAt,windowStart:v.windowStart,windowEnd:v.windowEnd,scope:v.scope,includesTests:true,games,started:games.reduce((n,g)=>n+g.started,0),completed:games.reduce((n,g)=>n+g.completed,0),limitations:'Hanya materi yang mengirim bukti playthrough; dapat mencakup pengujian/internal. Sesi tidak selesai bukan otomatis bug. Bukan seluruh sesi platform.'};
}
export function validateSynthetic(v,now=Date.now(),live){
 if(v?.schemaVersion!==1||!current(v.observedAt,now)||!hash(v.sourceRelease,40)||!hash(v.sourceFingerprint,64)||v.backend!=='isolated-synthetic'||!Array.isArray(v.scenarios)||!v.scenarios.length||v.scenarios.length>200)return {...unavailable};
 const scenarios=[];
 for(const s of v.scenarios){
  if(!id(s.id)||!id(s.game)||!['screen','live'].includes(s.mode)||!['PASS','FAIL','BLOCKED','NOT_RUN'].includes(s.status)||!integer(s.startedAt)||!integer(s.finishedAt)||s.finishedAt<s.startedAt||s.finishedAt>v.observedAt||!integer(s.completedSessions)||!Array.isArray(s.checkpoints)||s.checkpoints.length>20||!s.checkpoints.every(id)||!Array.isArray(s.errors)||s.errors.length>20||s.errors.some(e=>typeof e!=='string'||e.length>200))return {...unavailable};
  const required=['login','start','answer','result','replay',...(s.mode==='live'?['join']:[])];
  if(s.status==='PASS'&&(s.completedSessions<1||s.errors.length||required.some(p=>!s.checkpoints.includes(p))))return {...unavailable};
  scenarios.push({id:s.id,game:s.game,mode:s.mode,status:s.status,startedAt:s.startedAt,finishedAt:s.finishedAt,completedSessions:s.completedSessions,checkpoints:[...s.checkpoints],errors:[...s.errors]});
 }
 if(new Set(scenarios.map(s=>s.id)).size!==scenarios.length)return {...unavailable};
 const identityKnown=hash(live?.release,40)&&hash(live?.fingerprint,64);
 const status=live&&(!identityKnown)?'UNVERIFIED_RELEASE':live&&(live.release!==v.sourceRelease||live.fingerprint!==v.sourceFingerprint)?'STALE_RELEASE':now-v.observedAt>7200000?'STALE':scenarios.every(s=>s.status==='PASS')?'PASS':scenarios.some(s=>s.status==='FAIL')?'FAIL':'PARTIAL';
 return {status,observedAt:v.observedAt,sourceRelease:v.sourceRelease,sourceFingerprint:v.sourceFingerprint,backend:v.backend,scenarios,completedSessions:scenarios.reduce((n,s)=>n+s.completedSessions,0),limitations:'Browser menjalankan kode game yang diuji pada salinan terisolasi dengan backend akun/materi sintetis. Bukan bukti integrasi Supabase/AI produksi atau seluruh perangkat.'};
}
export function operationalMetrics({jobs=[],issues=[]}={},now=Date.now()){
 const verified=jobs.filter(j=>j.status==='completed'&&['verified-game-repair','verified-availability-repair','verified-repair'].includes(j.resolution)&&integer(j.createdAt)&&integer(j.updatedAt)&&j.updatedAt>=j.createdAt&&j.updatedAt<=now);
 const durations=verified.map(j=>j.updatedAt-j.createdAt).sort((a,b)=>a-b),n=durations.length;
 const errors=issues.filter(i=>i.source!=='http-monitor'&&['runtime','resource','unhandled'].includes(i.kind)&&integer(i.occurrences));
 return {scope:'retained-repair-and-incident-records',verifiedRepairs:n,meanResolutionMs:n?Math.round(durations.reduce((a,b)=>a+b,0)/n):null,medianResolutionMs:n?(n%2?durations[(n-1)/2]:Math.round((durations[n/2-1]+durations[n/2])/2)):null,openJobs:jobs.filter(j=>!['completed','recovered'].includes(j.status)).length,repeatedErrors:errors.reduce((n,i)=>n+Math.max(0,i.occurrences-1),0),errorGroups:errors.length,limitations:'Durasi dihitung sejak tugas masuk hingga perbaikan terverifikasi, termasuk waktu menunggu. Error hanya dari game yang mengirim laporan.'};
}
function readJson(path){let fd;try{fd=openSync(path,constants.O_RDONLY|constants.O_NOFOLLOW);const size=fstatSync(fd).size;if(size<1||size>262144)throw Error();return JSON.parse(readFileSync(fd,'utf8'));}finally{if(fd!==undefined)closeSync(fd);}}
export function makeGameplayReader({directory='/gameplay',clock=Date.now,readIdentity=()=>({}),readOperations=()=>({})}={}){
 return ()=>{const now=clock();let sessions={...unavailable},synthetic={status:'NOT_RUN',observedAt:null};
  try{sessions=validateSessionMetrics(readJson(join(directory,'sessions.json')),now);}catch{}
  try{synthetic=validateSynthetic(readJson(join(directory,'synthetic.json')),now,readIdentity());}catch{}
  const tested=new Map((synthetic.scenarios||[]).map(s=>[s.game,true]));
  return {schemaVersion:1,generatedAt:now,sessions,synthetic,operations:operationalMetrics(readOperations(),now),coverage:GAME_TARGETS.map(t=>({game:t.game,status:tested.has(t.game==='edurace'?'eduracing':t.game)?'SCENARIO_RECORDED':'NOT_RUN'}))};
 };
}
