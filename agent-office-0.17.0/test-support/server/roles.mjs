import {openSync,closeSync,fstatSync,readSync,constants} from 'node:fs';
import {STALE} from './report.mjs';
export const ROLE_IDS=['coordinator','health','release','capacity','qa','accounts','security','backup','content','payments','support','growth','growth-stats'];
const REGISTRY_IDS=ROLE_IDS.filter(id=>!['health','release','capacity','growth-stats'].includes(id));
const MAX_BYTES=65536;
const assert=(condition)=>{if(!condition)throw Error('INVALID_ROLE_EVIDENCE');};
const exact=(value,keys)=>assert(value&&typeof value==='object'&&!Array.isArray(value)&&Object.keys(value).length===keys.length&&Object.keys(value).every(key=>keys.includes(key)));
const text=(value,max,empty=false)=>typeof value==='string'&&value.length<=max&&(empty||value.trim().length>0)&&!/[\u0000-\u001f\u007f]/.test(value);
const list=(value,max)=>Array.isArray(value)&&value.length<=8&&value.every(item=>text(item,max));
const integer=value=>Number.isSafeInteger(value)&&value>=0;
const pct=value=>Number.isFinite(value)&&value>=0&&value<=100;
function instant(value){
 const match=typeof value==='string'&&value.match(/^(\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d)(?:\.(\d{1,6}))?(?:Z|\+00:00)$/);
 if(!match)return null;
 // JS collectors use milliseconds; Python audit evidence can retain microseconds.
 const normalized=match[1]+'.'+(match[2]||'').padEnd(3,'0').slice(0,3)+'Z',at=Date.parse(normalized);
 return Number.isFinite(at)&&new Date(at).toISOString()===normalized?at:null;
}
function readJson(path){
 let fd;try{
  fd=openSync(path,constants.O_RDONLY|constants.O_NOFOLLOW|constants.O_NONBLOCK);const meta=fstatSync(fd);assert(meta.isFile()&&meta.size>0&&meta.size<=MAX_BYTES);
  const buffer=Buffer.alloc(MAX_BYTES+1);let used=0,n;while(used<buffer.length&&(n=readSync(fd,buffer,used,buffer.length-used,null))>0)used+=n;
  assert(used>0&&used<=MAX_BYTES);return JSON.parse(buffer.subarray(0,used).toString('utf8'));
 }finally{if(fd!==undefined)closeSync(fd);}
}
function unknown(id,reason='Bukti belum tersedia atau tidak valid.'){
 return {id,status:'UNKNOWN',recordedStatus:null,freshness:'unknown',lastAt:null,maxAgeMs:null,source:'unavailable',scope:'Cakupan belum dapat diverifikasi.',blocker:reason,evidence:[],capabilities:[],metrics:null};
}
function dated(record,now){
 if(!integer(record.lastAt)||record.lastAt>now)return unknown(record.id,'Waktu bukti tidak valid; kondisi saat ini belum diketahui.');
 const old=now-record.lastAt>record.maxAgeMs;
 return {...record,status:old?'HISTORICAL':record.recordedStatus,freshness:old?'historical':'current'};
}
function registryRoles(raw,now){
 exact(raw,['schemaVersion','roles']);assert(raw.schemaVersion===1&&Array.isArray(raw.roles)&&raw.roles.length<=REGISTRY_IDS.length);
 assert(raw.roles.every(r=>REGISTRY_IDS.includes(r?.id))&&new Set(raw.roles.map(r=>r.id)).size===raw.roles.length);
 return raw.roles.map(r=>{
  try{
   exact(r,['id','status','source','lastAt','maxAgeMs','scope','blocker','evidence','capabilities']);
   assert(['ACTIVE','PARTIAL','BLOCKED','PLANNED'].includes(r.status)&&text(r.source,120)&&r.source!=='unavailable'&&text(r.scope,600)&&text(r.blocker,600,true)&&list(r.evidence,300)&&list(r.capabilities,200));
   assert(integer(r.maxAgeMs)&&r.maxAgeMs>=60000&&r.maxAgeMs<=2592000000);
   // An activation requires both capability and evidence, not just a status word.
   if(r.status==='ACTIVE'||r.status==='PARTIAL')assert(r.evidence.length>0&&r.capabilities.length>0);
   if(r.status==='PARTIAL'||r.status==='BLOCKED')assert(r.blocker.trim().length>0);
   const lastAt=instant(r.lastAt);assert(lastAt!==null);
   return dated({id:r.id,recordedStatus:r.status,source:r.source,lastAt,maxAgeMs:r.maxAgeMs,scope:r.scope,blocker:r.blocker,evidence:[...r.evidence],capabilities:[...r.capabilities],metrics:null},now);
  }catch{return unknown(r.id);}
 });
}
const severity=(value,warn,critical)=>value>=critical?'CRITICAL':value>=warn?'WARN':'OK';
const agrees=(value,part,whole)=>pct(value)&&whole>0&&Math.abs(value-part/whole*100)<=.011;
function capacityRole(raw,now){
 exact(raw,['schemaVersion','id','source','status','lastAt','intervalSeconds','uptimeSeconds','expectedCapacity','cpu','ram','disk','errors']);
 assert(raw.schemaVersion===1&&raw.id==='capacity'&&raw.source==='VPS_PROCFS');
 const lastAt=instant(raw.lastAt);assert(lastAt!==null&&lastAt<=now);
 exact(raw.expectedCapacity,['cpuCount','minimumMemoryBytes','maximumMemoryBytes']);
 assert(raw.expectedCapacity.cpuCount===4&&raw.expectedCapacity.minimumMemoryBytes===15*2**30&&raw.expectedCapacity.maximumMemoryBytes===16*2**30);
 assert(Array.isArray(raw.errors)&&raw.errors.length===0&&Number.isFinite(raw.intervalSeconds)&&raw.intervalSeconds>0&&raw.intervalSeconds<=STALE/1000&&Number.isFinite(raw.uptimeSeconds)&&raw.uptimeSeconds>=0);
 const {cpu,ram,disk}=raw;
 exact(cpu,['usagePct','count','warningAtPct','criticalAtPct','status']);assert(pct(cpu.usagePct)&&cpu.count===4&&cpu.warningAtPct===80&&cpu.criticalAtPct===95&&cpu.status===severity(cpu.usagePct,80,95));
 exact(ram,['totalBytes','availableBytes','usedBytes','usedPct','warningAtPct','criticalAtPct','status']);
 assert([ram.totalBytes,ram.availableBytes,ram.usedBytes].every(integer)&&ram.totalBytes>=15*2**30&&ram.totalBytes<=16*2**30&&ram.availableBytes+ram.usedBytes===ram.totalBytes&&agrees(ram.usedPct,ram.usedBytes,ram.totalBytes)&&ram.warningAtPct===85&&ram.criticalAtPct===95&&ram.status===severity(ram.usedPct,85,95));
 exact(disk,['totalBytes','freeBytes','availableBytes','reservedBytes','usedBytes','usedPct','availablePct','mount','filesystemLabel','warningAtPct','criticalAtPct','status']);
 assert([disk.totalBytes,disk.freeBytes,disk.availableBytes,disk.reservedBytes,disk.usedBytes].every(integer)&&disk.totalBytes>0&&disk.freeBytes+disk.usedBytes===disk.totalBytes&&disk.availableBytes+disk.reservedBytes===disk.freeBytes&&agrees(disk.usedPct,disk.usedBytes,disk.totalBytes)&&agrees(disk.availablePct,disk.availableBytes,disk.totalBytes)&&disk.mount==='/'&&text(disk.filesystemLabel,120)&&disk.warningAtPct===80&&disk.criticalAtPct===90&&disk.status===severity(disk.usedPct,80,90));
 const states=['OK','WARN','CRITICAL'],derived=states[Math.max(...[cpu,ram,disk].map(m=>states.indexOf(m.status)))];assert(raw.status===derived);
 return dated({id:'capacity',recordedStatus:{OK:'HEALTHY',WARN:'DEGRADED',CRITICAL:'INCIDENT'}[derived],lastAt,maxAgeMs:STALE,source:'VPS_PROCFS',scope:'Pemantauan CPU, RAM, dan filesystem VPS dari procfs; tidak membuktikan kapasitas kelas atau uji beban.',blocker:'Disk adalah filesystem backing container, bukan kuota provider. Uji beban kelas belum dibuktikan.',evidence:['Sampel langsung daemon kapasitas VPS.'],capabilities:['Membaca CPU, RAM, disk, dan uptime.'],metrics:{cpu:{usagePct:cpu.usagePct,count:cpu.count},ram:{usedPct:ram.usedPct,usedBytes:ram.usedBytes,totalBytes:ram.totalBytes},disk:{usedPct:disk.usedPct,usedBytes:disk.usedBytes,totalBytes:disk.totalBytes,availableBytes:disk.availableBytes,label:'Filesystem backing container; bukan kuota provider'},uptimeSeconds:raw.uptimeSeconds,intervalSeconds:raw.intervalSeconds}},now);
}
function observerRole(id,report,now){
 const matches=Array.isArray(report?.checks)?report.checks.filter(c=>c?.id===id):[],check=matches.length===1?matches[0]:null;
 if(report?.source!=='observer'||report?.observer?.status!=='HEALTHY'||!integer(report.observer.lastCycleAt)||report.observer.lastCycleAt>now||now-report.observer.lastCycleAt>STALE||!check||!['HEALTHY','DEGRADED','INCIDENT','RECOVERING','UNKNOWN'].includes(check.status)||check.status==='HEALTHY'&&check.lastCode!=='OK')return unknown(id);
 return dated({id,recordedStatus:check.status,lastAt:check.lastAt,maxAgeMs:STALE,source:'observer',scope:id==='health'?'Pemeriksaan kesehatan HTTP layanan.':'Kecocokan identitas versi produksi yang teramati.',blocker:'Tidak membuktikan login, permainan, pembayaran, atau kapasitas kelas.',evidence:[`Kode hasil: ${['OK','INVALID_PAYLOAD','IDENTITY_MISMATCH','UNEXPECTED_PROFILE','UNEXPECTED_RELEASE','ADMISSION_DRAINING','HTTP_STATUS','INVALID_JSON','BODY_TOO_LARGE','NETWORK','TIMEOUT'].includes(check.lastCode)?check.lastCode:'UNKNOWN'}`],capabilities:['Membaca hasil pemeriksaan yang telah selesai.'],metrics:null},now);
}
export function makeRolesReader({registryPath='/role-data/roles.json',capacityPath='/capacity/latest.json',readReport,clock=Date.now}={}){
 return ()=>{
  const now=clock(),records=new Map(ROLE_IDS.map(id=>[id,unknown(id)]));
  try{for(const record of registryRoles(readJson(registryPath),now))records.set(record.id,record);}catch{/* Missing or invalid evidence stays unknown. */}
  try{records.set('capacity',capacityRole(readJson(capacityPath),now));}catch{/* Never convert collector failures to healthy. */}
  if(readReport)try{const report=readReport();for(const id of ['health','release'])records.set(id,observerRole(id,report,now));}catch{/* Existing observer availability remains independent. */}
  return {schemaVersion:1,generatedAt:now,roles:ROLE_IDS.map(id=>records.get(id))};
 };
}
