import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync,writeFileSync,rmSync,readFileSync} from 'node:fs';
import {join} from 'node:path';
import {tmpdir} from 'node:os';
import {makeServer} from '../server/http.mjs';
import {makeRolesReader,ROLE_IDS} from '../server/roles.mjs';

const NOW=1793475600000;
const registry=()=>({schemaVersion:1,roles:[{id:'coordinator',status:'ACTIVE',source:'Coordinator evidence',lastAt:new Date(NOW).toISOString(),maxAgeMs:86400000,scope:'Read-only prioritization from verified reports.',blocker:'No deployment permission.',evidence:['Scoped coordination reviewed.'],capabilities:['Summarize priorities.']},{id:'qa',status:'PARTIAL',source:'Staging audit',lastAt:new Date(NOW).toISOString(),maxAgeMs:3600000,scope:'Documented staging checks.',blocker:'Reconnect not tested.',evidence:['Initial scenario passed.'],capabilities:['Read completed checks.']}]});
const capacity=()=>({schemaVersion:1,id:'capacity',source:'VPS_PROCFS',status:'OK',lastAt:new Date(NOW).toISOString(),intervalSeconds:300,uptimeSeconds:1000,expectedCapacity:{cpuCount:4,minimumMemoryBytes:15*2**30,maximumMemoryBytes:16*2**30},cpu:{usagePct:20,count:4,warningAtPct:80,criticalAtPct:95,status:'OK'},ram:{totalBytes:16*2**30,availableBytes:12*2**30,usedBytes:4*2**30,usedPct:25,warningAtPct:85,criticalAtPct:95,status:'OK'},disk:{totalBytes:1000,freeBytes:500,availableBytes:400,reservedBytes:100,usedBytes:500,usedPct:50,availablePct:40,mount:'/',filesystemLabel:'container root overlay backing filesystem; not provider quota',warningAtPct:80,criticalAtPct:90,status:'OK'},errors:[]});
function fixture(t){const dir=mkdtempSync(join(tmpdir(),'kip-role-files-'));t.after(()=>rmSync(dir,{recursive:true,force:true}));const registryPath=join(dir,'roles.json'),capacityPath=join(dir,'latest.json');let now=NOW;const read=makeRolesReader({registryPath,capacityPath,clock:()=>now});return {read,setNow:v=>now=v,registry:v=>writeFileSync(registryPath,typeof v==='string'?v:JSON.stringify(v)),capacity:v=>writeFileSync(capacityPath,JSON.stringify(v))};}
const role=(read,id)=>read().roles.find(r=>r.id===id);
test('missing files never activate roles and return all twelve honest unknown states',t=>{const f=fixture(t),r=f.read();assert.deepEqual(r.roles.map(r=>r.id),ROLE_IDS);assert.ok(r.roles.filter(r=>r.id!=='instagram-admin').every(r=>r.status==='UNKNOWN'&&r.freshness==='unknown'));assert.ok(r.roles.every(r=>r.metrics===null));});
test('capacity exposes only validated live metrics and expires after 605000 ms',t=>{const f=fixture(t);f.capacity(capacity());const r=role(f.read,'capacity');assert.equal(r.status,'HEALTHY');assert.equal(r.freshness,'current');assert.equal(r.metrics.cpu.usagePct,20);assert.equal(r.metrics.ram.usedPct,25);assert.equal(r.metrics.disk.usedPct,50);f.setNow(NOW+605000);assert.equal(role(f.read,'capacity').status,'HEALTHY');f.setNow(NOW+605001);const stale=role(f.read,'capacity');assert.equal(stale.status,'HISTORICAL');assert.equal(stale.freshness,'historical');assert.equal(stale.recordedStatus,'HEALTHY');});
test('capacity rejects future timestamps, invalid metrics, lying status and unexpected fields',t=>{const f=fixture(t);for(const edit of [r=>r.lastAt=new Date(NOW+1).toISOString(),r=>r.cpu.usagePct=-1,r=>r.cpu.usagePct=96,r=>r.ram.usedBytes=1,r=>r.source='fixture',r=>r.secret='do not expose',r=>r.cpu.token='do not expose',r=>r.disk.availablePct=90]){const r=capacity();edit(r);f.capacity(r);const result=role(f.read,'capacity');assert.equal(result.status,'UNKNOWN');assert.equal(result.freshness,'unknown');assert.equal(result.metrics,null);assert.ok(!JSON.stringify(result).includes('do not expose'));}});
test('capacity warning is derived from actual usage and collector errors are never healthy',t=>{const f=fixture(t),r=capacity();r.cpu.usagePct=85;r.cpu.status='WARN';r.status='WARN';f.capacity(r);assert.equal(role(f.read,'capacity').status,'DEGRADED');r.status='UNKNOWN';r.cpu=r.ram=r.disk=null;r.intervalSeconds=r.uptimeSeconds=null;r.errors=['collection_failed'];f.capacity(r);assert.equal(role(f.read,'capacity').status,'UNKNOWN');});
test('registry keeps partial capability and blocker, with distinct expiry per record',t=>{const f=fixture(t);f.registry(registry());assert.equal(role(f.read,'coordinator').status,'ACTIVE');assert.equal(role(f.read,'qa').status,'PARTIAL');assert.equal(role(f.read,'qa').blocker,'Reconnect not tested.');f.setNow(NOW+3600001);assert.equal(role(f.read,'qa').status,'HISTORICAL');assert.equal(role(f.read,'coordinator').status,'ACTIVE');assert.equal(role(f.read,'payments').status,'UNKNOWN');});
test('registry accepts valid Python microsecond UTC timestamps without accepting invalid dates',t=>{const f=fixture(t);for(const timestamp of ['2026-10-31T17:00:00.000000Z','2026-10-31T17:00:00.000000+00:00','2026-10-31T17:00:00Z']){const r=registry();r.roles[0].lastAt=timestamp;f.registry(r);assert.equal(role(f.read,'coordinator').status,'ACTIVE');}for(const timestamp of ['2026-02-31T17:00:00.000Z','2026-10-31T17:00:00-07:00','not a date']){const r=registry();r.roles[0].lastAt=timestamp;f.registry(r);assert.equal(role(f.read,'coordinator').status,'UNKNOWN');}});
test('registry future time, unknown field, duplicate, invalid expiry and oversized file fail closed',t=>{const f=fixture(t);for(const edit of [r=>r.roles[0].lastAt=new Date(NOW+1).toISOString(),r=>r.roles[0].rawSecret='secret',r=>r.roles.push(r.roles[0]),r=>r.roles[0].maxAgeMs=0,r=>r.roles[0].maxAgeMs=2592000001,r=>r.roles[0].status='ALL_ACTIVE']){const r=registry();edit(r);f.registry(r);assert.equal(role(f.read,'coordinator').status,'UNKNOWN');}f.registry(' '.repeat(65537));assert.equal(role(f.read,'coordinator').status,'UNKNOWN');});
test('registry cannot override capacity and file updates are read without a restart',t=>{const f=fixture(t),r=registry();r.roles[0].id='capacity';f.registry(r);assert.equal(role(f.read,'capacity').status,'UNKNOWN');f.registry(registry());assert.equal(role(f.read,'coordinator').status,'ACTIVE');const changed=registry();changed.roles[0].status='BLOCKED';f.registry(changed);assert.equal(role(f.read,'coordinator').status,'BLOCKED');});
test('real VPS collector reports validate at observation time and remain historical afterward',t=>{
 const actual=JSON.parse(readFileSync(new URL('./fixtures/capacity-vps-20261031.json',import.meta.url),'utf8')),f=fixture(t);
 assert.equal(actual.samples.length,2);
 for(const sample of actual.samples){f.capacity(sample);f.setNow(Date.parse(sample.lastAt)+1000);const current=role(f.read,'capacity');assert.equal(current.status,'HEALTHY');assert.equal(current.metrics.cpu.usagePct,sample.cpu.usagePct);assert.equal(current.metrics.ram.totalBytes,16769032192);assert.equal(current.metrics.disk.totalBytes,206900281344);f.setNow(Date.parse(sample.lastAt)+605001);assert.equal(role(f.read,'capacity').status,'HISTORICAL');}
});

