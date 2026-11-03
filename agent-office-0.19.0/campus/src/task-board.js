import {refreshBoardCounts} from './workboard.js';
export const taskColumn=status=>['running','verifying'].includes(status)?'doing':['completed','recovered'].includes(status)?'done':'todo';
const dateText=at=>Number.isSafeInteger(at)&&at>0?new Date(at).toLocaleString('id-ID'):'waktu belum tersedia';
export function incidentView(incident){
 const name=typeof incident.game==='string'&&incident.game?incident.game.split('-').map(word=>word.charAt(0).toUpperCase()+word.slice(1)).join(' '):'Game belum diketahui';
 return `${name} · ${incident.mode} · ${incident.errorClass} · ${incident.occurrences} laporan · ${incident.jobId?'sudah ditugaskan':'menunggu skill koordinator dan agent'} · belum terverifikasi`;
}
export function repairView(job){
 const receipt=job.receipt||{},verification=receipt.verification||{},availability=job.kind==='availability',synthetic=job.source==='gameplay-monitor'&&job.backend==='isolated-synthetic';
 const labels={queued:'Menunggu agen perbaikan',running:'Agen sedang memperbaiki',verifying:'Menunggu verifikasi setelah perbaikan',blocked:'Terhalang · '+(receipt.summary||'alasan belum tersedia'),failed:'Perbaikan belum berhasil · '+(receipt.summary||'lihat bukti'),completed:availability?'Akses HTTP terverifikasi':'Perbaikan terverifikasi',recovered:'Pulih terverifikasi · tanpa klaim perbaikan'};
 const evidence=[
  ...(synthetic?['Sumber: uji browser terisolasi dengan akun/materi sintetis.','Skenario: '+job.scenarioId+'; checkpoint terakhir: '+job.checkpoint+'.']:[]),
  'Penyebab: '+(receipt.rootCause||'belum ditemukan'),
  'Commit: '+(receipt.patchSha||'belum tersedia'),
  receipt.tests&&Number.isSafeInteger(receipt.tests.passed)&&Number.isSafeInteger(receipt.tests.failed)?`Pengujian: ${receipt.tests.passed} lulus · ${receipt.tests.failed} gagal`:'Pengujian: belum tersedia',
  receipt.deployedRelease&&Number.isSafeInteger(receipt.deploymentAt)?`Deploy tercatat: ${dateText(receipt.deploymentAt)} · rilis ${receipt.deployedRelease}`:'Deploy: belum ada bukti',
 ];
 if(verification.passed===true){
  evidence.push(availability?`Verifikasi HTTP: ${verification.path||job.path||'jalur belum tersedia'} · ${dateText(verification.at)}`:verification.gameplayPassed===true?`Skenario gameplay: ${verification.scenario||'belum dicatat'} · ${dateText(verification.at)}`:`Verifikasi identitas rilis: ${dateText(verification.at)}`);
 }
 if(['blocked','failed'].includes(job.status))evidence.push('Penghalang: '+(receipt.summary||'alasan belum tersedia'));
 evidence.push(...(receipt.evidence||[job.code||job.errorClass||'Laporan diterima']));
 const limitations=availability?'Verifikasi HTTP belum membuktikan gameplay, login, room, atau skor.':job.kind==='monitor'?'Verifikasi identitas rilis belum membuktikan gameplay.':synthetic?'Uji terisolasi tidak membuktikan integrasi akun/AI produksi atau seluruh perangkat. Cakupan mengikuti skenario yang tercatat.':'Cakupan pengujian mengikuti bukti dan skenario yang tercatat.';
 const nextSteps=['blocked','failed'].includes(job.status)?['Selesaikan penghalang yang tercatat sebelum mencoba perbaikan kembali.']:job.status==='queued'?['Menunggu agen terjadwal mengambil tugas.']:job.status==='verifying'?['Menunggu pengamatan baru yang cocok dengan bukti deploy.']:[];
 return {...job,source:'repair',skill:{id:'bug-repair',version:1},result:{summary:labels[job.status]||'Status belum diketahui',scope:availability?'Pemeriksaan akses HTTP pada jalur yang dilaporkan.':synthetic?'Perbaikan kegagalan skenario browser terisolasi. Selesai memerlukan bukti pengujian sesuai cakupan dan versi.':'Perbaikan bug oleh agen ChatGPT. Selesai memerlukan bukti dan pemeriksaan produksi.',evidence,nextSteps,limitations}};
}

