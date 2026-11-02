import {agentTools,filterSkills,getActiveVersion,getCandidateVersion,preferredVersion,registrySummary,versionState} from './skill-model.js';

const CATEGORY_LABELS={coordination:'Koordinasi',operations:'Operasional',quality:'Kualitas',security:'Keamanan',content:'Konten',support:'Dukungan',growth:'Pertumbuhan',research:'Riset'};
const RISK_LABELS={low:'Rendah',medium:'Sedang',high:'Tinggi'};
const AUTHORITY_LABELS={observer:'Observer · hanya membaca',advisor:'Advisor · memberi rekomendasi',draft:'Draft · menyiapkan pekerjaan',operator:'Operator · tindakan terotorisasi'};
const ISSUE_LABELS={TITLE_INVALID:'Judul belum valid',CATEGORY_INVALID:'Kategori belum valid',DESCRIPTION_INVALID:'Deskripsi perlu 10–320 karakter',RISK_INVALID:'Tingkat risiko belum valid',TOOLS_INVALID:'Nama atau jumlah tool belum valid',INSTRUCTIONS_TOO_SHORT:'Instruksi perlu sekurangnya 80 karakter',GOAL_SECTION_REQUIRED:'Bagian # Tujuan wajib ada',STEPS_SECTION_REQUIRED:'Bagian ## Langkah wajib ada',OUTPUT_SECTION_REQUIRED:'Bagian ## Output wajib ada',CHANGELOG_REQUIRED:'Catatan perubahan wajib ada',SCENARIO_REQUIRED:'Minimal satu skenario uji wajib ada',SCENARIO_INVALID:'Skenario uji belum valid'};
const agentNames=new Map([
 ['coordinator','Koordinator tim','KT'],['health','Pemantau layanan','PL'],['release','Penjaga rilis','PR'],['capacity','Penjaga kapasitas','KP'],['qa','Penguji permainan','QA'],['accounts','Penjaga akun','AK'],['security','Penjaga keamanan','KM'],['backup','Penjaga backup','BK'],['content','Kurator bank materi','MT'],['payments','Penjaga pembayaran','PB'],['support','Pendamping pelanggan','BP'],['growth','Pengembang pertumbuhan','PT'],['growth-stats','Statistik Game','SG'],['instagram-admin','AI Admin KIP','DM']
].map(([id,name,short])=>[id,{id,name,short}]));
const clone=value=>structuredClone(value);
const text=(value,fallback='—')=>typeof value==='string'&&value.trim()?value:fallback;
const byId=(list,id)=>list?.find(item=>item.id===id)||null;

