import React, {memo, useEffect, useRef, useState} from 'react';
import {Report, labels,statusAt} from './model';
import {TravelingCharacter,MotionRun,MOTION_DURATION} from './OfficeMotion';
import {roles,roleStatus,getRole,hasRoleEvidence,RoleReport} from './roles';
import {rooms,Room,RoomId,getRoom,roomMembers} from './rooms';
import Panzoom from '@panzoom/panzoom';
import {Icon} from './Icons';
import {Avatar} from './Avatar';
export {Avatar};

type Props={report:Report|null;roleReport:RoleReport|null;motion:boolean;selected:string;onSelect:(id:string)=>void;onPreviewRoom:()=>void;roomId:RoomId;focusRequest:{id:string;nonce:number}|null};
type Point=[number,number,number?];
const project=(x:number,y:number,z=0)=>[1100+(x-y)*.78,210+(x+y)*.4-z];
const points=(p:Point[])=>p.map(([x,y,z])=>project(x,y,z).join(',')).join(' ');
function Plane({p,fill,stroke,opacity=1}:{p:Point[];fill:string;stroke?:string;opacity?:number}){return <polygon points={points(p)} fill={fill} stroke={stroke} strokeWidth="1" opacity={opacity} strokeLinejoin="round"/>;}
function Box({x,y,z=0,w,d,h,top='#697d9e',left='#374962',right='#28384e'}:{x:number;y:number;z?:number;w:number;d:number;h:number;top?:string;left?:string;right?:string}){return <g><Plane p={[[x,y+d,z],[x+w,y+d,z],[x+w,y+d,z+h],[x,y+d,z+h]]} fill={left}/><Plane p={[[x+w,y,z],[x+w,y+d,z],[x+w,y+d,z+h],[x+w,y,z+h]]} fill={right}/><Plane p={[[x,y,z+h],[x+w,y,z+h],[x+w,y+d,z+h],[x,y+d,z+h]]} fill={top} stroke="#ffffff12"/></g>;}
function Plant({x,y,size=1}:{x:number;y:number;size?:number}){const [px,py]=project(x,y);return <g transform={`translate(${px} ${py}) scale(${size})`}><ellipse cx="5" cy="3" rx="28" ry="12" fill="#060d1c" opacity=".3"/><path d="M-18-26 18-26 13 1 Q0 12-13 1Z" fill="url(#pot)"/><ellipse cy="-26" rx="18" ry="9" fill="#d2d9e5"/><ellipse cy="-27" rx="14" ry="6" fill="#263a42"/><path d="M0-26 0-80 M0-41-20-61 M0-51 21-76" stroke="#2c9779" strokeWidth="4"/><ellipse cx="-10" cy="-65" rx="10" ry="23" fill="#21aa88" transform="rotate(-38 -10 -65)"/><ellipse cx="14" cy="-73" rx="11" ry="24" fill="#4be5ab" transform="rotate(35 14 -73)"/><ellipse cx="-2" cy="-88" rx="10" ry="22" fill="#49cf9b" transform="rotate(-7 -2 -88)"/><path d="M0-35Q-39-38-27-62Q-6-59 0-35" fill="#27c58d"/></g>;}
function Monitor({x,y,color='#67e8f9',inactive=false}:{x:number;y:number;color?:string;inactive?:boolean}){return <g><Box x={x+30} y={y+18} z={64} w={26} d={20} h={3}/><Box x={x+41} y={y+14} z={67} w={5} d={5} h={13}/><Plane p={[[x,y,80],[x+85,y,80],[x+85,y,138],[x,y,138]]} fill="#172439" stroke="#91a4c2"/><Plane p={[[x+4,y,84],[x+81,y,84],[x+81,y,134],[x+4,y,134]]} fill={inactive?'#283043':'url(#screen)'}/>{!inactive&&<g opacity=".9"><Plane p={[[x+10,y,126],[x+48,y,126],[x+48,y,122],[x+10,y,122]]} fill={color}/>{[0,1,2,3].map(i=><Plane key={i} p={[[x+10,y,113-i*7],[x+58-i*6,y,113-i*7],[x+58-i*6,y,111-i*7],[x+10,y,111-i*7]]} fill={i===2?'#a99aee':'#4394af'}/>)}<Plane p={[[x+65,y,90],[x+73,y,90],[x+73,y,114],[x+65,y,114]]} fill={color} opacity={.5}/></g>}</g>;}
function Desk({x,y,color,inactive=false}:{x:number;y:number;color:string;inactive?:boolean}){return <g><Plane p={[[x-10,y+4],[x+150,y+4],[x+150,y+95],[x-10,y+95]]} fill="#091122" opacity={.25}/>{[[6,7],[126,7],[6,68],[126,68]].map(([a,b],i)=><Box key={i} x={x+a} y={y+b} w={7} d={7} h={60} top="#415772" left="#28384c" right="#192a3e"/>)}<Box x={x} y={y} z={60} w={140} d={82} h={6} top="url(#wood)" left="#a17953" right="#765541"/><Plane p={[[x+2,y+82,63],[x+138,y+82,63],[x+138,y+82,65],[x+2,y+82,65]]} fill={color} opacity={inactive?.15:.75}/><Monitor x={x+18} y={y+15} color={color} inactive={inactive}/><Box x={x+24} y={y+46} z={66} w={60} d={20} h={2} top="#394b64" left="#212e44" right="#1b293e"/>{[0,1,2].map(i=><Plane key={i} p={[[x+28,y+50+i*5,69],[x+79,y+50+i*5,69],[x+79,y+52+i*5,69],[x+28,y+52+i*5,69]]} fill="#6b7f96"/>)}<Box x={x+98} y={y+48} z={66} w={12} d={17} h={3} top="#d4deeb"/>{!inactive&&<Box x={x+115} y={y+14} z={66} w={13} d={13} h={14} top="#eef3f2" left="#cbd6df" right="#9aaabf"/>}</g>;}
function Chair({x,y,color}:{x:number;y:number;color:string}){return <g><Box x={x+13} y={y+14} w={6} d={6} h={26}/><Box x={x-2} y={y-2} z={26} w={38} d={38} h={9} top={color} left="#314466" right="#21344e"/><Box x={x-2} y={y+29} z={34} w={38} d={7} h={40} top={color} left={color} right="#334b75"/></g>;}
// Rooms and seats exist before assignment. Only connected roles occupy the office.
const seatPositions=(count:number)=>count===4?[[55,95],[310,95],[55,325],[310,325]]:count===3?[[55,95],[310,95],[55,325]]:count===2?[[55,280],[310,280]]:[[55,265]];
const stations=rooms.flatMap(room=>room.plannedRoles.map((id,i)=>({role:getRole(id),index:roles.findIndex(r=>r.id===id),room:room.id,x:room.x+seatPositions(room.plannedRoles.length)[i][0],y:room.y+seatPositions(room.plannedRoles.length)[i][1]})));
function Board({x,y,w=210,title,color}:{x:number;y:number;w?:number;title:string;color:string}){return <g transform={`translate(${project(x,y,20).join(' ')}) matrix(.78 .4 0 1 0 0)`}><rect width={w} height="95" y="-95" rx="5" fill="#13273b" stroke="#829db5" strokeWidth="2"/><text x="14" y="-73" fontSize="12" fill={color} letterSpacing="1.3">{title}</text>{[0,1,2].map(i=><g key={i}><rect x={14+i*(w-28)/3} y="-59" width={(w-43)/3} height="38" rx="3" fill={color} opacity={.14+i*.06}/><path d={`M${22+i*(w-28)/3} -48h${(w-70)/3}m-${(w-70)/3} 9h${(w-85)/3}`} stroke={color} opacity=".7"/></g>)}</g>;}
function Rack({x,y,color='#69dfed'}:{x:number;y:number;color?:string}){return <g><Box x={x} y={y} w={67} d={44} h={117} top="#49627e" left="#263c55" right="#17283e"/>{[0,1,2,3,4].map(i=><g key={i}><Plane p={[[x+6,y+45,12+i*20],[x+60,y+45,12+i*20],[x+60,y+45,27+i*20],[x+6,y+45,27+i*20]]} fill="#102037" stroke="#4c6682"/><Plane p={[[x+12,y+46,18+i*20],[x+17,y+46,18+i*20],[x+17,y+46,22+i*20],[x+12,y+46,22+i*20]]} fill={color}/></g>)}</g>;}
function RoomProps({room:r}:{room:Room}){const x=r.x,y=r.y;return <g aria-hidden="true">
 {r.id==='command'&&<><Board x={x+195} y={y+8} w={285} title="RENCANA TIM" color={r.color}/><Box x={x+330} y={y+255} w={116} d={125} h={49} top="#a6b0cf" left="#64708d" right="#4d5f79"/><Chair x={x+360} y={y+385} color="#a99ad4"/><Chair x={x+360} y={y+205} color="#a99ad4"/><Box x={x+357} y={y+275} z={49} w={45} d={30} h={2} top="#e2e8f1"/></>}
 {r.id==='infrastructure'&&<><Rack x={x+326} y={y+326}/><Rack x={x+408} y={y+326}/><Board x={x+235} y={y+8} w={240} title="INFRASTRUKTUR" color={r.color}/></>}
 {r.id==='qa_lab'&&<><Board x={x+170} y={y+8} w={300} title="ALUR UJI / STAGING" color={r.color}/><Box x={x+50} y={y+80} w={95} d={60} h={48} top="#687c97"/><Monitor x={x+53} y={y+85} inactive/><Box x={x+190} y={y+105} w={64} d={45} h={35} top="#d1a36a"/><Plane p={[[x+196,y+110,36],[x+247,y+110,36],[x+247,y+144,36],[x+196,y+144,36]]} fill="#343c63"/>{[0,1,2].map(i=><Box key={i} x={x+205+i*13} y={y+120} z={37} w={8} d={8} h={8} top={['#efba7d','#82d7bc','#b2a0ed'][i]}/>)}</>}
 {r.id==='security'&&<><Box x={x+45} y={y+48} w={95} d={65} h={130} top="#697f9a" left="#344a64" right="#253b55"/><g transform={`translate(${project(x+91,y+114,75).join(' ')}) matrix(.78 .4 0 1 0 0)`}><rect x="-35" y="-47" width="70" height="94" rx="5" fill="#23384e" stroke="#91a9c2"/><circle r="17" fill="#526b86" stroke="#aac8dc" strokeWidth="3"/><path d="M-12 0h24M0-12v24" stroke="#c5dfef" strokeWidth="3"/></g><Rack x={x+175} y={y+60} color={r.color}/><Board x={x+275} y={y+8} w={205} title="PEMULIHAN DATA" color={r.color}/></>}
 {r.id==='content'&&<><Box x={x+30} y={y+35} w={170} d={34} h={126} top="#9d819e" left="#4e4663" right="#34384f"/>{[0,1,2].map(row=><g key={row}>{[0,1,2,3,4,5,6,7].map(col=><Plane key={col} p={[[x+38+col*19,y+70,12+row*38],[x+51+col*19,y+70,12+row*38],[x+51+col*19,y+70,40+row*38],[x+38+col*19,y+70,40+row*38]]} fill={['#c8a3dd','#78c4c5','#e4bd87','#8b9bc9'][col%4]}/>)}</g>)}<Board x={x+245} y={y+8} w={230} title="ENGLISH / IDEAS" color={r.color}/><Box x={x+330} y={y+285} w={100} d={75} h={61} top="#be9bc7"/><g transform={`translate(${project(x+382,y+320,62).join(' ')})`}><ellipse rx="15" ry="6" fill="#293f59"/><path d="M0 0v-57M-14-58q0 31 28 0" stroke="#adbed3" strokeWidth="4" fill="none"/><rect x="-8" y="-79" width="16" height="30" rx="8" fill="#27364e" stroke="#cebadf"/></g></>}
 {r.id==='customers'&&<><Board x={x+200} y={y+8} w={275} title="PANDUAN / PILOT GURU" color={r.color}/></>}
 <Plant x={x+488} y={y+465} size={.8}/>
 </g>;}
