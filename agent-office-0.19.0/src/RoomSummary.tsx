import React,{CSSProperties} from 'react';
import {Room,roomMembers,roomCandidates} from './rooms';
import {labels} from './model';
import {roleStatus,RoleReport} from './roles';
import {Avatar} from './Avatar';
import {Icon} from './Icons';

export function RoomSummary({room,report,now,onSelect,onCandidates}:{room:Room;report:RoleReport|null;now:number;onSelect:(id:string)=>void;onCandidates:()=>void}){
 const members=roomMembers(room,report,now),candidates=roomCandidates(room,report,now);
 return <section id="room-detail" className="room-detail" style={{'--room-color':room.color} as CSSProperties} aria-label="Detail ruangan">
  <div className="room-detail-intro"><span className="room-detail-icon"><Icon name={room.icon} size={26}/></span><div><span className="eyebrow">RUANGAN PILIHAN</span><h2>{room.title}</h2><p>{room.purpose}</p></div></div>
  <div className="room-detail-body"><div className="room-detail-meta"><span className={'occupancy-pill '+(members.length?'occupied':'vacant')}><Icon name={members.length?'users':'cube'} size={15}/>{members.length?`${members.length} peran memiliki bukti`:'Belum ada bukti'}</span><span>{room.plannedRoles.length} tempat kerja · {room.plannedRoles.length-members.length} tersedia</span></div>
   {members.length?<><p className="room-detail-description">Status setiap peran mengikuti hasil yang tercatat beserta usia dan batas cakupannya.</p><div className="room-members">{members.map(r=><button key={r.id} onClick={()=>onSelect(r.id)}><span className="member-avatar"><Avatar id={r.id}/></span><span><b>{r.title}</b><small className={roleStatus(r,report,now).toLowerCase()}><span className="status-dot"/>{labels[roleStatus(r,report,now)]}</small></span><Icon name="arrow" size={16}/></button>)}</div></>:<p className="room-detail-description">Belum ada bukti valid untuk peran di ruangan ini. Status tidak diasumsikan aktif.</p>}
  </div>
  <div className="room-detail-action"><span>{candidates.length} peran belum terverifikasi</span><button onClick={onCandidates}>Lihat bukti peran<Icon name="arrow" size={16}/></button><small>Membaca bukti tidak menjalankan tugas atau memberi akses.</small></div>
 </section>;
}
