import {createHash,randomUUID} from 'node:crypto';

// Missing diagnostic fields remain unknown. Different releases stay separate.
export function caseFingerprint(job) {
 const identity = job.kind === 'monitor'
  ? ['monitor', job.service || 'games.kampunginggrispontianak.com', job.checkId, job.code,
     job.observed?.release || null, job.observed?.fingerprint || null,
     job.expected?.release || null, job.expected?.fingerprint || null]
  : [job.kind, job.path||null, job.source||null, job.backend||null, job.scenarioId||null, job.checkpoint||null, job.game, job.mode, job.errorClass, job.asset, job.line, job.column, job.release || job.incidentId];
 return createHash('sha256').update(JSON.stringify(identity)).digest('hex');
}

export function hasRepairProof(job) {
 const p = job.receipt, v = p?.verification;
 return job.status === 'completed' && /^verified-(game-|availability-)?repair$/.test(job.resolution || '') &&
  !!p?.rootCause && /^[a-f0-9]{40}$/.test(p.patchSha || '') &&
  /^[a-f0-9]{40}$/.test(p.deployedRelease || '') && p.tests?.passed > 0 && p.tests.failed === 0 &&
  v?.passed === true && v.httpPassed !== false && v.expectedRelease === p.deployedRelease &&
  /^[a-f0-9]{64}$/.test(v.expectedFingerprint || '') && v.at >= p.deploymentAt &&
  Array.isArray(p.evidence) && p.evidence.length > 0 &&
  (job.kind !== 'availability' || (v.scope==='http-availability' && v.path===job.path && v.gameplayPassed===undefined)) &&
  (job.kind !== 'game' || (v.gameplayPassed === true && !!v.scenario &&
   ['start', 'play', 'result'].every(step => v.steps?.[step] === true)));
}

