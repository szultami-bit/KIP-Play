const activeVersion=skill=>skill?.versions?.find(version=>version.version===skill.activeVersion)||null;
const candidateVersion=skill=>skill?.versions?.find(version=>version.version===skill.candidateVersion)||null;

export function registrySummary(registry){
 const agents=Array.isArray(registry?.agents)?registry.agents:[];
 const skills=Array.isArray(registry?.skills)?registry.skills:[];
 const candidates=skills.map(candidateVersion).filter(Boolean);
 return {
  agentCount:agents.length,
  skillCount:skills.length,
  activeCount:skills.filter(skill=>activeVersion(skill)).length,
  candidateCount:candidates.length,
  invalidCandidateCount:candidates.filter(version=>!version.validation?.valid).length,
  installationCount:agents.reduce((total,agent)=>total+(Array.isArray(agent.installedSkills)?agent.installedSkills.length:0),0),
  revision:Number.isSafeInteger(registry?.revision)?registry.revision:0
 };
}

export function versionState(skill,registry){
 const active=activeVersion(skill),candidate=candidateVersion(skill);
 const hasCandidate=!!candidate,candidateValid=!!candidate?.validation?.valid;
 const changedAt=(registry?.audit||[]).findLast(e=>e.skillId===skill?.id&&['skill.create','candidate.create','candidate.save'].includes(e.action))?.revision??0;
 const testRun=(registry?.testRuns||[]).findLast(run=>run.skillId===skill?.id&&run.version===candidate?.version&&run.revision>changedAt)||null;
 const tested=!!testRun?.passed;
 return {
  activeVersion:active?.version??null,
  candidateVersion:candidate?.version??null,
  latestVersion:Math.max(0,...(skill?.versions||[]).map(version=>Number(version.version)||0)),
  hasCandidate,
  candidateValid,
  candidateIssues:candidate?.validation?.issues?[...candidate.validation.issues]:[],
  testRun,
  canActivate:hasCandidate&&candidateValid&&tested,
  label:hasCandidate?(candidateValid?(tested?`Kandidat v${candidate.version} siap diaktifkan`:`Kandidat v${candidate.version} perlu Test`):`Kandidat v${candidate.version} perlu diperbaiki`):(active?`Aktif v${active.version}`:'Belum aktif'),
  tone:hasCandidate?(candidateValid?'candidate':'attention'):(active?'active':'inactive')
 };
}

export function preferredVersion(skill){return candidateVersion(skill)||activeVersion(skill)||skill?.versions?.at(-1)||null;}
export function getActiveVersion(skill){return activeVersion(skill);}
export function getCandidateVersion(skill){return candidateVersion(skill);}

export function filterSkills(skills,{query='',category='all',state='all'}={}){
 const needle=String(query).trim().toLocaleLowerCase('id');
 return (Array.isArray(skills)?skills:[]).filter(skill=>{
  const current=preferredVersion(skill),status=versionState(skill);
  const haystack=[skill.id,current?.title,current?.description,current?.category].filter(Boolean).join(' ').toLocaleLowerCase('id');
  if(needle&&!haystack.includes(needle))return false;
  if(category!=='all'&&current?.category!==category)return false;
  if(state==='candidate'&&!status.hasCandidate)return false;
  if(state==='invalid'&&!(status.hasCandidate&&!status.candidateValid))return false;
  if(state==='active'&&status.activeVersion===null)return false;
  if(state==='inactive'&&status.activeVersion!==null)return false;
  return true;
 });
}

export function agentTools(registry,agentId){
 const agent=(registry?.agents||[]).find(item=>item.id===agentId);if(!agent)return [];
 const tools=new Set();
 for(const skillId of agent.installedSkills||[]){
  const skill=(registry.skills||[]).find(item=>item.id===skillId),version=activeVersion(skill);
  for(const tool of version?.tools||[])tools.add(tool);
 }
 return [...tools].sort((a,b)=>a.localeCompare(b,'id'));
}
