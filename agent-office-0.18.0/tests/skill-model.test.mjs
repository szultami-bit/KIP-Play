import test from 'node:test';import assert from 'node:assert/strict';
import {versionState} from '../campus/src/skill-model.js';
const skill={id:'riset-kip',activeVersion:null,candidateVersion:1,versions:[{version:1,validation:{valid:true}}]};
test('valid candidate stays inactive until a passing persisted Test',()=>{assert.equal(versionState(skill,{testRuns:[],audit:[]}).canActivate,false);});
test('model accepts current Test and rejects a later saved draft',()=>{const registry={testRuns:[{skillId:'riset-kip',version:1,passed:true,revision:2}],audit:[{skillId:'riset-kip',version:1,action:'skill.create',revision:1}]};assert.equal(versionState(skill,registry).canActivate,true);registry.audit.push({skillId:'riset-kip',version:1,action:'candidate.save',revision:3});assert.equal(versionState(skill,registry).canActivate,false);});
