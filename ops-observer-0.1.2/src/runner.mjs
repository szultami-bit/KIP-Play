import {randomUUID} from 'node:crypto';
import {probe as productionProbe} from './probe.mjs';
import {validateConfig} from './config.mjs';
export const summary=(r,config)=>({version:'0.1.2',at:r.generatedAt,observer:r.observer,checks:r.checks,sampleCount:r.sampleCount,openIncidents:r.checks.filter(x=>x.incidentId).length,expected:config.expected,limits:r.limits});
export async function cycle(store,config,{owner=randomUUID(),now=Date.now,probe=productionProbe,signal,log=()=>{},force=false}={}){
 validateConfig(config);
 if(signal?.aborted)return {status:'aborted'};
 if(!store.acquireLease(owner,now(),60000,{force}))return {status:'skipped'};
 try{
  let healthResult;
  for(const id of ['health','release']){
   const check=config.checks.find(c=>c.id===id);
   if(signal?.aborted)return {status:'aborted'};
   if(!store.hasLease(owner,now()))throw Error('Lease lost');
   const result=await probe(config,check,{signal,healthResult});
   if(signal?.aborted||result.code==='ABORTED')return {status:'aborted'};
   if(!store.hasLease(owner,now()))throw Error('Lease lost');
   const event=store.record(check.id,result,now(),owner);
   if(check.id==='health')healthResult=result.ok&&result.code==='OK'?result:undefined;
   if(event)log(event);
  }
  store.completeCycle(owner,now());
  const report=store.report(now());log({type:'CYCLE',...summary(report,config)});
  return {status:'complete',report};
 }finally{store.releaseLease(owner);}
}
