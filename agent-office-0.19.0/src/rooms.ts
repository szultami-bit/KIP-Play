import {getRole,hasRoleEvidence,RoleReport} from './roles';
export const rooms = [
 {id:'command',title:'Pusat koordinasi',short:'KOORDINASI',purpose:'Prioritas & rencana tim',icon:'compass',color:'#b8a0ff',x:70,y:130,plannedRoles:['coordinator']},
 {id:'infrastructure',title:'Server & operasi',short:'SERVER & OPERASI',purpose:'Layanan, rilis & kapasitas',icon:'server',color:'#69dfed',x:660,y:130,plannedRoles:['health','release','capacity']},
 {id:'qa_lab',title:'Lab pengujian',short:'LAB PENGUJIAN',purpose:'Permainan, login & akses',icon:'cube',color:'#efc080',x:1250,y:130,plannedRoles:['qa','accounts']},
 {id:'security',title:'Keamanan & backup',short:'KEAMANAN & BACKUP',purpose:'Perlindungan & pemulihan',icon:'shield',color:'#8aaef9',x:70,y:750,plannedRoles:['security','backup']},
 {id:'content',title:'Studio materi',short:'STUDIO MATERI',purpose:'Konten & materi belajar',icon:'book',color:'#d3a3eb',x:660,y:750,plannedRoles:['content']},
 {id:'customers',title:'Pelanggan & pertumbuhan',short:'PELANGGAN & PERTUMBUHAN',purpose:'Bantuan, pilot & statistik game',icon:'growth',color:'#7fd8bc',x:1250,y:750,plannedRoles:['payments','support','growth','growth-stats']}
] as const;
export type Room = typeof rooms[number];
export const roomForRole = (id:string) => rooms.find(r => (r.plannedRoles as readonly string[]).includes(id)) ?? rooms[0];

export type RoomId = Room['id'];
export const getRoom = (id:string) => rooms.find(r=>r.id===id) ?? rooms[1];
export const roomMembers = (room:Room,report:RoleReport|null=null,now=Date.now()) => room.plannedRoles.map(getRole).filter(r=>hasRoleEvidence(r,report,now));
export const roomCandidates = (room:Room,report:RoleReport|null=null,now=Date.now()) => room.plannedRoles.map(getRole).filter(r=>!hasRoleEvidence(r,report,now));