export function pollDelay({pending=false,failures=0,hidden=false,offline=false,session=false}={}){return hidden||offline||session?null:Math.min(120000,(pending?5000:30000)*2**Math.min(failures,3));}
export function bindTaskBoard({announce}){
 const $=s=>document.querySelector(s),cards=new Map(),labels={queued:'Menunggu worker',running:'Sedang diperiksa',completed:'Pemeriksaan selesai',blocked:'Terhalang',failed:'Pemeriksaan gagal'};
 let state=null,busy=false,disposed=false,session=false,failures=0,timer,controller,pending=null,selected=null,noticeKind='';
 try{const saved=JSON.parse(sessionStorage.getItem('kip-pending-task'));if(saved&&typeof saved.taskId==='string'&&/^[a-f0-9-]{36}$/i.test(saved.requestId))pending=saved;}catch{}
 const notice=(text,kind='submission')=>{noticeKind=kind;$('#task-notice').textContent=text;};
 const save=()=>{try{if(pending)sessionStorage.setItem('kip-pending-task',JSON.stringify(pending));else sessionStorage.removeItem('kip-pending-task');}catch{}};
 function detail(job){
  selected=job.id;$('#task-result-title').textContent=job.title;$('#task-result-summary').textContent=job.result?.summary||labels[job.status];
  $('#task-result-meta').textContent=`${job.agentId} · ${job.skill.id} v${job.skill.version} · ${new Date(job.updatedAt).toLocaleString('id-ID')}`;
  $('#task-result-boundary').textContent=job.result?.scope||'Pemeriksaan baca saja. Hasil diagnosis tidak berarti bug sudah diperbaiki.';
  const list=(selector,values)=>{$(selector).replaceChildren(...(values||[]).map(v=>{const li=document.createElement('li');li.textContent=String(v);return li;}));};
  list('#task-result-evidence',job.result?.evidence);list('#task-result-next',job.result?.nextSteps);
  list('#task-result-history',job.history.map(h=>`${new Date(h.at).toLocaleString('id-ID')} · ${labels[h.event]||h.event}`));
  $('#task-result-limit').textContent=job.result?.limitations||'';
 }
 function render(){
  $('#task-run').disabled=busy||session||!state;$('#task-select').disabled=busy||session||!!pending||!state;$('#task-run').textContent=pending?'Coba kirim ulang':'Jalankan';
  $('#task-worker').textContent=state?.repairs?.executor?.configured?'Antrean otomatis · agen perbaikan setiap jam':state?.worker.status==='running'&&Date.now()-state.worker.lastAt<20000?'Pemantau tersambung · agen perbaikan belum tersambung':'Worker belum terverifikasi';
  $('#incident-list').replaceChildren(...(state?.incidents||[]).map(i=>{const li=document.createElement('li');li.textContent=incidentView(i);return li;}));
  for(const job of state?.jobs||[]){let card=cards.get(job.id);if(!card){card=document.createElement('article');card.className='job-card';const owner=document.createElement('p'),title=document.createElement('h3'),result=document.createElement('p'),time=document.createElement('p'),actions=document.createElement('div'),button=document.createElement('button');owner.className='job-owner';title.className='task-title';result.className='job-result';time.className='job-time';actions.className='job-actions';button.textContent='Lihat hasil';button.onclick=()=>{const current=state.jobs.find(j=>j.id===job.id);if(current){detail(current);$('#task-result').showModal();}};actions.append(button);card.append(owner,title,result,time,actions);cards.set(job.id,card);}
   card.querySelector('.job-owner').textContent=job.agentId+' · '+(job.source==='repair'?'Perbaikan otomatis':job.source==='incident'?'Diagnosis laporan game':'Pemeriksaan Anda');card.querySelector('h3').textContent=job.title;card.querySelector('.job-result').textContent=job.result?.summary||labels[job.status];card.querySelector('.job-time').textContent=new Date(job.updatedAt).toLocaleString('id-ID')+' · '+job.skill.id+' v'+job.skill.version;card.dataset.tone=job.status==='completed'?'good':'pending';$('#jobs-'+taskColumn(job.status)).append(card);
  }
  for(const [id,card]of cards)if(!state?.jobs.some(j=>j.id===id)){card.remove();cards.delete(id);}
  if(selected&&$('#task-result').open){const job=state?.jobs.find(j=>j.id===selected);if(job)detail(job);}refreshBoardCounts();
 }
 async function request(body){controller=new AbortController();const timeout=setTimeout(()=>controller?.abort(),10000);try{const response=await fetch('/agent-office/api/jobs',{method:body?'POST':'GET',credentials:'same-origin',cache:'no-store',headers:body?{'Content-Type':'application/json'}:undefined,body:body?JSON.stringify(body):undefined,signal:controller.signal});const data=await response.json();if(response.status===401)session=true;if(!response.ok){const e=Error(data.error||'TASKS_UNAVAILABLE');e.status=response.status;throw e;}return data;}finally{clearTimeout(timeout);controller=null;}}
 function schedule(){clearTimeout(timer);const delay=pollDelay({pending:state?.jobs.some(j=>['queued','running','verifying'].includes(j.status)),failures,hidden:document.hidden||$('#view-board').hidden,offline:navigator.onLine===false,session});if(!disposed&&delay)timer=setTimeout(load,delay);}
 async function load(){if(busy||disposed||document.hidden||navigator.onLine===false||session)return;busy=true;try{const next=await request();if(next.schemaVersion!==1||!Array.isArray(next.jobs)||!Array.isArray(next.catalog))throw Error();next.jobs=[...(next.repairs?.jobs||[]).map(repairView),...next.jobs];state=next;failures=0;if(noticeKind==='refresh')notice('','refresh');const value=pending?.taskId||$('#task-select').value;$('#task-select').replaceChildren(...state.catalog.map(t=>new Option(t.title,t.id)));if([...$('#task-select').options].some(o=>o.value===value))$('#task-select').value=value;if(pending&&state.jobs.some(j=>j.requestId===pending.requestId)){pending=null;save();notice('Tugas sudah tersimpan.');}}catch{failures++;notice(session?'Sesi berakhir. Masuk kembali.':'Antrean belum dapat diperbarui. Hasil yang tampil adalah salinan terakhir.','refresh');}finally{busy=false;render();schedule();}}
 $('#task-run').onclick=async()=>{if(busy||session||!state)return;pending??={taskId:$('#task-select').value,requestId:crypto.randomUUID()};save();busy=true;render();try{await request(pending);pending=null;save();notice('Tugas tersimpan di antrean.');announce('Tugas tersimpan di antrean.');}catch(e){if(e.status>=400&&e.status<500&&e.status!==429){pending=null;save();}notice(e.message==='TASK_SKILL_UNAVAILABLE'?'Skill aktif belum tersedia untuk tugas ini.':e.message==='REQUEST_ID_CONFLICT'?'Permintaan sudah berubah. Periksa daftar tugas sebelum mencoba lagi.':session?'Sesi berakhir. Masuk kembali.':'Pengiriman belum dapat dipastikan. Coba kirim ulang dengan ID yang sama.');}finally{busy=false;render();load();}};
 $('#task-result-close').onclick=()=>$('#task-result').close();$('#task-result').addEventListener('close',()=>selected=null);
 const wake=()=>{if(!document.hidden&&!$('#view-board').hidden)load();else schedule();};document.addEventListener('visibilitychange',wake);addEventListener('online',wake);addEventListener('offline',schedule);$('#tab-board').addEventListener('click',()=>queueMicrotask(wake));$('#board-refresh').addEventListener('click',load);
 addEventListener('pagehide',()=>{disposed=true;controller?.abort();clearTimeout(timer);document.removeEventListener('visibilitychange',wake);removeEventListener('online',wake);removeEventListener('offline',schedule);},{once:true});load();
}

