const time=ms=>ms===null||ms===undefined?'belum ada':new Intl.DateTimeFormat('id-ID',{timeZone:'Asia/Pontianak',dateStyle:'medium',timeStyle:'medium'}).format(ms)+' WIB';
export function markdown(r){
 const lines=['# Status KIP Ops Hybrid',`Dibuat: ${time(r.generatedAt)}`,`Agen: **${r.observer.status}** — siklus terakhir ${time(r.observer.lastCycleAt)}.`,`Jumlah pengamatan tersimpan: ${r.sampleCount}.`,'','| Pemeriksaan | Status | Terakhir | Hasil | Durasi |','|---|---|---|---|---|'];
 for(const c of r.checks)lines.push(`| ${c.id} | ${c.status} | ${time(c.lastAt)} | ${c.lastCode??'belum ada'} | ${c.latencyMs??'-'} ms |`);
 lines.push('','Versi produksi yang diharapkan: '+(r.expected?.release??'lihat config.json')+'.');
 for(const c of r.checks)lines.push(`Versi terlihat (${c.id}): ${c.observed.release??'belum diketahui'}.`);
 lines.push('','## Insiden terbaru','');
 for(const i of r.incidents)lines.push(`- ${i.checkId}: ${i.resolvedAt===null?'TERBUKA':'PULIH'}; dibuka ${time(i.openedAt)}; ${i.failures} kegagalan; kode ${i.lastCode}; pulih ${time(i.resolvedAt)}.`);
 if(!r.incidents.length)lines.push('Belum ada insiden tercatat.');
 lines.push('','Dua kegagalan berturut-turut membuka insiden; dua keberhasilan menutupnya. Data lebih tua dari 10 menit 5 detik berstatus UNKNOWN.','', 'Batas: agen berada di VPS yang sama. Pemantauan eksternal terus-menerus dan pengiriman notifikasi belum diaktifkan. Laporan ini tidak menguji login, transaksi, kelas nyata, atau kapasitas pengguna. Tidak menggunakan API model berbayar.','');
 return lines.join('\n');
}
