export function makeRepairCollector({repairs,readReport,readIncidents,readAvailability,intervalMs=5000,onError=()=>{}}){
 let timer;
 const runOnce=()=>{try{repairs.observeMonitor(readReport());}catch{onError('REPAIR_MONITOR_UNAVAILABLE');}try{repairs.observeIncidents(readIncidents?.()||[]);}catch{onError('REPAIR_INTAKE_UNAVAILABLE');}try{if(readAvailability)repairs.observeAvailability(readAvailability());}catch{onError('REPAIR_AVAILABILITY_UNAVAILABLE');}};
 return {runOnce,start(){if(!timer){runOnce();timer=setInterval(runOnce,intervalMs);timer.unref();}},stop(){clearInterval(timer);timer=null;}};
}
