import test from 'node:test';
import assert from 'node:assert/strict';
import {GAME_TARGETS,makeGameMonitor} from '../server/game-monitor.mjs';
test('Speaking Studio monitor uses canonical deployed route and still reports real outages',async()=>{
 const events=[],requests=[];let outage=false;
 const target=GAME_TARGETS.find(t=>t.game==='speaking-studio');
 const m=makeGameMonitor({targets:[target],tasks:{recordAvailability:e=>events.push(e)},fetcher:async url=>{requests.push(url);return {status:outage?503:url==='https://games.kampunginggrispontianak.com/speaking-studio'?200:404};}});
 await m.runOnce();await m.runOnce();assert.equal(events.length,0);
 assert.equal(requests[0],'https://games.kampunginggrispontianak.com/speaking-studio');
 assert.equal(m.snapshot().samples[0].state,'reachable');
 outage=true;await m.runOnce();assert.equal(events.length,0);await m.runOnce();assert.equal(events.length,1);
 assert.equal(events[0].game,'speaking-studio');m.stop();
});
