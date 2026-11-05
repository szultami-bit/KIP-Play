import test from 'node:test';
import assert from 'node:assert/strict';
import {DatabaseSync} from 'node:sqlite';
import {makeCaseStore} from '../server/repair-cases.mjs';
test('classifying a recurring legacy episode preserves prior cases and supports reopening',()=>{
 const db=new DatabaseSync(':memory:'),store=makeCaseStore(db);
 const base={kind:'game',game:'speaking-studio',mode:'screen',errorClass:'ResourceError',asset:'index.html',line:0,column:0,incidentId:'same',history:[],observedAt:1};
 const first={...base,id:'first',createdAt:1,status:'completed'},next={...base,id:'next',createdAt:2,status:'blocked'};
 assert.equal(store.list([first,next]).length,1);
 const classified={...next,kind:'availability',path:'/speaking-studio'};store.reclassify(classified);
 assert.equal(store.list([first,classified]).length,2);
 const reopened=makeCaseStore(db);assert.equal(reopened.list([first,classified]).length,2);
 store.reclassify({...first,kind:'availability',path:'/speaking-studio'});
 assert.equal(store.list([{...first,kind:'availability',path:'/speaking-studio'},classified]).length,1);db.close();
});
