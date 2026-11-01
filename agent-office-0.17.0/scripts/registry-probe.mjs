import assert from 'node:assert/strict';
import {existsSync} from 'node:fs';
import {makeSkills} from '../server/skills.mjs';
const path='/office-state/acceptance-017-probe.json',exists=existsSync(path),store=makeSkills({path});
const send=action=>store.update({revision:store.read().revision,...action});
if(!exists){
 const base=store.read().skills[0].versions[0],{version,createdAt,validation,...value}=base;
 send({action:'skill.create',value:{id:'acceptance-017-probe',...value}});
 send({action:'candidate.test',skillId:'acceptance-017-probe',version:1});send({action:'candidate.activate',skillId:'acceptance-017-probe',version:1});
 send({action:'candidate.create',skillId:'acceptance-017-probe'});send({action:'candidate.save',skillId:'acceptance-017-probe',version:2,value:{...value,changelog:'Verifikasi versi kedua.'}});send({action:'candidate.test',skillId:'acceptance-017-probe',version:2});send({action:'candidate.activate',skillId:'acceptance-017-probe',version:2});send({action:'skill.rollback',skillId:'acceptance-017-probe',version:1});
}
const state=makeSkills({path}).read();assert.equal(state.schemaVersion,2);assert.equal(state.skills.at(-1).activeVersion,1);assert.equal(state.revision,8);assert.equal(state.audit.length,8);assert.equal(state.testRuns.length,2);assert.equal(state.executionEnabled,false);
console.log(JSON.stringify({type:'REGISTRY_PERSISTENCE_PROBE',version:'0.17.0',phase:exists?'READ_AFTER_RESTART':'INITIAL_WRITE',revision:state.revision,activeVersion:1,auditEvents:state.audit.length,testRuns:state.testRuns.length,status:'PASS'}));
