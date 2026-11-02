import {DatabaseSync} from 'node:sqlite';
import {openSync,closeSync,constants} from 'node:fs';
import {createHash,randomUUID} from 'node:crypto';
export class TaskError extends Error{constructor(code,status=400){super(code);this.code=code;this.status=status;}}
export const REQUEST_ID=/^[a-f0-9]{8}-[a-f0-9]{4}-[1-5][a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i;
const digest=x=>createHash('sha256').update(JSON.stringify(x)).digest('hex');
export function makeTasks({path,clock=Date.now,limit=1000}={}){
 if(!path)throw Error('TASK_PATH_REQUIRED');const fd=openSync(path,constants.O_RDWR|constants.O_CREAT|constants.O_NOFOLLOW,0o600);closeSync(fd);
 const db=new DatabaseSync(path);db.exec('PRAGMA busy_timeout=1000; PRAGMA journal_mode=WAL; PRAGMA synchronous=FULL; PRAGMA max_page_count=8192;');
 const version=db.prepare('PRAGMA user_version').get().user_version;if(version>1){db.close();throw Error('TASK_SCHEMA_UNSUPPORTED');}
 db.exec(`CREATE TABLE IF NOT EXISTS jobs(id TEXT PRIMARY KEY,request_id TEXT UNIQUE NOT NULL,request_hash TEXT NOT NULL,payload TEXT NOT NULL,status TEXT NOT NULL,attempts INTEGER NOT NULL DEFAULT 0,created_at INTEGER NOT NULL,updated_at INTEGER NOT NULL,lease_token TEXT,lease_until INTEGER,result TEXT);
 CREATE INDEX IF NOT EXISTS jobs_queue ON jobs(status,created_at);
 CREATE TABLE IF NOT EXISTS task_events(id INTEGER PRIMARY KEY,job_id TEXT NOT NULL,at INTEGER NOT NULL,event TEXT NOT NULL);
 CREATE TABLE IF NOT EXISTS incidents(id TEXT PRIMARY KEY,fingerprint TEXT UNIQUE NOT NULL,payload TEXT NOT NULL,first_at INTEGER NOT NULL,last_at INTEGER NOT NULL,occurrences INTEGER NOT NULL,job_id TEXT);
 CREATE TABLE IF NOT EXISTS incident_events(event_id TEXT PRIMARY KEY,request_hash TEXT NOT NULL,incident_id TEXT NOT NULL,at INTEGER NOT NULL);
 CREATE INDEX IF NOT EXISTS incident_event_time ON incident_events(at);
 CREATE TABLE IF NOT EXISTS task_meta(key TEXT PRIMARY KEY,value INTEGER NOT NULL);
 PRAGMA user_version=1;`);
 function transaction(fn){try{db.exec('BEGIN IMMEDIATE');const result=fn();db.exec('COMMIT');return result;}catch(e){try{db.exec('ROLLBACK');}catch{}if(e instanceof TaskError)throw e;throw new TaskError('TASKS_UNAVAILABLE',503);}}
 const event=(id,type)=>db.prepare('INSERT INTO task_events(job_id,at,event) VALUES(?,?,?)').run(id,clock(),type);
 const decode=row=>row?{...JSON.parse(row.payload),id:row.id,status:row.status,attempts:row.attempts,createdAt:row.created_at,updatedAt:row.updated_at,leaseToken:row.lease_token,leaseUntil:row.lease_until,result:row.result?JSON.parse(row.result):null}:null;
 function insert(request){
  if(!request||!REQUEST_ID.test(request.requestId)||!['manual','incident'].includes(request.source)||typeof request.taskId!=='string'||JSON.stringify(request).length>16000)throw new TaskError('BAD_TASK_REQUEST');
  const hash=digest(request),old=db.prepare('SELECT * FROM jobs WHERE request_id=?').get(request.requestId);
  if(old){if(old.request_hash!==hash)throw new TaskError('REQUEST_ID_CONFLICT',409);return decode(old);}
  if(db.prepare('SELECT COUNT(*) AS n FROM jobs').get().n>=limit)throw new TaskError('TASK_LIMIT',503);
  const id=randomUUID(),at=clock();db.prepare('INSERT INTO jobs(id,request_id,request_hash,payload,status,created_at,updated_at) VALUES(?,?,?,?,?,?,?)').run(id,request.requestId,hash,JSON.stringify(request),'queued',at,at);event(id,'queued');return decode(db.prepare('SELECT * FROM jobs WHERE id=?').get(id));
 }
 function enqueueManual(intent,pinFactory){return transaction(()=>{
  if(!intent||!REQUEST_ID.test(intent.requestId)||typeof intent.taskId!=='string')throw new TaskError('BAD_TASK_REQUEST');
  const old=db.prepare('SELECT * FROM jobs WHERE request_id=?').get(intent.requestId);
  if(old){const job=decode(old);if(job.source!=='manual'||job.taskId!==intent.taskId)throw new TaskError('REQUEST_ID_CONFLICT',409);return job;}
  return insert(pinFactory());
 });}
 function recoverInside(){
  for(const row of db.prepare("SELECT * FROM jobs WHERE status='running' AND lease_until<=?").all(clock())){
   const status=row.attempts>=3?'failed':'queued',result=status==='failed'?JSON.stringify({status,summary:'Pemeriksaan terputus tiga kali. Jalankan tugas baru setelah layanan diperiksa.',evidence:[],nextSteps:[],externalActions:false}):null;
   db.prepare('UPDATE jobs SET status=?,lease_token=NULL,lease_until=NULL,updated_at=?,result=? WHERE id=?').run(status,clock(),result,row.id);event(row.id,status==='failed'?'retry_limit':'recovered');
  }
 }
 function claim(){return transaction(()=>{recoverInside();const row=db.prepare("SELECT * FROM jobs WHERE status='queued' ORDER BY created_at,rowid LIMIT 1").get();if(!row)return null;const token=randomUUID();db.prepare("UPDATE jobs SET status='running',attempts=attempts+1,lease_token=?,lease_until=?,updated_at=? WHERE id=?").run(token,clock()+30000,clock(),row.id);event(row.id,'running');return decode(db.prepare('SELECT * FROM jobs WHERE id=?').get(row.id));});}
 function finish(id,token,result){
  if(!['completed','blocked','failed'].includes(result?.status)||typeof result.summary!=='string'||result.summary.length>1200||JSON.stringify(result).length>16384)throw new TaskError('BAD_TASK_RESULT');
  return transaction(()=>{const r=db.prepare("UPDATE jobs SET status=?,result=?,updated_at=?,lease_token=NULL,lease_until=NULL WHERE id=? AND status='running' AND lease_token=? AND lease_until>?").run(result.status,JSON.stringify(result),clock(),id,token,clock());if(!r.changes)return false;event(id,result.status);return true;});
 }
 function list(){const jobs=db.prepare('SELECT * FROM jobs ORDER BY created_at DESC,rowid DESC LIMIT 100').all().map(row=>{const job=decode(row);delete job.leaseToken;delete job.leaseUntil;job.history=db.prepare('SELECT at,event FROM task_events WHERE job_id=? ORDER BY id').all(job.id);return job;});const counts=Object.fromEntries(db.prepare('SELECT status,COUNT(*) AS n FROM jobs GROUP BY status').all().map(r=>[r.status,r.n]));const lastAt=db.prepare("SELECT value FROM task_meta WHERE key='worker'").get()?.value||null;return {schemaVersion:1,jobs,counts,worker:{lastAt,status:lastAt&&clock()-lastAt>=0&&clock()-lastAt<20000?'running':'unknown'}};}
 function incident(record,route){return transaction(()=>{
  const hash=digest(record),prior=db.prepare('SELECT * FROM incident_events WHERE event_id=?').get(record.eventId);
  if(prior){if(prior.request_hash!==hash)throw new TaskError('EVENT_ID_CONFLICT',409);return {id:prior.incident_id,duplicate:true};}
  const at=clock(),count=since=>db.prepare('SELECT COUNT(*) AS n FROM incident_events WHERE at>=?').get(since).n;
  if(count(at-60000)>=30||count(at-86400000)>=500)throw new TaskError('INCIDENT_RATE_LIMIT',429);
  if(count(0)>=10000)throw new TaskError('INCIDENT_LIMIT',503);
  const {eventId,...payload}=record,fingerprint=digest(payload);let issue=db.prepare('SELECT * FROM incidents WHERE fingerprint=?').get(fingerprint);
  if(!issue){
   if(db.prepare('SELECT COUNT(*) AS n FROM incidents').get().n>=500)throw new TaskError('INCIDENT_LIMIT',503);
   const id=randomUUID();db.prepare('INSERT INTO incidents(id,fingerprint,payload,first_at,last_at,occurrences) VALUES(?,?,?,?,?,0)').run(id,fingerprint,JSON.stringify(payload),at,at);
   issue=db.prepare('SELECT * FROM incidents WHERE id=?').get(id);
   if(route){const request=route({id,...payload,observedAt:at});if(request){const job=insert(request);db.prepare('UPDATE incidents SET job_id=? WHERE id=?').run(job.id,id);}}
  }
  db.prepare('UPDATE incidents SET last_at=?,occurrences=occurrences+1 WHERE id=?').run(at,issue.id);
  db.prepare('INSERT INTO incident_events(event_id,request_hash,incident_id,at) VALUES(?,?,?,?)').run(eventId,hash,issue.id,at);
  return {id:issue.id,duplicate:false};
 });}
 function assignPending(route){return transaction(()=>{
  let assigned=0;for(const row of db.prepare('SELECT * FROM incidents WHERE job_id IS NULL ORDER BY first_at LIMIT 500').all()){
   let request;try{request=route({id:row.id,...JSON.parse(row.payload),observedAt:row.first_at});}catch(e){if(e instanceof TaskError&&e.code==='TASK_SKILL_UNAVAILABLE')continue;throw e;}
   if(request){let job;try{job=insert(request);}catch(e){if(e instanceof TaskError&&e.code==='TASK_LIMIT')break;throw e;}db.prepare('UPDATE incidents SET job_id=? WHERE id=?').run(job.id,row.id);event(job.id,'coordinator.assigned');assigned++;if(assigned>=10)break;}
  }return assigned;
 });}
 function incidents({forRepair=false}={}){return {schemaVersion:1,issues:db.prepare('SELECT * FROM incidents ORDER BY last_at DESC LIMIT ?').all(forRepair===true?500:100).map(r=>({id:r.id,...JSON.parse(r.payload),firstAt:r.first_at,lastAt:r.last_at,occurrences:r.occurrences,jobId:r.job_id,verification:'UNVERIFIED'}))};}
 function heartbeat(){db.prepare("INSERT INTO task_meta(key,value) VALUES('worker',?) ON CONFLICT(key) DO UPDATE SET value=excluded.value").run(clock());}
 return {incident,incidents,assignPending,enqueueManual,enqueue:request=>transaction(()=>insert(request)),claim,finish,list,recover:()=>transaction(recoverInside),heartbeat,close:()=>db.close()};
}
