import test from 'node:test';import assert from 'node:assert/strict';import {mkdtempSync,rmSync} from 'node:fs';import {tmpdir} from 'node:os';import {join} from 'node:path';import {makeSkills} from '../server/skills.mjs';import {bindAgentSkills} from '../campus/src/agent-skills.js';
// Bounded DOM adapter and real persistent store; this does not replace browser acceptance.
test('four controls persist new skill, Test, activation and rollback; dirty editor blocks activation',async t=>{
 const dir=mkdtempSync(join(tmpdir(),'skills-ui-')),store=makeSkills({path:join(dir,'skills.json')}),all=[],elements=new Map(),listeners={};let loseResponse=false;
 class Element {constructor(tag='div'){this.tag=tag;this.children=[];this.dataset={};this.value='';this.textContent='';this.open=false;this.events={};all.push(this);}append(...v){this.children.push(...v);}replaceChildren(...v){this.children=[...v];}get options(){return this.children;}setAttribute(k,v){this[k]=v;}addEventListener(k,v){this.events[k]=v;}showModal(){this.open=true;}close(){this.open=false;this.events.close?.();}querySelectorAll(selector){return all.filter(e=>selector==='[data-editor-field]'?e.dataset.editorField: ['button','input','select','textarea'].includes(e.tag));}}
 const get=id=>{if(!elements.has(id)){const e=new Element(/skill-(title|id|description|tools|instructions|changelog)/.test(id)?'input':'button');e.id=id.slice(1);elements.set(id,e);}return elements.get(id);};
 for(const id of ['id','title','category','description','risk','tools','instructions','changelog'])get('#skill-'+id).dataset.editorField='true';
 get('#skill-filter-category').value='all';get('#skill-filter-state').value='all';
 const old={document:globalThis.document,addEventListener:globalThis.addEventListener};globalThis.document={querySelector:get,createElement:tag=>new Element(tag),createTextNode:s=>({textContent:s}),hidden:false,addEventListener:(k,v)=>listeners[k]=v,removeEventListener:()=>{}};globalThis.addEventListener=(k,v)=>listeners[k]=v;
 t.after(()=>{listeners.pagehide?.();Object.assign(globalThis,old);rmSync(dir,{recursive:true,force:true});});
 t.mock.method(globalThis,'fetch',async(url,opts)=>{try{const result=opts.body?store.update(JSON.parse(opts.body)):store.read();if(loseResponse&&opts.body){loseResponse=false;throw new TypeError('Failed to fetch');}return {ok:true,status:200,json:async()=>result};}catch(e){if(e instanceof TypeError)throw e;return {ok:false,status:e.status,json:async()=>({error:e.code})};}});
 bindAgentSkills({announce:()=>{}});await new Promise(r=>setImmediate(r));
 get('#skill-create').onclick();get('#skill-id').value='ui-test-skill';get('#skill-title').value='Riset pengguna';get('#skill-description').value='Merangkum laporan kebutuhan pengguna.';get('#skill-tools').value='read_reports';
 await get('#skill-form').onsubmit({preventDefault(){}});assert.equal(store.read().skills.at(-1).id,'ui-test-skill');assert.equal(get('#skill-activate').disabled,true);
 assert.equal(typeof get('#skill-test').onclick,'function');await get('#skill-test').onclick();assert.equal(store.read().testRuns.at(-1).passed,true);assert.equal(get('#skill-activate').disabled,false);
 await get('#skill-activate').onclick();assert.equal(store.read().skills.at(-1).activeVersion,1);
 await get('#skill-candidate-create').onclick();get('#skill-changelog').value='Perbaikan ringkasan.';await get('#skill-form').onsubmit({preventDefault(){}});await get('#skill-test').onclick();
 get('#skill-title').value='Judul belum disimpan';get('#skill-form').events.input({target:get('#skill-title')});assert.equal(get('#skill-activate').disabled,true);
 await get('#skill-test').onclick();assert.equal(get('#skill-activate').disabled,false);await get('#skill-activate').onclick();assert.equal(store.read().skills.at(-1).activeVersion,2);
 get('#skill-rollback-version').value='1';await get('#skill-rollback').onclick();assert.equal(makeSkills({path:join(dir,'skills.json')}).read().skills.at(-1).activeVersion,1);
 assert.equal(store.read().audit.at(-1).action,'skill.rollback');
 await get('#skill-candidate-create').onclick();get('#skill-title').value='Unsaved important title';get('#skill-form').events.input({target:get('#skill-title')});
 assert.equal(get('#skill-install-toggle').disabled,true);await get('#skill-install-toggle').onclick();assert.equal(get('#skill-title').value,'Unsaved important title');
 get('#skill-changelog').value='Ubah judul penelitian.';loseResponse=true;await get('#skill-form').onsubmit({preventDefault(){}});
 assert.equal(store.read().skills.at(-1).versions.at(-1).title,'Unsaved important title');assert.equal(get('#skill-save').disabled,true);assert.equal(get('#skill-test').disabled,true);assert.match(get('#skills-notice').textContent,/belum dapat dipastikan/);
});
