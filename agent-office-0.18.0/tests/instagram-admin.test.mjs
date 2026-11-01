import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync,readFileSync,writeFileSync,rmSync,existsSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {makeSkills} from '../server/skills.mjs';
import {makeRolesReader} from '../server/roles.mjs';
import {robotRoster,roleRobotViews} from '../campus/src/robot-roster.js';
const id='instagram-admin',skillId='instagram-dm-support';
function fixture(t){const dir=mkdtempSync(tmpdir()+'/kip-admin-');t.after(()=>rmSync(dir,{recursive:true,force:true}));return {path:dir+'/skills.json',clock:()=>1700000001000};}
test('new office has an independent DM robot and installed drafting skill',t=>{
 const s=makeSkills(fixture(t)).read(),agent=s.agents.find(a=>a.id===id);
 assert.ok(agent,'Dedicated Instagram agent is registered');assert.equal(agent.authority,'draft');assert.deepEqual(agent.installedSkills,[skillId]);assert.equal(s.executionEnabled,false);
 assert.equal(robotRoster.filter(r=>r.id===id).length,1);assert.equal(robotRoster.find(r=>r.id===id).name,'AI Admin KIP');
 const skill=s.skills.find(s=>s.id===skillId);assert.equal(skill.activeVersion,1);assert.match(skill.versions[0].instructions,/Jangan mengarang/);
});
test('existing 0.17 registry migrates once without changing old skills, settings or history',t=>{
 const f=fixture(t),before=JSON.parse(readFileSync(new URL('./fixtures/skills-017.json',import.meta.url)));
 writeFileSync(f.path,JSON.stringify(before));const s=makeSkills(f).read();
 assert.equal(existsSync(f.path+'.v1-backup.json'),false,'schema 2 backup must not be mislabelled schema 1');assert.equal(s.agents.length,before.agents.length+1);assert.deepEqual(s.agents.filter(a=>a.id!==id),before.agents);assert.deepEqual(s.skills.filter(a=>a.id!==skillId),before.skills);
 assert.deepEqual(s.testRuns,before.testRuns);assert.deepEqual(s.audit.slice(0,before.audit.length),before.audit);assert.equal(s.revision,before.revision+1);
 assert.deepEqual(makeSkills(f).read(),s);assert.deepEqual(JSON.parse(readFileSync(f.path+'.before-instagram-admin.json')),before);
});
test('profile reports blocked honestly and never animates a working or resting DM agent',()=>{
 const report=makeRolesReader({registryPath:'/missing',capacityPath:'/missing',clock:()=>1700000001000})();
 const role=report.roles.find(r=>r.id===id);assert.ok(role);assert.equal(role.status,'BLOCKED');assert.match(role.blocker,/Meta/);
 const view=roleRobotViews(report,1700000001000).find(r=>r.id===id);assert.equal(view.canRest,false);assert.equal(view.status,'BLOCKED');
});
