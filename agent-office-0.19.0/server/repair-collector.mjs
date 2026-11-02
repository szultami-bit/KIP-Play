export function makeRepairCollector({repairs,readReport,readIncidents,intervalMs=5000,onError=()=>{}}){
 let timer;
 const runOnce=()=>{try{repairs.observeMonitor(readReport());}catch{onError('REPAIR_MONITOR_UNAVAILABLE');}try{repairs.observeIncidents(readIncidents?.()||[]);}catch{onError('REPAIR_INTAKE_UNAVAILABLE');}};
 return {runOnce,start(){if(!timer){runOnce();timer=setInterval(runOnce,intervalMs);timer.unref();}},stop(){clearInterval(timer);timer=null;}};
}
