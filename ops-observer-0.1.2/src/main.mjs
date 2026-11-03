import {Store} from './store.mjs';
import {loadConfig} from './config.mjs';
import {loadBaseline} from './baseline.mjs';
import {dirname,join} from 'node:path';
import {cycle,summary} from './runner.mjs';
import {markdown} from './report.mjs';
import {setTimeout as delay} from 'node:timers/promises';
const output=x=>process.stdout.write(JSON.stringify(x)+'\n');
function argumentsFor(args){
 const command=args.shift();if(!['run','check','report','healthcheck'].includes(command))throw Error('Invalid command');
 let state='/state/ops.sqlite',json=false,seen=new Set();
 while(args.length){const key=args.shift();if(seen.has(key))throw Error('Duplicate option');seen.add(key);
  if(key==='--state'&&args[0]&&!args[0].startsWith('--'))state=args.shift();
  else if(key==='--json'&&command==='report')json=true;
  else throw Error('Invalid argument');
 }
 return {command,state,json};
}
let store,abort;
try{
 const {command,state,json}=argumentsFor(process.argv.slice(2)),base=loadConfig(),baselineFile=join(dirname(state),'approved-baseline.json');
 let config=loadBaseline(base,baselineFile);
 store=new Store(state,{readOnly:['report','healthcheck'].includes(command)});
 if(command==='report'){
  const report={...store.report(),expected:config.expected};
  if(json)output(report);else process.stdout.write(markdown(report));
 }else if(command==='healthcheck'){
  process.exitCode=store.report().observer.status==='HEALTHY'?0:1;
 }else{
  abort=new AbortController();const stop=()=>abort.abort();
  process.once('SIGTERM',stop);process.once('SIGINT',stop);
  output({type:'STARTED',...summary(store.report(),config)});
  if(command==='check')await cycle(store,config,{force:true,signal:abort.signal,log:output});
  else while(!abort.signal.aborted){
   config=loadBaseline(base,baselineFile);
   await cycle(store,config,{signal:abort.signal,log:output});
   if(abort.signal.aborted)break;
   const next=store.report().observer.nextDueAt;
   try{await delay(Math.max(1000,Math.min(config.intervalMs,next-Date.now())),undefined,{signal:abort.signal});}
   catch(e){if(e.name!=='AbortError')throw e;}
  }
  process.removeListener('SIGTERM',stop);process.removeListener('SIGINT',stop);
  output({type:'STOPPED',at:Date.now()});
 }
}catch{
 process.stderr.write(JSON.stringify({type:'OBSERVER_ERROR',code:'CONFIG_STORAGE_OR_RUNNER',at:Date.now()})+'\n');process.exitCode=2;
}finally{try{store?.close();}catch{process.exitCode=2;}}
