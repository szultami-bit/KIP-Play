import {AGENTS,readAgents,timeLabel,ageLabel} from './observer-model.js';
import {icon} from './data.js';

const phases={waiting:'Ruang operasi · menunggu verifikasi',ascending:'Menuju lantai 3 lewat tangga',returning:'Kembali ke ruang operasi',reviewing:'Meninjau hasil baru · ilustrasi',resting:'Rehat di lantai 3'};
export function bindLiveAgents({getOffice,focusAgent,announce,onViews=()=>{}}){
 const $=s=>document.querySelector(s),cards=new Map(),movement=new Map();
 let report=null,connection='loading',selected='health',pending=false,paused=false,disposed=false,sessionExpired=false,controller=null,receivedAt=null;
 const dialog=$('#agent-report');
 $('#agent-cards').innerHTML=AGENTS.map(a=>`<button class="observer-card" id="agent-${a.id}" data-agent="${a.id}" aria-haspopup="dialog"><span class="agent-monogram">${a.short}</span><span class="agent-summary"><b>${a.name}</b><span class="agent-result">Mengambil laporan…</span><span class="agent-checked">Pemeriksaan terakhir: belum ada</span><span class="agent-activity">${phases.waiting}</span></span><span class="report-arrow" aria-hidden="true">↗</span></button>`).join('');
 for(const a of AGENTS){const el=$('#agent-'+a.id);cards.set(a.id,el);el.onclick=()=>open(a.id);}
 function views(){return readAgents(report,Date.now(),connection)}
 function activity(v){const phase=movement.get(v.id)||'waiting';return (paused?'Gerak dijeda · ':'')+(phase==='waiting'&&v.tone==='attention'?'Ruang operasi · perlu perhatian':phases[phase])+(phase==='resting'?' · '+v.activity:'');}
 function detail(){
  const v=views().find(v=>v.id===selected);if(!v)return;
  $('#report-name').textContent=v.name;
  $('#report-result').textContent=v.label+' · '+v.freshness;$('#report-result').dataset.tone=v.tone;
  $('#report-reason').textContent=v.reason;
  $('#report-activity').textContent=activity(v);
  const fields={time:timeLabel(v.lastAt),age:ageLabel(v.lastAt),source:v.source,code:v.lastCode||'Belum ada',latency:v.latencyMs===null?'Belum ada':v.latencyMs+' ms',release:v.release||'Tidak tercatat pada pemeriksaan ini',cycle:timeLabel(v.lastCycleAt),next:timeLabel(v.nextDueAt),received:timeLabel(receivedAt),recorded:v.lastResult};
  for(const [key,value]of Object.entries(fields))$('#report-'+key).textContent=value;
 }
 function render(){
  if(disposed)return;const list=views();
  for(const v of list){const el=cards.get(v.id);el.dataset.tone=v.tone;el.querySelector('.agent-result').textContent=v.label+' · '+v.freshness;el.querySelector('.agent-checked').textContent='Diperiksa '+ageLabel(v.lastAt)+' · '+timeLabel(v.lastAt);el.querySelector('.agent-activity').textContent=activity(v);el.setAttribute('aria-label',v.name+'. '+v.label+'. '+v.freshness+'. Buka laporan nyata.');}
  getOffice()?.updateAgents(list);onViews(list);
  const connectionText=connection==='loading'?'Mengambil laporan…':connection==='session'?'Sesi berakhir. Masuk kembali.':connection==='error'?'Koneksi terputus · mencoba lagi setiap 30 detik':report?.source==='observer'?'Laporan VPS · 30 dtk':'Sumber langsung belum tersedia';if($('#report-connection').textContent!==connectionText)$('#report-connection').textContent=connectionText;
  $('#refresh-report').disabled=pending||sessionExpired;
  if(dialog.open)detail();
 }
 async function refresh(){
  if(pending||disposed||document.hidden||sessionExpired)return;
  pending=true;controller=new AbortController();const timeout=setTimeout(()=>controller?.abort(),12000);render();
  try{
   const response=await fetch('/agent-office/api/report',{credentials:'same-origin',cache:'no-store',signal:controller.signal});
   if(response.status===401){connection='session';sessionExpired=true;return;}
   if(!response.ok)throw Error('Report unavailable');
   const next=await response.json();if(!next||!Array.isArray(next.checks)||!next.observer||!['observer','snapshot','unavailable'].includes(next.source))throw Error('Invalid report');
   report=next;receivedAt=Date.now();connection='ready';
  }catch{if(!disposed)connection='error';}
  finally{clearTimeout(timeout);pending=false;controller=null;render();}
 }
 function open(id){if(!['health','release'].includes(id))return;selected=id;detail();if(!dialog.open)dialog.showModal();}
 function move(id,phase){movement.set(id,phase);const v=views().find(v=>v.id===id);if(v)cards.get(id)?.querySelector('.agent-activity')?.replaceChildren(document.createTextNode(activity(v)));if(dialog.open&&selected===id)detail();}
 function syncMotion(){const software=getOffice()?.software;const reduced=software||matchMedia('(prefers-reduced-motion: reduce)').matches;$('#walk').disabled=!getOffice()||reduced;$('#walk').setAttribute('aria-pressed',String(paused));$('#walk').innerHTML=icon(paused?'play':'pause')+'<span>'+(paused?'Lanjutkan gerak karakter':'Jeda gerak karakter')+'</span>';$('#motion-note').textContent=software?'Mode kompatibel: posisi diperbarui tanpa animasi berjalan.':reduced?'Gerakan disederhanakan sesuai preferensi perangkat.':paused?'Gerakan dijeda. Pembacaan laporan tetap berjalan.':'Gerakan mengilustrasikan hasil terakhir · bukan aktivitas langsung';}
 $('#walk').onclick=()=>{paused=!paused;getOffice()?.pauseMotion(paused);syncMotion();render();announce(paused?'Gerakan dijeda; laporan tetap diperbarui.':'Gerakan karakter dilanjutkan.');};
 $('#refresh-report').onclick=refresh;
 $('#report-focus').onclick=()=>{dialog.close();focusAgent(selected);};
 $('#report-close').onclick=()=>dialog.close();
 const visible=()=>{if(!document.hidden){render();refresh();}};
 document.addEventListener('visibilitychange',visible);
 const media=matchMedia('(prefers-reduced-motion: reduce)');media.addEventListener('change',syncMotion);
 const poll=setInterval(refresh,30000),clock=setInterval(()=>{if(!document.hidden)render()},5000);
 const dispose=()=>{disposed=true;controller?.abort();clearInterval(poll);clearInterval(clock);document.removeEventListener('visibilitychange',visible);media.removeEventListener('change',syncMotion);};
 addEventListener('pagehide',dispose,{once:true});
 syncMotion();render();refresh();
 return {open,move,dispose,refresh};
}
