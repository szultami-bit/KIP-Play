import test from 'node:test';
import assert from 'node:assert/strict';
import {roleEvidenceAt} from '../src/role-evidence.js';
const now=1793475600000;
const report={schemaVersion:1,generatedAt:now,roles:[{id:'coordinator',status:'ACTIVE',recordedStatus:'ACTIVE',freshness:'current',lastAt:now,maxAgeMs:3600000,source:'Audit',scope:'Limited scope',blocker:'Still limited',evidence:['One result'],capabilities:['Summarize'],metrics:null}]};
test('UI never treats configured role name as proof of activation',()=>{assert.equal(roleEvidenceAt(null,'capacity',now).status,'UNKNOWN');assert.equal(roleEvidenceAt(report,'capacity',now).status,'UNKNOWN');});
test('UI expires each record locally and retains historical evidence without active green',()=>{assert.equal(roleEvidenceAt(report,'coordinator',now).status,'ACTIVE');const old=roleEvidenceAt(report,'coordinator',now+3600001);assert.equal(old.status,'HISTORICAL');assert.equal(old.freshness,'historical');assert.equal(old.recordedStatus,'ACTIVE');});
test('UI makes future, duplicate, disconnected and malformed records unknown',()=>{for(const r of [{...report,generatedAt:now+1},{...report,roles:[report.roles[0],report.roles[0]]},{...report,roles:[{...report.roles[0],lastAt:now+1}]},{...report,roles:[{...report.roles[0],maxAgeMs:0}]}])assert.equal(roleEvidenceAt(r,'coordinator',now).status,'UNKNOWN');assert.equal(roleEvidenceAt(report,'coordinator',now,false).status,'UNKNOWN');});