const Building=memo(function Building(){return <g aria-hidden="true"><defs>
 <linearGradient id="floor" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#566d88"/><stop offset="1" stopColor="#293b56"/></linearGradient>
 <linearGradient id="wall" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#5f7795"/><stop offset="1" stopColor="#283e58"/></linearGradient>
 <linearGradient id="glass"><stop stopColor="#a8dfef" stopOpacity=".24"/><stop offset="1" stopColor="#65accb" stopOpacity=".08"/></linearGradient>
 <linearGradient id="wood"><stop stopColor="#e6c799"/><stop offset="1" stopColor="#b88b63"/></linearGradient>
 <linearGradient id="screen"><stop stopColor="#194761"/><stop offset="1" stopColor="#102137"/></linearGradient>
 <linearGradient id="pot"><stop stopColor="#e3e9f3"/><stop offset="1" stopColor="#7e96b1"/></linearGradient>
 <filter id="roomShadow" x="-20%" y="-20%" width="140%" height="155%"><feDropShadow dx="0" dy="25" stdDeviation="20" floodColor="#020611" floodOpacity=".45"/></filter>
 </defs><g filter="url(#roomShadow)"><Box x={0} y={0} z={-30} w={1850} d={1360} h={30} top="url(#floor)" left="#243b57" right="#162b44"/></g>
 <Plane p={[[0,1360,-18],[1850,1360,-18],[1850,1360,-14],[0,1360,-14]]} fill="#5bcee3"/><Plane p={[[1850,0,-18],[1850,1360,-18],[1850,1360,-14],[1850,0,-14]]} fill="#a99bfa"/>
 {Array.from({length:38},(_,i)=><Plane key={'x'+i} p={[[i*50,0,1],[i*50+.8,0,1],[i*50+.8,1360,1],[i*50,1360,1]]} fill="#c6d4e4" opacity={.09}/>)}
 {Array.from({length:28},(_,i)=><Plane key={'y'+i} p={[[0,i*50,1],[1850,i*50,1],[1850,i*50+.8,1],[0,i*50+.8,1]]} fill="#c6d4e4" opacity={.09}/>)}
 <Box x={0} y={0} w={1850} d={8} h={154} top="#9ab6cc" left="url(#wall)"/>
 <Box x={0} y={0} w={8} d={1360} h={154} top="#9ab6cc" right="url(#wall)"/>
 <Plane p={[[10,10,144],[1840,10,144],[1840,10,147],[10,10,147]]} fill="#b2a6fa"/><Plane p={[[10,10,144],[10,1350,144],[10,1350,147],[10,10,147]]} fill="#8be7f0"/>
 <g transform={`translate(${project(120,10,84).join(' ')}) matrix(.78 .4 0 1 0 0)`}><text fill="#e3f6ff" fontSize="48" fontWeight="800" letterSpacing="5">KIP</text><text x="125" fill="#c2dbef" fontSize="19" letterSpacing="3">TEAM HEADQUARTERS</text></g>
 {[650,920,1190,1460].map(x=><g key={x}><Plane p={[[x,10,30],[x+220,10,30],[x+220,10,124],[x,10,124]]} fill="#162e4a" stroke="#97b5cc"/><Plane p={[[x+5,11,35],[x+215,11,35],[x+215,11,119],[x+5,11,119]]} fill="url(#glass)"/><Plane p={[[x+108,12,32],[x+111,12,32],[x+111,12,122],[x+108,12,122]]} fill="#87a3bd"/></g>)}
 <Plant x={42} y={690} size={1.1}/><Plant x={1810} y={690} size={1.1}/><Plant x={620} y={1310}/><Plant x={1205} y={1310}/>
 <g transform={`translate(${project(480,690,3).join(' ')}) matrix(.78 .4 -.78 .4 0 0)`}><text fill="#d0dfec" fontSize="19" letterSpacing="5">KIP / COLLABORATION WALK</text></g>
 <g transform={`translate(${project(950,1310,3).join(' ')}) matrix(.78 .4 -.78 .4 0 0)`}><rect x="-150" y="-25" width="300" height="48" rx="7" fill="#1d304b"/><text textAnchor="middle" fill="#b7dcea" fontSize="21" fontWeight="700" letterSpacing="3">KIP AGENT OFFICE</text></g>
 </g>;});