test('private roles endpoint reads current evidence and refuses anonymous requests and mutations',async t=>{
 const dir=mkdtempSync(join(tmpdir(),'kip-roles-http-'));writeFileSync(join(dir,'index.html'),'office');
 let owner=false,reads=0,now=1793475600000;
 const auth={host:'localhost',origin:'https://office.example',clearCookie:'',session:async()=>owner?{}:null};
 const server=makeServer({directory:dir,auth,clock:()=>now,readReport:()=>({}),readRoles:()=>{reads++;return {schemaVersion:1,generatedAt:now,roles:[]};}});
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));auth.host='127.0.0.1:'+server.address().port;
 t.after(async()=>{await new Promise(resolve=>server.close(resolve));rmSync(dir,{recursive:true,force:true});});
 const url='http://'+auth.host+'/api/roles';
 assert.equal((await fetch(url)).status,401);assert.equal(reads,0);
 assert.equal((await fetch(url,{method:'POST',body:'{}'})).status,405);assert.equal(reads,0);
 owner=true;const response=await fetch(url);assert.equal(response.status,200);assert.match(response.headers.get('cache-control'),/private, no-store/);
 assert.equal((await response.json()).schemaVersion,1);assert.equal(reads,1);
 now+=5001;await fetch(url);assert.equal(reads,2);
});
