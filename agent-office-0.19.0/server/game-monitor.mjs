import {readFileSync} from 'node:fs';
import {randomUUID} from 'node:crypto';
export const GAME_TARGETS=JSON.parse(readFileSync(new URL('./game-targets.json',import.meta.url),'utf8'));
export function makeGameMonitor({tasks,fetcher=fetch,clock=Date.now,targets=GAME_TARGETS,intervalMs=15000}){
 const samples=new Map(),failures=new Map(),reported=new Set();let cursor=0,timer,stopped=false,busy=false;
 async function runOnce(){if(stopped||busy)return;busy=true;try{
  const batch=Array.from({length:Math.min(4,targets.length)},()=>targets[cursor++%targets.length]);
  await Promise.allSettled(batch.map(async target=>{
   let status=0;try{const r=await fetcher('https://games.kampunginggrispontianak.com'+target.path,{method:'HEAD',redirect:'manual',signal:AbortSignal.timeout(8000)});status=r.status;}catch{}
   const failed=status===0||status===404||status>=500;
   samples.set(target.game,{game:target.game,status,at:clock(),state:failed?'error':[401,403].includes(status)?'auth-required':'reachable'});
   failures.set(target.game,failed?(failures.get(target.game)||0)+1:0);
   if(!failed)reported.delete(target.game);
   if(failures.get(target.game)>=2&&!reported.has(target.game)){
    tasks.incident({eventId:randomUUID(),game:target.game,mode:'screen',release:'021-availability-1',kind:'resource',errorClass:'ResourceError',asset:'index.html',line:0,column:0});reported.add(target.game);
   }
  }));
 }finally{busy=false;}}
 return {runOnce,start(){if(!timer){stopped=false;runOnce();timer=setInterval(runOnce,intervalMs);timer.unref();}},stop(){stopped=true;clearInterval(timer);timer=null;},snapshot(){return {scope:'HTTP availability; gameplay not inferred',total:targets.length,checked:samples.size,intervalMs,batchSize:4,samples:[...samples.values()]};}};
}