function RoomShell({room:r,active}:{room:Room;active:boolean}){const x=r.x,y=r.y;return <g aria-hidden="true">
 <Plane p={[[x,y,3],[x+520,y,3],[x+520,y+500,3],[x,y+500,3]]} fill={active?'#344660':'#2a3a50'} stroke={r.color}/>
 <Plane p={[[x+8,y+8,4],[x+512,y+8,4],[x+512,y+492,4],[x+8,y+492,4]]} fill={r.color} opacity={active?.1:.035}/>
 <Box x={x} y={y} w={520} d={7} h={120} top={active?r.color:'#8b9fb6'} left="url(#wall)"/>
 <Box x={x} y={y} w={7} d={500} h={24} top="#718ba7" right="#314963"/>
 <Plane p={[[x+7,y+10,24],[x+7,y+490,24],[x+7,y+490,120],[x+7,y+10,120]]} fill="url(#glass)" stroke="#a1c8dc"/>
 {[20,250,490].map(d=><Box key={d} x={x} y={y+d} z={24} w={5} d={5} h={96} top="#c2dcea" right="#6b92ab"/>)}
 <g transform={`translate(${project(x+24,y+8,123).join(' ')}) matrix(.78 .4 0 1 0 0)`}><rect x="-8" y="-31" width="490" height="41" rx="5" fill="#101f34" stroke={r.color}/><text fill={r.color} fontSize="18" fontWeight="650" letterSpacing="1.5">{String(rooms.indexOf(r)+1).padStart(2,'0')} / {r.short}</text></g>
 <RoomProps room={r}/>
 </g>;}
