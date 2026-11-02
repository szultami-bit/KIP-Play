import {isObserver,robotRoster} from './robot-roster.js';
import {bindRoleEvidence} from './role-evidence.js';
import {bindWorkboard} from './workboard.js';
import {bindViewControls} from './view-controls.js';
import {bindLiveAgents} from './live-agents.js';
import {bindSessionControls} from './session.js';
import './style.css';
import './agents.css';
import './workboard.css';
import {createOffice} from './scene.js';
import {rooms,skyRooms,entertainRooms,outdoorPlaces,icon} from './data.js';
const $=s=>document.querySelector(s);const $$=s=>[...document.querySelectorAll(s)];
$$('[data-icon]').forEach(el=>el.innerHTML=icon(el.dataset.icon));
let liveAgents=null,roleAgents=null,office=null,floor='loft',selected=null,failed=false;
function announce(text){$('#announcement').textContent=text}
const floorData={
 campus:{rooms:outdoorPlaces,number:'COASTAL CAMPUS',caption:'KIP HEADQUARTERS / COASTAL CAMPUS',title:'Between peaks & sea',description:'Kantor, taman, dan garis pantai.',panel:'Bekerja dekat alam,<br/> menikmati ruang.',intro:'Jalan masuk, taman pinus dan mawar, pantai pasir putih, serta gunung di belakang kantor.',first:'4',firstLabel:'zona luar',second:'360°',secondLabel:'sudut pandang',detail:'Kawasan pesisir KIP',detailText:'Pilih area untuk menjelajah. Gunakan tab lantai untuk kembali melihat interior kantor.'},
 loft:{rooms,number:'01 / 03',caption:'LANTAI 01 / WORKSPACE',title:'The Loft',description:'Enam divisi. Ruang untuk bertumbuh.',panel:'Ruang kerja,<br/> dipikirkan ulang.',intro:'Material hangat. Ruang terbuka. Setiap peran punya tempatnya.',first:'6',firstLabel:'divisi',second:String(robotRoster.length),secondLabel:'meja khusus',detail:'Dirancang untuk tim KIP',detailText:'Pilih ruangan untuk melihat tata letak dan rencana penghuninya.'},
 sky:{rooms:skyRooms,number:'02 / 03',caption:'LANTAI 02 / SOCIAL SPACE',title:'The Sky Club',description:'Bertemu. Berbagi. Melihat lebih jauh.',panel:'Good ideas<br/> need good company.',intro:'Tempat tim berkumpul, merencanakan, dan mengambil jeda.',first:'4',firstLabel:'area bersama',second:'22',secondLabel:'tempat duduk',detail:'Ruang untuk bertemu',detailText:'Ruang strategi, lounge, coffee bar, dan teras hijau untuk bertukar ide.'},
 entertain:{rooms:entertainRooms,number:'03 / 03',caption:'LANTAI 03 / ENTERTAIN & WELLNESS',title:'The Play Club',description:'Recharge. Play. Repeat.',panel:'Ruang untuk rehat,<br/> energi untuk berkarya.',intro:'Karaoke, gym, kolam renang, dan mini game dalam satu lantai rekreasi.',first:'4',firstLabel:'zona hiburan',second:'2',secondLabel:'sisi kaca tangga',detail:'Rehat di atas kota',detailText:'Pilih zona untuk melihat fasilitasnya. Semua tetap berupa pratinjau visual.'},
 building:{rooms,number:'01 + 02 + 03',caption:'KIP HEADQUARTERS / TIGA LANTAI',title:'One headquarters',description:'Tiga lantai, satu tangga yang terhubung.',panel:'Satu gedung,<br/> tiga suasana.',intro:'Loft, Sky Club, dan Play Club disatukan tangga dua arah dengan pagar kaca.',first:'14',firstLabel:'ruang & zona',second:String(robotRoster.length),secondLabel:'meja kerja',detail:'Sambungan yang utuh',detailText:'Bordes menghubungkan tangga ke koridor tiap lantai. Pilih Lihat tangga kaca untuk melihatnya dari dekat.'}
};
function selectRoom(id){const r=floorData[floor].rooms.find(r=>r.id===id);if(!r)return;selected=id;$$('.room-button').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.room===id)));$('#detail-title').textContent=r.title;$('#detail-roles').replaceChildren(...r.roles.map(name=>{const span=document.createElement('span');span.textContent=name;return span}));if(floor==='campus')office?.focusOutdoor(id,r.x,r.z);else if(floor==='loft')office?.select(id);else office?.focusPoint(r.x,r.z);announce('Ruangan dipilih: '+r.title)}
function populateRooms(){const list=floorData[floor].rooms;$('#rooms').innerHTML=list.map((r,i)=>`<button class="room-button" data-room="${r.id}" aria-pressed="false"><span class="room-icon">${icon(r.icon)}</span><span class="room-name"><b>${r.title}</b></span><span class="room-number">${r.seats&&floor!=='sky'?r.seats+' meja':String(i+1).padStart(2,'0')}</span></button>`).join('');$$('.room-button').forEach(b=>b.addEventListener('click',()=>{if(floor==='building')switchFloor('loft');selectRoom(b.dataset.room)}))}
function overview(){const config=floorData[floor];selected=null;$$('.room-button').forEach(b=>b.setAttribute('aria-pressed','false'));$('#detail-title').textContent=config.detail;$('#detail-roles').replaceChildren();$('#stairs-view').setAttribute('aria-pressed','false');$('#campus-view').setAttribute('aria-pressed',String(floor==='campus'));office?.reset();announce('Tampilan seluruh '+config.title)}
function switchFloor(value){if(!floorData[value])return;floor=value;document.body.classList.toggle('campus',value==='campus');const config=floorData[value];$$('[data-floor]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.floor===value)));office?.setFloor(value);$('#floor-caption').textContent=config.caption;$('#scene-title').innerHTML=config.title+'<span>.</span>';$('#floor-number').textContent=config.number;$('#room-list-label').textContent=value==='building'?'DIVISI DI LOFT':value==='campus'?'JELAJAHI KAWASAN':'RUANGAN DI LANTAI INI';populateRooms();overview();announce(config.caption)}
function fail(){if(failed)return;failed=true;office?.dispose();office=null;$('#office').innerHTML='<div id="loading"><div class="error-3d"><b>Tampilan 3D belum tersedia</b><p>Browser memerlukan WebGL 2. Coba aktifkan akselerasi grafis atau buka di browser lain. Daftar ruangan tetap dapat dibaca.</p><button id="retry-3d">Coba muat ulang</button></div></div>';$('#retry-3d').onclick=()=>location.reload();$$('.camera-tools button').forEach(b=>b.disabled=true);$('#stairs-view').disabled=true;$('#campus-view').disabled=true;$('#walk').disabled=true;announce('Tampilan 3D belum tersedia; daftar ruangan tetap tersedia.')}
populateRooms();
try{office=createOffice($('#office'),{onPick:selectRoom,onAgentPick:id=>isObserver(id)?liveAgents?.open(id):roleAgents?.open(id),onAgentMove:(id,phase)=>{if(isObserver(id))liveAgents?.move(id,phase);},onError:fail});$('#loading')?.remove();if(office.software){const badge=document.createElement('span');badge.className='compatibility';badge.textContent='Mode kompatibel';$('.scene-card').appendChild(badge)}}catch(e){console.error('3D preview unavailable:',e.message);fail()}
$$('[data-floor]').forEach(b=>b.addEventListener('click',()=>switchFloor(b.dataset.floor)));
$('#overview').onclick=overview;
$('#campus-view').onclick=()=>switchFloor('campus');
$('#stairs-view').onclick=()=>{switchFloor('building');office?.focusStairs();$('#stairs-view').setAttribute('aria-pressed','true');$('#detail-title').textContent='Tangga menyatu dengan gedung';announce('Melihat tangga kaca yang menghubungkan tiga lantai')};
for(const [id,night]of[['day',false],['night',true]])$( '#'+id).onclick=()=>{document.body.classList.toggle('night',night);$('#day').setAttribute('aria-pressed',String(!night));$('#night').setAttribute('aria-pressed',String(night));office?.setNight(night);announce('Suasana '+(night?'malam':'siang'))};
$('#rotate-left').onclick=()=>office?.rotate(-.26);$('#rotate-right').onclick=()=>office?.rotate(.26);$('#zoom-in').onclick=()=>office?.zoom(.85);$('#zoom-out').onclick=()=>office?.zoom(1.15);$('#reset').onclick=overview;
const views=bindViewControls({announce});
$('#credits-link').onclick=e=>{e.preventDefault();$('#credits').showModal()};

addEventListener('pagehide',()=>office?.dispose(),{once:true});

switchFloor('loft');
addEventListener('pageshow',event=>{if(event.persisted)location.reload()});

const board=bindWorkboard({openReport:id=>liveAgents?.open(id),refreshReport:()=>liveAgents?.refresh(),announce});
function focusAgent(id){views.show('office');if(!office)return;switchFloor(office.agentFloor(id));office.focusAgent(id);$('#office').focus({preventScroll:true});$('.scene-card').scrollIntoView({behavior:'instant',block:'center'});}
liveAgents=bindLiveAgents({onViews:list=>board.receive(list),getOffice:()=>office,focusAgent,announce});
bindSessionControls();
roleAgents=bindRoleEvidence({getOffice:()=>office,focusAgent});

await import('./agent-skills-entry.js');
