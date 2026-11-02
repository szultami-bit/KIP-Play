import {GAME_TEAM} from '../../src/game-team.js';
import {roleEvidenceAt,roleLabels,freshnessLabels} from '../../src/role-evidence.js';
// Desk positions match fourteen desks; identity is independent of activity.
export const robotRoster=[
 {id:'coordinator',name:'Koordinator tim',short:'KT',color:'#9787bd',desk:[-9,0,-2.5]},
 {id:'health',name:'Pemantau layanan',short:'PL',color:'#629893',desk:[-2.1,0,-1.9]},
 {id:'release',name:'Penjaga rilis',short:'PR',color:'#9f927f',desk:[.3,0,-1.9]},
 {id:'capacity',name:'Penjaga kapasitas',short:'KP',color:'#6b9ed0',desk:[2.6,0,-3.7]},
 {id:'qa',name:'Penguji permainan',short:'QA',color:'#d5ab63',desk:[6.5,0,-2.6]},
 {id:'accounts',name:'Penjaga akun',short:'AK',color:'#73b9a6',desk:[9.8,0,-2.6]},
 {id:'security',name:'Penjaga keamanan',short:'KM',color:'#758fc3',desk:[-10.7,0,5.9]},
 {id:'backup',name:'Penjaga backup',short:'BK',color:'#c98d72',desk:[-7.5,0,5.9]},
 {id:'content',name:'Kurator bank materi',short:'MT',color:'#b092c9',desk:[-.7,0,5.7]},
 {id:'payments',name:'Penjaga pembayaran',short:'PB',color:'#cfac63',desk:[6.2,0,5.6]},
 {id:'support',name:'Pendamping pelanggan',short:'BP',color:'#c88daa',desk:[9.5,0,5.6]},
 {id:'growth',name:'Pengembang pertumbuhan',short:'PT',color:'#65b0a7',desk:[8.6,0,8.2]},
 {id:'growth-stats',name:'Statistik Game',short:'SG',color:'#65b9d2',desk:[6.2,0,8.2]},
 {id:'instagram-admin',name:'AI Admin KIP',short:'DM',color:'#a575db',desk:[11,0,8.2]}
];
for(const member of GAME_TEAM){Object.assign(robotRoster.find(r=>r.id===member.id),member,{floor:2});}
export const roleRobots=robotRoster.filter(r=>!['health','release'].includes(r.id));
export const isObserver=id=>id==='health'||id==='release';
export function roleRobotViews(report,now=Date.now(),connected=true){return roleRobots.map(robot=>{
 const r=roleEvidenceAt(report,robot.id,now,connected);
 return {...r,name:robot.name,label:roleLabels[r.status]+' · '+freshnessLabels[r.freshness],
 tone:['ACTIVE','HEALTHY'].includes(r.status)&&r.freshness==='current'?'good':['PARTIAL','BLOCKED','DEGRADED','INCIDENT'].includes(r.status)?'attention':'unknown',
 canRest:!GAME_TEAM.some(t=>t.id===robot.id)&&['ACTIVE','HEALTHY'].includes(r.status)&&r.freshness==='current'};
});}