export function Office({report,roleReport,motion,selected,onSelect,onPreviewRoom,roomId,focusRequest}:Props){
 const [run,setRun]=useState<MotionRun|null>(null),[zoom,setZoom]=useState(1);
 const lastCycle=useRef<number|null>(null),runSequence=useRef(0);
 const mapRef=useRef<HTMLDivElement>(null), camera=useRef<ReturnType<typeof Panzoom>|null>(null);
 const selectedRoom=getRoom(roomId),cycle=report?.observer.lastCycleAt;
 const memberCount=roles.filter(r=>hasRoleEvidence(r,roleReport,Date.now())).length;
 useEffect(()=>{
  if(!cycle||cycle===lastCycle.current)return;lastCycle.current=cycle;
  if(!motion||document.hidden||report?.source!=='observer')return;
  const ids=roles.filter(r=>['health','release'].includes(r.id)&&statusAt(report.checks.find(c=>c.id===r.id),Date.now())!=='UNKNOWN').map(r=>r.id);
  if(ids.length)setRun(current=>current??{id:++runSequence.current,reason:'report',roles:ids});
 },[cycle,motion,report?.source]);
 useEffect(()=>{if(!run)return;const timer=setTimeout(()=>setRun(null),MOTION_DURATION);return()=>clearTimeout(timer);},[run?.id]);
 useEffect(()=>{if(!motion)setRun(null);},[motion]);
 useEffect(()=>{const stop=()=>{if(document.hidden)setRun(null);};document.addEventListener('visibilitychange',stop);return()=>document.removeEventListener('visibilitychange',stop);},[]);
 const preview=()=>{if(!motion||run)return;onPreviewRoom();setRun({id:++runSequence.current,reason:'preview',roles:roles.filter(r=>['health','release'].includes(r.id)).map(r=>r.id)});};
 useEffect(()=>{const el=mapRef.current;if(!el)return;
  const api=Panzoom(el,{minScale:1,maxScale:5,contain:'outside',panOnlyWhenZoomed:true,disablePan:true,touchAction:'pan-y',cursor:'default',handleStartEvent:e=>{if(api.getScale()>1){e.preventDefault();e.stopPropagation();}}});camera.current=api;
  const changed=()=>{const scale=api.getScale();setZoom(scale);api.setOptions({disablePan:scale<=1.001,touchAction:scale>1.001?'none':'pan-y',cursor:scale>1.001?'grab':'default'});};
  const resized=()=>api.reset({animate:false});el.addEventListener('panzoomchange',changed);window.addEventListener('resize',resized);
  return()=>{api.destroy();el.removeEventListener('panzoomchange',changed);window.removeEventListener('resize',resized);camera.current=null;};
 },[]);
 useEffect(()=>{if(!focusRequest||!mapRef.current||!camera.current)return;const room=rooms.find(r=>r.id===focusRequest.id);if(!room)return;
  const api=camera.current,el=mapRef.current;api.zoom(el.clientWidth<600?4:2.4,{animate:false});
  const frame=requestAnimationFrame(()=>{const [x,y]=project(room.x+260,room.y+270,35);api.pan(el.clientWidth*(.5-x/2600),el.clientHeight*(.5-y/1560),{force:true,animate:false});});return()=>cancelAnimationFrame(frame);
 },[focusRequest]);
 const pan=(dx:number,dy:number)=>camera.current?.pan(dx/zoom,dy/zoom,{relative:true});
 const reset=()=>camera.current?.reset({animate:false});
 return <div className={'office-scene office-campus '+(motion?'motion-on':'motion-off')}>
  <div className="office-map-controls"><span><Icon name="cube" size={17}/><b>{rooms.length} ruangan · {roles.length} meja</b><span>{memberCount} dengan bukti · {roles.length-memberCount} belum terverifikasi</span></span><div className="zoom-controls" aria-label="Ukuran denah kantor"><button aria-label="Perkecil kantor" onClick={()=>camera.current?.zoom(Math.max(1,zoom-.5))} disabled={zoom<=1.001}>−</button><button className="fit-office" onClick={reset} aria-label="Tampilkan seluruh kantor">{zoom<=1.001?'Seluruh kantor':`${Math.round(zoom*100)}% · Reset`}</button><button aria-label="Perbesar kantor" onClick={()=>camera.current?.zoom(Math.min(5,zoom+.5))} disabled={zoom>=4.999}>+</button></div></div>
  <div className="office-motion-strip"><button className="preview-motion-button" onClick={preview} disabled={!motion||!!run}><Icon name="play" size={16}/>{run?'Gerak berlangsung':'Pratinjau gerak'}</button><div aria-live="polite"><b>{!motion?'Animasi dijeda':run?.reason==='preview'?'Pratinjau berjalan · 9 detik':run?.reason==='report'?'Ilustrasi laporan terbaru':'Karakter bergerak saat laporan baru diterima'}</b><span>{motion?'Animasi visual · tidak menjalankan tugas baru':'Gunakan tombol putar di atas untuk mengaktifkan animasi.'}</span></div></div>
  <div className={'office-viewport'+(zoom>1.001?' is-zoomed':'')} id="office-viewport" tabIndex={0} aria-label="Denah enam ruangan. Pilih ruangan untuk fokus. Saat diperbesar, geser atau gunakan tombol panah. Home mengembalikan seluruh kantor." onKeyDown={e=>{if(e.target!==e.currentTarget)return;const directions:Record<string,[number,number]>={ArrowLeft:[80,0],ArrowRight:[-80,0],ArrowUp:[0,80],ArrowDown:[0,-80]};if(directions[e.key]&&zoom>1.001){e.preventDefault();pan(...directions[e.key]);}if(e.key==='Home'){e.preventDefault();reset();}}}>
   <div className="office-map" ref={mapRef}>
    <svg className="office-world" viewBox="0 0 2600 1560" role="group" aria-label={`Kantor KIP dengan ${rooms.length} ruangan dan ${roles.length} meja. Status karakter berasal dari bukti peran; animasi hanya ilustrasi.`}>
     <Building/>
     {[...rooms].sort((a,b)=>(a.x+a.y)-(b.x+b.y)).map(room=><g key={room.id} data-room={room.id}>
      <RoomShell room={room} active={selectedRoom.id===room.id}/>
      {stations.filter(s=>s.room===room.id).sort((a,b)=>(a.x+a.y)-(b.x+b.y)).map(({role:a,index,x:dx,y:dy})=>{const [x,y]=project(dx+105,dy+140);const status=roleStatus(a,roleReport,Date.now()),present=hasRoleEvidence(a,roleReport,Date.now()),chosen=a.id===selected;return <g key={a.id} className="workstation" data-role={present?a.id:undefined} data-desk={index+1} data-occupancy={present?'occupied':'vacant'}>
       <g aria-hidden="true"><Desk x={dx} y={dy} color={present?a.accent:'#73869e'} inactive={!present}/><Chair x={dx+40} y={dy+106} color={present?a.accent:'#73869e'}/></g>
       {present?<g transform={`translate(${x} ${y})`} className={'scene-agent panzoom-exclude '+(chosen?'chosen ':'')} role="button" tabIndex={0} aria-label={`Meja ${index+1}, ${a.title}: ${labels[status]}. Lihat profil`} aria-pressed={chosen} onClick={()=>onSelect(a.id)} onKeyDown={e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();onSelect(a.id);}}}>
        <rect x="-84" y="-174" width="168" height="198" fill="transparent"/><ellipse className="selection-halo" cy="5" rx="49" ry="25" fill={a.accent} opacity={chosen?.24:.07}/><ellipse className="selection-ring" cy="5" rx="46" ry="23" fill="none" stroke={a.accent} strokeWidth={chosen?3:1.3} opacity={chosen?1:.5}/><TravelingCharacter id={a.id} run={motion?run:null}/>
        <g transform="translate(0 -148)"><rect x="-84" y="-26" width="168" height="49" rx="10" fill="#101d32" stroke={chosen?a.accent:'#7c8aa2'} strokeWidth={chosen?2:1}/><text y="-7" textAnchor="middle" fill="#edf5ff" fontSize="16" fontWeight="600">{a.short}</text><text y="12" textAnchor="middle" fill={status==='HEALTHY'?'#8ce5be':'#c7d2e4'} fontSize="13">{labels[status]}</text></g>
        <g transform="translate(42 18)"><rect x="-13" y="-12" width="26" height="22" rx="6" fill="#102039" stroke={a.accent}/><text textAnchor="middle" y="4" fill="#d5e5f5" fontSize="12">{String(index+1).padStart(2,'0')}</text></g>
       </g>:<g aria-hidden="true" transform={`translate(${project(dx+70,dy+101,3).join(' ')}) matrix(.78 .4 -.78 .4 0 0)`}><rect x="-48" y="-12" width="96" height="24" rx="4" fill="#16293f" stroke="#8397ae" strokeDasharray="4 3"/><text y="4" textAnchor="middle" fontSize="10" letterSpacing="1" fill="#c3d1e0">{String(index+1).padStart(2,'0')} / TERSEDIA</text></g>}
      </g>;})}
      <g aria-hidden="true"><Box x={room.x} y={room.y+500} w={200} d={6} h={18} top={room.color} left="#344963"/><Box x={room.x+340} y={room.y+500} w={180} d={6} h={18} top={room.color} left="#344963"/><Plane p={[[room.x+200,room.y+495,4],[room.x+340,room.y+495,4],[room.x+340,room.y+515,4],[room.x+200,room.y+515,4]]} fill={room.color} opacity={.35}/></g>
     </g>)}
     {rooms.filter(room=>roomMembers(room,roleReport).length===0).map(room=><g key={room.id} className="room-empty-label" aria-hidden="true" transform={`translate(${project(room.x+285,room.y+245,15).join(' ')})`}><rect x="-106" y="-43" width="212" height="58" rx="11" fill="#132239" stroke={room.color} strokeDasharray="5 4"/><text textAnchor="middle" y="-19" fill="#e1ebf8" fontSize="17" fontWeight="600">Belum ada bukti</text><text textAnchor="middle" y="1" fill="#afc0d6" fontSize="13">{room.plannedRoles.length} tempat kerja siap</text></g>)}
    </svg>
   </div>
  </div>
  <div className="office-map-caption"><span className="room-current"><span className="map-key" style={{background:selectedRoom.color}}/><b>{selectedRoom.title}</b><span>· {selectedRoom.plannedRoles.length} meja</span></span><div className="pan-controls" aria-label="Geser denah"><button aria-label="Lihat sisi kiri kantor" disabled={zoom<=1.001} onClick={()=>pan(100,0)}>←</button><button aria-label="Lihat sisi atas kantor" disabled={zoom<=1.001} onClick={()=>pan(0,100)}>↑</button><button aria-label="Lihat sisi bawah kantor" disabled={zoom<=1.001} onClick={()=>pan(0,-100)}>↓</button><button aria-label="Lihat sisi kanan kantor" disabled={zoom<=1.001} onClick={()=>pan(-100,0)}>→</button></div><small>Pilih ruangan untuk mendekat · geser saat diperbesar</small></div>
 </div>;
}
