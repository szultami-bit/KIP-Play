import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {makeSkills} from '../server/skills.mjs';
import {makeTasks} from '../server/tasks.mjs';
import {makeRepairs} from '../server/repairs.mjs';
import {installGameTeam,teamReport} from '../server/game-team.mjs';
import {makeGameMonitor} from '../server/game-monitor.mjs';
import {normalizeIncident} from '../server/incidents.mjs';
import {GAME_TEAM} from '../src/game-team.js';
import {robotRoster} from '../campus/src/robot-roster.js';
import {createMotion} from '../campus/src/agent-motion.js';
const fixture=fn=>{const p=mkdtempSync(join(tmpdir(),'kip-team-'));try{return fn(p)}finally{rmSync(p,{recursive:true,force:true});}};
test('team installs once, retains original skill assignments, and never grants shell authority',()=>fixture(p=>{
 const s=makeSkills({path:join(p,'skills.json')});const before=s.read();installGameTeam(s);const after=s.read();installGameTeam(s);assert.equal(s.read().revision,after.revision);
 for(const member of GAME_TEAM){const a=after.agents.find(a=>a.id===member.id);assert.equal(a.authority,before.agents.find(b=>b.id===a.id).authority);assert.ok(a.installedSkills.includes(member.skillId));for(const old of before.agents.find(b=>b.id===a.id).installedSkills)assert.ok(a.installedSkills.includes(old));}
 assert.equal(after.executionEnabled,false);
}));
test('all five selected robots wait at their assigned floor-two desks',()=>{
 for(const member of GAME_TEAM){const r=robotRoster.find(r=>r.id===member.id);assert.equal(r.desk[1],4.6);assert.equal(r.name,member.name);assert.equal(createMotion(member.id).step(0,{snap:true}).level,1);}
});
test('monitor requires two failures; auth walls are not errors; repeated failures do not flood',async()=>{
 const events=[];let status=503;const m=makeGameMonitor({tasks:{recordAvailability:i=>events.push(i)},targets:[{game:'lucky-wheel',path:'/games/lucky-wheel/index.html'}],fetcher:async()=>({status})});
 await m.runOnce();assert.equal(events.length,0);await m.runOnce();await m.runOnce();assert.equal(events.length,1);assert.equal(events[0].game,'lucky-wheel');assert.throws(()=>normalizeIncident(events[0]),/BAD_INCIDENT/);status=401;await m.runOnce();assert.equal(m.snapshot().samples[0].state,'auth-required');assert.equal(events.length,1);
});
test('cross-game incident creates persistent lead, specialist and QA assignment',()=>fixture(p=>{
 const repairs=makeRepairs({path:join(p,'repairs.sqlite')});try{repairs.observeIncidents([{id:'12345678-1234-4123-8123-123456789abc',game:'edurace',mode:'screen',kind:'resource',lastAt:Date.now(),asset:'index.html',errorClass:'ResourceError',line:0,column:0}]);const job=repairs.list().jobs[0];assert.equal(job.agentId,'support');assert.equal(job.specialistId,'payments');assert.equal(job.testerId,'qa');assert.equal(job.floor,2);}finally{repairs.close();}
}));
test('stopped worker never appears active and scope does not claim tested gameplay',()=>fixture(p=>{
 const tasks=makeTasks({path:join(p,'tasks.sqlite')}),repairs=makeRepairs({path:join(p,'repairs.sqlite')});try{const r=teamReport({tasks,repairs,monitor:{snapshot:()=>({checked:0,total:55})}});assert.ok(r.roles.every(r=>r.status==='UNKNOWN'));tasks.heartbeat();assert.ok(teamReport({tasks,repairs,monitor:{snapshot:()=>({checked:0,total:55})}}).roles.every(r=>r.status==='ACTIVE'));}finally{tasks.close();repairs.close();}
}));
