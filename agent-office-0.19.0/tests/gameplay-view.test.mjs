import test from 'node:test';
import assert from 'node:assert/strict';
import {gameplayView,gameplayDelay} from '../campus/src/gameplay-panel.js';
const at=Date.parse('2026-11-03T08:00:00Z');
const report={schemaVersion:1,generatedAt:at,sessions:{status:'CURRENT',observedAt:at,started:107,completed:38,games:[{game:'eduracing',started:12,completed:5},{game:'lucky-wheel',started:26,completed:9}]},synthetic:{status:'PASS',observedAt:at,completedSessions:2,scenarios:[{id:'race-screen',game:'eduracing',mode:'screen',status:'PASS',completedSessions:1,checkpoints:['login','start','answer','result','replay']}]},operations:{verifiedRepairs:0,meanResolutionMs:null,medianResolutionMs:null,repeatedErrors:0,openJobs:1},coverage:[{game:'edurace',status:'SCENARIO_RECORDED'},{game:'tower',status:'NOT_RUN'}]};
test('panel separates observed completion from synthetic tests and ranks by real starts',()=>{
 const view=gameplayView(report,at);
 assert.equal(view.sessions.completed,38);assert.equal(view.sessions.started,107);assert.equal(view.synthetic.completed,2);
 assert.equal(view.sessions.games[0].game,'lucky-wheel');assert.equal(view.operations.mean,'Belum ada perbaikan terverifikasi');
 assert.match(view.synthetic.label,/skenario tercatat/);assert.deepEqual(view.untested,['tower']);
});
test('old, disconnected and unknown-release evidence never remains a fresh pass',()=>{
 assert.equal(gameplayView(report,at+7200001).synthetic.status,'STALE');
 assert.equal(gameplayView(report,at+7200001).sessions.status,'STALE');
 assert.equal(gameplayView(report,at,false).synthetic.status,'UNAVAILABLE');
 assert.equal(gameplayView({...report,synthetic:{...report.synthetic,status:'STALE_RELEASE'}},at).synthetic.status,'STALE_RELEASE');
 assert.equal(gameplayView(null,at).sessions.completed,null);
 assert.equal(gameplayView({...report,generatedAt:at+1},at).synthetic.status,'UNAVAILABLE');
});
test('gameplay polling stops on hidden pages, offline connections or expired sessions, with capped backoff',()=>{
 assert.equal(gameplayDelay({}),60000);assert.equal(gameplayDelay({failures:9}),300000);
 for(const flag of ['hidden','offline','session'])assert.equal(gameplayDelay({[flag]:true}),null);
});
