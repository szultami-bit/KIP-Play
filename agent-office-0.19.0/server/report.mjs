import {readFileSync} from 'node:fs';
import {pathToFileURL} from 'node:url';
export const STALE=605000;
const STATES=new Set(['HEALTHY','DEGRADED','INCIDENT','RECOVERING','UNKNOWN']);
const CODES=new Set(['OK','INVALID_PAYLOAD','IDENTITY_MISMATCH','UNEXPECTED_PROFILE','UNEXPECTED_RELEASE','ADMISSION_DRAINING','HTTP_STATUS','INVALID_JSON','BODY_TOO_LARGE','NETWORK','TIMEOUT']);
const timestamp=value=>Number.isSafeInteger(value)&&value>=0?value:null;
const fresh=(value,now)=>timestamp(value)!==null&&value<=now&&now-value<=STALE;
export function sanitize(raw,source='observer',now=Date.now()){
 if(!raw||!Array.isArray(raw.checks)||!raw.observer||!['observer','snapshot'].includes(source))throw Error('Invalid report');
 const checks=['health','release'].map(id=>{
  const matches=raw.checks.filter(c=>c?.id===id);if(matches.length!==1)throw Error('Missing or duplicate check');const check=matches[0];
  const known=STATES.has(check.status)&&CODES.has(check.lastCode);
  return {id,status:known&&fresh(check.lastAt,now)?check.status:'UNKNOWN',lastAt:timestamp(check.lastAt),latencyMs:Number.isFinite(check.latencyMs)&&check.latencyMs>=0&&check.latencyMs<=60000?check.latencyMs:null,lastCode:CODES.has(check.lastCode)?check.lastCode:null,observed:{...(/^[0-9a-f]{40}$/.test(check.observed?.release)?{release:check.observed.release}:{}),...(/^[0-9a-f]{64}$/.test(check.observed?.fingerprint)?{fingerprint:check.observed.fingerprint}:{})}};
 });
 const incidents=Array.isArray(raw.incidents)?raw.incidents:[];
 const count=Number.isSafeInteger(raw.openIncidents)&&raw.openIncidents>=0?raw.openIncidents:incidents.filter(i=>i.resolvedAt===null).length;
 return {source,generatedAt:now,observer:{status:fresh(raw.observer.lastCycleAt,now)?'HEALTHY':'UNKNOWN',lastCycleAt:timestamp(raw.observer.lastCycleAt),nextDueAt:timestamp(raw.observer.nextDueAt)},checks,sampleCount:Number.isSafeInteger(raw.sampleCount)&&raw.sampleCount>=0?raw.sampleCount:0,openIncidents:count,
 events:(Array.isArray(raw.events)?raw.events:[]).filter(e=>['OPEN','RECOVERED'].includes(e?.type)&&['health','release'].includes(e.checkId)&&timestamp(e.at)!==null).slice(0,20).map(e=>({at:e.at,type:e.type,checkId:e.checkId})),
 limits:{modelApi:'NOT_USED',notifications:'NOT_CONFIGURED',externalContinuousMonitoring:'NOT_CONFIGURED'}};
}
export function unavailable(now=Date.now()){
 return {source:'unavailable',generatedAt:now,observer:{status:'UNKNOWN',lastCycleAt:null,nextDueAt:null},checks:['health','release'].map(id=>({id,status:'UNKNOWN',lastAt:null,latencyMs:null,lastCode:null,observed:{}})),sampleCount:0,openIncidents:0,events:[],limits:{modelApi:'NOT_USED',notifications:'NOT_CONFIGURED',externalContinuousMonitoring:'NOT_CONFIGURED'}};
}
export async function makeReader({modulePath,statePath,snapshotPath}={}){
 if(snapshotPath)return ()=>sanitize(JSON.parse(readFileSync(snapshotPath,'utf8')),'snapshot');
 if(!modulePath||!statePath)return ()=>unavailable();
 const {Store}=await import(pathToFileURL(modulePath).href);
 return ()=>{let store;try{store=new Store(statePath,{readOnly:true});return sanitize(store.report(),'observer');}finally{store?.close();}};
}
