import {DatabaseSync} from 'node:sqlite';
import {openSync,closeSync,constants} from 'node:fs';
import {createHash,randomUUID} from 'node:crypto';

const UUID=/^[a-f0-9]{8}-[a-f0-9]{4}-[1-5][a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i;
const SHA=/^[a-f0-9]{40}$/,HASH=/^[a-f0-9]{64}$/;
const AGE=605000,LEASE=1800000;
const fresh=(at,now)=>Number.isSafeInteger(at)&&at>0&&at<=now&&now-at<=AGE;
const hash=value=>createHash('sha256').update(JSON.stringify(value)).digest('hex');
const text=(v,max=1200)=>typeof v==='string'&&v.trim().length>0&&v.length<=max;
const keys=(value,allowed)=>value&&typeof value==='object'&&!Array.isArray(value)&&Object.keys(value).every(k=>allowed.includes(k));
function validReceipt(p,status){
 if(!keys(p,status==='verifying'?['summary','rootCause','patchSha','deployedRelease','tests','deploymentAt','verification','evidence']:['summary','rootCause','evidence'])||!text(p.summary)||JSON.stringify(p).length>16000)return false;
 if(p.rootCause!==undefined&&!text(p.rootCause))return false;
 if(p.evidence!==undefined&&(!Array.isArray(p.evidence)||p.evidence.length>12||!p.evidence.every(e=>text(e,600))))return false;
 if(p.tests!==undefined&&!keys(p.tests,['passed','failed']))return false;
 if(p.verification!==undefined&&!keys(p.verification,['at','passed','expectedRelease','expectedFingerprint','scenario','gameplayPassed']))return false;
 return true;
}
export class RepairError extends Error {constructor(code,status=409){super(code);this.code=code;this.status=status;}}

export function makeRepairs({path,clock=Date.now,limit=2000,automationId}={}){
 if(!path)throw Error('REPAIR_PATH_REQUIRED');
 const fd=openSync(path,constants.O_RDWR|constants.O_CREAT|constants.O_NOFOLLOW,0o600);closeSync(fd);
 const db=new DatabaseSync(path);
 db.exec('PRAGMA busy_timeout=3000; PRAGMA journal_mode=WAL; PRAGMA synchronous=FULL; PRAGMA max_page_count=8192;');
 if(db.prepare('PRAGMA user_version').get().user_version>1){db.close();throw Error('REPAIR_SCHEMA_UNSUPPORTED');}
 db.exec(`CREATE TABLE IF NOT EXISTS repairs(id TEXT PRIMARY KEY,source_key TEXT NOT NULL,payload TEXT NOT NULL,evidence_hash TEXT NOT NULL,status TEXT NOT NULL,created_at INTEGER NOT NULL,updated_at INTEGER NOT NULL,observed_at INTEGER NOT NULL,attempts INTEGER NOT NULL DEFAULT 0,worker TEXT,token TEXT,lease_until INTEGER,receipt TEXT,resolution TEXT);
 CREATE INDEX IF NOT EXISTS repair_sources ON repairs(source_key,created_at);
 CREATE UNIQUE INDEX IF NOT EXISTS repair_active_source ON repairs(source_key) WHERE status IN ('queued','running','verifying','blocked','failed');
 CREATE TABLE IF NOT EXISTS repair_events(id INTEGER PRIMARY KEY,job_id TEXT NOT NULL,at INTEGER NOT NULL,event TEXT NOT NULL);
 CREATE TABLE IF NOT EXISTS repair_meta(key TEXT PRIMARY KEY,at INTEGER NOT NULL);
 PRAGMA user_version=1;`);
 function tx(fn){try{db.exec('BEGIN IMMEDIATE');const r=fn();db.exec('COMMIT');return r;}catch(e){try{db.exec('ROLLBACK');}catch{}if(e instanceof RepairError)throw e;throw new RepairError('REPAIRS_UNAVAILABLE',503);}}
 const event=(id,name)=>db.prepare('INSERT INTO repair_events(job_id,at,event) VALUES(?,?,?)').run(id,clock(),name);
 const decode=r=>r?{id:r.id,...JSON.parse(r.payload),status:r.status,createdAt:r.created_at,updatedAt:r.updated_at,observedAt:r.observed_at,attempts:r.attempts,worker:r.worker,leaseUntil:r.lease_until,receipt:r.receipt?JSON.parse(r.receipt):null,resolution:r.resolution}:null;
 function recover(){for(const r of db.prepare("SELECT id FROM repairs WHERE status='running' AND lease_until<=?").all(clock())){db.prepare("UPDATE repairs SET status='queued',token=NULL,lease_until=NULL,updated_at=? WHERE id=?").run(clock(),r.id);event(r.id,'lease-expired');}for(const r of db.prepare("SELECT id FROM repairs WHERE status='verifying' AND updated_at<=?").all(clock()-LEASE)){db.prepare("UPDATE repairs SET status='blocked',resolution='verification-timeout',updated_at=? WHERE id=?").run(clock(),r.id);event(r.id,'verification-timeout');}}
 function enqueue(key,payload,at){
  const evidenceHash=hash(payload),old=db.prepare("SELECT * FROM repairs WHERE source_key=? AND status IN ('queued','running','verifying','blocked','failed')").get(key);
  if(old){
   if(at<old.observed_at)return old.id;
   const changed=old.evidence_hash!==evidenceHash;
   db.prepare('UPDATE repairs SET payload=?,evidence_hash=?,observed_at=?,updated_at=?,status=?,token=?,lease_until=?,receipt=?,resolution=? WHERE id=?').run(JSON.stringify(payload),evidenceHash,at,changed?clock():old.updated_at,changed?'queued':old.status,changed?null:old.token,changed?null:old.lease_until,changed?null:old.receipt,changed?null:old.resolution,old.id);
   if(changed)event(old.id,'evidence-changed');return old.id;
  }
  const previous=db.prepare('SELECT observed_at FROM repairs WHERE source_key=? ORDER BY created_at DESC,rowid DESC LIMIT 1').get(key);
  if(previous&&at<=previous.observed_at)return null;
  if(db.prepare('SELECT COUNT(*) AS n FROM repairs').get().n>=limit)throw new RepairError('REPAIR_LIMIT',503);
  const id=randomUUID();db.prepare('INSERT INTO repairs(id,source_key,payload,evidence_hash,status,created_at,updated_at,observed_at) VALUES(?,?,?,?,?,?,?,?)').run(id,key,JSON.stringify(payload),evidenceHash,'queued',clock(),clock(),at);event(id,'queued');return id;
 }
 function observeMonitor(report){return tx(()=>{
  recover();const now=clock();
  if(report?.source!=='observer'||report.observer?.status!=='HEALTHY'||!fresh(report.observer.lastCycleAt,now)||!Array.isArray(report.checks))return;
  const checks=new Map();for(const id of ['health','release']){const m=report.checks.filter(c=>c?.id===id);if(m.length===1&&fresh(m[0].lastAt,now))checks.set(id,m[0]);}
  for(const [id,c] of checks){
   const key='monitor:'+id;
   if(['INCIDENT','DEGRADED'].includes(c.status)&&typeof c.lastCode==='string'&&/^[A-Z_]{2,40}$/.test(c.lastCode)&&c.lastCode!=='OK'){
    const observed={};if(SHA.test(c.observed?.release))observed.release=c.observed.release;if(HASH.test(c.observed?.fingerprint))observed.fingerprint=c.observed.fingerprint;
    enqueue(key,{kind:'monitor',checkId:id,title:id==='health'?'Perbaiki gangguan layanan':'Perbaiki ketidaksesuaian rilis',agentId:id,code:c.lastCode,observed},c.lastAt);
   }else if(c.status==='HEALTHY'&&c.lastCode==='OK'){
    const row=db.prepare("SELECT * FROM repairs WHERE source_key=? AND status IN ('queued','running','verifying','blocked','failed')").get(key);if(!row||c.lastAt<=row.observed_at)continue;
    let status='recovered',resolution='observed-recovery';
    if(row.status==='verifying'){
     const proof=JSON.parse(row.receipt),h=checks.get('health'),r=checks.get('release');
     if(!h||!r||[h,r].some(x=>x.status!=='HEALTHY'||x.lastCode!=='OK'||x.lastAt<=proof.deploymentAt)||h.observed?.release!==proof.verification.expectedRelease||r.observed?.fingerprint!==proof.verification.expectedFingerprint)continue;
     status='completed';resolution='verified-repair';
    }
    db.prepare('UPDATE repairs SET status=?,resolution=?,updated_at=?,observed_at=?,token=NULL,lease_until=NULL WHERE id=?').run(status,resolution,now,c.lastAt,row.id);event(row.id,status);
   }
  }
  db.prepare("INSERT INTO repair_meta(key,at) VALUES('collector',?) ON CONFLICT(key) DO UPDATE SET at=excluded.at").run(now);
 });}
 function observeIncidents(issues){return tx(()=>{for(const i of (Array.isArray(issues)?issues:[]).slice(0,500)){
  if(!UUID.test(i.id)||i.game!=='lucky-wheel'||!['screen','live'].includes(i.mode)||!['runtime','resource','unhandled'].includes(i.kind)||!Number.isSafeInteger(i.lastAt)||i.lastAt<=0||i.lastAt>clock())continue;
  // Only the receiver's bounded diagnostic fields enter the repair queue.
  if(!/^[\w.-]{1,80}$/.test(i.asset)||!/^\w{1,50}$/.test(i.errorClass)||!Number.isSafeInteger(i.line)||!Number.isSafeInteger(i.column))continue;
  const key='game:'+i.id;
  // A repaired game observation is not re-opened by re-reading the same incident record.
  const previous=db.prepare('SELECT observed_at,status FROM repairs WHERE source_key=? ORDER BY created_at DESC,rowid DESC LIMIT 1').get(key);if(previous&&['completed','recovered'].includes(previous.status)&&i.lastAt<=previous.observed_at)continue;
  enqueue(key,{kind:'game',incidentId:i.id,title:'Perbaiki laporan Lucky Wheel',agentId:['game-session.js','account-bridge.js'].includes(i.asset)?'accounts':'qa',game:i.game,mode:i.mode,errorClass:i.errorClass,asset:i.asset,line:i.line,column:i.column},i.lastAt);
 }});}
 function claim({worker}={}){if(!/^[a-z0-9_.-]{1,80}$/i.test(worker||''))throw new RepairError('BAD_REPAIR_WORKER',400);return tx(()=>{
  recover();if(db.prepare("SELECT id FROM repairs WHERE status IN ('running','verifying') LIMIT 1").get())return null;
  const row=db.prepare("SELECT * FROM repairs WHERE status='queued' ORDER BY created_at,rowid LIMIT 1").get();if(!row)return null;
  const token=randomUUID();db.prepare("UPDATE repairs SET status='running',worker=?,token=?,lease_until=?,attempts=attempts+1,updated_at=? WHERE id=?").run(worker,token,clock()+LEASE,clock(),row.id);event(row.id,'claimed');return {...decode(db.prepare('SELECT * FROM repairs WHERE id=?').get(row.id)),token};
 });}
 function owned(id,token){const row=db.prepare("SELECT * FROM repairs WHERE id=? AND token=? AND status='running' AND lease_until>?").get(id,token,clock());if(!row)throw new RepairError('REPAIR_LEASE_LOST');return row;}
 function heartbeat({id,token}){return tx(()=>{owned(id,token);db.prepare('UPDATE repairs SET lease_until=?,updated_at=? WHERE id=?').run(clock()+LEASE,clock(),id);return {id,leaseUntil:clock()+LEASE};});}
 function result({id,token,status,receipt}={}){
  if(!['verifying','blocked','failed'].includes(status)||!validReceipt(receipt,status))throw new RepairError('BAD_REPAIR_RESULT',400);
  return tx(()=>{const row=owned(id,token),job=decode(row);if(JSON.stringify(receipt).includes(row.token))throw new RepairError('BAD_REPAIR_RESULT',400);
   if(status==='verifying'){
    const p=receipt,v=p.verification;
    if(!text(p.rootCause)||!SHA.test(p.patchSha)||!SHA.test(p.deployedRelease)||!Number.isSafeInteger(p.tests?.passed)||p.tests.passed<1||p.tests.failed!==0||!Number.isSafeInteger(p.deploymentAt)||p.deploymentAt<row.created_at||p.deploymentAt>clock()||!v||v.passed!==true||!fresh(v.at,clock())||v.at<p.deploymentAt||!SHA.test(v.expectedRelease)||!HASH.test(v.expectedFingerprint)||p.deployedRelease!==v.expectedRelease||!Array.isArray(p.evidence)||p.evidence.length<1||p.evidence.length>12||!p.evidence.every(e=>text(e,600)))throw new RepairError('REPAIR_PROOF_REQUIRED',400);
    if(job.kind==='game'&&(!text(v.scenario,500)||v.gameplayPassed!==true||v.at<=row.observed_at))throw new RepairError('GAMEPLAY_PROOF_REQUIRED',400);
   }
   const next=job.kind==='game'&&status==='verifying'?'completed':status;
   db.prepare('UPDATE repairs SET status=?,receipt=?,resolution=?,updated_at=?,token=NULL,lease_until=NULL WHERE id=?').run(next,JSON.stringify(receipt),next==='completed'?'verified-game-repair':null,clock(),id);event(id,next);return decode(db.prepare('SELECT * FROM repairs WHERE id=?').get(id));
  });
 }
 function retry({id,reason}){if(!text(reason,500))throw new RepairError('RETRY_REASON_REQUIRED',400);return tx(()=>{const row=db.prepare("SELECT * FROM repairs WHERE id=? AND status IN ('blocked','failed')").get(id);if(!row)throw new RepairError('REPAIR_NOT_RETRYABLE');db.prepare("UPDATE repairs SET status='queued',updated_at=?,receipt=NULL WHERE id=?").run(clock(),id);event(id,'retry');return {id,status:'queued'};});}
 function list(){tx(recover);const jobs=db.prepare("SELECT * FROM repairs ORDER BY CASE WHEN status IN ('running','verifying') THEN 0 WHEN status IN ('queued','blocked','failed') THEN 1 ELSE 2 END, created_at DESC,rowid DESC LIMIT 100").all().map(row=>{const j=decode(row);if(j.status==='running'&&j.leaseUntil<=clock()){j.status='queued';j.worker=null;}delete j.leaseUntil;j.history=db.prepare('SELECT at,event FROM repair_events WHERE job_id=? ORDER BY id').all(j.id);return j;});return {schemaVersion:1,jobs,collectorAt:db.prepare("SELECT at FROM repair_meta WHERE key='collector'").get()?.at||null,executor:{type:'chatgpt-scheduled',cadenceMinutes:60,configured:typeof automationId==='string'&&automationId.length>0},counts:Object.fromEntries(db.prepare('SELECT status,COUNT(*) AS n FROM repairs GROUP BY status').all().map(r=>[r.status,r.n]))};}
 return {observeMonitor,observeIncidents,claim,heartbeat,result,retry,list,close:()=>db.close()};
}
