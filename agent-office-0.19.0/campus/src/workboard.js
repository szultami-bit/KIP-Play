import {AGENTS,timeLabel,ageLabel} from './observer-model.js';
export function boardColumn(view,review){return review?.reviewing?'doing':view.canRest?'done':'todo';}
export function bindWorkboard({openReport,refreshReport,announce}){
 const $=s=>document.querySelector(s),cards=new Map();let state=null,list=[],busy=false,disposed=false,session=false,controller=null;
 const labels={health:'Periksa layanan',release:'Periksa versi rilis'};
 for(const a of AGENTS){
  const el=document.createElement('article');el.className='job-card';el.tabIndex=-1;el.dataset.job=a.id;
  el.innerHTML=`<div class="job-owner"><span class="agent-monogram">${a.short}</span><span>${a.name}</span></div><h3>${labels[a.id]}</h3><p class="job-result"></p><p class="job-time"></p><p class="job-review" hidden>Tinjauan Anda</p><div class="job-actions"><button data-action="report">Lihat hasil</button><button data-action="start" class="primary-action">Mulai tinjau</button><button data-action="complete" class="primary-action" hidden>Selesaikan</button><button data-action="cancel" class="quiet-action" hidden>Hentikan tinjauan</button></div>`;
  for(const b of el.querySelectorAll('button'))b.onclick=()=>b.dataset.action==='report'?openReport(a.id):update(a.id,b.dataset.action);
  cards.set(a.id,el);$('#jobs-todo').append(el);
 }
 function notice(text){$('#board-notice').textContent=text;}
 function render(){
  const counts={todo:0,doing:0,done:0};
  for(const v of list){
   const el=cards.get(v.id),review=state?.reviews[v.id],column=state?boardColumn(v,review):'todo';counts[column]++;
   if(el.parentElement.id!=='jobs-'+column)$('#jobs-'+column).append(el);
   el.dataset.tone=v.tone;el.querySelector('.job-result').textContent=v.label+' · '+v.freshness;
   el.querySelector('.job-time').textContent=v.lastAt?'Diperiksa '+ageLabel(v.lastAt)+'\n'+timeLabel(v.lastAt):'Belum ada hasil pemeriksaan';
   const tag=el.querySelector('.job-review');tag.hidden=!review?.reviewing;tag.textContent='Tinjauan Anda · sejak '+timeLabel(review?.startedAt);
   for(const b of el.querySelectorAll('[data-action]')){
    const action=b.dataset.action;b.hidden=action==='start'?!!review?.reviewing:['complete','cancel'].includes(action)?!review?.reviewing:false;
    b.disabled=action==='report'?false:!state||busy||session||(action==='complete'&&!v.canRest);
    if(action==='start')b.textContent=column==='done'?'Tinjau ulang':'Mulai tinjau';
    if(action==='complete')b.title=v.canRest?'Tandai tinjauan selesai':'Menunggu hasil terbaru yang sehat';
   }
  }
  for(const col of Object.keys(counts)){$('#count-'+col).textContent=counts[col];$('#empty-'+col).hidden=counts[col]>0;}
  $('#board-refresh').disabled=busy||session;
 }
 async function request(body){
  controller=new AbortController();const timer=setTimeout(()=>controller?.abort(),12000);
  try{const response=await fetch('/agent-office/api/board',{method:body?'POST':'GET',credentials:'same-origin',cache:'no-store',headers:body?{'Content-Type':'application/json'}:undefined,body:body?JSON.stringify(body):undefined,signal:controller.signal});const data=await response.json();if(response.status===401)session=true;if(!response.ok)throw Error(data.error||'BOARD_UNAVAILABLE');if(data?.version!==1||!Number.isSafeInteger(data.revision)||!data.reviews||!('health'in data.reviews)||!('release'in data.reviews))throw Error('BOARD_UNAVAILABLE');return data;}finally{clearTimeout(timer);controller=null;}
 }
 async function load(){
  if(busy||disposed||document.hidden||session)return;busy=true;render();
  try{state=await request();notice('');}catch{state=null;notice(session?'Sesi berakhir. Masuk kembali.':'Papan belum tersambung. Coba perbarui.');}finally{busy=false;render();}
 }
 async function update(id,action){
  if(busy||!state||session)return;busy=true;render();const view=list.find(v=>v.id===id);
  try{state=await request({id,action,revision:state.revision,...(action==='complete'?{resultAt:view?.lastAt}: {})});const message=action==='start'?'Tinjauan dimulai.':action==='complete'?'Tinjauan selesai.':'Tinjauan dihentikan.';notice(message);announce(message);}
  catch(e){const messages={BOARD_CHANGED:'Papan berubah di perangkat lain. Tampilan diperbarui.',RESULT_CHANGED:'Ada hasil baru. Buka hasil sebelum menyelesaikan.',RESULT_NOT_VERIFIED:'Hasil belum sehat atau sudah lama. Tinjauan belum selesai.',NOT_REVIEWING:'Tinjauan sudah berubah. Tampilan diperbarui.',ALREADY_REVIEWING:'Tinjauan sudah dimulai.'};notice(session?'Sesi berakhir. Masuk kembali.':messages[e.message]||'Perubahan belum dapat dipastikan. Perbarui papan.');state=null;try{if(!session)state=await request();}catch{}refreshReport();}
  finally{busy=false;render();cards.get(id)?.focus({preventScroll:true});}
 }
 $('#board-refresh').onclick=()=>{load();refreshReport();};
 const visible=()=>{if(!document.hidden)load();};document.addEventListener('visibilitychange',visible);
 const poll=setInterval(load,30000);addEventListener('pagehide',()=>{disposed=true;controller?.abort();clearInterval(poll);document.removeEventListener('visibilitychange',visible);},{once:true});
 load();return {receive(views){list=views;render();}};
}
