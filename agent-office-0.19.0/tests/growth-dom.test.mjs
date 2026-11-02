import test from 'node:test';
import assert from 'node:assert/strict';
import {GROWTH_DASHBOARD_URL} from '../src/role-evidence.js';
import {bindRoleEvidence} from '../campus/src/role-evidence.js';

// A bounded DOM harness exercises rendering paths; it is not a browser acceptance test.
class Element {
 constructor(tag='div'){this.tag=tag;this.children=[];this.dataset={};this.attributes={};this.named=new Map();this.textContent='';this.open=false;}
 append(...nodes){this.children.push(...nodes);}
 replaceChildren(...nodes){this.children=[...nodes];}
 setAttribute(name,value){this.attributes[name]=value;}
 set innerHTML(value){
  assert.equal(this.tag,'button');assert.match(value,/class="agent-monogram"/);
  for(const name of ['.agent-monogram','b','.agent-result','.agent-checked','.agent-activity'])this.named.set(name,new Element('span'));
 }
 querySelector(name){const element=this.named.get(name);assert.ok(element,`Unknown fixture selector ${name}`);return element;}
 showModal(){this.open=true;}
 close(){this.open=false;}
}
test('growth dialog renders four distinct account counters safely, and connection loss prevents a resting robot',async t=>{
 const originalDocument=globalThis.document,originalListener=globalThis.addEventListener;
 const elements=new Map(),listeners=new Map(),intervals=new Map();let intervalId=0,fail=false,robotViews=[],focus=null;
 const get=selector=>{if(!elements.has(selector))elements.set(selector,new Element());return elements.get(selector);};
 globalThis.document={hidden:false,querySelector:get,createElement:tag=>new Element(tag),addEventListener:()=>{},removeEventListener:()=>{}};
 globalThis.addEventListener=(name,callback)=>listeners.set(name,callback);
 t.after(()=>{listeners.get('pagehide')?.();if(originalDocument===undefined)delete globalThis.document;else globalThis.document=originalDocument;if(originalListener===undefined)delete globalThis.addEventListener;else globalThis.addEventListener=originalListener;});
 t.mock.method(globalThis,'setInterval',callback=>{const id=++intervalId;intervals.set(id,callback);return id;});
 t.mock.method(globalThis,'clearInterval',id=>intervals.delete(id));
 const dayStart=Date.parse('2026-10-31T17:00:00.000Z'),at=dayStart+600000;
 t.mock.method(Date,'now',()=>at);
 const metrics={kind:'growth',registeredToday:0,totalRegistered:107,activeToday:1,recent5m:0,timezone:'Asia/Pontianak',localDate:'2026-11-01',dayStart,dayEnd:dayStart+86400000,activityWindowMinutes:5,testExclusion:'MARKED_ONLY',scope:'PUBLIC_ACCOUNTS',activityCoverage:'OBSERVED_DEVICE_ACTIVITY',excludedTestAccounts:0};
 const report={schemaVersion:1,generatedAt:at,roles:[{id:'growth-stats',status:'ACTIVE',recordedStatus:'ACTIVE',freshness:'current',lastAt:at,maxAgeMs:120000,source:'aggregate',scope:'<img src=x onerror=alert(1)>',blocker:'Observed account activity only.',evidence:['Validated summary'],capabilities:['Read counts'],metrics}]};
 t.mock.method(globalThis,'fetch',async path=>{assert.equal(path,'/agent-office/api/roles');if(fail)throw Error('offline');return {ok:true,status:200,json:async()=>report};});
 report.roles.push({...report.roles[0],id:'growth',metrics:null,maxAgeMs:86400000,scope:'Pilot guru dan draf retensi',capabilities:['Menyusun draf pilot']});
 const binding=bindRoleEvidence({getOffice:()=>({updateAgents:views=>{robotViews=views;}}),focusAgent:id=>{focus=id;}});
 await new Promise(resolve=>setImmediate(resolve));
 binding.open('growth-stats');
 assert.equal(get('#role-primary-cards').children.length,3);assert.equal(get('#role-audit-cards').children.length,9);assert.ok(get('#role-primary-cards').children.some(card=>card.dataset.role==='growth-stats'));
 assert.equal(get('#role-evidence-dialog').open,true);
 assert.equal(get('#role-evidence-name').textContent,'Statistik Game');
 assert.equal(get('#role-evidence-scope').textContent,report.roles[0].scope);
 const box=get('#role-evidence-metrics'),list=box.children.find(child=>child.tag==='dl');
 const link=box.children.find(child=>child.tag==='a');assert.equal(link.attributes.href,GROWTH_DASHBOARD_URL);assert.equal(link.attributes.rel,'noopener noreferrer');assert.equal(link.attributes.target,'_blank');
 assert.ok(list);assert.equal(list.children.length,4);assert.deepEqual(list.children.map(row=>row.children[1].textContent),['0','107','1','0']);
 assert.match(box.children.map(node=>node.textContent).join(' '),/bukan kepastian sedang online/);
 assert.equal(robotViews.find(role=>role.id==='growth-stats').canRest,true);
 assert.equal(robotViews.find(role=>role.id==='growth').scope,'Pilot guru dan draf retensi');
 binding.open('growth');assert.equal(box.children.length,0);assert.equal(get('#role-evidence-name').textContent,'Pengembang pertumbuhan');
 binding.open('growth-stats');
 fail=true;await binding.refresh();
 assert.match(get('#role-evidence-status').textContent,/Belum terverifikasi/);
 assert.match(get('#role-evidence-blocker').textContent,/Koneksi laporan terputus/);
 assert.equal(robotViews.find(role=>role.id==='growth-stats').canRest,false);
 assert.equal(box.children.find(child=>child.tag==='a').attributes.href,GROWTH_DASHBOARD_URL);
 fail=false;report.roles=report.roles.filter(role=>role.id!=='growth-stats');await binding.refresh();assert.equal(robotViews.find(role=>role.id==='growth-stats').status,'UNKNOWN');assert.equal(robotViews.find(role=>role.id==='growth').status,'ACTIVE');assert.equal(box.children.some(child=>child.tag==='dl'),false);assert.equal(box.children.find(child=>child.tag==='a').attributes.href,GROWTH_DASHBOARD_URL);
 get('#role-evidence-focus').onclick();assert.equal(focus,'growth-stats');assert.equal(get('#role-evidence-dialog').open,false);
 listeners.get('pagehide')();assert.equal(intervals.size,0);
});
