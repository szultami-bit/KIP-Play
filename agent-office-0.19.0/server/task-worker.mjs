import {executeTask,createIncidentTask} from './task-runners.mjs';
export function makeTaskWorker({tasks,skills,readRoles,intervalMs=5000,clock=Date.now,onError=()=>{}}){
 let running=false,stopped=false,timer;
 async function runOnce(){if(running||stopped)return;running=true;try{tasks.heartbeat();const registry=skills.read();tasks.assignPending(i=>createIncidentTask(registry,i));const job=tasks.claim();if(!job)return;let result;try{result=await executeTask(job,{registry:skills.read(),readRoles,clock});}catch{result={status:'failed',summary:'Pemeriksaan gagal membaca sumber. Detail sensitif tidak dicatat.',evidence:[],nextSteps:[],externalActions:false};}tasks.finish(job.id,job.leaseToken,result);}catch{onError('TASK_WORKER_UNAVAILABLE');}finally{running=false;}}
 return {runOnce,start(){if(!timer){stopped=false;timer=setInterval(runOnce,intervalMs);timer.unref();runOnce();}},stop(){stopped=true;clearInterval(timer);timer=null;}};
}
