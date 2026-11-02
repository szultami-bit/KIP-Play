// Existing robot identities and original skills are retained.
export const GAME_TEAM=[
 {id:'content',name:'Pemantau Game',short:'PG',skillId:'game-monitoring',desk:[-8.6,4.6,-1.9],scope:'Memantau ketersediaan halaman game dan menerima laporan error.'},
 {id:'support',name:'Teknisi IT',short:'IT',skillId:'game-it-repair',desk:[-7,4.6,-1.9],scope:'Penanggung jawab diagnosis dan perbaikan bug lintas game.'},
 {id:'accounts',name:'Teknisi Tampilan',short:'UI',skillId:'game-ui-repair',desk:[-5.4,4.6,-1.9],scope:'Menangani tampilan, tombol, fullscreen, dan interaksi.'},
 {id:'payments',name:'Teknisi Server',short:'SV',skillId:'game-server-repair',desk:[-8.6,4.6,-5.2],scope:'Menangani layanan, room, sinkronisasi, dan koneksi.'},
 {id:'qa',name:'Penguji Game',short:'QA',skillId:'game-team-qa',desk:[-7,4.6,-5.2],scope:'Memeriksa reproduksi, hasil perbaikan, dan bukti pengujian.'}
];
export function repairTeam(incident){return {teamId:'shared-game-team',floor:2,coordinatorId:'coordinator',leadId:'support',monitorId:'content',specialistId:incident.kind==='resource'?'payments':'accounts',testerId:'qa'};}
