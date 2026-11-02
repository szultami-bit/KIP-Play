(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function t(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=t(r);fetch(r.href,s)}})();const Mu="modulepreload",Su=function(n){return"/agent-office/campus/"+n},Zo={},bu=function(e,t,i){let r=Promise.resolve();if(t&&t.length>0){let c=function(l){return Promise.all(l.map(d=>Promise.resolve(d).then(h=>({status:"fulfilled",value:h}),h=>({status:"rejected",reason:h}))))};document.getElementsByTagName("link");const a=document.querySelector("meta[property=csp-nonce]"),o=a?.nonce||a?.getAttribute("nonce");r=c(t.map(l=>{if(l=Su(l),l in Zo)return;Zo[l]=!0;const d=l.endsWith(".css"),h=d?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${l}"]${h}`))return;const u=document.createElement("link");if(u.rel=d?"stylesheet":Mu,d||(u.as="script"),u.crossOrigin="",u.href=l,o&&u.setAttribute("nonce",o),document.head.appendChild(u),d)return new Promise((m,M)=>{u.addEventListener("load",m),u.addEventListener("error",()=>M(new Error(`Unable to preload CSS for ${l}`)))})}))}function s(a){const o=new Event("vite:preloadError",{cancelable:!0});if(o.payload=a,window.dispatchEvent(o),!o.defaultPrevented)throw a}return r.then(a=>{for(const o of a||[])o.status==="rejected"&&s(o.reason);return e().catch(s)})},tc=605e3,cs=[{id:"health",name:"Pemantau layanan",short:"PL",activity:"Arcade",color:"#79c2bd"},{id:"release",name:"Penjaga rilis",short:"PR",activity:"Biliar",color:"#d5ba93"}],Ur={HEALTHY:"Sehat",DEGRADED:"Perlu perhatian",INCIDENT:"Gangguan",RECOVERING:"Pemulihan",UNKNOWN:"Belum diketahui"},$o=new Set(["OK","INVALID_PAYLOAD","IDENTITY_MISMATCH","UNEXPECTED_PROFILE","UNEXPECTED_RELEASE","ADMISSION_DRAINING","HTTP_STATUS","INVALID_JSON","BODY_TOO_LARGE","NETWORK","TIMEOUT"]),$i=n=>Number.isSafeInteger(n)&&n>0,jo=(n,e)=>$i(n)&&n<=e&&e-n<=tc;function yu(n,e=Date.now(),t="ready"){return cs.map(i=>{const r=Array.isArray(n?.checks)?n.checks.filter(m=>m?.id===i.id):[],s=r.length===1?r[0]:null,a=$i(s?.lastAt)?s.lastAt:null,o=!!a&&a<=e&&e-a>tc,c=!!a&&a>e,l=n?.observer?.status==="HEALTHY"&&jo(n.observer.lastCycleAt,e),d=t==="ready"&&n?.source==="observer"&&l&&jo(a,e)&&Object.hasOwn(Ur,s?.status)&&$o.has(s?.lastCode),h=d&&!(s.status==="HEALTHY"&&s.lastCode!=="OK")?s.status:"UNKNOWN",u=o?"Data lama":c?"Waktu tidak valid":t==="session"?"Sesi berakhir":t==="error"?"Koneksi terputus":t==="loading"?"Mengambil laporan":n?.source==="snapshot"?"Data snapshot":a?l?h==="UNKNOWN"?"Hasil belum terverifikasi":"Data terbaru":"Pemantau belum terverifikasi":"Belum ada laporan";return{...i,status:h,label:Ur[h],freshness:u,lastAt:a,canRest:h==="HEALTHY",tone:h==="HEALTHY"?"good":h==="UNKNOWN"?"unknown":"attention",source:n?.source==="observer"?"Pemantau VPS":n?.source==="snapshot"?"Snapshot tersimpan":"Belum tersedia",lastCode:$o.has(s?.lastCode)?s.lastCode:null,latencyMs:Number.isFinite(s?.latencyMs)&&s.latencyMs>=0&&s.latencyMs<=6e4?s.latencyMs:null,release:/^[0-9a-f]{40}$/.test(s?.observed?.release)?s.observed.release:null,lastCycleAt:$i(n?.observer?.lastCycleAt)?n.observer.lastCycleAt:null,nextDueAt:d&&$i(n?.observer?.nextDueAt)?n.observer.nextDueAt:null,lastResult:s&&Object.hasOwn(Ur,s.status)?Ur[s.status]:"Belum tersedia",reason:o?"Pemeriksaan ini berusia lebih dari 10 menit 5 detik. Kondisi saat ini belum diketahui.":c?"Waktu laporan berada di masa depan. Kondisi saat ini belum diketahui.":t==="error"?"Laporan terakhir tetap ditampilkan sebagai arsip. Koneksi akan dicoba lagi.":t==="session"?"Masuk kembali untuk membaca laporan.":d?h==="HEALTHY"?"Hasil pemeriksaan terakhir sehat. Karakter boleh rehat sambil menunggu laporan berikutnya.":"Hasil ini membutuhkan perhatian. Karakter berada atau kembali ke ruang operasi.":"Menunggu hasil yang dapat diverifikasi dari pemantau VPS."}})}function Mi(n){return $i(n)?new Intl.DateTimeFormat("id-ID",{day:"2-digit",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit",second:"2-digit",timeZone:"Asia/Pontianak",hour12:!1}).format(n)+" WIB":"Belum ada"}function io(n,e=Date.now()){if(!$i(n))return"Belum pernah tercatat";if(n>e)return"Waktu tidak valid";const t=Math.floor((e-n)/1e3);return t<60?t+" detik lalu":t<3600?Math.floor(t/60)+" menit lalu":t<86400?Math.floor(t/3600)+" jam lalu":Math.floor(t/86400)+" hari lalu"}function nc(){for(const n of["todo","doing","done"]){const e=document.querySelector("#jobs-"+n).children.length;document.querySelector("#count-"+n).textContent=e,document.querySelector("#empty-"+n).hidden=e>0}}function Eu(n,e){return e?.reviewing?"doing":n.canRest?"done":"todo"}function Tu({openReport:n,refreshReport:e,announce:t}){const i=C=>document.querySelector(C),r=new Map;let s=null,a=[],o=!1,c=!1,l=!1,d=null;const h={health:"Periksa layanan",release:"Periksa versi rilis"};for(const C of cs){const S=document.createElement("article");S.className="job-card",S.tabIndex=-1,S.dataset.job=C.id,S.innerHTML=`<div class="job-owner"><span class="agent-monogram">${C.short}</span><span>${C.name}</span></div><h3>${h[C.id]}</h3><p class="job-result"></p><p class="job-time"></p><p class="job-review" hidden>Tinjauan Anda</p><div class="job-actions"><button data-action="report">Lihat hasil</button><button data-action="start" class="primary-action">Mulai tinjau</button><button data-action="complete" class="primary-action" hidden>Selesaikan</button><button data-action="cancel" class="quiet-action" hidden>Hentikan tinjauan</button></div>`;for(const E of S.querySelectorAll("button"))E.onclick=()=>E.dataset.action==="report"?n(C.id):g(C.id,E.dataset.action);r.set(C.id,S),i("#jobs-todo").append(S)}function u(C){i("#board-notice").textContent=C}function m(){for(const C of a){const S=r.get(C.id),E=s?.reviews[C.id],y=s?Eu(C,E):"todo";S.parentElement.id!=="jobs-"+y&&i("#jobs-"+y).append(S),S.dataset.tone=C.tone,S.querySelector(".job-result").textContent=C.label+" · "+C.freshness,S.querySelector(".job-time").textContent=C.lastAt?"Diperiksa "+io(C.lastAt)+`
`+Mi(C.lastAt):"Belum ada hasil pemeriksaan";const v=S.querySelector(".job-review");v.hidden=!E?.reviewing,v.textContent="Tinjauan Anda · sejak "+Mi(E?.startedAt);for(const x of S.querySelectorAll("[data-action]")){const p=x.dataset.action;x.hidden=p==="start"?!!E?.reviewing:["complete","cancel"].includes(p)?!E?.reviewing:!1,x.disabled=p==="report"?!1:!s||o||l||p==="complete"&&!C.canRest,p==="start"&&(x.textContent=y==="done"?"Tinjau ulang":"Mulai tinjau"),p==="complete"&&(x.title=C.canRest?"Tandai tinjauan selesai":"Menunggu hasil terbaru yang sehat")}}nc(),i("#board-refresh").disabled=o||l}async function M(C){d=new AbortController;const S=setTimeout(()=>d?.abort(),12e3);try{const E=await fetch("/agent-office/api/board",{method:C?"POST":"GET",credentials:"same-origin",cache:"no-store",headers:C?{"Content-Type":"application/json"}:void 0,body:C?JSON.stringify(C):void 0,signal:d.signal}),y=await E.json();if(E.status===401&&(l=!0),!E.ok)throw Error(y.error||"BOARD_UNAVAILABLE");if(y?.version!==1||!Number.isSafeInteger(y.revision)||!y.reviews||!("health"in y.reviews)||!("release"in y.reviews))throw Error("BOARD_UNAVAILABLE");return y}finally{clearTimeout(S),d=null}}async function w(){if(!(o||c||document.hidden||l)){o=!0,m();try{s=await M(),u("")}catch{s=null,u(l?"Sesi berakhir. Masuk kembali.":"Papan belum tersambung. Coba perbarui.")}finally{o=!1,m()}}}async function g(C,S){if(o||!s||l)return;o=!0,m();const E=a.find(y=>y.id===C);try{s=await M({id:C,action:S,revision:s.revision,...S==="complete"?{resultAt:E?.lastAt}:{}});const y=S==="start"?"Tinjauan dimulai.":S==="complete"?"Tinjauan selesai.":"Tinjauan dihentikan.";u(y),t(y)}catch(y){u(l?"Sesi berakhir. Masuk kembali.":{BOARD_CHANGED:"Papan berubah di perangkat lain. Tampilan diperbarui.",RESULT_CHANGED:"Ada hasil baru. Buka hasil sebelum menyelesaikan.",RESULT_NOT_VERIFIED:"Hasil belum sehat atau sudah lama. Tinjauan belum selesai.",NOT_REVIEWING:"Tinjauan sudah berubah. Tampilan diperbarui.",ALREADY_REVIEWING:"Tinjauan sudah dimulai."}[y.message]||"Perubahan belum dapat dipastikan. Perbarui papan."),s=null;try{l||(s=await M())}catch{}e()}finally{o=!1,m(),r.get(C)?.focus({preventScroll:!0})}}i("#board-refresh").onclick=()=>{w(),e()};const f=()=>{document.hidden||w()};document.addEventListener("visibilitychange",f);const P=setInterval(w,3e4);return addEventListener("pagehide",()=>{c=!0,d?.abort(),clearInterval(P),document.removeEventListener("visibilitychange",f)},{once:!0}),w(),{receive(C){a=C,m()}}}const Au=n=>n==="running"?"doing":n==="completed"?"done":"todo";function wu({pending:n=!1,failures:e=0,hidden:t=!1,offline:i=!1,session:r=!1}={}){return t||i||r?null:Math.min(12e4,(n?5e3:3e4)*2**Math.min(e,3))}function Ru({announce:n}){const e=E=>document.querySelector(E),t=new Map,i={queued:"Menunggu worker",running:"Sedang diperiksa",completed:"Pemeriksaan selesai",blocked:"Terhalang",failed:"Pemeriksaan gagal"};let r=null,s=!1,a=!1,o=!1,c=0,l,d,h=null,u=null;try{const E=JSON.parse(sessionStorage.getItem("kip-pending-task"));E&&typeof E.taskId=="string"&&/^[a-f0-9-]{36}$/i.test(E.requestId)&&(h=E)}catch{}const m=E=>{e("#task-notice").textContent=E},M=()=>{try{h?sessionStorage.setItem("kip-pending-task",JSON.stringify(h)):sessionStorage.removeItem("kip-pending-task")}catch{}};function w(E){u=E.id,e("#task-result-title").textContent=E.title,e("#task-result-summary").textContent=E.result?.summary||i[E.status],e("#task-result-meta").textContent=`${E.agentId} · ${E.skill.id} v${E.skill.version} · ${new Date(E.updatedAt).toLocaleString("id-ID")}`,e("#task-result-boundary").textContent=E.result?.scope||"Pemeriksaan baca saja. Hasil diagnosis tidak berarti bug sudah diperbaiki.";const y=(v,x)=>{e(v).replaceChildren(...(x||[]).map(p=>{const b=document.createElement("li");return b.textContent=String(p),b}))};y("#task-result-evidence",E.result?.evidence),y("#task-result-next",E.result?.nextSteps),y("#task-result-history",E.history.map(v=>`${new Date(v.at).toLocaleString("id-ID")} · ${i[v.event]||v.event}`)),e("#task-result-limit").textContent=E.result?.limitations||""}function g(){e("#task-run").disabled=s||o||!r,e("#task-select").disabled=s||o||!!h||!r,e("#task-run").textContent=h?"Coba kirim ulang":"Jalankan",e("#task-worker").textContent=r?.worker.status==="running"?"Worker tersambung · pemeriksaan baca saja":"Worker belum terverifikasi",e("#incident-list").replaceChildren(...(r?.incidents||[]).map(E=>{const y=document.createElement("li");return y.textContent=`Lucky Wheel · ${E.mode} · ${E.errorClass} · ${E.occurrences} laporan · ${E.jobId?"sudah ditugaskan":"menunggu skill koordinator dan agent"} · belum terverifikasi`,y}));for(const E of r?.jobs||[]){let y=t.get(E.id);if(!y){y=document.createElement("article"),y.className="job-card";const v=document.createElement("p"),x=document.createElement("h3"),p=document.createElement("p"),b=document.createElement("p"),A=document.createElement("div"),L=document.createElement("button");v.className="job-owner",x.className="task-title",p.className="job-result",b.className="job-time",A.className="job-actions",L.textContent="Lihat hasil",L.onclick=()=>{const B=r.jobs.find(D=>D.id===E.id);B&&(w(B),e("#task-result").showModal())},A.append(L),y.append(v,x,p,b,A),t.set(E.id,y)}y.querySelector(".job-owner").textContent=E.agentId+" · "+(E.source==="incident"?"Laporan game":"Tugas Anda"),y.querySelector("h3").textContent=E.title,y.querySelector(".job-result").textContent=E.result?.summary||i[E.status],y.querySelector(".job-time").textContent=new Date(E.updatedAt).toLocaleString("id-ID")+" · "+E.skill.id+" v"+E.skill.version,y.dataset.tone=E.status==="completed"?"good":"pending",e("#jobs-"+Au(E.status)).append(y)}for(const[E,y]of t)r?.jobs.some(v=>v.id===E)||(y.remove(),t.delete(E));if(u&&e("#task-result").open){const E=r?.jobs.find(y=>y.id===u);E&&w(E)}nc()}async function f(E){d=new AbortController;const y=setTimeout(()=>d?.abort(),1e4);try{const v=await fetch("/agent-office/api/jobs",{method:E?"POST":"GET",credentials:"same-origin",cache:"no-store",headers:E?{"Content-Type":"application/json"}:void 0,body:E?JSON.stringify(E):void 0,signal:d.signal}),x=await v.json();if(v.status===401&&(o=!0),!v.ok){const p=Error(x.error||"TASKS_UNAVAILABLE");throw p.status=v.status,p}return x}finally{clearTimeout(y),d=null}}function P(){clearTimeout(l);const E=wu({pending:r?.jobs.some(y=>["queued","running"].includes(y.status)),failures:c,hidden:document.hidden||e("#view-board").hidden,offline:navigator.onLine===!1,session:o});!a&&E&&(l=setTimeout(C,E))}async function C(){if(!(s||a||document.hidden||navigator.onLine===!1||o)){s=!0;try{const E=await f();if(E.schemaVersion!==1||!Array.isArray(E.jobs)||!Array.isArray(E.catalog))throw Error();r=E,c=0;const y=h?.taskId||e("#task-select").value;e("#task-select").replaceChildren(...r.catalog.map(v=>new Option(v.title,v.id))),[...e("#task-select").options].some(v=>v.value===y)&&(e("#task-select").value=y),h&&r.jobs.some(v=>v.requestId===h.requestId)&&(h=null,M(),m("Tugas sudah tersimpan."))}catch{c++,m(o?"Sesi berakhir. Masuk kembali.":"Antrean belum dapat diperbarui. Hasil yang tampil adalah salinan terakhir.")}finally{s=!1,g(),P()}}}e("#task-run").onclick=async()=>{if(!(s||o||!r)){h??={taskId:e("#task-select").value,requestId:crypto.randomUUID()},M(),s=!0,g();try{await f(h),h=null,M(),m("Tugas tersimpan di antrean."),n("Tugas tersimpan di antrean.")}catch(E){E.status>=400&&E.status<500&&E.status!==429&&(h=null,M()),m(E.message==="TASK_SKILL_UNAVAILABLE"?"Skill aktif belum tersedia untuk tugas ini.":E.message==="REQUEST_ID_CONFLICT"?"Permintaan sudah berubah. Periksa daftar tugas sebelum mencoba lagi.":o?"Sesi berakhir. Masuk kembali.":"Pengiriman belum dapat dipastikan. Coba kirim ulang dengan ID yang sama.")}finally{s=!1,g(),C()}}},e("#task-result-close").onclick=()=>e("#task-result").close(),e("#task-result").addEventListener("close",()=>u=null);const S=()=>{!document.hidden&&!e("#view-board").hidden?C():P()};document.addEventListener("visibilitychange",S),addEventListener("online",S),addEventListener("offline",P),e("#tab-board").addEventListener("click",()=>queueMicrotask(S)),e("#board-refresh").addEventListener("click",C),addEventListener("pagehide",()=>{a=!0,d?.abort(),clearTimeout(l),document.removeEventListener("visibilitychange",S),removeEventListener("online",S),removeEventListener("offline",P)},{once:!0}),C()}const Ki={ACTIVE:"Aktif sesuai cakupan",PARTIAL:"Sebagian terbukti",BLOCKED:"Terhalang",PLANNED:"Direncanakan",HISTORICAL:"Bukti historis",UNKNOWN:"Belum terverifikasi",HEALTHY:"Sehat",DEGRADED:"Perlu diperiksa",INCIDENT:"Ada gangguan",RECOVERING:"Sedang pulih"},is={current:"Bukti terkini",historical:"Bukti historis",unknown:"Belum diketahui"},Cu="https://games.kampunginggrispontianak.com/dashboard.html#fun",Ta=n=>Number.isSafeInteger(n)&&n>=0,Gn=n=>new Intl.NumberFormat("id-ID").format(n);function na(n){if(!n||n.kind!=="growth"||!["registeredToday","totalRegistered","activeToday","recent5m","excludedTestAccounts"].every(t=>Ta(n[t]))||n.registeredToday>n.totalRegistered||n.activeToday>n.totalRegistered||n.recent5m>n.totalRegistered||n.timezone!=="Asia/Pontianak"||n.activityWindowMinutes!==5||n.testExclusion!=="MARKED_ONLY"||n.scope!=="PUBLIC_ACCOUNTS"||n.activityCoverage!=="OBSERVED_DEVICE_ACTIVITY"||!Ta(n.dayStart)||!Ta(n.dayEnd)||n.dayEnd-n.dayStart!==864e5||typeof n.localDate!="string"||!/^\d{4}-\d\d-\d\d$/.test(n.localDate))return!1;const e=new Date(n.dayStart+7*36e5);return Number.isFinite(e.getTime())&&e.toISOString()===n.localDate+"T00:00:00.000Z"}function Pu(n){return na(n)?[["Pendaftar hari ini",Gn(n.registeredToday)],["Total pendaftar publik",Gn(n.totalRegistered)],["Akun aktif tercatat hari ini",Gn(n.activeToday)],["Akun beraktivitas ≤5 menit",Gn(n.recent5m)]]:[]}function Lu(n){return na(n)?[`Tanggal laporan: ${new Intl.DateTimeFormat("id-ID",{timeZone:"Asia/Pontianak",day:"2-digit",month:"long",year:"numeric"}).format(n.dayStart)} · WIB. “Hari ini” mengikuti tanggal laporan.`,"Aktivitas menghitung akun publik unik dari waktu aktivitas perangkat. Satu akun dengan beberapa perangkat tetap dihitung sekali. Akun internal dan pengunjung anonim tidak termasuk.","Catatan perangkat diperbarui paling cepat tiap 5 menit. Jendela ≤5 menit dihitung mundur dari waktu bukti; ini indikasi aktivitas terbaru, bukan kepastian sedang online.",`${Gn(n.excludedTestAccounts)} akun uji bertanda dikecualikan. Akun uji yang belum bertanda masih mungkin terhitung.`]:[]}function ic(n,e,t=Date.now(),i=!0){const r={id:e,status:"UNKNOWN",recordedStatus:null,freshness:"unknown",lastAt:null,maxAgeMs:null,source:"unavailable",scope:"Cakupan belum dapat diverifikasi.",blocker:"Bukti belum tersedia atau tidak valid.",evidence:[],capabilities:[],metrics:null};if(n?.schemaVersion!==1||!Number.isSafeInteger(n.generatedAt)||n.generatedAt>t||!Array.isArray(n.roles))return r;const s=n.roles.filter(o=>o?.id===e),a=s.length===1?s[0]:null;return!a||!Object.hasOwn(Ki,a.status)||!["current","historical","unknown"].includes(a.freshness)||!Number.isSafeInteger(a.lastAt)||a.lastAt>t||a.lastAt<0||!Number.isSafeInteger(a.maxAgeMs)||a.maxAgeMs<=0||a.maxAgeMs>2592e6||!Array.isArray(a.evidence)||!Array.isArray(a.capabilities)||typeof a.scope!="string"||typeof a.blocker!="string"||e==="growth-stats"&&a.metrics!==null&&a.metrics?.kind!=="growth"||a.metrics?.kind==="growth"&&(e!=="growth-stats"||!na(a.metrics)||a.maxAgeMs!==12e4||a.lastAt<a.metrics.dayStart||a.lastAt>=a.metrics.dayEnd)?r:i?a.freshness==="unknown"?{...a,status:"UNKNOWN"}:t-a.lastAt>a.maxAgeMs||a.freshness==="historical"||a.metrics?.kind==="growth"&&t>=a.metrics.dayEnd?{...a,status:"HISTORICAL",freshness:"historical"}:a:{...a,status:"UNKNOWN",freshness:"unknown",blocker:"Koneksi laporan terputus. Bukti tersimpan bukan kondisi saat ini. "+a.blocker}}function Jo(n){return Number.isSafeInteger(n)&&n>=0?new Intl.DateTimeFormat("id-ID",{timeZone:"Asia/Pontianak",day:"2-digit",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!1}).format(n)+" WIB":"Belum ada bukti"}function Qo(n){return n?n.kind==="growth"?na(n)?`${Gn(n.registeredToday)} pendaftar hari ini · ${Gn(n.totalRegistered)} total publik · ${Gn(n.activeToday)} akun beraktivitas tercatat hari ini · ${Gn(n.recent5m)} dalam ≤5 menit`:"Metrik pertumbuhan belum tersedia.":`CPU ${n.cpu.usagePct.toFixed(2)}% · RAM ${n.ram.usedPct.toFixed(2)}% · Disk ${n.disk.usedPct.toFixed(2)}%`:""}const Qi=[{id:"coordinator",name:"Koordinator tim",short:"KT",color:"#9787bd",desk:[-9,0,-2.5]},{id:"health",name:"Pemantau layanan",short:"PL",color:"#629893",desk:[-2.1,0,-1.9]},{id:"release",name:"Penjaga rilis",short:"PR",color:"#9f927f",desk:[.3,0,-1.9]},{id:"capacity",name:"Penjaga kapasitas",short:"KP",color:"#6b9ed0",desk:[2.6,0,-3.7]},{id:"qa",name:"Penguji permainan",short:"QA",color:"#d5ab63",desk:[6.5,0,-2.6]},{id:"accounts",name:"Penjaga akun",short:"AK",color:"#73b9a6",desk:[9.8,0,-2.6]},{id:"security",name:"Penjaga keamanan",short:"KM",color:"#758fc3",desk:[-10.7,0,5.9]},{id:"backup",name:"Penjaga backup",short:"BK",color:"#c98d72",desk:[-7.5,0,5.9]},{id:"content",name:"Kurator bank materi",short:"MT",color:"#b092c9",desk:[-.7,0,5.7]},{id:"payments",name:"Penjaga pembayaran",short:"PB",color:"#cfac63",desk:[6.2,0,5.6]},{id:"support",name:"Pendamping pelanggan",short:"BP",color:"#c88daa",desk:[9.5,0,5.6]},{id:"growth",name:"Pengembang pertumbuhan",short:"PT",color:"#65b0a7",desk:[8.6,0,8.2]},{id:"growth-stats",name:"Statistik Game",short:"SG",color:"#65b9d2",desk:[6.2,0,8.2]},{id:"instagram-admin",name:"AI Admin KIP",short:"DM",color:"#a575db",desk:[11,0,8.2]}],rc=Qi.filter(n=>!["health","release"].includes(n.id)),el=n=>n==="health"||n==="release";function Du(n,e=Date.now(),t=!0){return rc.map(i=>{const r=ic(n,i.id,e,t);return{...r,name:i.name,label:Ki[r.status]+" · "+is[r.freshness],tone:["ACTIVE","HEALTHY"].includes(r.status)&&r.freshness==="current"?"good":["PARTIAL","BLOCKED","DEGRADED","INCIDENT"].includes(r.status)?"attention":"unknown",canRest:["ACTIVE","HEALTHY"].includes(r.status)&&r.freshness==="current"}})}const Aa=rc.map(n=>[n.id,n.name,n.short]),tl=n=>["ACTIVE","HEALTHY"].includes(n)?"good":["PARTIAL","BLOCKED","DEGRADED","INCIDENT"].includes(n)?"attention":"unknown";function Iu({getOffice:n=()=>null,focusAgent:e=()=>{}}={}){const t=S=>document.querySelector(S),i=new Map,r=t("#role-evidence-dialog");let s=null,a=!1,o="capacity",c=!1,l=!1,d=!1,h=null;for(const[S,E,y]of Aa){const v=document.createElement("button");v.className="observer-card",v.dataset.role=S,v.setAttribute("aria-haspopup","dialog"),v.innerHTML='<span class="agent-monogram"></span><span class="agent-summary"><b></b><span class="agent-result"></span><span class="agent-checked"></span><span class="agent-activity"></span></span><span class="report-arrow" aria-hidden="true">↗</span>',v.querySelector(".agent-monogram").textContent=y,v.querySelector("b").textContent=E,v.onclick=()=>u(S),i.set(S,v),t(S==="coordinator"||S==="capacity"||S==="growth-stats"?"#role-primary-cards":"#role-audit-cards").append(v)}function u(S){i.has(S)&&(o=S,M(),r.open||r.showModal())}const m=S=>ic(s,S,Date.now(),a);function M(){const S=m(o);t("#role-evidence-name").textContent=Aa.find(v=>v[0]===o)[1],t("#role-evidence-status").textContent=Ki[S.status]+" · "+is[S.freshness],t("#role-evidence-status").dataset.tone=tl(S.status),t("#role-evidence-scope").textContent=S.scope,t("#role-evidence-blocker").textContent=S.blocker||"Tidak ada kendala tambahan tercatat. Cakupan tetap terbatas pada bukti di atas.";const E={time:Jo(S.lastAt),source:S.source==="unavailable"?"Belum tersedia":S.source,expiry:S.maxAgeMs?S.maxAgeMs<36e5?Math.round(S.maxAgeMs/1e3)+" detik":Math.round(S.maxAgeMs/36e5)+" jam":"Belum tersedia",recorded:Ki[S.recordedStatus]||"Belum tersedia"};for(const[v,x]of Object.entries(E))t("#role-evidence-"+v).textContent=x;for(const v of["capabilities","evidence"])t("#role-evidence-"+v).replaceChildren(...(S[v].length?S[v]:["Belum tersedia."]).map(x=>{const p=document.createElement("li");return p.textContent=x,p}));const y=t("#role-evidence-metrics");if(y.replaceChildren(),o==="instagram-admin"){const v=document.createElement("p");v.textContent="@kampunginggrispontianak · DM saja · Balasan otomatis belum aktif";const x=document.createElement("button");x.type="button",x.className="report-button",x.textContent="Kelola panduan DM",x.onclick=()=>{r.close(),location.hash="#agent-skill",dispatchEvent(new CustomEvent("office:agent-select",{detail:{id:"instagram-admin"}}))},y.append(v,x)}if(o==="growth-stats"){const v=document.createElement("a");v.className="report-button",v.textContent="Buka dashboard game",v.setAttribute("href",Cu),v.setAttribute("target","_blank"),v.setAttribute("rel","noopener noreferrer");const x=document.createElement("p");x.textContent="Tautan membuka game KIP. Ketersediaan statistik otomatis tetap mengikuti bukti dan status koneksi di bawah.",y.append(v,x)}if(S.metrics){const v=document.createElement("p");if(v.textContent=(S.metrics.kind==="growth"?"Pendaftaran & aktivitas":Qo(S.metrics))+" · "+is[S.freshness],y.append(v),S.metrics.kind==="growth"){const x=document.createElement("dl");x.className="growth-metrics";for(const[p,b]of Pu(S.metrics)){const A=document.createElement("div"),L=document.createElement("dt"),B=document.createElement("dd");L.textContent=p,B.textContent=b,A.append(L,B),x.append(A)}y.append(x);for(const p of Lu(S.metrics)){const b=document.createElement("p");b.textContent=p,y.append(b)}}else for(const x of[`CPU: ${S.metrics.cpu.count} inti.`,`RAM: ${(S.metrics.ram.usedBytes/2**30).toFixed(2)} / ${(S.metrics.ram.totalBytes/2**30).toFixed(2)} GiB.`,`Disk: ${(S.metrics.disk.usedBytes/2**30).toFixed(2)} / ${(S.metrics.disk.totalBytes/2**30).toFixed(2)} GiB. ${S.metrics.disk.label}.`,`Interval sampel: ${S.metrics.intervalSeconds} detik. Uptime: ${Math.round(S.metrics.uptimeSeconds/3600)} jam.`]){const p=document.createElement("p");p.textContent=x,y.append(p)}}}function w(){if(!l){n()?.updateAgents(Du(s,Date.now(),a));for(const[S,E]of Aa){const y=m(S),v=i.get(S);v.dataset.tone=tl(y.status),v.querySelector(".agent-result").textContent=Ki[y.status]+" · "+is[y.freshness],v.querySelector(".agent-checked").textContent=Jo(y.lastAt),v.querySelector(".agent-activity").textContent=y.metrics?Qo(y.metrics):y.scope,v.setAttribute("aria-label",E+". "+Ki[y.status]+". Buka bukti dan batas cakupan.")}t("#refresh-roles").disabled=c||d,t("#role-connection").textContent=d?"Sesi berakhir. Masuk kembali.":a?"Bukti dibaca setiap 30 detik; masa berlaku mengikuti tiap catatan.":c?"Membaca bukti peran…":"Bukti peran belum tersedia. Status tidak diasumsikan aktif.",r.open&&M()}}async function g(){if(c||l||d||document.hidden)return;c=!0,h=new AbortController;const S=setTimeout(()=>h?.abort(),8e3);w();try{const E=await fetch("/agent-office/api/roles",{credentials:"same-origin",cache:"no-store",signal:h.signal});if(E.status===401)throw d=!0,Error();if(!E.ok)throw Error();const y=await E.json();if(y?.schemaVersion!==1||!Array.isArray(y.roles))throw Error();s=y,a=!0}catch{a=!1}finally{clearTimeout(S),h=null,c=!1,w()}}t("#role-evidence-focus").onclick=()=>{r.close(),e(o)},t("#refresh-roles").onclick=g,t("#role-evidence-close").onclick=()=>r.close();const f=()=>{document.hidden||(w(),g())};document.addEventListener("visibilitychange",f);const P=setInterval(g,3e4),C=setInterval(()=>{document.hidden||w()},1e3);return addEventListener("pagehide",()=>{l=!0,h?.abort(),clearInterval(P),clearInterval(C),document.removeEventListener("visibilitychange",f)},{once:!0}),w(),g(),{open:u,refresh:g}}function Uu({announce:n}){const e=a=>document.querySelector(a);let t=null;function i(a){history.replaceState(null,"",a==="board"?"#papan":"#kantor");for(const o of["office","board"])e("#view-"+o).hidden=o!==a,e("#tab-"+o).setAttribute("aria-pressed",String(o===a));a==="office"&&dispatchEvent(new Event("resize"))}e(".skip").onclick=a=>{a.preventDefault(),i("office"),e("#office").focus()},e("#tab-office").onclick=()=>i("office"),e("#tab-board").onclick=()=>i("board");function r(){const a=!!document.fullscreenElement||document.body.classList.contains("focus-mode");e("#fullscreen").textContent=a?"Exit":"Full screen",e("#fullscreen").setAttribute("aria-label",a?"Exit · keluar dari layar penuh":"Full screen · layar penuh"),e("#fullscreen").setAttribute("aria-pressed",String(a))}async function s(){if(document.fullscreenElement)try{await document.exitFullscreen()}catch{n("Tekan Esc untuk keluar dari layar penuh.");return}document.body.classList.remove("focus-mode"),r(),t?.focus({preventScroll:!0})}return e("#fullscreen").onclick=async()=>{if(document.fullscreenElement||document.body.classList.contains("focus-mode"))return s();t=document.activeElement;try{if(!document.documentElement.requestFullscreen)throw Error();await document.documentElement.requestFullscreen()}catch{document.body.classList.add("focus-mode"),n("Mode layar penuh halaman. Tekan Exit untuk kembali.")}r()},document.addEventListener("fullscreenchange",()=>{r(),dispatchEvent(new Event("resize")),document.fullscreenElement||t?.focus({preventScroll:!0})}),document.addEventListener("keydown",a=>{a.key==="Escape"&&document.body.classList.contains("focus-mode")&&s()}),r(),i(location.hash==="#papan"?"board":"office"),{show:i}}const us=[{id:"command",title:"Pusat koordinasi",subtitle:"Rencana & arah tim",icon:"compass",seats:1,x:-8.6,z:-4.7,description:"Meja koordinator, papan rencana, dan sudut diskusi untuk menyatukan prioritas.",roles:["Koordinator tim"]},{id:"infrastructure",title:"Server & operasi",subtitle:"Layanan, rilis & kapasitas",icon:"server",seats:3,x:0,z:-4.7,description:"Tiga meja operasional dan rak server. Tiga robot terhubung ke hasil Pemantau layanan, Penjaga rilis, dan Penjaga kapasitas. Klik karakter untuk membaca laporan serta waktu pemeriksaannya.",roles:["Pemantau layanan","Penjaga versi rilis","Penjaga kapasitas"]},{id:"qa_lab",title:"Lab pengujian",subtitle:"Game, login & akses",icon:"cube",seats:2,x:8.6,z:-4.7,description:"Dua meja uji, layar presentasi, dan perangkat contoh untuk meninjau pengalaman guru serta siswa.",roles:["Penguji permainan","Penjaga akun"]},{id:"security",title:"Keamanan & backup",subtitle:"Perlindungan & pemulihan",icon:"shield",seats:2,x:-8.6,z:4.7,description:"Dua meja khusus, lemari arsip, dan unit cadangan dalam area dengan partisi kaca.",roles:["Penjaga keamanan","Penjaga backup"]},{id:"content",title:"Studio materi",subtitle:"Ide & materi belajar",icon:"book",seats:1,x:0,z:4.7,description:"Studio yang hangat dengan perpustakaan kecil, meja kreatif, mikrofon, dan sudut membaca.",roles:["Kurator bank materi"]},{id:"customers",title:"Pelanggan & pertumbuhan",subtitle:"Bantuan, pilot & statistik game",icon:"growth",seats:5,x:8.6,z:4.7,description:"Lima meja untuk bantuan guru, transaksi uji, pilot komunitas, statistik game, dan AI Admin KIP khusus DM Instagram.",roles:["Penjaga pembayaran","Pendamping pelanggan","Pengembang pertumbuhan","Statistik Game","AI Admin KIP"]}],Nu=[{id:"boardroom",title:"Ruang strategi",subtitle:"Pertemuan & keputusan",icon:"compass",seats:8,x:-7,z:-3,description:"Meja rapat walnut delapan kursi dan layar presentasi. Tempat meninjau hasil serta rencana tim.",roles:["Rapat tim","Review hasil"]},{id:"lounge",title:"Sky lounge",subtitle:"Percakapan & ide baru",icon:"coffee",seats:6,x:5,z:3,description:"Sofa modular, meja kopi rendah, dan karpet hangat. Ruang informal untuk bertukar ide.",roles:["Diskusi","Refleksi"]},{id:"bar",title:"Coffee bar",subtitle:"Rehat sejenak",icon:"cup",seats:4,x:6,z:-5,description:"Bar walnut, empat kursi tinggi, serta rak terbuka dengan pencahayaan lembut.",roles:["Rehat","Kolaborasi informal"]},{id:"terrace",title:"Teras hijau",subtitle:"Cahaya & ruang bernapas",icon:"leaf",seats:4,x:-7,z:5,description:"Area duduk terbuka di antara tanaman, dengan railing kaca menghadap lanskap kota.",roles:["Taman","Ruang terbuka"]}],Fu=[{id:"karaoke",title:"Karaoke room",subtitle:"Musik & panggung kecil",icon:"music",x:-7.4,z:-4.8,description:"Ruang karaoke dengan layar lirik, dua mikrofon, speaker, panel akustik walnut, dan sofa untuk berkumpul.",roles:["Panggung","Sofa bersama","Ruang kedap visual"]},{id:"gym",title:"Gym & wellness",subtitle:"Gerak & energi baru",icon:"gym",x:6,z:-4.8,description:"Area gym dengan treadmill, sepeda statis, bangku latihan, dumbbell, dan matras. Partisi kaca menjaga kesan terbuka.",roles:["Cardio","Latihan beban","Peregangan"]},{id:"pool",title:"Kolam renang",subtitle:"Pool deck & sun loungers",icon:"pool",x:6,z:4.6,description:"Kolam bernuansa turquoise dengan tangga masuk, dek walnut, kursi santai, dan pagar kaca di tepi gedung.",roles:["Kolam","Dek santai","Tanaman"]},{id:"games",title:"Mini game lounge",subtitle:"Biliar, arcade & konsol",icon:"game",x:-7.2,z:4.7,description:"Area rekreasi dengan meja biliar, dua mesin arcade, serta sudut konsol dan sofa. Peralatan merupakan bagian dari model visual.",roles:["Biliar","Arcade","Konsol"]}],Ou=[{id:"arrival",title:"Jalan & gerbang",subtitle:"Akses kantor & pagar keliling",icon:"route",x:-2,z:19,description:"Jalan beraspal dengan marka, trotoar, gerbang terbuka, pagar keliling, dan jalur menuju pintu tangga kantor.",roles:["Jalan masuk","Pagar","Lampu taman"]},{id:"garden",title:"Taman pinus & mawar",subtitle:"Hijau, warna, dan ruang rehat",icon:"leaf",x:-13,z:15,description:"Deretan pohon pinus, bedeng mawar merah, merah muda dan krem, bangku taman, serta jalur pedestrian mengelilingi halaman.",roles:["Pinus","Mawar","Bangku taman"]},{id:"beach",title:"Pantai pasir putih",subtitle:"Laut turquoise & dek kayu",icon:"waves",x:30,z:5.5,description:"Pantai di sisi kanan kantor dengan pasir putih, ombak lembut berbentuk geometri, dek kayu, payung dan kursi santai. Jalur kayu melewati pintu pagar pantai.",roles:["Pasir putih","Boardwalk","Tepi laut"]},{id:"mountains",title:"Pegunungan belakang",subtitle:"Lapis bukit & hutan pinus",icon:"mountain",x:-15,z:-35,description:"Punggung gunung berlapis di belakang kantor, dengan warna yang semakin lembut ke kejauhan dan pohon pinus di kaki bukit. Lingkungan ini adalah lanskap imajinatif.",roles:["Pegunungan","Perbukitan","Lanskap konsep"]}],ds={external:"M7 5H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2M13 3h8v8M21 3 10 14",eye:"M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Z M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0",layers:"m12 3 10 5-10 5L2 8l10-5Zm-9 10 9 5 9-5M3 18l9 5 9-5",sun:"M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0",moon:"M20 14a8 8 0 0 1-10-10A9 9 0 1 0 20 14Z",left:"m14 6-6 6 6 6",right:"m10 6 6 6-6 6",minus:"M5 12h14",plus:"M5 12h14M12 5v14",frame:"M8 3H3v5m13-5h5v5M3 16v5h5m8 0h5v-5M9 9h6v6H9Z",expand:"M8 3H3v5m13-5h5v5M3 16v5h5m8 0h5v-5",mouse:"M8 3h8a3 3 0 0 1 3 3v11a5 5 0 0 1-5 5h-4a5 5 0 0 1-5-5V6a3 3 0 0 1 3-3ZM12 3v7",play:"m8 4 12 8-12 8V4Z",pause:"M8 5v14M16 5v14",compass:"M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-6-3-2 4-4 2 2-4 4-2Z",server:"M4 3h16v7H4ZM4 14h16v7H4ZM7 6.5h.1m-.1 11h.1M11 6.5h6m-6 11h6",cube:"m12 3 9 5v9l-9 5-9-5V8l9-5Zm0 10 9-5M12 13 3 8m9 5v9",shield:"M12 3 3 7v5c0 5 9 10 9 10s9-5 9-10V7l-9-4Zm-5 9 3 3 7-7",book:"M12 5v16M12 5C8 2 3 3 3 3v16s5-1 9 2c4-3 9-2 9-2V3s-5-1-9 2",growth:"m3 17 6-6 4 4 8-10M15 5h6v6M3 22h18",coffee:"M4 8h13v9a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V8Zm13 1h2a3 3 0 0 1 0 6h-2M7 2v3m5-3v3",cup:"M4 8h13v9a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V8Zm13 1h2a3 3 0 0 1 0 6h-2M7 2v3m5-3v3",leaf:"M20 3C10 2 3 6 3 13a7 7 0 0 0 7 7C17 20 21 13 20 3ZM4 20 15 9"};Object.assign(ds,{music:"M9 18V5l11-2v13M9 8l11-2M9 18a3 3 0 1 1-3-3c1.7 0 3 1.3 3 3Zm11-2a3 3 0 1 1-3-3c1.7 0 3 1.3 3 3Z",gym:"m6 6 12 12M4 8l4-4M2 6l4-4M16 20l4-4M18 22l4-4",pool:"M3 20c3-3 3 3 6 0s3 3 6 0 3 3 6 0M5 16V5a2 2 0 0 1 4 0M15 16V5a2 2 0 0 1 4 0M5 8h10M5 13h10",game:"M6 7h12l3 10a2 2 0 0 1-3 2l-3-3H9l-3 3a2 2 0 0 1-3-2L6 7ZM6 11h5M8.5 8.5v5M16 11h.01M18 14h.01",stairs:"M3 21v-6h6V9h6V3h6M3 10l14-8M7 21h14V7"});Object.assign(ds,{route:"M4 21V3m16 18V3M12 3v4m0 3v4m0 3v4",waves:"M2 7c4-4 4 4 8 0s4 4 8 0h4M2 12c4-4 4 4 8 0s4 4 8 0h4M2 17c4-4 4 4 8 0s4 4 8 0h4",mountain:"m2 20 8-16 6 11 3-6 3 11H2Zm5-10 3 2 2-3",landscape:"M3 3h18v18H3ZM3 17l7-9 5 7 3-4 3 6M17 6h.01"});const Mo=n=>`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="${ds[n]||ds.cube}"/></svg>`,nl={waiting:"Ruang operasi · menunggu verifikasi",ascending:"Menuju lantai 3 lewat tangga",returning:"Kembali ke ruang operasi",reviewing:"Meninjau hasil baru · ilustrasi",resting:"Rehat di lantai 3"};function ku({getOffice:n,focusAgent:e,announce:t,onViews:i=()=>{}}){const r=D=>document.querySelector(D),s=new Map,a=new Map;let o=null,c="loading",l="health",d=!1,h=!1,u=!1,m=!1,M=null,w=null;const g=r("#agent-report");r("#agent-cards").innerHTML=cs.map(D=>`<button class="observer-card" id="agent-${D.id}" data-agent="${D.id}" aria-haspopup="dialog"><span class="agent-monogram">${D.short}</span><span class="agent-summary"><b>${D.name}</b><span class="agent-result">Mengambil laporan…</span><span class="agent-checked">Pemeriksaan terakhir: belum ada</span><span class="agent-activity">${nl.waiting}</span></span><span class="report-arrow" aria-hidden="true">↗</span></button>`).join("");for(const D of cs){const N=r("#agent-"+D.id);s.set(D.id,N),N.onclick=()=>y(D.id)}function f(){return yu(o,Date.now(),c)}function P(D){const N=a.get(D.id)||"waiting";return(h?"Gerak dijeda · ":"")+(N==="waiting"&&D.tone==="attention"?"Ruang operasi · perlu perhatian":nl[N])+(N==="resting"?" · "+D.activity:"")}function C(){const D=f().find(k=>k.id===l);if(!D)return;r("#report-name").textContent=D.name,r("#report-result").textContent=D.label+" · "+D.freshness,r("#report-result").dataset.tone=D.tone,r("#report-reason").textContent=D.reason,r("#report-activity").textContent=P(D);const N={time:Mi(D.lastAt),age:io(D.lastAt),source:D.source,code:D.lastCode||"Belum ada",latency:D.latencyMs===null?"Belum ada":D.latencyMs+" ms",release:D.release||"Tidak tercatat pada pemeriksaan ini",cycle:Mi(D.lastCycleAt),next:Mi(D.nextDueAt),received:Mi(w),recorded:D.lastResult};for(const[k,W]of Object.entries(N))r("#report-"+k).textContent=W}function S(){if(u)return;const D=f();for(const k of D){const W=s.get(k.id);W.dataset.tone=k.tone,W.querySelector(".agent-result").textContent=k.label+" · "+k.freshness,W.querySelector(".agent-checked").textContent="Diperiksa "+io(k.lastAt)+" · "+Mi(k.lastAt),W.querySelector(".agent-activity").textContent=P(k),W.setAttribute("aria-label",k.name+". "+k.label+". "+k.freshness+". Buka laporan nyata.")}n()?.updateAgents(D),i(D);const N=c==="loading"?"Mengambil laporan…":c==="session"?"Sesi berakhir. Masuk kembali.":c==="error"?"Koneksi terputus · mencoba lagi setiap 30 detik":o?.source==="observer"?"Laporan VPS · 30 dtk":"Sumber langsung belum tersedia";r("#report-connection").textContent!==N&&(r("#report-connection").textContent=N),r("#refresh-report").disabled=d||m,g.open&&C()}async function E(){if(d||u||document.hidden||m)return;d=!0,M=new AbortController;const D=setTimeout(()=>M?.abort(),12e3);S();try{const N=await fetch("/agent-office/api/report",{credentials:"same-origin",cache:"no-store",signal:M.signal});if(N.status===401){c="session",m=!0;return}if(!N.ok)throw Error("Report unavailable");const k=await N.json();if(!k||!Array.isArray(k.checks)||!k.observer||!["observer","snapshot","unavailable"].includes(k.source))throw Error("Invalid report");o=k,w=Date.now(),c="ready"}catch{u||(c="error")}finally{clearTimeout(D),d=!1,M=null,S()}}function y(D){["health","release"].includes(D)&&(l=D,C(),g.open||g.showModal())}function v(D,N){a.set(D,N);const k=f().find(W=>W.id===D);k&&s.get(D)?.querySelector(".agent-activity")?.replaceChildren(document.createTextNode(P(k))),g.open&&l===D&&C()}function x(){const D=n()?.software,N=D||matchMedia("(prefers-reduced-motion: reduce)").matches;r("#walk").disabled=!n()||N,r("#walk").setAttribute("aria-pressed",String(h)),r("#walk").innerHTML=Mo(h?"play":"pause")+"<span>"+(h?"Lanjutkan gerak karakter":"Jeda gerak karakter")+"</span>",r("#motion-note").textContent=D?"Mode kompatibel: posisi diperbarui tanpa animasi berjalan.":N?"Gerakan disederhanakan sesuai preferensi perangkat.":h?"Gerakan dijeda. Pembacaan laporan tetap berjalan.":"Gerakan mengilustrasikan hasil terakhir · bukan aktivitas langsung"}r("#walk").onclick=()=>{h=!h,n()?.pauseMotion(h),x(),S(),t(h?"Gerakan dijeda; laporan tetap diperbarui.":"Gerakan karakter dilanjutkan.")},r("#refresh-report").onclick=E,r("#report-focus").onclick=()=>{g.close(),e(l)},r("#report-close").onclick=()=>g.close();const p=()=>{document.hidden||(S(),E())};document.addEventListener("visibilitychange",p);const b=matchMedia("(prefers-reduced-motion: reduce)");b.addEventListener("change",x);const A=setInterval(E,3e4),L=setInterval(()=>{document.hidden||S()},5e3),B=()=>{u=!0,M?.abort(),clearInterval(A),clearInterval(L),document.removeEventListener("visibilitychange",p),b.removeEventListener("change",x)};return addEventListener("pagehide",B,{once:!0}),x(),S(),E(),{open:y,move:v,dispose:B,refresh:E}}function Bu(){const n=document.querySelector("#logout"),e=document.querySelector("#session-notice");let t=!1;function i(a){e.textContent=a,e.hidden=!a}async function r(){if(!(document.hidden||t)){t=!0;try{const a=await fetch("/auth/session",{credentials:"same-origin",cache:"no-store",signal:AbortSignal.timeout(12e3)});if(a.status===401){location.replace("/login.html");return}if(!a.ok)throw Error();i("")}catch{i("Koneksi sesi belum tersedia. Periksa koneksi sebelum melanjutkan.")}finally{t=!1}}}n.addEventListener("click",async()=>{if(!n.disabled){n.disabled=!0,n.textContent="Keluar…";try{if(!(await fetch("/auth/logout",{method:"POST",credentials:"same-origin",signal:AbortSignal.timeout(12e3)})).ok)throw Error();location.replace("/login.html")}catch{i("Belum berhasil keluar. Periksa koneksi lalu coba lagi."),n.disabled=!1,n.textContent="Keluar akun"}}}),document.addEventListener("visibilitychange",r),addEventListener("pageshow",r);const s=setInterval(r,6e4);addEventListener("pagehide",()=>clearInterval(s),{once:!0}),r()}const ia="185",ci={ROTATE:0,DOLLY:1,PAN:2},bi={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},sc=0,ro=1,ac=2,gr=1,So=2,Zi=3,Wn=0,jt=1,$t=2,Cn=0,yi=1,so=2,ao=3,oo=4,oc=5,si=100,lc=101,cc=102,uc=103,dc=104,hc=200,fc=201,pc=202,mc=203,hs=204,fs=205,gc=206,_c=207,xc=208,vc=209,Mc=210,Sc=211,bc=212,yc=213,Ec=214,ps=0,ms=1,gs=2,Ai=3,_s=4,xs=5,vs=6,Ms=7,bo=0,Tc=1,Ac=2,Sn=0,yo=1,Eo=2,To=3,ra=4,Ao=5,wo=6,Ro=7,Co=300,ui=301,wi=302,rs=303,ss=304,Lr=306,yr=1e3,Rn=1001,Ss=1002,kt=1003,wc=1004,pr=1005,Gt=1006,as=1007,ai=1008,en=1009,Po=1010,Lo=1011,er=1012,sa=1013,yn=1014,vn=1015,Pn=1016,aa=1017,oa=1018,tr=1020,Do=35902,Io=35899,Uo=1021,No=1022,dn=1023,Ln=1026,oi=1027,Fo=1028,la=1029,di=1030,ca=1031,ua=1033,_r=33776,xr=33777,vr=33778,Mr=33779,bs=35840,ys=35841,Es=35842,Ts=35843,As=36196,ws=37492,Rs=37496,Cs=37488,Ps=37489,Er=37490,Ls=37491,Ds=37808,Is=37809,Us=37810,Ns=37811,Fs=37812,Os=37813,ks=37814,Bs=37815,zs=37816,Gs=37817,Vs=37818,Hs=37819,Ws=37820,Xs=37821,qs=36492,Ys=36494,Ks=36495,Zs=36283,$s=36284,Tr=36285,js=36286,Rc=3200,Js=0,Cc=1,Bn="",zt="srgb",Ar="srgb-linear",wr="linear",gt="srgb",vi=7680,lo=519,Pc=512,Lc=513,Dc=514,da=515,Ic=516,Uc=517,ha=518,Nc=519,co=35044,uo="300 es",Mn=2e3,nr=2001;function zu(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function Qs(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function Fc(){const n=Qs("canvas");return n.style.display="block",n}const il={};function ho(...n){const e="THREE."+n.shift();console.log(e,...n)}function Oc(n){const e=n[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=n[1];t&&t.isStackTrace?n[0]+=" "+t.getLocation():n[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return n}function Ke(...n){n=Oc(n);const e="THREE."+n.shift();{const t=n[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...n)}}function ft(...n){n=Oc(n);const e="THREE."+n.shift();{const t=n[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...n)}}function Ei(...n){const e=n.join(" ");e in il||(il[e]=!0,Ke(...n))}function Gu(n,e,t){return new Promise(function(i,r){function s(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:r();break;case n.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:i()}}setTimeout(s,t)})}const Vu={[ps]:ms,[gs]:vs,[_s]:Ms,[Ai]:xs,[ms]:ps,[vs]:gs,[Ms]:_s,[xs]:Ai};class Yn{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){const i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){const i=this._listeners;if(i===void 0)return;const r=i[e];if(r!==void 0){const s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const i=t[e.type];if(i!==void 0){e.target=this;const r=i.slice(0);for(let s=0,a=r.length;s<a;s++)r[s].call(this,e);e.target=null}}}const Xt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let rl=1234567;const Sr=Math.PI/180,Rr=180/Math.PI;function rr(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Xt[n&255]+Xt[n>>8&255]+Xt[n>>16&255]+Xt[n>>24&255]+"-"+Xt[e&255]+Xt[e>>8&255]+"-"+Xt[e>>16&15|64]+Xt[e>>24&255]+"-"+Xt[t&63|128]+Xt[t>>8&255]+"-"+Xt[t>>16&255]+Xt[t>>24&255]+Xt[i&255]+Xt[i>>8&255]+Xt[i>>16&255]+Xt[i>>24&255]).toLowerCase()}function ut(n,e,t){return Math.max(e,Math.min(t,n))}function Oo(n,e){return(n%e+e)%e}function Hu(n,e,t,i,r){return i+(n-e)*(r-i)/(t-e)}function Wu(n,e,t){return n!==e?(t-n)/(e-n):0}function br(n,e,t){return(1-t)*n+t*e}function Xu(n,e,t,i){return br(n,e,1-Math.exp(-t*i))}function qu(n,e=1){return e-Math.abs(Oo(n,e*2)-e)}function Yu(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*(3-2*n))}function Ku(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*n*(n*(n*6-15)+10))}function Zu(n,e){return n+Math.floor(Math.random()*(e-n+1))}function $u(n,e){return n+Math.random()*(e-n)}function ju(n){return n*(.5-Math.random())}function Ju(n){n!==void 0&&(rl=n);let e=rl+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Qu(n){return n*Sr}function ed(n){return n*Rr}function td(n){return(n&n-1)===0&&n!==0}function nd(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function id(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function rd(n,e,t,i,r){const s=Math.cos,a=Math.sin,o=s(t/2),c=a(t/2),l=s((e+i)/2),d=a((e+i)/2),h=s((e-i)/2),u=a((e-i)/2),m=s((i-e)/2),M=a((i-e)/2);switch(r){case"XYX":n.set(o*d,c*h,c*u,o*l);break;case"YZY":n.set(c*u,o*d,c*h,o*l);break;case"ZXZ":n.set(c*h,c*u,o*d,o*l);break;case"XZX":n.set(o*d,c*M,c*m,o*l);break;case"YXY":n.set(c*m,o*d,c*M,o*l);break;case"ZYZ":n.set(c*M,c*m,o*d,o*l);break;default:Ke("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}}function Yi(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function Kt(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}const ea={DEG2RAD:Sr,RAD2DEG:Rr,generateUUID:rr,clamp:ut,euclideanModulo:Oo,mapLinear:Hu,inverseLerp:Wu,lerp:br,damp:Xu,pingpong:qu,smoothstep:Yu,smootherstep:Ku,randInt:Zu,randFloat:$u,randFloatSpread:ju,seededRandom:Ju,degToRad:Qu,radToDeg:ed,isPowerOfTwo:td,ceilPowerOfTwo:nd,floorPowerOfTwo:id,setQuaternionFromProperEuler:rd,normalize:Kt,denormalize:Yi};class He{static{He.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6],this.y=r[1]*t+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=ut(this.x,e.x,t.x),this.y=ut(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=ut(this.x,e,t),this.y=ut(this.y,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(ut(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(ut(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),r=Math.sin(t),s=this.x-e.x,a=this.y-e.y;return this.x=s*i-a*r+e.x,this.y=s*r+a*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Xn{constructor(e=0,t=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=r}static slerpFlat(e,t,i,r,s,a,o){let c=i[r+0],l=i[r+1],d=i[r+2],h=i[r+3],u=s[a+0],m=s[a+1],M=s[a+2],w=s[a+3];if(h!==w||c!==u||l!==m||d!==M){let g=c*u+l*m+d*M+h*w;g<0&&(u=-u,m=-m,M=-M,w=-w,g=-g);let f=1-o;if(g<.9995){const P=Math.acos(g),C=Math.sin(P);f=Math.sin(f*P)/C,o=Math.sin(o*P)/C,c=c*f+u*o,l=l*f+m*o,d=d*f+M*o,h=h*f+w*o}else{c=c*f+u*o,l=l*f+m*o,d=d*f+M*o,h=h*f+w*o;const P=1/Math.sqrt(c*c+l*l+d*d+h*h);c*=P,l*=P,d*=P,h*=P}}e[t]=c,e[t+1]=l,e[t+2]=d,e[t+3]=h}static multiplyQuaternionsFlat(e,t,i,r,s,a){const o=i[r],c=i[r+1],l=i[r+2],d=i[r+3],h=s[a],u=s[a+1],m=s[a+2],M=s[a+3];return e[t]=o*M+d*h+c*m-l*u,e[t+1]=c*M+d*u+l*h-o*m,e[t+2]=l*M+d*m+o*u-c*h,e[t+3]=d*M-o*h-c*u-l*m,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,r){return this._x=e,this._y=t,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,r=e._y,s=e._z,a=e._order,o=Math.cos,c=Math.sin,l=o(i/2),d=o(r/2),h=o(s/2),u=c(i/2),m=c(r/2),M=c(s/2);switch(a){case"XYZ":this._x=u*d*h+l*m*M,this._y=l*m*h-u*d*M,this._z=l*d*M+u*m*h,this._w=l*d*h-u*m*M;break;case"YXZ":this._x=u*d*h+l*m*M,this._y=l*m*h-u*d*M,this._z=l*d*M-u*m*h,this._w=l*d*h+u*m*M;break;case"ZXY":this._x=u*d*h-l*m*M,this._y=l*m*h+u*d*M,this._z=l*d*M+u*m*h,this._w=l*d*h-u*m*M;break;case"ZYX":this._x=u*d*h-l*m*M,this._y=l*m*h+u*d*M,this._z=l*d*M-u*m*h,this._w=l*d*h+u*m*M;break;case"YZX":this._x=u*d*h+l*m*M,this._y=l*m*h+u*d*M,this._z=l*d*M-u*m*h,this._w=l*d*h-u*m*M;break;case"XZY":this._x=u*d*h-l*m*M,this._y=l*m*h-u*d*M,this._z=l*d*M+u*m*h,this._w=l*d*h+u*m*M;break;default:Ke("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],r=t[4],s=t[8],a=t[1],o=t[5],c=t[9],l=t[2],d=t[6],h=t[10],u=i+o+h;if(u>0){const m=.5/Math.sqrt(u+1);this._w=.25/m,this._x=(d-c)*m,this._y=(s-l)*m,this._z=(a-r)*m}else if(i>o&&i>h){const m=2*Math.sqrt(1+i-o-h);this._w=(d-c)/m,this._x=.25*m,this._y=(r+a)/m,this._z=(s+l)/m}else if(o>h){const m=2*Math.sqrt(1+o-i-h);this._w=(s-l)/m,this._x=(r+a)/m,this._y=.25*m,this._z=(c+d)/m}else{const m=2*Math.sqrt(1+h-i-o);this._w=(a-r)/m,this._x=(s+l)/m,this._y=(c+d)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(ut(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const r=Math.min(1,t/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,r=e._y,s=e._z,a=e._w,o=t._x,c=t._y,l=t._z,d=t._w;return this._x=i*d+a*o+r*l-s*c,this._y=r*d+a*c+s*o-i*l,this._z=s*d+a*l+i*c-r*o,this._w=a*d-i*o-r*c-s*l,this._onChangeCallback(),this}slerp(e,t){let i=e._x,r=e._y,s=e._z,a=e._w,o=this.dot(e);o<0&&(i=-i,r=-r,s=-s,a=-a,o=-o);let c=1-t;if(o<.9995){const l=Math.acos(o),d=Math.sin(l);c=Math.sin(c*l)/d,t=Math.sin(t*l)/d,this._x=this._x*c+i*t,this._y=this._y*c+r*t,this._z=this._z*c+s*t,this._w=this._w*c+a*t,this._onChangeCallback()}else this._x=this._x*c+i*t,this._y=this._y*c+r*t,this._z=this._z*c+s*t,this._w=this._w*c+a*t,this.normalize();return this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class G{static{G.prototype.isVector3=!0}constructor(e=0,t=0,i=0){this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(sl.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(sl.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6]*r,this.y=s[1]*t+s[4]*i+s[7]*r,this.z=s[2]*t+s[5]*i+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=e.elements,a=1/(s[3]*t+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*i+s[8]*r+s[12])*a,this.y=(s[1]*t+s[5]*i+s[9]*r+s[13])*a,this.z=(s[2]*t+s[6]*i+s[10]*r+s[14])*a,this}applyQuaternion(e){const t=this.x,i=this.y,r=this.z,s=e.x,a=e.y,o=e.z,c=e.w,l=2*(a*r-o*i),d=2*(o*t-s*r),h=2*(s*i-a*t);return this.x=t+c*l+a*h-o*d,this.y=i+c*d+o*l-s*h,this.z=r+c*h+s*d-a*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*i+s[8]*r,this.y=s[1]*t+s[5]*i+s[9]*r,this.z=s[2]*t+s[6]*i+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=ut(this.x,e.x,t.x),this.y=ut(this.y,e.y,t.y),this.z=ut(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=ut(this.x,e,t),this.y=ut(this.y,e,t),this.z=ut(this.z,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(ut(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,r=e.y,s=e.z,a=t.x,o=t.y,c=t.z;return this.x=r*c-s*o,this.y=s*a-i*c,this.z=i*o-r*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return wa.copy(this).projectOnVector(e),this.sub(wa)}reflect(e){return this.sub(wa.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(ut(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return t*t+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const r=Math.sin(t)*e;return this.x=r*Math.sin(i),this.y=Math.cos(t)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const wa=new G,sl=new Xn;class je{static{je.prototype.isMatrix3=!0}constructor(e,t,i,r,s,a,o,c,l){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,a,o,c,l)}set(e,t,i,r,s,a,o,c,l){const d=this.elements;return d[0]=e,d[1]=r,d[2]=o,d[3]=t,d[4]=s,d[5]=c,d[6]=i,d[7]=a,d[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,a=i[0],o=i[3],c=i[6],l=i[1],d=i[4],h=i[7],u=i[2],m=i[5],M=i[8],w=r[0],g=r[3],f=r[6],P=r[1],C=r[4],S=r[7],E=r[2],y=r[5],v=r[8];return s[0]=a*w+o*P+c*E,s[3]=a*g+o*C+c*y,s[6]=a*f+o*S+c*v,s[1]=l*w+d*P+h*E,s[4]=l*g+d*C+h*y,s[7]=l*f+d*S+h*v,s[2]=u*w+m*P+M*E,s[5]=u*g+m*C+M*y,s[8]=u*f+m*S+M*v,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],d=e[8];return t*a*d-t*o*l-i*s*d+i*o*c+r*s*l-r*a*c}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],d=e[8],h=d*a-o*l,u=o*c-d*s,m=l*s-a*c,M=t*h+i*u+r*m;if(M===0)return this.set(0,0,0,0,0,0,0,0,0);const w=1/M;return e[0]=h*w,e[1]=(r*l-d*i)*w,e[2]=(o*i-r*a)*w,e[3]=u*w,e[4]=(d*t-r*c)*w,e[5]=(r*s-o*t)*w,e[6]=m*w,e[7]=(i*c-l*t)*w,e[8]=(a*t-i*s)*w,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,r,s,a,o){const c=Math.cos(s),l=Math.sin(s);return this.set(i*c,i*l,-i*(c*a+l*o)+a+e,-r*l,r*c,-r*(-l*a+c*o)+o+t,0,0,1),this}scale(e,t){return Ei("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Ra.makeScale(e,t)),this}rotate(e){return Ei("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Ra.makeRotation(-e)),this}translate(e,t){return Ei("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Ra.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<9;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Ra=new je,al=new je().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),ol=new je().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function sd(){const n={enabled:!0,workingColorSpace:Ar,spaces:{},convert:function(r,s,a){return this.enabled===!1||s===a||!s||!a||(this.spaces[s].transfer===gt&&(r.r=Vn(r.r),r.g=Vn(r.g),r.b=Vn(r.b)),this.spaces[s].primaries!==this.spaces[a].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===gt&&(r.r=ji(r.r),r.g=ji(r.g),r.b=ji(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===Bn?wr:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,a){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,s){return Ei("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(r,s)},toWorkingColorSpace:function(r,s){return Ei("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(r,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[Ar]:{primaries:e,whitePoint:i,transfer:wr,toXYZ:al,fromXYZ:ol,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:zt},outputColorSpaceConfig:{drawingBufferColorSpace:zt}},[zt]:{primaries:e,whitePoint:i,transfer:gt,toXYZ:al,fromXYZ:ol,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:zt}}}),n}const ht=sd();function Vn(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function ji(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let Ui;class kc{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{Ui===void 0&&(Ui=Qs("canvas")),Ui.width=e.width,Ui.height=e.height;const r=Ui.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),i=Ui}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Qs("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const r=i.getImageData(0,0,e.width,e.height),s=r.data;for(let a=0;a<s.length;a++)s[a]=Vn(s[a]/255)*255;return i.putImageData(r,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(Vn(t[i]/255)*255):t[i]=Vn(t[i]);return{data:t,width:e.width,height:e.height}}else return Ke("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let ad=0;class fa{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:ad++}),this.uuid=rr(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let a=0,o=r.length;a<o;a++)r[a].isDataTexture?s.push(Ca(r[a].image)):s.push(Ca(r[a]))}else s=Ca(r);i.url=s}return t||(e.images[this.uuid]=i),i}}function Ca(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?kc.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(Ke("Texture: Unable to serialize Texture."),{})}let od=0;const Pa=new G;class Vt extends Yn{constructor(e=Vt.DEFAULT_IMAGE,t=Vt.DEFAULT_MAPPING,i=Rn,r=Rn,s=Gt,a=ai,o=dn,c=en,l=Vt.DEFAULT_ANISOTROPY,d=Bn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:od++}),this.uuid=rr(),this.name="",this.source=new fa(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new He(0,0),this.repeat=new He(1,1),this.center=new He(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new je,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=d,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Pa).x}get height(){return this.source.getSize(Pa).y}get depth(){return this.source.getSize(Pa).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const i=e[t];if(i===void 0){Ke(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){Ke(`Texture.setValues(): property '${t}' does not exist.`);continue}r&&i&&r.isVector2&&i.isVector2||r&&i&&r.isVector3&&i.isVector3||r&&i&&r.isMatrix3&&i.isMatrix3?r.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Co)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case yr:e.x=e.x-Math.floor(e.x);break;case Rn:e.x=e.x<0?0:1;break;case Ss:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case yr:e.y=e.y-Math.floor(e.y);break;case Rn:e.y=e.y<0?0:1;break;case Ss:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Vt.DEFAULT_IMAGE=null;Vt.DEFAULT_MAPPING=Co;Vt.DEFAULT_ANISOTROPY=1;class mt{static{mt.prototype.isVector4=!0}constructor(e=0,t=0,i=0,r=1){this.x=e,this.y=t,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,r){return this.x=e,this.y=t,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=this.w,a=e.elements;return this.x=a[0]*t+a[4]*i+a[8]*r+a[12]*s,this.y=a[1]*t+a[5]*i+a[9]*r+a[13]*s,this.z=a[2]*t+a[6]*i+a[10]*r+a[14]*s,this.w=a[3]*t+a[7]*i+a[11]*r+a[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,r,s;const c=e.elements,l=c[0],d=c[4],h=c[8],u=c[1],m=c[5],M=c[9],w=c[2],g=c[6],f=c[10];if(Math.abs(d-u)<.01&&Math.abs(h-w)<.01&&Math.abs(M-g)<.01){if(Math.abs(d+u)<.1&&Math.abs(h+w)<.1&&Math.abs(M+g)<.1&&Math.abs(l+m+f-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const C=(l+1)/2,S=(m+1)/2,E=(f+1)/2,y=(d+u)/4,v=(h+w)/4,x=(M+g)/4;return C>S&&C>E?C<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(C),r=y/i,s=v/i):S>E?S<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(S),i=y/r,s=x/r):E<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(E),i=v/s,r=x/s),this.set(i,r,s,t),this}let P=Math.sqrt((g-M)*(g-M)+(h-w)*(h-w)+(u-d)*(u-d));return Math.abs(P)<.001&&(P=1),this.x=(g-M)/P,this.y=(h-w)/P,this.z=(u-d)/P,this.w=Math.acos((l+m+f-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=ut(this.x,e.x,t.x),this.y=ut(this.y,e.y,t.y),this.z=ut(this.z,e.z,t.z),this.w=ut(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=ut(this.x,e,t),this.y=ut(this.y,e,t),this.z=ut(this.z,e,t),this.w=ut(this.w,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(ut(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Bc extends Yn{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Gt,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new mt(0,0,e,t),this.scissorTest=!1,this.viewport=new mt(0,0,e,t),this.textures=[];const r={width:e,height:t,depth:i.depth},s=new Vt(r),a=i.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview,this.useArrayDepthTexture=i.useArrayDepthTexture}_setTextureOptions(e={}){const t={minFilter:Gt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=i,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const r=Object.assign({},e.textures[t].image);this.textures[t].source=new fa(r)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class bn extends Bc{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class ko extends Vt{constructor(e=null,t=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=kt,this.minFilter=kt,this.wrapR=Rn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class zc extends Vt{constructor(e=null,t=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=kt,this.minFilter=kt,this.wrapR=Rn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class _t{static{_t.prototype.isMatrix4=!0}constructor(e,t,i,r,s,a,o,c,l,d,h,u,m,M,w,g){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,a,o,c,l,d,h,u,m,M,w,g)}set(e,t,i,r,s,a,o,c,l,d,h,u,m,M,w,g){const f=this.elements;return f[0]=e,f[4]=t,f[8]=i,f[12]=r,f[1]=s,f[5]=a,f[9]=o,f[13]=c,f[2]=l,f[6]=d,f[10]=h,f[14]=u,f[3]=m,f[7]=M,f[11]=w,f[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new _t().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),i.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();const t=this.elements,i=e.elements,r=1/Ni.setFromMatrixColumn(e,0).length(),s=1/Ni.setFromMatrixColumn(e,1).length(),a=1/Ni.setFromMatrixColumn(e,2).length();return t[0]=i[0]*r,t[1]=i[1]*r,t[2]=i[2]*r,t[3]=0,t[4]=i[4]*s,t[5]=i[5]*s,t[6]=i[6]*s,t[7]=0,t[8]=i[8]*a,t[9]=i[9]*a,t[10]=i[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,r=e.y,s=e.z,a=Math.cos(i),o=Math.sin(i),c=Math.cos(r),l=Math.sin(r),d=Math.cos(s),h=Math.sin(s);if(e.order==="XYZ"){const u=a*d,m=a*h,M=o*d,w=o*h;t[0]=c*d,t[4]=-c*h,t[8]=l,t[1]=m+M*l,t[5]=u-w*l,t[9]=-o*c,t[2]=w-u*l,t[6]=M+m*l,t[10]=a*c}else if(e.order==="YXZ"){const u=c*d,m=c*h,M=l*d,w=l*h;t[0]=u+w*o,t[4]=M*o-m,t[8]=a*l,t[1]=a*h,t[5]=a*d,t[9]=-o,t[2]=m*o-M,t[6]=w+u*o,t[10]=a*c}else if(e.order==="ZXY"){const u=c*d,m=c*h,M=l*d,w=l*h;t[0]=u-w*o,t[4]=-a*h,t[8]=M+m*o,t[1]=m+M*o,t[5]=a*d,t[9]=w-u*o,t[2]=-a*l,t[6]=o,t[10]=a*c}else if(e.order==="ZYX"){const u=a*d,m=a*h,M=o*d,w=o*h;t[0]=c*d,t[4]=M*l-m,t[8]=u*l+w,t[1]=c*h,t[5]=w*l+u,t[9]=m*l-M,t[2]=-l,t[6]=o*c,t[10]=a*c}else if(e.order==="YZX"){const u=a*c,m=a*l,M=o*c,w=o*l;t[0]=c*d,t[4]=w-u*h,t[8]=M*h+m,t[1]=h,t[5]=a*d,t[9]=-o*d,t[2]=-l*d,t[6]=m*h+M,t[10]=u-w*h}else if(e.order==="XZY"){const u=a*c,m=a*l,M=o*c,w=o*l;t[0]=c*d,t[4]=-h,t[8]=l*d,t[1]=u*h+w,t[5]=a*d,t[9]=m*h-M,t[2]=M*h-m,t[6]=o*d,t[10]=w*h+u}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(ld,e,cd)}lookAt(e,t,i){const r=this.elements;return rn.subVectors(e,t),rn.lengthSq()===0&&(rn.z=1),rn.normalize(),Jn.crossVectors(i,rn),Jn.lengthSq()===0&&(Math.abs(i.z)===1?rn.x+=1e-4:rn.z+=1e-4,rn.normalize(),Jn.crossVectors(i,rn)),Jn.normalize(),Nr.crossVectors(rn,Jn),r[0]=Jn.x,r[4]=Nr.x,r[8]=rn.x,r[1]=Jn.y,r[5]=Nr.y,r[9]=rn.y,r[2]=Jn.z,r[6]=Nr.z,r[10]=rn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,a=i[0],o=i[4],c=i[8],l=i[12],d=i[1],h=i[5],u=i[9],m=i[13],M=i[2],w=i[6],g=i[10],f=i[14],P=i[3],C=i[7],S=i[11],E=i[15],y=r[0],v=r[4],x=r[8],p=r[12],b=r[1],A=r[5],L=r[9],B=r[13],D=r[2],N=r[6],k=r[10],W=r[14],$=r[3],re=r[7],me=r[11],be=r[15];return s[0]=a*y+o*b+c*D+l*$,s[4]=a*v+o*A+c*N+l*re,s[8]=a*x+o*L+c*k+l*me,s[12]=a*p+o*B+c*W+l*be,s[1]=d*y+h*b+u*D+m*$,s[5]=d*v+h*A+u*N+m*re,s[9]=d*x+h*L+u*k+m*me,s[13]=d*p+h*B+u*W+m*be,s[2]=M*y+w*b+g*D+f*$,s[6]=M*v+w*A+g*N+f*re,s[10]=M*x+w*L+g*k+f*me,s[14]=M*p+w*B+g*W+f*be,s[3]=P*y+C*b+S*D+E*$,s[7]=P*v+C*A+S*N+E*re,s[11]=P*x+C*L+S*k+E*me,s[15]=P*p+C*B+S*W+E*be,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],r=e[8],s=e[12],a=e[1],o=e[5],c=e[9],l=e[13],d=e[2],h=e[6],u=e[10],m=e[14],M=e[3],w=e[7],g=e[11],f=e[15],P=c*m-l*u,C=o*m-l*h,S=o*u-c*h,E=a*m-l*d,y=a*u-c*d,v=a*h-o*d;return t*(w*P-g*C+f*S)-i*(M*P-g*E+f*y)+r*(M*C-w*E+f*v)-s*(M*S-w*y+g*v)}determinantAffine(){const e=this.elements,t=e[0],i=e[4],r=e[8],s=e[1],a=e[5],o=e[9],c=e[2],l=e[6],d=e[10];return t*(a*d-o*l)-i*(s*d-o*c)+r*(s*l-a*c)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],d=e[8],h=e[9],u=e[10],m=e[11],M=e[12],w=e[13],g=e[14],f=e[15],P=t*o-i*a,C=t*c-r*a,S=t*l-s*a,E=i*c-r*o,y=i*l-s*o,v=r*l-s*c,x=d*w-h*M,p=d*g-u*M,b=d*f-m*M,A=h*g-u*w,L=h*f-m*w,B=u*f-m*g,D=P*B-C*L+S*A+E*b-y*p+v*x;if(D===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const N=1/D;return e[0]=(o*B-c*L+l*A)*N,e[1]=(r*L-i*B-s*A)*N,e[2]=(w*v-g*y+f*E)*N,e[3]=(u*y-h*v-m*E)*N,e[4]=(c*b-a*B-l*p)*N,e[5]=(t*B-r*b+s*p)*N,e[6]=(g*S-M*v-f*C)*N,e[7]=(d*v-u*S+m*C)*N,e[8]=(a*L-o*b+l*x)*N,e[9]=(i*b-t*L-s*x)*N,e[10]=(M*y-w*S+f*P)*N,e[11]=(h*S-d*y-m*P)*N,e[12]=(o*p-a*A-c*x)*N,e[13]=(t*A-i*p+r*x)*N,e[14]=(w*C-M*E-g*P)*N,e[15]=(d*E-h*C+u*P)*N,this}scale(e){const t=this.elements,i=e.x,r=e.y,s=e.z;return t[0]*=i,t[4]*=r,t[8]*=s,t[1]*=i,t[5]*=r,t[9]*=s,t[2]*=i,t[6]*=r,t[10]*=s,t[3]*=i,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,r))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),r=Math.sin(t),s=1-i,a=e.x,o=e.y,c=e.z,l=s*a,d=s*o;return this.set(l*a+i,l*o-r*c,l*c+r*o,0,l*o+r*c,d*o+i,d*c-r*a,0,l*c-r*o,d*c+r*a,s*c*c+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,r,s,a){return this.set(1,i,s,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,i){const r=this.elements,s=t._x,a=t._y,o=t._z,c=t._w,l=s+s,d=a+a,h=o+o,u=s*l,m=s*d,M=s*h,w=a*d,g=a*h,f=o*h,P=c*l,C=c*d,S=c*h,E=i.x,y=i.y,v=i.z;return r[0]=(1-(w+f))*E,r[1]=(m+S)*E,r[2]=(M-C)*E,r[3]=0,r[4]=(m-S)*y,r[5]=(1-(u+f))*y,r[6]=(g+P)*y,r[7]=0,r[8]=(M+C)*v,r[9]=(g-P)*v,r[10]=(1-(u+w))*v,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,i){const r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];const s=this.determinantAffine();if(s===0)return i.set(1,1,1),t.identity(),this;let a=Ni.set(r[0],r[1],r[2]).length();const o=Ni.set(r[4],r[5],r[6]).length(),c=Ni.set(r[8],r[9],r[10]).length();s<0&&(a=-a),pn.copy(this);const l=1/a,d=1/o,h=1/c;return pn.elements[0]*=l,pn.elements[1]*=l,pn.elements[2]*=l,pn.elements[4]*=d,pn.elements[5]*=d,pn.elements[6]*=d,pn.elements[8]*=h,pn.elements[9]*=h,pn.elements[10]*=h,t.setFromRotationMatrix(pn),i.x=a,i.y=o,i.z=c,this}makePerspective(e,t,i,r,s,a,o=Mn,c=!1){const l=this.elements,d=2*s/(t-e),h=2*s/(i-r),u=(t+e)/(t-e),m=(i+r)/(i-r);let M,w;if(c)M=s/(a-s),w=a*s/(a-s);else if(o===Mn)M=-(a+s)/(a-s),w=-2*a*s/(a-s);else if(o===nr)M=-a/(a-s),w=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=d,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=h,l[9]=m,l[13]=0,l[2]=0,l[6]=0,l[10]=M,l[14]=w,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,i,r,s,a,o=Mn,c=!1){const l=this.elements,d=2/(t-e),h=2/(i-r),u=-(t+e)/(t-e),m=-(i+r)/(i-r);let M,w;if(c)M=1/(a-s),w=a/(a-s);else if(o===Mn)M=-2/(a-s),w=-(a+s)/(a-s);else if(o===nr)M=-1/(a-s),w=-s/(a-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=d,l[4]=0,l[8]=0,l[12]=u,l[1]=0,l[5]=h,l[9]=0,l[13]=m,l[2]=0,l[6]=0,l[10]=M,l[14]=w,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<16;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}}const Ni=new G,pn=new _t,ld=new G(0,0,0),cd=new G(1,1,1),Jn=new G,Nr=new G,rn=new G,ll=new _t,cl=new Xn;class qn{constructor(e=0,t=0,i=0,r=qn.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,r=this._order){return this._x=e,this._y=t,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const r=e.elements,s=r[0],a=r[4],o=r[8],c=r[1],l=r[5],d=r[9],h=r[2],u=r[6],m=r[10];switch(t){case"XYZ":this._y=Math.asin(ut(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-d,m),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(u,l),this._z=0);break;case"YXZ":this._x=Math.asin(-ut(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(o,m),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-h,s),this._z=0);break;case"ZXY":this._x=Math.asin(ut(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-h,m),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,s));break;case"ZYX":this._y=Math.asin(-ut(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(u,m),this._z=Math.atan2(c,s)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(ut(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-d,l),this._y=Math.atan2(-h,s)):(this._x=0,this._y=Math.atan2(o,m));break;case"XZY":this._z=Math.asin(-ut(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(u,l),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-d,m),this._y=0);break;default:Ke("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return ll.makeRotationFromQuaternion(e),this.setFromRotationMatrix(ll,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return cl.setFromEuler(this),this.setFromQuaternion(cl,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}qn.DEFAULT_ORDER="XYZ";class pa{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let ud=0;const ul=new G,Fi=new Xn,In=new _t,Fr=new G,lr=new G,dd=new G,hd=new Xn,dl=new G(1,0,0),hl=new G(0,1,0),fl=new G(0,0,1),pl={type:"added"},fd={type:"removed"},Oi={type:"childadded",child:null},La={type:"childremoved",child:null};class Bt extends Yn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:ud++}),this.uuid=rr(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Bt.DEFAULT_UP.clone();const e=new G,t=new qn,i=new Xn,r=new G(1,1,1);function s(){i.setFromEuler(t,!1)}function a(){t.setFromQuaternion(i,void 0,!1)}t._onChange(s),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new _t},normalMatrix:{value:new je}}),this.matrix=new _t,this.matrixWorld=new _t,this.matrixAutoUpdate=Bt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Bt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new pa,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Fi.setFromAxisAngle(e,t),this.quaternion.multiply(Fi),this}rotateOnWorldAxis(e,t){return Fi.setFromAxisAngle(e,t),this.quaternion.premultiply(Fi),this}rotateX(e){return this.rotateOnAxis(dl,e)}rotateY(e){return this.rotateOnAxis(hl,e)}rotateZ(e){return this.rotateOnAxis(fl,e)}translateOnAxis(e,t){return ul.copy(e).applyQuaternion(this.quaternion),this.position.add(ul.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(dl,e)}translateY(e){return this.translateOnAxis(hl,e)}translateZ(e){return this.translateOnAxis(fl,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(In.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?Fr.copy(e):Fr.set(e,t,i);const r=this.parent;this.updateWorldMatrix(!0,!1),lr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?In.lookAt(lr,Fr,this.up):In.lookAt(Fr,lr,this.up),this.quaternion.setFromRotationMatrix(In),r&&(In.extractRotation(r.matrixWorld),Fi.setFromRotationMatrix(In),this.quaternion.premultiply(Fi.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(ft("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(pl),Oi.child=e,this.dispatchEvent(Oi),Oi.child=null):ft("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(fd),La.child=e,this.dispatchEvent(La),La.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),In.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),In.multiply(e.parent.matrixWorld)),e.applyMatrix4(In),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(pl),Oi.child=e,this.dispatchEvent(Oi),Oi.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,r=this.children.length;i<r;i++){const a=this.children[i].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(lr,e,dd),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(lr,hd,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,i=e.y,r=e.z,s=this.matrix.elements;s[12]+=t-s[0]*t-s[4]*i-s[8]*r,s[13]+=i-s[1]*t-s[5]*i-s[9]*r,s[14]+=r-s[2]*t-s[6]*i-s[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t,i=!1){const r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||i)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,i=!0),t===!0){const s=this.children;for(let a=0,o=s.length;a<o;a++)s[a].updateWorldMatrix(!1,!0,i)}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),this.static!==!1&&(r.static=this.static),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(o=>({...o})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function s(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const c=o.shapes;if(Array.isArray(c))for(let l=0,d=c.length;l<d;l++){const h=c[l];s(e.shapes,h)}else s(e.shapes,c)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(s(e.materials,this.material[c]));r.material=o}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){const c=this.animations[o];r.animations.push(s(e.animations,c))}}if(t){const o=a(e.geometries),c=a(e.materials),l=a(e.textures),d=a(e.images),h=a(e.shapes),u=a(e.skeletons),m=a(e.animations),M=a(e.nodes);o.length>0&&(i.geometries=o),c.length>0&&(i.materials=c),l.length>0&&(i.textures=l),d.length>0&&(i.images=d),h.length>0&&(i.shapes=h),u.length>0&&(i.skeletons=u),m.length>0&&(i.animations=m),M.length>0&&(i.nodes=M)}return i.object=r,i;function a(o){const c=[];for(const l in o){const d=o[l];delete d.metadata,c.push(d)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const r=e.children[i];this.add(r.clone())}return this}}Bt.DEFAULT_UP=new G(0,1,0);Bt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Bt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class _n extends Bt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const pd={type:"move"};class os{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new _n,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new _n,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new G,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new G),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new _n,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new G,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new G,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let r=null,s=null,a=null;const o=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){a=!0;for(const w of e.hand.values()){const g=t.getJointPose(w,i),f=this._getHandJoint(l,w);g!==null&&(f.matrix.fromArray(g.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=g.radius),f.visible=g!==null}const d=l.joints["index-finger-tip"],h=l.joints["thumb-tip"],u=d.position.distanceTo(h.position),m=.02,M=.005;l.inputState.pinching&&u>m+M?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&u<=m-M&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,i),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1,c.eventsEnabled&&c.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(r=t.getPose(e.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(pd)))}return o!==null&&(o.visible=r!==null),c!==null&&(c.visible=s!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new _n;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}const Gc={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Qn={h:0,s:0,l:0},Or={h:0,s:0,l:0};function Da(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class Je{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=zt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,ht.colorSpaceToWorking(this,t),this}setRGB(e,t,i,r=ht.workingColorSpace){return this.r=e,this.g=t,this.b=i,ht.colorSpaceToWorking(this,r),this}setHSL(e,t,i,r=ht.workingColorSpace){if(e=Oo(e,1),t=ut(t,0,1),i=ut(i,0,1),t===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+t):i+t-i*t,a=2*i-s;this.r=Da(a,s,e+1/3),this.g=Da(a,s,e),this.b=Da(a,s,e-1/3)}return ht.colorSpaceToWorking(this,r),this}setStyle(e,t=zt){function i(s){s!==void 0&&parseFloat(s)<1&&Ke("Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const a=r[1],o=r[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:Ke("Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(s,16),t);Ke("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=zt){const i=Gc[e.toLowerCase()];return i!==void 0?this.setHex(i,t):Ke("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Vn(e.r),this.g=Vn(e.g),this.b=Vn(e.b),this}copyLinearToSRGB(e){return this.r=ji(e.r),this.g=ji(e.g),this.b=ji(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=zt){return ht.workingToColorSpace(qt.copy(this),e),Math.round(ut(qt.r*255,0,255))*65536+Math.round(ut(qt.g*255,0,255))*256+Math.round(ut(qt.b*255,0,255))}getHexString(e=zt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=ht.workingColorSpace){ht.workingToColorSpace(qt.copy(this),t);const i=qt.r,r=qt.g,s=qt.b,a=Math.max(i,r,s),o=Math.min(i,r,s);let c,l;const d=(o+a)/2;if(o===a)c=0,l=0;else{const h=a-o;switch(l=d<=.5?h/(a+o):h/(2-a-o),a){case i:c=(r-s)/h+(r<s?6:0);break;case r:c=(s-i)/h+2;break;case s:c=(i-r)/h+4;break}c/=6}return e.h=c,e.s=l,e.l=d,e}getRGB(e,t=ht.workingColorSpace){return ht.workingToColorSpace(qt.copy(this),t),e.r=qt.r,e.g=qt.g,e.b=qt.b,e}getStyle(e=zt){ht.workingToColorSpace(qt.copy(this),e);const t=qt.r,i=qt.g,r=qt.b;return e!==zt?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,t,i){return this.getHSL(Qn),this.setHSL(Qn.h+e,Qn.s+t,Qn.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(Qn),e.getHSL(Or);const i=br(Qn.h,Or.h,t),r=br(Qn.s,Or.s,t),s=br(Qn.l,Or.l,t);return this.setHSL(i,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*i+s[6]*r,this.g=s[1]*t+s[4]*i+s[7]*r,this.b=s[2]*t+s[5]*i+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const qt=new Je;Je.NAMES=Gc;class ma{constructor(e,t=1,i=1e3){this.isFog=!0,this.name="",this.color=new Je(e),this.near=t,this.far=i}clone(){return new ma(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class Vc extends Bt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new qn,this.environmentIntensity=1,this.environmentRotation=new qn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}const mn=new G,Un=new G,Ia=new G,Nn=new G,ki=new G,Bi=new G,ml=new G,Ua=new G,Na=new G,Fa=new G,Oa=new mt,ka=new mt,Ba=new mt;class un{constructor(e=new G,t=new G,i=new G){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,r){r.subVectors(i,t),mn.subVectors(e,t),r.cross(mn);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,i,r,s){mn.subVectors(r,t),Un.subVectors(i,t),Ia.subVectors(e,t);const a=mn.dot(mn),o=mn.dot(Un),c=mn.dot(Ia),l=Un.dot(Un),d=Un.dot(Ia),h=a*l-o*o;if(h===0)return s.set(0,0,0),null;const u=1/h,m=(l*c-o*d)*u,M=(a*d-o*c)*u;return s.set(1-m-M,M,m)}static containsPoint(e,t,i,r){return this.getBarycoord(e,t,i,r,Nn)===null?!1:Nn.x>=0&&Nn.y>=0&&Nn.x+Nn.y<=1}static getInterpolation(e,t,i,r,s,a,o,c){return this.getBarycoord(e,t,i,r,Nn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(s,Nn.x),c.addScaledVector(a,Nn.y),c.addScaledVector(o,Nn.z),c)}static getInterpolatedAttribute(e,t,i,r,s,a){return Oa.setScalar(0),ka.setScalar(0),Ba.setScalar(0),Oa.fromBufferAttribute(e,t),ka.fromBufferAttribute(e,i),Ba.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(Oa,s.x),a.addScaledVector(ka,s.y),a.addScaledVector(Ba,s.z),a}static isFrontFacing(e,t,i,r){return mn.subVectors(i,t),Un.subVectors(e,t),mn.cross(Un).dot(r)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,r){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,i,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return mn.subVectors(this.c,this.b),Un.subVectors(this.a,this.b),mn.cross(Un).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return un.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return un.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,r,s){return un.getInterpolation(e,this.a,this.b,this.c,t,i,r,s)}containsPoint(e){return un.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return un.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,r=this.b,s=this.c;let a,o;ki.subVectors(r,i),Bi.subVectors(s,i),Ua.subVectors(e,i);const c=ki.dot(Ua),l=Bi.dot(Ua);if(c<=0&&l<=0)return t.copy(i);Na.subVectors(e,r);const d=ki.dot(Na),h=Bi.dot(Na);if(d>=0&&h<=d)return t.copy(r);const u=c*h-d*l;if(u<=0&&c>=0&&d<=0)return a=c/(c-d),t.copy(i).addScaledVector(ki,a);Fa.subVectors(e,s);const m=ki.dot(Fa),M=Bi.dot(Fa);if(M>=0&&m<=M)return t.copy(s);const w=m*l-c*M;if(w<=0&&l>=0&&M<=0)return o=l/(l-M),t.copy(i).addScaledVector(Bi,o);const g=d*M-m*h;if(g<=0&&h-d>=0&&m-M>=0)return ml.subVectors(s,r),o=(h-d)/(h-d+(m-M)),t.copy(r).addScaledVector(ml,o);const f=1/(g+w+u);return a=w*f,o=u*f,t.copy(i).addScaledVector(ki,a).addScaledVector(Bi,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class hi{constructor(e=new G(1/0,1/0,1/0),t=new G(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(gn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(gn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=gn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const s=i.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,gn):gn.fromBufferAttribute(s,a),gn.applyMatrix4(e.matrixWorld),this.expandByPoint(gn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),kr.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),kr.copy(i.boundingBox)),kr.applyMatrix4(e.matrixWorld),this.union(kr)}const r=e.children;for(let s=0,a=r.length;s<a;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,gn),gn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(cr),Br.subVectors(this.max,cr),zi.subVectors(e.a,cr),Gi.subVectors(e.b,cr),Vi.subVectors(e.c,cr),ei.subVectors(Gi,zi),ti.subVectors(Vi,Gi),mi.subVectors(zi,Vi);let t=[0,-ei.z,ei.y,0,-ti.z,ti.y,0,-mi.z,mi.y,ei.z,0,-ei.x,ti.z,0,-ti.x,mi.z,0,-mi.x,-ei.y,ei.x,0,-ti.y,ti.x,0,-mi.y,mi.x,0];return!za(t,zi,Gi,Vi,Br)||(t=[1,0,0,0,1,0,0,0,1],!za(t,zi,Gi,Vi,Br))?!1:(zr.crossVectors(ei,ti),t=[zr.x,zr.y,zr.z],za(t,zi,Gi,Vi,Br))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,gn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(gn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Fn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Fn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Fn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Fn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Fn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Fn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Fn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Fn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Fn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const Fn=[new G,new G,new G,new G,new G,new G,new G,new G],gn=new G,kr=new hi,zi=new G,Gi=new G,Vi=new G,ei=new G,ti=new G,mi=new G,cr=new G,Br=new G,zr=new G,gi=new G;function za(n,e,t,i,r){for(let s=0,a=n.length-3;s<=a;s+=3){gi.fromArray(n,s);const o=r.x*Math.abs(gi.x)+r.y*Math.abs(gi.y)+r.z*Math.abs(gi.z),c=e.dot(gi),l=t.dot(gi),d=i.dot(gi);if(Math.max(-Math.max(c,l,d),Math.min(c,l,d))>o)return!1}return!0}const Lt=new G,Gr=new He;let md=0;class hn extends Yn{constructor(e,t,i=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:md++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=co,this.updateRanges=[],this.gpuType=vn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)Gr.fromBufferAttribute(this,t),Gr.applyMatrix3(e),this.setXY(t,Gr.x,Gr.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)Lt.fromBufferAttribute(this,t),Lt.applyMatrix3(e),this.setXYZ(t,Lt.x,Lt.y,Lt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)Lt.fromBufferAttribute(this,t),Lt.applyMatrix4(e),this.setXYZ(t,Lt.x,Lt.y,Lt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Lt.fromBufferAttribute(this,t),Lt.applyNormalMatrix(e),this.setXYZ(t,Lt.x,Lt.y,Lt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Lt.fromBufferAttribute(this,t),Lt.transformDirection(e),this.setXYZ(t,Lt.x,Lt.y,Lt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=Yi(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=Kt(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Yi(t,this.array)),t}setX(e,t){return this.normalized&&(t=Kt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Yi(t,this.array)),t}setY(e,t){return this.normalized&&(t=Kt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Yi(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Kt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Yi(t,this.array)),t}setW(e,t){return this.normalized&&(t=Kt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=Kt(t,this.array),i=Kt(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,r){return e*=this.itemSize,this.normalized&&(t=Kt(t,this.array),i=Kt(i,this.array),r=Kt(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,t,i,r,s){return e*=this.itemSize,this.normalized&&(t=Kt(t,this.array),i=Kt(i,this.array),r=Kt(r,this.array),s=Kt(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==co&&(e.usage=this.usage),e}dispose(){this.dispatchEvent({type:"dispose"})}}class Bo extends hn{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class zo extends hn{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class Yt extends hn{constructor(e,t,i){super(new Float32Array(e),t,i)}}const gd=new hi,ur=new G,Ga=new G;class ga{constructor(e=new G,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):gd.setFromPoints(e).getCenter(i);let r=0;for(let s=0,a=e.length;s<a;s++)r=Math.max(r,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;ur.subVectors(e,this.center);const t=ur.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),r=(i-this.radius)*.5;this.center.addScaledVector(ur,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Ga.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(ur.copy(e.center).add(Ga)),this.expandByPoint(ur.copy(e.center).sub(Ga))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let _d=0;const cn=new _t,Va=new Bt,Hi=new G,sn=new hi,dr=new hi,Ot=new G;class on extends Yn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:_d++}),this.uuid=rr(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(zu(e)?zo:Bo)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new je().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return cn.makeRotationFromQuaternion(e),this.applyMatrix4(cn),this}rotateX(e){return cn.makeRotationX(e),this.applyMatrix4(cn),this}rotateY(e){return cn.makeRotationY(e),this.applyMatrix4(cn),this}rotateZ(e){return cn.makeRotationZ(e),this.applyMatrix4(cn),this}translate(e,t,i){return cn.makeTranslation(e,t,i),this.applyMatrix4(cn),this}scale(e,t,i){return cn.makeScale(e,t,i),this.applyMatrix4(cn),this}lookAt(e){return Va.lookAt(e),Va.updateMatrix(),this.applyMatrix4(Va.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Hi).negate(),this.translate(Hi.x,Hi.y,Hi.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const i=[];for(let r=0,s=e.length;r<s;r++){const a=e[r];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Yt(i,3))}else{const i=Math.min(e.length,t.count);for(let r=0;r<i;r++){const s=e[r];t.setXYZ(r,s.x,s.y,s.z||0)}e.length>t.count&&Ke("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new hi);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){ft("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new G(-1/0,-1/0,-1/0),new G(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,r=t.length;i<r;i++){const s=t[i];sn.setFromBufferAttribute(s),this.morphTargetsRelative?(Ot.addVectors(this.boundingBox.min,sn.min),this.boundingBox.expandByPoint(Ot),Ot.addVectors(this.boundingBox.max,sn.max),this.boundingBox.expandByPoint(Ot)):(this.boundingBox.expandByPoint(sn.min),this.boundingBox.expandByPoint(sn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&ft('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ga);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){ft("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new G,1/0);return}if(e){const i=this.boundingSphere.center;if(sn.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){const o=t[s];dr.setFromBufferAttribute(o),this.morphTargetsRelative?(Ot.addVectors(sn.min,dr.min),sn.expandByPoint(Ot),Ot.addVectors(sn.max,dr.max),sn.expandByPoint(Ot)):(sn.expandByPoint(dr.min),sn.expandByPoint(dr.max))}sn.getCenter(i);let r=0;for(let s=0,a=e.count;s<a;s++)Ot.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(Ot));if(t)for(let s=0,a=t.length;s<a;s++){const o=t[s],c=this.morphTargetsRelative;for(let l=0,d=o.count;l<d;l++)Ot.fromBufferAttribute(o,l),c&&(Hi.fromBufferAttribute(e,l),Ot.add(Hi)),r=Math.max(r,i.distanceToSquared(Ot))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&ft('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){ft("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=t.position,r=t.normal,s=t.uv;let a=this.getAttribute("tangent");(a===void 0||a.count!==i.count)&&(a=new hn(new Float32Array(4*i.count),4),this.setAttribute("tangent",a));const o=[],c=[];for(let x=0;x<i.count;x++)o[x]=new G,c[x]=new G;const l=new G,d=new G,h=new G,u=new He,m=new He,M=new He,w=new G,g=new G;function f(x,p,b){l.fromBufferAttribute(i,x),d.fromBufferAttribute(i,p),h.fromBufferAttribute(i,b),u.fromBufferAttribute(s,x),m.fromBufferAttribute(s,p),M.fromBufferAttribute(s,b),d.sub(l),h.sub(l),m.sub(u),M.sub(u);const A=1/(m.x*M.y-M.x*m.y);isFinite(A)&&(w.copy(d).multiplyScalar(M.y).addScaledVector(h,-m.y).multiplyScalar(A),g.copy(h).multiplyScalar(m.x).addScaledVector(d,-M.x).multiplyScalar(A),o[x].add(w),o[p].add(w),o[b].add(w),c[x].add(g),c[p].add(g),c[b].add(g))}let P=this.groups;P.length===0&&(P=[{start:0,count:e.count}]);for(let x=0,p=P.length;x<p;++x){const b=P[x],A=b.start,L=b.count;for(let B=A,D=A+L;B<D;B+=3)f(e.getX(B+0),e.getX(B+1),e.getX(B+2))}const C=new G,S=new G,E=new G,y=new G;function v(x){E.fromBufferAttribute(r,x),y.copy(E);const p=o[x];C.copy(p),C.sub(E.multiplyScalar(E.dot(p))).normalize(),S.crossVectors(y,p);const A=S.dot(c[x])<0?-1:1;a.setXYZW(x,C.x,C.y,C.z,A)}for(let x=0,p=P.length;x<p;++x){const b=P[x],A=b.start,L=b.count;for(let B=A,D=A+L;B<D;B+=3)v(e.getX(B+0)),v(e.getX(B+1)),v(e.getX(B+2))}this._transformed=!0}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0||i.count!==t.count)i=new hn(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let u=0,m=i.count;u<m;u++)i.setXYZ(u,0,0,0);const r=new G,s=new G,a=new G,o=new G,c=new G,l=new G,d=new G,h=new G;if(e)for(let u=0,m=e.count;u<m;u+=3){const M=e.getX(u+0),w=e.getX(u+1),g=e.getX(u+2);r.fromBufferAttribute(t,M),s.fromBufferAttribute(t,w),a.fromBufferAttribute(t,g),d.subVectors(a,s),h.subVectors(r,s),d.cross(h),o.fromBufferAttribute(i,M),c.fromBufferAttribute(i,w),l.fromBufferAttribute(i,g),o.add(d),c.add(d),l.add(d),i.setXYZ(M,o.x,o.y,o.z),i.setXYZ(w,c.x,c.y,c.z),i.setXYZ(g,l.x,l.y,l.z)}else for(let u=0,m=t.count;u<m;u+=3)r.fromBufferAttribute(t,u+0),s.fromBufferAttribute(t,u+1),a.fromBufferAttribute(t,u+2),d.subVectors(a,s),h.subVectors(r,s),d.cross(h),i.setXYZ(u+0,d.x,d.y,d.z),i.setXYZ(u+1,d.x,d.y,d.z),i.setXYZ(u+2,d.x,d.y,d.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)Ot.fromBufferAttribute(e,t),Ot.normalize(),e.setXYZ(t,Ot.x,Ot.y,Ot.z)}toNonIndexed(){function e(o,c){const l=o.array,d=o.itemSize,h=o.normalized,u=new l.constructor(c.length*d);let m=0,M=0;for(let w=0,g=c.length;w<g;w++){o.isInterleavedBufferAttribute?m=c[w]*o.data.stride+o.offset:m=c[w]*d;for(let f=0;f<d;f++)u[M++]=l[m++]}return new hn(u,d,h)}if(this.index===null)return Ke("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new on,i=this.index.array,r=this.attributes;for(const o in r){const c=r[o],l=e(c,i);t.setAttribute(o,l)}const s=this.morphAttributes;for(const o in s){const c=[],l=s[o];for(let d=0,h=l.length;d<h;d++){const u=l[d],m=e(u,i);c.push(m)}t.morphAttributes[o]=c}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,c=a.length;o<c;o++){const l=a[o];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const c in i){const l=i[c];e.data.attributes[c]=l.toJSON(e.data)}const r={};let s=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],d=[];for(let h=0,u=l.length;h<u;h++){const m=l[h];d.push(m.toJSON(e.data))}d.length>0&&(r[c]=d,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone());const r=e.attributes;for(const l in r){const d=r[l];this.setAttribute(l,d.clone(t))}const s=e.morphAttributes;for(const l in s){const d=[],h=s[l];for(let u=0,m=h.length;u<m;u++)d.push(h[u].clone(t));this.morphAttributes[l]=d}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let l=0,d=a.length;l<d;l++){const h=a[l];this.addGroup(h.start,h.count,h.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}let xd=0;class sr extends Yn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:xd++}),this.uuid=rr(),this.name="",this.type="Material",this.blending=yi,this.side=Wn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=hs,this.blendDst=fs,this.blendEquation=si,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Je(0,0,0),this.blendAlpha=0,this.depthFunc=Ai,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=lo,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=vi,this.stencilZFail=vi,this.stencilZPass=vi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){Ke(`Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){Ke(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector2&&i&&i.isVector2||r&&r.isEuler&&i&&i.isEuler||r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==yi&&(i.blending=this.blending),this.side!==Wn&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==hs&&(i.blendSrc=this.blendSrc),this.blendDst!==fs&&(i.blendDst=this.blendDst),this.blendEquation!==si&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Ai&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==lo&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==vi&&(i.stencilFail=this.stencilFail),this.stencilZFail!==vi&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==vi&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.allowOverride===!1&&(i.allowOverride=!1),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){const a=[];for(const o in s){const c=s[o];delete c.metadata,a.push(c)}return a}if(t){const s=r(e.textures),a=r(e.images);s.length>0&&(i.textures=s),a.length>0&&(i.images=a)}return i}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new Je().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let i=e.normalScale;Array.isArray(i)===!1&&(i=[i,i]),this.normalScale=new He().fromArray(i)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new He().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const r=t.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=t[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const On=new G,Ha=new G,Vr=new G,ni=new G,Wa=new G,Hr=new G,Xa=new G;class _a{constructor(e=new G,t=new G(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,On)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=On.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(On.copy(this.origin).addScaledVector(this.direction,t),On.distanceToSquared(e))}distanceSqToSegment(e,t,i,r){Ha.copy(e).add(t).multiplyScalar(.5),Vr.copy(t).sub(e).normalize(),ni.copy(this.origin).sub(Ha);const s=e.distanceTo(t)*.5,a=-this.direction.dot(Vr),o=ni.dot(this.direction),c=-ni.dot(Vr),l=ni.lengthSq(),d=Math.abs(1-a*a);let h,u,m,M;if(d>0)if(h=a*c-o,u=a*o-c,M=s*d,h>=0)if(u>=-M)if(u<=M){const w=1/d;h*=w,u*=w,m=h*(h+a*u+2*o)+u*(a*h+u+2*c)+l}else u=s,h=Math.max(0,-(a*u+o)),m=-h*h+u*(u+2*c)+l;else u=-s,h=Math.max(0,-(a*u+o)),m=-h*h+u*(u+2*c)+l;else u<=-M?(h=Math.max(0,-(-a*s+o)),u=h>0?-s:Math.min(Math.max(-s,-c),s),m=-h*h+u*(u+2*c)+l):u<=M?(h=0,u=Math.min(Math.max(-s,-c),s),m=u*(u+2*c)+l):(h=Math.max(0,-(a*s+o)),u=h>0?s:Math.min(Math.max(-s,-c),s),m=-h*h+u*(u+2*c)+l);else u=a>0?-s:s,h=Math.max(0,-(a*u+o)),m=-h*h+u*(u+2*c)+l;return i&&i.copy(this.origin).addScaledVector(this.direction,h),r&&r.copy(Ha).addScaledVector(Vr,u),m}intersectSphere(e,t){On.subVectors(e.center,this.origin);const i=On.dot(this.direction),r=On.dot(On)-i*i,s=e.radius*e.radius;if(r>s)return null;const a=Math.sqrt(s-r),o=i-a,c=i+a;return c<0?null:o<0?this.at(c,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,r,s,a,o,c;const l=1/this.direction.x,d=1/this.direction.y,h=1/this.direction.z,u=this.origin;return l>=0?(i=(e.min.x-u.x)*l,r=(e.max.x-u.x)*l):(i=(e.max.x-u.x)*l,r=(e.min.x-u.x)*l),d>=0?(s=(e.min.y-u.y)*d,a=(e.max.y-u.y)*d):(s=(e.max.y-u.y)*d,a=(e.min.y-u.y)*d),i>a||s>r||((s>i||isNaN(i))&&(i=s),(a<r||isNaN(r))&&(r=a),h>=0?(o=(e.min.z-u.z)*h,c=(e.max.z-u.z)*h):(o=(e.max.z-u.z)*h,c=(e.min.z-u.z)*h),i>c||o>r)||((o>i||i!==i)&&(i=o),(c<r||r!==r)&&(r=c),r<0)?null:this.at(i>=0?i:r,t)}intersectsBox(e){return this.intersectBox(e,On)!==null}intersectTriangle(e,t,i,r,s){Wa.subVectors(t,e),Hr.subVectors(i,e),Xa.crossVectors(Wa,Hr);let a=this.direction.dot(Xa),o;if(a>0){if(r)return null;o=1}else if(a<0)o=-1,a=-a;else return null;ni.subVectors(this.origin,e);const c=o*this.direction.dot(Hr.crossVectors(ni,Hr));if(c<0)return null;const l=o*this.direction.dot(Wa.cross(ni));if(l<0||c+l>a)return null;const d=-o*ni.dot(Xa);return d<0?null:this.at(d/a,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Ji extends sr{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Je(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new qn,this.combine=bo,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const gl=new _t,_i=new _a,Wr=new ga,_l=new G,Xr=new G,qr=new G,Yr=new G,qa=new G,Kr=new G,xl=new G,Zr=new G;class tn extends Bt{constructor(e=new on,t=new Ji){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,t){const i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,a=i.morphTargetsRelative;t.fromBufferAttribute(r,e);const o=this.morphTargetInfluences;if(s&&o){Kr.set(0,0,0);for(let c=0,l=s.length;c<l;c++){const d=o[c],h=s[c];d!==0&&(qa.fromBufferAttribute(h,e),a?Kr.addScaledVector(qa,d):Kr.addScaledVector(qa.sub(t),d))}t.add(Kr)}return t}raycast(e,t){const i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Wr.copy(i.boundingSphere),Wr.applyMatrix4(s),_i.copy(e.ray).recast(e.near),!(Wr.containsPoint(_i.origin)===!1&&(_i.intersectSphere(Wr,_l)===null||_i.origin.distanceToSquared(_l)>(e.far-e.near)**2))&&(gl.copy(s).invert(),_i.copy(e.ray).applyMatrix4(gl),!(i.boundingBox!==null&&_i.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,_i)))}_computeIntersections(e,t,i){let r;const s=this.geometry,a=this.material,o=s.index,c=s.attributes.position,l=s.attributes.uv,d=s.attributes.uv1,h=s.attributes.normal,u=s.groups,m=s.drawRange;if(o!==null)if(Array.isArray(a))for(let M=0,w=u.length;M<w;M++){const g=u[M],f=a[g.materialIndex],P=Math.max(g.start,m.start),C=Math.min(o.count,Math.min(g.start+g.count,m.start+m.count));for(let S=P,E=C;S<E;S+=3){const y=o.getX(S),v=o.getX(S+1),x=o.getX(S+2);r=$r(this,f,e,i,l,d,h,y,v,x),r&&(r.faceIndex=Math.floor(S/3),r.face.materialIndex=g.materialIndex,t.push(r))}}else{const M=Math.max(0,m.start),w=Math.min(o.count,m.start+m.count);for(let g=M,f=w;g<f;g+=3){const P=o.getX(g),C=o.getX(g+1),S=o.getX(g+2);r=$r(this,a,e,i,l,d,h,P,C,S),r&&(r.faceIndex=Math.floor(g/3),t.push(r))}}else if(c!==void 0)if(Array.isArray(a))for(let M=0,w=u.length;M<w;M++){const g=u[M],f=a[g.materialIndex],P=Math.max(g.start,m.start),C=Math.min(c.count,Math.min(g.start+g.count,m.start+m.count));for(let S=P,E=C;S<E;S+=3){const y=S,v=S+1,x=S+2;r=$r(this,f,e,i,l,d,h,y,v,x),r&&(r.faceIndex=Math.floor(S/3),r.face.materialIndex=g.materialIndex,t.push(r))}}else{const M=Math.max(0,m.start),w=Math.min(c.count,m.start+m.count);for(let g=M,f=w;g<f;g+=3){const P=g,C=g+1,S=g+2;r=$r(this,a,e,i,l,d,h,P,C,S),r&&(r.faceIndex=Math.floor(g/3),t.push(r))}}}}function vd(n,e,t,i,r,s,a,o){let c;if(e.side===jt?c=i.intersectTriangle(a,s,r,!0,o):c=i.intersectTriangle(r,s,a,e.side===Wn,o),c===null)return null;Zr.copy(o),Zr.applyMatrix4(n.matrixWorld);const l=t.ray.origin.distanceTo(Zr);return l<t.near||l>t.far?null:{distance:l,point:Zr.clone(),object:n}}function $r(n,e,t,i,r,s,a,o,c,l){n.getVertexPosition(o,Xr),n.getVertexPosition(c,qr),n.getVertexPosition(l,Yr);const d=vd(n,e,t,i,Xr,qr,Yr,xl);if(d){const h=new G;un.getBarycoord(xl,Xr,qr,Yr,h),r&&(d.uv=un.getInterpolatedAttribute(r,o,c,l,h,new He)),s&&(d.uv1=un.getInterpolatedAttribute(s,o,c,l,h,new He)),a&&(d.normal=un.getInterpolatedAttribute(a,o,c,l,h,new G),d.normal.dot(i.direction)>0&&d.normal.multiplyScalar(-1));const u={a:o,b:c,c:l,normal:new G,materialIndex:0};un.getNormal(Xr,qr,Yr,u.normal),d.face=u,d.barycoord=h}return d}class Hc extends Vt{constructor(e=null,t=1,i=1,r,s,a,o,c,l=kt,d=kt,h,u){super(null,a,o,c,l,d,r,s,h,u),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Ya=new G,Md=new G,Sd=new je;class kn{constructor(e=new G(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,r){return this.normal.set(e,t,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const r=Ya.subVectors(i,t).cross(Md.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,i=!0){const r=e.delta(Ya),s=this.normal.dot(r);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const a=-(e.start.dot(this.normal)+this.constant)/s;return i===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(r,a)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||Sd.getNormalMatrix(e),r=this.coplanarPoint(Ya).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const xi=new ga,bd=new He(.5,.5),jr=new G;class Dr{constructor(e=new kn,t=new kn,i=new kn,r=new kn,s=new kn,a=new kn){this.planes=[e,t,i,r,s,a]}set(e,t,i,r,s,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(i),o[3].copy(r),o[4].copy(s),o[5].copy(a),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=Mn,i=!1){const r=this.planes,s=e.elements,a=s[0],o=s[1],c=s[2],l=s[3],d=s[4],h=s[5],u=s[6],m=s[7],M=s[8],w=s[9],g=s[10],f=s[11],P=s[12],C=s[13],S=s[14],E=s[15];if(r[0].setComponents(l-a,m-d,f-M,E-P).normalize(),r[1].setComponents(l+a,m+d,f+M,E+P).normalize(),r[2].setComponents(l+o,m+h,f+w,E+C).normalize(),r[3].setComponents(l-o,m-h,f-w,E-C).normalize(),i)r[4].setComponents(c,u,g,S).normalize(),r[5].setComponents(l-c,m-u,f-g,E-S).normalize();else if(r[4].setComponents(l-c,m-u,f-g,E-S).normalize(),t===Mn)r[5].setComponents(l+c,m+u,f+g,E+S).normalize();else if(t===nr)r[5].setComponents(c,u,g,S).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),xi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),xi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(xi)}intersectsSprite(e){xi.center.set(0,0,0);const t=bd.distanceTo(e.center);return xi.radius=.7071067811865476+t,xi.applyMatrix4(e.matrixWorld),this.intersectsSphere(xi)}intersectsSphere(e){const t=this.planes,i=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const r=t[i];if(jr.x=r.normal.x>0?e.max.x:e.min.x,jr.y=r.normal.y>0?e.max.y:e.min.y,jr.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(jr)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Go extends Vt{constructor(e=[],t=ui,i,r,s,a,o,c,l,d){super(e,t,i,r,s,a,o,c,l,d),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class fo extends Vt{constructor(e,t,i,r,s,a,o,c,l){super(e,t,i,r,s,a,o,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Ri extends Vt{constructor(e,t,i=yn,r,s,a,o=kt,c=kt,l,d=Ln,h=1){if(d!==Ln&&d!==oi)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const u={width:e,height:t,depth:h};super(u,r,s,a,o,c,d,i,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new fa(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class Wc extends Ri{constructor(e,t=yn,i=ui,r,s,a=kt,o=kt,c,l=Ln){const d={width:e,height:e,depth:1},h=[d,d,d,d,d,d];super(e,e,t,i,r,s,a,o,c,l),this.image=h,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class Vo extends Vt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class fi extends on{constructor(e=1,t=1,i=1,r=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:r,heightSegments:s,depthSegments:a};const o=this;r=Math.floor(r),s=Math.floor(s),a=Math.floor(a);const c=[],l=[],d=[],h=[];let u=0,m=0;M("z","y","x",-1,-1,i,t,e,a,s,0),M("z","y","x",1,-1,i,t,-e,a,s,1),M("x","z","y",1,1,e,i,t,r,a,2),M("x","z","y",1,-1,e,i,-t,r,a,3),M("x","y","z",1,-1,e,t,i,r,s,4),M("x","y","z",-1,-1,e,t,-i,r,s,5),this.setIndex(c),this.setAttribute("position",new Yt(l,3)),this.setAttribute("normal",new Yt(d,3)),this.setAttribute("uv",new Yt(h,2));function M(w,g,f,P,C,S,E,y,v,x,p){const b=S/v,A=E/x,L=S/2,B=E/2,D=y/2,N=v+1,k=x+1;let W=0,$=0;const re=new G;for(let me=0;me<k;me++){const be=me*A-B;for(let _e=0;_e<N;_e++){const Be=_e*b-L;re[w]=Be*P,re[g]=be*C,re[f]=D,l.push(re.x,re.y,re.z),re[w]=0,re[g]=0,re[f]=y>0?1:-1,d.push(re.x,re.y,re.z),h.push(_e/v),h.push(1-me/x),W+=1}}for(let me=0;me<x;me++)for(let be=0;be<v;be++){const _e=u+be+N*me,Be=u+be+N*(me+1),Ze=u+(be+1)+N*(me+1),de=u+(be+1)+N*me;c.push(_e,Be,de),c.push(Be,Ze,de),$+=6}o.addGroup(m,$,p),m+=$,u+=W}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new fi(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class Ir extends on{constructor(e=1,t=1,i=1,r=32,s=1,a=!1,o=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:i,radialSegments:r,heightSegments:s,openEnded:a,thetaStart:o,thetaLength:c};const l=this;r=Math.floor(r),s=Math.floor(s);const d=[],h=[],u=[],m=[];let M=0;const w=[],g=i/2;let f=0;P(),a===!1&&(e>0&&C(!0),t>0&&C(!1)),this.setIndex(d),this.setAttribute("position",new Yt(h,3)),this.setAttribute("normal",new Yt(u,3)),this.setAttribute("uv",new Yt(m,2));function P(){const S=new G,E=new G;let y=0;const v=(t-e)/i;for(let x=0;x<=s;x++){const p=[],b=x/s,A=b*(t-e)+e;for(let L=0;L<=r;L++){const B=L/r,D=B*c+o,N=Math.sin(D),k=Math.cos(D);E.x=A*N,E.y=-b*i+g,E.z=A*k,h.push(E.x,E.y,E.z),S.set(N,v,k).normalize(),u.push(S.x,S.y,S.z),m.push(B,1-b),p.push(M++)}w.push(p)}for(let x=0;x<r;x++)for(let p=0;p<s;p++){const b=w[p][x],A=w[p+1][x],L=w[p+1][x+1],B=w[p][x+1];(e>0||p!==0)&&(d.push(b,A,B),y+=3),(t>0||p!==s-1)&&(d.push(A,L,B),y+=3)}l.addGroup(f,y,0),f+=y}function C(S){const E=M,y=new He,v=new G;let x=0;const p=S===!0?e:t,b=S===!0?1:-1;for(let L=1;L<=r;L++)h.push(0,g*b,0),u.push(0,b,0),m.push(.5,.5),M++;const A=M;for(let L=0;L<=r;L++){const D=L/r*c+o,N=Math.cos(D),k=Math.sin(D);v.x=p*k,v.y=g*b,v.z=p*N,h.push(v.x,v.y,v.z),u.push(0,b,0),y.x=N*.5+.5,y.y=k*.5*b+.5,m.push(y.x,y.y),M++}for(let L=0;L<r;L++){const B=E+L,D=A+L;S===!0?d.push(D,D+1,B):d.push(D+1,D,B),x+=3}l.addGroup(f,x,S===!0?1:2),f+=x}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ir(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Ho extends Ir{constructor(e=1,t=1,i=32,r=1,s=!1,a=0,o=Math.PI*2){super(0,e,t,i,r,s,a,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:i,heightSegments:r,openEnded:s,thetaStart:a,thetaLength:o}}static fromJSON(e){return new Ho(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Ci extends on{constructor(e=1,t=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:r};const s=e/2,a=t/2,o=Math.floor(i),c=Math.floor(r),l=o+1,d=c+1,h=e/o,u=t/c,m=[],M=[],w=[],g=[];for(let f=0;f<d;f++){const P=f*u-a;for(let C=0;C<l;C++){const S=C*h-s;M.push(S,-P,0),w.push(0,0,1),g.push(C/o),g.push(1-f/c)}}for(let f=0;f<c;f++)for(let P=0;P<o;P++){const C=P+l*f,S=P+l*(f+1),E=P+1+l*(f+1),y=P+1+l*f;m.push(C,S,y),m.push(S,E,y)}this.setIndex(m),this.setAttribute("position",new Yt(M,3)),this.setAttribute("normal",new Yt(w,3)),this.setAttribute("uv",new Yt(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ci(e.width,e.height,e.widthSegments,e.heightSegments)}}class xa extends on{constructor(e=1,t=32,i=16,r=0,s=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:r,phiLength:s,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));const c=Math.min(a+o,Math.PI);let l=0;const d=[],h=new G,u=new G,m=[],M=[],w=[],g=[];for(let f=0;f<=i;f++){const P=[],C=f/i,S=a+C*o,E=e*Math.cos(S),y=Math.sqrt(e*e-E*E);let v=0;f===0&&a===0?v=.5/t:f===i&&c===Math.PI&&(v=-.5/t);for(let x=0;x<=t;x++){const p=x/t,b=r+p*s;h.x=-y*Math.cos(b),h.y=E,h.z=y*Math.sin(b),M.push(h.x,h.y,h.z),u.copy(h).normalize(),w.push(u.x,u.y,u.z),g.push(p+v,1-C),P.push(l++)}d.push(P)}for(let f=0;f<i;f++)for(let P=0;P<t;P++){const C=d[f][P+1],S=d[f][P],E=d[f+1][P],y=d[f+1][P+1];(f!==0||a>0)&&m.push(C,S,y),(f!==i-1||c<Math.PI)&&m.push(S,E,y)}this.setIndex(m),this.setAttribute("position",new Yt(M,3)),this.setAttribute("normal",new Yt(w,3)),this.setAttribute("uv",new Yt(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new xa(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}function ir(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const r=n[t][i];if(vl(r))r.isRenderTargetTexture?(Ke("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=r.clone();else if(Array.isArray(r))if(vl(r[0])){const s=[];for(let a=0,o=r.length;a<o;a++)s[a]=r[a].clone();e[t][i]=s}else e[t][i]=r.slice();else e[t][i]=r}}return e}function Zt(n){const e={};for(let t=0;t<n.length;t++){const i=ir(n[t]);for(const r in i)e[r]=i[r]}return e}function vl(n){return n&&(n.isColor||n.isMatrix3||n.isMatrix4||n.isVector2||n.isVector3||n.isVector4||n.isTexture||n.isQuaternion)}function yd(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function Xc(n){const e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:ht.workingColorSpace}const qc={clone:ir,merge:Zt};var Ed=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Td=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class En extends sr{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Ed,this.fragmentShader=Td,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=ir(e.uniforms),this.uniformsGroups=yd(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const a=this.uniforms[r].value;a&&a.isTexture?t.uniforms[r]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[r]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[r]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[r]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[r]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[r]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[r]={type:"m4",value:a.toArray()}:t.uniforms[r]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(const i in e.uniforms){const r=e.uniforms[i];switch(this.uniforms[i]={},r.type){case"t":this.uniforms[i].value=t[r.value]||null;break;case"c":this.uniforms[i].value=new Je().setHex(r.value);break;case"v2":this.uniforms[i].value=new He().fromArray(r.value);break;case"v3":this.uniforms[i].value=new G().fromArray(r.value);break;case"v4":this.uniforms[i].value=new mt().fromArray(r.value);break;case"m3":this.uniforms[i].value=new je().fromArray(r.value);break;case"m4":this.uniforms[i].value=new _t().fromArray(r.value);break;default:this.uniforms[i].value=r.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(const i in e.extensions)this.extensions[i]=e.extensions[i];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}}class Yc extends En{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class ri extends sr{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Je(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Je(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Js,this.normalScale=new He(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new qn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Kc extends sr{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Rc,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Zc extends sr{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class va extends Bt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Je(e),this.intensity=t}dispose(){this.dispatchEvent({type:"dispose"})}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}}class $c extends va{constructor(e,t,i){super(e,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Bt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Je(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){const t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}}const Ka=new _t,Ml=new G,Sl=new G;class Ad{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new He(512,512),this.mapType=en,this.map=null,this.mapPass=null,this.matrix=new _t,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Dr,this._frameExtents=new He(1,1),this._viewportCount=1,this._viewports=[new mt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,i=this.matrix;Ml.setFromMatrixPosition(e.matrixWorld),t.position.copy(Ml),Sl.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Sl),t.updateMatrixWorld(),Ka.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Ka,t.coordinateSystem,t.reversedDepth),t.coordinateSystem===nr||t.reversedDepth?i.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(Ka)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const Jr=new G,Qr=new Xn,An=new G;class Ma extends Bt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new _t,this.projectionMatrix=new _t,this.projectionMatrixInverse=new _t,this.coordinateSystem=Mn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Jr,Qr,An),An.x===1&&An.y===1&&An.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Jr,Qr,An.set(1,1,1)).invert()}updateWorldMatrix(e,t,i=!1){super.updateWorldMatrix(e,t,i),this.matrixWorld.decompose(Jr,Qr,An),An.x===1&&An.y===1&&An.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Jr,Qr,An.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const ii=new G,bl=new He,yl=new He;class an extends Ma{constructor(e=50,t=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Rr*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Sr*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Rr*2*Math.atan(Math.tan(Sr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){ii.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(ii.x,ii.y).multiplyScalar(-e/ii.z),ii.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(ii.x,ii.y).multiplyScalar(-e/ii.z)}getViewSize(e,t){return this.getViewBounds(e,bl,yl),t.subVectors(yl,bl)}setViewOffset(e,t,i,r,s,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Sr*.5*this.fov)/this.zoom,i=2*t,r=this.aspect*i,s=-.5*r;const a=this.view;if(this.view!==null&&this.view.enabled){const c=a.fullWidth,l=a.fullHeight;s+=a.offsetX*r/c,t-=a.offsetY*i/l,r*=a.width/c,i*=a.height/l}const o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class Sa extends Ma{constructor(e=-1,t=1,i=1,r=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=r,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,r,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=i-e,a=i+e,o=r+t,c=r-t;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,d=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=l*this.view.offsetX,a=s+l*this.view.width,o-=d*this.view.offsetY,c=o-d*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class wd extends Ad{constructor(){super(new Sa(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class po extends va{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Bt.DEFAULT_UP),this.updateMatrix(),this.target=new Bt,this.shadow=new wd}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}}class jc extends va{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}const Wi=-90,Xi=1;class Jc extends Bt{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new an(Wi,Xi,e,t);r.layers=this.layers,this.add(r);const s=new an(Wi,Xi,e,t);s.layers=this.layers,this.add(s);const a=new an(Wi,Xi,e,t);a.layers=this.layers,this.add(a);const o=new an(Wi,Xi,e,t);o.layers=this.layers,this.add(o);const c=new an(Wi,Xi,e,t);c.layers=this.layers,this.add(c);const l=new an(Wi,Xi,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,r,s,a,o,c]=t;for(const l of t)this.remove(l);if(e===Mn)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===nr)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,a,o,c,l,d]=this.children,h=e.getRenderTarget(),u=e.getActiveCubeFace(),m=e.getActiveMipmapLevel(),M=e.xr.enabled;e.xr.enabled=!1;const w=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let g=!1;e.isWebGLRenderer===!0?g=e.state.buffers.depth.getReversed():g=e.reversedDepthBuffer,e.setRenderTarget(i,0,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(i,1,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(i,2,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(i,3,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),e.setRenderTarget(i,4,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),i.texture.generateMipmaps=w,e.setRenderTarget(i,5,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,d),e.setRenderTarget(h,u,m),e.xr.enabled=M,i.texture.needsPMREMUpdate=!0}}class Qc extends an{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}const El=new _t;class eu{constructor(e,t,i=0,r=1/0){this.ray=new _a(e,t),this.near=i,this.far=r,this.camera=null,this.layers=new pa,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,t.projectionMatrix.elements[14]).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):ft("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return El.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(El),this}intersectObject(e,t=!0,i=[]){return mo(e,this,i,t),i.sort(Tl),i}intersectObjects(e,t=!0,i=[]){for(let r=0,s=e.length;r<s;r++)mo(e[r],this,i,t);return i.sort(Tl),i}}function Tl(n,e){return n.distance-e.distance}function mo(n,e,t,i){let r=!0;if(n.layers.test(e.layers)&&n.raycast(e,t)===!1&&(r=!1),r===!0&&i===!0){const s=n.children;for(let a=0,o=s.length;a<o;a++)mo(s[a],e,t,!0)}}class ta{constructor(e=1,t=0,i=0){this.radius=e,this.phi=t,this.theta=i}set(e,t,i){return this.radius=e,this.phi=t,this.theta=i,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=ut(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,i){return this.radius=Math.sqrt(e*e+t*t+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,i),this.phi=Math.acos(ut(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class Wo{static{Wo.prototype.isMatrix2=!0}constructor(e,t,i,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,i,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let i=0;i<4;i++)this.elements[i]=e[i+t];return this}set(e,t,i,r){const s=this.elements;return s[0]=e,s[2]=t,s[1]=i,s[3]=r,this}}const Al=new He;class go{constructor(e=new He(1/0,1/0),t=new He(-1/0,-1/0)){this.isBox2=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=Al.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=1/0,this.max.x=this.max.y=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y}getCenter(e){return this.isEmpty()?e.set(0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Al).distanceTo(e)}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}class tu extends Yn{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){if(e===void 0){Ke("Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}}function wl(n,e,t,i){const r=Rd(i);switch(t){case Uo:return n*e;case Fo:return n*e/r.components*r.byteLength;case la:return n*e/r.components*r.byteLength;case di:return n*e*2/r.components*r.byteLength;case ca:return n*e*2/r.components*r.byteLength;case No:return n*e*3/r.components*r.byteLength;case dn:return n*e*4/r.components*r.byteLength;case ua:return n*e*4/r.components*r.byteLength;case _r:case xr:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case vr:case Mr:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case ys:case Ts:return Math.max(n,16)*Math.max(e,8)/4;case bs:case Es:return Math.max(n,8)*Math.max(e,8)/2;case As:case ws:case Cs:case Ps:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Rs:case Er:case Ls:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Ds:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Is:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case Us:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case Ns:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case Fs:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case Os:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case ks:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case Bs:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case zs:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case Gs:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case Vs:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case Hs:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case Ws:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case Xs:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case qs:case Ys:case Ks:return Math.ceil(n/4)*Math.ceil(e/4)*16;case Zs:case $s:return Math.ceil(n/4)*Math.ceil(e/4)*8;case Tr:case js:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Rd(n){switch(n){case en:case Po:return{byteLength:1,components:1};case er:case Lo:case Pn:return{byteLength:2,components:1};case aa:case oa:return{byteLength:2,components:4};case yn:case sa:case vn:return{byteLength:4,components:1};case Do:case Io:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:ia}}));typeof window<"u"&&(window.__THREE__?Ke("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=ia);function nu(){let n=null,e=!1,t=null,i=null;function r(s,a){t(s,a),i=n.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&n!==null&&(i=n.requestAnimationFrame(r),e=!0)},stop:function(){n!==null&&n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){n=s}}}function Cd(n){const e=new WeakMap;function t(o,c){const l=o.array,d=o.usage,h=l.byteLength,u=n.createBuffer();n.bindBuffer(c,u),n.bufferData(c,l,d),o.onUploadCallback();let m;if(l instanceof Float32Array)m=n.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)m=n.HALF_FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?m=n.HALF_FLOAT:m=n.UNSIGNED_SHORT;else if(l instanceof Int16Array)m=n.SHORT;else if(l instanceof Uint32Array)m=n.UNSIGNED_INT;else if(l instanceof Int32Array)m=n.INT;else if(l instanceof Int8Array)m=n.BYTE;else if(l instanceof Uint8Array)m=n.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)m=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:u,type:m,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:h}}function i(o,c,l){const d=c.array,h=c.updateRanges;if(n.bindBuffer(l,o),h.length===0)n.bufferSubData(l,0,d);else{h.sort((m,M)=>m.start-M.start);let u=0;for(let m=1;m<h.length;m++){const M=h[u],w=h[m];w.start<=M.start+M.count+1?M.count=Math.max(M.count,w.start+w.count-M.start):(++u,h[u]=w)}h.length=u+1;for(let m=0,M=h.length;m<M;m++){const w=h[m];n.bufferSubData(l,w.start*d.BYTES_PER_ELEMENT,d,w.start,w.count)}c.clearUpdateRanges()}c.onUploadCallback()}function r(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);const c=e.get(o);c&&(n.deleteBuffer(c.buffer),e.delete(o))}function a(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const d=e.get(o);(!d||d.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const l=e.get(o);if(l===void 0)e.set(o,t(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(l.buffer,o,c),l.version=o.version}}return{get:r,remove:s,update:a}}var Pd=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Ld=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Dd=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Id=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Ud=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Nd=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Fd=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Od=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,kd=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,Bd=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,zd=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Gd=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Vd=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Hd=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Wd=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Xd=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,qd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Yd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Kd=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Zd=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,$d=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,jd=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,Jd=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,Qd=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,eh=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,th=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,nh=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,ih=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,rh=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,sh=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,ah="gl_FragColor = linearToOutputTexel( gl_FragColor );",oh=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,lh=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,ch=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,uh=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,dh=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,hh=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,fh=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,ph=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,mh=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,gh=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,_h=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,xh=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,vh=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Mh=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Sh=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,bh=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,yh=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Eh=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Th=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Ah=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,wh=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Rh=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
		vec3 iridescenceFresnelDielectric;
		vec3 iridescenceFresnelMetallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
vec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 dfgV = texture2D( dfgLUT, vec2( material.roughness, dotNV ) ).rg;
	vec2 dfgL = texture2D( dfgLUT, vec2( material.roughness, dotNL ) ).rg;
	vec3 FssEss_V = material.specularColorBlended * dfgV.x + material.specularF90 * dfgV.y;
	vec3 FssEss_L = material.specularColorBlended * dfgL.x + material.specularF90 * dfgL.y;
	float Ess_V = dfgV.x + dfgV.y;
	float Ess_L = dfgL.x + dfgL.y;
	float Ems_V = 1.0 - Ess_V;
	float Ems_L = 1.0 - Ess_L;
	vec3 Favg = material.specularColorBlended + ( 1.0 - material.specularColorBlended ) * 0.047619;
	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg + EPSILON );
	float compensationFactor = Ems_V * Ems_L;
	vec3 multiScatter = Fms * compensationFactor;
	return singleScatter + multiScatter;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnelDielectric, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceFresnelMetallic, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Ch=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( material.iridescenceFresnelDielectric, material.iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Ph=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Lh=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Dh=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,Ih=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Uh=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Nh=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Fh=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Oh=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,kh=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Bh=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,zh=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Gh=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Vh=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Hh=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Wh=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Xh=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,qh=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Yh=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Kh=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Zh=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,$h=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,jh=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Jh=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,Qh=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,ef=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,tf=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,nf=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,rf=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,sf=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,af=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,of=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,lf=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,cf=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,uf=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,df=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,hf=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,ff=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,pf=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,mf=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,gf=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,_f=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,xf=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,vf=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Mf=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Sf=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,bf=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,yf=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Ef=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Tf=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Af=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,wf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Rf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Cf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Pf=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Lf=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Df=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,If=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Uf=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Nf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Ff=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Of=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,kf=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Bf=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,zf=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,Gf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Vf=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Hf=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Wf=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Xf=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,qf=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Yf=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Kf=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Zf=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,$f=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,jf=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Jf=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Qf=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,ep=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,tp=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,np=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ip=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,rp=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,sp=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,ap=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,op=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,lp=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,cp=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,up=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,ot={alphahash_fragment:Pd,alphahash_pars_fragment:Ld,alphamap_fragment:Dd,alphamap_pars_fragment:Id,alphatest_fragment:Ud,alphatest_pars_fragment:Nd,aomap_fragment:Fd,aomap_pars_fragment:Od,batching_pars_vertex:kd,batching_vertex:Bd,begin_vertex:zd,beginnormal_vertex:Gd,bsdfs:Vd,iridescence_fragment:Hd,bumpmap_pars_fragment:Wd,clipping_planes_fragment:Xd,clipping_planes_pars_fragment:qd,clipping_planes_pars_vertex:Yd,clipping_planes_vertex:Kd,color_fragment:Zd,color_pars_fragment:$d,color_pars_vertex:jd,color_vertex:Jd,common:Qd,cube_uv_reflection_fragment:eh,defaultnormal_vertex:th,displacementmap_pars_vertex:nh,displacementmap_vertex:ih,emissivemap_fragment:rh,emissivemap_pars_fragment:sh,colorspace_fragment:ah,colorspace_pars_fragment:oh,envmap_fragment:lh,envmap_common_pars_fragment:ch,envmap_pars_fragment:uh,envmap_pars_vertex:dh,envmap_physical_pars_fragment:bh,envmap_vertex:hh,fog_vertex:fh,fog_pars_vertex:ph,fog_fragment:mh,fog_pars_fragment:gh,gradientmap_pars_fragment:_h,lightmap_pars_fragment:xh,lights_lambert_fragment:vh,lights_lambert_pars_fragment:Mh,lights_pars_begin:Sh,lights_toon_fragment:yh,lights_toon_pars_fragment:Eh,lights_phong_fragment:Th,lights_phong_pars_fragment:Ah,lights_physical_fragment:wh,lights_physical_pars_fragment:Rh,lights_fragment_begin:Ch,lights_fragment_maps:Ph,lights_fragment_end:Lh,lightprobes_pars_fragment:Dh,logdepthbuf_fragment:Ih,logdepthbuf_pars_fragment:Uh,logdepthbuf_pars_vertex:Nh,logdepthbuf_vertex:Fh,map_fragment:Oh,map_pars_fragment:kh,map_particle_fragment:Bh,map_particle_pars_fragment:zh,metalnessmap_fragment:Gh,metalnessmap_pars_fragment:Vh,morphinstance_vertex:Hh,morphcolor_vertex:Wh,morphnormal_vertex:Xh,morphtarget_pars_vertex:qh,morphtarget_vertex:Yh,normal_fragment_begin:Kh,normal_fragment_maps:Zh,normal_pars_fragment:$h,normal_pars_vertex:jh,normal_vertex:Jh,normalmap_pars_fragment:Qh,clearcoat_normal_fragment_begin:ef,clearcoat_normal_fragment_maps:tf,clearcoat_pars_fragment:nf,iridescence_pars_fragment:rf,opaque_fragment:sf,packing:af,premultiplied_alpha_fragment:of,project_vertex:lf,dithering_fragment:cf,dithering_pars_fragment:uf,roughnessmap_fragment:df,roughnessmap_pars_fragment:hf,shadowmap_pars_fragment:ff,shadowmap_pars_vertex:pf,shadowmap_vertex:mf,shadowmask_pars_fragment:gf,skinbase_vertex:_f,skinning_pars_vertex:xf,skinning_vertex:vf,skinnormal_vertex:Mf,specularmap_fragment:Sf,specularmap_pars_fragment:bf,tonemapping_fragment:yf,tonemapping_pars_fragment:Ef,transmission_fragment:Tf,transmission_pars_fragment:Af,uv_pars_fragment:wf,uv_pars_vertex:Rf,uv_vertex:Cf,worldpos_vertex:Pf,background_vert:Lf,background_frag:Df,backgroundCube_vert:If,backgroundCube_frag:Uf,cube_vert:Nf,cube_frag:Ff,depth_vert:Of,depth_frag:kf,distance_vert:Bf,distance_frag:zf,equirect_vert:Gf,equirect_frag:Vf,linedashed_vert:Hf,linedashed_frag:Wf,meshbasic_vert:Xf,meshbasic_frag:qf,meshlambert_vert:Yf,meshlambert_frag:Kf,meshmatcap_vert:Zf,meshmatcap_frag:$f,meshnormal_vert:jf,meshnormal_frag:Jf,meshphong_vert:Qf,meshphong_frag:ep,meshphysical_vert:tp,meshphysical_frag:np,meshtoon_vert:ip,meshtoon_frag:rp,points_vert:sp,points_frag:ap,shadow_vert:op,shadow_frag:lp,sprite_vert:cp,sprite_frag:up},Re={common:{diffuse:{value:new Je(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new je},alphaMap:{value:null},alphaMapTransform:{value:new je},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new je}},envmap:{envMap:{value:null},envMapRotation:{value:new je},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new je}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new je}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new je},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new je},normalScale:{value:new He(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new je},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new je}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new je}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new je}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Je(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new G},probesMax:{value:new G},probesResolution:{value:new G}},points:{diffuse:{value:new Je(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new je},alphaTest:{value:0},uvTransform:{value:new je}},sprite:{diffuse:{value:new Je(16777215)},opacity:{value:1},center:{value:new He(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new je},alphaMap:{value:null},alphaMapTransform:{value:new je},alphaTest:{value:0}}},xn={basic:{uniforms:Zt([Re.common,Re.specularmap,Re.envmap,Re.aomap,Re.lightmap,Re.fog]),vertexShader:ot.meshbasic_vert,fragmentShader:ot.meshbasic_frag},lambert:{uniforms:Zt([Re.common,Re.specularmap,Re.envmap,Re.aomap,Re.lightmap,Re.emissivemap,Re.bumpmap,Re.normalmap,Re.displacementmap,Re.fog,Re.lights,{emissive:{value:new Je(0)},envMapIntensity:{value:1}}]),vertexShader:ot.meshlambert_vert,fragmentShader:ot.meshlambert_frag},phong:{uniforms:Zt([Re.common,Re.specularmap,Re.envmap,Re.aomap,Re.lightmap,Re.emissivemap,Re.bumpmap,Re.normalmap,Re.displacementmap,Re.fog,Re.lights,{emissive:{value:new Je(0)},specular:{value:new Je(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:ot.meshphong_vert,fragmentShader:ot.meshphong_frag},standard:{uniforms:Zt([Re.common,Re.envmap,Re.aomap,Re.lightmap,Re.emissivemap,Re.bumpmap,Re.normalmap,Re.displacementmap,Re.roughnessmap,Re.metalnessmap,Re.fog,Re.lights,{emissive:{value:new Je(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ot.meshphysical_vert,fragmentShader:ot.meshphysical_frag},toon:{uniforms:Zt([Re.common,Re.aomap,Re.lightmap,Re.emissivemap,Re.bumpmap,Re.normalmap,Re.displacementmap,Re.gradientmap,Re.fog,Re.lights,{emissive:{value:new Je(0)}}]),vertexShader:ot.meshtoon_vert,fragmentShader:ot.meshtoon_frag},matcap:{uniforms:Zt([Re.common,Re.bumpmap,Re.normalmap,Re.displacementmap,Re.fog,{matcap:{value:null}}]),vertexShader:ot.meshmatcap_vert,fragmentShader:ot.meshmatcap_frag},points:{uniforms:Zt([Re.points,Re.fog]),vertexShader:ot.points_vert,fragmentShader:ot.points_frag},dashed:{uniforms:Zt([Re.common,Re.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ot.linedashed_vert,fragmentShader:ot.linedashed_frag},depth:{uniforms:Zt([Re.common,Re.displacementmap]),vertexShader:ot.depth_vert,fragmentShader:ot.depth_frag},normal:{uniforms:Zt([Re.common,Re.bumpmap,Re.normalmap,Re.displacementmap,{opacity:{value:1}}]),vertexShader:ot.meshnormal_vert,fragmentShader:ot.meshnormal_frag},sprite:{uniforms:Zt([Re.sprite,Re.fog]),vertexShader:ot.sprite_vert,fragmentShader:ot.sprite_frag},background:{uniforms:{uvTransform:{value:new je},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ot.background_vert,fragmentShader:ot.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new je}},vertexShader:ot.backgroundCube_vert,fragmentShader:ot.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ot.cube_vert,fragmentShader:ot.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ot.equirect_vert,fragmentShader:ot.equirect_frag},distance:{uniforms:Zt([Re.common,Re.displacementmap,{referencePosition:{value:new G},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ot.distance_vert,fragmentShader:ot.distance_frag},shadow:{uniforms:Zt([Re.lights,Re.fog,{color:{value:new Je(0)},opacity:{value:1}}]),vertexShader:ot.shadow_vert,fragmentShader:ot.shadow_frag}};xn.physical={uniforms:Zt([xn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new je},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new je},clearcoatNormalScale:{value:new He(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new je},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new je},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new je},sheen:{value:0},sheenColor:{value:new Je(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new je},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new je},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new je},transmissionSamplerSize:{value:new He},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new je},attenuationDistance:{value:0},attenuationColor:{value:new Je(0)},specularColor:{value:new Je(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new je},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new je},anisotropyVector:{value:new He},anisotropyMap:{value:null},anisotropyMapTransform:{value:new je}}]),vertexShader:ot.meshphysical_vert,fragmentShader:ot.meshphysical_frag};const es={r:0,b:0,g:0},dp=new _t,iu=new je;iu.set(-1,0,0,0,1,0,0,0,1);function hp(n,e,t,i,r,s){const a=new Je(0);let o=r===!0?0:1,c,l,d=null,h=0,u=null;function m(P){let C=P.isScene===!0?P.background:null;if(C&&C.isTexture){const S=P.backgroundBlurriness>0;C=e.get(C,S)}return C}function M(P){let C=!1;const S=m(P);S===null?g(a,o):S&&S.isColor&&(g(S,1),C=!0);const E=n.xr.getEnvironmentBlendMode();E==="additive"?t.buffers.color.setClear(0,0,0,1,s):E==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,s),(n.autoClear||C)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function w(P,C){const S=m(C);S&&(S.isCubeTexture||S.mapping===Lr)?(l===void 0&&(l=new tn(new fi(1,1,1),new En({name:"BackgroundCubeMaterial",uniforms:ir(xn.backgroundCube.uniforms),vertexShader:xn.backgroundCube.vertexShader,fragmentShader:xn.backgroundCube.fragmentShader,side:jt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(E,y,v){this.matrixWorld.copyPosition(v.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(l)),l.material.uniforms.envMap.value=S,l.material.uniforms.backgroundBlurriness.value=C.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=C.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(dp.makeRotationFromEuler(C.backgroundRotation)).transpose(),S.isCubeTexture&&S.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(iu),l.material.toneMapped=ht.getTransfer(S.colorSpace)!==gt,(d!==S||h!==S.version||u!==n.toneMapping)&&(l.material.needsUpdate=!0,d=S,h=S.version,u=n.toneMapping),l.layers.enableAll(),P.unshift(l,l.geometry,l.material,0,0,null)):S&&S.isTexture&&(c===void 0&&(c=new tn(new Ci(2,2),new En({name:"BackgroundMaterial",uniforms:ir(xn.background.uniforms),vertexShader:xn.background.vertexShader,fragmentShader:xn.background.fragmentShader,side:Wn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=S,c.material.uniforms.backgroundIntensity.value=C.backgroundIntensity,c.material.toneMapped=ht.getTransfer(S.colorSpace)!==gt,S.matrixAutoUpdate===!0&&S.updateMatrix(),c.material.uniforms.uvTransform.value.copy(S.matrix),(d!==S||h!==S.version||u!==n.toneMapping)&&(c.material.needsUpdate=!0,d=S,h=S.version,u=n.toneMapping),c.layers.enableAll(),P.unshift(c,c.geometry,c.material,0,0,null))}function g(P,C){P.getRGB(es,Xc(n)),t.buffers.color.setClear(es.r,es.g,es.b,C,s)}function f(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(P,C=1){a.set(P),o=C,g(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(P){o=P,g(a,o)},render:M,addToRenderList:w,dispose:f}}function fp(n,e){const t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},r=u(null);let s=r,a=!1;function o(A,L,B,D,N){let k=!1;const W=h(A,D,B,L);s!==W&&(s=W,l(s.object)),k=m(A,D,B,N),k&&M(A,D,B,N),N!==null&&e.update(N,n.ELEMENT_ARRAY_BUFFER),(k||a)&&(a=!1,S(A,L,B,D),N!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(N).buffer))}function c(){return n.createVertexArray()}function l(A){return n.bindVertexArray(A)}function d(A){return n.deleteVertexArray(A)}function h(A,L,B,D){const N=D.wireframe===!0;let k=i[L.id];k===void 0&&(k={},i[L.id]=k);const W=A.isInstancedMesh===!0?A.id:0;let $=k[W];$===void 0&&($={},k[W]=$);let re=$[B.id];re===void 0&&(re={},$[B.id]=re);let me=re[N];return me===void 0&&(me=u(c()),re[N]=me),me}function u(A){const L=[],B=[],D=[];for(let N=0;N<t;N++)L[N]=0,B[N]=0,D[N]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:L,enabledAttributes:B,attributeDivisors:D,object:A,attributes:{},index:null}}function m(A,L,B,D){const N=s.attributes,k=L.attributes;let W=0;const $=B.getAttributes();for(const re in $)if($[re].location>=0){const be=N[re];let _e=k[re];if(_e===void 0&&(re==="instanceMatrix"&&A.instanceMatrix&&(_e=A.instanceMatrix),re==="instanceColor"&&A.instanceColor&&(_e=A.instanceColor)),be===void 0||be.attribute!==_e||_e&&be.data!==_e.data)return!0;W++}return s.attributesNum!==W||s.index!==D}function M(A,L,B,D){const N={},k=L.attributes;let W=0;const $=B.getAttributes();for(const re in $)if($[re].location>=0){let be=k[re];be===void 0&&(re==="instanceMatrix"&&A.instanceMatrix&&(be=A.instanceMatrix),re==="instanceColor"&&A.instanceColor&&(be=A.instanceColor));const _e={};_e.attribute=be,be&&be.data&&(_e.data=be.data),N[re]=_e,W++}s.attributes=N,s.attributesNum=W,s.index=D}function w(){const A=s.newAttributes;for(let L=0,B=A.length;L<B;L++)A[L]=0}function g(A){f(A,0)}function f(A,L){const B=s.newAttributes,D=s.enabledAttributes,N=s.attributeDivisors;B[A]=1,D[A]===0&&(n.enableVertexAttribArray(A),D[A]=1),N[A]!==L&&(n.vertexAttribDivisor(A,L),N[A]=L)}function P(){const A=s.newAttributes,L=s.enabledAttributes;for(let B=0,D=L.length;B<D;B++)L[B]!==A[B]&&(n.disableVertexAttribArray(B),L[B]=0)}function C(A,L,B,D,N,k,W){W===!0?n.vertexAttribIPointer(A,L,B,N,k):n.vertexAttribPointer(A,L,B,D,N,k)}function S(A,L,B,D){w();const N=D.attributes,k=B.getAttributes(),W=L.defaultAttributeValues;for(const $ in k){const re=k[$];if(re.location>=0){let me=N[$];if(me===void 0&&($==="instanceMatrix"&&A.instanceMatrix&&(me=A.instanceMatrix),$==="instanceColor"&&A.instanceColor&&(me=A.instanceColor)),me!==void 0){const be=me.normalized,_e=me.itemSize,Be=e.get(me);if(Be===void 0)continue;const Ze=Be.buffer,de=Be.type,z=Be.bytesPerElement,ve=de===n.INT||de===n.UNSIGNED_INT||me.gpuType===sa;if(me.isInterleavedBufferAttribute){const fe=me.data,We=fe.stride,Ye=me.offset;if(fe.isInstancedInterleavedBuffer){for(let ze=0;ze<re.locationSize;ze++)f(re.location+ze,fe.meshPerAttribute);A.isInstancedMesh!==!0&&D._maxInstanceCount===void 0&&(D._maxInstanceCount=fe.meshPerAttribute*fe.count)}else for(let ze=0;ze<re.locationSize;ze++)g(re.location+ze);n.bindBuffer(n.ARRAY_BUFFER,Ze);for(let ze=0;ze<re.locationSize;ze++)C(re.location+ze,_e/re.locationSize,de,be,We*z,(Ye+_e/re.locationSize*ze)*z,ve)}else{if(me.isInstancedBufferAttribute){for(let fe=0;fe<re.locationSize;fe++)f(re.location+fe,me.meshPerAttribute);A.isInstancedMesh!==!0&&D._maxInstanceCount===void 0&&(D._maxInstanceCount=me.meshPerAttribute*me.count)}else for(let fe=0;fe<re.locationSize;fe++)g(re.location+fe);n.bindBuffer(n.ARRAY_BUFFER,Ze);for(let fe=0;fe<re.locationSize;fe++)C(re.location+fe,_e/re.locationSize,de,be,_e*z,_e/re.locationSize*fe*z,ve)}}else if(W!==void 0){const be=W[$];if(be!==void 0)switch(be.length){case 2:n.vertexAttrib2fv(re.location,be);break;case 3:n.vertexAttrib3fv(re.location,be);break;case 4:n.vertexAttrib4fv(re.location,be);break;default:n.vertexAttrib1fv(re.location,be)}}}}P()}function E(){p();for(const A in i){const L=i[A];for(const B in L){const D=L[B];for(const N in D){const k=D[N];for(const W in k)d(k[W].object),delete k[W];delete D[N]}}delete i[A]}}function y(A){if(i[A.id]===void 0)return;const L=i[A.id];for(const B in L){const D=L[B];for(const N in D){const k=D[N];for(const W in k)d(k[W].object),delete k[W];delete D[N]}}delete i[A.id]}function v(A){for(const L in i){const B=i[L];for(const D in B){const N=B[D];if(N[A.id]===void 0)continue;const k=N[A.id];for(const W in k)d(k[W].object),delete k[W];delete N[A.id]}}}function x(A){for(const L in i){const B=i[L],D=A.isInstancedMesh===!0?A.id:0,N=B[D];if(N!==void 0){for(const k in N){const W=N[k];for(const $ in W)d(W[$].object),delete W[$];delete N[k]}delete B[D],Object.keys(B).length===0&&delete i[L]}}}function p(){b(),a=!0,s!==r&&(s=r,l(s.object))}function b(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:o,reset:p,resetDefaultState:b,dispose:E,releaseStatesOfGeometry:y,releaseStatesOfObject:x,releaseStatesOfProgram:v,initAttributes:w,enableAttribute:g,disableUnusedAttributes:P}}function pp(n,e,t){let i;function r(c){i=c}function s(c,l){n.drawArrays(i,c,l),t.update(l,i,1)}function a(c,l,d){d!==0&&(n.drawArraysInstanced(i,c,l,d),t.update(l,i,d))}function o(c,l,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,l,0,d);let u=0;for(let m=0;m<d;m++)u+=l[m];t.update(u,i,1)}this.setMode=r,this.render=s,this.renderInstances=a,this.renderMultiDraw=o}function mp(n,e,t,i){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const v=e.get("EXT_texture_filter_anisotropic");r=n.getParameter(v.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function a(v){return!(v!==dn&&i.convert(v)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(v){const x=v===Pn&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(v!==en&&i.convert(v)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&v!==vn&&!x)}function c(v){if(v==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";v="mediump"}return v==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp";const d=c(l);d!==l&&(Ke("WebGLRenderer:",l,"not supported, using",d,"instead."),l=d);const h=t.logarithmicDepthBuffer===!0,u=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&u===!1&&Ke("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const m=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),M=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),w=n.getParameter(n.MAX_TEXTURE_SIZE),g=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),f=n.getParameter(n.MAX_VERTEX_ATTRIBS),P=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),C=n.getParameter(n.MAX_VARYING_VECTORS),S=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),E=n.getParameter(n.MAX_SAMPLES),y=n.getParameter(n.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:c,textureFormatReadable:a,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:h,reversedDepthBuffer:u,maxTextures:m,maxVertexTextures:M,maxTextureSize:w,maxCubemapSize:g,maxAttributes:f,maxVertexUniforms:P,maxVaryings:C,maxFragmentUniforms:S,maxSamples:E,samples:y}}function gp(n){const e=this;let t=null,i=0,r=!1,s=!1;const a=new kn,o=new je,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(h,u){const m=h.length!==0||u||i!==0||r;return r=u,i=h.length,m},this.beginShadows=function(){s=!0,d(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(h,u){t=d(h,u,0)},this.setState=function(h,u,m){const M=h.clippingPlanes,w=h.clipIntersection,g=h.clipShadows,f=n.get(h);if(!r||M===null||M.length===0||s&&!g)s?d(null):l();else{const P=s?0:i,C=P*4;let S=f.clippingState||null;c.value=S,S=d(M,u,C,m);for(let E=0;E!==C;++E)S[E]=t[E];f.clippingState=S,this.numIntersection=w?this.numPlanes:0,this.numPlanes+=P}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function d(h,u,m,M){const w=h!==null?h.length:0;let g=null;if(w!==0){if(g=c.value,M!==!0||g===null){const f=m+w*4,P=u.matrixWorldInverse;o.getNormalMatrix(P),(g===null||g.length<f)&&(g=new Float32Array(f));for(let C=0,S=m;C!==w;++C,S+=4)a.copy(h[C]).applyMatrix4(P,o),a.normal.toArray(g,S),g[S+3]=a.constant}c.value=g,c.needsUpdate=!0}return e.numPlanes=w,e.numIntersection=0,g}}const li=4,Rl=[.125,.215,.35,.446,.526,.582],Si=20,_p=256,hr=new Sa,Cl=new Je;let Za=null,$a=0,ja=0,Ja=!1;const xp=new G;class _o{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,i=.1,r=100,s={}){const{size:a=256,position:o=xp}=s;Za=this._renderer.getRenderTarget(),$a=this._renderer.getActiveCubeFace(),ja=this._renderer.getActiveMipmapLevel(),Ja=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(e,i,r,c,o),t>0&&this._blur(c,0,0,t),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Dl(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Ll(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Za,$a,ja),this._renderer.xr.enabled=Ja,e.scissorTest=!1,qi(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===ui||e.mapping===wi?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Za=this._renderer.getRenderTarget(),$a=this._renderer.getActiveCubeFace(),ja=this._renderer.getActiveMipmapLevel(),Ja=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:Gt,minFilter:Gt,generateMipmaps:!1,type:Pn,format:dn,colorSpace:Ar,depthBuffer:!1},r=Pl(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Pl(e,t,i);const{_lodMax:s}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=vp(s)),this._blurMaterial=Sp(s,e,t),this._ggxMaterial=Mp(s,e,t)}return r}_compileMaterial(e){const t=new tn(new on,e);this._renderer.compile(t,hr)}_sceneToCubeUV(e,t,i,r,s){const c=new an(90,1,t,i),l=[1,-1,1,1,1,1],d=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,m=h.toneMapping;h.getClearColor(Cl),h.toneMapping=Sn,h.autoClear=!1,h.state.buffers.depth.getReversed()&&(h.setRenderTarget(r),h.clearDepth(),h.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new tn(new fi,new Ji({name:"PMREM.Background",side:jt,depthWrite:!1,depthTest:!1})));const w=this._backgroundBox,g=w.material;let f=!1;const P=e.background;P?P.isColor&&(g.color.copy(P),e.background=null,f=!0):(g.color.copy(Cl),f=!0);for(let C=0;C<6;C++){const S=C%3;S===0?(c.up.set(0,l[C],0),c.position.set(s.x,s.y,s.z),c.lookAt(s.x+d[C],s.y,s.z)):S===1?(c.up.set(0,0,l[C]),c.position.set(s.x,s.y,s.z),c.lookAt(s.x,s.y+d[C],s.z)):(c.up.set(0,l[C],0),c.position.set(s.x,s.y,s.z),c.lookAt(s.x,s.y,s.z+d[C]));const E=this._cubeSize;qi(r,S*E,C>2?E:0,E,E),h.setRenderTarget(r),f&&h.render(w,c),h.render(e,c)}h.toneMapping=m,h.autoClear=u,e.background=P}_textureToCubeUV(e,t){const i=this._renderer,r=e.mapping===ui||e.mapping===wi;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Dl()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Ll());const s=r?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=s;const o=s.uniforms;o.envMap.value=e;const c=this._cubeSize;qi(t,0,0,3*c,2*c),i.setRenderTarget(t),i.render(a,hr)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;const r=this._lodMeshes.length;for(let s=1;s<r;s++)this._applyGGXFilter(e,s-1,s);t.autoClear=i}_applyGGXFilter(e,t,i){const r=this._renderer,s=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[i];o.material=a;const c=a.uniforms,l=i/(this._lodMeshes.length-1),d=t/(this._lodMeshes.length-1),h=Math.sqrt(l*l-d*d),u=0+l*1.25,m=h*u,{_lodMax:M}=this,w=this._sizeLods[i],g=3*w*(i>M-li?i-M+li:0),f=4*(this._cubeSize-w);c.envMap.value=e.texture,c.roughness.value=m,c.mipInt.value=M-t,qi(s,g,f,3*w,2*w),r.setRenderTarget(s),r.render(o,hr),c.envMap.value=s.texture,c.roughness.value=0,c.mipInt.value=M-i,qi(e,g,f,3*w,2*w),r.setRenderTarget(e),r.render(o,hr)}_blur(e,t,i,r,s){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,i,r,"latitudinal",s),this._halfBlur(a,e,i,i,r,"longitudinal",s)}_halfBlur(e,t,i,r,s,a,o){const c=this._renderer,l=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&ft("blur direction must be either latitudinal or longitudinal!");const d=3,h=this._lodMeshes[r];h.material=l;const u=l.uniforms,m=this._sizeLods[i]-1,M=isFinite(s)?Math.PI/(2*m):2*Math.PI/(2*Si-1),w=s/M,g=isFinite(s)?1+Math.floor(d*w):Si;g>Si&&Ke(`sigmaRadians, ${s}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${Si}`);const f=[];let P=0;for(let v=0;v<Si;++v){const x=v/w,p=Math.exp(-x*x/2);f.push(p),v===0?P+=p:v<g&&(P+=2*p)}for(let v=0;v<f.length;v++)f[v]=f[v]/P;u.envMap.value=e.texture,u.samples.value=g,u.weights.value=f,u.latitudinal.value=a==="latitudinal",o&&(u.poleAxis.value=o);const{_lodMax:C}=this;u.dTheta.value=M,u.mipInt.value=C-i;const S=this._sizeLods[r],E=3*S*(r>C-li?r-C+li:0),y=4*(this._cubeSize-S);qi(t,E,y,3*S,2*S),c.setRenderTarget(t),c.render(h,hr)}}function vp(n){const e=[],t=[],i=[];let r=n;const s=n-li+1+Rl.length;for(let a=0;a<s;a++){const o=Math.pow(2,r);e.push(o);let c=1/o;a>n-li?c=Rl[a-n+li-1]:a===0&&(c=0),t.push(c);const l=1/(o-2),d=-l,h=1+l,u=[d,d,h,d,h,h,d,d,h,h,d,h],m=6,M=6,w=3,g=2,f=1,P=new Float32Array(w*M*m),C=new Float32Array(g*M*m),S=new Float32Array(f*M*m);for(let y=0;y<m;y++){const v=y%3*2/3-1,x=y>2?0:-1,p=[v,x,0,v+2/3,x,0,v+2/3,x+1,0,v,x,0,v+2/3,x+1,0,v,x+1,0];P.set(p,w*M*y),C.set(u,g*M*y);const b=[y,y,y,y,y,y];S.set(b,f*M*y)}const E=new on;E.setAttribute("position",new hn(P,w)),E.setAttribute("uv",new hn(C,g)),E.setAttribute("faceIndex",new hn(S,f)),i.push(new tn(E,null)),r>li&&r--}return{lodMeshes:i,sizeLods:e,sigmas:t}}function Pl(n,e,t){const i=new bn(n,e,t);return i.texture.mapping=Lr,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function qi(n,e,t,i,r){n.viewport.set(e,t,i,r),n.scissor.set(e,t,i,r)}function Mp(n,e,t){return new En({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:_p,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:ba(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:Cn,depthTest:!1,depthWrite:!1})}function Sp(n,e,t){const i=new Float32Array(Si),r=new G(0,1,0);return new En({name:"SphericalGaussianBlur",defines:{n:Si,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:ba(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Cn,depthTest:!1,depthWrite:!1})}function Ll(){return new En({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:ba(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Cn,depthTest:!1,depthWrite:!1})}function Dl(){return new En({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:ba(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Cn,depthTest:!1,depthWrite:!1})}function ba(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}class Xo extends bn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];this.texture=new Go(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new fi(5,5,5),s=new En({name:"CubemapFromEquirect",uniforms:ir(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:jt,blending:Cn});s.uniforms.tEquirect.value=t;const a=new tn(r,s),o=t.minFilter;return t.minFilter===ai&&(t.minFilter=Gt),new Jc(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,i=!0,r=!0){const s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,i,r);e.setRenderTarget(s)}}function bp(n){let e=new WeakMap,t=new WeakMap,i=null;function r(u,m=!1){return u==null?null:m?a(u):s(u)}function s(u){if(u&&u.isTexture){const m=u.mapping;if(m===rs||m===ss)if(e.has(u)){const M=e.get(u).texture;return o(M,u.mapping)}else{const M=u.image;if(M&&M.height>0){const w=new Xo(M.height);return w.fromEquirectangularTexture(n,u),e.set(u,w),u.addEventListener("dispose",l),o(w.texture,u.mapping)}else return null}}return u}function a(u){if(u&&u.isTexture){const m=u.mapping,M=m===rs||m===ss,w=m===ui||m===wi;if(M||w){let g=t.get(u);const f=g!==void 0?g.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==f)return i===null&&(i=new _o(n)),g=M?i.fromEquirectangular(u,g):i.fromCubemap(u,g),g.texture.pmremVersion=u.pmremVersion,t.set(u,g),g.texture;if(g!==void 0)return g.texture;{const P=u.image;return M&&P&&P.height>0||w&&P&&c(P)?(i===null&&(i=new _o(n)),g=M?i.fromEquirectangular(u):i.fromCubemap(u),g.texture.pmremVersion=u.pmremVersion,t.set(u,g),u.addEventListener("dispose",d),g.texture):null}}}return u}function o(u,m){return m===rs?u.mapping=ui:m===ss&&(u.mapping=wi),u}function c(u){let m=0;const M=6;for(let w=0;w<M;w++)u[w]!==void 0&&m++;return m===M}function l(u){const m=u.target;m.removeEventListener("dispose",l);const M=e.get(m);M!==void 0&&(e.delete(m),M.dispose())}function d(u){const m=u.target;m.removeEventListener("dispose",d);const M=t.get(m);M!==void 0&&(t.delete(m),M.dispose())}function h(){e=new WeakMap,t=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:r,dispose:h}}function yp(n){const e={};function t(i){if(e[i]!==void 0)return e[i];const r=n.getExtension(i);return e[i]=r,r}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const r=t(i);return r===null&&Ei("WebGLRenderer: "+i+" extension not supported."),r}}}function Ep(n,e,t,i){const r={},s=new WeakMap;function a(h){const u=h.target;u.index!==null&&e.remove(u.index);for(const M in u.attributes)e.remove(u.attributes[M]);u.removeEventListener("dispose",a),delete r[u.id];const m=s.get(u);m&&(e.remove(m),s.delete(u)),i.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,t.memory.geometries--}function o(h,u){return r[u.id]===!0||(u.addEventListener("dispose",a),r[u.id]=!0,t.memory.geometries++),u}function c(h){const u=h.attributes;for(const m in u)e.update(u[m],n.ARRAY_BUFFER)}function l(h){const u=[],m=h.index,M=h.attributes.position;let w=0;if(M===void 0)return;if(m!==null){const P=m.array;w=m.version;for(let C=0,S=P.length;C<S;C+=3){const E=P[C+0],y=P[C+1],v=P[C+2];u.push(E,y,y,v,v,E)}}else{const P=M.array;w=M.version;for(let C=0,S=P.length/3-1;C<S;C+=3){const E=C+0,y=C+1,v=C+2;u.push(E,y,y,v,v,E)}}const g=new(M.count>=65535?zo:Bo)(u,1);g.version=w;const f=s.get(h);f&&e.remove(f),s.set(h,g)}function d(h){const u=s.get(h);if(u){const m=h.index;m!==null&&u.version<m.version&&l(h)}else l(h);return s.get(h)}return{get:o,update:c,getWireframeAttribute:d}}function Tp(n,e,t){let i;function r(h){i=h}let s,a;function o(h){s=h.type,a=h.bytesPerElement}function c(h,u){n.drawElements(i,u,s,h*a),t.update(u,i,1)}function l(h,u,m){m!==0&&(n.drawElementsInstanced(i,u,s,h*a,m),t.update(u,i,m))}function d(h,u,m){if(m===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,u,0,s,h,0,m);let w=0;for(let g=0;g<m;g++)w+=u[g];t.update(w,i,1)}this.setMode=r,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=d}function Ap(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,a,o){switch(t.calls++,a){case n.TRIANGLES:t.triangles+=o*(s/3);break;case n.LINES:t.lines+=o*(s/2);break;case n.LINE_STRIP:t.lines+=o*(s-1);break;case n.LINE_LOOP:t.lines+=o*s;break;case n.POINTS:t.points+=o*s;break;default:ft("WebGLInfo: Unknown draw mode:",a);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:i}}function wp(n,e,t){const i=new WeakMap,r=new mt;function s(a,o,c){const l=a.morphTargetInfluences,d=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,h=d!==void 0?d.length:0;let u=i.get(o);if(u===void 0||u.count!==h){let p=function(){v.dispose(),i.delete(o),o.removeEventListener("dispose",p)};u!==void 0&&u.texture.dispose();const m=o.morphAttributes.position!==void 0,M=o.morphAttributes.normal!==void 0,w=o.morphAttributes.color!==void 0,g=o.morphAttributes.position||[],f=o.morphAttributes.normal||[],P=o.morphAttributes.color||[];let C=0;m===!0&&(C=1),M===!0&&(C=2),w===!0&&(C=3);let S=o.attributes.position.count*C,E=1;S>e.maxTextureSize&&(E=Math.ceil(S/e.maxTextureSize),S=e.maxTextureSize);const y=new Float32Array(S*E*4*h),v=new ko(y,S,E,h);v.type=vn,v.needsUpdate=!0;const x=C*4;for(let b=0;b<h;b++){const A=g[b],L=f[b],B=P[b],D=S*E*4*b;for(let N=0;N<A.count;N++){const k=N*x;m===!0&&(r.fromBufferAttribute(A,N),y[D+k+0]=r.x,y[D+k+1]=r.y,y[D+k+2]=r.z,y[D+k+3]=0),M===!0&&(r.fromBufferAttribute(L,N),y[D+k+4]=r.x,y[D+k+5]=r.y,y[D+k+6]=r.z,y[D+k+7]=0),w===!0&&(r.fromBufferAttribute(B,N),y[D+k+8]=r.x,y[D+k+9]=r.y,y[D+k+10]=r.z,y[D+k+11]=B.itemSize===4?r.w:1)}}u={count:h,texture:v,size:new He(S,E)},i.set(o,u),o.addEventListener("dispose",p)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)c.getUniforms().setValue(n,"morphTexture",a.morphTexture,t);else{let m=0;for(let w=0;w<l.length;w++)m+=l[w];const M=o.morphTargetsRelative?1:1-m;c.getUniforms().setValue(n,"morphTargetBaseInfluence",M),c.getUniforms().setValue(n,"morphTargetInfluences",l)}c.getUniforms().setValue(n,"morphTargetsTexture",u.texture,t),c.getUniforms().setValue(n,"morphTargetsTextureSize",u.size)}return{update:s}}function Rp(n,e,t,i,r){let s=new WeakMap;function a(l){const d=r.render.frame,h=l.geometry,u=e.get(l,h);if(s.get(u)!==d&&(e.update(u),s.set(u,d)),l.isInstancedMesh&&(l.hasEventListener("dispose",c)===!1&&l.addEventListener("dispose",c),s.get(l)!==d&&(t.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,n.ARRAY_BUFFER),s.set(l,d))),l.isSkinnedMesh){const m=l.skeleton;s.get(m)!==d&&(m.update(),s.set(m,d))}return u}function o(){s=new WeakMap}function c(l){const d=l.target;d.removeEventListener("dispose",c),i.releaseStatesOfObject(d),t.remove(d.instanceMatrix),d.instanceColor!==null&&t.remove(d.instanceColor)}return{update:a,dispose:o}}const Cp={[yo]:"LINEAR_TONE_MAPPING",[Eo]:"REINHARD_TONE_MAPPING",[To]:"CINEON_TONE_MAPPING",[ra]:"ACES_FILMIC_TONE_MAPPING",[wo]:"AGX_TONE_MAPPING",[Ro]:"NEUTRAL_TONE_MAPPING",[Ao]:"CUSTOM_TONE_MAPPING"};function Pp(n,e,t,i,r,s){const a=new bn(e,t,{type:n,depthBuffer:r,stencilBuffer:s,samples:i?4:0,depthTexture:r?new Ri(e,t):void 0}),o=new bn(e,t,{type:Pn,depthBuffer:!1,stencilBuffer:!1}),c=new on;c.setAttribute("position",new Yt([-1,3,0,-1,-1,0,3,-1,0],3)),c.setAttribute("uv",new Yt([0,2,0,0,2,0],2));const l=new Yc({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),d=new tn(c,l),h=new Sa(-1,1,1,-1,0,1);let u=null,m=null,M=!1,w,g=null,f=[],P=!1;this.setSize=function(C,S){a.setSize(C,S),o.setSize(C,S);for(let E=0;E<f.length;E++){const y=f[E];y.setSize&&y.setSize(C,S)}},this.setEffects=function(C){f=C,P=f.length>0&&f[0].isRenderPass===!0;const S=a.width,E=a.height;for(let y=0;y<f.length;y++){const v=f[y];v.setSize&&v.setSize(S,E)}},this.begin=function(C,S){if(M||C.toneMapping===Sn&&f.length===0)return!1;if(g=S,S!==null){const E=S.width,y=S.height;(a.width!==E||a.height!==y)&&this.setSize(E,y)}return P===!1&&C.setRenderTarget(a),w=C.toneMapping,C.toneMapping=Sn,!0},this.hasRenderPass=function(){return P},this.end=function(C,S){C.toneMapping=w,M=!0;let E=a,y=o;for(let v=0;v<f.length;v++){const x=f[v];if(x.enabled!==!1&&(x.render(C,y,E,S),x.needsSwap!==!1)){const p=E;E=y,y=p}}if(u!==C.outputColorSpace||m!==C.toneMapping){u=C.outputColorSpace,m=C.toneMapping,l.defines={},ht.getTransfer(u)===gt&&(l.defines.SRGB_TRANSFER="");const v=Cp[m];v&&(l.defines[v]=""),l.needsUpdate=!0}l.uniforms.tDiffuse.value=E.texture,C.setRenderTarget(g),C.render(d,h),g=null,M=!1},this.isCompositing=function(){return M},this.dispose=function(){a.depthTexture&&a.depthTexture.dispose(),a.dispose(),o.dispose(),c.dispose(),l.dispose()}}const ru=new Vt,xo=new Ri(1,1),su=new ko,au=new zc,ou=new Go,Il=[],Ul=[],Nl=new Float32Array(16),Fl=new Float32Array(9),Ol=new Float32Array(4);function ar(n,e,t){const i=n[0];if(i<=0||i>0)return n;const r=e*t;let s=Il[r];if(s===void 0&&(s=new Float32Array(r),Il[r]=s),e!==0){i.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=t,n[a].toArray(s,o)}return s}function Ut(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function Nt(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function ya(n,e){let t=Ul[e];t===void 0&&(t=new Int32Array(e),Ul[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function Lp(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function Dp(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ut(t,e))return;n.uniform2fv(this.addr,e),Nt(t,e)}}function Ip(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Ut(t,e))return;n.uniform3fv(this.addr,e),Nt(t,e)}}function Up(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ut(t,e))return;n.uniform4fv(this.addr,e),Nt(t,e)}}function Np(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Ut(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),Nt(t,e)}else{if(Ut(t,i))return;Ol.set(i),n.uniformMatrix2fv(this.addr,!1,Ol),Nt(t,i)}}function Fp(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Ut(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),Nt(t,e)}else{if(Ut(t,i))return;Fl.set(i),n.uniformMatrix3fv(this.addr,!1,Fl),Nt(t,i)}}function Op(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Ut(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),Nt(t,e)}else{if(Ut(t,i))return;Nl.set(i),n.uniformMatrix4fv(this.addr,!1,Nl),Nt(t,i)}}function kp(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function Bp(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ut(t,e))return;n.uniform2iv(this.addr,e),Nt(t,e)}}function zp(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ut(t,e))return;n.uniform3iv(this.addr,e),Nt(t,e)}}function Gp(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ut(t,e))return;n.uniform4iv(this.addr,e),Nt(t,e)}}function Vp(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function Hp(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ut(t,e))return;n.uniform2uiv(this.addr,e),Nt(t,e)}}function Wp(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ut(t,e))return;n.uniform3uiv(this.addr,e),Nt(t,e)}}function Xp(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ut(t,e))return;n.uniform4uiv(this.addr,e),Nt(t,e)}}function qp(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r);let s;this.type===n.SAMPLER_2D_SHADOW?(xo.compareFunction=t.isReversedDepthBuffer()?ha:da,s=xo):s=ru,t.setTexture2D(e||s,r)}function Yp(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture3D(e||au,r)}function Kp(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTextureCube(e||ou,r)}function Zp(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture2DArray(e||su,r)}function $p(n){switch(n){case 5126:return Lp;case 35664:return Dp;case 35665:return Ip;case 35666:return Up;case 35674:return Np;case 35675:return Fp;case 35676:return Op;case 5124:case 35670:return kp;case 35667:case 35671:return Bp;case 35668:case 35672:return zp;case 35669:case 35673:return Gp;case 5125:return Vp;case 36294:return Hp;case 36295:return Wp;case 36296:return Xp;case 35678:case 36198:case 36298:case 36306:case 35682:return qp;case 35679:case 36299:case 36307:return Yp;case 35680:case 36300:case 36308:case 36293:return Kp;case 36289:case 36303:case 36311:case 36292:return Zp}}function jp(n,e){n.uniform1fv(this.addr,e)}function Jp(n,e){const t=ar(e,this.size,2);n.uniform2fv(this.addr,t)}function Qp(n,e){const t=ar(e,this.size,3);n.uniform3fv(this.addr,t)}function em(n,e){const t=ar(e,this.size,4);n.uniform4fv(this.addr,t)}function tm(n,e){const t=ar(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function nm(n,e){const t=ar(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function im(n,e){const t=ar(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function rm(n,e){n.uniform1iv(this.addr,e)}function sm(n,e){n.uniform2iv(this.addr,e)}function am(n,e){n.uniform3iv(this.addr,e)}function om(n,e){n.uniform4iv(this.addr,e)}function lm(n,e){n.uniform1uiv(this.addr,e)}function cm(n,e){n.uniform2uiv(this.addr,e)}function um(n,e){n.uniform3uiv(this.addr,e)}function dm(n,e){n.uniform4uiv(this.addr,e)}function hm(n,e,t){const i=this.cache,r=e.length,s=ya(t,r);Ut(i,s)||(n.uniform1iv(this.addr,s),Nt(i,s));let a;this.type===n.SAMPLER_2D_SHADOW?a=xo:a=ru;for(let o=0;o!==r;++o)t.setTexture2D(e[o]||a,s[o])}function fm(n,e,t){const i=this.cache,r=e.length,s=ya(t,r);Ut(i,s)||(n.uniform1iv(this.addr,s),Nt(i,s));for(let a=0;a!==r;++a)t.setTexture3D(e[a]||au,s[a])}function pm(n,e,t){const i=this.cache,r=e.length,s=ya(t,r);Ut(i,s)||(n.uniform1iv(this.addr,s),Nt(i,s));for(let a=0;a!==r;++a)t.setTextureCube(e[a]||ou,s[a])}function mm(n,e,t){const i=this.cache,r=e.length,s=ya(t,r);Ut(i,s)||(n.uniform1iv(this.addr,s),Nt(i,s));for(let a=0;a!==r;++a)t.setTexture2DArray(e[a]||su,s[a])}function gm(n){switch(n){case 5126:return jp;case 35664:return Jp;case 35665:return Qp;case 35666:return em;case 35674:return tm;case 35675:return nm;case 35676:return im;case 5124:case 35670:return rm;case 35667:case 35671:return sm;case 35668:case 35672:return am;case 35669:case 35673:return om;case 5125:return lm;case 36294:return cm;case 36295:return um;case 36296:return dm;case 35678:case 36198:case 36298:case 36306:case 35682:return hm;case 35679:case 36299:case 36307:return fm;case 35680:case 36300:case 36308:case 36293:return pm;case 36289:case 36303:case 36311:case 36292:return mm}}class _m{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=$p(t.type)}}class xm{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=gm(t.type)}}class vm{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const r=this.seq;for(let s=0,a=r.length;s!==a;++s){const o=r[s];o.setValue(e,t[o.id],i)}}}const Qa=/(\w+)(\])?(\[|\.)?/g;function kl(n,e){n.seq.push(e),n.map[e.id]=e}function Mm(n,e,t){const i=n.name,r=i.length;for(Qa.lastIndex=0;;){const s=Qa.exec(i),a=Qa.lastIndex;let o=s[1];const c=s[2]==="]",l=s[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===r){kl(t,l===void 0?new _m(o,n,e):new xm(o,n,e));break}else{let h=t.map[o];h===void 0&&(h=new vm(o),kl(t,h)),t=h}}}class ls{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<i;++a){const o=e.getActiveUniform(t,a),c=e.getUniformLocation(t,o.name);Mm(o,c,this)}const r=[],s=[];for(const a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(a):s.push(a);r.length>0&&(this.seq=r.concat(s))}setValue(e,t,i,r){const s=this.map[t];s!==void 0&&s.setValue(e,i,r)}setOptional(e,t,i){const r=t[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,t,i,r){for(let s=0,a=t.length;s!==a;++s){const o=t[s],c=i[o.id];c.needsUpdate!==!1&&o.setValue(e,c.value,r)}}static seqWithValue(e,t){const i=[];for(let r=0,s=e.length;r!==s;++r){const a=e[r];a.id in t&&i.push(a)}return i}}function Bl(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const Sm=37297;let bm=0;function ym(n,e){const t=n.split(`
`),i=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let a=r;a<s;a++){const o=a+1;i.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return i.join(`
`)}const zl=new je;function Em(n){ht._getMatrix(zl,ht.workingColorSpace,n);const e=`mat3( ${zl.elements.map(t=>t.toFixed(4))} )`;switch(ht.getTransfer(n)){case wr:return[e,"LinearTransferOETF"];case gt:return[e,"sRGBTransferOETF"];default:return Ke("WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function Gl(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),s=(n.getShaderInfoLog(e)||"").trim();if(i&&s==="")return"";const a=/ERROR: 0:(\d+)/.exec(s);if(a){const o=parseInt(a[1]);return t.toUpperCase()+`

`+s+`

`+ym(n.getShaderSource(e),o)}else return s}function Tm(n,e){const t=Em(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const Am={[yo]:"Linear",[Eo]:"Reinhard",[To]:"Cineon",[ra]:"ACESFilmic",[wo]:"AgX",[Ro]:"Neutral",[Ao]:"Custom"};function wm(n,e){const t=Am[e];return t===void 0?(Ke("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+n+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const ts=new G;function Rm(){ht.getLuminanceCoefficients(ts);const n=ts.x.toFixed(4),e=ts.y.toFixed(4),t=ts.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Cm(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(mr).join(`
`)}function Pm(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function Lm(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const s=n.getActiveAttrib(e,r),a=s.name;let o=1;s.type===n.FLOAT_MAT2&&(o=2),s.type===n.FLOAT_MAT3&&(o=3),s.type===n.FLOAT_MAT4&&(o=4),t[a]={type:s.type,location:n.getAttribLocation(e,a),locationSize:o}}return t}function mr(n){return n!==""}function Vl(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Hl(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const Dm=/^[ \t]*#include +<([\w\d./]+)>/gm;function vo(n){return n.replace(Dm,Um)}const Im=new Map;function Um(n,e){let t=ot[e];if(t===void 0){const i=Im.get(e);if(i!==void 0)t=ot[i],Ke('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return vo(t)}const Nm=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Wl(n){return n.replace(Nm,Fm)}function Fm(n,e,t,i){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function Xl(n){let e=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;return n.precision==="highp"?e+=`
#define HIGH_PRECISION`:n.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}const Om={[gr]:"SHADOWMAP_TYPE_PCF",[Zi]:"SHADOWMAP_TYPE_VSM"};function km(n){return Om[n.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const Bm={[ui]:"ENVMAP_TYPE_CUBE",[wi]:"ENVMAP_TYPE_CUBE",[Lr]:"ENVMAP_TYPE_CUBE_UV"};function zm(n){return n.envMap===!1?"ENVMAP_TYPE_CUBE":Bm[n.envMapMode]||"ENVMAP_TYPE_CUBE"}const Gm={[wi]:"ENVMAP_MODE_REFRACTION"};function Vm(n){return n.envMap===!1?"ENVMAP_MODE_REFLECTION":Gm[n.envMapMode]||"ENVMAP_MODE_REFLECTION"}const Hm={[bo]:"ENVMAP_BLENDING_MULTIPLY",[Tc]:"ENVMAP_BLENDING_MIX",[Ac]:"ENVMAP_BLENDING_ADD"};function Wm(n){return n.envMap===!1?"ENVMAP_BLENDING_NONE":Hm[n.combine]||"ENVMAP_BLENDING_NONE"}function Xm(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function qm(n,e,t,i){const r=n.getContext(),s=t.defines;let a=t.vertexShader,o=t.fragmentShader;const c=km(t),l=zm(t),d=Vm(t),h=Wm(t),u=Xm(t),m=Cm(t),M=Pm(s),w=r.createProgram();let g,f,P=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,M].filter(mr).join(`
`),g.length>0&&(g+=`
`),f=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,M].filter(mr).join(`
`),f.length>0&&(f+=`
`)):(g=[Xl(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,M,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+d:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(mr).join(`
`),f=[Xl(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,M,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+d:"",t.envMap?"#define "+h:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Sn?"#define TONE_MAPPING":"",t.toneMapping!==Sn?ot.tonemapping_pars_fragment:"",t.toneMapping!==Sn?wm("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",ot.colorspace_pars_fragment,Tm("linearToOutputTexel",t.outputColorSpace),Rm(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(mr).join(`
`)),a=vo(a),a=Vl(a,t),a=Hl(a,t),o=vo(o),o=Vl(o,t),o=Hl(o,t),a=Wl(a),o=Wl(o),t.isRawShaderMaterial!==!0&&(P=`#version 300 es
`,g=[m,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,f=["#define varying in",t.glslVersion===uo?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===uo?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);const C=P+g+a,S=P+f+o,E=Bl(r,r.VERTEX_SHADER,C),y=Bl(r,r.FRAGMENT_SHADER,S);r.attachShader(w,E),r.attachShader(w,y),t.index0AttributeName!==void 0?r.bindAttribLocation(w,0,t.index0AttributeName):t.hasPositionAttribute===!0&&r.bindAttribLocation(w,0,"position"),r.linkProgram(w);function v(A){if(n.debug.checkShaderErrors){const L=r.getProgramInfoLog(w)||"",B=r.getShaderInfoLog(E)||"",D=r.getShaderInfoLog(y)||"",N=L.trim(),k=B.trim(),W=D.trim();let $=!0,re=!0;if(r.getProgramParameter(w,r.LINK_STATUS)===!1)if($=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(r,w,E,y);else{const me=Gl(r,E,"vertex"),be=Gl(r,y,"fragment");ft("WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(w,r.VALIDATE_STATUS)+`

Material Name: `+A.name+`
Material Type: `+A.type+`

Program Info Log: `+N+`
`+me+`
`+be)}else N!==""?Ke("WebGLProgram: Program Info Log:",N):(k===""||W==="")&&(re=!1);re&&(A.diagnostics={runnable:$,programLog:N,vertexShader:{log:k,prefix:g},fragmentShader:{log:W,prefix:f}})}r.deleteShader(E),r.deleteShader(y),x=new ls(r,w),p=Lm(r,w)}let x;this.getUniforms=function(){return x===void 0&&v(this),x};let p;this.getAttributes=function(){return p===void 0&&v(this),p};let b=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return b===!1&&(b=r.getProgramParameter(w,Sm)),b},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(w),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=bm++,this.cacheKey=e,this.usedTimes=1,this.program=w,this.vertexShader=E,this.fragmentShader=y,this}let Ym=0;class Km{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,i){const r=this._getShaderCacheForMaterial(e);return r.has(t)===!1&&(r.add(t),t.usedTimes++),r.has(i)===!1&&(r.add(i),i.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new Zm(e),t.set(e,i)),i}}class Zm{constructor(e){this.id=Ym++,this.code=e,this.usedTimes=0}}function $m(n){return n===di||n===Er||n===Tr}function jm(n,e,t,i,r,s){const a=new pa,o=new Km,c=new Set,l=[],d=new Map,h=i.logarithmicDepthBuffer;let u=i.precision;const m={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function M(x){return c.add(x),x===0?"uv":`uv${x}`}function w(x,p,b,A,L,B){const D=A.fog,N=L.geometry,k=x.isMeshStandardMaterial||x.isMeshLambertMaterial||x.isMeshPhongMaterial?A.environment:null,W=x.isMeshStandardMaterial||x.isMeshLambertMaterial&&!x.envMap||x.isMeshPhongMaterial&&!x.envMap,$=e.get(x.envMap||k,W),re=$&&$.mapping===Lr?$.image.height:null,me=m[x.type];x.precision!==null&&(u=i.getMaxPrecision(x.precision),u!==x.precision&&Ke("WebGLProgram.getParameters:",x.precision,"not supported, using",u,"instead."));const be=N.morphAttributes.position||N.morphAttributes.normal||N.morphAttributes.color,_e=be!==void 0?be.length:0;let Be=0;N.morphAttributes.position!==void 0&&(Be=1),N.morphAttributes.normal!==void 0&&(Be=2),N.morphAttributes.color!==void 0&&(Be=3);let Ze,de,z,ve;if(me){const Ie=xn[me];Ze=Ie.vertexShader,de=Ie.fragmentShader}else{Ze=x.vertexShader,de=x.fragmentShader;const Ie=o.getVertexShaderStage(x),tt=o.getFragmentShaderStage(x);o.update(x,Ie,tt),z=Ie.id,ve=tt.id}const fe=n.getRenderTarget(),We=n.state.buffers.depth.getReversed(),Ye=L.isInstancedMesh===!0,ze=L.isBatchedMesh===!0,nt=!!x.map,Qe=!!x.matcap,it=!!$,ct=!!x.aoMap,$e=!!x.lightMap,ye=!!x.bumpMap&&x.wireframe===!1,j=!!x.normalMap,ce=!!x.displacementMap,pe=!!x.emissiveMap,ae=!!x.metalnessMap,Ae=!!x.roughnessMap,I=x.anisotropy>0,et=x.clearcoat>0,Le=x.dispersion>0,R=x.iridescence>0,_=x.sheen>0,O=x.transmission>0,V=I&&!!x.anisotropyMap,q=et&&!!x.clearcoatMap,ue=et&&!!x.clearcoatNormalMap,Q=et&&!!x.clearcoatRoughnessMap,H=R&&!!x.iridescenceMap,Y=R&&!!x.iridescenceThicknessMap,oe=_&&!!x.sheenColorMap,xe=_&&!!x.sheenRoughnessMap,ge=!!x.specularMap,Me=!!x.specularColorMap,De=!!x.specularIntensityMap,Fe=O&&!!x.transmissionMap,Xe=O&&!!x.thicknessMap,F=!!x.gradientMap,Se=!!x.alphaMap,ie=x.alphaTest>0,Ee=!!x.alphaHash,we=!!x.extensions;let le=Sn;x.toneMapped&&(fe===null||fe.isXRRenderTarget===!0)&&(le=n.toneMapping);const Oe={shaderID:me,shaderType:x.type,shaderName:x.name,vertexShader:Ze,fragmentShader:de,defines:x.defines,customVertexShaderID:z,customFragmentShaderID:ve,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:u,batching:ze,batchingColor:ze&&L._colorsTexture!==null,instancing:Ye,instancingColor:Ye&&L.instanceColor!==null,instancingMorph:Ye&&L.morphTexture!==null,outputColorSpace:fe===null?n.outputColorSpace:fe.isXRRenderTarget===!0?fe.texture.colorSpace:ht.workingColorSpace,alphaToCoverage:!!x.alphaToCoverage,map:nt,matcap:Qe,envMap:it,envMapMode:it&&$.mapping,envMapCubeUVHeight:re,aoMap:ct,lightMap:$e,bumpMap:ye,normalMap:j,displacementMap:ce,emissiveMap:pe,normalMapObjectSpace:j&&x.normalMapType===Cc,normalMapTangentSpace:j&&x.normalMapType===Js,packedNormalMap:j&&x.normalMapType===Js&&$m(x.normalMap.format),metalnessMap:ae,roughnessMap:Ae,anisotropy:I,anisotropyMap:V,clearcoat:et,clearcoatMap:q,clearcoatNormalMap:ue,clearcoatRoughnessMap:Q,dispersion:Le,iridescence:R,iridescenceMap:H,iridescenceThicknessMap:Y,sheen:_,sheenColorMap:oe,sheenRoughnessMap:xe,specularMap:ge,specularColorMap:Me,specularIntensityMap:De,transmission:O,transmissionMap:Fe,thicknessMap:Xe,gradientMap:F,opaque:x.transparent===!1&&x.blending===yi&&x.alphaToCoverage===!1,alphaMap:Se,alphaTest:ie,alphaHash:Ee,combine:x.combine,mapUv:nt&&M(x.map.channel),aoMapUv:ct&&M(x.aoMap.channel),lightMapUv:$e&&M(x.lightMap.channel),bumpMapUv:ye&&M(x.bumpMap.channel),normalMapUv:j&&M(x.normalMap.channel),displacementMapUv:ce&&M(x.displacementMap.channel),emissiveMapUv:pe&&M(x.emissiveMap.channel),metalnessMapUv:ae&&M(x.metalnessMap.channel),roughnessMapUv:Ae&&M(x.roughnessMap.channel),anisotropyMapUv:V&&M(x.anisotropyMap.channel),clearcoatMapUv:q&&M(x.clearcoatMap.channel),clearcoatNormalMapUv:ue&&M(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Q&&M(x.clearcoatRoughnessMap.channel),iridescenceMapUv:H&&M(x.iridescenceMap.channel),iridescenceThicknessMapUv:Y&&M(x.iridescenceThicknessMap.channel),sheenColorMapUv:oe&&M(x.sheenColorMap.channel),sheenRoughnessMapUv:xe&&M(x.sheenRoughnessMap.channel),specularMapUv:ge&&M(x.specularMap.channel),specularColorMapUv:Me&&M(x.specularColorMap.channel),specularIntensityMapUv:De&&M(x.specularIntensityMap.channel),transmissionMapUv:Fe&&M(x.transmissionMap.channel),thicknessMapUv:Xe&&M(x.thicknessMap.channel),alphaMapUv:Se&&M(x.alphaMap.channel),vertexTangents:!!N.attributes.tangent&&(j||I),vertexNormals:!!N.attributes.normal,vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!N.attributes.color&&N.attributes.color.itemSize===4,pointsUvs:L.isPoints===!0&&!!N.attributes.uv&&(nt||Se),fog:!!D,useFog:x.fog===!0,fogExp2:!!D&&D.isFogExp2,flatShading:x.wireframe===!1&&(x.flatShading===!0||N.attributes.normal===void 0&&j===!1&&(x.isMeshLambertMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isMeshPhysicalMaterial)),sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:h,reversedDepthBuffer:We,skinning:L.isSkinnedMesh===!0,hasPositionAttribute:N.attributes.position!==void 0,morphTargets:N.morphAttributes.position!==void 0,morphNormals:N.morphAttributes.normal!==void 0,morphColors:N.morphAttributes.color!==void 0,morphTargetsCount:_e,morphTextureStride:Be,numDirLights:p.directional.length,numPointLights:p.point.length,numSpotLights:p.spot.length,numSpotLightMaps:p.spotLightMap.length,numRectAreaLights:p.rectArea.length,numHemiLights:p.hemi.length,numDirLightShadows:p.directionalShadowMap.length,numPointLightShadows:p.pointShadowMap.length,numSpotLightShadows:p.spotShadowMap.length,numSpotLightShadowsWithMaps:p.numSpotLightShadowsWithMaps,numLightProbes:p.numLightProbes,numLightProbeGrids:B.length,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:x.dithering,shadowMapEnabled:n.shadowMap.enabled&&b.length>0,shadowMapType:n.shadowMap.type,toneMapping:le,decodeVideoTexture:nt&&x.map.isVideoTexture===!0&&ht.getTransfer(x.map.colorSpace)===gt,decodeVideoTextureEmissive:pe&&x.emissiveMap.isVideoTexture===!0&&ht.getTransfer(x.emissiveMap.colorSpace)===gt,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===$t,flipSided:x.side===jt,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionClipCullDistance:we&&x.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(we&&x.extensions.multiDraw===!0||ze)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:x.customProgramCacheKey()};return Oe.vertexUv1s=c.has(1),Oe.vertexUv2s=c.has(2),Oe.vertexUv3s=c.has(3),c.clear(),Oe}function g(x){const p=[];if(x.shaderID?p.push(x.shaderID):(p.push(x.customVertexShaderID),p.push(x.customFragmentShaderID)),x.defines!==void 0)for(const b in x.defines)p.push(b),p.push(x.defines[b]);return x.isRawShaderMaterial===!1&&(f(p,x),P(p,x),p.push(n.outputColorSpace)),p.push(x.customProgramCacheKey),p.join()}function f(x,p){x.push(p.precision),x.push(p.outputColorSpace),x.push(p.envMapMode),x.push(p.envMapCubeUVHeight),x.push(p.mapUv),x.push(p.alphaMapUv),x.push(p.lightMapUv),x.push(p.aoMapUv),x.push(p.bumpMapUv),x.push(p.normalMapUv),x.push(p.displacementMapUv),x.push(p.emissiveMapUv),x.push(p.metalnessMapUv),x.push(p.roughnessMapUv),x.push(p.anisotropyMapUv),x.push(p.clearcoatMapUv),x.push(p.clearcoatNormalMapUv),x.push(p.clearcoatRoughnessMapUv),x.push(p.iridescenceMapUv),x.push(p.iridescenceThicknessMapUv),x.push(p.sheenColorMapUv),x.push(p.sheenRoughnessMapUv),x.push(p.specularMapUv),x.push(p.specularColorMapUv),x.push(p.specularIntensityMapUv),x.push(p.transmissionMapUv),x.push(p.thicknessMapUv),x.push(p.combine),x.push(p.fogExp2),x.push(p.sizeAttenuation),x.push(p.morphTargetsCount),x.push(p.morphAttributeCount),x.push(p.numDirLights),x.push(p.numPointLights),x.push(p.numSpotLights),x.push(p.numSpotLightMaps),x.push(p.numHemiLights),x.push(p.numRectAreaLights),x.push(p.numDirLightShadows),x.push(p.numPointLightShadows),x.push(p.numSpotLightShadows),x.push(p.numSpotLightShadowsWithMaps),x.push(p.numLightProbes),x.push(p.shadowMapType),x.push(p.toneMapping),x.push(p.numClippingPlanes),x.push(p.numClipIntersection),x.push(p.depthPacking)}function P(x,p){a.disableAll(),p.instancing&&a.enable(0),p.instancingColor&&a.enable(1),p.instancingMorph&&a.enable(2),p.matcap&&a.enable(3),p.envMap&&a.enable(4),p.normalMapObjectSpace&&a.enable(5),p.normalMapTangentSpace&&a.enable(6),p.clearcoat&&a.enable(7),p.iridescence&&a.enable(8),p.alphaTest&&a.enable(9),p.vertexColors&&a.enable(10),p.vertexAlphas&&a.enable(11),p.vertexUv1s&&a.enable(12),p.vertexUv2s&&a.enable(13),p.vertexUv3s&&a.enable(14),p.vertexTangents&&a.enable(15),p.anisotropy&&a.enable(16),p.alphaHash&&a.enable(17),p.batching&&a.enable(18),p.dispersion&&a.enable(19),p.batchingColor&&a.enable(20),p.gradientMap&&a.enable(21),p.packedNormalMap&&a.enable(22),p.vertexNormals&&a.enable(23),x.push(a.mask),a.disableAll(),p.fog&&a.enable(0),p.useFog&&a.enable(1),p.flatShading&&a.enable(2),p.logarithmicDepthBuffer&&a.enable(3),p.reversedDepthBuffer&&a.enable(4),p.skinning&&a.enable(5),p.morphTargets&&a.enable(6),p.morphNormals&&a.enable(7),p.morphColors&&a.enable(8),p.premultipliedAlpha&&a.enable(9),p.shadowMapEnabled&&a.enable(10),p.doubleSided&&a.enable(11),p.flipSided&&a.enable(12),p.useDepthPacking&&a.enable(13),p.dithering&&a.enable(14),p.transmission&&a.enable(15),p.sheen&&a.enable(16),p.opaque&&a.enable(17),p.pointsUvs&&a.enable(18),p.decodeVideoTexture&&a.enable(19),p.decodeVideoTextureEmissive&&a.enable(20),p.alphaToCoverage&&a.enable(21),p.numLightProbeGrids>0&&a.enable(22),p.hasPositionAttribute&&a.enable(23),x.push(a.mask)}function C(x){const p=m[x.type];let b;if(p){const A=xn[p];b=qc.clone(A.uniforms)}else b=x.uniforms;return b}function S(x,p){let b=d.get(p);return b!==void 0?++b.usedTimes:(b=new qm(n,p,x,r),l.push(b),d.set(p,b)),b}function E(x){if(--x.usedTimes===0){const p=l.indexOf(x);l[p]=l[l.length-1],l.pop(),d.delete(x.cacheKey),x.destroy()}}function y(x){o.remove(x)}function v(){o.dispose()}return{getParameters:w,getProgramCacheKey:g,getUniforms:C,acquireProgram:S,releaseProgram:E,releaseShaderCache:y,programs:l,dispose:v}}function Jm(){let n=new WeakMap;function e(a){return n.has(a)}function t(a){let o=n.get(a);return o===void 0&&(o={},n.set(a,o)),o}function i(a){n.delete(a)}function r(a,o,c){n.get(a)[o]=c}function s(){n=new WeakMap}return{has:e,get:t,remove:i,update:r,dispose:s}}function Qm(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.materialVariant!==e.materialVariant?n.materialVariant-e.materialVariant:n.z!==e.z?n.z-e.z:n.id-e.id}function ql(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function Yl(){const n=[];let e=0;const t=[],i=[],r=[];function s(){e=0,t.length=0,i.length=0,r.length=0}function a(u){let m=0;return u.isInstancedMesh&&(m+=2),u.isSkinnedMesh&&(m+=1),m}function o(u,m,M,w,g,f){let P=n[e];return P===void 0?(P={id:u.id,object:u,geometry:m,material:M,materialVariant:a(u),groupOrder:w,renderOrder:u.renderOrder,z:g,group:f},n[e]=P):(P.id=u.id,P.object=u,P.geometry=m,P.material=M,P.materialVariant=a(u),P.groupOrder=w,P.renderOrder=u.renderOrder,P.z=g,P.group=f),e++,P}function c(u,m,M,w,g,f){const P=o(u,m,M,w,g,f);M.transmission>0?i.push(P):M.transparent===!0?r.push(P):t.push(P)}function l(u,m,M,w,g,f){const P=o(u,m,M,w,g,f);M.transmission>0?i.unshift(P):M.transparent===!0?r.unshift(P):t.unshift(P)}function d(u,m,M){t.length>1&&t.sort(u||Qm),i.length>1&&i.sort(m||ql),r.length>1&&r.sort(m||ql),M&&(t.reverse(),i.reverse(),r.reverse())}function h(){for(let u=e,m=n.length;u<m;u++){const M=n[u];if(M.id===null)break;M.id=null,M.object=null,M.geometry=null,M.material=null,M.group=null}}return{opaque:t,transmissive:i,transparent:r,init:s,push:c,unshift:l,finish:h,sort:d}}function eg(){let n=new WeakMap;function e(i,r){const s=n.get(i);let a;return s===void 0?(a=new Yl,n.set(i,[a])):r>=s.length?(a=new Yl,s.push(a)):a=s[r],a}function t(){n=new WeakMap}return{get:e,dispose:t}}function tg(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new G,color:new Je};break;case"SpotLight":t={position:new G,direction:new G,color:new Je,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new G,color:new Je,distance:0,decay:0};break;case"HemisphereLight":t={direction:new G,skyColor:new Je,groundColor:new Je};break;case"RectAreaLight":t={color:new Je,position:new G,halfWidth:new G,halfHeight:new G};break}return n[e.id]=t,t}}}function ng(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new He};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new He};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new He,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let ig=0;function rg(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function sg(n){const e=new tg,t=ng(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)i.probe.push(new G);const r=new G,s=new _t,a=new _t;function o(l){let d=0,h=0,u=0;for(let p=0;p<9;p++)i.probe[p].set(0,0,0);let m=0,M=0,w=0,g=0,f=0,P=0,C=0,S=0,E=0,y=0,v=0;l.sort(rg);for(let p=0,b=l.length;p<b;p++){const A=l[p],L=A.color,B=A.intensity,D=A.distance;let N=null;if(A.shadow&&A.shadow.map&&(A.shadow.map.texture.format===di?N=A.shadow.map.texture:N=A.shadow.map.depthTexture||A.shadow.map.texture),A.isAmbientLight)d+=L.r*B,h+=L.g*B,u+=L.b*B;else if(A.isLightProbe){for(let k=0;k<9;k++)i.probe[k].addScaledVector(A.sh.coefficients[k],B);v++}else if(A.isDirectionalLight){const k=e.get(A);if(k.color.copy(A.color).multiplyScalar(A.intensity),A.castShadow){const W=A.shadow,$=t.get(A);$.shadowIntensity=W.intensity,$.shadowBias=W.bias,$.shadowNormalBias=W.normalBias,$.shadowRadius=W.radius,$.shadowMapSize=W.mapSize,i.directionalShadow[m]=$,i.directionalShadowMap[m]=N,i.directionalShadowMatrix[m]=A.shadow.matrix,P++}i.directional[m]=k,m++}else if(A.isSpotLight){const k=e.get(A);k.position.setFromMatrixPosition(A.matrixWorld),k.color.copy(L).multiplyScalar(B),k.distance=D,k.coneCos=Math.cos(A.angle),k.penumbraCos=Math.cos(A.angle*(1-A.penumbra)),k.decay=A.decay,i.spot[w]=k;const W=A.shadow;if(A.map&&(i.spotLightMap[E]=A.map,E++,W.updateMatrices(A),A.castShadow&&y++),i.spotLightMatrix[w]=W.matrix,A.castShadow){const $=t.get(A);$.shadowIntensity=W.intensity,$.shadowBias=W.bias,$.shadowNormalBias=W.normalBias,$.shadowRadius=W.radius,$.shadowMapSize=W.mapSize,i.spotShadow[w]=$,i.spotShadowMap[w]=N,S++}w++}else if(A.isRectAreaLight){const k=e.get(A);k.color.copy(L).multiplyScalar(B),k.halfWidth.set(A.width*.5,0,0),k.halfHeight.set(0,A.height*.5,0),i.rectArea[g]=k,g++}else if(A.isPointLight){const k=e.get(A);if(k.color.copy(A.color).multiplyScalar(A.intensity),k.distance=A.distance,k.decay=A.decay,A.castShadow){const W=A.shadow,$=t.get(A);$.shadowIntensity=W.intensity,$.shadowBias=W.bias,$.shadowNormalBias=W.normalBias,$.shadowRadius=W.radius,$.shadowMapSize=W.mapSize,$.shadowCameraNear=W.camera.near,$.shadowCameraFar=W.camera.far,i.pointShadow[M]=$,i.pointShadowMap[M]=N,i.pointShadowMatrix[M]=A.shadow.matrix,C++}i.point[M]=k,M++}else if(A.isHemisphereLight){const k=e.get(A);k.skyColor.copy(A.color).multiplyScalar(B),k.groundColor.copy(A.groundColor).multiplyScalar(B),i.hemi[f]=k,f++}}g>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=Re.LTC_FLOAT_1,i.rectAreaLTC2=Re.LTC_FLOAT_2):(i.rectAreaLTC1=Re.LTC_HALF_1,i.rectAreaLTC2=Re.LTC_HALF_2)),i.ambient[0]=d,i.ambient[1]=h,i.ambient[2]=u;const x=i.hash;(x.directionalLength!==m||x.pointLength!==M||x.spotLength!==w||x.rectAreaLength!==g||x.hemiLength!==f||x.numDirectionalShadows!==P||x.numPointShadows!==C||x.numSpotShadows!==S||x.numSpotMaps!==E||x.numLightProbes!==v)&&(i.directional.length=m,i.spot.length=w,i.rectArea.length=g,i.point.length=M,i.hemi.length=f,i.directionalShadow.length=P,i.directionalShadowMap.length=P,i.pointShadow.length=C,i.pointShadowMap.length=C,i.spotShadow.length=S,i.spotShadowMap.length=S,i.directionalShadowMatrix.length=P,i.pointShadowMatrix.length=C,i.spotLightMatrix.length=S+E-y,i.spotLightMap.length=E,i.numSpotLightShadowsWithMaps=y,i.numLightProbes=v,x.directionalLength=m,x.pointLength=M,x.spotLength=w,x.rectAreaLength=g,x.hemiLength=f,x.numDirectionalShadows=P,x.numPointShadows=C,x.numSpotShadows=S,x.numSpotMaps=E,x.numLightProbes=v,i.version=ig++)}function c(l,d){let h=0,u=0,m=0,M=0,w=0;const g=d.matrixWorldInverse;for(let f=0,P=l.length;f<P;f++){const C=l[f];if(C.isDirectionalLight){const S=i.directional[h];S.direction.setFromMatrixPosition(C.matrixWorld),r.setFromMatrixPosition(C.target.matrixWorld),S.direction.sub(r),S.direction.transformDirection(g),h++}else if(C.isSpotLight){const S=i.spot[m];S.position.setFromMatrixPosition(C.matrixWorld),S.position.applyMatrix4(g),S.direction.setFromMatrixPosition(C.matrixWorld),r.setFromMatrixPosition(C.target.matrixWorld),S.direction.sub(r),S.direction.transformDirection(g),m++}else if(C.isRectAreaLight){const S=i.rectArea[M];S.position.setFromMatrixPosition(C.matrixWorld),S.position.applyMatrix4(g),a.identity(),s.copy(C.matrixWorld),s.premultiply(g),a.extractRotation(s),S.halfWidth.set(C.width*.5,0,0),S.halfHeight.set(0,C.height*.5,0),S.halfWidth.applyMatrix4(a),S.halfHeight.applyMatrix4(a),M++}else if(C.isPointLight){const S=i.point[u];S.position.setFromMatrixPosition(C.matrixWorld),S.position.applyMatrix4(g),u++}else if(C.isHemisphereLight){const S=i.hemi[w];S.direction.setFromMatrixPosition(C.matrixWorld),S.direction.transformDirection(g),w++}}}return{setup:o,setupView:c,state:i}}function Kl(n){const e=new sg(n),t=[],i=[],r=[];function s(u){h.camera=u,t.length=0,i.length=0,r.length=0}function a(u){t.push(u)}function o(u){i.push(u)}function c(u){r.push(u)}function l(){e.setup(t)}function d(u){e.setupView(t,u)}const h={lightsArray:t,shadowsArray:i,lightProbeGridArray:r,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:s,state:h,setupLights:l,setupLightsView:d,pushLight:a,pushShadow:o,pushLightProbeGrid:c}}function ag(n){let e=new WeakMap;function t(r,s=0){const a=e.get(r);let o;return a===void 0?(o=new Kl(n),e.set(r,[o])):s>=a.length?(o=new Kl(n),a.push(o)):o=a[s],o}function i(){e=new WeakMap}return{get:t,dispose:i}}const og=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,lg=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,cg=[new G(1,0,0),new G(-1,0,0),new G(0,1,0),new G(0,-1,0),new G(0,0,1),new G(0,0,-1)],ug=[new G(0,-1,0),new G(0,-1,0),new G(0,0,1),new G(0,0,-1),new G(0,-1,0),new G(0,-1,0)],Zl=new _t,fr=new G,eo=new G;function dg(n,e,t){let i=new Dr;const r=new He,s=new He,a=new mt,o=new Kc,c=new Zc,l={},d=t.maxTextureSize,h={[Wn]:jt,[jt]:Wn,[$t]:$t},u=new En({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new He},radius:{value:4}},vertexShader:og,fragmentShader:lg}),m=u.clone();m.defines.HORIZONTAL_PASS=1;const M=new on;M.setAttribute("position",new hn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const w=new tn(M,u),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=gr;let f=this.type;this.render=function(y,v,x){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||y.length===0)return;this.type===So&&(Ke("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=gr);const p=n.getRenderTarget(),b=n.getActiveCubeFace(),A=n.getActiveMipmapLevel(),L=n.state;L.setBlending(Cn),L.buffers.depth.getReversed()===!0?L.buffers.color.setClear(0,0,0,0):L.buffers.color.setClear(1,1,1,1),L.buffers.depth.setTest(!0),L.setScissorTest(!1);const B=f!==this.type;B&&v.traverse(function(D){D.material&&(Array.isArray(D.material)?D.material.forEach(N=>N.needsUpdate=!0):D.material.needsUpdate=!0)});for(let D=0,N=y.length;D<N;D++){const k=y[D],W=k.shadow;if(W===void 0){Ke("WebGLShadowMap:",k,"has no shadow.");continue}if(W.autoUpdate===!1&&W.needsUpdate===!1)continue;r.copy(W.mapSize);const $=W.getFrameExtents();r.multiply($),s.copy(W.mapSize),(r.x>d||r.y>d)&&(r.x>d&&(s.x=Math.floor(d/$.x),r.x=s.x*$.x,W.mapSize.x=s.x),r.y>d&&(s.y=Math.floor(d/$.y),r.y=s.y*$.y,W.mapSize.y=s.y));const re=n.state.buffers.depth.getReversed();if(W.camera._reversedDepth=re,W.map===null||B===!0){if(W.map!==null&&(W.map.depthTexture!==null&&(W.map.depthTexture.dispose(),W.map.depthTexture=null),W.map.dispose()),this.type===Zi){if(k.isPointLight){Ke("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}W.map=new bn(r.x,r.y,{format:di,type:Pn,minFilter:Gt,magFilter:Gt,generateMipmaps:!1}),W.map.texture.name=k.name+".shadowMap",W.map.depthTexture=new Ri(r.x,r.y,vn),W.map.depthTexture.name=k.name+".shadowMapDepth",W.map.depthTexture.format=Ln,W.map.depthTexture.compareFunction=null,W.map.depthTexture.minFilter=kt,W.map.depthTexture.magFilter=kt}else k.isPointLight?(W.map=new Xo(r.x),W.map.depthTexture=new Wc(r.x,yn)):(W.map=new bn(r.x,r.y),W.map.depthTexture=new Ri(r.x,r.y,yn)),W.map.depthTexture.name=k.name+".shadowMap",W.map.depthTexture.format=Ln,this.type===gr?(W.map.depthTexture.compareFunction=re?ha:da,W.map.depthTexture.minFilter=Gt,W.map.depthTexture.magFilter=Gt):(W.map.depthTexture.compareFunction=null,W.map.depthTexture.minFilter=kt,W.map.depthTexture.magFilter=kt);W.camera.updateProjectionMatrix()}const me=W.map.isWebGLCubeRenderTarget?6:1;for(let be=0;be<me;be++){if(W.map.isWebGLCubeRenderTarget)n.setRenderTarget(W.map,be),n.clear();else{be===0&&(n.setRenderTarget(W.map),n.clear());const _e=W.getViewport(be);a.set(s.x*_e.x,s.y*_e.y,s.x*_e.z,s.y*_e.w),L.viewport(a)}if(k.isPointLight){const _e=W.camera,Be=W.matrix,Ze=k.distance||_e.far;Ze!==_e.far&&(_e.far=Ze,_e.updateProjectionMatrix()),fr.setFromMatrixPosition(k.matrixWorld),_e.position.copy(fr),eo.copy(_e.position),eo.add(cg[be]),_e.up.copy(ug[be]),_e.lookAt(eo),_e.updateMatrixWorld(),Be.makeTranslation(-fr.x,-fr.y,-fr.z),Zl.multiplyMatrices(_e.projectionMatrix,_e.matrixWorldInverse),W._frustum.setFromProjectionMatrix(Zl,_e.coordinateSystem,_e.reversedDepth)}else W.updateMatrices(k);i=W.getFrustum(),S(v,x,W.camera,k,this.type)}W.isPointLightShadow!==!0&&this.type===Zi&&P(W,x),W.needsUpdate=!1}f=this.type,g.needsUpdate=!1,n.setRenderTarget(p,b,A)};function P(y,v){const x=e.update(w);u.defines.VSM_SAMPLES!==y.blurSamples&&(u.defines.VSM_SAMPLES=y.blurSamples,m.defines.VSM_SAMPLES=y.blurSamples,u.needsUpdate=!0,m.needsUpdate=!0),y.mapPass===null&&(y.mapPass=new bn(r.x,r.y,{format:di,type:Pn})),u.uniforms.shadow_pass.value=y.map.depthTexture,u.uniforms.resolution.value=y.mapSize,u.uniforms.radius.value=y.radius,n.setRenderTarget(y.mapPass),n.clear(),n.renderBufferDirect(v,null,x,u,w,null),m.uniforms.shadow_pass.value=y.mapPass.texture,m.uniforms.resolution.value=y.mapSize,m.uniforms.radius.value=y.radius,n.setRenderTarget(y.map),n.clear(),n.renderBufferDirect(v,null,x,m,w,null)}function C(y,v,x,p){let b=null;const A=x.isPointLight===!0?y.customDistanceMaterial:y.customDepthMaterial;if(A!==void 0)b=A;else if(b=x.isPointLight===!0?c:o,n.localClippingEnabled&&v.clipShadows===!0&&Array.isArray(v.clippingPlanes)&&v.clippingPlanes.length!==0||v.displacementMap&&v.displacementScale!==0||v.alphaMap&&v.alphaTest>0||v.map&&v.alphaTest>0||v.alphaToCoverage===!0){const L=b.uuid,B=v.uuid;let D=l[L];D===void 0&&(D={},l[L]=D);let N=D[B];N===void 0&&(N=b.clone(),D[B]=N,v.addEventListener("dispose",E)),b=N}if(b.visible=v.visible,b.wireframe=v.wireframe,p===Zi?b.side=v.shadowSide!==null?v.shadowSide:v.side:b.side=v.shadowSide!==null?v.shadowSide:h[v.side],b.alphaMap=v.alphaMap,b.alphaTest=v.alphaToCoverage===!0?.5:v.alphaTest,b.map=v.map,b.clipShadows=v.clipShadows,b.clippingPlanes=v.clippingPlanes,b.clipIntersection=v.clipIntersection,b.displacementMap=v.displacementMap,b.displacementScale=v.displacementScale,b.displacementBias=v.displacementBias,b.wireframeLinewidth=v.wireframeLinewidth,b.linewidth=v.linewidth,x.isPointLight===!0&&b.isMeshDistanceMaterial===!0){const L=n.properties.get(b);L.light=x}return b}function S(y,v,x,p,b){if(y.visible===!1)return;if(y.layers.test(v.layers)&&(y.isMesh||y.isLine||y.isPoints)&&(y.castShadow||y.receiveShadow&&b===Zi)&&(!y.frustumCulled||i.intersectsObject(y))){y.modelViewMatrix.multiplyMatrices(x.matrixWorldInverse,y.matrixWorld);const B=e.update(y),D=y.material;if(Array.isArray(D)){const N=B.groups;for(let k=0,W=N.length;k<W;k++){const $=N[k],re=D[$.materialIndex];if(re&&re.visible){const me=C(y,re,p,b);y.onBeforeShadow(n,y,v,x,B,me,$),n.renderBufferDirect(x,null,B,me,y,$),y.onAfterShadow(n,y,v,x,B,me,$)}}}else if(D.visible){const N=C(y,D,p,b);y.onBeforeShadow(n,y,v,x,B,N,null),n.renderBufferDirect(x,null,B,N,y,null),y.onAfterShadow(n,y,v,x,B,N,null)}}const L=y.children;for(let B=0,D=L.length;B<D;B++)S(L[B],v,x,p,b)}function E(y){y.target.removeEventListener("dispose",E);for(const x in l){const p=l[x],b=y.target.uuid;b in p&&(p[b].dispose(),delete p[b])}}}function hg(n,e){function t(){let F=!1;const Se=new mt;let ie=null;const Ee=new mt(0,0,0,0);return{setMask:function(we){ie!==we&&!F&&(n.colorMask(we,we,we,we),ie=we)},setLocked:function(we){F=we},setClear:function(we,le,Oe,Ie,tt){tt===!0&&(we*=Ie,le*=Ie,Oe*=Ie),Se.set(we,le,Oe,Ie),Ee.equals(Se)===!1&&(n.clearColor(we,le,Oe,Ie),Ee.copy(Se))},reset:function(){F=!1,ie=null,Ee.set(-1,0,0,0)}}}function i(){let F=!1,Se=!1,ie=null,Ee=null,we=null;return{setReversed:function(le){if(Se!==le){const Oe=e.get("EXT_clip_control");le?Oe.clipControlEXT(Oe.LOWER_LEFT_EXT,Oe.ZERO_TO_ONE_EXT):Oe.clipControlEXT(Oe.LOWER_LEFT_EXT,Oe.NEGATIVE_ONE_TO_ONE_EXT),Se=le;const Ie=we;we=null,this.setClear(Ie)}},getReversed:function(){return Se},setTest:function(le){le?fe(n.DEPTH_TEST):We(n.DEPTH_TEST)},setMask:function(le){ie!==le&&!F&&(n.depthMask(le),ie=le)},setFunc:function(le){if(Se&&(le=Vu[le]),Ee!==le){switch(le){case ps:n.depthFunc(n.NEVER);break;case ms:n.depthFunc(n.ALWAYS);break;case gs:n.depthFunc(n.LESS);break;case Ai:n.depthFunc(n.LEQUAL);break;case _s:n.depthFunc(n.EQUAL);break;case xs:n.depthFunc(n.GEQUAL);break;case vs:n.depthFunc(n.GREATER);break;case Ms:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}Ee=le}},setLocked:function(le){F=le},setClear:function(le){we!==le&&(we=le,Se&&(le=1-le),n.clearDepth(le))},reset:function(){F=!1,ie=null,Ee=null,we=null,Se=!1}}}function r(){let F=!1,Se=null,ie=null,Ee=null,we=null,le=null,Oe=null,Ie=null,tt=null;return{setTest:function(at){F||(at?fe(n.STENCIL_TEST):We(n.STENCIL_TEST))},setMask:function(at){Se!==at&&!F&&(n.stencilMask(at),Se=at)},setFunc:function(at,yt,Tt){(ie!==at||Ee!==yt||we!==Tt)&&(n.stencilFunc(at,yt,Tt),ie=at,Ee=yt,we=Tt)},setOp:function(at,yt,Tt){(le!==at||Oe!==yt||Ie!==Tt)&&(n.stencilOp(at,yt,Tt),le=at,Oe=yt,Ie=Tt)},setLocked:function(at){F=at},setClear:function(at){tt!==at&&(n.clearStencil(at),tt=at)},reset:function(){F=!1,Se=null,ie=null,Ee=null,we=null,le=null,Oe=null,Ie=null,tt=null}}}const s=new t,a=new i,o=new r,c=new WeakMap,l=new WeakMap;let d={},h={},u={},m=new WeakMap,M=[],w=null,g=!1,f=null,P=null,C=null,S=null,E=null,y=null,v=null,x=new Je(0,0,0),p=0,b=!1,A=null,L=null,B=null,D=null,N=null;const k=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let W=!1,$=0;const re=n.getParameter(n.VERSION);re.indexOf("WebGL")!==-1?($=parseFloat(/^WebGL (\d)/.exec(re)[1]),W=$>=1):re.indexOf("OpenGL ES")!==-1&&($=parseFloat(/^OpenGL ES (\d)/.exec(re)[1]),W=$>=2);let me=null,be={};const _e=n.getParameter(n.SCISSOR_BOX),Be=n.getParameter(n.VIEWPORT),Ze=new mt().fromArray(_e),de=new mt().fromArray(Be);function z(F,Se,ie,Ee){const we=new Uint8Array(4),le=n.createTexture();n.bindTexture(F,le),n.texParameteri(F,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(F,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Oe=0;Oe<ie;Oe++)F===n.TEXTURE_3D||F===n.TEXTURE_2D_ARRAY?n.texImage3D(Se,0,n.RGBA,1,1,Ee,0,n.RGBA,n.UNSIGNED_BYTE,we):n.texImage2D(Se+Oe,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,we);return le}const ve={};ve[n.TEXTURE_2D]=z(n.TEXTURE_2D,n.TEXTURE_2D,1),ve[n.TEXTURE_CUBE_MAP]=z(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),ve[n.TEXTURE_2D_ARRAY]=z(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),ve[n.TEXTURE_3D]=z(n.TEXTURE_3D,n.TEXTURE_3D,1,1),s.setClear(0,0,0,1),a.setClear(1),o.setClear(0),fe(n.DEPTH_TEST),a.setFunc(Ai),ye(!1),j(ro),fe(n.CULL_FACE),ct(Cn);function fe(F){d[F]!==!0&&(n.enable(F),d[F]=!0)}function We(F){d[F]!==!1&&(n.disable(F),d[F]=!1)}function Ye(F,Se){return u[F]!==Se?(n.bindFramebuffer(F,Se),u[F]=Se,F===n.DRAW_FRAMEBUFFER&&(u[n.FRAMEBUFFER]=Se),F===n.FRAMEBUFFER&&(u[n.DRAW_FRAMEBUFFER]=Se),!0):!1}function ze(F,Se){let ie=M,Ee=!1;if(F){ie=m.get(Se),ie===void 0&&(ie=[],m.set(Se,ie));const we=F.textures;if(ie.length!==we.length||ie[0]!==n.COLOR_ATTACHMENT0){for(let le=0,Oe=we.length;le<Oe;le++)ie[le]=n.COLOR_ATTACHMENT0+le;ie.length=we.length,Ee=!0}}else ie[0]!==n.BACK&&(ie[0]=n.BACK,Ee=!0);Ee&&n.drawBuffers(ie)}function nt(F){return w!==F?(n.useProgram(F),w=F,!0):!1}const Qe={[si]:n.FUNC_ADD,[lc]:n.FUNC_SUBTRACT,[cc]:n.FUNC_REVERSE_SUBTRACT};Qe[uc]=n.MIN,Qe[dc]=n.MAX;const it={[hc]:n.ZERO,[fc]:n.ONE,[pc]:n.SRC_COLOR,[hs]:n.SRC_ALPHA,[Mc]:n.SRC_ALPHA_SATURATE,[xc]:n.DST_COLOR,[gc]:n.DST_ALPHA,[mc]:n.ONE_MINUS_SRC_COLOR,[fs]:n.ONE_MINUS_SRC_ALPHA,[vc]:n.ONE_MINUS_DST_COLOR,[_c]:n.ONE_MINUS_DST_ALPHA,[Sc]:n.CONSTANT_COLOR,[bc]:n.ONE_MINUS_CONSTANT_COLOR,[yc]:n.CONSTANT_ALPHA,[Ec]:n.ONE_MINUS_CONSTANT_ALPHA};function ct(F,Se,ie,Ee,we,le,Oe,Ie,tt,at){if(F===Cn){g===!0&&(We(n.BLEND),g=!1);return}if(g===!1&&(fe(n.BLEND),g=!0),F!==oc){if(F!==f||at!==b){if((P!==si||E!==si)&&(n.blendEquation(n.FUNC_ADD),P=si,E=si),at)switch(F){case yi:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case so:n.blendFunc(n.ONE,n.ONE);break;case ao:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case oo:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:ft("WebGLState: Invalid blending: ",F);break}else switch(F){case yi:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case so:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case ao:ft("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case oo:ft("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:ft("WebGLState: Invalid blending: ",F);break}C=null,S=null,y=null,v=null,x.set(0,0,0),p=0,f=F,b=at}return}we=we||Se,le=le||ie,Oe=Oe||Ee,(Se!==P||we!==E)&&(n.blendEquationSeparate(Qe[Se],Qe[we]),P=Se,E=we),(ie!==C||Ee!==S||le!==y||Oe!==v)&&(n.blendFuncSeparate(it[ie],it[Ee],it[le],it[Oe]),C=ie,S=Ee,y=le,v=Oe),(Ie.equals(x)===!1||tt!==p)&&(n.blendColor(Ie.r,Ie.g,Ie.b,tt),x.copy(Ie),p=tt),f=F,b=!1}function $e(F,Se){F.side===$t?We(n.CULL_FACE):fe(n.CULL_FACE);let ie=F.side===jt;Se&&(ie=!ie),ye(ie),F.blending===yi&&F.transparent===!1?ct(Cn):ct(F.blending,F.blendEquation,F.blendSrc,F.blendDst,F.blendEquationAlpha,F.blendSrcAlpha,F.blendDstAlpha,F.blendColor,F.blendAlpha,F.premultipliedAlpha),a.setFunc(F.depthFunc),a.setTest(F.depthTest),a.setMask(F.depthWrite),s.setMask(F.colorWrite);const Ee=F.stencilWrite;o.setTest(Ee),Ee&&(o.setMask(F.stencilWriteMask),o.setFunc(F.stencilFunc,F.stencilRef,F.stencilFuncMask),o.setOp(F.stencilFail,F.stencilZFail,F.stencilZPass)),pe(F.polygonOffset,F.polygonOffsetFactor,F.polygonOffsetUnits),F.alphaToCoverage===!0?fe(n.SAMPLE_ALPHA_TO_COVERAGE):We(n.SAMPLE_ALPHA_TO_COVERAGE)}function ye(F){A!==F&&(F?n.frontFace(n.CW):n.frontFace(n.CCW),A=F)}function j(F){F!==sc?(fe(n.CULL_FACE),F!==L&&(F===ro?n.cullFace(n.BACK):F===ac?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):We(n.CULL_FACE),L=F}function ce(F){F!==B&&(W&&n.lineWidth(F),B=F)}function pe(F,Se,ie){F?(fe(n.POLYGON_OFFSET_FILL),(D!==Se||N!==ie)&&(D=Se,N=ie,a.getReversed()&&(Se=-Se),n.polygonOffset(Se,ie))):We(n.POLYGON_OFFSET_FILL)}function ae(F){F?fe(n.SCISSOR_TEST):We(n.SCISSOR_TEST)}function Ae(F){F===void 0&&(F=n.TEXTURE0+k-1),me!==F&&(n.activeTexture(F),me=F)}function I(F,Se,ie){ie===void 0&&(me===null?ie=n.TEXTURE0+k-1:ie=me);let Ee=be[ie];Ee===void 0&&(Ee={type:void 0,texture:void 0},be[ie]=Ee),(Ee.type!==F||Ee.texture!==Se)&&(me!==ie&&(n.activeTexture(ie),me=ie),n.bindTexture(F,Se||ve[F]),Ee.type=F,Ee.texture=Se)}function et(){const F=be[me];F!==void 0&&F.type!==void 0&&(n.bindTexture(F.type,null),F.type=void 0,F.texture=void 0)}function Le(){try{n.compressedTexImage2D(...arguments)}catch(F){ft("WebGLState:",F)}}function R(){try{n.compressedTexImage3D(...arguments)}catch(F){ft("WebGLState:",F)}}function _(){try{n.texSubImage2D(...arguments)}catch(F){ft("WebGLState:",F)}}function O(){try{n.texSubImage3D(...arguments)}catch(F){ft("WebGLState:",F)}}function V(){try{n.compressedTexSubImage2D(...arguments)}catch(F){ft("WebGLState:",F)}}function q(){try{n.compressedTexSubImage3D(...arguments)}catch(F){ft("WebGLState:",F)}}function ue(){try{n.texStorage2D(...arguments)}catch(F){ft("WebGLState:",F)}}function Q(){try{n.texStorage3D(...arguments)}catch(F){ft("WebGLState:",F)}}function H(){try{n.texImage2D(...arguments)}catch(F){ft("WebGLState:",F)}}function Y(){try{n.texImage3D(...arguments)}catch(F){ft("WebGLState:",F)}}function oe(F){return h[F]!==void 0?h[F]:n.getParameter(F)}function xe(F,Se){h[F]!==Se&&(n.pixelStorei(F,Se),h[F]=Se)}function ge(F){Ze.equals(F)===!1&&(n.scissor(F.x,F.y,F.z,F.w),Ze.copy(F))}function Me(F){de.equals(F)===!1&&(n.viewport(F.x,F.y,F.z,F.w),de.copy(F))}function De(F,Se){let ie=l.get(Se);ie===void 0&&(ie=new WeakMap,l.set(Se,ie));let Ee=ie.get(F);Ee===void 0&&(Ee=n.getUniformBlockIndex(Se,F.name),ie.set(F,Ee))}function Fe(F,Se){const Ee=l.get(Se).get(F);c.get(Se)!==Ee&&(n.uniformBlockBinding(Se,Ee,F.__bindingPointIndex),c.set(Se,Ee))}function Xe(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),a.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),n.pixelStorei(n.PACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!1),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,n.BROWSER_DEFAULT_WEBGL),n.pixelStorei(n.PACK_ROW_LENGTH,0),n.pixelStorei(n.PACK_SKIP_PIXELS,0),n.pixelStorei(n.PACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_ROW_LENGTH,0),n.pixelStorei(n.UNPACK_IMAGE_HEIGHT,0),n.pixelStorei(n.UNPACK_SKIP_PIXELS,0),n.pixelStorei(n.UNPACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_SKIP_IMAGES,0),d={},h={},me=null,be={},u={},m=new WeakMap,M=[],w=null,g=!1,f=null,P=null,C=null,S=null,E=null,y=null,v=null,x=new Je(0,0,0),p=0,b=!1,A=null,L=null,B=null,D=null,N=null,Ze.set(0,0,n.canvas.width,n.canvas.height),de.set(0,0,n.canvas.width,n.canvas.height),s.reset(),a.reset(),o.reset()}return{buffers:{color:s,depth:a,stencil:o},enable:fe,disable:We,bindFramebuffer:Ye,drawBuffers:ze,useProgram:nt,setBlending:ct,setMaterial:$e,setFlipSided:ye,setCullFace:j,setLineWidth:ce,setPolygonOffset:pe,setScissorTest:ae,activeTexture:Ae,bindTexture:I,unbindTexture:et,compressedTexImage2D:Le,compressedTexImage3D:R,texImage2D:H,texImage3D:Y,pixelStorei:xe,getParameter:oe,updateUBOMapping:De,uniformBlockBinding:Fe,texStorage2D:ue,texStorage3D:Q,texSubImage2D:_,texSubImage3D:O,compressedTexSubImage2D:V,compressedTexSubImage3D:q,scissor:ge,viewport:Me,reset:Xe}}function fg(n,e,t,i,r,s,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new He,d=new WeakMap,h=new Set;let u;const m=new WeakMap;let M=!1;try{M=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function w(R,_){return M?new OffscreenCanvas(R,_):Qs("canvas")}function g(R,_,O){let V=1;const q=Le(R);if((q.width>O||q.height>O)&&(V=O/Math.max(q.width,q.height)),V<1)if(typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&R instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&R instanceof ImageBitmap||typeof VideoFrame<"u"&&R instanceof VideoFrame){const ue=Math.floor(V*q.width),Q=Math.floor(V*q.height);u===void 0&&(u=w(ue,Q));const H=_?w(ue,Q):u;return H.width=ue,H.height=Q,H.getContext("2d").drawImage(R,0,0,ue,Q),Ke("WebGLRenderer: Texture has been resized from ("+q.width+"x"+q.height+") to ("+ue+"x"+Q+")."),H}else return"data"in R&&Ke("WebGLRenderer: Image in DataTexture is too big ("+q.width+"x"+q.height+")."),R;return R}function f(R){return R.generateMipmaps}function P(R){n.generateMipmap(R)}function C(R){return R.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:R.isWebGL3DRenderTarget?n.TEXTURE_3D:R.isWebGLArrayRenderTarget||R.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function S(R,_,O,V,q,ue=!1){if(R!==null){if(n[R]!==void 0)return n[R];Ke("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+R+"'")}let Q;V&&(Q=e.get("EXT_texture_norm16"),Q||Ke("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let H=_;if(_===n.RED&&(O===n.FLOAT&&(H=n.R32F),O===n.HALF_FLOAT&&(H=n.R16F),O===n.UNSIGNED_BYTE&&(H=n.R8),O===n.UNSIGNED_SHORT&&Q&&(H=Q.R16_EXT),O===n.SHORT&&Q&&(H=Q.R16_SNORM_EXT)),_===n.RED_INTEGER&&(O===n.UNSIGNED_BYTE&&(H=n.R8UI),O===n.UNSIGNED_SHORT&&(H=n.R16UI),O===n.UNSIGNED_INT&&(H=n.R32UI),O===n.BYTE&&(H=n.R8I),O===n.SHORT&&(H=n.R16I),O===n.INT&&(H=n.R32I)),_===n.RG&&(O===n.FLOAT&&(H=n.RG32F),O===n.HALF_FLOAT&&(H=n.RG16F),O===n.UNSIGNED_BYTE&&(H=n.RG8),O===n.UNSIGNED_SHORT&&Q&&(H=Q.RG16_EXT),O===n.SHORT&&Q&&(H=Q.RG16_SNORM_EXT)),_===n.RG_INTEGER&&(O===n.UNSIGNED_BYTE&&(H=n.RG8UI),O===n.UNSIGNED_SHORT&&(H=n.RG16UI),O===n.UNSIGNED_INT&&(H=n.RG32UI),O===n.BYTE&&(H=n.RG8I),O===n.SHORT&&(H=n.RG16I),O===n.INT&&(H=n.RG32I)),_===n.RGB_INTEGER&&(O===n.UNSIGNED_BYTE&&(H=n.RGB8UI),O===n.UNSIGNED_SHORT&&(H=n.RGB16UI),O===n.UNSIGNED_INT&&(H=n.RGB32UI),O===n.BYTE&&(H=n.RGB8I),O===n.SHORT&&(H=n.RGB16I),O===n.INT&&(H=n.RGB32I)),_===n.RGBA_INTEGER&&(O===n.UNSIGNED_BYTE&&(H=n.RGBA8UI),O===n.UNSIGNED_SHORT&&(H=n.RGBA16UI),O===n.UNSIGNED_INT&&(H=n.RGBA32UI),O===n.BYTE&&(H=n.RGBA8I),O===n.SHORT&&(H=n.RGBA16I),O===n.INT&&(H=n.RGBA32I)),_===n.RGB&&(O===n.UNSIGNED_SHORT&&Q&&(H=Q.RGB16_EXT),O===n.SHORT&&Q&&(H=Q.RGB16_SNORM_EXT),O===n.UNSIGNED_INT_5_9_9_9_REV&&(H=n.RGB9_E5),O===n.UNSIGNED_INT_10F_11F_11F_REV&&(H=n.R11F_G11F_B10F)),_===n.RGBA){const Y=ue?wr:ht.getTransfer(q);O===n.FLOAT&&(H=n.RGBA32F),O===n.HALF_FLOAT&&(H=n.RGBA16F),O===n.UNSIGNED_BYTE&&(H=Y===gt?n.SRGB8_ALPHA8:n.RGBA8),O===n.UNSIGNED_SHORT&&Q&&(H=Q.RGBA16_EXT),O===n.SHORT&&Q&&(H=Q.RGBA16_SNORM_EXT),O===n.UNSIGNED_SHORT_4_4_4_4&&(H=n.RGBA4),O===n.UNSIGNED_SHORT_5_5_5_1&&(H=n.RGB5_A1)}return(H===n.R16F||H===n.R32F||H===n.RG16F||H===n.RG32F||H===n.RGBA16F||H===n.RGBA32F)&&e.get("EXT_color_buffer_float"),H}function E(R,_){let O;return R?_===null||_===yn||_===tr?O=n.DEPTH24_STENCIL8:_===vn?O=n.DEPTH32F_STENCIL8:_===er&&(O=n.DEPTH24_STENCIL8,Ke("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):_===null||_===yn||_===tr?O=n.DEPTH_COMPONENT24:_===vn?O=n.DEPTH_COMPONENT32F:_===er&&(O=n.DEPTH_COMPONENT16),O}function y(R,_){return f(R)===!0||R.isFramebufferTexture&&R.minFilter!==kt&&R.minFilter!==Gt?Math.log2(Math.max(_.width,_.height))+1:R.mipmaps!==void 0&&R.mipmaps.length>0?R.mipmaps.length:R.isCompressedTexture&&Array.isArray(R.image)?_.mipmaps.length:1}function v(R){const _=R.target;_.removeEventListener("dispose",v),p(_),_.isVideoTexture&&d.delete(_),_.isHTMLTexture&&h.delete(_)}function x(R){const _=R.target;_.removeEventListener("dispose",x),A(_)}function p(R){const _=i.get(R);if(_.__webglInit===void 0)return;const O=R.source,V=m.get(O);if(V){const q=V[_.__cacheKey];q.usedTimes--,q.usedTimes===0&&b(R),Object.keys(V).length===0&&m.delete(O)}i.remove(R)}function b(R){const _=i.get(R);n.deleteTexture(_.__webglTexture);const O=R.source,V=m.get(O);delete V[_.__cacheKey],a.memory.textures--}function A(R){const _=i.get(R);if(R.depthTexture&&(R.depthTexture.dispose(),i.remove(R.depthTexture)),R.isWebGLCubeRenderTarget)for(let V=0;V<6;V++){if(Array.isArray(_.__webglFramebuffer[V]))for(let q=0;q<_.__webglFramebuffer[V].length;q++)n.deleteFramebuffer(_.__webglFramebuffer[V][q]);else n.deleteFramebuffer(_.__webglFramebuffer[V]);_.__webglDepthbuffer&&n.deleteRenderbuffer(_.__webglDepthbuffer[V])}else{if(Array.isArray(_.__webglFramebuffer))for(let V=0;V<_.__webglFramebuffer.length;V++)n.deleteFramebuffer(_.__webglFramebuffer[V]);else n.deleteFramebuffer(_.__webglFramebuffer);if(_.__webglDepthbuffer&&n.deleteRenderbuffer(_.__webglDepthbuffer),_.__webglMultisampledFramebuffer&&n.deleteFramebuffer(_.__webglMultisampledFramebuffer),_.__webglColorRenderbuffer)for(let V=0;V<_.__webglColorRenderbuffer.length;V++)_.__webglColorRenderbuffer[V]&&n.deleteRenderbuffer(_.__webglColorRenderbuffer[V]);_.__webglDepthRenderbuffer&&n.deleteRenderbuffer(_.__webglDepthRenderbuffer)}const O=R.textures;for(let V=0,q=O.length;V<q;V++){const ue=i.get(O[V]);ue.__webglTexture&&(n.deleteTexture(ue.__webglTexture),a.memory.textures--),i.remove(O[V])}i.remove(R)}let L=0;function B(){L=0}function D(){return L}function N(R){L=R}function k(){const R=L;return R>=r.maxTextures&&Ke("WebGLTextures: Trying to use "+R+" texture units while this GPU supports only "+r.maxTextures),L+=1,R}function W(R){const _=[];return _.push(R.wrapS),_.push(R.wrapT),_.push(R.wrapR||0),_.push(R.magFilter),_.push(R.minFilter),_.push(R.anisotropy),_.push(R.internalFormat),_.push(R.format),_.push(R.type),_.push(R.generateMipmaps),_.push(R.premultiplyAlpha),_.push(R.flipY),_.push(R.unpackAlignment),_.push(R.colorSpace),_.join()}function $(R,_){const O=i.get(R);if(R.isVideoTexture&&I(R),R.isRenderTargetTexture===!1&&R.isExternalTexture!==!0&&R.version>0&&O.__version!==R.version){const V=R.image;if(V===null)Ke("WebGLRenderer: Texture marked for update but no image data found.");else if(V.complete===!1)Ke("WebGLRenderer: Texture marked for update but image is incomplete");else{We(O,R,_);return}}else R.isExternalTexture&&(O.__webglTexture=R.sourceTexture?R.sourceTexture:null);t.bindTexture(n.TEXTURE_2D,O.__webglTexture,n.TEXTURE0+_)}function re(R,_){const O=i.get(R);if(R.isRenderTargetTexture===!1&&R.version>0&&O.__version!==R.version){We(O,R,_);return}else R.isExternalTexture&&(O.__webglTexture=R.sourceTexture?R.sourceTexture:null);t.bindTexture(n.TEXTURE_2D_ARRAY,O.__webglTexture,n.TEXTURE0+_)}function me(R,_){const O=i.get(R);if(R.isRenderTargetTexture===!1&&R.version>0&&O.__version!==R.version){We(O,R,_);return}t.bindTexture(n.TEXTURE_3D,O.__webglTexture,n.TEXTURE0+_)}function be(R,_){const O=i.get(R);if(R.isCubeDepthTexture!==!0&&R.version>0&&O.__version!==R.version){Ye(O,R,_);return}t.bindTexture(n.TEXTURE_CUBE_MAP,O.__webglTexture,n.TEXTURE0+_)}const _e={[yr]:n.REPEAT,[Rn]:n.CLAMP_TO_EDGE,[Ss]:n.MIRRORED_REPEAT},Be={[kt]:n.NEAREST,[wc]:n.NEAREST_MIPMAP_NEAREST,[pr]:n.NEAREST_MIPMAP_LINEAR,[Gt]:n.LINEAR,[as]:n.LINEAR_MIPMAP_NEAREST,[ai]:n.LINEAR_MIPMAP_LINEAR},Ze={[Pc]:n.NEVER,[Nc]:n.ALWAYS,[Lc]:n.LESS,[da]:n.LEQUAL,[Dc]:n.EQUAL,[ha]:n.GEQUAL,[Ic]:n.GREATER,[Uc]:n.NOTEQUAL};function de(R,_){if(_.type===vn&&e.has("OES_texture_float_linear")===!1&&(_.magFilter===Gt||_.magFilter===as||_.magFilter===pr||_.magFilter===ai||_.minFilter===Gt||_.minFilter===as||_.minFilter===pr||_.minFilter===ai)&&Ke("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(R,n.TEXTURE_WRAP_S,_e[_.wrapS]),n.texParameteri(R,n.TEXTURE_WRAP_T,_e[_.wrapT]),(R===n.TEXTURE_3D||R===n.TEXTURE_2D_ARRAY)&&n.texParameteri(R,n.TEXTURE_WRAP_R,_e[_.wrapR]),n.texParameteri(R,n.TEXTURE_MAG_FILTER,Be[_.magFilter]),n.texParameteri(R,n.TEXTURE_MIN_FILTER,Be[_.minFilter]),_.compareFunction&&(n.texParameteri(R,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(R,n.TEXTURE_COMPARE_FUNC,Ze[_.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(_.magFilter===kt||_.minFilter!==pr&&_.minFilter!==ai||_.type===vn&&e.has("OES_texture_float_linear")===!1)return;if(_.anisotropy>1||i.get(_).__currentAnisotropy){const O=e.get("EXT_texture_filter_anisotropic");n.texParameterf(R,O.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(_.anisotropy,r.getMaxAnisotropy())),i.get(_).__currentAnisotropy=_.anisotropy}}}function z(R,_){let O=!1;R.__webglInit===void 0&&(R.__webglInit=!0,_.addEventListener("dispose",v));const V=_.source;let q=m.get(V);q===void 0&&(q={},m.set(V,q));const ue=W(_);if(ue!==R.__cacheKey){q[ue]===void 0&&(q[ue]={texture:n.createTexture(),usedTimes:0},a.memory.textures++,O=!0),q[ue].usedTimes++;const Q=q[R.__cacheKey];Q!==void 0&&(q[R.__cacheKey].usedTimes--,Q.usedTimes===0&&b(_)),R.__cacheKey=ue,R.__webglTexture=q[ue].texture}return O}function ve(R,_,O){return Math.floor(Math.floor(R/O)/_)}function fe(R,_,O,V){const ue=R.updateRanges;if(ue.length===0)t.texSubImage2D(n.TEXTURE_2D,0,0,0,_.width,_.height,O,V,_.data);else{ue.sort((xe,ge)=>xe.start-ge.start);let Q=0;for(let xe=1;xe<ue.length;xe++){const ge=ue[Q],Me=ue[xe],De=ge.start+ge.count,Fe=ve(Me.start,_.width,4),Xe=ve(ge.start,_.width,4);Me.start<=De+1&&Fe===Xe&&ve(Me.start+Me.count-1,_.width,4)===Fe?ge.count=Math.max(ge.count,Me.start+Me.count-ge.start):(++Q,ue[Q]=Me)}ue.length=Q+1;const H=t.getParameter(n.UNPACK_ROW_LENGTH),Y=t.getParameter(n.UNPACK_SKIP_PIXELS),oe=t.getParameter(n.UNPACK_SKIP_ROWS);t.pixelStorei(n.UNPACK_ROW_LENGTH,_.width);for(let xe=0,ge=ue.length;xe<ge;xe++){const Me=ue[xe],De=Math.floor(Me.start/4),Fe=Math.ceil(Me.count/4),Xe=De%_.width,F=Math.floor(De/_.width),Se=Fe,ie=1;t.pixelStorei(n.UNPACK_SKIP_PIXELS,Xe),t.pixelStorei(n.UNPACK_SKIP_ROWS,F),t.texSubImage2D(n.TEXTURE_2D,0,Xe,F,Se,ie,O,V,_.data)}R.clearUpdateRanges(),t.pixelStorei(n.UNPACK_ROW_LENGTH,H),t.pixelStorei(n.UNPACK_SKIP_PIXELS,Y),t.pixelStorei(n.UNPACK_SKIP_ROWS,oe)}}function We(R,_,O){let V=n.TEXTURE_2D;(_.isDataArrayTexture||_.isCompressedArrayTexture)&&(V=n.TEXTURE_2D_ARRAY),_.isData3DTexture&&(V=n.TEXTURE_3D);const q=z(R,_),ue=_.source;t.bindTexture(V,R.__webglTexture,n.TEXTURE0+O);const Q=i.get(ue);if(ue.version!==Q.__version||q===!0){if(t.activeTexture(n.TEXTURE0+O),(typeof ImageBitmap<"u"&&_.image instanceof ImageBitmap)===!1){const ie=ht.getPrimaries(ht.workingColorSpace),Ee=_.colorSpace===Bn?null:ht.getPrimaries(_.colorSpace),we=_.colorSpace===Bn||ie===Ee?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,_.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,we)}t.pixelStorei(n.UNPACK_ALIGNMENT,_.unpackAlignment);let Y=g(_.image,!1,r.maxTextureSize);Y=et(_,Y);const oe=s.convert(_.format,_.colorSpace),xe=s.convert(_.type);let ge=S(_.internalFormat,oe,xe,_.normalized,_.colorSpace,_.isVideoTexture);de(V,_);let Me;const De=_.mipmaps,Fe=_.isVideoTexture!==!0,Xe=Q.__version===void 0||q===!0,F=ue.dataReady,Se=y(_,Y);if(_.isDepthTexture)ge=E(_.format===oi,_.type),Xe&&(Fe?t.texStorage2D(n.TEXTURE_2D,1,ge,Y.width,Y.height):t.texImage2D(n.TEXTURE_2D,0,ge,Y.width,Y.height,0,oe,xe,null));else if(_.isDataTexture)if(De.length>0){Fe&&Xe&&t.texStorage2D(n.TEXTURE_2D,Se,ge,De[0].width,De[0].height);for(let ie=0,Ee=De.length;ie<Ee;ie++)Me=De[ie],Fe?F&&t.texSubImage2D(n.TEXTURE_2D,ie,0,0,Me.width,Me.height,oe,xe,Me.data):t.texImage2D(n.TEXTURE_2D,ie,ge,Me.width,Me.height,0,oe,xe,Me.data);_.generateMipmaps=!1}else Fe?(Xe&&t.texStorage2D(n.TEXTURE_2D,Se,ge,Y.width,Y.height),F&&fe(_,Y,oe,xe)):t.texImage2D(n.TEXTURE_2D,0,ge,Y.width,Y.height,0,oe,xe,Y.data);else if(_.isCompressedTexture)if(_.isCompressedArrayTexture){Fe&&Xe&&t.texStorage3D(n.TEXTURE_2D_ARRAY,Se,ge,De[0].width,De[0].height,Y.depth);for(let ie=0,Ee=De.length;ie<Ee;ie++)if(Me=De[ie],_.format!==dn)if(oe!==null)if(Fe){if(F)if(_.layerUpdates.size>0){const we=wl(Me.width,Me.height,_.format,_.type);for(const le of _.layerUpdates){const Oe=Me.data.subarray(le*we/Me.data.BYTES_PER_ELEMENT,(le+1)*we/Me.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,ie,0,0,le,Me.width,Me.height,1,oe,Oe)}_.clearLayerUpdates()}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,ie,0,0,0,Me.width,Me.height,Y.depth,oe,Me.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,ie,ge,Me.width,Me.height,Y.depth,0,Me.data,0,0);else Ke("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Fe?F&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,ie,0,0,0,Me.width,Me.height,Y.depth,oe,xe,Me.data):t.texImage3D(n.TEXTURE_2D_ARRAY,ie,ge,Me.width,Me.height,Y.depth,0,oe,xe,Me.data)}else{Fe&&Xe&&t.texStorage2D(n.TEXTURE_2D,Se,ge,De[0].width,De[0].height);for(let ie=0,Ee=De.length;ie<Ee;ie++)Me=De[ie],_.format!==dn?oe!==null?Fe?F&&t.compressedTexSubImage2D(n.TEXTURE_2D,ie,0,0,Me.width,Me.height,oe,Me.data):t.compressedTexImage2D(n.TEXTURE_2D,ie,ge,Me.width,Me.height,0,Me.data):Ke("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Fe?F&&t.texSubImage2D(n.TEXTURE_2D,ie,0,0,Me.width,Me.height,oe,xe,Me.data):t.texImage2D(n.TEXTURE_2D,ie,ge,Me.width,Me.height,0,oe,xe,Me.data)}else if(_.isDataArrayTexture)if(Fe){if(Xe&&t.texStorage3D(n.TEXTURE_2D_ARRAY,Se,ge,Y.width,Y.height,Y.depth),F)if(_.layerUpdates.size>0){const ie=wl(Y.width,Y.height,_.format,_.type);for(const Ee of _.layerUpdates){const we=Y.data.subarray(Ee*ie/Y.data.BYTES_PER_ELEMENT,(Ee+1)*ie/Y.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,Ee,Y.width,Y.height,1,oe,xe,we)}_.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,Y.width,Y.height,Y.depth,oe,xe,Y.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,ge,Y.width,Y.height,Y.depth,0,oe,xe,Y.data);else if(_.isData3DTexture)Fe?(Xe&&t.texStorage3D(n.TEXTURE_3D,Se,ge,Y.width,Y.height,Y.depth),F&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,Y.width,Y.height,Y.depth,oe,xe,Y.data)):t.texImage3D(n.TEXTURE_3D,0,ge,Y.width,Y.height,Y.depth,0,oe,xe,Y.data);else if(_.isFramebufferTexture){if(Xe)if(Fe)t.texStorage2D(n.TEXTURE_2D,Se,ge,Y.width,Y.height);else{let ie=Y.width,Ee=Y.height;for(let we=0;we<Se;we++)t.texImage2D(n.TEXTURE_2D,we,ge,ie,Ee,0,oe,xe,null),ie>>=1,Ee>>=1}}else if(_.isHTMLTexture){if("texElementImage2D"in n){const ie=n.canvas;if(ie.hasAttribute("layoutsubtree")||ie.setAttribute("layoutsubtree","true"),Y.parentNode!==ie){ie.appendChild(Y),h.add(_),ie.onpaint=Ee=>{const we=Ee.changedElements;for(const le of h)we.includes(le.image)&&(le.needsUpdate=!0)},ie.requestPaint();return}if(n.texElementImage2D.length===3)n.texElementImage2D(n.TEXTURE_2D,n.RGBA8,Y);else{const we=n.RGBA,le=n.RGBA,Oe=n.UNSIGNED_BYTE;n.texElementImage2D(n.TEXTURE_2D,0,we,le,Oe,Y)}n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE)}}else if(De.length>0){if(Fe&&Xe){const ie=Le(De[0]);t.texStorage2D(n.TEXTURE_2D,Se,ge,ie.width,ie.height)}for(let ie=0,Ee=De.length;ie<Ee;ie++)Me=De[ie],Fe?F&&t.texSubImage2D(n.TEXTURE_2D,ie,0,0,oe,xe,Me):t.texImage2D(n.TEXTURE_2D,ie,ge,oe,xe,Me);_.generateMipmaps=!1}else if(Fe){if(Xe){const ie=Le(Y);t.texStorage2D(n.TEXTURE_2D,Se,ge,ie.width,ie.height)}F&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,oe,xe,Y)}else t.texImage2D(n.TEXTURE_2D,0,ge,oe,xe,Y);f(_)&&P(V),Q.__version=ue.version,_.onUpdate&&_.onUpdate(_)}R.__version=_.version}function Ye(R,_,O){if(_.image.length!==6)return;const V=z(R,_),q=_.source;t.bindTexture(n.TEXTURE_CUBE_MAP,R.__webglTexture,n.TEXTURE0+O);const ue=i.get(q);if(q.version!==ue.__version||V===!0){t.activeTexture(n.TEXTURE0+O);const Q=ht.getPrimaries(ht.workingColorSpace),H=_.colorSpace===Bn?null:ht.getPrimaries(_.colorSpace),Y=_.colorSpace===Bn||Q===H?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,_.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),t.pixelStorei(n.UNPACK_ALIGNMENT,_.unpackAlignment),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Y);const oe=_.isCompressedTexture||_.image[0].isCompressedTexture,xe=_.image[0]&&_.image[0].isDataTexture,ge=[];for(let le=0;le<6;le++)!oe&&!xe?ge[le]=g(_.image[le],!0,r.maxCubemapSize):ge[le]=xe?_.image[le].image:_.image[le],ge[le]=et(_,ge[le]);const Me=ge[0],De=s.convert(_.format,_.colorSpace),Fe=s.convert(_.type),Xe=S(_.internalFormat,De,Fe,_.normalized,_.colorSpace),F=_.isVideoTexture!==!0,Se=ue.__version===void 0||V===!0,ie=q.dataReady;let Ee=y(_,Me);de(n.TEXTURE_CUBE_MAP,_);let we;if(oe){F&&Se&&t.texStorage2D(n.TEXTURE_CUBE_MAP,Ee,Xe,Me.width,Me.height);for(let le=0;le<6;le++){we=ge[le].mipmaps;for(let Oe=0;Oe<we.length;Oe++){const Ie=we[Oe];_.format!==dn?De!==null?F?ie&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+le,Oe,0,0,Ie.width,Ie.height,De,Ie.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+le,Oe,Xe,Ie.width,Ie.height,0,Ie.data):Ke("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):F?ie&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+le,Oe,0,0,Ie.width,Ie.height,De,Fe,Ie.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+le,Oe,Xe,Ie.width,Ie.height,0,De,Fe,Ie.data)}}}else{if(we=_.mipmaps,F&&Se){we.length>0&&Ee++;const le=Le(ge[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,Ee,Xe,le.width,le.height)}for(let le=0;le<6;le++)if(xe){F?ie&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+le,0,0,0,ge[le].width,ge[le].height,De,Fe,ge[le].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+le,0,Xe,ge[le].width,ge[le].height,0,De,Fe,ge[le].data);for(let Oe=0;Oe<we.length;Oe++){const tt=we[Oe].image[le].image;F?ie&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+le,Oe+1,0,0,tt.width,tt.height,De,Fe,tt.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+le,Oe+1,Xe,tt.width,tt.height,0,De,Fe,tt.data)}}else{F?ie&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+le,0,0,0,De,Fe,ge[le]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+le,0,Xe,De,Fe,ge[le]);for(let Oe=0;Oe<we.length;Oe++){const Ie=we[Oe];F?ie&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+le,Oe+1,0,0,De,Fe,Ie.image[le]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+le,Oe+1,Xe,De,Fe,Ie.image[le])}}}f(_)&&P(n.TEXTURE_CUBE_MAP),ue.__version=q.version,_.onUpdate&&_.onUpdate(_)}R.__version=_.version}function ze(R,_,O,V,q,ue){const Q=s.convert(O.format,O.colorSpace),H=s.convert(O.type),Y=S(O.internalFormat,Q,H,O.normalized,O.colorSpace),oe=i.get(_),xe=i.get(O);if(xe.__renderTarget=_,!oe.__hasExternalTextures){const ge=Math.max(1,_.width>>ue),Me=Math.max(1,_.height>>ue);q===n.TEXTURE_3D||q===n.TEXTURE_2D_ARRAY?t.texImage3D(q,ue,Y,ge,Me,_.depth,0,Q,H,null):t.texImage2D(q,ue,Y,ge,Me,0,Q,H,null)}t.bindFramebuffer(n.FRAMEBUFFER,R),Ae(_)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,V,q,xe.__webglTexture,0,ae(_)):(q===n.TEXTURE_2D||q>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&q<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,V,q,xe.__webglTexture,ue),t.bindFramebuffer(n.FRAMEBUFFER,null)}function nt(R,_,O){if(n.bindRenderbuffer(n.RENDERBUFFER,R),_.depthBuffer){const V=_.depthTexture,q=V&&V.isDepthTexture?V.type:null,ue=E(_.stencilBuffer,q),Q=_.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;Ae(_)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,ae(_),ue,_.width,_.height):O?n.renderbufferStorageMultisample(n.RENDERBUFFER,ae(_),ue,_.width,_.height):n.renderbufferStorage(n.RENDERBUFFER,ue,_.width,_.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,Q,n.RENDERBUFFER,R)}else{const V=_.textures;for(let q=0;q<V.length;q++){const ue=V[q],Q=s.convert(ue.format,ue.colorSpace),H=s.convert(ue.type),Y=S(ue.internalFormat,Q,H,ue.normalized,ue.colorSpace);Ae(_)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,ae(_),Y,_.width,_.height):O?n.renderbufferStorageMultisample(n.RENDERBUFFER,ae(_),Y,_.width,_.height):n.renderbufferStorage(n.RENDERBUFFER,Y,_.width,_.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function Qe(R,_,O){const V=_.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(n.FRAMEBUFFER,R),!(_.depthTexture&&_.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const q=i.get(_.depthTexture);if(q.__renderTarget=_,(!q.__webglTexture||_.depthTexture.image.width!==_.width||_.depthTexture.image.height!==_.height)&&(_.depthTexture.image.width=_.width,_.depthTexture.image.height=_.height,_.depthTexture.needsUpdate=!0),V){if(q.__webglInit===void 0&&(q.__webglInit=!0,_.depthTexture.addEventListener("dispose",v)),q.__webglTexture===void 0){q.__webglTexture=n.createTexture(),t.bindTexture(n.TEXTURE_CUBE_MAP,q.__webglTexture),de(n.TEXTURE_CUBE_MAP,_.depthTexture);const oe=s.convert(_.depthTexture.format),xe=s.convert(_.depthTexture.type);let ge;_.depthTexture.format===Ln?ge=n.DEPTH_COMPONENT24:_.depthTexture.format===oi&&(ge=n.DEPTH24_STENCIL8);for(let Me=0;Me<6;Me++)n.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Me,0,ge,_.width,_.height,0,oe,xe,null)}}else $(_.depthTexture,0);const ue=q.__webglTexture,Q=ae(_),H=V?n.TEXTURE_CUBE_MAP_POSITIVE_X+O:n.TEXTURE_2D,Y=_.depthTexture.format===oi?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;if(_.depthTexture.format===Ln)Ae(_)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,Y,H,ue,0,Q):n.framebufferTexture2D(n.FRAMEBUFFER,Y,H,ue,0);else if(_.depthTexture.format===oi)Ae(_)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,Y,H,ue,0,Q):n.framebufferTexture2D(n.FRAMEBUFFER,Y,H,ue,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function it(R){const _=i.get(R),O=R.isWebGLCubeRenderTarget===!0;if(_.__boundDepthTexture!==R.depthTexture){const V=R.depthTexture;if(_.__depthDisposeCallback&&_.__depthDisposeCallback(),V){const q=()=>{delete _.__boundDepthTexture,delete _.__depthDisposeCallback,V.removeEventListener("dispose",q)};V.addEventListener("dispose",q),_.__depthDisposeCallback=q}_.__boundDepthTexture=V}if(R.depthTexture&&!_.__autoAllocateDepthBuffer)if(O)for(let V=0;V<6;V++)Qe(_.__webglFramebuffer[V],R,V);else{const V=R.texture.mipmaps;V&&V.length>0?Qe(_.__webglFramebuffer[0],R,0):Qe(_.__webglFramebuffer,R,0)}else if(O){_.__webglDepthbuffer=[];for(let V=0;V<6;V++)if(t.bindFramebuffer(n.FRAMEBUFFER,_.__webglFramebuffer[V]),_.__webglDepthbuffer[V]===void 0)_.__webglDepthbuffer[V]=n.createRenderbuffer(),nt(_.__webglDepthbuffer[V],R,!1);else{const q=R.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ue=_.__webglDepthbuffer[V];n.bindRenderbuffer(n.RENDERBUFFER,ue),n.framebufferRenderbuffer(n.FRAMEBUFFER,q,n.RENDERBUFFER,ue)}}else{const V=R.texture.mipmaps;if(V&&V.length>0?t.bindFramebuffer(n.FRAMEBUFFER,_.__webglFramebuffer[0]):t.bindFramebuffer(n.FRAMEBUFFER,_.__webglFramebuffer),_.__webglDepthbuffer===void 0)_.__webglDepthbuffer=n.createRenderbuffer(),nt(_.__webglDepthbuffer,R,!1);else{const q=R.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ue=_.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,ue),n.framebufferRenderbuffer(n.FRAMEBUFFER,q,n.RENDERBUFFER,ue)}}t.bindFramebuffer(n.FRAMEBUFFER,null)}function ct(R,_,O){const V=i.get(R);_!==void 0&&ze(V.__webglFramebuffer,R,R.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),O!==void 0&&it(R)}function $e(R){const _=R.texture,O=i.get(R),V=i.get(_);R.addEventListener("dispose",x);const q=R.textures,ue=R.isWebGLCubeRenderTarget===!0,Q=q.length>1;if(Q||(V.__webglTexture===void 0&&(V.__webglTexture=n.createTexture()),V.__version=_.version,a.memory.textures++),ue){O.__webglFramebuffer=[];for(let H=0;H<6;H++)if(_.mipmaps&&_.mipmaps.length>0){O.__webglFramebuffer[H]=[];for(let Y=0;Y<_.mipmaps.length;Y++)O.__webglFramebuffer[H][Y]=n.createFramebuffer()}else O.__webglFramebuffer[H]=n.createFramebuffer()}else{if(_.mipmaps&&_.mipmaps.length>0){O.__webglFramebuffer=[];for(let H=0;H<_.mipmaps.length;H++)O.__webglFramebuffer[H]=n.createFramebuffer()}else O.__webglFramebuffer=n.createFramebuffer();if(Q)for(let H=0,Y=q.length;H<Y;H++){const oe=i.get(q[H]);oe.__webglTexture===void 0&&(oe.__webglTexture=n.createTexture(),a.memory.textures++)}if(R.samples>0&&Ae(R)===!1){O.__webglMultisampledFramebuffer=n.createFramebuffer(),O.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,O.__webglMultisampledFramebuffer);for(let H=0;H<q.length;H++){const Y=q[H];O.__webglColorRenderbuffer[H]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,O.__webglColorRenderbuffer[H]);const oe=s.convert(Y.format,Y.colorSpace),xe=s.convert(Y.type),ge=S(Y.internalFormat,oe,xe,Y.normalized,Y.colorSpace,R.isXRRenderTarget===!0),Me=ae(R);n.renderbufferStorageMultisample(n.RENDERBUFFER,Me,ge,R.width,R.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+H,n.RENDERBUFFER,O.__webglColorRenderbuffer[H])}n.bindRenderbuffer(n.RENDERBUFFER,null),R.depthBuffer&&(O.__webglDepthRenderbuffer=n.createRenderbuffer(),nt(O.__webglDepthRenderbuffer,R,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(ue){t.bindTexture(n.TEXTURE_CUBE_MAP,V.__webglTexture),de(n.TEXTURE_CUBE_MAP,_);for(let H=0;H<6;H++)if(_.mipmaps&&_.mipmaps.length>0)for(let Y=0;Y<_.mipmaps.length;Y++)ze(O.__webglFramebuffer[H][Y],R,_,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+H,Y);else ze(O.__webglFramebuffer[H],R,_,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+H,0);f(_)&&P(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Q){for(let H=0,Y=q.length;H<Y;H++){const oe=q[H],xe=i.get(oe);let ge=n.TEXTURE_2D;(R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(ge=R.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(ge,xe.__webglTexture),de(ge,oe),ze(O.__webglFramebuffer,R,oe,n.COLOR_ATTACHMENT0+H,ge,0),f(oe)&&P(ge)}t.unbindTexture()}else{let H=n.TEXTURE_2D;if((R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(H=R.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(H,V.__webglTexture),de(H,_),_.mipmaps&&_.mipmaps.length>0)for(let Y=0;Y<_.mipmaps.length;Y++)ze(O.__webglFramebuffer[Y],R,_,n.COLOR_ATTACHMENT0,H,Y);else ze(O.__webglFramebuffer,R,_,n.COLOR_ATTACHMENT0,H,0);f(_)&&P(H),t.unbindTexture()}R.depthBuffer&&it(R)}function ye(R){const _=R.textures;for(let O=0,V=_.length;O<V;O++){const q=_[O];if(f(q)){const ue=C(R),Q=i.get(q).__webglTexture;t.bindTexture(ue,Q),P(ue),t.unbindTexture()}}}const j=[],ce=[];function pe(R){if(R.samples>0){if(Ae(R)===!1){const _=R.textures,O=R.width,V=R.height;let q=n.COLOR_BUFFER_BIT;const ue=R.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Q=i.get(R),H=_.length>1;if(H)for(let oe=0;oe<_.length;oe++)t.bindFramebuffer(n.FRAMEBUFFER,Q.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+oe,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,Q.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+oe,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,Q.__webglMultisampledFramebuffer);const Y=R.texture.mipmaps;Y&&Y.length>0?t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Q.__webglFramebuffer[0]):t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Q.__webglFramebuffer);for(let oe=0;oe<_.length;oe++){if(R.resolveDepthBuffer&&(R.depthBuffer&&(q|=n.DEPTH_BUFFER_BIT),R.stencilBuffer&&R.resolveStencilBuffer&&(q|=n.STENCIL_BUFFER_BIT)),H){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,Q.__webglColorRenderbuffer[oe]);const xe=i.get(_[oe]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,xe,0)}n.blitFramebuffer(0,0,O,V,0,0,O,V,q,n.NEAREST),c===!0&&(j.length=0,ce.length=0,j.push(n.COLOR_ATTACHMENT0+oe),R.depthBuffer&&R.resolveDepthBuffer===!1&&(j.push(ue),ce.push(ue),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,ce)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,j))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),H)for(let oe=0;oe<_.length;oe++){t.bindFramebuffer(n.FRAMEBUFFER,Q.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+oe,n.RENDERBUFFER,Q.__webglColorRenderbuffer[oe]);const xe=i.get(_[oe]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,Q.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+oe,n.TEXTURE_2D,xe,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Q.__webglMultisampledFramebuffer)}else if(R.depthBuffer&&R.resolveDepthBuffer===!1&&c){const _=R.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[_])}}}function ae(R){return Math.min(r.maxSamples,R.samples)}function Ae(R){const _=i.get(R);return R.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&_.__useRenderToTexture!==!1}function I(R){const _=a.render.frame;d.get(R)!==_&&(d.set(R,_),R.update())}function et(R,_){const O=R.colorSpace,V=R.format,q=R.type;return R.isCompressedTexture===!0||R.isVideoTexture===!0||O!==Ar&&O!==Bn&&(ht.getTransfer(O)===gt?(V!==dn||q!==en)&&Ke("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):ft("WebGLTextures: Unsupported texture color space:",O)),_}function Le(R){return typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement?(l.width=R.naturalWidth||R.width,l.height=R.naturalHeight||R.height):typeof VideoFrame<"u"&&R instanceof VideoFrame?(l.width=R.displayWidth,l.height=R.displayHeight):(l.width=R.width,l.height=R.height),l}this.allocateTextureUnit=k,this.resetTextureUnits=B,this.getTextureUnits=D,this.setTextureUnits=N,this.setTexture2D=$,this.setTexture2DArray=re,this.setTexture3D=me,this.setTextureCube=be,this.rebindTextures=ct,this.setupRenderTarget=$e,this.updateRenderTargetMipmap=ye,this.updateMultisampleRenderTarget=pe,this.setupDepthRenderbuffer=it,this.setupFrameBufferTexture=ze,this.useMultisampledRTT=Ae,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function lu(n,e){function t(i,r=Bn){let s;const a=ht.getTransfer(r);if(i===en)return n.UNSIGNED_BYTE;if(i===aa)return n.UNSIGNED_SHORT_4_4_4_4;if(i===oa)return n.UNSIGNED_SHORT_5_5_5_1;if(i===Do)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===Io)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===Po)return n.BYTE;if(i===Lo)return n.SHORT;if(i===er)return n.UNSIGNED_SHORT;if(i===sa)return n.INT;if(i===yn)return n.UNSIGNED_INT;if(i===vn)return n.FLOAT;if(i===Pn)return n.HALF_FLOAT;if(i===Uo)return n.ALPHA;if(i===No)return n.RGB;if(i===dn)return n.RGBA;if(i===Ln)return n.DEPTH_COMPONENT;if(i===oi)return n.DEPTH_STENCIL;if(i===Fo)return n.RED;if(i===la)return n.RED_INTEGER;if(i===di)return n.RG;if(i===ca)return n.RG_INTEGER;if(i===ua)return n.RGBA_INTEGER;if(i===_r||i===xr||i===vr||i===Mr)if(a===gt)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===_r)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===xr)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===vr)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Mr)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===_r)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===xr)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===vr)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Mr)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===bs||i===ys||i===Es||i===Ts)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===bs)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===ys)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Es)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Ts)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===As||i===ws||i===Rs||i===Cs||i===Ps||i===Er||i===Ls)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(i===As||i===ws)return a===gt?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===Rs)return a===gt?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC;if(i===Cs)return s.COMPRESSED_R11_EAC;if(i===Ps)return s.COMPRESSED_SIGNED_R11_EAC;if(i===Er)return s.COMPRESSED_RG11_EAC;if(i===Ls)return s.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===Ds||i===Is||i===Us||i===Ns||i===Fs||i===Os||i===ks||i===Bs||i===zs||i===Gs||i===Vs||i===Hs||i===Ws||i===Xs)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(i===Ds)return a===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Is)return a===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Us)return a===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Ns)return a===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Fs)return a===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Os)return a===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===ks)return a===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Bs)return a===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===zs)return a===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Gs)return a===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Vs)return a===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Hs)return a===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Ws)return a===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Xs)return a===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===qs||i===Ys||i===Ks)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(i===qs)return a===gt?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Ys)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Ks)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Zs||i===$s||i===Tr||i===js)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(i===Zs)return s.COMPRESSED_RED_RGTC1_EXT;if(i===$s)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Tr)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===js)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===tr?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}const pg=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,mg=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class gg{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const i=new Vo(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,i=new En({vertexShader:pg,fragmentShader:mg,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new tn(new Ci(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class _g extends Yn{constructor(e,t){super();const i=this;let r=null,s=1,a=null,o="local-floor",c=1,l=null,d=null,h=null,u=null,m=null,M=null;const w=typeof XRWebGLBinding<"u",g=new gg,f={},P=t.getContextAttributes();let C=null,S=null;const E=[],y=[],v=new He;let x=null;const p=new an;p.viewport=new mt;const b=new an;b.viewport=new mt;const A=[p,b],L=new Qc;let B=null,D=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(z){let ve=E[z];return ve===void 0&&(ve=new os,E[z]=ve),ve.getTargetRaySpace()},this.getControllerGrip=function(z){let ve=E[z];return ve===void 0&&(ve=new os,E[z]=ve),ve.getGripSpace()},this.getHand=function(z){let ve=E[z];return ve===void 0&&(ve=new os,E[z]=ve),ve.getHandSpace()};function N(z){const ve=y.indexOf(z.inputSource);if(ve===-1)return;const fe=E[ve];fe!==void 0&&(fe.update(z.inputSource,z.frame,l||a),fe.dispatchEvent({type:z.type,data:z.inputSource}))}function k(){r.removeEventListener("select",N),r.removeEventListener("selectstart",N),r.removeEventListener("selectend",N),r.removeEventListener("squeeze",N),r.removeEventListener("squeezestart",N),r.removeEventListener("squeezeend",N),r.removeEventListener("end",k),r.removeEventListener("inputsourceschange",W);for(let z=0;z<E.length;z++){const ve=y[z];ve!==null&&(y[z]=null,E[z].disconnect(ve))}B=null,D=null,g.reset();for(const z in f)delete f[z];e.setRenderTarget(C),m=null,u=null,h=null,r=null,S=null,de.stop(),i.isPresenting=!1,e.setPixelRatio(x),e.setSize(v.width,v.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(z){s=z,i.isPresenting===!0&&Ke("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(z){o=z,i.isPresenting===!0&&Ke("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(z){l=z},this.getBaseLayer=function(){return u!==null?u:m},this.getBinding=function(){return h===null&&w&&(h=new XRWebGLBinding(r,t)),h},this.getFrame=function(){return M},this.getSession=function(){return r},this.setSession=async function(z){if(r=z,r!==null){if(C=e.getRenderTarget(),r.addEventListener("select",N),r.addEventListener("selectstart",N),r.addEventListener("selectend",N),r.addEventListener("squeeze",N),r.addEventListener("squeezestart",N),r.addEventListener("squeezeend",N),r.addEventListener("end",k),r.addEventListener("inputsourceschange",W),P.xrCompatible!==!0&&await t.makeXRCompatible(),x=e.getPixelRatio(),e.getSize(v),w&&"createProjectionLayer"in XRWebGLBinding.prototype){let fe=null,We=null,Ye=null;P.depth&&(Ye=P.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,fe=P.stencil?oi:Ln,We=P.stencil?tr:yn);const ze={colorFormat:t.RGBA8,depthFormat:Ye,scaleFactor:s};h=this.getBinding(),u=h.createProjectionLayer(ze),r.updateRenderState({layers:[u]}),e.setPixelRatio(1),e.setSize(u.textureWidth,u.textureHeight,!1),S=new bn(u.textureWidth,u.textureHeight,{format:dn,type:en,depthTexture:new Ri(u.textureWidth,u.textureHeight,We,void 0,void 0,void 0,void 0,void 0,void 0,fe),stencilBuffer:P.stencil,colorSpace:e.outputColorSpace,samples:P.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1})}else{const fe={antialias:P.antialias,alpha:!0,depth:P.depth,stencil:P.stencil,framebufferScaleFactor:s};m=new XRWebGLLayer(r,t,fe),r.updateRenderState({baseLayer:m}),e.setPixelRatio(1),e.setSize(m.framebufferWidth,m.framebufferHeight,!1),S=new bn(m.framebufferWidth,m.framebufferHeight,{format:dn,type:en,colorSpace:e.outputColorSpace,stencilBuffer:P.stencil,resolveDepthBuffer:m.ignoreDepthValues===!1,resolveStencilBuffer:m.ignoreDepthValues===!1})}S.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await r.requestReferenceSpace(o),de.setContext(r),de.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function W(z){for(let ve=0;ve<z.removed.length;ve++){const fe=z.removed[ve],We=y.indexOf(fe);We>=0&&(y[We]=null,E[We].disconnect(fe))}for(let ve=0;ve<z.added.length;ve++){const fe=z.added[ve];let We=y.indexOf(fe);if(We===-1){for(let ze=0;ze<E.length;ze++)if(ze>=y.length){y.push(fe),We=ze;break}else if(y[ze]===null){y[ze]=fe,We=ze;break}if(We===-1)break}const Ye=E[We];Ye&&Ye.connect(fe)}}const $=new G,re=new G;function me(z,ve,fe){$.setFromMatrixPosition(ve.matrixWorld),re.setFromMatrixPosition(fe.matrixWorld);const We=$.distanceTo(re),Ye=ve.projectionMatrix.elements,ze=fe.projectionMatrix.elements,nt=Ye[14]/(Ye[10]-1),Qe=Ye[14]/(Ye[10]+1),it=(Ye[9]+1)/Ye[5],ct=(Ye[9]-1)/Ye[5],$e=(Ye[8]-1)/Ye[0],ye=(ze[8]+1)/ze[0],j=nt*$e,ce=nt*ye,pe=We/(-$e+ye),ae=pe*-$e;if(ve.matrixWorld.decompose(z.position,z.quaternion,z.scale),z.translateX(ae),z.translateZ(pe),z.matrixWorld.compose(z.position,z.quaternion,z.scale),z.matrixWorldInverse.copy(z.matrixWorld).invert(),Ye[10]===-1)z.projectionMatrix.copy(ve.projectionMatrix),z.projectionMatrixInverse.copy(ve.projectionMatrixInverse);else{const Ae=nt+pe,I=Qe+pe,et=j-ae,Le=ce+(We-ae),R=it*Qe/I*Ae,_=ct*Qe/I*Ae;z.projectionMatrix.makePerspective(et,Le,R,_,Ae,I),z.projectionMatrixInverse.copy(z.projectionMatrix).invert()}}function be(z,ve){ve===null?z.matrixWorld.copy(z.matrix):z.matrixWorld.multiplyMatrices(ve.matrixWorld,z.matrix),z.matrixWorldInverse.copy(z.matrixWorld).invert()}this.updateCamera=function(z){if(r===null)return;let ve=z.near,fe=z.far;g.texture!==null&&(g.depthNear>0&&(ve=g.depthNear),g.depthFar>0&&(fe=g.depthFar)),L.near=b.near=p.near=ve,L.far=b.far=p.far=fe,(B!==L.near||D!==L.far)&&(r.updateRenderState({depthNear:L.near,depthFar:L.far}),B=L.near,D=L.far),L.layers.mask=z.layers.mask|6,p.layers.mask=L.layers.mask&-5,b.layers.mask=L.layers.mask&-3;const We=z.parent,Ye=L.cameras;be(L,We);for(let ze=0;ze<Ye.length;ze++)be(Ye[ze],We);Ye.length===2?me(L,p,b):L.projectionMatrix.copy(p.projectionMatrix),_e(z,L,We)};function _e(z,ve,fe){fe===null?z.matrix.copy(ve.matrixWorld):(z.matrix.copy(fe.matrixWorld),z.matrix.invert(),z.matrix.multiply(ve.matrixWorld)),z.matrix.decompose(z.position,z.quaternion,z.scale),z.updateMatrixWorld(!0),z.projectionMatrix.copy(ve.projectionMatrix),z.projectionMatrixInverse.copy(ve.projectionMatrixInverse),z.isPerspectiveCamera&&(z.fov=Rr*2*Math.atan(1/z.projectionMatrix.elements[5]),z.zoom=1)}this.getCamera=function(){return L},this.getFoveation=function(){if(!(u===null&&m===null))return c},this.setFoveation=function(z){c=z,u!==null&&(u.fixedFoveation=z),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=z)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(L)},this.getCameraTexture=function(z){return f[z]};let Be=null;function Ze(z,ve){if(d=ve.getViewerPose(l||a),M=ve,d!==null){const fe=d.views;m!==null&&(e.setRenderTargetFramebuffer(S,m.framebuffer),e.setRenderTarget(S));let We=!1;fe.length!==L.cameras.length&&(L.cameras.length=0,We=!0);for(let Qe=0;Qe<fe.length;Qe++){const it=fe[Qe];let ct=null;if(m!==null)ct=m.getViewport(it);else{const ye=h.getViewSubImage(u,it);ct=ye.viewport,Qe===0&&(e.setRenderTargetTextures(S,ye.colorTexture,ye.depthStencilTexture),e.setRenderTarget(S))}let $e=A[Qe];$e===void 0&&($e=new an,$e.layers.enable(Qe),$e.viewport=new mt,A[Qe]=$e),$e.matrix.fromArray(it.transform.matrix),$e.matrix.decompose($e.position,$e.quaternion,$e.scale),$e.projectionMatrix.fromArray(it.projectionMatrix),$e.projectionMatrixInverse.copy($e.projectionMatrix).invert(),$e.viewport.set(ct.x,ct.y,ct.width,ct.height),Qe===0&&(L.matrix.copy($e.matrix),L.matrix.decompose(L.position,L.quaternion,L.scale)),We===!0&&L.cameras.push($e)}const Ye=r.enabledFeatures;if(Ye&&Ye.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&w){h=i.getBinding();const Qe=h.getDepthInformation(fe[0]);Qe&&Qe.isValid&&Qe.texture&&g.init(Qe,r.renderState)}if(Ye&&Ye.includes("camera-access")&&w){e.state.unbindTexture(),h=i.getBinding();for(let Qe=0;Qe<fe.length;Qe++){const it=fe[Qe].camera;if(it){let ct=f[it];ct||(ct=new Vo,f[it]=ct);const $e=h.getCameraImage(it);ct.sourceTexture=$e}}}}for(let fe=0;fe<E.length;fe++){const We=y[fe],Ye=E[fe];We!==null&&Ye!==void 0&&Ye.update(We,ve,l||a)}Be&&Be(z,ve),ve.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:ve}),M=null}const de=new nu;de.setAnimationLoop(Ze),this.setAnimationLoop=function(z){Be=z},this.dispose=function(){}}}const xg=new _t,cu=new je;cu.set(-1,0,0,0,1,0,0,0,1);function vg(n,e){function t(g,f){g.matrixAutoUpdate===!0&&g.updateMatrix(),f.value.copy(g.matrix)}function i(g,f){f.color.getRGB(g.fogColor.value,Xc(n)),f.isFog?(g.fogNear.value=f.near,g.fogFar.value=f.far):f.isFogExp2&&(g.fogDensity.value=f.density)}function r(g,f,P,C,S){f.isNodeMaterial?f.uniformsNeedUpdate=!1:f.isMeshBasicMaterial?s(g,f):f.isMeshLambertMaterial?(s(g,f),f.envMap&&(g.envMapIntensity.value=f.envMapIntensity)):f.isMeshToonMaterial?(s(g,f),h(g,f)):f.isMeshPhongMaterial?(s(g,f),d(g,f),f.envMap&&(g.envMapIntensity.value=f.envMapIntensity)):f.isMeshStandardMaterial?(s(g,f),u(g,f),f.isMeshPhysicalMaterial&&m(g,f,S)):f.isMeshMatcapMaterial?(s(g,f),M(g,f)):f.isMeshDepthMaterial?s(g,f):f.isMeshDistanceMaterial?(s(g,f),w(g,f)):f.isMeshNormalMaterial?s(g,f):f.isLineBasicMaterial?(a(g,f),f.isLineDashedMaterial&&o(g,f)):f.isPointsMaterial?c(g,f,P,C):f.isSpriteMaterial?l(g,f):f.isShadowMaterial?(g.color.value.copy(f.color),g.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function s(g,f){g.opacity.value=f.opacity,f.color&&g.diffuse.value.copy(f.color),f.emissive&&g.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(g.map.value=f.map,t(f.map,g.mapTransform)),f.alphaMap&&(g.alphaMap.value=f.alphaMap,t(f.alphaMap,g.alphaMapTransform)),f.bumpMap&&(g.bumpMap.value=f.bumpMap,t(f.bumpMap,g.bumpMapTransform),g.bumpScale.value=f.bumpScale,f.side===jt&&(g.bumpScale.value*=-1)),f.normalMap&&(g.normalMap.value=f.normalMap,t(f.normalMap,g.normalMapTransform),g.normalScale.value.copy(f.normalScale),f.side===jt&&g.normalScale.value.negate()),f.displacementMap&&(g.displacementMap.value=f.displacementMap,t(f.displacementMap,g.displacementMapTransform),g.displacementScale.value=f.displacementScale,g.displacementBias.value=f.displacementBias),f.emissiveMap&&(g.emissiveMap.value=f.emissiveMap,t(f.emissiveMap,g.emissiveMapTransform)),f.specularMap&&(g.specularMap.value=f.specularMap,t(f.specularMap,g.specularMapTransform)),f.alphaTest>0&&(g.alphaTest.value=f.alphaTest);const P=e.get(f),C=P.envMap,S=P.envMapRotation;C&&(g.envMap.value=C,g.envMapRotation.value.setFromMatrix4(xg.makeRotationFromEuler(S)).transpose(),C.isCubeTexture&&C.isRenderTargetTexture===!1&&g.envMapRotation.value.premultiply(cu),g.reflectivity.value=f.reflectivity,g.ior.value=f.ior,g.refractionRatio.value=f.refractionRatio),f.lightMap&&(g.lightMap.value=f.lightMap,g.lightMapIntensity.value=f.lightMapIntensity,t(f.lightMap,g.lightMapTransform)),f.aoMap&&(g.aoMap.value=f.aoMap,g.aoMapIntensity.value=f.aoMapIntensity,t(f.aoMap,g.aoMapTransform))}function a(g,f){g.diffuse.value.copy(f.color),g.opacity.value=f.opacity,f.map&&(g.map.value=f.map,t(f.map,g.mapTransform))}function o(g,f){g.dashSize.value=f.dashSize,g.totalSize.value=f.dashSize+f.gapSize,g.scale.value=f.scale}function c(g,f,P,C){g.diffuse.value.copy(f.color),g.opacity.value=f.opacity,g.size.value=f.size*P,g.scale.value=C*.5,f.map&&(g.map.value=f.map,t(f.map,g.uvTransform)),f.alphaMap&&(g.alphaMap.value=f.alphaMap,t(f.alphaMap,g.alphaMapTransform)),f.alphaTest>0&&(g.alphaTest.value=f.alphaTest)}function l(g,f){g.diffuse.value.copy(f.color),g.opacity.value=f.opacity,g.rotation.value=f.rotation,f.map&&(g.map.value=f.map,t(f.map,g.mapTransform)),f.alphaMap&&(g.alphaMap.value=f.alphaMap,t(f.alphaMap,g.alphaMapTransform)),f.alphaTest>0&&(g.alphaTest.value=f.alphaTest)}function d(g,f){g.specular.value.copy(f.specular),g.shininess.value=Math.max(f.shininess,1e-4)}function h(g,f){f.gradientMap&&(g.gradientMap.value=f.gradientMap)}function u(g,f){g.metalness.value=f.metalness,f.metalnessMap&&(g.metalnessMap.value=f.metalnessMap,t(f.metalnessMap,g.metalnessMapTransform)),g.roughness.value=f.roughness,f.roughnessMap&&(g.roughnessMap.value=f.roughnessMap,t(f.roughnessMap,g.roughnessMapTransform)),f.envMap&&(g.envMapIntensity.value=f.envMapIntensity)}function m(g,f,P){g.ior.value=f.ior,f.sheen>0&&(g.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),g.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(g.sheenColorMap.value=f.sheenColorMap,t(f.sheenColorMap,g.sheenColorMapTransform)),f.sheenRoughnessMap&&(g.sheenRoughnessMap.value=f.sheenRoughnessMap,t(f.sheenRoughnessMap,g.sheenRoughnessMapTransform))),f.clearcoat>0&&(g.clearcoat.value=f.clearcoat,g.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(g.clearcoatMap.value=f.clearcoatMap,t(f.clearcoatMap,g.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,t(f.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(g.clearcoatNormalMap.value=f.clearcoatNormalMap,t(f.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===jt&&g.clearcoatNormalScale.value.negate())),f.dispersion>0&&(g.dispersion.value=f.dispersion),f.iridescence>0&&(g.iridescence.value=f.iridescence,g.iridescenceIOR.value=f.iridescenceIOR,g.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(g.iridescenceMap.value=f.iridescenceMap,t(f.iridescenceMap,g.iridescenceMapTransform)),f.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=f.iridescenceThicknessMap,t(f.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),f.transmission>0&&(g.transmission.value=f.transmission,g.transmissionSamplerMap.value=P.texture,g.transmissionSamplerSize.value.set(P.width,P.height),f.transmissionMap&&(g.transmissionMap.value=f.transmissionMap,t(f.transmissionMap,g.transmissionMapTransform)),g.thickness.value=f.thickness,f.thicknessMap&&(g.thicknessMap.value=f.thicknessMap,t(f.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=f.attenuationDistance,g.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(g.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(g.anisotropyMap.value=f.anisotropyMap,t(f.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=f.specularIntensity,g.specularColor.value.copy(f.specularColor),f.specularColorMap&&(g.specularColorMap.value=f.specularColorMap,t(f.specularColorMap,g.specularColorMapTransform)),f.specularIntensityMap&&(g.specularIntensityMap.value=f.specularIntensityMap,t(f.specularIntensityMap,g.specularIntensityMapTransform))}function M(g,f){f.matcap&&(g.matcap.value=f.matcap)}function w(g,f){const P=e.get(f).light;g.referencePosition.value.setFromMatrixPosition(P.matrixWorld),g.nearDistance.value=P.shadow.camera.near,g.farDistance.value=P.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function Mg(n,e,t,i){let r={},s={},a=[];const o=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function c(S,E){const y=E.program;i.uniformBlockBinding(S,y)}function l(S,E){let y=r[S.id];y===void 0&&(g(S),y=d(S),r[S.id]=y,S.addEventListener("dispose",P));const v=E.program;i.updateUBOMapping(S,v);const x=e.render.frame;s[S.id]!==x&&(u(S),s[S.id]=x)}function d(S){const E=h();S.__bindingPointIndex=E;const y=n.createBuffer(),v=S.__size,x=S.usage;return n.bindBuffer(n.UNIFORM_BUFFER,y),n.bufferData(n.UNIFORM_BUFFER,v,x),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,E,y),y}function h(){for(let S=0;S<o;S++)if(a.indexOf(S)===-1)return a.push(S),S;return ft("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(S){const E=r[S.id],y=S.uniforms,v=S.__cache;n.bindBuffer(n.UNIFORM_BUFFER,E);for(let x=0,p=y.length;x<p;x++){const b=y[x];if(Array.isArray(b))for(let A=0,L=b.length;A<L;A++)m(b[A],x,A,v);else m(b,x,0,v)}n.bindBuffer(n.UNIFORM_BUFFER,null)}function m(S,E,y,v){if(w(S,E,y,v)===!0){const x=S.__offset,p=S.value;if(Array.isArray(p)){let b=0;for(let A=0;A<p.length;A++){const L=p[A],B=f(L);M(L,S.__data,b),typeof L!="number"&&typeof L!="boolean"&&!L.isMatrix3&&!ArrayBuffer.isView(L)&&(b+=B.storage/Float32Array.BYTES_PER_ELEMENT)}}else M(p,S.__data,0);n.bufferSubData(n.UNIFORM_BUFFER,x,S.__data)}}function M(S,E,y){typeof S=="number"||typeof S=="boolean"?E[0]=S:S.isMatrix3?(E[0]=S.elements[0],E[1]=S.elements[1],E[2]=S.elements[2],E[3]=0,E[4]=S.elements[3],E[5]=S.elements[4],E[6]=S.elements[5],E[7]=0,E[8]=S.elements[6],E[9]=S.elements[7],E[10]=S.elements[8],E[11]=0):ArrayBuffer.isView(S)?E.set(new S.constructor(S.buffer,S.byteOffset,E.length)):S.toArray(E,y)}function w(S,E,y,v){const x=S.value,p=E+"_"+y;if(v[p]===void 0)return typeof x=="number"||typeof x=="boolean"?v[p]=x:ArrayBuffer.isView(x)?v[p]=x.slice():v[p]=x.clone(),!0;{const b=v[p];if(typeof x=="number"||typeof x=="boolean"){if(b!==x)return v[p]=x,!0}else{if(ArrayBuffer.isView(x))return!0;if(b.equals(x)===!1)return b.copy(x),!0}}return!1}function g(S){const E=S.uniforms;let y=0;const v=16;for(let p=0,b=E.length;p<b;p++){const A=Array.isArray(E[p])?E[p]:[E[p]];for(let L=0,B=A.length;L<B;L++){const D=A[L],N=Array.isArray(D.value)?D.value:[D.value];for(let k=0,W=N.length;k<W;k++){const $=N[k],re=f($),me=y%v,be=me%re.boundary,_e=me+be;y+=be,_e!==0&&v-_e<re.storage&&(y+=v-_e),D.__data=new Float32Array(re.storage/Float32Array.BYTES_PER_ELEMENT),D.__offset=y,y+=re.storage}}}const x=y%v;return x>0&&(y+=v-x),S.__size=y,S.__cache={},this}function f(S){const E={boundary:0,storage:0};return typeof S=="number"||typeof S=="boolean"?(E.boundary=4,E.storage=4):S.isVector2?(E.boundary=8,E.storage=8):S.isVector3||S.isColor?(E.boundary=16,E.storage=12):S.isVector4?(E.boundary=16,E.storage=16):S.isMatrix3?(E.boundary=48,E.storage=48):S.isMatrix4?(E.boundary=64,E.storage=64):S.isTexture?Ke("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(S)?(E.boundary=16,E.storage=S.byteLength):Ke("WebGLRenderer: Unsupported uniform value type.",S),E}function P(S){const E=S.target;E.removeEventListener("dispose",P);const y=a.indexOf(E.__bindingPointIndex);a.splice(y,1),n.deleteBuffer(r[E.id]),delete r[E.id],delete s[E.id]}function C(){for(const S in r)n.deleteBuffer(r[S]);a=[],r={},s={}}return{bind:c,update:l,dispose:C}}const Sg=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let wn=null;function bg(){return wn===null&&(wn=new Hc(Sg,16,16,di,Pn),wn.name="DFG_LUT",wn.minFilter=Gt,wn.magFilter=Gt,wn.wrapS=Rn,wn.wrapT=Rn,wn.generateMipmaps=!1,wn.needsUpdate=!0),wn}class uu{constructor(e={}){const{canvas:t=Fc(),context:i=null,depth:r=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:d="default",failIfMajorPerformanceCaveat:h=!1,reversedDepthBuffer:u=!1,outputBufferType:m=en}=e;this.isWebGLRenderer=!0;let M;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");M=i.getContextAttributes().alpha}else M=a;const w=m,g=new Set([ua,ca,la]),f=new Set([en,yn,er,tr,aa,oa]),P=new Uint32Array(4),C=new Int32Array(4),S=new G;let E=null,y=null;const v=[],x=[];let p=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Sn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const b=this;let A=!1,L=null,B=null,D=null,N=null;this._outputColorSpace=zt;let k=0,W=0,$=null,re=-1,me=null;const be=new mt,_e=new mt;let Be=null;const Ze=new Je(0);let de=0,z=t.width,ve=t.height,fe=1,We=null,Ye=null;const ze=new mt(0,0,z,ve),nt=new mt(0,0,z,ve);let Qe=!1;const it=new Dr;let ct=!1,$e=!1;const ye=new _t,j=new G,ce=new mt,pe={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let ae=!1;function Ae(){return $===null?fe:1}let I=i;function et(T,X){return t.getContext(T,X)}try{const T={alpha:!0,depth:r,stencil:s,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:d,failIfMajorPerformanceCaveat:h};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${ia}`),t.addEventListener("webglcontextlost",tt,!1),t.addEventListener("webglcontextrestored",at,!1),t.addEventListener("webglcontextcreationerror",yt,!1),I===null){const X="webgl2";if(I=et(X,T),I===null)throw et(X)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}}catch(T){throw ft("WebGLRenderer: "+T.message),T}let Le,R,_,O,V,q,ue,Q,H,Y,oe,xe,ge,Me,De,Fe,Xe,F,Se,ie,Ee,we,le;function Oe(){Le=new yp(I),Le.init(),Ee=new lu(I,Le),R=new mp(I,Le,e,Ee),_=new hg(I,Le),R.reversedDepthBuffer&&u&&_.buffers.depth.setReversed(!0),B=I.createFramebuffer(),D=I.createFramebuffer(),N=I.createFramebuffer(),O=new Ap(I),V=new Jm,q=new fg(I,Le,_,V,R,Ee,O),ue=new bp(b),Q=new Cd(I),we=new fp(I,Q),H=new Ep(I,Q,O,we),Y=new Rp(I,H,Q,we,O),F=new wp(I,R,q),De=new gp(V),oe=new jm(b,ue,Le,R,we,De),xe=new vg(b,V),ge=new eg,Me=new ag(Le),Xe=new hp(b,ue,_,Y,M,c),Fe=new dg(b,Y,R),le=new Mg(I,O,R,_),Se=new pp(I,Le,O),ie=new Tp(I,Le,O),O.programs=oe.programs,b.capabilities=R,b.extensions=Le,b.properties=V,b.renderLists=ge,b.shadowMap=Fe,b.state=_,b.info=O}Oe(),w!==en&&(p=new Pp(w,t.width,t.height,o,r,s));const Ie=new _g(b,I);this.xr=Ie,this.getContext=function(){return I},this.getContextAttributes=function(){return I.getContextAttributes()},this.forceContextLoss=function(){const T=Le.get("WEBGL_lose_context");T&&T.loseContext()},this.forceContextRestore=function(){const T=Le.get("WEBGL_lose_context");T&&T.restoreContext()},this.getPixelRatio=function(){return fe},this.setPixelRatio=function(T){T!==void 0&&(fe=T,this.setSize(z,ve,!1))},this.getSize=function(T){return T.set(z,ve)},this.setSize=function(T,X,J=!0){if(Ie.isPresenting){Ke("WebGLRenderer: Can't change size while VR device is presenting.");return}z=T,ve=X,t.width=Math.floor(T*fe),t.height=Math.floor(X*fe),J===!0&&(t.style.width=T+"px",t.style.height=X+"px"),p!==null&&p.setSize(t.width,t.height),this.setViewport(0,0,T,X)},this.getDrawingBufferSize=function(T){return T.set(z*fe,ve*fe).floor()},this.setDrawingBufferSize=function(T,X,J){z=T,ve=X,fe=J,t.width=Math.floor(T*J),t.height=Math.floor(X*J),this.setViewport(0,0,T,X)},this.setEffects=function(T){if(w===en){ft("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(T){for(let X=0;X<T.length;X++)if(T[X].isOutputPass===!0){Ke("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}p.setEffects(T||[])},this.getCurrentViewport=function(T){return T.copy(be)},this.getViewport=function(T){return T.copy(ze)},this.setViewport=function(T,X,J,K){T.isVector4?ze.set(T.x,T.y,T.z,T.w):ze.set(T,X,J,K),_.viewport(be.copy(ze).multiplyScalar(fe).round())},this.getScissor=function(T){return T.copy(nt)},this.setScissor=function(T,X,J,K){T.isVector4?nt.set(T.x,T.y,T.z,T.w):nt.set(T,X,J,K),_.scissor(_e.copy(nt).multiplyScalar(fe).round())},this.getScissorTest=function(){return Qe},this.setScissorTest=function(T){_.setScissorTest(Qe=T)},this.setOpaqueSort=function(T){We=T},this.setTransparentSort=function(T){Ye=T},this.getClearColor=function(T){return T.copy(Xe.getClearColor())},this.setClearColor=function(){Xe.setClearColor(...arguments)},this.getClearAlpha=function(){return Xe.getClearAlpha()},this.setClearAlpha=function(){Xe.setClearAlpha(...arguments)},this.clear=function(T=!0,X=!0,J=!0){let K=0;if(T){let Z=!1;if($!==null){const Pe=$.texture.format;Z=g.has(Pe)}if(Z){const Pe=$.texture.type,Ne=f.has(Pe),Ce=Xe.getClearColor(),ke=Xe.getClearAlpha(),Ge=Ce.r,st=Ce.g,lt=Ce.b;Ne?(P[0]=Ge,P[1]=st,P[2]=lt,P[3]=ke,I.clearBufferuiv(I.COLOR,0,P)):(C[0]=Ge,C[1]=st,C[2]=lt,C[3]=ke,I.clearBufferiv(I.COLOR,0,C))}else K|=I.COLOR_BUFFER_BIT}X&&(K|=I.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),J&&(K|=I.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),K!==0&&I.clear(K)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(T){T.setRenderer(this),L=T},this.dispose=function(){t.removeEventListener("webglcontextlost",tt,!1),t.removeEventListener("webglcontextrestored",at,!1),t.removeEventListener("webglcontextcreationerror",yt,!1),Xe.dispose(),ge.dispose(),Me.dispose(),V.dispose(),ue.dispose(),Y.dispose(),we.dispose(),le.dispose(),oe.dispose(),Ie.dispose(),Ie.removeEventListener("sessionstart",te),Ie.removeEventListener("sessionend",se),he.stop()};function tt(T){T.preventDefault(),ho("WebGLRenderer: Context Lost."),A=!0}function at(){ho("WebGLRenderer: Context Restored."),A=!1;const T=O.autoReset,X=Fe.enabled,J=Fe.autoUpdate,K=Fe.needsUpdate,Z=Fe.type;Oe(),O.autoReset=T,Fe.enabled=X,Fe.autoUpdate=J,Fe.needsUpdate=K,Fe.type=Z}function yt(T){ft("WebGLRenderer: A WebGL context could not be created. Reason: ",T.statusMessage)}function Tt(T){const X=T.target;X.removeEventListener("dispose",Tt),fn(X)}function fn(T){pi(T),V.remove(T)}function pi(T){const X=V.get(T).programs;X!==void 0&&(X.forEach(function(J){oe.releaseProgram(J)}),T.isShaderMaterial&&oe.releaseShaderCache(T))}this.renderBufferDirect=function(T,X,J,K,Z,Pe){X===null&&(X=pe);const Ne=Z.isMesh&&Z.matrixWorld.determinantAffine()<0,Ce=Ht(T,X,J,K,Z);_.setMaterial(K,Ne);let ke=J.index,Ge=1;if(K.wireframe===!0){if(ke=H.getWireframeAttribute(J),ke===void 0)return;Ge=2}const st=J.drawRange,lt=J.attributes.position;let Ve=st.start*Ge,xt=(st.start+st.count)*Ge;Pe!==null&&(Ve=Math.max(Ve,Pe.start*Ge),xt=Math.min(xt,(Pe.start+Pe.count)*Ge)),ke!==null?(Ve=Math.max(Ve,0),xt=Math.min(xt,ke.count)):lt!=null&&(Ve=Math.max(Ve,0),xt=Math.min(xt,lt.count));const wt=xt-Ve;if(wt<0||wt===1/0)return;we.setup(Z,K,Ce,J,ke);let Et,Mt=Se;if(ke!==null&&(Et=Q.get(ke),Mt=ie,Mt.setIndex(Et)),Z.isMesh)K.wireframe===!0?(_.setLineWidth(K.wireframeLinewidth*Ae()),Mt.setMode(I.LINES)):Mt.setMode(I.TRIANGLES);else if(Z.isLine){let Wt=K.linewidth;Wt===void 0&&(Wt=1),_.setLineWidth(Wt*Ae()),Z.isLineSegments?Mt.setMode(I.LINES):Z.isLineLoop?Mt.setMode(I.LINE_LOOP):Mt.setMode(I.LINE_STRIP)}else Z.isPoints?Mt.setMode(I.POINTS):Z.isSprite&&Mt.setMode(I.TRIANGLES);if(Z.isBatchedMesh)if(Le.get("WEBGL_multi_draw"))Mt.renderMultiDraw(Z._multiDrawStarts,Z._multiDrawCounts,Z._multiDrawCount);else{const Wt=Z._multiDrawStarts,Ue=Z._multiDrawCounts,nn=Z._multiDrawCount,pt=ke?Q.get(ke).bytesPerElement:1,ln=V.get(K).currentProgram.getUniforms();for(let Tn=0;Tn<nn;Tn++)ln.setValue(I,"_gl_DrawID",Tn),Mt.render(Wt[Tn]/pt,Ue[Tn])}else if(Z.isInstancedMesh)Mt.renderInstances(Ve,wt,Z.count);else if(J.isInstancedBufferGeometry){const Wt=J._maxInstanceCount!==void 0?J._maxInstanceCount:1/0,Ue=Math.min(J.instanceCount,Wt);Mt.renderInstances(Ve,wt,Ue)}else Mt.render(Ve,wt)};function Li(T,X,J){T.transparent===!0&&T.side===$t&&T.forceSinglePass===!1?(T.side=jt,T.needsUpdate=!0,Ft(T,X,J),T.side=Wn,T.needsUpdate=!0,Ft(T,X,J),T.side=$t):Ft(T,X,J)}this.compile=function(T,X,J=null){J===null&&(J=T),y=Me.get(J),y.init(X),x.push(y),J.traverseVisible(function(Z){Z.isLight&&Z.layers.test(X.layers)&&(y.pushLight(Z),Z.castShadow&&y.pushShadow(Z))}),T!==J&&T.traverseVisible(function(Z){Z.isLight&&Z.layers.test(X.layers)&&(y.pushLight(Z),Z.castShadow&&y.pushShadow(Z))}),y.setupLights();const K=new Set;return T.traverse(function(Z){if(!(Z.isMesh||Z.isPoints||Z.isLine||Z.isSprite))return;const Pe=Z.material;if(Pe)if(Array.isArray(Pe))for(let Ne=0;Ne<Pe.length;Ne++){const Ce=Pe[Ne];Li(Ce,J,Z),K.add(Ce)}else Li(Pe,J,Z),K.add(Pe)}),y=x.pop(),K},this.compileAsync=function(T,X,J=null){const K=this.compile(T,X,J);return new Promise(Z=>{function Pe(){if(K.forEach(function(Ne){V.get(Ne).currentProgram.isReady()&&K.delete(Ne)}),K.size===0){Z(T);return}setTimeout(Pe,10)}Le.get("KHR_parallel_shader_compile")!==null?Pe():setTimeout(Pe,10)})};let U=null;function ee(T){U&&U(T)}function te(){he.stop()}function se(){he.start()}const he=new nu;he.setAnimationLoop(ee),typeof self<"u"&&he.setContext(self),this.setAnimationLoop=function(T){U=T,Ie.setAnimationLoop(T),T===null?he.stop():he.start()},Ie.addEventListener("sessionstart",te),Ie.addEventListener("sessionend",se),this.render=function(T,X){if(X!==void 0&&X.isCamera!==!0){ft("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(A===!0)return;L!==null&&L.renderStart(T,X);const J=Ie.enabled===!0&&Ie.isPresenting===!0,K=p!==null&&($===null||J)&&p.begin(b,$);if(T.matrixWorldAutoUpdate===!0&&T.updateMatrixWorld(),X.parent===null&&X.matrixWorldAutoUpdate===!0&&X.updateMatrixWorld(),Ie.enabled===!0&&Ie.isPresenting===!0&&(p===null||p.isCompositing()===!1)&&(Ie.cameraAutoUpdate===!0&&Ie.updateCamera(X),X=Ie.getCamera()),T.isScene===!0&&T.onBeforeRender(b,T,X,$),y=Me.get(T,x.length),y.init(X),y.state.textureUnits=q.getTextureUnits(),x.push(y),ye.multiplyMatrices(X.projectionMatrix,X.matrixWorldInverse),it.setFromProjectionMatrix(ye,Mn,X.reversedDepth),$e=this.localClippingEnabled,ct=De.init(this.clippingPlanes,$e),E=ge.get(T,v.length),E.init(),v.push(E),Ie.enabled===!0&&Ie.isPresenting===!0){const Ne=b.xr.getDepthSensingMesh();Ne!==null&&ne(Ne,X,-1/0,b.sortObjects)}ne(T,X,0,b.sortObjects),E.finish(),b.sortObjects===!0&&E.sort(We,Ye,X.reversedDepth),ae=Ie.enabled===!1||Ie.isPresenting===!1||Ie.hasDepthSensing()===!1,ae&&Xe.addToRenderList(E,T),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),ct===!0&&De.beginShadows();const Z=y.state.shadowsArray;if(Fe.render(Z,T,X),ct===!0&&De.endShadows(),(K&&p.hasRenderPass())===!1){const Ne=E.opaque,Ce=E.transmissive;if(y.setupLights(),X.isArrayCamera){const ke=X.cameras;if(Ce.length>0)for(let Ge=0,st=ke.length;Ge<st;Ge++){const lt=ke[Ge];rt(Ne,Ce,T,lt)}ae&&Xe.render(T);for(let Ge=0,st=ke.length;Ge<st;Ge++){const lt=ke[Ge];Te(E,T,lt,lt.viewport)}}else Ce.length>0&&rt(Ne,Ce,T,X),ae&&Xe.render(T),Te(E,T,X)}$!==null&&W===0&&(q.updateMultisampleRenderTarget($),q.updateRenderTargetMipmap($)),K&&p.end(b),T.isScene===!0&&T.onAfterRender(b,T,X),we.resetDefaultState(),re=-1,me=null,x.pop(),x.length>0?(y=x[x.length-1],q.setTextureUnits(y.state.textureUnits),ct===!0&&De.setGlobalState(b.clippingPlanes,y.state.camera)):y=null,v.pop(),v.length>0?E=v[v.length-1]:E=null,L!==null&&L.renderEnd()};function ne(T,X,J,K){if(T.visible===!1)return;if(T.layers.test(X.layers)){if(T.isGroup)J=T.renderOrder;else if(T.isLOD)T.autoUpdate===!0&&T.update(X);else if(T.isLightProbeGrid)y.pushLightProbeGrid(T);else if(T.isLight)y.pushLight(T),T.castShadow&&y.pushShadow(T);else if(T.isSprite){if(!T.frustumCulled||it.intersectsSprite(T)){K&&ce.setFromMatrixPosition(T.matrixWorld).applyMatrix4(ye);const Ne=Y.update(T),Ce=T.material;Ce.visible&&E.push(T,Ne,Ce,J,ce.z,null)}}else if((T.isMesh||T.isLine||T.isPoints)&&(!T.frustumCulled||it.intersectsObject(T))){const Ne=Y.update(T),Ce=T.material;if(K&&(T.boundingSphere!==void 0?(T.boundingSphere===null&&T.computeBoundingSphere(),ce.copy(T.boundingSphere.center)):(Ne.boundingSphere===null&&Ne.computeBoundingSphere(),ce.copy(Ne.boundingSphere.center)),ce.applyMatrix4(T.matrixWorld).applyMatrix4(ye)),Array.isArray(Ce)){const ke=Ne.groups;for(let Ge=0,st=ke.length;Ge<st;Ge++){const lt=ke[Ge],Ve=Ce[lt.materialIndex];Ve&&Ve.visible&&E.push(T,Ne,Ve,J,ce.z,lt)}}else Ce.visible&&E.push(T,Ne,Ce,J,ce.z,null)}}const Pe=T.children;for(let Ne=0,Ce=Pe.length;Ne<Ce;Ne++)ne(Pe[Ne],X,J,K)}function Te(T,X,J,K){const{opaque:Z,transmissive:Pe,transparent:Ne}=T;y.setupLightsView(J),ct===!0&&De.setGlobalState(b.clippingPlanes,J),K&&_.viewport(be.copy(K)),Z.length>0&&qe(Z,X,J),Pe.length>0&&qe(Pe,X,J),Ne.length>0&&qe(Ne,X,J),_.buffers.depth.setTest(!0),_.buffers.depth.setMask(!0),_.buffers.color.setMask(!0),_.setPolygonOffset(!1)}function rt(T,X,J,K){if((J.isScene===!0?J.overrideMaterial:null)!==null)return;if(y.state.transmissionRenderTarget[K.id]===void 0){const Ve=Le.has("EXT_color_buffer_half_float")||Le.has("EXT_color_buffer_float");y.state.transmissionRenderTarget[K.id]=new bn(1,1,{generateMipmaps:!0,type:Ve?Pn:en,minFilter:ai,samples:Math.max(4,R.samples),stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:ht.workingColorSpace})}const Pe=y.state.transmissionRenderTarget[K.id],Ne=K.viewport||be;Pe.setSize(Ne.z*b.transmissionResolutionScale,Ne.w*b.transmissionResolutionScale);const Ce=b.getRenderTarget(),ke=b.getActiveCubeFace(),Ge=b.getActiveMipmapLevel();b.setRenderTarget(Pe),b.getClearColor(Ze),de=b.getClearAlpha(),de<1&&b.setClearColor(16777215,.5),b.clear(),ae&&Xe.render(J);const st=b.toneMapping;b.toneMapping=Sn;const lt=K.viewport;if(K.viewport!==void 0&&(K.viewport=void 0),y.setupLightsView(K),ct===!0&&De.setGlobalState(b.clippingPlanes,K),qe(T,J,K),q.updateMultisampleRenderTarget(Pe),q.updateRenderTargetMipmap(Pe),Le.has("WEBGL_multisampled_render_to_texture")===!1){let Ve=!1;for(let xt=0,wt=X.length;xt<wt;xt++){const Et=X[xt],{object:Mt,geometry:Wt,material:Ue,group:nn}=Et;if(Ue.side===$t&&Mt.layers.test(K.layers)){const pt=Ue.side;Ue.side=jt,Ue.needsUpdate=!0,Pt(Mt,J,K,Wt,Ue,nn),Ue.side=pt,Ue.needsUpdate=!0,Ve=!0}}Ve===!0&&(q.updateMultisampleRenderTarget(Pe),q.updateRenderTargetMipmap(Pe))}b.setRenderTarget(Ce,ke,Ge),b.setClearColor(Ze,de),lt!==void 0&&(K.viewport=lt),b.toneMapping=st}function qe(T,X,J){const K=X.isScene===!0?X.overrideMaterial:null;for(let Z=0,Pe=T.length;Z<Pe;Z++){const Ne=T[Z],{object:Ce,geometry:ke,group:Ge}=Ne;let st=Ne.material;st.allowOverride===!0&&K!==null&&(st=K),Ce.layers.test(J.layers)&&Pt(Ce,X,J,ke,st,Ge)}}function Pt(T,X,J,K,Z,Pe){T.onBeforeRender(b,X,J,K,Z,Pe),T.modelViewMatrix.multiplyMatrices(J.matrixWorldInverse,T.matrixWorld),T.normalMatrix.getNormalMatrix(T.modelViewMatrix),Z.onBeforeRender(b,X,J,K,T,Pe),Z.transparent===!0&&Z.side===$t&&Z.forceSinglePass===!1?(Z.side=jt,Z.needsUpdate=!0,b.renderBufferDirect(J,X,K,Z,T,Pe),Z.side=Wn,Z.needsUpdate=!0,b.renderBufferDirect(J,X,K,Z,T,Pe),Z.side=$t):b.renderBufferDirect(J,X,K,Z,T,Pe),T.onAfterRender(b,X,J,K,Z,Pe)}function Ft(T,X,J){X.isScene!==!0&&(X=pe);const K=V.get(T),Z=y.state.lights,Pe=y.state.shadowsArray,Ne=Z.state.version,Ce=oe.getParameters(T,Z.state,Pe,X,J,y.state.lightProbeGridArray),ke=oe.getProgramCacheKey(Ce);let Ge=K.programs;K.environment=T.isMeshStandardMaterial||T.isMeshLambertMaterial||T.isMeshPhongMaterial?X.environment:null,K.fog=X.fog;const st=T.isMeshStandardMaterial||T.isMeshLambertMaterial&&!T.envMap||T.isMeshPhongMaterial&&!T.envMap;K.envMap=ue.get(T.envMap||K.environment,st),K.envMapRotation=K.environment!==null&&T.envMap===null?X.environmentRotation:T.envMapRotation,Ge===void 0&&(T.addEventListener("dispose",Tt),Ge=new Map,K.programs=Ge);let lt=Ge.get(ke);if(lt!==void 0){if(K.currentProgram===lt&&K.lightsStateVersion===Ne)return Jt(T,Ce),lt}else Ce.uniforms=oe.getUniforms(T),L!==null&&T.isNodeMaterial&&L.build(T,J,Ce),T.onBeforeCompile(Ce,b),lt=oe.acquireProgram(Ce,ke),Ge.set(ke,lt),K.uniforms=Ce.uniforms;const Ve=K.uniforms;return(!T.isShaderMaterial&&!T.isRawShaderMaterial||T.clipping===!0)&&(Ve.clippingPlanes=De.uniform),Jt(T,Ce),K.needsLights=vu(T),K.lightsStateVersion=Ne,K.needsLights&&(Ve.ambientLightColor.value=Z.state.ambient,Ve.lightProbe.value=Z.state.probe,Ve.directionalLights.value=Z.state.directional,Ve.directionalLightShadows.value=Z.state.directionalShadow,Ve.spotLights.value=Z.state.spot,Ve.spotLightShadows.value=Z.state.spotShadow,Ve.rectAreaLights.value=Z.state.rectArea,Ve.ltc_1.value=Z.state.rectAreaLTC1,Ve.ltc_2.value=Z.state.rectAreaLTC2,Ve.pointLights.value=Z.state.point,Ve.pointLightShadows.value=Z.state.pointShadow,Ve.hemisphereLights.value=Z.state.hemi,Ve.directionalShadowMatrix.value=Z.state.directionalShadowMatrix,Ve.spotLightMatrix.value=Z.state.spotLightMatrix,Ve.spotLightMap.value=Z.state.spotLightMap,Ve.pointShadowMatrix.value=Z.state.pointShadowMatrix),K.lightProbeGrid=y.state.lightProbeGridArray.length>0,K.currentProgram=lt,K.uniformsList=null,lt}function At(T){if(T.uniformsList===null){const X=T.currentProgram.getUniforms();T.uniformsList=ls.seqWithValue(X.seq,T.uniforms)}return T.uniformsList}function Jt(T,X){const J=V.get(T);J.outputColorSpace=X.outputColorSpace,J.batching=X.batching,J.batchingColor=X.batchingColor,J.instancing=X.instancing,J.instancingColor=X.instancingColor,J.instancingMorph=X.instancingMorph,J.skinning=X.skinning,J.morphTargets=X.morphTargets,J.morphNormals=X.morphNormals,J.morphColors=X.morphColors,J.morphTargetsCount=X.morphTargetsCount,J.numClippingPlanes=X.numClippingPlanes,J.numIntersection=X.numClipIntersection,J.vertexAlphas=X.vertexAlphas,J.vertexTangents=X.vertexTangents,J.toneMapping=X.toneMapping}function Kn(T,X){if(T.length===0)return null;if(T.length===1)return T[0].texture!==null?T[0]:null;S.setFromMatrixPosition(X.matrixWorld);for(let J=0,K=T.length;J<K;J++){const Z=T[J];if(Z.texture!==null&&Z.boundingBox.containsPoint(S))return Z}return null}function Ht(T,X,J,K,Z){X.isScene!==!0&&(X=pe),q.resetTextureUnits();const Pe=X.fog,Ne=K.isMeshStandardMaterial||K.isMeshLambertMaterial||K.isMeshPhongMaterial?X.environment:null,Ce=$===null?b.outputColorSpace:$.isXRRenderTarget===!0?$.texture.colorSpace:ht.workingColorSpace,ke=K.isMeshStandardMaterial||K.isMeshLambertMaterial&&!K.envMap||K.isMeshPhongMaterial&&!K.envMap,Ge=ue.get(K.envMap||Ne,ke),st=K.vertexColors===!0&&!!J.attributes.color&&J.attributes.color.itemSize===4,lt=!!J.attributes.tangent&&(!!K.normalMap||K.anisotropy>0),Ve=!!J.morphAttributes.position,xt=!!J.morphAttributes.normal,wt=!!J.morphAttributes.color;let Et=Sn;K.toneMapped&&($===null||$.isXRRenderTarget===!0)&&(Et=b.toneMapping);const Mt=J.morphAttributes.position||J.morphAttributes.normal||J.morphAttributes.color,Wt=Mt!==void 0?Mt.length:0,Ue=V.get(K),nn=y.state.lights;if(ct===!0&&($e===!0||T!==me)){const bt=T===me&&K.id===re;De.setState(K,T,bt)}let pt=!1;K.version===Ue.__version?(Ue.needsLights&&Ue.lightsStateVersion!==nn.state.version||Ue.outputColorSpace!==Ce||Z.isBatchedMesh&&Ue.batching===!1||!Z.isBatchedMesh&&Ue.batching===!0||Z.isBatchedMesh&&Ue.batchingColor===!0&&Z.colorTexture===null||Z.isBatchedMesh&&Ue.batchingColor===!1&&Z.colorTexture!==null||Z.isInstancedMesh&&Ue.instancing===!1||!Z.isInstancedMesh&&Ue.instancing===!0||Z.isSkinnedMesh&&Ue.skinning===!1||!Z.isSkinnedMesh&&Ue.skinning===!0||Z.isInstancedMesh&&Ue.instancingColor===!0&&Z.instanceColor===null||Z.isInstancedMesh&&Ue.instancingColor===!1&&Z.instanceColor!==null||Z.isInstancedMesh&&Ue.instancingMorph===!0&&Z.morphTexture===null||Z.isInstancedMesh&&Ue.instancingMorph===!1&&Z.morphTexture!==null||Ue.envMap!==Ge||K.fog===!0&&Ue.fog!==Pe||Ue.numClippingPlanes!==void 0&&(Ue.numClippingPlanes!==De.numPlanes||Ue.numIntersection!==De.numIntersection)||Ue.vertexAlphas!==st||Ue.vertexTangents!==lt||Ue.morphTargets!==Ve||Ue.morphNormals!==xt||Ue.morphColors!==wt||Ue.toneMapping!==Et||Ue.morphTargetsCount!==Wt||!!Ue.lightProbeGrid!=y.state.lightProbeGridArray.length>0)&&(pt=!0):(pt=!0,Ue.__version=K.version);let ln=Ue.currentProgram;pt===!0&&(ln=Ft(K,X,Z),L&&K.isNodeMaterial&&L.onUpdateProgram(K,ln,Ue));let Tn=!1,Zn=!1,Di=!1;const St=ln.getUniforms(),Rt=Ue.uniforms;if(_.useProgram(ln.program)&&(Tn=!0,Zn=!0,Di=!0),K.id!==re&&(re=K.id,Zn=!0),Ue.needsLights){const bt=Kn(y.state.lightProbeGridArray,Z);Ue.lightProbeGrid!==bt&&(Ue.lightProbeGrid=bt,Zn=!0)}if(Tn||me!==T){_.buffers.depth.getReversed()&&T.reversedDepth!==!0&&(T._reversedDepth=!0,T.updateProjectionMatrix()),St.setValue(I,"projectionMatrix",T.projectionMatrix),St.setValue(I,"viewMatrix",T.matrixWorldInverse);const jn=St.map.cameraPosition;jn!==void 0&&jn.setValue(I,j.setFromMatrixPosition(T.matrixWorld)),R.logarithmicDepthBuffer&&St.setValue(I,"logDepthBufFC",2/(Math.log(T.far+1)/Math.LN2)),(K.isMeshPhongMaterial||K.isMeshToonMaterial||K.isMeshLambertMaterial||K.isMeshBasicMaterial||K.isMeshStandardMaterial||K.isShaderMaterial)&&St.setValue(I,"isOrthographic",T.isOrthographicCamera===!0),me!==T&&(me=T,Zn=!0,Di=!0)}if(Ue.needsLights&&(nn.state.directionalShadowMap.length>0&&St.setValue(I,"directionalShadowMap",nn.state.directionalShadowMap,q),nn.state.spotShadowMap.length>0&&St.setValue(I,"spotShadowMap",nn.state.spotShadowMap,q),nn.state.pointShadowMap.length>0&&St.setValue(I,"pointShadowMap",nn.state.pointShadowMap,q)),Z.isSkinnedMesh){St.setOptional(I,Z,"bindMatrix"),St.setOptional(I,Z,"bindMatrixInverse");const bt=Z.skeleton;bt&&(bt.boneTexture===null&&bt.computeBoneTexture(),St.setValue(I,"boneTexture",bt.boneTexture,q))}Z.isBatchedMesh&&(St.setOptional(I,Z,"batchingTexture"),St.setValue(I,"batchingTexture",Z._matricesTexture,q),St.setOptional(I,Z,"batchingIdTexture"),St.setValue(I,"batchingIdTexture",Z._indirectTexture,q),St.setOptional(I,Z,"batchingColorTexture"),Z._colorsTexture!==null&&St.setValue(I,"batchingColorTexture",Z._colorsTexture,q));const $n=J.morphAttributes;if(($n.position!==void 0||$n.normal!==void 0||$n.color!==void 0)&&F.update(Z,J,ln),(Zn||Ue.receiveShadow!==Z.receiveShadow)&&(Ue.receiveShadow=Z.receiveShadow,St.setValue(I,"receiveShadow",Z.receiveShadow)),(K.isMeshStandardMaterial||K.isMeshLambertMaterial||K.isMeshPhongMaterial)&&K.envMap===null&&X.environment!==null&&(Rt.envMapIntensity.value=X.environmentIntensity),Rt.dfgLUT!==void 0&&(Rt.dfgLUT.value=bg()),Zn){if(St.setValue(I,"toneMappingExposure",b.toneMappingExposure),Ue.needsLights&&Ea(Rt,Di),Pe&&K.fog===!0&&xe.refreshFogUniforms(Rt,Pe),xe.refreshMaterialUniforms(Rt,K,fe,ve,y.state.transmissionRenderTarget[T.id]),Ue.needsLights&&Ue.lightProbeGrid){const bt=Ue.lightProbeGrid;Rt.probesSH.value=bt.texture,Rt.probesMin.value.copy(bt.boundingBox.min),Rt.probesMax.value.copy(bt.boundingBox.max),Rt.probesResolution.value.copy(bt.resolution)}ls.upload(I,At(Ue),Rt,q)}if(K.isShaderMaterial&&K.uniformsNeedUpdate===!0&&(ls.upload(I,At(Ue),Rt,q),K.uniformsNeedUpdate=!1),K.isSpriteMaterial&&St.setValue(I,"center",Z.center),St.setValue(I,"modelViewMatrix",Z.modelViewMatrix),St.setValue(I,"normalMatrix",Z.normalMatrix),St.setValue(I,"modelMatrix",Z.matrixWorld),K.uniformsGroups!==void 0){const bt=K.uniformsGroups;for(let jn=0,Ii=bt.length;jn<Ii;jn++){const Ko=bt[jn];le.update(Ko,ln),le.bind(Ko,ln)}}return ln}function Ea(T,X){T.ambientLightColor.needsUpdate=X,T.lightProbe.needsUpdate=X,T.directionalLights.needsUpdate=X,T.directionalLightShadows.needsUpdate=X,T.pointLights.needsUpdate=X,T.pointLightShadows.needsUpdate=X,T.spotLights.needsUpdate=X,T.spotLightShadows.needsUpdate=X,T.rectAreaLights.needsUpdate=X,T.hemisphereLights.needsUpdate=X}function vu(T){return T.isMeshLambertMaterial||T.isMeshToonMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isShadowMaterial||T.isShaderMaterial&&T.lights===!0}this.getActiveCubeFace=function(){return k},this.getActiveMipmapLevel=function(){return W},this.getRenderTarget=function(){return $},this.setRenderTargetTextures=function(T,X,J){const K=V.get(T);K.__autoAllocateDepthBuffer=T.resolveDepthBuffer===!1,K.__autoAllocateDepthBuffer===!1&&(K.__useRenderToTexture=!1),V.get(T.texture).__webglTexture=X,V.get(T.depthTexture).__webglTexture=K.__autoAllocateDepthBuffer?void 0:J,K.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(T,X){const J=V.get(T);J.__webglFramebuffer=X,J.__useDefaultFramebuffer=X===void 0},this.setRenderTarget=function(T,X=0,J=0){$=T,k=X,W=J;let K=null,Z=!1,Pe=!1;if(T){const Ce=V.get(T);if(Ce.__useDefaultFramebuffer!==void 0){_.bindFramebuffer(I.FRAMEBUFFER,Ce.__webglFramebuffer),be.copy(T.viewport),_e.copy(T.scissor),Be=T.scissorTest,_.viewport(be),_.scissor(_e),_.setScissorTest(Be),re=-1;return}else if(Ce.__webglFramebuffer===void 0)q.setupRenderTarget(T);else if(Ce.__hasExternalTextures)q.rebindTextures(T,V.get(T.texture).__webglTexture,V.get(T.depthTexture).__webglTexture);else if(T.depthBuffer){const st=T.depthTexture;if(Ce.__boundDepthTexture!==st){if(st!==null&&V.has(st)&&(T.width!==st.image.width||T.height!==st.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");q.setupDepthRenderbuffer(T)}}const ke=T.texture;(ke.isData3DTexture||ke.isDataArrayTexture||ke.isCompressedArrayTexture)&&(Pe=!0);const Ge=V.get(T).__webglFramebuffer;T.isWebGLCubeRenderTarget?(Array.isArray(Ge[X])?K=Ge[X][J]:K=Ge[X],Z=!0):T.samples>0&&q.useMultisampledRTT(T)===!1?K=V.get(T).__webglMultisampledFramebuffer:Array.isArray(Ge)?K=Ge[J]:K=Ge,be.copy(T.viewport),_e.copy(T.scissor),Be=T.scissorTest}else be.copy(ze).multiplyScalar(fe).floor(),_e.copy(nt).multiplyScalar(fe).floor(),Be=Qe;if(J!==0&&(K=B),_.bindFramebuffer(I.FRAMEBUFFER,K)&&_.drawBuffers(T,K),_.viewport(be),_.scissor(_e),_.setScissorTest(Be),Z){const Ce=V.get(T.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_CUBE_MAP_POSITIVE_X+X,Ce.__webglTexture,J)}else if(Pe){const Ce=X;for(let ke=0;ke<T.textures.length;ke++){const Ge=V.get(T.textures[ke]);I.framebufferTextureLayer(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0+ke,Ge.__webglTexture,J,Ce)}}else if(T!==null&&J!==0){const Ce=V.get(T.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,Ce.__webglTexture,J)}re=-1},this.readRenderTargetPixels=function(T,X,J,K,Z,Pe,Ne,Ce=0){if(!(T&&T.isWebGLRenderTarget)){ft("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let ke=V.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&Ne!==void 0&&(ke=ke[Ne]),ke){_.bindFramebuffer(I.FRAMEBUFFER,ke);try{const Ge=T.textures[Ce],st=Ge.format,lt=Ge.type;if(T.textures.length>1&&I.readBuffer(I.COLOR_ATTACHMENT0+Ce),!R.textureFormatReadable(st)){ft("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!R.textureTypeReadable(lt)){ft("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}X>=0&&X<=T.width-K&&J>=0&&J<=T.height-Z&&I.readPixels(X,J,K,Z,Ee.convert(st),Ee.convert(lt),Pe)}finally{const Ge=$!==null?V.get($).__webglFramebuffer:null;_.bindFramebuffer(I.FRAMEBUFFER,Ge)}}},this.readRenderTargetPixelsAsync=async function(T,X,J,K,Z,Pe,Ne,Ce=0){if(!(T&&T.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let ke=V.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&Ne!==void 0&&(ke=ke[Ne]),ke)if(X>=0&&X<=T.width-K&&J>=0&&J<=T.height-Z){_.bindFramebuffer(I.FRAMEBUFFER,ke);const Ge=T.textures[Ce],st=Ge.format,lt=Ge.type;if(T.textures.length>1&&I.readBuffer(I.COLOR_ATTACHMENT0+Ce),!R.textureFormatReadable(st))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!R.textureTypeReadable(lt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Ve=I.createBuffer();I.bindBuffer(I.PIXEL_PACK_BUFFER,Ve),I.bufferData(I.PIXEL_PACK_BUFFER,Pe.byteLength,I.STREAM_READ),I.readPixels(X,J,K,Z,Ee.convert(st),Ee.convert(lt),0);const xt=$!==null?V.get($).__webglFramebuffer:null;_.bindFramebuffer(I.FRAMEBUFFER,xt);const wt=I.fenceSync(I.SYNC_GPU_COMMANDS_COMPLETE,0);return I.flush(),await Gu(I,wt,4),I.bindBuffer(I.PIXEL_PACK_BUFFER,Ve),I.getBufferSubData(I.PIXEL_PACK_BUFFER,0,Pe),I.deleteBuffer(Ve),I.deleteSync(wt),Pe}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(T,X=null,J=0){const K=Math.pow(2,-J),Z=Math.floor(T.image.width*K),Pe=Math.floor(T.image.height*K),Ne=X!==null?X.x:0,Ce=X!==null?X.y:0;q.setTexture2D(T,0),I.copyTexSubImage2D(I.TEXTURE_2D,J,0,0,Ne,Ce,Z,Pe),_.unbindTexture()},this.copyTextureToTexture=function(T,X,J=null,K=null,Z=0,Pe=0){let Ne,Ce,ke,Ge,st,lt,Ve,xt,wt;const Et=T.isCompressedTexture?T.mipmaps[Pe]:T.image;if(J!==null)Ne=J.max.x-J.min.x,Ce=J.max.y-J.min.y,ke=J.isBox3?J.max.z-J.min.z:1,Ge=J.min.x,st=J.min.y,lt=J.isBox3?J.min.z:0;else{const Rt=Math.pow(2,-Z);Ne=Math.floor(Et.width*Rt),Ce=Math.floor(Et.height*Rt),T.isDataArrayTexture?ke=Et.depth:T.isData3DTexture?ke=Math.floor(Et.depth*Rt):ke=1,Ge=0,st=0,lt=0}K!==null?(Ve=K.x,xt=K.y,wt=K.z):(Ve=0,xt=0,wt=0);const Mt=Ee.convert(X.format),Wt=Ee.convert(X.type);let Ue;X.isData3DTexture?(q.setTexture3D(X,0),Ue=I.TEXTURE_3D):X.isDataArrayTexture||X.isCompressedArrayTexture?(q.setTexture2DArray(X,0),Ue=I.TEXTURE_2D_ARRAY):(q.setTexture2D(X,0),Ue=I.TEXTURE_2D),_.activeTexture(I.TEXTURE0),_.pixelStorei(I.UNPACK_FLIP_Y_WEBGL,X.flipY),_.pixelStorei(I.UNPACK_PREMULTIPLY_ALPHA_WEBGL,X.premultiplyAlpha),_.pixelStorei(I.UNPACK_ALIGNMENT,X.unpackAlignment);const nn=_.getParameter(I.UNPACK_ROW_LENGTH),pt=_.getParameter(I.UNPACK_IMAGE_HEIGHT),ln=_.getParameter(I.UNPACK_SKIP_PIXELS),Tn=_.getParameter(I.UNPACK_SKIP_ROWS),Zn=_.getParameter(I.UNPACK_SKIP_IMAGES);_.pixelStorei(I.UNPACK_ROW_LENGTH,Et.width),_.pixelStorei(I.UNPACK_IMAGE_HEIGHT,Et.height),_.pixelStorei(I.UNPACK_SKIP_PIXELS,Ge),_.pixelStorei(I.UNPACK_SKIP_ROWS,st),_.pixelStorei(I.UNPACK_SKIP_IMAGES,lt);const Di=T.isDataArrayTexture||T.isData3DTexture,St=X.isDataArrayTexture||X.isData3DTexture;if(T.isDepthTexture){const Rt=V.get(T),$n=V.get(X),bt=V.get(Rt.__renderTarget),jn=V.get($n.__renderTarget);_.bindFramebuffer(I.READ_FRAMEBUFFER,bt.__webglFramebuffer),_.bindFramebuffer(I.DRAW_FRAMEBUFFER,jn.__webglFramebuffer);for(let Ii=0;Ii<ke;Ii++)Di&&(I.framebufferTextureLayer(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,V.get(T).__webglTexture,Z,lt+Ii),I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,V.get(X).__webglTexture,Pe,wt+Ii)),I.blitFramebuffer(Ge,st,Ne,Ce,Ve,xt,Ne,Ce,I.DEPTH_BUFFER_BIT,I.NEAREST);_.bindFramebuffer(I.READ_FRAMEBUFFER,null),_.bindFramebuffer(I.DRAW_FRAMEBUFFER,null)}else if(Z!==0||T.isRenderTargetTexture||V.has(T)){const Rt=V.get(T),$n=V.get(X);_.bindFramebuffer(I.READ_FRAMEBUFFER,D),_.bindFramebuffer(I.DRAW_FRAMEBUFFER,N);for(let bt=0;bt<ke;bt++)Di?I.framebufferTextureLayer(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,Rt.__webglTexture,Z,lt+bt):I.framebufferTexture2D(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,Rt.__webglTexture,Z),St?I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,$n.__webglTexture,Pe,wt+bt):I.framebufferTexture2D(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,$n.__webglTexture,Pe),Z!==0?I.blitFramebuffer(Ge,st,Ne,Ce,Ve,xt,Ne,Ce,I.COLOR_BUFFER_BIT,I.NEAREST):St?I.copyTexSubImage3D(Ue,Pe,Ve,xt,wt+bt,Ge,st,Ne,Ce):I.copyTexSubImage2D(Ue,Pe,Ve,xt,Ge,st,Ne,Ce);_.bindFramebuffer(I.READ_FRAMEBUFFER,null),_.bindFramebuffer(I.DRAW_FRAMEBUFFER,null)}else St?T.isDataTexture||T.isData3DTexture?I.texSubImage3D(Ue,Pe,Ve,xt,wt,Ne,Ce,ke,Mt,Wt,Et.data):X.isCompressedArrayTexture?I.compressedTexSubImage3D(Ue,Pe,Ve,xt,wt,Ne,Ce,ke,Mt,Et.data):I.texSubImage3D(Ue,Pe,Ve,xt,wt,Ne,Ce,ke,Mt,Wt,Et):T.isDataTexture?I.texSubImage2D(I.TEXTURE_2D,Pe,Ve,xt,Ne,Ce,Mt,Wt,Et.data):T.isCompressedTexture?I.compressedTexSubImage2D(I.TEXTURE_2D,Pe,Ve,xt,Et.width,Et.height,Mt,Et.data):I.texSubImage2D(I.TEXTURE_2D,Pe,Ve,xt,Ne,Ce,Mt,Wt,Et);_.pixelStorei(I.UNPACK_ROW_LENGTH,nn),_.pixelStorei(I.UNPACK_IMAGE_HEIGHT,pt),_.pixelStorei(I.UNPACK_SKIP_PIXELS,ln),_.pixelStorei(I.UNPACK_SKIP_ROWS,Tn),_.pixelStorei(I.UNPACK_SKIP_IMAGES,Zn),Pe===0&&X.generateMipmaps&&I.generateMipmap(Ue),_.unbindTexture()},this.initRenderTarget=function(T){V.get(T).__webglFramebuffer===void 0&&q.setupRenderTarget(T)},this.initTexture=function(T){T.isCubeTexture?q.setTextureCube(T,0):T.isData3DTexture?q.setTexture3D(T,0):T.isDataArrayTexture||T.isCompressedArrayTexture?q.setTexture2DArray(T,0):q.setTexture2D(T,0),_.unbindTexture()},this.resetState=function(){k=0,W=0,$=null,_.reset(),we.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Mn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=ht._getDrawingBufferColorSpace(e),t.unpackColorSpace=ht._getUnpackColorSpace()}}const to=Object.freeze(Object.defineProperty({__proto__:null,ACESFilmicToneMapping:ra,AddEquation:si,AddOperation:Ac,AdditiveBlending:so,AgXToneMapping:wo,AlphaFormat:Uo,AlwaysCompare:Nc,AlwaysDepth:ms,AlwaysStencilFunc:lo,AmbientLight:jc,ArrayCamera:Qc,BackSide:jt,BasicDepthPacking:Rc,Box2:go,Box3:hi,BoxGeometry:fi,BufferAttribute:hn,BufferGeometry:on,ByteType:Po,Camera:Ma,CanvasTexture:fo,CineonToneMapping:To,ClampToEdgeWrapping:Rn,Color:Je,ColorManagement:ht,ConeGeometry:Ho,ConstantAlphaFactor:yc,ConstantColorFactor:Sc,Controls:tu,CubeCamera:Jc,CubeDepthTexture:Wc,CubeReflectionMapping:ui,CubeRefractionMapping:wi,CubeTexture:Go,CubeUVReflectionMapping:Lr,CullFaceBack:ro,CullFaceFront:ac,CullFaceNone:sc,CustomBlending:oc,CustomToneMapping:Ao,CylinderGeometry:Ir,Data3DTexture:zc,DataArrayTexture:ko,DataTexture:Hc,DepthFormat:Ln,DepthStencilFormat:oi,DepthTexture:Ri,DirectionalLight:po,DoubleSide:$t,DstAlphaFactor:gc,DstColorFactor:xc,EqualCompare:Dc,EqualDepth:_s,EquirectangularReflectionMapping:rs,EquirectangularRefractionMapping:ss,Euler:qn,EventDispatcher:Yn,ExternalTexture:Vo,Float32BufferAttribute:Yt,FloatType:vn,Fog:ma,FrontSide:Wn,Frustum:Dr,GLSL3:uo,GreaterCompare:Ic,GreaterDepth:vs,GreaterEqualCompare:ha,GreaterEqualDepth:xs,Group:_n,HalfFloatType:Pn,HemisphereLight:$c,ImageUtils:kc,IntType:sa,KeepStencilOp:vi,Layers:pa,LessCompare:Lc,LessDepth:gs,LessEqualCompare:da,LessEqualDepth:Ai,Light:va,LinearFilter:Gt,LinearMipmapLinearFilter:ai,LinearMipmapNearestFilter:as,LinearSRGBColorSpace:Ar,LinearToneMapping:yo,LinearTransfer:wr,MOUSE:ci,Material:sr,MathUtils:ea,Matrix2:Wo,Matrix3:je,Matrix4:_t,MaxEquation:dc,Mesh:tn,MeshBasicMaterial:Ji,MeshDepthMaterial:Kc,MeshDistanceMaterial:Zc,MeshStandardMaterial:ri,MinEquation:uc,MirroredRepeatWrapping:Ss,MixOperation:Tc,MultiplyBlending:oo,MultiplyOperation:bo,NearestFilter:kt,NearestMipmapLinearFilter:pr,NearestMipmapNearestFilter:wc,NeutralToneMapping:Ro,NeverCompare:Pc,NeverDepth:ps,NoBlending:Cn,NoColorSpace:Bn,NoToneMapping:Sn,NormalBlending:yi,NotEqualCompare:Uc,NotEqualDepth:Ms,Object3D:Bt,ObjectSpaceNormalMap:Cc,OneFactor:fc,OneMinusConstantAlphaFactor:Ec,OneMinusConstantColorFactor:bc,OneMinusDstAlphaFactor:_c,OneMinusDstColorFactor:vc,OneMinusSrcAlphaFactor:fs,OneMinusSrcColorFactor:mc,OrthographicCamera:Sa,PCFShadowMap:gr,PCFSoftShadowMap:So,PMREMGenerator:_o,PerspectiveCamera:an,Plane:kn,PlaneGeometry:Ci,Quaternion:Xn,R11_EAC_Format:Cs,RED_GREEN_RGTC2_Format:Tr,RED_RGTC1_Format:Zs,REVISION:ia,RG11_EAC_Format:Er,RGBAFormat:dn,RGBAIntegerFormat:ua,RGBA_ASTC_10x10_Format:Hs,RGBA_ASTC_10x5_Format:zs,RGBA_ASTC_10x6_Format:Gs,RGBA_ASTC_10x8_Format:Vs,RGBA_ASTC_12x10_Format:Ws,RGBA_ASTC_12x12_Format:Xs,RGBA_ASTC_4x4_Format:Ds,RGBA_ASTC_5x4_Format:Is,RGBA_ASTC_5x5_Format:Us,RGBA_ASTC_6x5_Format:Ns,RGBA_ASTC_6x6_Format:Fs,RGBA_ASTC_8x5_Format:Os,RGBA_ASTC_8x6_Format:ks,RGBA_ASTC_8x8_Format:Bs,RGBA_BPTC_Format:qs,RGBA_ETC2_EAC_Format:Rs,RGBA_PVRTC_2BPPV1_Format:Ts,RGBA_PVRTC_4BPPV1_Format:Es,RGBA_S3TC_DXT1_Format:xr,RGBA_S3TC_DXT3_Format:vr,RGBA_S3TC_DXT5_Format:Mr,RGBFormat:No,RGB_BPTC_SIGNED_Format:Ys,RGB_BPTC_UNSIGNED_Format:Ks,RGB_ETC1_Format:As,RGB_ETC2_Format:ws,RGB_PVRTC_2BPPV1_Format:ys,RGB_PVRTC_4BPPV1_Format:bs,RGB_S3TC_DXT1_Format:_r,RGFormat:di,RGIntegerFormat:ca,RawShaderMaterial:Yc,Ray:_a,Raycaster:eu,RedFormat:Fo,RedIntegerFormat:la,ReinhardToneMapping:Eo,RenderTarget:Bc,RepeatWrapping:yr,ReverseSubtractEquation:cc,SIGNED_R11_EAC_Format:Ps,SIGNED_RED_GREEN_RGTC2_Format:js,SIGNED_RED_RGTC1_Format:$s,SIGNED_RG11_EAC_Format:Ls,SRGBColorSpace:zt,SRGBTransfer:gt,Scene:Vc,ShaderChunk:ot,ShaderLib:xn,ShaderMaterial:En,ShortType:Lo,Source:fa,Sphere:ga,SphereGeometry:xa,Spherical:ta,SrcAlphaFactor:hs,SrcAlphaSaturateFactor:Mc,SrcColorFactor:pc,StaticDrawUsage:co,SubtractEquation:lc,SubtractiveBlending:ao,TOUCH:bi,TangentSpaceNormalMap:Js,Texture:Vt,Triangle:un,UVMapping:Co,Uint16BufferAttribute:Bo,Uint32BufferAttribute:zo,UniformsLib:Re,UniformsUtils:qc,UnsignedByteType:en,UnsignedInt101111Type:Io,UnsignedInt248Type:tr,UnsignedInt5999Type:Do,UnsignedIntType:yn,UnsignedShort4444Type:aa,UnsignedShort5551Type:oa,UnsignedShortType:er,VSMShadowMap:Zi,Vector2:He,Vector3:G,Vector4:mt,WebGLCoordinateSystem:Mn,WebGLCubeRenderTarget:Xo,WebGLRenderTarget:bn,WebGLRenderer:uu,WebGLUtils:lu,WebGPUCoordinateSystem:nr,WebXRController:os,ZeroFactor:hc,createCanvasElement:Fc,error:ft,log:ho,warn:Ke,warnOnce:Ei},Symbol.toStringTag,{value:"Module"})),It=4.6;function yg(n){const e=Qi.find(o=>o.id===n);if(!e)throw Error("Unknown robot");const[t,,i]=e.desk,r=["security","backup"].includes(n)?[[-4.8,0,i],[-4.8,0,0]]:["growth","growth-stats","instagram-admin"].includes(n)?[[t,0,8.8],[4.8,0,8.8],[4.8,0,2],[8.4,0,2],[8.4,0,0]]:["payments","support"].includes(n)?[[4.8,0,i],[4.8,0,2],[8.4,0,2],[8.4,0,0]]:n==="qa"?[[8.4,0,i],[8.4,0,0]]:i>0?[[t+1.2,0,i],[t+1.2,0,0]]:[[t,0,0]],s=[[t,0,i],...r,[-13.6,0,0],[-16.5,0,.7],[-16.5,0,0]];for(let o=0;o<2;o++){const c=o*It;s.push([-16.5,c+It/2,-4.2],[-16.5,c+It/2,-4.85],[-14.4,c+It/2,-4.85],[-14.4,c+It/2,-4.2],[-14.4,c+It,0],[-14.4,c+It,.7]),o===0&&s.push([-16.5,It,.7],[-16.5,It,0])}if(s.push([-13.6,2*It,.7],[-12.5,2*It,.6]),n==="health"||n==="release")s.push([-7.2,2*It,.6],[-7.2,2*It,3.4]),s.push(...n==="health"?[[-5.25,2*It,3.4]]:[[-10.4,2*It,3.4],[-10.4,2*It,5.5]]);else{const o=Qi.filter(d=>!["health","release"].includes(d.id)),c=o.findIndex(d=>d.id===n),l=Math.round((-11.7+c*23.4/(o.length-1))*100)/100;s.push([l,2*It,.6],[l,2*It,0])}const a=s.slice(1).map((o,c)=>Math.hypot(...o.map((l,d)=>l-s[c][d])));return{points:s,lengths:a,length:a.reduce((o,c)=>o+c,0)}}function Eg(n,e,t=1){let i=Math.max(0,Math.min(n.length,e)),r=0;for(;r<n.lengths.length-1&&i>n.lengths[r];)i-=n.lengths[r++];const s=n.points[r],a=n.points[r+1],o=i/n.lengths[r];return{position:e>=n.length?[...n.points.at(-1)]:s.map((c,l)=>c+(a[l]-c)*o),rotation:Math.atan2((a[0]-s[0])*t,(a[2]-s[2])*t)}}function Tg(n){const e=yg(n);let t=0,i=0,r=0,s=!1,a=!1,o=0,c=!1,l="waiting",d=0,h=!1;function u(M){const w=s&&M.lastAt>r;M.canRest&&M.lastAt&&(r=Math.max(r,M.lastAt)),c=M.canRest,c?w?(a=!0,o=4,i=0):a||(i=e.length):(i=0,a=!1,o=0),M.canRest&&(s=!0)}function m(M,{snap:w=!1,pause:g=!1}={}){h=g,w&&(a=!1,o=0,i=c?e.length:0,t=i);const f=i>=t?1:-1;!g&&!w&&(t+=f*Math.min(Math.abs(i-t),Math.max(0,Math.min(M,.25))*4),t===0&&a&&(o-=M,o<=0&&(a=!1,i=c?e.length:0)));const P=l;l=t!==i?i===0?"returning":"ascending":a?"reviewing":c?"resting":"waiting",w||l!=="resting"?d=0:P!=="resting"?d=6:g||(d=Math.max(0,d-M));const C=Eg(e,t,f);return l==="resting"&&(C.rotation=n==="health"?Math.PI:Math.PI/2),t===0&&(C.rotation=Math.PI),{...C,phase:l,paused:h,enjoying:!g&&d>0,active:!g&&(t!==i||a||d>0),moving:!g&&t!==i,level:t===e.length?2:Math.min(2,Math.floor((C.position[1]+.01)/It))}}return{update:u,step:m,route:e}}class Ag{constructor(){this.id=0,this.object=null,this.z=0,this.renderOrder=0}}class du{constructor(){this.id=0,this.v1=new Ti,this.v2=new Ti,this.v3=new Ti,this.normalModel=new G,this.vertexNormalsModel=[new G,new G,new G],this.vertexNormalsLength=0,this.color=new Je,this.material=null,this.uvs=[new He,new He,new He],this.z=0,this.renderOrder=0}}class Ti{constructor(){this.position=new G,this.positionWorld=new G,this.positionScreen=new mt,this.visible=!0}copy(e){this.positionWorld.copy(e.positionWorld),this.positionScreen.copy(e.positionScreen)}}class hu{constructor(){this.id=0,this.v1=new Ti,this.v2=new Ti,this.vertexColors=[new Je,new Je],this.material=null,this.z=0,this.renderOrder=0}}class fu{constructor(){this.id=0,this.object=null,this.x=0,this.y=0,this.z=0,this.rotation=0,this.scale=new He,this.material=null,this.renderOrder=0}}class wg{constructor(){let e,t,i=0,r,s,a=0,o,c,l=0,d,h,u=0,m,M,w=0,g,f=[],P=[];const C={objects:[],lights:[],elements:[]},S=new G,E=new mt,y=new hi(new G(-1,-1,-1),new G(1,1,1)),v=new hi,x=new Array(3),p=new _t,b=new _t,A=new _t,L=new Dr,B=[],D=[],N=[],k=[],W=[],$=[],re=new mt,me=new mt,be=new mt,_e=[],Be=[null,null,null],Ze=[{sign:1},{sign:-1}];function de(){const j=[],ce=[],pe=[];let ae=null;const Ae=new je;function I(H){ae=H,Ae.getNormalMatrix(ae.matrixWorld),j.length=0,ce.length=0,pe.length=0}function et(H){const Y=H.position,oe=H.positionWorld,xe=H.positionScreen;oe.copy(Y).applyMatrix4(g),xe.copy(oe).applyMatrix4(b);const ge=1/xe.w;xe.x*=ge,xe.y*=ge,xe.z*=ge,H.visible=xe.x>=-1&&xe.x<=1&&xe.y>=-1&&xe.y<=1&&xe.z>=-1&&xe.z<=1}function Le(H,Y,oe){r=ze(),r.position.set(H,Y,oe),et(r)}function R(H,Y,oe){j.push(H,Y,oe)}function _(H,Y,oe){ce.push(H,Y,oe)}function O(H,Y){pe.push(H,Y)}function V(H,Y,oe){return H.visible===!0||Y.visible===!0||oe.visible===!0?!0:(x[0]=H.positionScreen,x[1]=Y.positionScreen,x[2]=oe.positionScreen,y.intersectsBox(v.setFromPoints(x)))}function q(H,Y,oe){return(oe.positionScreen.x-H.positionScreen.x)*(Y.positionScreen.y-H.positionScreen.y)-(oe.positionScreen.y-H.positionScreen.y)*(Y.positionScreen.x-H.positionScreen.x)<0}function ue(H,Y){const oe=D[H],xe=D[Y];oe.positionScreen.copy(oe.position).applyMatrix4(A),xe.positionScreen.copy(xe.position).applyMatrix4(A),ye(oe.positionScreen,xe.positionScreen)===!0&&(oe.positionScreen.multiplyScalar(1/oe.positionScreen.w),xe.positionScreen.multiplyScalar(1/xe.positionScreen.w),d=Qe(),d.id=ae.id,d.v1.copy(oe),d.v2.copy(xe),d.z=Math.max(oe.positionScreen.z,xe.positionScreen.z),d.renderOrder=ae.renderOrder,d.material=ae.material,ae.material.vertexColors&&(d.vertexColors[0].fromArray(ce,H*3),d.vertexColors[1].fromArray(ce,Y*3)),C.elements.push(d))}function Q(H,Y,oe,xe){const ge=D[H],Me=D[Y],De=D[oe],Fe=ge.positionScreen.w,Xe=Me.positionScreen.w,F=De.positionScreen.w,Se=Fe*(ge.positionScreen.z+1),ie=Xe*(Me.positionScreen.z+1),Ee=F*(De.positionScreen.z+1),we=Fe*(1-ge.positionScreen.z),le=Xe*(1-Me.positionScreen.z),Oe=F*(1-De.positionScreen.z);if(Se<0&&ie<0&&Ee<0||we<0&&le<0&&Oe<0)return;if(Se>=0&&ie>=0&&Ee>=0&&we>=0&&le>=0&&Oe>=0){if(V(ge,Me,De)===!1)return;if(xe.side===$t||q(ge,Me,De)===!0){o=nt(),o.id=ae.id,o.v1.copy(ge),o.v2.copy(Me),o.v3.copy(De),o.z=(ge.positionScreen.z+Me.positionScreen.z+De.positionScreen.z)/3,o.renderOrder=ae.renderOrder,S.subVectors(De.position,Me.position),E.subVectors(ge.position,Me.position),S.cross(E),o.normalModel.copy(S),o.normalModel.applyMatrix3(Ae).normalize();for(let tt=0;tt<3;tt++){const at=o.vertexNormalsModel[tt];at.fromArray(j,arguments[tt]*3),at.applyMatrix3(Ae).normalize(),o.uvs[tt].fromArray(pe,arguments[tt]*2)}o.vertexNormalsLength=3,o.material=xe,xe.vertexColors&&o.color.fromArray(ce,H*3),C.elements.push(o)}return}re.set(ge.positionScreen.x*Fe,ge.positionScreen.y*Fe,ge.positionScreen.z*Fe,Fe),me.set(Me.positionScreen.x*Xe,Me.positionScreen.y*Xe,Me.positionScreen.z*Xe,Xe),be.set(De.positionScreen.x*F,De.positionScreen.y*F,De.positionScreen.z*F,F),Be[0]=re,Be[1]=me,Be[2]=be;const Ie=$e(Be);if(!(Ie<3)){for(let tt=0;tt<Ie;tt++){const at=f[tt];let yt=_e[tt];yt||(yt=new Ti,_e[tt]=yt);const Tt=1/at.w;yt.positionScreen.set(at.x*Tt,at.y*Tt,at.z*Tt,1),yt.positionWorld.copy(ge.positionWorld),yt.visible=!0}for(let tt=1;tt<Ie-1;tt++){const at=_e[0],yt=_e[tt],Tt=_e[tt+1];if(xe.side===$t||q(at,yt,Tt)===!0){o=nt(),o.id=ae.id,o.v1.copy(at),o.v2.copy(yt),o.v3.copy(Tt),o.z=(at.positionScreen.z+yt.positionScreen.z+Tt.positionScreen.z)/3,o.renderOrder=ae.renderOrder,S.subVectors(De.position,Me.position),E.subVectors(ge.position,Me.position),S.cross(E),o.normalModel.copy(S),o.normalModel.applyMatrix3(Ae).normalize();for(let fn=0;fn<3;fn++){const pi=o.vertexNormalsModel[fn];pi.fromArray(j,arguments[fn]*3),pi.applyMatrix3(Ae).normalize(),o.uvs[fn].fromArray(pe,arguments[fn]*2)}o.vertexNormalsLength=3,o.material=xe,xe.vertexColors&&o.color.fromArray(ce,H*3),C.elements.push(o)}}}}return{setObject:I,projectVertex:et,checkTriangleVisibility:V,checkBackfaceCulling:q,pushVertex:Le,pushNormal:R,pushColor:_,pushUv:O,pushLine:ue,pushTriangle:Q}}const z=new de;function ve(j){if(j.visible===!1)return;if(j.isLight)C.lights.push(j);else if(j.isMesh||j.isLine||j.isPoints){if(j.material.visible===!1||j.frustumCulled===!0&&L.intersectsObject(j)===!1)return;fe(j)}else if(j.isSprite){if(j.material.visible===!1||j.frustumCulled===!0&&L.intersectsSprite(j)===!1)return;fe(j)}const ce=j.children;for(let pe=0,ae=ce.length;pe<ae;pe++)ve(ce[pe])}function fe(j){e=Ye(),e.id=j.id,e.object=j,S.setFromMatrixPosition(j.matrixWorld),S.applyMatrix4(b),e.z=S.z,e.renderOrder=j.renderOrder,C.objects.push(e)}this.projectScene=function(j,ce,pe,ae){c=0,h=0,M=0,C.elements.length=0,j.matrixWorldAutoUpdate===!0&&j.updateMatrixWorld(),ce.parent===null&&ce.matrixWorldAutoUpdate===!0&&ce.updateMatrixWorld(),p.copy(ce.matrixWorldInverse),b.multiplyMatrices(ce.projectionMatrix,p),L.setFromProjectionMatrix(b),t=0,C.objects.length=0,C.lights.length=0,ve(j),pe===!0&&C.objects.sort(ct);const Ae=C.objects;for(let I=0,et=Ae.length;I<et;I++){const Le=Ae[I].object,R=Le.geometry;if(z.setObject(Le),g=Le.matrixWorld,s=0,Le.isMesh){let _=Le.material;const O=Array.isArray(_),V=R.attributes,q=R.groups;if(V.position===void 0)continue;const ue=V.position.array;for(let Q=0,H=ue.length;Q<H;Q+=3){let Y=ue[Q],oe=ue[Q+1],xe=ue[Q+2];const ge=R.morphAttributes.position;if(ge!==void 0){const Me=R.morphTargetsRelative,De=Le.morphTargetInfluences;for(let Fe=0,Xe=ge.length;Fe<Xe;Fe++){const F=De[Fe];if(F===0)continue;const Se=ge[Fe];Me?(Y+=Se.getX(Q/3)*F,oe+=Se.getY(Q/3)*F,xe+=Se.getZ(Q/3)*F):(Y+=(Se.getX(Q/3)-ue[Q])*F,oe+=(Se.getY(Q/3)-ue[Q+1])*F,xe+=(Se.getZ(Q/3)-ue[Q+2])*F)}}z.pushVertex(Y,oe,xe)}if(V.normal!==void 0){const Q=V.normal.array;for(let H=0,Y=Q.length;H<Y;H+=3)z.pushNormal(Q[H],Q[H+1],Q[H+2])}if(V.color!==void 0){const Q=V.color.array;for(let H=0,Y=Q.length;H<Y;H+=3)z.pushColor(Q[H],Q[H+1],Q[H+2])}if(V.uv!==void 0){const Q=V.uv.array;for(let H=0,Y=Q.length;H<Y;H+=2)z.pushUv(Q[H],Q[H+1])}if(R.index!==null){const Q=R.index.array;if(q.length>0)for(let H=0;H<q.length;H++){const Y=q[H];if(_=O===!0?Le.material[Y.materialIndex]:Le.material,_!==void 0)for(let oe=Y.start,xe=Y.start+Y.count;oe<xe;oe+=3)z.pushTriangle(Q[oe],Q[oe+1],Q[oe+2],_)}else for(let H=0,Y=Q.length;H<Y;H+=3)z.pushTriangle(Q[H],Q[H+1],Q[H+2],_)}else if(q.length>0)for(let Q=0;Q<q.length;Q++){const H=q[Q];if(_=O===!0?Le.material[H.materialIndex]:Le.material,_!==void 0)for(let Y=H.start,oe=H.start+H.count;Y<oe;Y+=3)z.pushTriangle(Y,Y+1,Y+2,_)}else for(let Q=0,H=ue.length/3;Q<H;Q+=3)z.pushTriangle(Q,Q+1,Q+2,_)}else if(Le.isLine){A.multiplyMatrices(b,g);const _=R.attributes;if(_.position!==void 0){const O=_.position.array;for(let V=0,q=O.length;V<q;V+=3)z.pushVertex(O[V],O[V+1],O[V+2]);if(_.color!==void 0){const V=_.color.array;for(let q=0,ue=V.length;q<ue;q+=3)z.pushColor(V[q],V[q+1],V[q+2])}if(R.index!==null){const V=R.index.array;for(let q=0,ue=V.length;q<ue;q+=2)z.pushLine(V[q],V[q+1])}else{const V=Le.isLineSegments?2:1;for(let q=0,ue=O.length/3-1;q<ue;q+=V)z.pushLine(q,q+1)}}}else if(Le.isPoints){A.multiplyMatrices(b,g);const _=R.attributes;if(_.position!==void 0){const O=_.position.array;for(let V=0,q=O.length;V<q;V+=3)E.set(O[V],O[V+1],O[V+2],1),E.applyMatrix4(A),We(E,Le,ce)}}else Le.isSprite&&(Le.modelViewMatrix.multiplyMatrices(ce.matrixWorldInverse,Le.matrixWorld),E.set(g.elements[12],g.elements[13],g.elements[14],1),E.applyMatrix4(b),We(E,Le,ce))}return ae===!0&&C.elements.sort(ct),C};function We(j,ce,pe){const ae=1/j.w;j.z*=ae,j.z>=-1&&j.z<=1&&(m=it(),m.id=ce.id,m.x=j.x*ae,m.y=j.y*ae,m.z=j.z,m.renderOrder=ce.renderOrder,m.object=ce,m.rotation=ce.rotation,m.scale.x=ce.scale.x*Math.abs(m.x-(j.x+pe.projectionMatrix.elements[0])/(j.w+pe.projectionMatrix.elements[12])),m.scale.y=ce.scale.y*Math.abs(m.y-(j.y+pe.projectionMatrix.elements[5])/(j.w+pe.projectionMatrix.elements[13])),m.material=ce.material,C.elements.push(m))}function Ye(){if(t===i){const j=new Ag;return B.push(j),i++,t++,j}return B[t++]}function ze(){if(s===a){const j=new Ti;return D.push(j),a++,s++,j}return D[s++]}function nt(){if(c===l){const j=new du;return N.push(j),l++,c++,j}return N[c++]}function Qe(){if(h===u){const j=new hu;return k.push(j),u++,h++,j}return k[h++]}function it(){if(M===w){const j=new fu;return W.push(j),w++,M++,j}return W[M++]}function ct(j,ce){return j.renderOrder!==ce.renderOrder?j.renderOrder-ce.renderOrder:j.z!==ce.z?ce.z-j.z:j.id!==ce.id?j.id-ce.id:0}function $e(j){f[0]=j[0],f[1]=j[1],f[2]=j[2];let ce=3,pe=0;for(let ae=0;ae<Ze.length;ae++){const Ae=Ze[ae];if(pe=0,ce===0)break;for(let et=0;et<ce;et++){const Le=f[et],R=f[(et+1)%ce],_=Ae.sign*Le.z+Le.w,O=Ae.sign*R.z+R.w,V=_>=0,q=O>=0;if(V&&q)P[pe++]=Le;else if(V&&!q){P[pe++]=Le;const ue=_/(_-O);let Q=$[pe];Q||(Q=new mt,$[pe]=Q),Q.lerpVectors(Le,R,ue),P[pe++]=Q}else if(!V&&q){const ue=_/(_-O);let Q=$[pe];Q||(Q=new mt,$[pe]=Q),Q.lerpVectors(Le,R,ue),P[pe++]=Q}}const I=f;f=P,P=I,ce=pe}return ce}function ye(j,ce){let pe=0,ae=1;const Ae=j.z+j.w,I=ce.z+ce.w,et=-j.z+j.w,Le=-ce.z+ce.w;return Ae>=0&&I>=0&&et>=0&&Le>=0?!0:Ae<0&&I<0||et<0&&Le<0?!1:(Ae<0?pe=Math.max(pe,Ae/(Ae-I)):I<0&&(ae=Math.min(ae,Ae/(Ae-I))),et<0?pe=Math.max(pe,et/(et-Le)):Le<0&&(ae=Math.min(ae,et/(et-Le))),ae<pe?!1:(j.lerp(ce,pe),ce.lerp(j,1-ae),!0))}}}class Rg{constructor(){let e,t,i,r,s,a,o,c,l,d,h,u=0,m=0,M=0,w=null,g=1,f,P;const C=this,S=new go,E=new go,y=new Je,v=new Je,x=new Je,p=new Je,b=new Je,A=new Je,L=new G,B=new G,D=new G,N=new je,k=new _t,W=new _t,$=[],re=[],me=[],be=new wg,_e=document.createElementNS("http://www.w3.org/2000/svg","svg");this.domElement=_e,this.autoClear=!0,this.sortObjects=!0,this.sortElements=!0,this.overdraw=.5,this.outputColorSpace=zt,this.info={render:{vertices:0,faces:0}},this.setQuality=function(ye){switch(ye){case"high":g=1;break;case"low":g=0;break}},this.setClearColor=function(ye){A.set(ye)},this.setPixelRatio=function(){},this.setSize=function(ye,j){r=ye,s=j,a=r/2,o=s/2,_e.setAttribute("viewBox",-a+" "+-o+" "+r+" "+s),_e.setAttribute("width",r),_e.setAttribute("height",s),S.min.set(-a,-o),S.max.set(a,o)},this.getSize=function(){return{width:r,height:s}},this.setPrecision=function(ye){w=ye};function Be(){for(u=0;_e.childNodes.length>0;)_e.removeChild(_e.childNodes[0])}function Ze(ye){return w!==null?ye.toFixed(w):ye}function de(ye,j){const ce=ye.data.renderOrder!==void 0?ye.data.renderOrder:0,pe=j.data.renderOrder!==void 0?j.data.renderOrder:0;if(ce!==pe)return ce-pe;{const ae=ye.data.z!==void 0?ye.data.z:0;return(j.data.z!==void 0?j.data.z:0)-ae}}this.clear=function(){Be(),_e.style.backgroundColor=A.getStyle(C.outputColorSpace)},this.render=function(ye,j){if(!(j instanceof Ma)){console.error("THREE.SVGRenderer.render: camera is not an instance of Camera.");return}const ce=ye.background;ce&&ce.isColor?(Be(),_e.style.backgroundColor=ce.getStyle(C.outputColorSpace)):this.autoClear===!0&&this.clear(),C.info.render.vertices=0,C.info.render.faces=0,k.copy(j.matrixWorldInverse),W.multiplyMatrices(j.projectionMatrix,k),e=be.projectScene(ye,j,this.sortObjects,this.sortElements),t=e.elements,i=e.lights,N.getNormalMatrix(j.matrixWorldInverse),z(i),M=0;for(let pe=0,ae=t.length;pe<ae;pe++){const Ae=t[pe],I=Ae.material;I===void 0||I.opacity===0||$e(M++,"element",Ae,I)}m=0,ye.traverseVisible(function(pe){if(pe.isSVGObject){if(L.setFromMatrixPosition(pe.matrixWorld),L.applyMatrix4(W),L.z<-1||L.z>1)return;const ae=L.x*a,Ae=-L.y*o,I=ct(m++);I.node=pe.node,I.x=ae,I.y=Ae,I.z=L.z,I.renderOrder=pe.renderOrder,$e(M++,"svgObject",I,null)}}),me.length=M,this.sortElements&&m>0&&me.sort(de),f="",P="";for(let pe=0;pe<M;pe++){const ae=me[pe];if(ae.type==="svgObject"){Qe();const Ae=ae.data,I=Ae.node;I.setAttribute("transform","translate("+Ae.x+","+Ae.y+")"),_e.appendChild(I)}else{const Ae=ae.data,I=ae.material;E.makeEmpty(),Ae instanceof fu?(c=Ae,c.x*=a,c.y*=-o,fe(c,Ae,I)):Ae instanceof hu?(c=Ae.v1,l=Ae.v2,c.positionScreen.x*=a,c.positionScreen.y*=-o,l.positionScreen.x*=a,l.positionScreen.y*=-o,E.setFromPoints([c.positionScreen,l.positionScreen]),S.intersectsBox(E)===!0&&We(c,l,I)):Ae instanceof du&&(c=Ae.v1,l=Ae.v2,d=Ae.v3,c.positionScreen.x*=a,c.positionScreen.y*=-o,l.positionScreen.x*=a,l.positionScreen.y*=-o,d.positionScreen.x*=a,d.positionScreen.y*=-o,this.overdraw>0&&(ze(c.positionScreen,l.positionScreen,this.overdraw),ze(l.positionScreen,d.positionScreen,this.overdraw),ze(d.positionScreen,c.positionScreen,this.overdraw)),E.setFromPoints([c.positionScreen,l.positionScreen,d.positionScreen]),S.intersectsBox(E)===!0&&Ye(c,l,d,Ae,I))}}Qe()};function z(ye){x.setRGB(0,0,0),p.setRGB(0,0,0),b.setRGB(0,0,0);for(let j=0,ce=ye.length;j<ce;j++){const pe=ye[j],ae=pe.color;pe.isAmbientLight?(x.r+=ae.r,x.g+=ae.g,x.b+=ae.b):pe.isDirectionalLight?(p.r+=ae.r,p.g+=ae.g,p.b+=ae.b):pe.isPointLight&&(b.r+=ae.r,b.g+=ae.g,b.b+=ae.b)}}function ve(ye,j,ce,pe){for(let ae=0,Ae=ye.length;ae<Ae;ae++){const I=ye[ae],et=I.color;if(I.isDirectionalLight){const Le=L.setFromMatrixPosition(I.matrixWorld).normalize();let R=ce.dot(Le);if(R<=0)continue;R*=I.intensity,pe.r+=et.r*R,pe.g+=et.g*R,pe.b+=et.b*R}else if(I.isPointLight){const Le=L.setFromMatrixPosition(I.matrixWorld);let R=ce.dot(L.subVectors(Le,j).normalize());if(R<=0||(R*=I.distance==0?1:1-Math.min(j.distanceTo(Le)/I.distance,1),R==0))continue;R*=I.intensity,pe.r+=et.r*R,pe.g+=et.g*R,pe.b+=et.b*R}}}function fe(ye,j,ce){let pe=j.scale.x*a,ae=j.scale.y*o;ce.isPointsMaterial&&(pe*=ce.size,ae*=ce.size);const Ae="M"+Ze(ye.x-pe*.5)+","+Ze(ye.y-ae*.5)+"h"+Ze(pe)+"v"+Ze(ae)+"h"+Ze(-pe)+"z";let I="";(ce.isSpriteMaterial||ce.isPointsMaterial)&&(I="fill:"+ce.color.getStyle(C.outputColorSpace)+";fill-opacity:"+ce.opacity),nt(I,Ae)}function We(ye,j,ce){const pe="M"+Ze(ye.positionScreen.x)+","+Ze(ye.positionScreen.y)+"L"+Ze(j.positionScreen.x)+","+Ze(j.positionScreen.y);if(ce.isLineBasicMaterial){let ae="fill:none;stroke:"+ce.color.getStyle(C.outputColorSpace)+";stroke-opacity:"+ce.opacity+";stroke-width:"+ce.linewidth+";stroke-linecap:"+ce.linecap;ce.isLineDashedMaterial&&(ae=ae+";stroke-dasharray:"+ce.dashSize+","+ce.gapSize),nt(ae,pe)}}function Ye(ye,j,ce,pe,ae){C.info.render.vertices+=3,C.info.render.faces++;const Ae="M"+Ze(ye.positionScreen.x)+","+Ze(ye.positionScreen.y)+"L"+Ze(j.positionScreen.x)+","+Ze(j.positionScreen.y)+"L"+Ze(ce.positionScreen.x)+","+Ze(ce.positionScreen.y)+"z";let I="";ae.isMeshBasicMaterial?(y.copy(ae.color),ae.vertexColors&&y.multiply(pe.color)):ae.isMeshLambertMaterial||ae.isMeshPhongMaterial||ae.isMeshStandardMaterial?(v.copy(ae.color),ae.vertexColors&&v.multiply(pe.color),y.copy(x),B.copy(ye.positionWorld).add(j.positionWorld).add(ce.positionWorld).divideScalar(3),ve(i,B,pe.normalModel,y),y.multiply(v).add(ae.emissive)):ae.isMeshNormalMaterial&&(D.copy(pe.normalModel).applyMatrix3(N).normalize(),y.setRGB(D.x,D.y,D.z).multiplyScalar(.5).addScalar(.5)),ae.wireframe?I="fill:none;stroke:"+y.getStyle(C.outputColorSpace)+";stroke-opacity:"+ae.opacity+";stroke-width:"+ae.wireframeLinewidth+";stroke-linecap:"+ae.wireframeLinecap+";stroke-linejoin:"+ae.wireframeLinejoin:I="fill:"+y.getStyle(C.outputColorSpace)+";fill-opacity:"+ae.opacity,nt(I,Ae)}function ze(ye,j,ce){let pe=j.x-ye.x,ae=j.y-ye.y;const Ae=pe*pe+ae*ae;if(Ae===0)return;const I=ce/Math.sqrt(Ae);pe*=I,ae*=I,j.x+=pe,j.y+=ae,ye.x-=pe,ye.y-=ae}function nt(ye,j){P===ye?f+=j:(Qe(),P=ye,f=j)}function Qe(){f&&(h=it(u++),h.setAttribute("d",f),h.setAttribute("style",P),_e.appendChild(h)),f="",P=""}function it(ye){let j=$[ye];return j===void 0&&(j=document.createElementNS("http://www.w3.org/2000/svg","path"),g==0&&j.setAttribute("shape-rendering","crispEdges"),$[ye]=j),j}function ct(ye){let j=re[ye];return j===void 0&&(j={node:null,x:0,y:0,z:0,renderOrder:0},re[ye]=j),j}function $e(ye,j,ce,pe){let ae=me[ye];return ae===void 0?(ae={type:j,data:ce,material:pe},me[ye]=ae,ae):(ae.type=j,ae.data=ce,ae.material=pe,ae)}}}const $l={type:"change"},qo={type:"start"},pu={type:"end"},ns=new _a,jl=new kn,Cg=Math.cos(70*ea.DEG2RAD),Dt=new G,Qt=2*Math.PI,vt={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},no=1e-6;class Pg extends tu{constructor(e,t=null){super(e,t),this.state=vt.NONE,this.target=new G,this.cursor=new G,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:ci.ROTATE,MIDDLE:ci.DOLLY,RIGHT:ci.PAN},this.touches={ONE:bi.ROTATE,TWO:bi.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new G,this._lastQuaternion=new Xn,this._lastTargetPosition=new G,this._quat=new Xn().setFromUnitVectors(e.up,new G(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new ta,this._sphericalDelta=new ta,this._scale=1,this._panOffset=new G,this._rotateStart=new He,this._rotateEnd=new He,this._rotateDelta=new He,this._panStart=new He,this._panEnd=new He,this._panDelta=new He,this._dollyStart=new He,this._dollyEnd=new He,this._dollyDelta=new He,this._dollyDirection=new G,this._mouse=new He,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=Dg.bind(this),this._onPointerDown=Lg.bind(this),this._onPointerUp=Ig.bind(this),this._onContextMenu=zg.bind(this),this._onMouseWheel=Fg.bind(this),this._onKeyDown=Og.bind(this),this._onTouchStart=kg.bind(this),this._onTouchMove=Bg.bind(this),this._onMouseDown=Ug.bind(this),this._onMouseMove=Ng.bind(this),this._interceptControlDown=Gg.bind(this),this._interceptControlUp=Vg.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(e){this._cursorStyle=e,e==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction=""}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent($l),this.update(),this.state=vt.NONE}pan(e,t){this._pan(e,t),this.update()}dollyIn(e){this._dollyIn(e),this.update()}dollyOut(e){this._dollyOut(e),this.update()}rotateLeft(e){this._rotateLeft(e),this.update()}rotateUp(e){this._rotateUp(e),this.update()}update(e=null){const t=this.object.position;Dt.copy(t).sub(this.target),Dt.applyQuaternion(this._quat),this._spherical.setFromVector3(Dt),this.autoRotate&&this.state===vt.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let i=this.minAzimuthAngle,r=this.maxAzimuthAngle;isFinite(i)&&isFinite(r)&&(i<-Math.PI?i+=Qt:i>Math.PI&&(i-=Qt),r<-Math.PI?r+=Qt:r>Math.PI&&(r-=Qt),i<=r?this._spherical.theta=Math.max(i,Math.min(r,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(i+r)/2?Math.max(i,this._spherical.theta):Math.min(r,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let s=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const a=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),s=a!=this._spherical.radius}if(Dt.setFromSpherical(this._spherical),Dt.applyQuaternion(this._quatInverse),t.copy(this.target).add(Dt),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let a=null;if(this.object.isPerspectiveCamera){const o=Dt.length();a=this._clampDistance(o*this._scale);const c=o-a;this.object.position.addScaledVector(this._dollyDirection,c),this.object.updateMatrixWorld(),s=!!c}else if(this.object.isOrthographicCamera){const o=new G(this._mouse.x,this._mouse.y,0);o.unproject(this.object);const c=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),s=c!==this.object.zoom;const l=new G(this._mouse.x,this._mouse.y,0);l.unproject(this.object),this.object.position.sub(l).add(o),this.object.updateMatrixWorld(),a=Dt.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;a!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(a).add(this.object.position):(ns.origin.copy(this.object.position),ns.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(ns.direction))<Cg?this.object.lookAt(this.target):(jl.setFromNormalAndCoplanarPoint(this.object.up,this.target),ns.intersectPlane(jl,this.target))))}else if(this.object.isOrthographicCamera){const a=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),a!==this.object.zoom&&(this.object.updateProjectionMatrix(),s=!0)}return this._scale=1,this._performCursorZoom=!1,s||this._lastPosition.distanceToSquared(this.object.position)>no||8*(1-this._lastQuaternion.dot(this.object.quaternion))>no||this._lastTargetPosition.distanceToSquared(this.target)>no?(this.dispatchEvent($l),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?Qt/60*this.autoRotateSpeed*e:Qt/60/60*this.autoRotateSpeed}_getZoomScale(e){const t=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){Dt.setFromMatrixColumn(t,0),Dt.multiplyScalar(-e),this._panOffset.add(Dt)}_panUp(e,t){this.screenSpacePanning===!0?Dt.setFromMatrixColumn(t,1):(Dt.setFromMatrixColumn(t,0),Dt.crossVectors(this.object.up,Dt)),Dt.multiplyScalar(e),this._panOffset.add(Dt)}_pan(e,t){const i=this.domElement;if(this.object.isPerspectiveCamera){const r=this.object.position;Dt.copy(r).sub(this.target);let s=Dt.length();s*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*s/i.clientHeight,this.object.matrix),this._panUp(2*t*s/i.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/i.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/i.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const i=this.domElement.getBoundingClientRect(),r=e-i.left,s=t-i.top,a=i.width,o=i.height;this._mouse.x=r/a*2-1,this._mouse.y=-(s/o)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(Qt*this._rotateDelta.x/t.clientHeight),this._rotateUp(Qt*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(Qt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-Qt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(Qt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-Qt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),r=.5*(e.pageY+t.y);this._rotateStart.set(i,r)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),r=.5*(e.pageY+t.y);this._panStart.set(i,r)}}_handleTouchStartDolly(e){const t=this._getSecondPointerPosition(e),i=e.pageX-t.x,r=e.pageY-t.y,s=Math.sqrt(i*i+r*r);this._dollyStart.set(0,s)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{const i=this._getSecondPointerPosition(e),r=.5*(e.pageX+i.x),s=.5*(e.pageY+i.y);this._rotateEnd.set(r,s)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(Qt*this._rotateDelta.x/t.clientHeight),this._rotateUp(Qt*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),r=.5*(e.pageY+t.y);this._panEnd.set(i,r)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){const t=this._getSecondPointerPosition(e),i=e.pageX-t.x,r=e.pageY-t.y,s=Math.sqrt(i*i+r*r);this._dollyEnd.set(0,s),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const a=(e.pageX+t.x)*.5,o=(e.pageY+t.y)*.5;this._updateZoomParameters(a,o)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new He,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){const t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){const t=e.deltaMode,i={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:i.deltaY*=16;break;case 2:i.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(i.deltaY*=10),i}}function Lg(n){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(n.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(n)&&(this._addPointer(n),n.pointerType==="touch"?this._onTouchStart(n):this._onMouseDown(n),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function Dg(n){this.enabled!==!1&&(n.pointerType==="touch"?this._onTouchMove(n):this._onMouseMove(n))}function Ig(n){switch(this._removePointer(n),this._pointers.length){case 0:this.domElement.releasePointerCapture(n.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(pu),this.state=vt.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:const e=this._pointers[0],t=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:t.x,pageY:t.y});break}}function Ug(n){let e;switch(n.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case ci.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(n),this.state=vt.DOLLY;break;case ci.ROTATE:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=vt.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=vt.ROTATE}break;case ci.PAN:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=vt.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=vt.PAN}break;default:this.state=vt.NONE}this.state!==vt.NONE&&this.dispatchEvent(qo)}function Ng(n){switch(this.state){case vt.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(n);break;case vt.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(n);break;case vt.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(n);break}}function Fg(n){this.enabled===!1||this.enableZoom===!1||this.state!==vt.NONE||(n.preventDefault(),this.dispatchEvent(qo),this._handleMouseWheel(this._customWheelEvent(n)),this.dispatchEvent(pu))}function Og(n){this.enabled!==!1&&this._handleKeyDown(n)}function kg(n){switch(this._trackPointer(n),this._pointers.length){case 1:switch(this.touches.ONE){case bi.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(n),this.state=vt.TOUCH_ROTATE;break;case bi.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(n),this.state=vt.TOUCH_PAN;break;default:this.state=vt.NONE}break;case 2:switch(this.touches.TWO){case bi.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(n),this.state=vt.TOUCH_DOLLY_PAN;break;case bi.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(n),this.state=vt.TOUCH_DOLLY_ROTATE;break;default:this.state=vt.NONE}break;default:this.state=vt.NONE}this.state!==vt.NONE&&this.dispatchEvent(qo)}function Bg(n){switch(this._trackPointer(n),this.state){case vt.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(n),this.update();break;case vt.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(n),this.update();break;case vt.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(n),this.update();break;case vt.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(n),this.update();break;default:this.state=vt.NONE}}function zg(n){this.enabled!==!1&&n.preventDefault()}function Gg(n){n.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function Vg(n){n.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function Hg(n,e=!1){const t=n[0].index!==null,i=new Set(Object.keys(n[0].attributes)),r=new Set(Object.keys(n[0].morphAttributes)),s={},a={},o=n[0].morphTargetsRelative,c=new on;let l=0;for(let d=0;d<n.length;++d){const h=n[d];let u=0;if(t!==(h.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+d+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const m in h.attributes){if(!i.has(m))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+d+'. All geometries must have compatible attributes; make sure "'+m+'" attribute exists among all geometries, or in none of them.'),null;s[m]===void 0&&(s[m]=[]),s[m].push(h.attributes[m]),u++}if(u!==i.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+d+". Make sure all geometries have the same number of attributes."),null;if(o!==h.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+d+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const m in h.morphAttributes){if(!r.has(m))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+d+".  .morphAttributes must be consistent throughout all geometries."),null;a[m]===void 0&&(a[m]=[]),a[m].push(h.morphAttributes[m])}if(e){let m;if(t)m=h.index.count;else if(h.attributes.position!==void 0)m=h.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+d+". The geometry must have either an index or a position attribute"),null;c.addGroup(l,m,d),l+=m}}if(t){let d=0;const h=[];for(let u=0;u<n.length;++u){const m=n[u].index;for(let M=0;M<m.count;++M)h.push(m.getX(M)+d);d+=n[u].attributes.position.count}c.setIndex(h)}for(const d in s){const h=Jl(s[d]);if(!h)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+d+" attribute."),null;c.setAttribute(d,h)}for(const d in a){const h=a[d][0].length;if(h!==0){c.morphAttributes=c.morphAttributes||{},c.morphAttributes[d]=[];for(let u=0;u<h;++u){const m=[];for(let w=0;w<a[d].length;++w)m.push(a[d][w][u]);const M=Jl(m);if(!M)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+d+" morphAttribute."),null;c.morphAttributes[d].push(M)}}}return c}function Jl(n){let e,t,i,r=-1,s=0;for(let l=0;l<n.length;++l){const d=n[l];if(e===void 0&&(e=d.array.constructor),e!==d.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(t===void 0&&(t=d.itemSize),t!==d.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(i===void 0&&(i=d.normalized),i!==d.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(r===-1&&(r=d.gpuType),r!==d.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;s+=d.count*t}const a=new e(s),o=new hn(a,t,i);let c=0;for(let l=0;l<n.length;++l){const d=n[l];if(d.isInterleavedBufferAttribute){const h=c/t;for(let u=0,m=d.count;u<m;u++)for(let M=0;M<t;M++){const w=d.getComponent(u,M);o.setComponent(u+h,M,w)}}else a.set(d.array,c);c+=d.count*t}return r!==void 0&&(o.gpuType=r),o}function Wg(n,{T:e,m:t,box:i,cyl:r,orb:s,group:a,sofa:o,plant:c,partition:l,windowWall:d,label:h,software:u}){const m=new e.MeshStandardMaterial({color:"#255f52",roughness:.95}),M=new e.MeshStandardMaterial({color:"#694954",roughness:.9}),w=new e.MeshStandardMaterial({color:"#2babb8",emissive:"#0e6875",emissiveIntensity:.22,roughness:.17,metalness:.18}),g=new e.MeshStandardMaterial({color:"#b3d5cc",roughness:.4}),f=new e.MeshStandardMaterial({color:"#92d6d3",emissive:"#3e989e",emissiveIntensity:.12,roughness:.2});function P(p,b,A,L=.035,B=t.brass){const D=new e.Vector3(...b),N=new e.Vector3(...A),k=r(p,0,0,0,L,D.distanceTo(N),B);return k.position.copy(D).add(N).multiplyScalar(.5),k.quaternion.setFromUnitVectors(new e.Vector3(0,1,0),N.sub(D).normalize()),k}i(n,-7.2,.08,-4.6,9.8,.06,7.3,M),i(n,-7.6,.21,-7.1,5.2,.33,1.9,t.darkWood),i(n,-7.6,.41,-6.18,5.2,.025,.035,t.warm),i(n,-7.7,2.05,-8.73,4.5,1.85,.16,t.frame),i(n,-7.7,2.05,-8.62,4.26,1.62,.035,t.screen);for(let p=0;p<12;p++)i(n,-9.35+p*.3,1.8,-8.59,.14,.2+(.5+.5*Math.sin(p*1.4))*.7,.015,p%3===0?t.warm:t.cyan);for(const p of[-11.2,-4.2]){i(n,p,1.15,-7.7,.78,2,.7,t.rubber);for(const b of[.65,1.45]){const A=r(n,p,b,-7.32,.24,.06,t.charcoal);A.rotation.x=Math.PI/2}r(n,p,2.26,-7.7,.16,.12,t.brass)}for(const p of[-8.8,-6.3]){r(n,p,.43,-6.8,.26,.06,t.frame),r(n,p,1.04,-6.8,.025,1.2,t.brass);const b=r(n,p,1.7,-6.8,.07,.3,t.rubber);b.rotation.z=-.3}o(n,-7.8,-2.35,Math.PI,4.3),o(n,-11,-4.2,Math.PI/2,2.5),r(n,-7.8,.43,-4.25,.93,.13,t.darkWood),r(n,-7.8,.22,-4.25,.24,.4,t.frame),i(n,-7.7,.52,-4.3,.48,.04,.3,t.brass),c(n,-3.2,-2.1,1.1),l(n,-1.5,-4.6,6.9,Math.PI/2),h(n,"KARAOKE / SOUND LOUNGE",-7.5,.14,-1.35,5.9,.3,"#e4d7bc",null,!0),i(n,6.1,.08,-4.7,11.8,.06,7.1,t.rubber),i(n,7,1.83,-8.75,9,2.3,.055,t.glass);function C(p,b){const A=a(n,p,0,b);i(A,0,.27,0,1.4,.28,2.55,t.charcoal),i(A,0,.43,.1,1.04,.045,2.15,t.rubber);for(const L of[-1,1])P(A,[L*.62,.35,-.92],[L*.62,1.65,-.92],.045,t.frame),P(A,[L*.62,1.4,-.95],[L*.62,1.4,.35],.04,t.brass);i(A,0,1.6,-.94,1.35,.32,.3,t.frame),i(A,0,1.78,-.9,.55,.035,.22,t.cyan);for(let L=0;L<6;L++)i(A,0,.46,-.75+L*.33,.98,.009,.015,t.edge)}C(2.6,-6),C(5,-6);for(const p of[.6,1.1]){i(n,10.1,p,-7.1,3.1,.08,.55,t.frame);for(let b=0;b<5;b++){const A=8.95+b*.56;P(n,[A-.14,p+.17,-7.08],[A+.14,p+.17,-7.08],.035,t.brass);for(const L of[-1,1]){const B=r(n,A+L*.2,p+.17,-7.08,.13,.12,t.rubber);B.rotation.z=Math.PI/2}}}for(const p of[8.7,11.5])i(n,p,.6,-7.1,.07,1.2,.7,t.frame);i(n,8.8,.6,-3.9,.65,.18,2.1,t.charcoal);for(const p of[-4.6,-3.2])i(n,8.8,.3,p,.5,.6,.1,t.frame);P(n,[7.8,1.4,-4.8],[9.8,1.4,-4.8],.045,t.brass);for(const p of[7.9,9.7]){const b=r(n,p,1.4,-4.8,.27,.15,t.rubber);b.rotation.z=Math.PI/2,i(n,p,.75,-4.8,.07,1.5,.07,t.frame)}const S=a(n,3.5,0,-2.7),E=r(S,0,.48,0,.42,.22,t.charcoal);E.rotation.z=Math.PI/2,P(S,[0,.15,.7],[0,1.05,.45],.06,t.frame),P(S,[0,.1,-.65],[0,1.35,-.45],.05,t.frame),i(S,0,1.05,.45,.55,.12,.38,t.rubber),i(S,0,1.4,-.45,.8,.08,.07,t.brass),i(S,0,.1,0,1.2,.08,1.7,t.frame);for(const p of[6.1,10.9])i(n,p,.14,-2.3,.85,.05,1.8,t.rug);h(n,"MOVE / RESET / REPEAT",6,.15,-1.4,7,.3,"#c7d7cd",null,!0),i(n,6,.08,4.7,11.8,.06,7.2,t.darkWood);const y=i(n,6.4,.24,4.15,8.2,.36,4.8,g),v=i(n,6.4,.43,4.15,7.65,.025,4.25,w);u&&(y.renderOrder=-12,v.renderOrder=-10);for(const p of[1.73,6.57])i(n,6.4,.49,p,8.65,.17,.38,t.cream);for(const p of[2.24,10.56])i(n,p,.49,4.15,.38,.17,4.8,t.cream);for(let p=0;p<13;p++){const b=2.23+p*.29;for(let A=0;A<3;A++){const L=i(n,3.3+A*2.15+Math.sin(p*.9)*.18,.451,b,.8+Math.sin(p+A)*.35,.005,.018,f);u&&(L.renderOrder=-9),L.rotation.y=Math.sin(p*.6+A)*.08}}for(const p of[3.55,4.45])P(n,[1.7,.09,p],[1.7,1.17,p],.045,t.brass),P(n,[1.7,1.17,p],[2.9,1.17,p],.045,t.brass),P(n,[2.9,1.17,p],[2.9,.25,p],.045,t.brass);for(const p of[.3,.55,.8])P(n,[2.85,p,3.55],[2.85,p,4.45],.04,t.brass);for(const p of[4.1,7,9.9]){i(n,p,.36,7.65,1.1,.24,1.4,t.cream);const b=i(n,p,.67,7.02,1.1,.15,.8,t.cream);b.rotation.x=-.55;for(const A of[7.2,8.2])i(n,p,.13,A,.9,.24,.07,t.frame)}c(n,1,7.8,1.4),c(n,11.9,7.8,1.4),d(n,12.94,4.5,8.6,Math.PI/2,1.05),d(n,0,9,25.5,0,1.05),i(n,-7.2,.08,4.7,9.8,.06,7.2,t.rug),i(n,-7.9,.92,5.5,3.8,.28,2.2,t.darkWood),i(n,-7.9,1.07,5.5,3.35,.035,1.75,m);for(const p of[-9.3,-6.5])for(const b of[4.8,6.2])i(n,p,.45,b,.22,.9,.22,t.frame);for(const p of[-9.55,-7.9,-6.25])for(const b of[4.65,6.35])r(n,p,1.095,b,.09,.025,t.rubber);for(let p=0;p<6;p++)s(n,-7.4+p%3*.15,1.17,5.35+Math.floor(p/3)*.16,.075,.075,.075,[t.paper,t.brass,M][p%3]);s(n,-8.7,1.17,5.5,.075,.075,.075,t.white),P(n,[-9.1,1.15,6.5],[-6.5,1.15,6.5],.025,t.wood);function x(p,b,A){const L=a(n,p,0,b);i(L,0,.7,0,1.1,1.4,.9,t.charcoal),i(L,0,1.65,-.2,1.1,.9,.55,t.frame),i(L,0,1.65,.1,.88,.64,.035,A),i(L,0,2.22,-.14,1.2,.26,.68,t.darkWood),i(L,0,2.22,.22,1,.16,.02,t.warm),i(L,0,1.25,.35,1.15,.12,.55,t.wood),r(L,-.28,1.38,.35,.035,.18,t.frame),s(L,-.28,1.48,.35,.07,.07,.07,M);for(const B of[.1,.3])r(L,B,1.33,.4,.065,.03,t.brass);for(let B=0;B<3;B++)i(L,-.2+B*.2,1.65,.13,.1,.18+Math.sin(B)*.15,.02,t.warm)}x(-5.25,2.25,t.cyan),x(-3.75,2.25,M),o(n,-10.4,2.3,Math.PI,2.5),i(n,-10.4,.68,1.23,2.5,.07,.6,t.darkWood),i(n,-10.4,1.35,1.18,2.15,1.2,.1,t.frame),i(n,-10.4,1.35,1.24,1.98,1.02,.025,t.cyan),i(n,-9.5,.9,1.22,.23,.4,.3,t.rubber),l(n,-1.5,4.65,6.9,Math.PI/2),c(n,-11.6,7.7,1.4),h(n,"03   /   PLAY CLUB",0,-.22,9.63,6,.29,"#e2cfaa"),h(n,"MINI GAME LOUNGE",-7.2,.15,8,6,.3,"#e4d7bc",null,!0)}const zn=4.6;function Xg(n,{T:e,m:t,box:i,cyl:r,software:s},a){const l=zn/2,d=l/12,h=4.2;function u(M,w,g=.07,f=t.frame){const P=new e.Vector3(...M),C=new e.Vector3(...w),S=i(n,0,0,0,g,P.distanceTo(C),g,f);return S.position.copy(P).add(C).multiplyScalar(.5),S.quaternion.setFromUnitVectors(new e.Vector3(0,1,0),C.sub(P).normalize()),S}function m(M,w,g,f,P){const C=s?8:1;for(let S=0;S<C;S++){const E=S/C,y=(S+1)/C,v=e.MathUtils.lerp(w,f,E),x=e.MathUtils.lerp(w,f,y),p=e.MathUtils.lerp(g,P,E),b=e.MathUtils.lerp(g,P,y),A=new e.BufferGeometry;A.setAttribute("position",new e.Float32BufferAttribute([M,v,p,M,x,b,M,x+1.05,b,M,v,p,M,x+1.05,b,M,v+1.05,p],3)),A.computeVertexNormals();const L=new e.Mesh(A,t.stairGlass);n.add(L)}u([M,w+1.08,g],[M,f+1.08,P],.055,t.brass);for(let S=0;S<=4;S++){const E=S/4,y=e.MathUtils.lerp(w,f,E),v=e.MathUtils.lerp(g,P,E);u([M,y,v],[M,y+1.06,v],.035,t.frame)}}i(n,-15.275,-.11,.75,4.55,.3,1.6,t.charcoal),i(n,-15.275,.05,.75,4.55,.03,1.6,t.wood),i(n,-15.275,.025,1.58,4.55,.045,.06,t.brass),a===0&&(i(n,-15.275,-.3,-1.95,4.55,.6,7.1,t.charcoal),i(n,-15.275,.015,-1.95,4.55,.04,7.1,t.floor));for(const M of[-17.5,-13.12])for(const w of[-5.45,1.52]){const g=a<2?zn:1.2;i(n,M,g/2-.1,w,.13,g,.13,t.frame)}if(m(-17.55,.1,.05,.1,1.55),i(n,-15.275,.65,1.53,4.55,1.1,.035,t.stairGlass),i(n,-15.275,1.22,1.53,4.55,.055,.055,t.brass),a===2){i(n,-16.5,.65,-.04,1.9,1.1,.035,t.stairGlass),i(n,-16.5,1.22,-.04,1.9,.055,.055,t.brass);return}for(let M=0;M<2;M++){const w=M===0?-16.5:-14.4,g=M*l;for(let E=0;E<12;E++){const y=.05+g+(E+1)*d,v=M===0?-(E+.5)*h/12:-h+(E+.5)*h/12;i(n,w,y-.07,v,1.74,.14,h/12+.012,t.wood),i(n,w,y+.005,v+(M===0?.15:-.15),1.7,.012,.025,t.brass)}const f=M===0?0:-h,P=M===0?-h:0,C=.05+g,S=.05+g+l;for(const E of[-1,1])u([w+E*.62,C-.13,f],[w+E*.62,S-.13,P],.13,t.frame),m(w+E*.91,C+.06,f,S+.06,P)}i(n,-15.275,l-.055,-4.85,4.55,.21,1.3,t.charcoal),i(n,-15.275,l+.06,-4.85,4.55,.03,1.3,t.wood),i(n,-15.275,l+.65,-5.5,4.55,1.1,.035,t.stairGlass),i(n,-15.275,l+1.22,-5.5,4.55,.055,.055,t.brass);for(const M of[-17.55,-13.15])m(M,l+.1,-4.2,l+.1,-5.5);i(n,-15.275,zn-.11,.75,4.55,.3,1.6,t.charcoal),i(n,-15.275,zn+.05,.75,4.55,.03,1.6,t.wood)}function qg({T:n,software:e,compact:t}){const i=new n.Group;i.name="KIP coastal grounds";const r=(p,b=.88)=>new n.MeshStandardMaterial({color:p,roughness:b}),s={lawn:r("#748d61"),lawnLight:r("#8d9d70"),soil:r("#78654b"),sand:r("#eee7d1"),wetSand:r("#d9d1b1"),sea:r("#478d9e",.3),shallows:r("#77bdbb",.3),surf:r("#d5e8db"),road:r("#4c5554"),roadMark:r("#d6d3ba"),paving:r("#b5b4a0"),stone:r("#8a8b79"),dark:r("#283b34"),wood:r("#936e4c"),pine:r("#365c48"),pineLight:r("#4f7355"),leaf:r("#4a6845"),rose:r("#aa465a"),rosePink:r("#d58a8b"),roseCream:r("#e9c9b0"),mountainFar:r("#7f9b9d"),mountain:r("#6a8274"),mountainNear:r("#607459"),cream:r("#d9c9a8"),brass:r("#ae9060",.45),lamp:new n.MeshStandardMaterial({color:"#f5d6a0",emissive:"#ffd38b",emissiveIntensity:.6})},a={box:new n.BoxGeometry(1,1,1),cyl:new n.CylinderGeometry(1,1,1,10),cone:new n.ConeGeometry(1,1,9),orb:new n.SphereGeometry(1,6,4)};function o(p,b,A,L,B,D,N,k){const W=new n.Mesh(p,b);return W.position.set(A,L,B),W.scale.set(D,N,k),W.castShadow=!0,W.receiveShadow=!0,i.add(W),W}const c=(p,b,A,L,B,D,N=s.wood)=>o(a.box,N,p,b,A,L,B,D),l=(p,b,A,L,B,D=s.dark)=>o(a.cyl,D,p,b,A,L,B,L),d=(p,b,A,L,B,D,N)=>o(a.orb,N,p,b,A,L,B,D);function h(p,b,A,L,B,D,N){let k;return L>40||B>40?(k=new n.Mesh(new n.PlaneGeometry(L,B),D),k.rotation.x=-Math.PI/2,k.position.set(p,b,A),k.receiveShadow=!0,i.add(k)):k=c(p,b,A,L,.025,B,D),e&&(k.renderOrder=N),k.castShadow=!1,k}function u(p,b,A,L,B){const D=[],N=[];for(let $=0;$<p.length-1;$++){const re=p[$],me=p[$+1],be=b[$+1],_e=b[$];for(const Be of[re,me,be,re,be,_e])D.push(Be[0],A,Be[1]),N.push(Be[0]*.05,Be[1]*.05)}const k=new n.BufferGeometry;k.setAttribute("position",new n.Float32BufferAttribute(D,3)),k.setAttribute("uv",new n.Float32BufferAttribute(N,2)),k.setIndex(Array.from({length:k.attributes.position.count},($,re)=>re)),k.computeVertexNormals();const W=new n.Mesh(k,L);return W.receiveShadow=!0,e&&(W.renderOrder=B),i.add(W),W}function m(p,b,A,L,B,D,N,k=s.dark){const W=new n.Vector3(p,b,A),$=new n.Vector3(L,B,D),re=c(0,0,0,N,W.distanceTo($),N,k);return re.position.copy(W).add($).multiplyScalar(.5),re.quaternion.setFromUnitVectors(new n.Vector3(0,1,0),$.sub(W).normalize()),re}h(-112,-.73,80,270,290,s.lawn,-900),h(150,-.82,-5,260,420,s.sea,-920);const M=[],w=[],g=[],f=[],P=[];for(let p=-65;p<=210;p+=6.5){const b=34+Math.sin(p*.055)*3.2+Math.sin(p*.16)*.7;M.push([b,p]),w.push([b-1.8,p]),g.push([b+.7,p]),f.push([23+Math.sin(p*.05)*1.2,p]),P.push([b+10,p])}u(f,w,-.69,s.sand,-880),u(w,M,-.7,s.wetSand,-879),u(M,P,-.78,s.shallows,-910),u(M,g,-.72,s.surf,-878);for(let p=0;p<24;p++){const b=-34+p*3.5,A=42+Math.sin(b*.1)*2;h(A,-.735,b,.055,1.8,s.surf,-877)}for(let p=0;p<20;p++)h(49+p%5*5,-.75,-22+Math.floor(p/5)*12+p%3*2,.045,1.2+p%4,s.shallows,-876);h(-78,-.66,26,200,7,s.road,-860),h(-78,-.65,21.85,200,1.3,s.paving,-855),h(-78,-.65,30.15,200,1.3,s.paving,-855);for(let p=-173;p<=20;p+=5)h(p,-.635,26,2.4,.12,s.roadMark,-850);for(const p of[22.8,29.2])h(-78,-.635,p,200,.1,s.roadMark,-850);for(let p=0;p<7;p++)h(1.5,-.63,23.2+p*.85,3.6,.4,s.roadMark,-849);h(-2,-.62,14.8,8,14,s.paving,-845),h(-1.7,-.63,0,38,24,s.paving,-845);for(let p=-19;p<=16;p+=2)h(p,-.605,12.05,.025,3.2,s.stone,-840);h(-19.4,-.6,7.9,2,13,s.paving,-842),h(-10,-.6,13.6,20,2,s.paving,-842),c(-15.3,-.34,2.2,4.4,.3,.7,s.stone),c(-15.3,-.08,1.75,4.4,.22,.4,s.wood);function C(p,b,A,L){const B=Math.hypot(A-p,L-b),D=Math.ceil(B/3),N=Math.ceil(B/.45);m(p,-.08,b,A,-.08,L,.2,s.stone);for(const k of[.1,.85])m(p,k,b,A,k,L,.07,s.dark);for(let k=0;k<=N;k++){const W=k/N;c(p+(A-p)*W,.37,b+(L-b)*W,.055,1.12,.055,s.dark)}for(let k=0;k<=D;k++){const W=k/D,$=p+(A-p)*W,re=b+(L-b)*W;c($,.25,re,.25,1.7,.25,s.stone),c($,1.13,re,.31,.07,.31,s.brass)}}C(-25,19,-6,19),C(3,19,23,19),C(-25,-18,-25,19),C(-25,-18,23,-18),C(23,-18,23,3.4),C(23,7.6,23,19);for(const p of[-6,3])c(p,.65,19,.65,2.6,.65,s.dark),c(p,1.98,19,.72,.08,.72,s.brass);C(-5.8,19,-5.8,16.1),C(2.8,19,2.8,16.1),c(9.5,.7,19,7,.95,.2,s.dark),c(9.5,.75,19.13,6.5,.025,.02,s.brass);function S(p,b,A=5){l(p,A*.28-.65,b,.16,A*.6,s.wood);for(let L=0;L<3;L++){const B=A*(.56-L*.08),D=A*(.28-L*.055),N=A*(.39+L*.21)-.6;o(a.cone,L%2?s.pineLight:s.pine,p,N,b,D,B,D)}}for(const[p,b,A]of[[-22,-13,6],[-22,-5,5.4],[-22,3,5],[-22,11,5.8],[-15,-15,5.8],[-6,-15,6.5],[4,-15,5.8],[14,-15,6.3],[20,-11,5.6],[20,-3,4.8],[20,11,5.2],[-31,12,6.5],[-34,3,6],[-30,-10,7],[-34,-22,7],[-23,-25,6],[-12,-24,7.4],[1,-25,6.2],[16,-25,7.5],[27,-27,5.5]])S(p,b,A);function E(p,b,A,L,B){c(p,-.4,b,A,.5,L,s.stone),h(p,-.135,b,A-.2,L-.2,s.soil,-830);for(let D=0;D<B;D++){const N=p-A*.35+D%3*A*.35,k=b+(Math.floor(D/3)%2-.5)*L*.36;d(N,.03,k,.56,.3,.4,s.leaf);for(let W=0;W<3;W++){const $=N+Math.cos(W*2.1)*.29,re=k+Math.sin(W*2.1)*.24,me=.52+W%2*.15;l($,me/2,re,.018,me,s.leaf);const be=[s.rose,s.rosePink,s.roseCream][D%3];for(let _e=0;_e<5;_e++){const Be=_e*Math.PI*2/5;d($+Math.cos(Be)*.09,me,re+Math.sin(Be)*.09,.12,.075,.12,be)}d($,me+.04,re,.07,.07,.07,s.rose)}}}for(const p of[-14,-8,8,15])E(p,16,4.3,1.65,6);E(-22,15.8,2,3,3),E(20,16,2,3,3);function y(p,b,A=0){const L=new n.Group;i.add(L);const B=[];for(let D=0;D<4;D++)B.push(c(p,.03,b-.24+D*.16,2.7,.08,.12,s.wood));for(let D=0;D<3;D++)B.push(c(p,.43+D*.15,b-.34,2.7,.1,.08,s.wood));for(const D of[-1,1])B.push(c(p+D*1.06,-.27,b,.09,.6,.62,s.dark)),B.push(c(p+D*1.06,.3,b-.34,.06,1.05,.06,s.dark));for(const D of B)L.attach(D);L.position.set(p,0,b);for(const D of B)D.position.sub(L.position);L.rotation.y=A}y(-12,12.6,Math.PI),y(10,13,Math.PI),y(20,-.5,Math.PI/2);for(const[p,b]of[[-6.5,15],[4.1,15],[-24,7],[21,-8],[21,12],[-18,22],[13,22]])l(p,.95,b,.055,3.2,s.dark),c(p,2.57,b,.48,.13,.48,s.dark),c(p,2.47,b,.34,.12,.34,s.lamp);for(const p of[-4,0,4,8])l(p,-.1,11.3,.085,1,s.dark),l(p,.37,11.3,.1,.09,s.lamp);for(const p of[-20.5,-19.6])m(p,-.6,15,p,.2,15,.05,s.dark),m(p,.2,15,p,.2,16.5,.05,s.dark),m(p,.2,16.5,p,-.6,16.5,.05,s.dark);for(let p=16.5;p<=38;p+=.45)c(p,-.49,5.5,.39,.12,3.2,s.wood);c(37,-.58,5.5,5,.18,5,s.wood);for(const p of[3.4,7.6])for(const b of[35,38.8])l(b,-.43,p,.06,1.9,s.dark);for(const[p,b]of[[29,13],[30,-7]]){l(p,.65,b,.065,2.7,s.wood),o(a.cone,s.cream,p,2.15,b,2.4,.65,2.4);for(const A of[p-1.3,p+1.3]){c(A,-.27,b+.5,.85,.24,1.8,s.cream);const L=c(A,.05,b-.4,.85,.15,.8,s.cream);L.rotation.x=-.6}}for(const[p,b]of[[26,17],[25,-4],[28,-18],[30,23],[27,8],[31,-12]])for(let A=0;A<4;A++){const L=o(a.cone,s.lawnLight,p+A%2*.25,-.25,b+Math.floor(A/2)*.22,.12,.85,.12);L.rotation.z=(A-1.5)*.12}function v(p,b,A,L,B,D,N){const k=[],W=[],re=[p+A*.1*Math.sin(N),B-.7,b-L*.12],me=[],be=[];for(let de=0;de<13;de++){const z=de*Math.PI*2/13,ve=.86+.12*Math.sin(de*2.7+N);me.push([p+Math.cos(z)*A*ve,-.73,b+Math.sin(z)*L*ve]);const fe=.38+.13*Math.sin(de*1.8+N);be.push([p+Math.cos(z)*A*fe,B*(.32+.22*(.5+.5*Math.sin(de*2.3+N)))-.7,b+Math.sin(z)*L*fe])}const _e=(de,z,ve)=>{for(const fe of[de,z,ve])k.push(...fe),W.push(fe[0]*.025,fe[2]*.025)};for(let de=0;de<13;de++){const z=(de+1)%13;_e(me[de],be[de],be[z]),_e(me[de],be[z],me[z]),_e(be[de],re,be[z])}const Be=new n.BufferGeometry;Be.setAttribute("position",new n.Float32BufferAttribute(k,3)),Be.setAttribute("uv",new n.Float32BufferAttribute(W,2)),Be.setIndex(Array.from({length:Be.attributes.position.count},(de,z)=>z)),Be.computeVertexNormals();const Ze=new n.Mesh(Be,D);Ze.castShadow=!1,Ze.receiveShadow=!0,i.add(Ze)}for(const[p,b]of[-59,-34,-8,18].entries())v(b,-53-p%2*8,22,19,[17,25,23,16][p],s.mountainFar,p+2);for(const[p,b]of[-49,-22,5].entries())v(b,-36-p%2*4,18,13,[12,16,11][p],p%2?s.mountainNear:s.mountain,p+7);const x=Object.fromEntries(Object.entries(s).map(([p,b])=>[p,b.color.clone()]));return t(i),{root:i,setNight(p){const b={lawn:"#354f3c",lawnLight:"#526549",sand:"#a3aea0",wetSand:"#839385",road:"#293c40",paving:"#738178",stone:"#637569",pine:"#24493a",pineLight:"#345848",mountainFar:"#405d6b",mountain:"#3d5a53",mountainNear:"#314b43",sea:"#254c61",shallows:"#3d7178",surf:"#8cadb0"};for(const[A,L]of Object.entries(b))p?s[A].color.set(L):s[A].color.copy(x[A]);s.lamp.emissiveIntensity=p?2.4:.6}}}function Yg(n,{onPick:e,onAgentPick:t,onAgentMove:i,onError:r}){let s,a=!1;try{s=new uu({antialias:!0,alpha:!1,powerPreference:"low-power"})}catch{a=!0,s=new Rg,s.setPrecision(1),s.setQuality("high"),s.setPixelRatio=()=>{},s.shadowMap={},s.capabilities={getMaxAnisotropy:()=>1},s.dispose=()=>{}}s.setPixelRatio(Math.min(devicePixelRatio,1.5)),s.outputColorSpace=zt,s.toneMapping=ra,s.toneMappingExposure=1.13,s.shadowMap.enabled=!0,s.shadowMap.type=So,s.shadowMap.autoUpdate=!1,n.appendChild(s.domElement);const o=new Vc;o.background=new Je("#d8d9cd"),o.fog=new ma("#d8d9cd",70,130);const c=new an(33,1,.1,700),l=new Pg(c,s.domElement);l.enableDamping=!a,l.dampingFactor=.1,l.minDistance=10,l.maxDistance=420,l.minPolarAngle=.28,l.maxPolarAngle=1.34,l.enablePan=!1,l.zoomToCursor=!1,l.mouseButtons.RIGHT=ci.ROTATE;const d=new $c("#e9f4ff","#8d7860",2.5);o.add(d);const h=new po("#ffe5c3",3.2);h.position.set(-14,30,12),h.castShadow=!0,Object.assign(h.shadow.camera,{left:-22,right:22,top:23,bottom:-23,near:1,far:90}),h.shadow.mapSize.set(2048,2048),h.shadow.normalBias=.035,h.shadow.bias=-2e-4,h.shadow.radius=3,o.add(h);const u=new po("#e3eaff",1.1),m=new jc("#cfd5bb",a?.65:0);o.add(m),a&&(h.intensity=.72,u.intensity=.3),u.position.set(20,10,-15),o.add(u);const M=new fi(1,1,1),w=new Ir(1,1,1,16),g=new xa(1,10,6),f=document.createElement("canvas");f.width=128,f.height=512;const P=f.getContext("2d");let C=2026;const S=()=>(C=C*1664525+1013904223>>>0,C/4294967296);P.fillStyle="#936b48",P.fillRect(0,0,128,512);for(let U=0;U<230;U++){P.strokeStyle=`rgba(${U%3?48:225},${U%3?30:184},${U%3?20:130},${S()*.23+.025})`,P.lineWidth=S()*1.3+.2,P.beginPath();const ee=S()*128;P.moveTo(ee,0);for(let te=0;te<=512;te+=25)P.lineTo(ee+Math.sin(te*.018+U)*1.8,te);P.stroke()}const E=new fo(f);E.colorSpace=zt,E.wrapS=E.wrapT=yr,E.anisotropy=Math.min(4,s.capabilities.getMaxAnisotropy());const y=(U,ee=.75,te=0)=>new ri({color:U,roughness:ee,metalness:te}),v={wood:new ri({map:E,color:"#c89f7e",roughness:.68}),darkWood:new ri({map:E,color:"#886548",roughness:.8}),charcoal:y("#303b35"),frame:y("#24322d",.4,.28),floor:y("#b8b4a4"),edge:y("#454a40"),cream:y("#cec7b3"),paper:y("#ece5d5"),brass:y("#ad8c56",.4,.55),rubber:y("#1e2b27"),green:y("#375747"),greenLight:y("#6e8253"),pot:y("#b8af98"),rug:y("#777f69"),rug2:y("#a49476"),screen:y("#122a2b",.35),cyan:new ri({color:"#79c2bd",emissive:"#5aa9a3",emissiveIntensity:.4}),warm:new ri({color:"#f8d59a",emissive:"#ffcb77",emissiveIntensity:.7}),white:y("#e0e2d3"),glass:new ri({color:"#a5c4b7",transparent:!0,opacity:.16,roughness:.12,depthWrite:!1,side:$t}),skin:y("#c79369"),hair:y("#352b22"),shirt:y("#629893"),shirt2:y("#9f927f")};a&&(v.wood.color.set("#8f6749"),v.darkWood.color.set("#5a4434"),h.color.set("#fff5e8"),m.color.set("#e0e0d7")),v.stairGlass=new ri({color:"#9ecfce",transparent:!0,opacity:a?.28:.24,roughness:.12,depthWrite:!1,side:$t});const x=(U,ee,te,se,he)=>{const ne=new tn(U,ee);return ne.position.set(...te),ne.scale.set(...se),ne.castShadow=!ee.transparent,ne.receiveShadow=!ee.transparent,he.add(ne),ne},p=new Map,b=(U,ee,te,se,he,ne,Te,rt=v.wood)=>{let qe=M;if(a){const Ft=[he,ne,Te].map(Jt=>Math.max(1,Math.ceil(Jt/1.5))),At=Ft.join(",");p.has(At)||p.set(At,new fi(1,1,1,...Ft)),qe=p.get(At)}const Pt=x(qe,rt,[ee,te,se],[he,ne,Te],U);return a&&te<.16&&(he>4||Te>4)&&ne<.7&&(Pt.renderOrder=-100+Math.round(te*500)),Pt},A=(U,ee,te,se,he,ne,Te=v.frame)=>x(w,Te,[ee,te,se],[he,ne,he],U),L=(U,ee,te,se,he,ne,Te,rt)=>x(g,rt,[ee,te,se],[he,ne,Te],U),B=(U,ee=0,te=0,se=0,he=0)=>{const ne=new _n;return ne.position.set(ee,te,se),ne.rotation.y=he,U.add(ne),ne},D=(U,ee,te,se,he,ne=3.8,Te=.42,rt="#e4d9ba",qe=null,Pt=!1)=>{if(a)return;const Ft=document.createElement("canvas");Ft.width=1024,Ft.height=128;const At=Ft.getContext("2d");qe&&(At.fillStyle=qe,At.fillRect(0,0,1024,128)),At.fillStyle=rt,At.font="500 49px Arial",At.textAlign="center",At.textBaseline="middle",At.fillText(ee,512,65,980);const Jt=new fo(Ft);Jt.colorSpace=zt;const Kn=new Ji({map:Jt,transparent:!0,depthWrite:!1,side:$t}),Ht=new tn(new Ci(ne,Te),Kn);return Ht.position.set(te,se,he),Pt&&(Ht.rotation.x=-Math.PI/2),U.add(Ht),Ht};function N(U,ee,te,se=1,he=0){const ne=B(U,ee,he,te);A(ne,0,.24*se,0,.29*se,.48*se,v.pot),A(ne,0,.48*se,0,.245*se,.025,v.darkWood),A(ne,0,.93*se,0,.032*se,.9*se,v.darkWood);for(let Te=0;Te<9;Te++){const rt=Te*2.4,qe=L(ne,Math.cos(rt)*.24*se,(1.03+Te%3*.2)*se,Math.sin(rt)*.24*se,.14*se,.46*se,.18*se,Te%2?v.green:v.greenLight);qe.rotation.z=Math.sin(rt)*.75,qe.rotation.x=Math.cos(rt)*.75}}function k(U,ee,te,se=1.1,he=.91){b(U,ee,he+.34,te,se,.66,.07,v.frame),b(U,ee,he+.34,te+.041,se-.09,.55,.012,v.screen),b(U,ee,he+.04,te,.075,.2,.075,v.frame),b(U,ee,he-.03,te+.02,.38,.025,.25,v.frame);for(let ne=0;ne<4;ne++)b(U,ee-.17,he+.48-ne*.1,te+.052,.54-ne*.08,.018,.008,ne===0?v.cyan:v.greenLight);b(U,ee+.34,he+.29,te+.055,.13,.3,.012,v.cyan)}function W(U,ee,te,se=0,he=!1){const ne=B(U,ee,0,te,se),Te=he?.92:.48;A(ne,0,Te/2,0,.04,Te,v.frame);for(let rt=0;rt<5;rt++){const qe=rt*Math.PI*2/5,Pt=b(ne,Math.sin(qe)*.17,.1,Math.cos(qe)*.17,.05,.05,.4,v.frame);Pt.rotation.y=qe,A(ne,Math.sin(qe)*.33,.065,Math.cos(qe)*.33,.055,.08,v.rubber)}b(ne,0,Te,0,.56,.14,.56,v.charcoal),b(ne,0,Te+.36,-.24,.54,.6,.12,v.charcoal),b(ne,-.32,Te+.22,0,.07,.06,.4,v.frame),b(ne,.32,Te+.22,0,.07,.06,.4,v.frame)}function $(U,ee,te,se,he=0){const ne=B(U,ee,0,te,he);b(ne,0,.86,0,1.95,.12,.95,v.wood);for(const Te of[-.83,.83])b(ne,Te,.42,0,.065,.84,.75,v.frame),b(ne,Te,.055,0,.34,.055,.78,v.frame);return b(ne,0,.57,-.35,1.7,.07,.05,v.frame),k(ne,0,-.22),b(ne,0,.94,.19,.62,.035,.19,v.charcoal),b(ne,.5,.94,.21,.1,.035,.16,v.charcoal),A(ne,-.74,1.03,.1,.075,.18,v.cream),b(ne,.75,.95,-.06,.23,.028,.31,v.paper),D(ne,String(se).padStart(2,"0"),-.8,.96,.33,.2,.12,"#5b4a35",null,!0),W(ne,0,.95,Math.PI),ne}function re(U,ee,te,se=0,he=2.7){const ne=B(U,ee,0,te,se);b(ne,0,.3,0,he,.4,1.05,v.cream),b(ne,0,.78,-.47,he,.65,.2,v.cream);for(const Te of[-1,1])b(ne,Te*(he/2-.1),.6,0,.2,.55,1.12,v.cream);for(let Te=0;Te<3;Te++)b(ne,-he/3+Te*he/3,.55,.02,he/3-.07,.17,.8,v.pot);for(const Te of[-he*.35,he*.35])for(const rt of[-.32,.32])A(ne,Te,.12,rt,.035,.2,v.brass)}function me(U,ee,te,se=0,he=2.5){const ne=B(U,ee,0,te,se);b(ne,0,1.2,-.2,he,2.4,.08,v.darkWood);for(const Te of[.12,.75,1.4,2.1]){b(ne,0,Te,0,he,.06,.55,v.wood);for(let rt=0;rt<6;rt++)b(ne,-he*.4+rt*he*.14,Te+.22,.03,.13,.35+S()*.12,.32,[v.charcoal,v.cream,v.brass,v.green][rt%4])}for(const Te of[-he/2,he/2])b(ne,Te,1.2,0,.06,2.4,.55,v.frame)}function be(U,ee,te){b(U,ee,1.24,te,.92,2.46,.82,v.frame),b(U,ee,1.25,te+.42,.78,2.15,.035,v.charcoal);for(let se=0;se<7;se++)b(U,ee,.36+se*.28,te+.455,.7,.19,.025,v.rubber),b(U,ee-.25,.36+se*.28,te+.475,.035,.035,.015,v.cyan),b(U,ee+.03,.36+se*.28,te+.475,.32,.012,.01,v.brass);b(U,ee,2.52,te,.94,.06,.88,v.charcoal)}function _e(U,ee,te,se,he=0){const ne=B(U,ee,0,te,he);b(ne,0,.85,0,se,1.7,.035,v.glass);for(const Te of[-se/2,se/2])b(ne,Te,.89,0,.045,1.78,.045,v.frame);b(ne,0,.08,0,se,.1,.05,v.frame),b(ne,0,1.75,0,se,.04,.045,v.brass)}function Be(U,ee,te,se,he=0,ne=2.65){const Te=B(U,ee,0,te,he);b(Te,0,ne/2+.08,0,se,ne,.07,v.glass);for(let rt=-se/2;rt<=se/2+.01;rt+=se/5)b(Te,rt,ne/2+.08,0,.07,ne+.15,.1,v.frame);b(Te,0,.12,0,se,.13,.12,v.frame),b(Te,0,ne+.1,0,se,.13,.14,v.frame),b(Te,0,ne*.55,0,se,.045,.08,v.frame)}function Ze(U,ee=!1){b(U,0,-.3,0,26.6,.6,18.6,v.charcoal),b(U,0,.005,0,26,.07,18,ee?v.darkWood:v.floor),b(U,0,-.19,9.32,26.5,.035,.04,v.brass),b(U,13.32,-.19,0,.04,.035,18.6,v.brass);for(let te=-12;te<=12;te+=1.5)b(U,te,.048,0,.013,.005,18,ee?v.brass:v.edge);if(!ee){b(U,0,.057,0,26,.018,1.7,v.wood);for(let te=-12;te<=12;te++)b(U,te,.069,0,.016,.004,1.7,v.darkWood)}b(U,0,1.65,-9.1,26.5,3.3,.2,v.charcoal);for(const te of[-5.15,5.15])b(U,-13.1,1.65,te,.2,3.3,8.1,v.charcoal);b(U,-13.1,3,0,.2,.6,2.2,v.charcoal);for(let te=-12.6;te<13;te+=.3)b(U,te,1.55,-8.97,.055,2.9,.07,v.darkWood);for(let te=-8.8;te<9;te+=.32)Math.abs(te)>1.15&&b(U,-12.97,1.55,te,.07,2.9,.055,v.darkWood);b(U,0,3.24,-8.94,26,.045,.06,v.warm),b(U,-12.95,3.24,0,.06,.045,18,v.warm);for(let te of[-12.8,-4.3,4.3,12.8])b(U,te,1.75,-8.7,.18,3.5,.18,v.frame),b(U,te,3.48,-4.5,.15,.16,8.5,v.frame);Be(U,12.94,-4.5,8.5,Math.PI/2,2.9),D(U,"K I P   /   H E A D Q U A R T E R S",0,2.73,-8.82,7.9,.48,"#e2d1ad","#2a322c");for(let te of[-11,11])N(U,te,8,1.5),N(U,te,-7.6,1.1)}const de=new _n,z=new _n,ve=new _n;o.add(de,z,ve),Ze(de),Ze(z,!0),Ze(ve,!0),z.visible=!1,ve.visible=!1;const fe=[];for(const U of us){const ee=U.id==="content"?v.rug2:v.rug;b(de,U.x,.063,U.z,7.7,.03,6.9,ee);for(const se of[-1,1])b(de,U.x+se*3.9,.08,U.z,.035,.02,7,v.brass);D(de,U.title.toUpperCase(),U.x,.093,U.z+2.85,5.6,.34,"#e6e0cd",null,!0);const te=new tn(new Ci(7.7,6.9),new Ji({visible:!1}));te.rotation.x=-Math.PI/2,te.position.set(U.x,.1,U.z),te.userData.id=U.id,de.add(te),fe.push(te)}for(const U of[-4.3,4.3])_e(de,U,-4.6,6.7,Math.PI/2),_e(de,U,4.6,6.7,Math.PI/2);for(const U of[-8.6,0,8.6])_e(de,U-2.3,-1,3.1),_e(de,U-2.3,1,3.1);$(de,-9,-4.2,1),b(de,-9,1.8,-8.77,3.4,1.4,.1,v.frame),b(de,-9,1.8,-8.7,3.2,1.23,.04,v.paper);for(let U=0;U<6;U++)b(de,-10+U%3*.9,1.94-Math.floor(U/3)*.46,-8.65,.7,.3,.025,[v.rug,v.brass,v.charcoal][U%3]);A(de,-6.8,.71,-2.9,.65,.09,v.wood),A(de,-6.8,.35,-2.9,.08,.7,v.frame),W(de,-6.5,-1.9,Math.PI),N(de,-11.6,-2.5,1.2);for(let U=0;U<3;U++)be(de,-2.3+U*1.1,-7.6);$(de,-2.1,-3.6,2),$(de,.3,-3.6,3),$(de,2.6,-5.4,4),$(de,6.5,-4.3,5),$(de,9.8,-4.3,6),b(de,8.7,1.87,-8.73,4.1,1.6,.12,v.frame),b(de,8.7,1.87,-8.65,3.9,1.4,.02,v.screen),D(de,"PLAY. TEST. IMPROVE.",8.7,1.95,-8.61,3.4,.35,"#a3d8c6"),N(de,11.9,-2,1.2),$(de,-10.7,4.2,7),$(de,-7.5,4.2,8),be(de,-11.6,1.9),b(de,-6,1.05,2,1.7,2.1,.85,v.charcoal),b(de,-6,1.05,2.44,1.5,1.9,.04,v.frame);const We=A(de,-6,1.1,2.5,.15,.05,v.brass);We.rotation.x=Math.PI/2,b(de,-5.65,1.1,2.5,.07,.4,.06,v.brass),$(de,-.7,4,9),me(de,2.2,2.1,0,2.7),re(de,1.1,6.9,0,2.4),A(de,-1.3,.6,7.1,.5,.08,v.wood),A(de,-1.3,.28,7.1,.08,.56,v.frame),A(de,-1.36,.98,3.7,.07,.07,v.frame),A(de,-1.36,1.16,3.7,.023,.35,v.frame),A(de,-1.36,1.38,3.7,.07,.17,v.rubber),N(de,-3,6.7,1.25),$(de,6.2,3.9,10),$(de,9.5,3.9,11),$(de,8.6,6.5,12),$(de,6.2,6.5,13),$(de,11,6.5,14),me(de,11.5,2.1,0,1.8),D(de,"01   /   THE LOFT",0,-.22,9.63,5.8,.29,"#e2cfaa"),b(z,-6.9,.09,-3.5,9,.05,7.5,v.rug),b(z,-6.9,.9,-3.6,5.6,.17,2.25,v.wood);for(const U of[-8.7,-5.1])b(z,U,.44,-3.6,.16,.88,1.5,v.frame);for(const U of[-5.2,-1.9])for(const ee of[-8.6,-7,-5.4])W(z,ee,U,U<-3?0:Math.PI);W(z,-10.4,-3.6,-Math.PI/2),W(z,-3.4,-3.6,Math.PI/2);for(const U of[-8.5,-6.9,-5.3])b(z,U,1.01,-3.6,.6,.028,.38,v.paper),A(z,U+.4,1.08,-3.5,.06,.13,v.cream);b(z,-7,1.85,-8.7,5,1.7,.15,v.frame),b(z,-7,1.85,-8.61,4.8,1.5,.02,v.screen),D(z,"MAKE ROOM FOR BIG IDEAS.",-7,1.9,-8.57,4.1,.42,"#e0ce9f"),_e(z,-1.8,-4.5,6.3,Math.PI/2),b(z,6.8,.66,-5,8.3,1.3,1.05,v.darkWood),b(z,6.8,1.36,-5,8.65,.13,1.4,v.wood),b(z,6.8,.1,-4.46,8,.04,.04,v.warm);for(let U=0;U<30;U++)b(z,2.85+U*.27,.7,-4.45,.05,1.1,.04,v.brass);for(const U of[3.6,5.6,7.6,9.6])W(z,U,-3.8,Math.PI,!0);me(z,7.3,-8.6,0,6.5),b(z,10.3,1.7,-5.1,.7,.62,.52,v.frame),b(z,10.3,1.7,-4.82,.55,.29,.02,v.brass);for(let U=0;U<3;U++)A(z,4+U*.4,1.5,-5,.08,.18,v.cream);b(z,6,.08,4.1,10,.04,7,v.rug2),re(z,6,2.3,0,4.4),re(z,9.3,4.3,-Math.PI/2,3.5),re(z,3.2,5.5,Math.PI/2,2.7),A(z,6.1,.39,4.6,1.2,.11,v.darkWood),A(z,6.1,.19,4.6,.35,.33,v.charcoal),b(z,5.9,.48,4.6,.8,.07,.55,v.paper),A(z,6.6,.53,4.7,.1,.2,v.brass),N(z,10.5,7.5,1.6),N(z,2,1.6,1.6),b(z,-7,.07,4.7,9,.06,6.8,v.floor);for(let U=0;U<9;U++)b(z,-11+U,.11,4.7,.03,.012,6.8,v.brass);re(z,-9.7,4.6,Math.PI/2,2.4),re(z,-4.5,4.6,-Math.PI/2,2.4),A(z,-7.1,.5,4.6,.8,.12,v.wood),A(z,-7.1,.24,4.6,.09,.48,v.frame);for(const U of[-11,-8.7,-6.4,-4.1])N(z,U,7.5,1.2);for(const U of[2,4,6])N(z,-11.8,U,1.1);Be(z,0,9,25.5,0,1),Be(z,12.94,4.5,8.6,Math.PI/2,1),D(z,"STRATEGY ROOM",-7,.15,-.15,4,.3,"#e4d7bc",null,!0),D(z,"SKY LOUNGE",6,.12,7.3,4,.3,"#e5dcc6",null,!0),D(z,"02   /   SKY CLUB",0,-.22,9.63,5.8,.29,"#e2cfaa");for(const U of[4,7,10])A(z,U,2.75,-5,.28,.25,v.charcoal),A(z,U,2.61,-5,.23,.025,v.warm),A(z,U,3.18,-5,.018,.7,v.frame);Wg(ve,{T:to,m:v,box:b,cyl:A,orb:L,group:B,sofa:re,plant:N,partition:_e,windowWall:Be,label:D,software:a}),[de,z,ve].forEach((U,ee)=>Xg(U,{T:to,m:v,box:b,cyl:A,software:a},ee));const Ye=new _n;o.add(Ye),Ye.visible=!1;for(const U of[0,zn])for(const ee of[-12.8,12.8])for(const te of[-8.7,8.7])b(Ye,ee,U+zn/2,te,.18,zn,.18,v.frame);function ze(U){U.updateMatrixWorld(!0);const ee=new Map,te=[];U.traverse(se=>{if(se.isMesh&&!se.material.transparent&&se.material.visible!==!1){const he=se.material.uuid+":"+se.renderOrder,ne=ee.get(he)||{material:se.material,order:se.renderOrder,geometries:[]};ne.geometries.push(se.geometry.clone().applyMatrix4(se.matrixWorld)),ee.set(he,ne),te.push(se)}});for(const se of te)se.removeFromParent();for(const se of ee.values()){const he=Hg(se.geometries,!1),ne=new tn(he,se.material);ne.renderOrder=se.order,ne.castShadow=!0,ne.receiveShadow=!0,U.add(ne),se.geometries.forEach(Te=>Te.dispose())}}for(const U of[de,z,ve])ze(U),U.traverse(ee=>ee.userData.baseOrder=ee.renderOrder);const nt=new _n;o.add(nt);const Qe=new Ji({color:"#dec18e",transparent:!0,opacity:.8,depthWrite:!1});for(const U of[-3.52,3.52])b(nt,0,.15,U,7.9,.025,.06,Qe);for(const U of[-3.95,3.95])b(nt,U,.15,0,.06,.025,7.1,Qe);nt.visible=!1;const it=[];function ct(U){const{id:ee,name:te,short:se,color:he,desk:[ne,,Te]}=U,rt=y(he,.4,.35),qe=B(o,ne,0,Te),Pt=B(qe,-.12,.45,0),Ft=B(qe,.12,.45,0);b(Pt,0,-.19,0,.14,.4,.17,v.charcoal),b(Ft,0,-.19,0,.14,.4,.17,v.charcoal),b(Pt,0,-.4,.05,.18,.1,.29,v.rubber),b(Ft,0,-.4,.05,.18,.1,.29,v.rubber),b(qe,0,.75,0,.48,.56,.26,rt),b(qe,0,1.24,0,.48,.4,.36,v.white),b(qe,0,1.25,.19,.4,.23,.035,v.screen),A(qe,0,1.53,0,.025,.2,v.brass),L(qe,0,1.65,0,.065,.065,.065,rt),b(qe,0,.78,.15,.18,.18,.025,v.cyan);const At=B(qe,-.29,.96,0),Jt=B(qe,.29,.96,0);b(At,0,-.19,0,.12,.4,.14,rt),b(Jt,0,-.19,0,.12,.4,.14,rt),A(At,0,-.4,0,.06,.12,v.white),A(Jt,0,-.4,0,.06,.12,v.white),b(qe,.09,1.27,.214,.065,.05,.01,v.cyan),b(qe,-.09,1.27,.214,.065,.05,.01,v.cyan);const Kn=A(qe,0,.01,0,.35,.015,v.cyan);Kn.castShadow=!1,qe.traverse(Ea=>Ea.userData.agentId=ee);const Ht=document.createElement("button");return Ht.className="agent-pin",Ht.textContent=se,Ht.dataset.agent=ee,Ht.dataset.tone="unknown",Ht.title=te,Ht.setAttribute("aria-label",te+" — belum terverifikasi — buka laporan"),Ht.onclick=()=>t?.(ee),n.appendChild(Ht),it.push({id:ee,root:qe,left:Pt,right:Ft,armL:At,armR:Jt,x:ne,z:Te,pin:Ht,motion:Tg(ee),pose:null}),qe}Qi.forEach(ct);const $e=qg({T:to,software:a,compact:ze});o.add($e.root),$e.root.visible=!1;let ye="loft",j=!1,ce=matchMedia("(prefers-reduced-motion: reduce)").matches,pe=!1,ae=0,Ae=0,I=a?1:3,et=!1,Le=!1,R=null;const _=(U=ye)=>{const ee=n.clientWidth<600;if(U==="campus"){const he=new G(1,2,-1),ne=ee?1.92:1.08;return{position:he.clone().add(new G(72,64,100).multiplyScalar(ne)),target:he}}const te=U==="building",se=ee?2.25:1.27;return{position:new G(28*se,(te?29:30)*se,(te?42:34)*se),target:new G(-2,te?4.6:.2,0)}};function O(){I=Math.max(I,a?1:3),!Ae&&!document.hidden&&!Le&&!et&&(Ae=requestAnimationFrame(we))}function V(U,ee,te=!0){ce||a||!te?(c.position.copy(U),l.target.copy(ee),l.update(),R=null):R={from:c.position.clone(),to:U.clone(),targetFrom:l.target.clone(),targetTo:ee.clone(),started:performance.now()},O()}function q(){$e.root.visible=ye==="campus"||ye==="building";const U=_();V(U.position,U.target),nt.visible=!1}function ue(){const U=n.clientWidth,ee=n.clientHeight;!U||!ee||(s.setSize(U,ee,!1),c.aspect=U/ee,c.updateProjectionMatrix(),O())}function Q(U){const ee=us.find(te=>te.id===U);if(ye==="loft"&&ee){nt.position.set(ee.x,0,ee.z),nt.visible=!0;const te=new G(ee.x,.5,ee.z);V(te.clone().add(new G(13,16,19)),te)}else nt.visible=!1,O()}function H(U,ee){nt.visible=!1;const te=new G(U,.45,ee);V(te.clone().add(new G(14,17,20)),te)}function Y(U){const ee=it.map(he=>[he.pose?.phase,he.pose?.position?.join(","),he.pin.dataset.tone].join(":")).join("|");for(const he of U){const ne=it.find(Te=>Te.id===he.id);ne&&(ne.motion.update(he),ne.pin.dataset.tone=he.tone,ne.pin.setAttribute("aria-label",he.name+" — "+he.label+" — buka laporan"))}const te=xe(0,ce||a||document.hidden),se=it.map(he=>[he.pose?.phase,he.pose?.position?.join(","),he.pin.dataset.tone].join(":")).join("|");(te||ee!==se)&&O()}function oe(U){pe=U,ae=0,xe(0,ce||a),O()}function xe(U,ee=!1){let te=!1;const se=["building","campus"].includes(ye),he={loft:0,sky:1,entertain:2}[ye]??0;for(const ne of it){const Te=ne.motion.step(U,{snap:ee,pause:pe}),rt=ne.pose?.phase;ne.pose=Te,ne.root.position.set(Te.position[0],Te.position[1]-(se?0:he*zn),Te.position[2]),ne.root.rotation.y=Te.rotation,ne.root.visible=se||Te.level===he;const qe=Te.moving?Math.sin(performance.now()*.011)*.45:0;if(ne.left.rotation.x=qe,ne.right.rotation.x=-qe,ne.armL.rotation.x=-qe*.8,ne.armR.rotation.x=qe*.8,Te.phase==="resting"){const Pt=Te.enjoying?Math.sin(performance.now()*.008)*.14:0;ne.armL.rotation.x=-.8+Pt,ne.armR.rotation.x=-.8-Pt}else Te.phase==="reviewing"&&(ne.armR.rotation.x=-1);a&&ne.root.traverse(Pt=>Pt.renderOrder=se?Te.level*1e3:0),rt!==Te.phase&&i?.(ne.id,Te.phase),te||=Te.active}return te&&(s.shadowMap.needsUpdate=!0),te}function ge(){const U=[],ee=n.clientWidth,te=n.clientHeight;for(const se of it){const he=se.root.position.clone().add(new G(0,2,0)).project(c),ne=se.root.visible&&he.z>-1&&he.z<1&&Math.abs(he.x)<.94&&Math.abs(he.y)<.86;if(se.pin.hidden=!ne,!ne)continue;const Te={x:(he.x+1)*ee/2,y:(1-he.y)*te/2};let rt=null;for(let qe=0;qe<=5&&!rt;qe++)for(const[Pt,Ft]of[[0,qe],[0,-qe],[qe,0],[-qe,0],[qe,qe],[-qe,qe]]){const At=Math.max(25,Math.min(ee-25,Te.x+Pt*48)),Jt=Math.max(48,Math.min(te-8,Te.y+Ft*48));if(U.every(Kn=>Math.abs(At-Kn.x)>=46||Math.abs(Jt-Kn.y)>=46)){rt={x:At,y:Jt};break}}rt??={x:Math.max(25,Math.min(ee-25,Te.x)),y:Math.max(48,Math.min(te-8,Te.y))},U.push(rt),se.pin.style.left=rt.x+"px",se.pin.style.top=rt.y+"px"}}function Me(U){const ee=it.find(he=>he.id===U);if(!ee)return;$e.root.visible=!1,nt.visible=!1;const te=ee.root.position.clone().add(new G(0,.7,0)),se=n.clientWidth<600?1.4:1;V(te.clone().add(new G(8,10,12).multiplyScalar(se)),te)}function De(U){const ee=it.find(te=>te.id===U)?.pose;return ee?.moving?"building":["loft","sky","entertain"][ee?.level??0]}function Fe(U){ye=U;const ee=U==="building"||U==="campus";l.maxDistance=ee?420:145,[["loft",de],["sky",z],["entertain",ve]].forEach(([se,he],ne)=>{he.visible=ee||U===se,he.position.y=ee?ne*zn:0,a&&he.traverse(Te=>Te.renderOrder=(Te.userData.baseOrder||0)+(ee?ne*1e3:0))}),Ye.visible=ee,$e.root.visible=ee,nt.visible=!1,xe(0,ce||a),Se(j),q(),s.shadowMap.needsUpdate=!0,O()}function Xe(){$e.root.visible=!1,nt.visible=!1;const U=new G(-13,4.5,-1.6),ee=n.clientWidth<600;V(U.clone().add(new G(-22,13,29).multiplyScalar(ee?1.5:1)),U)}function F(U,ee,te){nt.visible=!1,$e.root.visible=!0;const se={arrival:[26,21,34],garden:[-17,17,26],beach:[27,24,34],mountains:[42,30,48]},he=new G(ee,U==="mountains"?6:0,te),ne=n.clientWidth<600?1.65:1;V(he.clone().add(new G(...se[U]).multiplyScalar(ne)),he)}function Se(U){j=U;const ee=ye==="campus"||ye==="building";o.background.set(U?ee?"#142b36":"#131d1c":ee?"#cbded9":"#d8d9cd"),o.fog.color.copy(o.background),o.fog.near=ee?180:90,o.fog.far=ee?430:190,$e.setNight(U),d.intensity=U?.8:2.5,d.color.set(U?"#b7c9db":"#e9f4ff"),h.intensity=a?U?.3:.72:U?.65:3.2,m.intensity=a?U?.5:.65:0,h.color.set(U?"#9fbdd7":a?"#fff5e8":"#ffe5c3"),u.intensity=a?U?.22:.3:U?.5:1.1,s.toneMappingExposure=U?1.35:1.13,v.warm.emissiveIntensity=U?2.2:.7,v.cyan.emissiveIntensity=U?1.6:.4,s.shadowMap.needsUpdate=!0,O()}function ie(U){R=null;const ee=c.position.clone().sub(l.target);ee.applyAxisAngle(new G(0,1,0),U),c.position.copy(l.target).add(ee),l.update(),O()}function Ee(U){R=null;const ee=c.position.clone().sub(l.target);ee.setLength(ea.clamp(ee.length()*U,l.minDistance,l.maxDistance)),c.position.copy(l.target).add(ee),l.update(),O()}function we(U){if(Ae=0,Le||document.hidden||et)return;const ee=Math.min((U-(ae||U))/1e3,.25);ae=U;let te=!1;if(R){const he=Math.min(1,(U-R.started)/650),ne=1-Math.pow(1-he,3);c.position.lerpVectors(R.from,R.to,ne),l.target.lerpVectors(R.targetFrom,R.targetTo,ne),te=he<1,he===1&&(R=null)}te=xe(ee,ce||a)||te;const se=l.update(ee);s.render(o,c),ge(),I--,(te||se||I>0)&&!Ae&&(Ae=requestAnimationFrame(we))}l.addEventListener("change",O),l.addEventListener("start",()=>{R=null,O()});let le=null;const Oe=U=>{le={x:U.clientX,y:U.clientY}},Ie=U=>{if(!le||Math.hypot(U.clientX-le.x,U.clientY-le.y)>6)return;const ee=s.domElement.getBoundingClientRect(),te=new He((U.clientX-ee.left)/ee.width*2-1,-(U.clientY-ee.top)/ee.height*2+1),se=new eu;se.setFromCamera(te,c);const he=se.intersectObjects(it.filter(Te=>Te.root.visible).map(Te=>Te.root),!0)[0];if(he){t?.(he.object.userData.agentId);return}if(ye!=="loft")return;const ne=se.intersectObjects(fe)[0];ne&&e?.(ne.object.userData.id)};s.domElement.addEventListener("pointerdown",Oe),s.domElement.addEventListener("pointerup",Ie);const tt=U=>{if(U.key==="ArrowLeft")U.preventDefault(),ie(-.18);else if(U.key==="ArrowRight")U.preventDefault(),ie(.18);else if(["+","="].includes(U.key))U.preventDefault(),Ee(.85);else if(U.key==="-")U.preventDefault(),Ee(1.15);else if(U.key==="Home")U.preventDefault(),q();else if(["ArrowUp","ArrowDown"].includes(U.key)){U.preventDefault();const ee=c.position.clone().sub(l.target),te=new ta().setFromVector3(ee);te.phi=ea.clamp(te.phi+(U.key==="ArrowUp"?-.08:.08),.28,1.34),c.position.copy(l.target).add(new G().setFromSpherical(te)),l.update(),O()}};n.addEventListener("keydown",tt);const at=()=>{document.hidden?(cancelAnimationFrame(Ae),Ae=0,xe(0,!0),ae=0):O()};document.addEventListener("visibilitychange",at);const yt=matchMedia("(prefers-reduced-motion: reduce)"),Tt=U=>{ce=U.matches,ce&&(xe(0,!0),R=null),O()};yt.addEventListener("change",Tt);const fn=U=>{U.preventDefault(),et=!0,cancelAnimationFrame(Ae),Ae=0,r?.("Tampilan 3D terhenti.")};s.domElement.addEventListener("webglcontextlost",fn);const pi=new ResizeObserver(ue);pi.observe(n);const Li=_();return c.position.copy(Li.position),l.target.copy(Li.target),l.update(),ue(),s.shadowMap.needsUpdate=!0,O(),{software:a,setFloor:Fe,setNight:Se,select:Q,focusPoint:H,focusStairs:Xe,focusOutdoor:F,rotate:ie,zoom:Ee,reset:q,updateAgents:Y,pauseMotion:oe,focusAgent:Me,agentFloor:De,get reducedMotion(){return ce},get state(){return{floor:ye,night:j,motionPaused:pe,renderer:a?"svg-fallback":"webgl2",drawCalls:s.info.render.calls??null,triangles:s.info.render.triangles??s.info.render.faces}},dispose(){Le=!0,cancelAnimationFrame(Ae),pi.disconnect(),l.dispose(),s.dispose(),document.removeEventListener("visibilitychange",at),yt.removeEventListener("change",Tt),n.removeEventListener("keydown",tt),s.domElement.removeEventListener("pointerdown",Oe),s.domElement.removeEventListener("pointerup",Ie),s.domElement.removeEventListener("webglcontextlost",fn);const U=new Set,ee=new Set,te=new Set;o.traverse(se=>{if(se.geometry&&U.add(se.geometry),se.material)for(const he of[].concat(se.material)){ee.add(he);for(const ne of Object.values(he))ne?.isTexture&&te.add(ne)}}),U.forEach(se=>se.dispose()),ee.forEach(se=>se.dispose()),te.forEach(se=>se.dispose()),it.forEach(se=>se.pin.remove()),s.domElement.remove()}}}const dt=n=>document.querySelector(n),Pi=n=>[...document.querySelectorAll(n)];Pi("[data-icon]").forEach(n=>n.innerHTML=Mo(n.dataset.icon));let Cr=null,mu=null,Ct=null,Hn="loft",Ql=!1;function Dn(n){dt("#announcement").textContent=n}const Pr={campus:{rooms:Ou,number:"COASTAL CAMPUS",caption:"KIP HEADQUARTERS / COASTAL CAMPUS",title:"Between peaks & sea",description:"Kantor, taman, dan garis pantai.",panel:"Bekerja dekat alam,<br/> menikmati ruang.",intro:"Jalan masuk, taman pinus dan mawar, pantai pasir putih, serta gunung di belakang kantor.",first:"4",firstLabel:"zona luar",second:"360°",secondLabel:"sudut pandang",detail:"Kawasan pesisir KIP",detailText:"Pilih area untuk menjelajah. Gunakan tab lantai untuk kembali melihat interior kantor."},loft:{rooms:us,number:"01 / 03",caption:"LANTAI 01 / WORKSPACE",title:"The Loft",description:"Enam divisi. Ruang untuk bertumbuh.",panel:"Ruang kerja,<br/> dipikirkan ulang.",intro:"Material hangat. Ruang terbuka. Setiap peran punya tempatnya.",first:"6",firstLabel:"divisi",second:String(Qi.length),secondLabel:"meja khusus",detail:"Dirancang untuk tim KIP",detailText:"Pilih ruangan untuk melihat tata letak dan rencana penghuninya."},sky:{rooms:Nu,number:"02 / 03",caption:"LANTAI 02 / SOCIAL SPACE",title:"The Sky Club",description:"Bertemu. Berbagi. Melihat lebih jauh.",panel:"Good ideas<br/> need good company.",intro:"Tempat tim berkumpul, merencanakan, dan mengambil jeda.",first:"4",firstLabel:"area bersama",second:"22",secondLabel:"tempat duduk",detail:"Ruang untuk bertemu",detailText:"Ruang strategi, lounge, coffee bar, dan teras hijau untuk bertukar ide."},entertain:{rooms:Fu,number:"03 / 03",caption:"LANTAI 03 / ENTERTAIN & WELLNESS",title:"The Play Club",description:"Recharge. Play. Repeat.",panel:"Ruang untuk rehat,<br/> energi untuk berkarya.",intro:"Karaoke, gym, kolam renang, dan mini game dalam satu lantai rekreasi.",first:"4",firstLabel:"zona hiburan",second:"2",secondLabel:"sisi kaca tangga",detail:"Rehat di atas kota",detailText:"Pilih zona untuk melihat fasilitasnya. Semua tetap berupa pratinjau visual."},building:{rooms:us,number:"01 + 02 + 03",caption:"KIP HEADQUARTERS / TIGA LANTAI",title:"One headquarters",description:"Tiga lantai, satu tangga yang terhubung.",panel:"Satu gedung,<br/> tiga suasana.",intro:"Loft, Sky Club, dan Play Club disatukan tangga dua arah dengan pagar kaca.",first:"14",firstLabel:"ruang & zona",second:String(Qi.length),secondLabel:"meja kerja",detail:"Sambungan yang utuh",detailText:"Bordes menghubungkan tangga ke koridor tiap lantai. Pilih Lihat tangga kaca untuk melihatnya dari dekat."}};function gu(n){const e=Pr[Hn].rooms.find(t=>t.id===n);e&&(Pi(".room-button").forEach(t=>t.setAttribute("aria-pressed",String(t.dataset.room===n))),dt("#detail-title").textContent=e.title,dt("#detail-roles").replaceChildren(...e.roles.map(t=>{const i=document.createElement("span");return i.textContent=t,i})),Hn==="campus"?Ct?.focusOutdoor(n,e.x,e.z):Hn==="loft"?Ct?.select(n):Ct?.focusPoint(e.x,e.z),Dn("Ruangan dipilih: "+e.title))}function _u(){const n=Pr[Hn].rooms;dt("#rooms").innerHTML=n.map((e,t)=>`<button class="room-button" data-room="${e.id}" aria-pressed="false"><span class="room-icon">${Mo(e.icon)}</span><span class="room-name"><b>${e.title}</b></span><span class="room-number">${e.seats&&Hn!=="sky"?e.seats+" meja":String(t+1).padStart(2,"0")}</span></button>`).join(""),Pi(".room-button").forEach(e=>e.addEventListener("click",()=>{Hn==="building"&&or("loft"),gu(e.dataset.room)}))}function Yo(){const n=Pr[Hn];Pi(".room-button").forEach(e=>e.setAttribute("aria-pressed","false")),dt("#detail-title").textContent=n.detail,dt("#detail-roles").replaceChildren(),dt("#stairs-view").setAttribute("aria-pressed","false"),dt("#campus-view").setAttribute("aria-pressed",String(Hn==="campus")),Ct?.reset(),Dn("Tampilan seluruh "+n.title)}function or(n){if(!Pr[n])return;Hn=n,document.body.classList.toggle("campus",n==="campus");const e=Pr[n];Pi("[data-floor]").forEach(t=>t.setAttribute("aria-pressed",String(t.dataset.floor===n))),Ct?.setFloor(n),dt("#floor-caption").textContent=e.caption,dt("#scene-title").innerHTML=e.title+"<span>.</span>",dt("#floor-number").textContent=e.number,dt("#room-list-label").textContent=n==="building"?"DIVISI DI LOFT":n==="campus"?"JELAJAHI KAWASAN":"RUANGAN DI LANTAI INI",_u(),Yo(),Dn(e.caption)}function ec(){Ql||(Ql=!0,Ct?.dispose(),Ct=null,dt("#office").innerHTML='<div id="loading"><div class="error-3d"><b>Tampilan 3D belum tersedia</b><p>Browser memerlukan WebGL 2. Coba aktifkan akselerasi grafis atau buka di browser lain. Daftar ruangan tetap dapat dibaca.</p><button id="retry-3d">Coba muat ulang</button></div></div>',dt("#retry-3d").onclick=()=>location.reload(),Pi(".camera-tools button").forEach(n=>n.disabled=!0),dt("#stairs-view").disabled=!0,dt("#campus-view").disabled=!0,dt("#walk").disabled=!0,Dn("Tampilan 3D belum tersedia; daftar ruangan tetap tersedia."))}_u();try{if(Ct=Yg(dt("#office"),{onPick:gu,onAgentPick:n=>el(n)?Cr?.open(n):mu?.open(n),onAgentMove:(n,e)=>{el(n)&&Cr?.move(n,e)},onError:ec}),dt("#loading")?.remove(),Ct.software){const n=document.createElement("span");n.className="compatibility",n.textContent="Mode kompatibel",dt(".scene-card").appendChild(n)}}catch(n){console.error("3D preview unavailable:",n.message),ec()}Pi("[data-floor]").forEach(n=>n.addEventListener("click",()=>or(n.dataset.floor)));dt("#overview").onclick=Yo;dt("#campus-view").onclick=()=>or("campus");dt("#stairs-view").onclick=()=>{or("building"),Ct?.focusStairs(),dt("#stairs-view").setAttribute("aria-pressed","true"),dt("#detail-title").textContent="Tangga menyatu dengan gedung",Dn("Melihat tangga kaca yang menghubungkan tiga lantai")};for(const[n,e]of[["day",!1],["night",!0]])dt("#"+n).onclick=()=>{document.body.classList.toggle("night",e),dt("#day").setAttribute("aria-pressed",String(!e)),dt("#night").setAttribute("aria-pressed",String(e)),Ct?.setNight(e),Dn("Suasana "+(e?"malam":"siang"))};dt("#rotate-left").onclick=()=>Ct?.rotate(-.26);dt("#rotate-right").onclick=()=>Ct?.rotate(.26);dt("#zoom-in").onclick=()=>Ct?.zoom(.85);dt("#zoom-out").onclick=()=>Ct?.zoom(1.15);dt("#reset").onclick=Yo;const Kg=Uu({announce:Dn});dt("#credits-link").onclick=n=>{n.preventDefault(),dt("#credits").showModal()};addEventListener("pagehide",()=>Ct?.dispose(),{once:!0});or("loft");addEventListener("pageshow",n=>{n.persisted&&location.reload()});const Zg=Tu({openReport:n=>Cr?.open(n),refreshReport:()=>Cr?.refresh(),announce:Dn});Ru({announce:Dn});function xu(n){Kg.show("office"),Ct&&(or(Ct.agentFloor(n)),Ct.focusAgent(n),dt("#office").focus({preventScroll:!0}),dt(".scene-card").scrollIntoView({behavior:"instant",block:"center"}))}Cr=ku({onViews:n=>Zg.receive(n),getOffice:()=>Ct,focusAgent:xu,announce:Dn});Bu();mu=Iu({getOffice:()=>Ct,focusAgent:xu});await bu(()=>import("./agent-skills-entry-MNKMis_e.js"),[]);
