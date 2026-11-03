const labels={CURRENT:'Bukti terkini',STALE:'Bukti kedaluwarsa',UNAVAILABLE:'Bukti belum tersedia',NOT_RUN:'Belum diuji',PASS:'Lulus untuk skenario tercatat',FAIL:'Skenario gagal',PARTIAL:'Sebagian skenario belum selesai',BLOCKED:'Pengujian terhalang',STALE_RELEASE:'Kode game berubah; perlu diuji ulang',UNVERIFIED_RELEASE:'Versi produksi belum terverifikasi'};
const measured=n=>Number.isSafeInteger(n)&&n>=0?n:null;
const fresh=(at,now)=>Number.isSafeInteger(at)&&at>0&&at<=now&&now-at<=7200000;
const ageStatus=(value,now)=>value&&Object.hasOwn(labels,value.status)?['UNAVAILABLE','NOT_RUN'].includes(value.status)?value.status:!fresh(value.observedAt,now)?'STALE':value.status:'UNAVAILABLE';
const duration=ms=>Number.isSafeInteger(ms)&&ms>=0?ms<60000?'Kurang dari 1 menit':ms<3600000?Math.round(ms/60000)+' menit':(ms/3600000).toFixed(1)+' jam':'Belum ada perbaikan terverifikasi';
const dateText=at=>Number.isSafeInteger(at)&&at>0?new Date(at).toLocaleString('id-ID',{timeZone:'Asia/Pontianak'})+' WIB':'Belum tersedia';
export function gameplayView(report,now=Date.now(),connected=true){
 const valid=report?.schemaVersion===1&&Number.isSafeInteger(report.generatedAt)&&report.generatedAt<=now;
 const sessions=valid?report.sessions:{},synthetic=valid?report.synthetic:{},operations=valid?report.operations:{};
 const sStatus=connected&&valid?ageStatus(sessions,now):'UNAVAILABLE',qStatus=connected&&valid?ageStatus(synthetic,now):'UNAVAILABLE';
 return {
  sessions:{status:sStatus,label:labels[sStatus],completed:measured(sessions?.completed),started:measured(sessions?.started),at:dateText(sessions?.observedAt),windowStart:dateText(sessions?.windowStart),windowEnd:dateText(sessions?.windowEnd),games:Array.isArray(sessions?.games)?[...sessions.games].sort((a,b)=>b.started-a.started||a.game.localeCompare(b.game)):[]},
  synthetic:{status:qStatus,label:labels[qStatus],completed:measured(synthetic?.completedSessions),at:dateText(synthetic?.observedAt),scenarios:Array.isArray(synthetic?.scenarios)?synthetic.scenarios:[]},
  operations:{repeated:measured(operations?.repeatedErrors),open:measured(operations?.openJobs),verified:measured(operations?.verifiedRepairs),mean:duration(operations?.meanResolutionMs),median:duration(operations?.medianResolutionMs)},
  untested:Array.isArray(report?.coverage)?report.coverage.filter(g=>g.status==='NOT_RUN').map(g=>g.game):[],
 };
}
export function gameplayDelay({failures=0,hidden=false,offline=false,session=false}={}){return hidden||offline||session?null:Math.min(300000,60000*2**Math.min(failures,3));}
export function bindGameplayPanel(){
 const $=s=>document.querySelector(s);let state=null,connected=false,busy=false,disposed=false,session=false,failures=0,timer,controller;
 const text=(selector,value)=>{$(selector).textContent=value;};
 const cell=value=>{const el=document.createElement('td');el.textContent=String(value??'—');return el;};
 const rows=(selector,values)=>{$(selector).replaceChildren(...values.map(values=>{const row=document.createElement('tr');row.append(...values.map(cell));return row;}));};
 function render(){
  const view=gameplayView(state,Date.now(),connected),s=view.sessions,q=view.synthetic,o=view.operations;
  text('#gameplay-sessions',s.completed??'—');text('#gameplay-session-status',s.label+' · '+(s.started??'—')+' dimulai');
  text('#gameplay-synthetic',q.completed??'—');text('#gameplay-synthetic-status',q.label);
  $('#gameplay-synthetic-status').dataset.status=q.status;
  text('#gameplay-errors',o.repeated??'—');text('#gameplay-error-status',(o.open??'—')+' tugas belum selesai');
  text('#gameplay-duration',o.mean);text('#gameplay-duration-status',(o.verified??'—')+' perbaikan terverifikasi · median '+o.median);
  text('#gameplay-session-time','Periode: '+s.windowStart+' — '+s.windowEnd+'. Diambil: '+s.at+'.');
  text('#gameplay-synthetic-time','Pengujian terakhir: '+q.at+'. Mode tanpa skenario di bawah belum diuji.');
  text('#gameplay-session-count',s.games.length+' game memiliki sesi materi tercatat');
  text('#gameplay-scenario-count',q.scenarios.length+' skenario browser terisolasi');
  rows('#gameplay-game-rows',s.games.map(g=>[g.game,g.started,g.completed]));
  rows('#gameplay-scenario-rows',q.scenarios.map(v=>[v.game,v.mode==='screen'?'Satu layar':'Room bersama',labels[v.status]||'Belum diketahui',v.completedSessions]));
  text('#gameplay-untested',view.untested.length?'Game tanpa skenario tercatat: '+view.untested.join(', ')+'.':'Cakupan mengikuti daftar skenario; tidak menyatakan seluruh game atau mode sudah diuji.');
 }
 function schedule(){clearTimeout(timer);const delay=gameplayDelay({failures,hidden:document.hidden||$('#view-board').hidden,offline:navigator.onLine===false,session});if(!disposed&&delay)timer=setTimeout(load,delay);}
 async function load(){
  if(busy||disposed||document.hidden||$('#view-board').hidden||navigator.onLine===false||session){schedule();return;}
  busy=true;controller=new AbortController();const timeout=setTimeout(()=>controller?.abort(),10000);
  try{
   const response=await fetch('/agent-office/api/gameplay',{credentials:'same-origin',cache:'no-store',signal:controller.signal});
   if(response.status===401)session=true;
   if(!response.ok)throw Error('GAMEPLAY_UNAVAILABLE');
   const value=await response.json();if(value?.schemaVersion!==1||!value.sessions||!value.synthetic||!value.operations||!Array.isArray(value.coverage))throw Error('GAMEPLAY_UNAVAILABLE');
   state=value;connected=true;failures=0;text('#gameplay-notice','');
  }catch{connected=false;failures++;text('#gameplay-notice',session?'Sesi berakhir. Masuk kembali.':'Bukti gameplay belum dapat diperbarui. Angka yang tersisa adalah salinan terakhir.');}
  finally{clearTimeout(timeout);controller=null;busy=false;render();schedule();}
 }
 const wake=()=>{render();load();},offline=()=>{connected=false;render();schedule();};
 const onTab=()=>queueMicrotask(wake);
 document.addEventListener('visibilitychange',wake);addEventListener('online',wake);addEventListener('offline',offline);$('#tab-board').addEventListener('click',onTab);$('#board-refresh').addEventListener('click',wake);
 addEventListener('pagehide',()=>{disposed=true;controller?.abort();clearTimeout(timer);document.removeEventListener('visibilitychange',wake);removeEventListener('online',wake);removeEventListener('offline',offline);$('#tab-board').removeEventListener('click',onTab);$('#board-refresh').removeEventListener('click',wake);},{once:true});
 render();load();return {refresh:load};
}
