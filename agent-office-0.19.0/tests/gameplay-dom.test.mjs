import test from 'node:test';
import assert from 'node:assert/strict';
import {bindGameplayPanel} from '../campus/src/gameplay-panel.js';
class Element{
 constructor(tag='div'){this.tag=tag;this.children=[];this.dataset={};this.hidden=false;this.textContent='';this.listeners=new Map();}
 append(...items){this.children.push(...items);}
 replaceChildren(...items){this.children=items;}
 addEventListener(name,fn){this.listeners.set(name,fn);}
 removeEventListener(name){this.listeners.delete(name);}
 set innerHTML(_value){throw Error('Evidence must render as text');}
}
test('gameplay panel does not request hidden evidence, renders only text, and invalidates a pass after connection loss',async t=>{
 const oldDocument=globalThis.document,oldAdd=globalThis.addEventListener,oldRemove=globalThis.removeEventListener;
 const elements=new Map(),listeners=new Map(),get=selector=>{if(!elements.has(selector))elements.set(selector,new Element());return elements.get(selector);};
 const at=Date.now();let fail=false,calls=0;
 globalThis.document={hidden:false,querySelector:get,createElement:tag=>new Element(tag),addEventListener:()=>{},removeEventListener:()=>{}};
 globalThis.addEventListener=(name,fn)=>listeners.set(name,fn);globalThis.removeEventListener=name=>listeners.delete(name);
 t.after(()=>{listeners.get('pagehide')?.();if(oldDocument===undefined)delete globalThis.document;else globalThis.document=oldDocument;if(oldAdd===undefined)delete globalThis.addEventListener;else globalThis.addEventListener=oldAdd;if(oldRemove===undefined)delete globalThis.removeEventListener;else globalThis.removeEventListener=oldRemove;});
 t.mock.method(globalThis,'setTimeout',()=>1);t.mock.method(globalThis,'clearTimeout',()=>{});t.mock.method(Date,'now',()=>at);
 t.mock.method(globalThis,'fetch',async path=>{calls++;assert.equal(path,'/agent-office/api/gameplay');if(fail)throw Error('offline');return {status:200,ok:true,json:async()=>({schemaVersion:1,generatedAt:at,sessions:{status:'CURRENT',observedAt:at,started:1,completed:0,games:[{game:'<img src=x onerror=alert(1)>',started:1,completed:0}]},synthetic:{status:'PASS',observedAt:at,completedSessions:1,scenarios:[{game:'eduracing',mode:'screen',status:'PASS',completedSessions:1}]},operations:{repeatedErrors:0,openJobs:0,verifiedRepairs:0,meanResolutionMs:null,medianResolutionMs:null},coverage:[]})};});
 get('#view-board').hidden=true;const panel=bindGameplayPanel();assert.equal(calls,0);assert.equal(get('#gameplay-sessions').textContent,'—');
 get('#view-board').hidden=false;await panel.refresh();assert.equal(calls,1);assert.equal(get('#gameplay-sessions').textContent,0);assert.equal(get('#gameplay-synthetic').textContent,1);
 assert.equal(get('#gameplay-game-rows').children[0].children[0].textContent,'<img src=x onerror=alert(1)>');
 assert.equal(get('#gameplay-synthetic-status').dataset.status,'PASS');
 fail=true;await panel.refresh();assert.equal(get('#gameplay-synthetic-status').dataset.status,'UNAVAILABLE');assert.match(get('#gameplay-notice').textContent,/salinan terakhir/);
 get('#view-board').hidden=true;await panel.refresh();assert.equal(calls,2);
});
