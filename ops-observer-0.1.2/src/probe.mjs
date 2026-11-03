import {performance} from 'node:perf_hooks';
import {validateConfig,CHECKS} from './config.mjs';

function safeObservation(p){
 const observed={};
 for(const key of ['release','commit'])if(/^[a-f0-9]{40}$/.test(p[key]))observed.release=p[key];
 if(/^[a-f0-9]{64}$/.test(p.fingerprint))observed.fingerprint=p.fingerprint;
 const d=p.deployment;
 if(d&&typeof d==='object'){
  if(/^[a-f0-9]{64}$/.test(d.configurationFingerprint))observed.configurationFingerprint=d.configurationFingerprint;
  if(['production','staging'].includes(d.environment))observed.environment=d.environment;
 }
 if(['open','draining'].includes(p.roomAdmission))observed.roomAdmission=p.roomAdmission;
 return observed;
}
function evaluate(c,check,p,healthResult){
 if(!p||typeof p!=='object'||Array.isArray(p))return {ok:false,code:'INVALID_PAYLOAD',observed:{}};
 const observed=safeObservation(p),fail=code=>({ok:false,code,observed});
 if(check.id==='health'){
  if(p.ok!==true)return fail('INVALID_PAYLOAD');
  if(p.service!=='kip-vps-runtime'||p.storage!=='sqlite-local')return fail('IDENTITY_MISMATCH');
 }
 const d=p.deployment;
 if(d?.environment!=='production'||d.publicOrigin!==c.origin||d.projectRef!==c.expected.projectRef||d.configurationFingerprint!==c.expected.configurationFingerprint)return fail('UNEXPECTED_PROFILE');
 const correlated=check.id==='release'&&p.commit===null&&p.schema===1&&p.gate==='kip-release-safety-v1'&&Number.isSafeInteger(p.passedTests)&&p.passedTests>0&&healthResult?.ok===true&&healthResult.code==='OK'&&healthResult.observed?.release===c.expected.release&&healthResult.observed?.configurationFingerprint===c.expected.configurationFingerprint&&healthResult.observed?.environment==='production'&&healthResult.observed?.roomAdmission==='open';
 if((check.id==='health'?p.release:p.commit)!==c.expected.release&&!correlated)return fail('UNEXPECTED_RELEASE');
 if(check.id==='release'&&p.fingerprint!==c.expected.fingerprint)return fail('UNEXPECTED_RELEASE');
 if(p.roomAdmission!=='open')return fail('ADMISSION_DRAINING');
 return {ok:true,code:'OK',observed};
}
export async function probe(config,check,{fetcher=globalThis.fetch,timeoutMs=config.timeoutMs,signal,healthResult}={}){
 validateConfig(config);
 if(!Object.hasOwn(CHECKS,check?.id)||check.path!==CHECKS[check.id])throw Error('Forbidden check');
 if(!Number.isFinite(timeoutMs)||timeoutMs<=0||timeoutMs>config.timeoutMs)throw Error('Invalid deadline');
 const started=performance.now(),controller=new AbortController();let reader,timer,aborted=false,timedOut=false,stop;
 const cancel=()=>{controller.abort();try{reader?.cancel().catch(()=>{});}catch{}};
 const interrupted=new Promise(resolve=>{stop=resolve;});
 const onAbort=()=>{aborted=true;cancel();stop({ok:false,code:'ABORTED',observed:{}});};
 if(signal?.aborted)return {ok:false,code:'ABORTED',latencyMs:0,observed:{}};
 signal?.addEventListener('abort',onAbort,{once:true});
 timer=setTimeout(()=>{timedOut=true;cancel();stop({ok:false,code:'TIMEOUT',observed:{}});},timeoutMs);
 const work=(async()=>{
  const response=await fetcher(config.origin+check.path,{method:'GET',headers:{Accept:'application/json','User-Agent':'KIP-Ops-Hybrid/0.1'},credentials:'omit',redirect:'error',cache:'no-store',signal:controller.signal});
  if(timedOut||aborted){try{response.body?.cancel().catch(()=>{});}catch{}return {ok:false,code:aborted?'ABORTED':'TIMEOUT',observed:{}};}
  if(response.redirected)throw Error('Redirect refused');
  if(response.status!==200){try{response.body?.cancel().catch(()=>{});}catch{}return {ok:false,code:'HTTP_STATUS',httpStatus:response.status,observed:{}};}
  if(!response.body)return {ok:false,code:'INVALID_JSON',observed:{}};
  reader=response.body.getReader();let size=0;const chunks=[];
  while(true){
   const {done,value}=await reader.read();if(done)break;
   size+=value.byteLength;if(size>config.maxBytes){cancel();return {ok:false,code:'BODY_TOO_LARGE',observed:{}};}
   chunks.push(value);
  }
  let payload;try{payload=JSON.parse(Buffer.concat(chunks).toString('utf8'));}catch{return {ok:false,code:'INVALID_JSON',observed:{}};}
  return evaluate(config,check,payload,healthResult);
 })().catch(()=>({ok:false,code:aborted?'ABORTED':timedOut?'TIMEOUT':'NETWORK',observed:{}}));
 try{return {...await Promise.race([work,interrupted]),latencyMs:Math.round(performance.now()-started)};}
 finally{clearTimeout(timer);signal?.removeEventListener('abort',onAbort);}
}
