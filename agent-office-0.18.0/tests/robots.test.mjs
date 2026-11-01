import test from 'node:test';
import assert from 'node:assert/strict';
import {robotRoster,roleRobots,roleRobotViews,isObserver} from '../campus/src/robot-roster.js';
import {agentRoute,createMotion} from '../campus/src/agent-motion.js';
const now=1793493000000;
const record=(id='capacity',status='HEALTHY')=>({id,status,recordedStatus:status,freshness:'current',lastAt:now,maxAgeMs:605000,source:'fixture',scope:'test only',blocker:'',evidence:[],capabilities:[],metrics:null});
const report=r=>({schemaVersion:1,generatedAt:now,roles:[r]});
const v=(r,n=now,connected=true)=>roleRobotViews(report(r),n,connected).find(x=>x.id===r.id);
test('fourteen distinct robots and desks; twelve role reports never overwrite two observers',()=>{assert.equal(robotRoster.length,14);assert.equal(new Set(robotRoster.map(r=>r.id)).size,14);assert.equal(new Set(robotRoster.map(r=>r.desk.join(','))).size,14);assert.equal(roleRobots.length,12);assert.ok(roleRobots.every(r=>!isObserver(r.id)));assert.ok(roleRobotViews(null).every(r=>r.status==='UNKNOWN'&&!r.canRest));});
test('all fourteen reversible routes have unique destinations and climb inside staircase only',()=>{const ends=[];for(const robot of robotRoster){const r=agentRoute(robot.id);assert.deepEqual(r.points[0],robot.desk);assert.ok(r.lengths.every(x=>Number.isFinite(x)&&x>0));ends.push(r.points.at(-1).join(','));for(let i=1;i<r.points.length;i++){const a=r.points[i-1],b=r.points[i];if(a[1]!==b[1])assert.ok(a[0]>=-17.55&&a[0]<=-13&&a[0]===b[0]);}}assert.equal(new Set(ends).size,14);assert.throws(()=>agentRoute('invalid'));});
test('capacity expires at 605 seconds locally, returns to desk under reduced motion',()=>{const r=record(),m=createMotion('capacity');m.update(v(r,now+605000));assert.equal(m.step(0,{snap:true}).phase,'resting');const stale=v(r,now+605001);assert.equal(stale.status,'HISTORICAL');m.update(stale);const pose=m.step(0,{snap:true});assert.equal(pose.phase,'waiting');assert.deepEqual(pose.position,robotRoster.find(r=>r.id==='capacity').desk);});
test('blocked, partial, disconnected, future and duplicate evidence never permit leisure',()=>{for(const status of ['BLOCKED','PARTIAL','UNKNOWN','HISTORICAL','DEGRADED','INCIDENT']){const r={...record('accounts',status),recordedStatus:'ACTIVE'};assert.equal(v(r).canRest,false);}assert.equal(v(record(),now,false).canRest,false);assert.equal(v({...record(),lastAt:now+1}).canRest,false);const r=record();assert.equal(roleRobotViews({schemaVersion:1,generatedAt:now,roles:[r,r]},now).find(x=>x.id==='capacity').canRest,false);});

test('generic rest positions keep clear of Play Club furniture and route along an offset aisle',()=>{for(const robot of roleRobots){const r=agentRoute(robot.id),end=r.points.at(-1);assert.equal(end[2],0);assert.ok(end[0]>=-11.7&&end[0]<=11.7);assert.deepEqual(r.points.at(-2),[end[0],9.2,.6]);}});

test('dedicated statistics robot returns to its own desk with unknown evidence and does not affect growth pilot',()=>{
 const growth=record('growth','ACTIVE'),stats=record('growth-stats','UNKNOWN'),views=roleRobotViews({schemaVersion:1,generatedAt:now,roles:[growth,stats]},now);
 assert.equal(views.find(r=>r.id==='growth').canRest,true);
 const unknown=views.find(r=>r.id==='growth-stats');assert.equal(unknown.canRest,false);
 const robot=robotRoster.find(r=>r.id==='growth-stats');assert.equal(robot.name,'Statistik Game');assert.equal(robot.short,'SG');
 const motion=createMotion(robot.id);motion.update(unknown);assert.deepEqual(motion.step(0,{snap:true}).position,robot.desk);
 assert.deepEqual(agentRoute(robot.id).points.slice(1,3),[[6.2,0,8.8],[4.8,0,8.8]]);
});
