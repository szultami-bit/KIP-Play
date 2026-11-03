import {readFileSync,rmSync,mkdirSync,existsSync} from 'node:fs';
import {spawn} from 'node:child_process';
import {once} from 'node:events';
const identity=JSON.parse(readFileSync('/qa/identity.json','utf8'));
if(identity.origin!=='http://localhost:18798'||identity.backend!=='isolated-synthetic'||!existsSync('/qa/build/config.capnp'))throw Error('QA_IDENTITY_REQUIRED');
let stopping=false,server,runner,timer;
const stop=()=>{stopping=true;clearTimeout(timer);runner?.kill('SIGTERM');server?.kill('SIGTERM')};process.on('SIGTERM',stop);process.on('SIGINT',stop);
async function cycle(){
 // This volume belongs exclusively to synthetic QA. No production data mount exists.
 rmSync('/qa/rooms',{recursive:true,force:true});mkdirSync('/qa/rooms');
 server=spawn('/source/deploy/vps-runtime/node_modules/.bin/workerd',['serve','--experimental','/qa/build/config.capnp'],{stdio:'inherit',env:{...process.env,PUBLIC_ORIGIN:identity.origin,RELEASE_SHA:identity.sourceRelease,KIP_QA_PASSWORD:readFileSync('/qa/auth-secret','utf8'),AI_ORIGIN:'',VPS_AI_GATEWAY_KEY:'',ACCOUNT_LOGIN_RUNTIME:''}});
 const serverExit=once(server,'exit');
 try{
  let ready=false;for(let i=0;i<30&&!stopping;i++){try{const r=await fetch('http://127.0.0.1:18798/healthz',{signal:AbortSignal.timeout(1000)});if(r.ok&&r.headers.get('x-kip-qa-backend')==='synthetic'){ready=true;break}}catch{}await new Promise(resolve=>setTimeout(resolve,500));}
  if(!ready||stopping)throw Error('SYNTHETIC_RUNTIME_NOT_READY');
  runner=spawn(process.execPath,['/qa/monitor/run.mjs'],{stdio:'inherit',env:process.env});
  const deadline=setTimeout(()=>runner.kill('SIGKILL'),240000);const [code]=await once(runner,'exit');clearTimeout(deadline);if(code!==0)throw Error('SYNTHETIC_RUNNER_FAILED');
 }catch(e){console.log(JSON.stringify({type:'GAMEPLAY_RUN_BLOCKED',error:e.message}));}
 finally{runner=null;server.kill('SIGTERM');await serverExit;server=null;}
}
while(!stopping){await cycle();if(process.env.GAMEPLAY_ONCE==='1'||stopping)break;await new Promise(resolve=>{timer=setTimeout(resolve,3600000);process.once('SIGTERM',resolve)});}