export function bindAgentSkills({announce}){
 const $=selector=>document.querySelector(selector);
 let registry=null,busy=false,disposed=false,selectedAgentId=null,selectedSkillId=null,dialogMode='view',dialogScenarios=[],dirty=false,conflicted=false;

 function setNotice(message,tone='neutral'){
  const el=$('#skills-notice');el.textContent=message||'';el.dataset.tone=tone;
  if(message)announce(message);
 }
 function syncControls(){
  const skill=byId(registry?.skills,selectedSkillId),candidate=!!skill?.candidateVersion;
  $('#skills-refresh').disabled=busy;$('#skill-create').disabled=busy||!registry;
  $('#agent-authority').disabled=busy||!byId(registry?.agents,selectedAgentId);
  $('#skill-form')?.querySelectorAll('button,input,select,textarea').forEach(control=>{control.disabled=busy||control.dataset.locked==='true';});
  $('#skill-save').disabled=busy||conflicted;
  $('#skill-test').disabled=busy||conflicted||dialogMode==='new'||!candidate;
  $('#skill-activate').disabled=busy||conflicted||dirty||!versionState(skill,registry).canActivate;
  $('#skill-rollback').disabled=busy||conflicted||dirty;
  $('#skill-install-toggle').disabled=busy||conflicted||dirty;
  $('#skill-add-scenario').disabled=busy||dialogMode==='view'||dialogScenarios.length>=6;
 }
 function setBusy(value){busy=value;syncControls();}
 function markDirty(){dirty=true;syncControls();$('#skill-validation').textContent='Ada perubahan belum disimpan. Test akan menyimpan kandidat lalu memeriksanya.';}
 async function request(body){
  const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),12000);
  try{
   const response=await fetch('/agent-office/api/skills',{method:body?'POST':'GET',credentials:'same-origin',cache:'no-store',headers:body?{'Content-Type':'application/json'}:undefined,body:body?JSON.stringify(body):undefined,signal:controller.signal});
   let data={};try{data=await response.json();}catch{}
   if(response.status===401){location.replace('/login.html');throw Error('AUTH_REQUIRED');}
   if(!response.ok){const error=Error(data.error||'SKILLS_UNAVAILABLE');error.unknownOutcome=response.status>=500;throw error;}
   if(data?.schemaVersion!==2||!Number.isSafeInteger(data.revision)||!Array.isArray(data.agents)||!Array.isArray(data.skills))throw Error('SKILLS_UNAVAILABLE');
   return data;
  }finally{clearTimeout(timer);}
 }
 async function load({quiet=false}={}){
  if(busy||disposed||$('#skill-editor').open)return;setBusy(true);if(!quiet)setNotice('Memuat registry agent dan skill…');
  try{
   registry=await request();conflicted=false;
   if(!selectedAgentId||!byId(registry.agents,selectedAgentId))selectedAgentId=registry.agents[0]?.id||null;
   if(!selectedSkillId||!byId(registry.skills,selectedSkillId))selectedSkillId=registry.skills[0]?.id||null;
   render();setNotice('Registry terbaru sudah dimuat.','good');
  }catch(error){setNotice(error.message==='AUTH_REQUIRED'?'Sesi berakhir. Masuk kembali.':'Registry skill belum dapat dibaca. Data lama tidak diubah.','attention');}
  finally{setBusy(false);}
 }
 async function mutate(action,success,{keepDialog=false}={}){
  if(busy||!registry)return false;setBusy(true);
  try{
   registry=await request({...action,revision:registry.revision});render();setNotice(success,'good');
   if(keepDialog&&selectedSkillId)fillEditor(byId(registry.skills,selectedSkillId),'view');return true;
  }catch(error){
   const messages={SKILL_TEST_REQUIRED:'Jalankan Test pada kandidat terbaru sebelum mengaktifkan.',ROLLBACK_NOT_ALLOWED:'Rollback hanya tersedia untuk versi yang pernah aktif.',SKILLS_BUSY:'Registry sedang dipakai. Tutup editor dan muat ulang sebelum mencoba lagi.',REGISTRY_LIMIT:'Batas registry tercapai. Arsipkan melalui pemeliharaan sebelum menambah data.',SKILLS_CHANGED:'Registry berubah di tab lain. Tampilan dimuat ulang sebelum Anda melanjutkan.',SKILL_INVALID:'Kandidat belum lolos pemeriksaan struktur.',SKILL_NOT_ACTIVE:'Skill belum aktif sehingga belum dapat dipasang.',BAD_SKILLS_REQUEST:'Perubahan tidak valid dan tidak disimpan.',SKILLS_UNAVAILABLE:'Registry belum tersedia; data lama tetap dipertahankan.'};
   setNotice(messages[error.message]||'Perubahan belum dapat disimpan. Tidak ada tindakan eksternal yang dijalankan.','attention');
   if(['SKILLS_CHANGED','SKILLS_BUSY','SKILLS_UNAVAILABLE'].includes(error.message)||error.name==='AbortError'||error instanceof TypeError||error.unknownOutcome){conflicted=true;setNotice('Hasil perubahan belum dapat dipastikan. Tutup editor dan muat ulang registry sebelum mencoba lagi. Isian Anda tetap terlihat.','attention');}
   return false;
  }finally{setBusy(false);}
 }
 function renderSummary(){
  const summary=registrySummary(registry),values={agents:summary.agentCount,skills:summary.skillCount,active:summary.activeCount,candidates:summary.candidateCount,installations:summary.installationCount,revision:'r'+summary.revision};
  for(const [key,value] of Object.entries(values))$('#skill-summary-'+key).textContent=value;
  const warning=$('#skill-summary-candidate-note');warning.textContent=summary.invalidCandidateCount?`${summary.invalidCandidateCount} kandidat perlu diperbaiki`:'Semua kandidat valid';warning.dataset.tone=summary.invalidCandidateCount?'attention':'good';
  $('#skill-execution-state').textContent=registry.executionEnabled?'Eksekusi aktif':'Konfigurasi saja';
  $('#skill-execution-state').dataset.tone=registry.executionEnabled?'attention':'safe';
  $('#skill-execution-boundary').textContent=registry.executionBoundary;
 }
 function renderAgents(){
  const query=$('#agent-search').value.trim().toLocaleLowerCase('id'),container=$('#agent-directory');container.replaceChildren();
  for(const agent of registry.agents){
   const meta=agentNames.get(agent.id)||{name:agent.id,short:agent.id.slice(0,2).toUpperCase()},haystack=`${agent.id} ${meta.name}`.toLocaleLowerCase('id');if(query&&!haystack.includes(query))continue;
   const button=document.createElement('button');button.type='button';button.className='agent-directory-card';button.dataset.selected=String(agent.id===selectedAgentId);button.onclick=()=>{selectedAgentId=agent.id;renderAgents();renderAgentDetail();renderSkills();};
   const monogram=document.createElement('span');monogram.className='skill-agent-monogram';monogram.textContent=meta.short;
   const body=document.createElement('span');body.className='agent-directory-copy';const name=document.createElement('b');name.textContent=meta.name;const details=document.createElement('small');details.textContent=`${agent.installedSkills.length} skill · ${AUTHORITY_LABELS[agent.authority]?.split(' · ')[0]||agent.authority}`;body.append(name,details);
   const arrow=document.createElement('span');arrow.className='agent-directory-arrow';arrow.textContent='›';button.append(monogram,body,arrow);container.append(button);
  }
  $('#agent-empty').hidden=container.children.length>0;
 }
 function chip(label,tone='neutral'){
  const el=document.createElement('span');el.className='skill-chip';el.dataset.tone=tone;el.textContent=label;return el;
 }
 function renderAgentDetail(){
  const agent=byId(registry.agents,selectedAgentId),meta=agentNames.get(agent?.id)||{name:agent?.id||'Pilih agent',short:'AI'};
  $('#agent-detail-monogram').textContent=meta.short;$('#agent-detail-name').textContent=meta.name;$('#agent-detail-id').textContent=agent?agent.id:'—';
  const authority=$('#agent-authority');authority.value=agent?.authority||'observer';authority.disabled=!agent||busy;
  $('#authority-description').textContent=agent?AUTHORITY_LABELS[agent.authority]:'Pilih agent untuk melihat kewenangan.';
  const installed=$('#agent-installed-skills');installed.replaceChildren();
  if(!agent?.installedSkills.length)installed.append(chip('Belum ada skill terpasang','muted'));
  for(const id of agent?.installedSkills||[]){const skill=byId(registry.skills,id),version=getActiveVersion(skill);const button=document.createElement('button');button.type='button';button.className='installed-skill';button.textContent=version?.title||id;button.onclick=()=>{selectedSkillId=id;renderSkills();openSkill(id);};installed.append(button);}
  const tools=$('#agent-tool-list');tools.replaceChildren();const list=agentTools(registry,agent?.id);if(!list.length)tools.append(chip('Tidak ada tool aktif','muted'));else for(const tool of list)tools.append(chip(tool,'tool'));
  $('#agent-permission-note').textContent=agent?.authority==='operator'?'Label Operator tidak otomatis membuka tool. Tindakan tetap memerlukan integrasi dan otorisasi terpisah.':'Perubahan kewenangan hanya mengubah profil konfigurasi; tidak menjalankan tool atau pekerjaan.';
 }
 function renderSkills(){
  const options={query:$('#skill-search').value,category:$('#skill-filter-category').value,state:$('#skill-filter-state').value},skills=filterSkills(registry.skills,options),container=$('#skill-library');container.replaceChildren();
  const selectedAgent=byId(registry.agents,selectedAgentId);
  for(const skill of skills){
   const current=preferredVersion(skill),status=versionState(skill,registry),installed=selectedAgent?.installedSkills.includes(skill.id);
   const button=document.createElement('button');button.type='button';button.className='skill-library-card';button.dataset.selected=String(skill.id===selectedSkillId);button.onclick=()=>{selectedSkillId=skill.id;renderSkills();openSkill(skill.id);};
   const top=document.createElement('span');top.className='skill-card-top';const title=document.createElement('b');title.textContent=current?.title||skill.id;const badge=chip(status.label,status.tone);top.append(title,badge);
   const description=document.createElement('span');description.className='skill-card-description';description.textContent=text(current?.description,'Belum ada deskripsi.');
   const meta=document.createElement('span');meta.className='skill-card-meta';meta.append(chip(CATEGORY_LABELS[current?.category]||current?.category||'Tanpa kategori'),chip(`Risiko ${RISK_LABELS[current?.risk]||current?.risk||'—'}`,current?.risk==='high'?'attention':'neutral'));if(installed)meta.append(chip('Terpasang','good'));
   button.append(top,description,meta);container.append(button);
  }
  $('#skill-empty').hidden=skills.length>0;
 }
 function render(){if(!registry)return;renderSummary();renderAgents();renderAgentDetail();renderSkills();}
 function versionForEditor(skill){return getCandidateVersion(skill)||getActiveVersion(skill)||skill?.versions?.at(-1)||null;}
 function renderScenarios(){
  const container=$('#skill-scenarios');container.replaceChildren();dialogScenarios.forEach((scenario,index)=>{
   const row=document.createElement('fieldset');row.className='scenario-editor';const legend=document.createElement('legend');legend.textContent=`Skenario ${index+1}`;
   const name=inputField('Nama skenario',`skill-scenario-name-${index}`,scenario.name,'text');const input=inputField('Masukan uji',`skill-scenario-input-${index}`,scenario.input,'textarea');const expected=inputField('Hasil yang diharapkan',`skill-scenario-expected-${index}`,scenario.expected,'textarea');
   for(const field of [name,input,expected]){field.control.disabled=dialogMode==='view'||busy;field.control.dataset.locked=String(dialogMode==='view');field.control.addEventListener('input',()=>{const key=field.control.id.includes('-name-')?'name':field.control.id.includes('-input-')?'input':'expected';dialogScenarios[index][key]=field.control.value;markDirty();});}
   const remove=document.createElement('button');remove.type='button';remove.className='scenario-remove';remove.textContent='Hapus skenario';remove.hidden=dialogScenarios.length===1||dialogMode==='view';remove.onclick=()=>{dialogScenarios.splice(index,1);renderScenarios();markDirty();};row.append(legend,name.wrapper,input.wrapper,expected.wrapper,remove);container.append(row);
  });
  $('#skill-add-scenario').disabled=dialogScenarios.length>=6||dialogMode==='view'||busy;
 }
 function inputField(label,id,value,type){const wrapper=document.createElement('label');wrapper.className='form-field';const span=document.createElement('span');span.textContent=label;const control=document.createElement(type==='textarea'?'textarea':'input');control.id=id;if(type!=='textarea')control.type=type;control.value=value||'';control.dataset.dialogInput='true';wrapper.append(span,control);return{wrapper,control};}
 function fillEditor(skill,mode){
  dirty=false;dialogMode=mode==='view'&&skill?.candidateVersion?'edit':mode;const version=skill?versionForEditor(skill):null,isNew=mode==='new',isCandidate=!!skill&&skill.candidateVersion!==null;
  $('#skill-editor-eyebrow').textContent=isNew?'SKILL BARU':isCandidate?'KANDIDAT PEMBARUAN':'SKILL AKTIF';$('#skill-editor-title').textContent=isNew?'Buat skill baru':text(version?.title,skill?.id);
  $('#skill-id').value=isNew?'':skill?.id||'';$('#skill-id').readOnly=!isNew;
  $('#skill-title').value=version?.title||'';$('#skill-category').value=version?.category||'research';$('#skill-description').value=version?.description||'';$('#skill-risk').value=version?.risk||'low';$('#skill-tools').value=(version?.tools||[]).join(', ');$('#skill-instructions').value=version?.instructions||'# Tujuan\nJelaskan tujuan skill.\n\n## Langkah\n1. Tulis langkah kerja yang dapat diperiksa.\n2. Pisahkan fakta, asumsi, dan batas kewenangan.\n\n## Output\nJelaskan bentuk keluaran yang wajib dibuat.';$('#skill-changelog').value=version?.changelog||'Versi awal skill.';
  dialogScenarios=clone(version?.scenarios?.length?version.scenarios:[{name:'Pemeriksaan dasar',input:'Jalankan skill sesuai cakupan yang diizinkan.',expected:'Keluaran menyebut bukti, cakupan, kendala, dan tidak melampaui izin.'}]);renderScenarios();
  const editable=isNew||isCandidate;$('#skill-form').querySelectorAll('[data-editor-field]').forEach(control=>{control.disabled=!editable||busy;control.dataset.locked=String(!editable);});
  $('#skill-save').hidden=!editable;$('#skill-save').textContent=isNew?'Simpan sebagai kandidat v1':'Simpan kandidat';
  $('#skill-candidate-create').hidden=isNew||isCandidate;$('#skill-activate').hidden=isNew||!isCandidate;$('#skill-activate').disabled=!versionState(skill,registry).canActivate||busy;$('#skill-test').hidden=isNew||!isCandidate;
  const validation=$('#skill-validation');validation.replaceChildren();if(isCandidate){const state=versionState(skill,registry);validation.dataset.tone=state.candidateValid?'good':'attention';validation.append(document.createTextNode(state.canActivate?'Test struktur dan daftar tool lulus. Skenario eksekusi belum dijalankan.':state.testRun&&!state.testRun.passed?'Test gagal: '+state.testRun.issues.join(' · '):state.candidateValid?'Kandidat tersimpan. Jalankan Test sebelum aktivasi.':'Perlu diperbaiki: '));if(!state.candidateValid)validation.append(...state.candidateIssues.map((issue,index)=>document.createTextNode(`${index?' · ':''}${ISSUE_LABELS[issue]||issue}`)));}else{validation.dataset.tone='neutral';validation.textContent=isNew?'Skill baru disimpan sebagai kandidat dan belum aktif.':'Buat kandidat agar versi aktif tidak diedit langsung.';}
  const agent=byId(registry.agents,selectedAgentId),installed=agent?.installedSkills.includes(skill?.id);$('#skill-install-toggle').hidden=isNew||!skill?.activeVersion||!agent;$('#skill-install-toggle').textContent=installed?'Lepas dari agent':'Pasang ke agent';$('#skill-install-toggle').dataset.installed=String(!!installed);
  const rollback=$('#skill-rollback-version');rollback.replaceChildren();for(const item of skill?.versions||[]){if(item.version===skill.activeVersion||item.version===skill.candidateVersion||!item.validation?.valid||!skill.activatedVersions.includes(item.version))continue;const option=document.createElement('option');option.value=String(item.version);option.textContent=`Versi ${item.version} · ${item.title}`;rollback.append(option);}$('#skill-rollback').hidden=isNew||rollback.options.length===0;
  $('#skill-version-meta').textContent=isNew?'ID permanen dibuat saat disimpan.':`${versionState(skill,registry).label} · ${CATEGORY_LABELS[version?.category]||version?.category} · risiko ${RISK_LABELS[version?.risk]||version?.risk}`;
  const history=$('#skill-history');history.replaceChildren();
  for(const entry of (registry.audit||[]).filter(e=>e.skillId===skill?.id).slice(-10).reverse()){
   const row=document.createElement('li');const labels={'skill.create':'Skill dibuat','candidate.create':'Kandidat dibuat','candidate.save':'Kandidat disimpan','candidate.test':'Test tersimpan','candidate.activate':'Versi diaktifkan','skill.rollback':'Rollback'};
   row.textContent=`r${entry.revision} · ${labels[entry.action]||entry.action}${entry.version?' · v'+entry.version:''} · ${new Date(entry.at).toLocaleString('id-ID',{timeZone:'Asia/Pontianak'})} WIB`;history.append(row);
  }
  const receipt=versionState(skill,registry).testRun;
  $('#skill-test-result').textContent=receipt?`${receipt.passed?'LULUS':'GAGAL'} · struktur dan daftar tool · ${new Date(receipt.at).toLocaleString('id-ID',{timeZone:'Asia/Pontianak'})} WIB. Skenario eksekusi: belum dijalankan.`:'Belum ada Test untuk isi kandidat terbaru.';
  syncControls();
 }
 function openSkill(id){const skill=byId(registry?.skills,id);if(!skill)return;selectedSkillId=id;fillEditor(skill,'view');$('#skill-editor').showModal();}
 function editorValue(){return {title:$('#skill-title').value.trim(),category:$('#skill-category').value,description:$('#skill-description').value.trim(),risk:$('#skill-risk').value,tools:$('#skill-tools').value.split(',').map(item=>item.trim()).filter(Boolean),instructions:$('#skill-instructions').value.trim(),changelog:$('#skill-changelog').value.trim(),scenarios:dialogScenarios.map(scenario=>({name:scenario.name.trim(),input:scenario.input.trim(),expected:scenario.expected.trim()}))};}
 async function saveEditor(event){
  event?.preventDefault();if(busy||conflicted)return false;
  if(dialogMode==='new'){
   const id=$('#skill-id').value.trim(),ok=await mutate({action:'skill.create',value:{id,...editorValue()}},'Skill baru tersimpan permanen sebagai kandidat v1.');
   if(ok){selectedSkillId=id;fillEditor(byId(registry.skills,id),'view');}return ok;
  }
  const skill=byId(registry.skills,selectedSkillId);if(!skill?.candidateVersion)return false;
  return mutate({action:'candidate.save',skillId:skill.id,version:skill.candidateVersion,value:editorValue()},'Kandidat tersimpan permanen. Jalankan Test sebelum aktivasi.',{keepDialog:true});
 }
 $('#skill-form').addEventListener('input',markDirty);
 $('#skill-editor').addEventListener('close',()=>{if(conflicted)load();});
 $('#skill-test').onclick=async()=>{
  if(busy||conflicted)return;if(dirty&&!(await saveEditor()))return;
  const skill=byId(registry.skills,selectedSkillId);if(!skill?.candidateVersion)return;
  const ok=await mutate({action:'candidate.test',skillId:skill.id,version:skill.candidateVersion},'Hasil Test struktur dan daftar tool tersimpan.',{keepDialog:true});
  if(ok&&!versionState(byId(registry.skills,selectedSkillId),registry).canActivate)setNotice('Test belum lulus. Periksa hasil di editor.','attention');
 };
 $('#skills-refresh').onclick=()=>load();$('#skill-create').onclick=()=>{if(busy||!registry)return;fillEditor(null,'new');$('#skill-editor').showModal();};$('#agent-search').oninput=renderAgents;$('#skill-search').oninput=renderSkills;$('#skill-filter-category').onchange=renderSkills;$('#skill-filter-state').onchange=renderSkills;
 $('#agent-authority').onchange=event=>mutate({action:'agent.authority',agentId:selectedAgentId,level:event.target.value},'Profil kewenangan agent diperbarui. Tidak ada tool yang dijalankan.');
 $('#skill-editor-close').onclick=()=>$('#skill-editor').close();$('#skill-editor-cancel').onclick=()=>$('#skill-editor').close();$('#skill-form').onsubmit=saveEditor;
 $('#skill-add-scenario').onclick=()=>{if(dialogScenarios.length<6){dialogScenarios.push({name:'Skenario tambahan',input:'Masukan uji.',expected:'Hasil yang diharapkan.'});renderScenarios();markDirty();}};
 $('#skill-candidate-create').onclick=async()=>{const skill=byId(registry.skills,selectedSkillId);if(!skill)return;const ok=await mutate({action:'candidate.create',skillId:skill.id},'Kandidat versi baru dibuat. Versi aktif belum berubah.');if(ok)fillEditor(byId(registry.skills,skill.id),'view');};
 $('#skill-activate').onclick=async()=>{if(dirty||busy||conflicted)return;const skill=byId(registry.skills,selectedSkillId);if(!skill?.candidateVersion)return;const version=skill.candidateVersion,ok=await mutate({action:'candidate.activate',skillId:skill.id,version},`Versi ${version} diaktifkan. Konfigurasi agent diperbarui.`);if(ok)fillEditor(byId(registry.skills,skill.id),'view');};
 $('#skill-install-toggle').onclick=async()=>{if(busy||dirty||conflicted)return;const skill=byId(registry.skills,selectedSkillId),agent=byId(registry.agents,selectedAgentId);if(!skill||!agent)return;const installed=agent.installedSkills.includes(skill.id),ok=await mutate({action:installed?'agent.remove':'agent.install',agentId:agent.id,skillId:skill.id},installed?'Skill dilepas dari agent.':'Skill dipasang ke agent. Ini belum menjalankan pekerjaan.');if(ok)fillEditor(byId(registry.skills,skill.id),'view');};
 $('#skill-rollback').onclick=async()=>{if(dirty||busy||conflicted)return;const skill=byId(registry.skills,selectedSkillId),version=Number($('#skill-rollback-version').value);if(!skill||!Number.isSafeInteger(version))return;const ok=await mutate({action:'skill.rollback',skillId:skill.id,version},`Skill dikembalikan ke versi ${version}.`);if(ok)fillEditor(byId(registry.skills,skill.id),'view');};
 const visible=()=>{if(!document.hidden&&registry)load({quiet:true});};document.addEventListener('visibilitychange',visible);addEventListener('pagehide',()=>{disposed=true;document.removeEventListener('visibilitychange',visible);},{once:true});
 const selectAgent=event=>{const id=event.detail?.id;if(!agentNames.has(id))return;selectedAgentId=id;selectedSkillId=registry?.agents.find(a=>a.id===id)?.installedSkills[0]||null;if(registry&&!busy)render();};
 addEventListener('office:agent-select',selectAgent);addEventListener('pagehide',()=>removeEventListener('office:agent-select',selectAgent),{once:true});
 load();return {refresh:load};
}