export function makeCaseStore(db) {
 db.exec(`CREATE TABLE IF NOT EXISTS repair_cases(id TEXT PRIMARY KEY, fingerprint TEXT UNIQUE NOT NULL);
 CREATE TABLE IF NOT EXISTS repair_case_jobs(job_id TEXT PRIMARY KEY,case_id TEXT NOT NULL);
 CREATE TABLE IF NOT EXISTS repair_observations(id INTEGER PRIMARY KEY,job_id TEXT NOT NULL,at INTEGER NOT NULL,kind TEXT NOT NULL,payload TEXT NOT NULL,UNIQUE(job_id,at,kind));
 CREATE TABLE IF NOT EXISTS repair_playbooks(fingerprint TEXT PRIMARY KEY,job_id TEXT NOT NULL,verified_at INTEGER NOT NULL,procedure TEXT NOT NULL);`);
 function ensureCase(job) {
  const fingerprint=caseFingerprint(job);
  const existing=db.prepare('SELECT id FROM repair_cases WHERE fingerprint=?').get(fingerprint);
  if(existing)return existing.id;
  const id=db.prepare('SELECT id FROM repair_cases WHERE id=?').get(job.id)?randomUUID():job.id;
  db.prepare('INSERT OR IGNORE INTO repair_cases(id,fingerprint) VALUES(?,?)').run(id,fingerprint);
  return db.prepare('SELECT id FROM repair_cases WHERE fingerprint=?').get(fingerprint).id;
 }
 function link(job) {
  const existing=db.prepare('SELECT case_id FROM repair_case_jobs WHERE job_id=?').get(job.id);
  if(existing)return existing.case_id;
  const id=ensureCase(job);
  db.prepare('INSERT OR IGNORE INTO repair_case_jobs(job_id,case_id) VALUES(?,?)').run(job.id,id);
  return id;
 }
 function reclassify(job) {
  const id=ensureCase(job);
  db.prepare('UPDATE repair_case_jobs SET case_id=? WHERE job_id=?').run(id,job.id);
 }
 function attemptHistory(job) {
  return db.prepare('SELECT at,kind,payload FROM repair_observations WHERE job_id=? ORDER BY id').all(job.id).map(o=>({at:o.at,kind:o.kind,...JSON.parse(o.payload)}));
 }
 function priorAttempts(job) {
  return db.prepare(`SELECT r.id,r.payload,r.receipt,r.status,r.updated_at FROM repairs r
   JOIN repair_case_jobs j ON j.job_id=r.id JOIN repair_cases c ON c.id=j.case_id
   WHERE c.fingerprint=? AND r.id<>? ORDER BY r.created_at`)
   .all(caseFingerprint(job),job.id).map(r=>({id:r.id,status:r.status,updatedAt:r.updated_at,
    evidence:JSON.parse(r.payload),receipt:r.receipt?JSON.parse(r.receipt):null}));
 }
 function record(job, kind, at, payload) {
  link(job);
  db.prepare('INSERT OR IGNORE INTO repair_observations(job_id,at,kind,payload) VALUES(?,?,?,?)')
   .run(job.id, at, kind, JSON.stringify(payload));
 }
 function learn(job) {
  if (!hasRepairProof(job)) return;
  const procedure=job.receipt.procedure||{conditions:['Cocokkan layanan, gejala, dan bukti teknis kasus ini.', 'Periksa ulang kewenangan dan hasil audit rilis yang akan diterapkan.'],steps:['Tinjau patch terverifikasi '+job.receipt.patchSha,job.receipt.summary],rollback:['Gunakan prosedur pemulihan rilis yang telah disetujui bila uji ulang gagal.'],replayMode:'review-verified-patch'};
  db.prepare(`INSERT INTO repair_playbooks(fingerprint,job_id,verified_at,procedure) VALUES(?,?,?,?)
   ON CONFLICT(fingerprint) DO UPDATE SET job_id=excluded.job_id,verified_at=excluded.verified_at,procedure=excluded.procedure`)
   .run(caseFingerprint(job), job.id, job.receipt.verification.at, JSON.stringify(procedure));
 }
 function match(job) {
  const row = db.prepare('SELECT * FROM repair_playbooks WHERE fingerprint=?').get(caseFingerprint(job));
  return row ? {sourceJobId:row.job_id,verifiedAt:row.verified_at,...JSON.parse(row.procedure),
   authorization:'existing-worker-scope',requiresFreshVerification:true} : null;
 }
 function list(jobs) {
  const groups = new Map();
  for (const job of [...jobs].sort((a,b)=>a.createdAt-b.createdAt)) {
   const id = link(job);
   let group = groups.get(id);
   if (!group) { group = {id,episodes:[]}; groups.set(id,group); }
   group.episodes.push(job);
  }
  return [...groups.values()].map(group=>{
   const latest = group.episodes.at(-1);
   const active = group.episodes.filter(j=>!['completed','recovered'].includes(j.status)).at(-1);
   const job = active || latest;
   const observations = group.episodes.flatMap(j=>db.prepare('SELECT at,kind,payload FROM repair_observations WHERE job_id=? ORDER BY id').all(j.id)
    .map(o=>({jobId:j.id,at:o.at,kind:o.kind,...JSON.parse(o.payload)})));
   return {...job,id:group.id,jobId:job.id,occurrences:group.episodes.length,
    firstAt:group.episodes[0].createdAt,lastAt:Math.max(...group.episodes.map(j=>j.observedAt)),
    disposition:active?'active':hasRepairProof(latest)?'history':'monitor',
    reopened:group.episodes.length>1 && !!active,
    episodes:group.episodes,observations,matchedSkill:match(job),
    history:group.episodes.flatMap((j,index)=>[
     ...(index?[{at:j.createdAt,event:'Kasus dibuka kembali',jobId:j.id}]:[]),
     ...j.history.map(e=>({...e,jobId:j.id}))]).sort((a,b)=>a.at-b.at)};
  }).sort((a,b)=>b.updatedAt-a.updatedAt);
 }
 return {link,reclassify,record,learn,match,priorAttempts,attemptHistory,list};
}
