import {DatabaseSync} from 'node:sqlite';
import {existsSync,lstatSync,mkdirSync,chmodSync,writeFileSync} from 'node:fs';
import {dirname} from 'node:path';
import {randomUUID} from 'node:crypto';
const INTERVAL=300000,STALE=605000,DAY=86400000;
const IDS=['health','release'];
const CODES=['OK','INVALID_PAYLOAD','IDENTITY_MISMATCH','UNEXPECTED_PROFILE','UNEXPECTED_RELEASE','ADMISSION_DRAINING','HTTP_STATUS','INVALID_JSON','BODY_TOO_LARGE','NETWORK','TIMEOUT'];
function observation(r){
 if(!r||!CODES.includes(r.code)||r.ok!==(r.code==='OK')||!Number.isFinite(r.latencyMs)||r.latencyMs<0||r.latencyMs>60000)throw Error('Invalid observation');
 const o={};
 for(const [key,n] of [['release',40],['fingerprint',64],['configurationFingerprint',64]])if(new RegExp(`^[a-f0-9]{${n}}$`).test(r.observed?.[key]))o[key]=r.observed[key];
 if(['production','staging'].includes(r.observed?.environment))o.environment=r.observed.environment;
 if(['open','draining'].includes(r.observed?.roomAdmission))o.roomAdmission=r.observed.roomAdmission;
 return JSON.stringify(o);
}
const validTime=n=>Number.isSafeInteger(n)&&n>=0;
const COLUMNS={
 observations:['id','check_id','at','ok','code','latency','observed'],
 check_state:['id','at','code','latency','observed','fail_count','good_count','incident_id'],
 incidents:['id','check_id','opened_at','last_seen','resolved_at','failures','last_code'],
 events:['id','at','type','incident_id','check_id'],
 scheduler:['id','owner','lease_until','next_due_at','clock_floor','last_cycle']
};
export class Store {
 constructor(file,{readOnly=false}={}){
  for(const p of [file,file+'-wal',file+'-shm',dirname(file)])if(existsSync(p)&&lstatSync(p).isSymbolicLink())throw Error('Symlink storage refused');
  const newlyCreated=!existsSync(file);
  if(newlyCreated){
   if(readOnly)throw Error('Storage not initialized');
   mkdirSync(dirname(file),{recursive:true,mode:0o700});writeFileSync(file,'',{flag:'wx',mode:0o600});
  }
  if(!lstatSync(file).isFile())throw Error('Storage must be a file');
  this.db=new DatabaseSync(file,{readOnly});this.readOnly=readOnly;
  try{
   this.db.exec('PRAGMA busy_timeout=5000');
   if(this.db.prepare('PRAGMA quick_check').get().quick_check!=='ok')throw Error('Storage integrity failure');
   const version=this.db.prepare('PRAGMA user_version').get().user_version;
   if(!newlyCreated){
    if(version!==1)throw Error('Existing storage schema is invalid');
    for(const [table,columns] of Object.entries(COLUMNS))if(JSON.stringify(this.db.prepare(`PRAGMA table_info(${table})`).all().map(x=>x.name))!==JSON.stringify(columns))throw Error('Existing storage schema is invalid');
    const scheduler=this.db.prepare('SELECT * FROM scheduler').all();if(scheduler.length!==1||scheduler[0].id!==1)throw Error('Existing scheduler is invalid');
   }else if(version!==0)throw Error('Unknown storage schema');
   if(!readOnly){
    chmodSync(file,0o600);this.db.exec('PRAGMA journal_mode=WAL; PRAGMA synchronous=FULL;');
    this.db.exec(`BEGIN IMMEDIATE;
     CREATE TABLE IF NOT EXISTS observations(id INTEGER PRIMARY KEY,check_id TEXT NOT NULL,at INTEGER NOT NULL,ok INTEGER NOT NULL,code TEXT NOT NULL,latency INTEGER NOT NULL,observed TEXT NOT NULL);
     CREATE TABLE IF NOT EXISTS check_state(id TEXT PRIMARY KEY,at INTEGER NOT NULL,code TEXT NOT NULL,latency INTEGER NOT NULL,observed TEXT NOT NULL,fail_count INTEGER NOT NULL,good_count INTEGER NOT NULL,incident_id TEXT);
     CREATE TABLE IF NOT EXISTS incidents(id TEXT PRIMARY KEY,check_id TEXT NOT NULL,opened_at INTEGER NOT NULL,last_seen INTEGER NOT NULL,resolved_at INTEGER,failures INTEGER NOT NULL,last_code TEXT NOT NULL);
     CREATE TABLE IF NOT EXISTS events(id INTEGER PRIMARY KEY,at INTEGER NOT NULL,type TEXT NOT NULL,incident_id TEXT NOT NULL,check_id TEXT NOT NULL);
     CREATE TABLE IF NOT EXISTS scheduler(id INTEGER PRIMARY KEY CHECK(id=1),owner TEXT,lease_until INTEGER NOT NULL DEFAULT 0,next_due_at INTEGER NOT NULL DEFAULT 0,clock_floor INTEGER NOT NULL DEFAULT 0,last_cycle INTEGER);
     INSERT OR IGNORE INTO scheduler(id) VALUES(1);
     PRAGMA user_version=1; COMMIT;`);
   }
  }catch(e){this.db.close();throw e;}
 }
 transaction(fn){
  this.db.exec('BEGIN IMMEDIATE');try{const value=fn();this.db.exec('COMMIT');return value;}catch(e){try{this.db.exec('ROLLBACK');}catch{}throw e;}
 }
 acquireLease(owner,now,ttl=60000,{force=false}={}){
  if(typeof owner!=='string'||!owner.length||owner.length>100||!validTime(now)||ttl!==60000)throw Error('Invalid lease');
  return this.transaction(()=>{
   const s=this.db.prepare('SELECT * FROM scheduler WHERE id=1').get();
   if(now<s.clock_floor||(s.owner&&now<s.lease_until)||(!force&&now<s.next_due_at))return false;
   this.db.prepare('UPDATE scheduler SET owner=?,lease_until=?,next_due_at=?,clock_floor=? WHERE id=1').run(owner,now+ttl,now+INTERVAL,now);
   return true;
  });
 }
 hasLease(owner,now){
  const s=this.db.prepare('SELECT * FROM scheduler WHERE id=1').get();
  return validTime(now)&&s.owner===owner&&now>=s.clock_floor&&now<s.lease_until;
 }
 releaseLease(owner){this.db.prepare('UPDATE scheduler SET owner=NULL,lease_until=0 WHERE id=1 AND owner=?').run(owner);}
 record(id,result,now,owner){
  if(!IDS.includes(id)||!validTime(now))throw Error('Invalid check');
  const observed=observation(result);
  return this.transaction(()=>{
   if(!this.hasLease(owner,now))throw Error('Lease lost');
   const old=this.db.prepare('SELECT * FROM check_state WHERE id=?').get(id);
   if(old&&now<old.at)throw Error('Clock rollback');
   const failures=result.ok?0:(old?.fail_count??0)+1,successes=result.ok?(old?.good_count??0)+1:0;
   let incidentId=old?.incident_id??null,event=null;
   if(!result.ok){
    if(incidentId)this.db.prepare('UPDATE incidents SET last_seen=?,failures=failures+1,last_code=? WHERE id=?').run(now,result.code,incidentId);
    else if(failures>=2){
     incidentId=randomUUID();this.db.prepare('INSERT INTO incidents VALUES(?,?,?,?,NULL,?,?)').run(incidentId,id,now,now,failures,result.code);
     event={type:'OPEN',incidentId,checkId:id,at:now};
    }
   }else if(incidentId&&successes>=2){
    this.db.prepare('UPDATE incidents SET resolved_at=?,last_seen=? WHERE id=?').run(now,now,incidentId);
    event={type:'RECOVERED',incidentId,checkId:id,at:now};incidentId=null;
   }
   this.db.prepare('INSERT INTO observations(check_id,at,ok,code,latency,observed) VALUES(?,?,?,?,?,?)').run(id,now,Number(result.ok),result.code,Math.round(result.latencyMs),observed);
   this.db.prepare('INSERT OR REPLACE INTO check_state VALUES(?,?,?,?,?,?,?,?)').run(id,now,result.code,Math.round(result.latencyMs),observed,failures,successes,incidentId);
   if(event)this.db.prepare('INSERT INTO events(at,type,incident_id,check_id) VALUES(?,?,?,?)').run(now,event.type,event.incidentId,id);
   this.db.prepare('DELETE FROM observations WHERE at<? OR id IN (SELECT id FROM observations ORDER BY id DESC LIMIT -1 OFFSET 25000)').run(now-30*DAY);
   this.db.prepare('DELETE FROM incidents WHERE resolved_at IS NOT NULL AND (resolved_at<? OR id IN (SELECT id FROM incidents WHERE resolved_at IS NOT NULL ORDER BY resolved_at DESC LIMIT -1 OFFSET 5000))').run(now-180*DAY);
   this.db.prepare('DELETE FROM events WHERE incident_id NOT IN (SELECT id FROM incidents) OR (at<? AND incident_id IN (SELECT id FROM incidents WHERE resolved_at IS NOT NULL))').run(now-180*DAY);
   return event;
  });
 }
 completeCycle(owner,now){
  this.transaction(()=>{if(!this.hasLease(owner,now))throw Error('Lease lost');this.db.prepare('UPDATE scheduler SET last_cycle=?,clock_floor=? WHERE id=1').run(now,now);});
 }
 report(now=Date.now()){
  if(!validTime(now))throw Error('Invalid clock');
  const fresh=at=>at!==null&&at!==undefined&&now>=at&&now-at<=STALE;
  const states=this.db.prepare('SELECT * FROM check_state').all(),scheduler=this.db.prepare('SELECT * FROM scheduler WHERE id=1').get();
  const checks=IDS.map(id=>{
   const s=states.find(x=>x.id===id);
   return {id,status:!fresh(s?.at)?'UNKNOWN':s.incident_id?(s.good_count>0?'RECOVERING':'INCIDENT'):(s.fail_count>0?'DEGRADED':'HEALTHY'),lastAt:s?.at??null,ageMs:s?now-s.at:null,lastCode:s?.code??null,latencyMs:s?.latency??null,observed:s?JSON.parse(s.observed):{},failures:s?.fail_count??0,successes:s?.good_count??0,incidentId:s?.incident_id??null};
  });
  return {schema:1,generatedAt:now,checks,observer:{status:fresh(scheduler.last_cycle)?'HEALTHY':'UNKNOWN',lastCycleAt:scheduler.last_cycle,nextDueAt:scheduler.next_due_at},sampleCount:this.db.prepare('SELECT count(*) n FROM observations').get().n,
   incidents:this.db.prepare('SELECT id,check_id checkId,opened_at openedAt,last_seen lastSeen,resolved_at resolvedAt,failures,last_code lastCode FROM incidents ORDER BY opened_at DESC LIMIT 100').all(),
   events:this.db.prepare('SELECT at,type,incident_id incidentId,check_id checkId FROM events ORDER BY id DESC LIMIT 100').all(),
   limits:{externalContinuousMonitoring:'NOT_CONFIGURED',notifications:'NOT_CONFIGURED',modelApi:'NOT_USED',scope:'Public health and approved release identity only'}};
 }
 close(){this.db.close();}
}
