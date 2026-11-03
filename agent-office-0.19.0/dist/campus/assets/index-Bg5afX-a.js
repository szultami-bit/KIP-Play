const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/agent-skills-entry-BQu8SU4x.js","assets/game-team-DWGZmcDU.js"])))=>i.map(i=>d[i]);
import{G as oc}from"./game-team-DWGZmcDU.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function t(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=t(r);fetch(r.href,s)}})();const wu="modulepreload",Ru=function(n){return"/agent-office/campus/"+n},Qo={},Cu=function(e,t,i){let r=Promise.resolve();if(t&&t.length>0){let c=function(l){return Promise.all(l.map(d=>Promise.resolve(d).then(h=>({status:"fulfilled",value:h}),h=>({status:"rejected",reason:h}))))};document.getElementsByTagName("link");const a=document.querySelector("meta[property=csp-nonce]"),o=a?.nonce||a?.getAttribute("nonce");r=c(t.map(l=>{if(l=Ru(l),l in Qo)return;Qo[l]=!0;const d=l.endsWith(".css"),h=d?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${l}"]${h}`))return;const u=document.createElement("link");if(u.rel=d?"stylesheet":wu,d||(u.as="script"),u.crossOrigin="",u.href=l,o&&u.setAttribute("nonce",o),document.head.appendChild(u),d)return new Promise((m,S)=>{u.addEventListener("load",m),u.addEventListener("error",()=>S(new Error(`Unable to preload CSS for ${l}`)))})}))}function s(a){const o=new Event("vite:preloadError",{cancelable:!0});if(o.payload=a,window.dispatchEvent(o),!o.defaultPrevented)throw a}return r.then(a=>{for(const o of a||[])o.status==="rejected"&&s(o.reason);return e().catch(s)})},lc=605e3,hs=[{id:"health",name:"Pemantau layanan",short:"PL",activity:"Arcade",color:"#79c2bd"},{id:"release",name:"Penjaga rilis",short:"PR",activity:"Biliar",color:"#d5ba93"}],Nr={HEALTHY:"Sehat",DEGRADED:"Perlu perhatian",INCIDENT:"Gangguan",RECOVERING:"Pemulihan",UNKNOWN:"Belum diketahui"},el=new Set(["OK","INVALID_PAYLOAD","IDENTITY_MISMATCH","UNEXPECTED_PROFILE","UNEXPECTED_RELEASE","ADMISSION_DRAINING","HTTP_STATUS","INVALID_JSON","BODY_TOO_LARGE","NETWORK","TIMEOUT"]),Ji=n=>Number.isSafeInteger(n)&&n>0,tl=(n,e)=>Ji(n)&&n<=e&&e-n<=lc;function Pu(n,e=Date.now(),t="ready"){return hs.map(i=>{const r=Array.isArray(n?.checks)?n.checks.filter(m=>m?.id===i.id):[],s=r.length===1?r[0]:null,a=Ji(s?.lastAt)?s.lastAt:null,o=!!a&&a<=e&&e-a>lc,c=!!a&&a>e,l=n?.observer?.status==="HEALTHY"&&tl(n.observer.lastCycleAt,e),d=t==="ready"&&n?.source==="observer"&&l&&tl(a,e)&&Object.hasOwn(Nr,s?.status)&&el.has(s?.lastCode),h=d&&!(s.status==="HEALTHY"&&s.lastCode!=="OK")?s.status:"UNKNOWN",u=o?"Data lama":c?"Waktu tidak valid":t==="session"?"Sesi berakhir":t==="error"?"Koneksi terputus":t==="loading"?"Mengambil laporan":n?.source==="snapshot"?"Data snapshot":a?l?h==="UNKNOWN"?"Hasil belum terverifikasi":"Data terbaru":"Pemantau belum terverifikasi":"Belum ada laporan";return{...i,status:h,label:Nr[h],freshness:u,lastAt:a,canRest:h==="HEALTHY",tone:h==="HEALTHY"?"good":h==="UNKNOWN"?"unknown":"attention",source:n?.source==="observer"?"Pemantau VPS":n?.source==="snapshot"?"Snapshot tersimpan":"Belum tersedia",lastCode:el.has(s?.lastCode)?s.lastCode:null,latencyMs:Number.isFinite(s?.latencyMs)&&s.latencyMs>=0&&s.latencyMs<=6e4?s.latencyMs:null,release:/^[0-9a-f]{40}$/.test(s?.observed?.release)?s.observed.release:null,lastCycleAt:Ji(n?.observer?.lastCycleAt)?n.observer.lastCycleAt:null,nextDueAt:d&&Ji(n?.observer?.nextDueAt)?n.observer.nextDueAt:null,lastResult:s&&Object.hasOwn(Nr,s.status)?Nr[s.status]:"Belum tersedia",reason:o?"Pemeriksaan ini berusia lebih dari 10 menit 5 detik. Kondisi saat ini belum diketahui.":c?"Waktu laporan berada di masa depan. Kondisi saat ini belum diketahui.":t==="error"?"Laporan terakhir tetap ditampilkan sebagai arsip. Koneksi akan dicoba lagi.":t==="session"?"Masuk kembali untuk membaca laporan.":d?h==="HEALTHY"?"Hasil pemeriksaan terakhir sehat. Karakter boleh rehat sambil menunggu laporan berikutnya.":"Hasil ini membutuhkan perhatian. Karakter berada atau kembali ke ruang operasi.":"Menunggu hasil yang dapat diverifikasi dari pemantau VPS."}})}function Mi(n){return Ji(n)?new Intl.DateTimeFormat("id-ID",{day:"2-digit",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit",second:"2-digit",timeZone:"Asia/Pontianak",hour12:!1}).format(n)+" WIB":"Belum ada"}function oo(n,e=Date.now()){if(!Ji(n))return"Belum pernah tercatat";if(n>e)return"Waktu tidak valid";const t=Math.floor((e-n)/1e3);return t<60?t+" detik lalu":t<3600?Math.floor(t/60)+" menit lalu":t<86400?Math.floor(t/3600)+" jam lalu":Math.floor(t/86400)+" hari lalu"}function cc(){for(const n of["todo","doing","done"]){const e=document.querySelector("#jobs-"+n).children.length;document.querySelector("#count-"+n).textContent=e,document.querySelector("#empty-"+n).hidden=e>0}}function Lu(n,e){return n.canRest?"done":"todo"}function Du({openReport:n,refreshReport:e,announce:t}){const i=T=>document.querySelector(T),r=new Map;let s=null,a=[],o=!1,c=!1,l=!1,d=null;const h={health:"Status layanan",release:"Status versi rilis"};for(const T of hs){const M=document.createElement("article");M.className="job-card",M.tabIndex=-1,M.dataset.job=T.id,M.innerHTML=`<div class="job-owner"><span class="agent-monogram">${T.short}</span><span>${T.name}</span></div><h3>${h[T.id]}</h3><p class="job-result"></p><p class="job-time"></p><p class="job-review" hidden>Tinjauan Anda</p><div class="job-actions"><button data-action="report">Lihat hasil</button><button data-action="start" class="primary-action">Mulai tinjau</button><button data-action="complete" class="primary-action" hidden>Selesaikan</button><button data-action="cancel" class="quiet-action" hidden>Hentikan tinjauan</button></div>`;for(const R of M.querySelectorAll("button"))R.onclick=()=>R.dataset.action==="report"?n(T.id):g(T.id,R.dataset.action);r.set(T.id,M),i("#jobs-todo").append(M)}function u(T){i("#board-notice").textContent=T}function m(){for(const T of a){const M=r.get(T.id),R=s?.reviews[T.id],b=s?Lu(T):"todo";M.parentElement.id!=="jobs-"+b&&i("#jobs-"+b).append(M),M.dataset.tone=T.tone,M.querySelector(".job-result").textContent=T.label+" · "+T.freshness,M.querySelector(".job-time").textContent=T.lastAt?"Diperiksa "+oo(T.lastAt)+`
`+Mi(T.lastAt):"Belum ada hasil pemeriksaan";const v=M.querySelector(".job-review");v.hidden=!R?.reviewing,v.textContent="Tinjauan manual Anda · sejak "+Mi(R?.startedAt);for(const x of M.querySelectorAll("[data-action]")){const p=x.dataset.action;x.hidden=p==="start"?!!R?.reviewing:["complete","cancel"].includes(p)?!R?.reviewing:!1,x.disabled=p==="report"?!1:!s||o||l||p==="complete"&&!T.canRest,p==="start"&&(x.textContent=b==="done"?"Tinjau ulang":"Mulai tinjau"),p==="complete"&&(x.title=T.canRest?"Tandai tinjauan selesai":"Menunggu hasil terbaru yang sehat")}}cc(),i("#board-refresh").disabled=o||l}async function S(T){d=new AbortController;const M=setTimeout(()=>d?.abort(),12e3);try{const R=await fetch("/agent-office/api/board",{method:T?"POST":"GET",credentials:"same-origin",cache:"no-store",headers:T?{"Content-Type":"application/json"}:void 0,body:T?JSON.stringify(T):void 0,signal:d.signal}),b=await R.json();if(R.status===401&&(l=!0),!R.ok)throw Error(b.error||"BOARD_UNAVAILABLE");if(b?.version!==1||!Number.isSafeInteger(b.revision)||!b.reviews||!("health"in b.reviews)||!("release"in b.reviews))throw Error("BOARD_UNAVAILABLE");return b}finally{clearTimeout(M),d=null}}async function w(){if(!(o||c||document.hidden||l)){o=!0,m();try{s=await S(),u("")}catch{s=null,u(l?"Sesi berakhir. Masuk kembali.":"Papan belum tersambung. Coba perbarui.")}finally{o=!1,m()}}}async function g(T,M){if(o||!s||l)return;o=!0,m();const R=a.find(b=>b.id===T);try{s=await S({id:T,action:M,revision:s.revision,...M==="complete"?{resultAt:R?.lastAt}:{}});const b=M==="start"?"Tinjauan dimulai.":M==="complete"?"Tinjauan selesai.":"Tinjauan dihentikan.";u(b),t(b)}catch(b){u(l?"Sesi berakhir. Masuk kembali.":{BOARD_CHANGED:"Papan berubah di perangkat lain. Tampilan diperbarui.",RESULT_CHANGED:"Ada hasil baru. Buka hasil sebelum menyelesaikan.",RESULT_NOT_VERIFIED:"Hasil belum sehat atau sudah lama. Tinjauan belum selesai.",NOT_REVIEWING:"Tinjauan sudah berubah. Tampilan diperbarui.",ALREADY_REVIEWING:"Tinjauan sudah dimulai."}[b.message]||"Perubahan belum dapat dipastikan. Perbarui papan."),s=null;try{l||(s=await S())}catch{}e()}finally{o=!1,m(),r.get(T)?.focus({preventScroll:!0})}}i("#board-refresh").onclick=()=>{w(),e()};const f=()=>{document.hidden||w()};document.addEventListener("visibilitychange",f);const P=setInterval(w,3e4);return addEventListener("pagehide",()=>{c=!0,d?.abort(),clearInterval(P),document.removeEventListener("visibilitychange",f)},{once:!0}),w(),{receive(T){a=T,m()}}}const Iu=n=>["running","verifying"].includes(n)?"doing":["completed","recovered"].includes(n)?"done":"todo",Fr=n=>Number.isSafeInteger(n)&&n>0?new Date(n).toLocaleString("id-ID"):"waktu belum tersedia";function Uu(n){return`${typeof n.game=="string"&&n.game?n.game.split("-").map(t=>t.charAt(0).toUpperCase()+t.slice(1)).join(" "):"Game belum diketahui"} · ${n.mode} · ${n.errorClass} · ${n.occurrences} laporan · ${n.jobId?"sudah ditugaskan":"menunggu skill koordinator dan agent"} · belum terverifikasi`}function Nu(n){const e=n.receipt||{},t=e.verification||{},i=n.kind==="availability",r=n.source==="gameplay-monitor"&&n.backend==="isolated-synthetic",s={queued:"Menunggu agen perbaikan",running:"Agen sedang memperbaiki",verifying:"Menunggu verifikasi setelah perbaikan",blocked:"Terhalang · "+(e.summary||"alasan belum tersedia"),failed:"Perbaikan belum berhasil · "+(e.summary||"lihat bukti"),completed:i?"Akses HTTP terverifikasi":"Perbaikan terverifikasi",recovered:"Pulih terverifikasi · tanpa klaim perbaikan"},a=[...r?["Sumber: uji browser terisolasi dengan akun/materi sintetis.","Skenario: "+n.scenarioId+"; checkpoint terakhir: "+n.checkpoint+"."]:[],"Penyebab: "+(e.rootCause||"belum ditemukan"),"Commit: "+(e.patchSha||"belum tersedia"),e.tests&&Number.isSafeInteger(e.tests.passed)&&Number.isSafeInteger(e.tests.failed)?`Pengujian: ${e.tests.passed} lulus · ${e.tests.failed} gagal`:"Pengujian: belum tersedia",e.deployedRelease&&Number.isSafeInteger(e.deploymentAt)?`Deploy tercatat: ${Fr(e.deploymentAt)} · rilis ${e.deployedRelease}`:"Deploy: belum ada bukti"];t.passed===!0&&a.push(i?`Verifikasi HTTP: ${t.path||n.path||"jalur belum tersedia"} · ${Fr(t.at)}`:t.gameplayPassed===!0?`Skenario gameplay: ${t.scenario||"belum dicatat"} · ${Fr(t.at)}`:`Verifikasi identitas rilis: ${Fr(t.at)}`),["blocked","failed"].includes(n.status)&&a.push("Penghalang: "+(e.summary||"alasan belum tersedia")),a.push(...e.evidence||[n.code||n.errorClass||"Laporan diterima"]);const o=i?"Verifikasi HTTP belum membuktikan gameplay, login, room, atau skor.":n.kind==="monitor"?"Verifikasi identitas rilis belum membuktikan gameplay.":r?"Uji terisolasi tidak membuktikan integrasi akun/AI produksi atau seluruh perangkat. Cakupan mengikuti skenario yang tercatat.":"Cakupan pengujian mengikuti bukti dan skenario yang tercatat.",c=["blocked","failed"].includes(n.status)?["Selesaikan penghalang yang tercatat sebelum mencoba perbaikan kembali."]:n.status==="queued"?["Menunggu agen terjadwal mengambil tugas."]:n.status==="verifying"?["Menunggu pengamatan baru yang cocok dengan bukti deploy."]:[];return{...n,source:"repair",skill:{id:"bug-repair",version:1},result:{summary:s[n.status]||"Status belum diketahui",scope:i?"Pemeriksaan akses HTTP pada jalur yang dilaporkan.":r?"Perbaikan kegagalan skenario browser terisolasi. Selesai memerlukan bukti pengujian sesuai cakupan dan versi.":"Perbaikan bug oleh agen ChatGPT. Selesai memerlukan bukti dan pemeriksaan produksi.",evidence:a,nextSteps:c,limitations:o}}}function Fu({pending:n=!1,failures:e=0,hidden:t=!1,offline:i=!1,session:r=!1}={}){return t||i||r?null:Math.min(12e4,(n?5e3:3e4)*2**Math.min(e,3))}function Ou({announce:n}){const e=b=>document.querySelector(b),t=new Map,i={queued:"Menunggu worker",running:"Sedang diperiksa",completed:"Pemeriksaan selesai",blocked:"Terhalang",failed:"Pemeriksaan gagal"};let r=null,s=!1,a=!1,o=!1,c=0,l,d,h=null,u=null,m="";try{const b=JSON.parse(sessionStorage.getItem("kip-pending-task"));b&&typeof b.taskId=="string"&&/^[a-f0-9-]{36}$/i.test(b.requestId)&&(h=b)}catch{}const S=(b,v="submission")=>{m=v,e("#task-notice").textContent=b},w=()=>{try{h?sessionStorage.setItem("kip-pending-task",JSON.stringify(h)):sessionStorage.removeItem("kip-pending-task")}catch{}};function g(b){u=b.id,e("#task-result-title").textContent=b.title,e("#task-result-summary").textContent=b.result?.summary||i[b.status],e("#task-result-meta").textContent=`${b.agentId} · ${b.skill.id} v${b.skill.version} · ${new Date(b.updatedAt).toLocaleString("id-ID")}`,e("#task-result-boundary").textContent=b.result?.scope||"Pemeriksaan baca saja. Hasil diagnosis tidak berarti bug sudah diperbaiki.";const v=(x,p)=>{e(x).replaceChildren(...(p||[]).map(y=>{const A=document.createElement("li");return A.textContent=String(y),A}))};v("#task-result-evidence",b.result?.evidence),v("#task-result-next",b.result?.nextSteps),v("#task-result-history",b.history.map(x=>`${new Date(x.at).toLocaleString("id-ID")} · ${i[x.event]||x.event}`)),e("#task-result-limit").textContent=b.result?.limitations||""}function f(){e("#task-run").disabled=s||o||!r,e("#task-select").disabled=s||o||!!h||!r,e("#task-run").textContent=h?"Coba kirim ulang":"Jalankan",e("#task-worker").textContent=r?.repairs?.executor?.configured?"Antrean otomatis · agen perbaikan setiap jam":r?.worker.status==="running"&&Date.now()-r.worker.lastAt<2e4?"Pemantau tersambung · agen perbaikan belum tersambung":"Worker belum terverifikasi",e("#incident-list").replaceChildren(...(r?.incidents||[]).map(b=>{const v=document.createElement("li");return v.textContent=Uu(b),v}));for(const b of r?.jobs||[]){let v=t.get(b.id);if(!v){v=document.createElement("article"),v.className="job-card";const x=document.createElement("p"),p=document.createElement("h3"),y=document.createElement("p"),A=document.createElement("p"),L=document.createElement("div"),B=document.createElement("button");x.className="job-owner",p.className="task-title",y.className="job-result",A.className="job-time",L.className="job-actions",B.textContent="Lihat hasil",B.onclick=()=>{const D=r.jobs.find(N=>N.id===b.id);D&&(g(D),e("#task-result").showModal())},L.append(B),v.append(x,p,y,A,L),t.set(b.id,v)}v.querySelector(".job-owner").textContent=b.agentId+" · "+(b.source==="repair"?"Perbaikan otomatis":b.source==="incident"?"Diagnosis laporan game":"Pemeriksaan Anda"),v.querySelector("h3").textContent=b.title,v.querySelector(".job-result").textContent=b.result?.summary||i[b.status],v.querySelector(".job-time").textContent=new Date(b.updatedAt).toLocaleString("id-ID")+" · "+b.skill.id+" v"+b.skill.version,v.dataset.tone=b.status==="completed"?"good":"pending",e("#jobs-"+Iu(b.status)).append(v)}for(const[b,v]of t)r?.jobs.some(x=>x.id===b)||(v.remove(),t.delete(b));if(u&&e("#task-result").open){const b=r?.jobs.find(v=>v.id===u);b&&g(b)}cc()}async function P(b){d=new AbortController;const v=setTimeout(()=>d?.abort(),1e4);try{const x=await fetch("/agent-office/api/jobs",{method:b?"POST":"GET",credentials:"same-origin",cache:"no-store",headers:b?{"Content-Type":"application/json"}:void 0,body:b?JSON.stringify(b):void 0,signal:d.signal}),p=await x.json();if(x.status===401&&(o=!0),!x.ok){const y=Error(p.error||"TASKS_UNAVAILABLE");throw y.status=x.status,y}return p}finally{clearTimeout(v),d=null}}function T(){clearTimeout(l);const b=Fu({pending:r?.jobs.some(v=>["queued","running","verifying"].includes(v.status)),failures:c,hidden:document.hidden||e("#view-board").hidden,offline:navigator.onLine===!1,session:o});!a&&b&&(l=setTimeout(M,b))}async function M(){if(!(s||a||document.hidden||navigator.onLine===!1||o)){s=!0;try{const b=await P();if(b.schemaVersion!==1||!Array.isArray(b.jobs)||!Array.isArray(b.catalog))throw Error();b.jobs=[...(b.repairs?.jobs||[]).map(Nu),...b.jobs],r=b,c=0,m==="refresh"&&S("","refresh");const v=h?.taskId||e("#task-select").value;e("#task-select").replaceChildren(...r.catalog.map(x=>new Option(x.title,x.id))),[...e("#task-select").options].some(x=>x.value===v)&&(e("#task-select").value=v),h&&r.jobs.some(x=>x.requestId===h.requestId)&&(h=null,w(),S("Tugas sudah tersimpan."))}catch{c++,S(o?"Sesi berakhir. Masuk kembali.":"Antrean belum dapat diperbarui. Hasil yang tampil adalah salinan terakhir.","refresh")}finally{s=!1,f(),T()}}}e("#task-run").onclick=async()=>{if(!(s||o||!r)){h??={taskId:e("#task-select").value,requestId:crypto.randomUUID()},w(),s=!0,f();try{await P(h),h=null,w(),S("Tugas tersimpan di antrean."),n("Tugas tersimpan di antrean.")}catch(b){b.status>=400&&b.status<500&&b.status!==429&&(h=null,w()),S(b.message==="TASK_SKILL_UNAVAILABLE"?"Skill aktif belum tersedia untuk tugas ini.":b.message==="REQUEST_ID_CONFLICT"?"Permintaan sudah berubah. Periksa daftar tugas sebelum mencoba lagi.":o?"Sesi berakhir. Masuk kembali.":"Pengiriman belum dapat dipastikan. Coba kirim ulang dengan ID yang sama.")}finally{s=!1,f(),M()}}},e("#task-result-close").onclick=()=>e("#task-result").close(),e("#task-result").addEventListener("close",()=>u=null);const R=()=>{!document.hidden&&!e("#view-board").hidden?M():T()};document.addEventListener("visibilitychange",R),addEventListener("online",R),addEventListener("offline",T),e("#tab-board").addEventListener("click",()=>queueMicrotask(R)),e("#board-refresh").addEventListener("click",M),addEventListener("pagehide",()=>{a=!0,d?.abort(),clearTimeout(l),document.removeEventListener("visibilitychange",R),removeEventListener("online",R),removeEventListener("offline",T)},{once:!0}),M()}const fs={CURRENT:"Bukti terkini",STALE:"Bukti kedaluwarsa",UNAVAILABLE:"Bukti belum tersedia",NOT_RUN:"Belum diuji",PASS:"Lulus untuk skenario tercatat",FAIL:"Skenario gagal",PARTIAL:"Sebagian skenario belum selesai",BLOCKED:"Pengujian terhalang",STALE_RELEASE:"Kode game berubah; perlu diuji ulang",UNVERIFIED_RELEASE:"Versi produksi belum terverifikasi"},Ni=n=>Number.isSafeInteger(n)&&n>=0?n:null,ku=(n,e)=>Number.isSafeInteger(n)&&n>0&&n<=e&&e-n<=72e5,nl=(n,e)=>n&&Object.hasOwn(fs,n.status)?["UNAVAILABLE","NOT_RUN"].includes(n.status)||ku(n.observedAt,e)?n.status:"STALE":"UNAVAILABLE",il=n=>Number.isSafeInteger(n)&&n>=0?n<6e4?"Kurang dari 1 menit":n<36e5?Math.round(n/6e4)+" menit":(n/36e5).toFixed(1)+" jam":"Belum ada perbaikan terverifikasi",Or=n=>Number.isSafeInteger(n)&&n>0?new Date(n).toLocaleString("id-ID",{timeZone:"Asia/Pontianak"})+" WIB":"Belum tersedia";function Bu(n,e=Date.now(),t=!0){const i=n?.schemaVersion===1&&Number.isSafeInteger(n.generatedAt)&&n.generatedAt<=e,r=i?n.sessions:{},s=i?n.synthetic:{},a=i?n.operations:{},o=t&&i?nl(r,e):"UNAVAILABLE",c=t&&i?nl(s,e):"UNAVAILABLE";return{sessions:{status:o,label:fs[o],completed:Ni(r?.completed),started:Ni(r?.started),at:Or(r?.observedAt),windowStart:Or(r?.windowStart),windowEnd:Or(r?.windowEnd),games:Array.isArray(r?.games)?[...r.games].sort((l,d)=>d.started-l.started||l.game.localeCompare(d.game)):[]},synthetic:{status:c,label:fs[c],completed:Ni(s?.completedSessions),at:Or(s?.observedAt),scenarios:Array.isArray(s?.scenarios)?s.scenarios:[]},operations:{repeated:Ni(a?.repeatedErrors),open:Ni(a?.openJobs),verified:Ni(a?.verifiedRepairs),mean:il(a?.meanResolutionMs),median:il(a?.medianResolutionMs)},untested:Array.isArray(n?.coverage)?n.coverage.filter(l=>l.status==="NOT_RUN").map(l=>l.game):[]}}function zu({failures:n=0,hidden:e=!1,offline:t=!1,session:i=!1}={}){return e||t||i?null:Math.min(3e5,6e4*2**Math.min(n,3))}function Gu(){const n=P=>document.querySelector(P);let e=null,t=!1,i=!1,r=!1,s=!1,a=0,o,c;const l=(P,T)=>{n(P).textContent=T},d=P=>{const T=document.createElement("td");return T.textContent=String(P??"—"),T},h=(P,T)=>{n(P).replaceChildren(...T.map(M=>{const R=document.createElement("tr");return R.append(...M.map(d)),R}))};function u(){const P=Bu(e,Date.now(),t),T=P.sessions,M=P.synthetic,R=P.operations;l("#gameplay-sessions",T.completed??"—"),l("#gameplay-session-status",T.label+" · "+(T.started??"—")+" dimulai"),l("#gameplay-synthetic",M.completed??"—"),l("#gameplay-synthetic-status",M.label),n("#gameplay-synthetic-status").dataset.status=M.status,l("#gameplay-errors",R.repeated??"—"),l("#gameplay-error-status",(R.open??"—")+" tugas belum selesai"),l("#gameplay-duration",R.mean),l("#gameplay-duration-status",(R.verified??"—")+" perbaikan terverifikasi · median "+R.median),l("#gameplay-session-time","Periode: "+T.windowStart+" — "+T.windowEnd+". Diambil: "+T.at+"."),l("#gameplay-synthetic-time","Pengujian terakhir: "+M.at+". Mode tanpa skenario di bawah belum diuji."),l("#gameplay-session-count",T.games.length+" game memiliki sesi materi tercatat"),l("#gameplay-scenario-count",M.scenarios.length+" skenario browser terisolasi"),h("#gameplay-game-rows",T.games.map(b=>[b.game,b.started,b.completed])),h("#gameplay-scenario-rows",M.scenarios.map(b=>[b.game,b.mode==="screen"?"Satu layar":"Room bersama",fs[b.status]||"Belum diketahui",b.completedSessions])),l("#gameplay-untested",P.untested.length?"Game tanpa skenario tercatat: "+P.untested.join(", ")+".":"Cakupan mengikuti daftar skenario; tidak menyatakan seluruh game atau mode sudah diuji.")}function m(){clearTimeout(o);const P=zu({failures:a,hidden:document.hidden||n("#view-board").hidden,offline:navigator.onLine===!1,session:s});!r&&P&&(o=setTimeout(S,P))}async function S(){if(i||r||document.hidden||n("#view-board").hidden||navigator.onLine===!1||s){m();return}i=!0,c=new AbortController;const P=setTimeout(()=>c?.abort(),1e4);try{const T=await fetch("/agent-office/api/gameplay",{credentials:"same-origin",cache:"no-store",signal:c.signal});if(T.status===401&&(s=!0),!T.ok)throw Error("GAMEPLAY_UNAVAILABLE");const M=await T.json();if(M?.schemaVersion!==1||!M.sessions||!M.synthetic||!M.operations||!Array.isArray(M.coverage))throw Error("GAMEPLAY_UNAVAILABLE");e=M,t=!0,a=0,l("#gameplay-notice","")}catch{t=!1,a++,l("#gameplay-notice",s?"Sesi berakhir. Masuk kembali.":"Bukti gameplay belum dapat diperbarui. Angka yang tersisa adalah salinan terakhir.")}finally{clearTimeout(P),c=null,i=!1,u(),m()}}const w=()=>{u(),S()},g=()=>{t=!1,u(),m()},f=()=>queueMicrotask(w);return document.addEventListener("visibilitychange",w),addEventListener("online",w),addEventListener("offline",g),n("#tab-board").addEventListener("click",f),n("#board-refresh").addEventListener("click",w),addEventListener("pagehide",()=>{r=!0,c?.abort(),clearTimeout(o),document.removeEventListener("visibilitychange",w),removeEventListener("online",w),removeEventListener("offline",g),n("#tab-board").removeEventListener("click",f),n("#board-refresh").removeEventListener("click",w)},{once:!0}),u(),S(),{refresh:S}}const $i={ACTIVE:"Aktif sesuai cakupan",PARTIAL:"Sebagian terbukti",BLOCKED:"Terhalang",PLANNED:"Direncanakan",HISTORICAL:"Bukti historis",UNKNOWN:"Belum terverifikasi",HEALTHY:"Sehat",DEGRADED:"Perlu diperiksa",INCIDENT:"Ada gangguan",RECOVERING:"Sedang pulih"},as={current:"Bukti terkini",historical:"Bukti historis",unknown:"Belum diketahui"},Vu="https://games.kampunginggrispontianak.com/dashboard.html#fun",Ca=n=>Number.isSafeInteger(n)&&n>=0,Gn=n=>new Intl.NumberFormat("id-ID").format(n);function aa(n){if(!n||n.kind!=="growth"||!["registeredToday","totalRegistered","activeToday","recent5m","excludedTestAccounts"].every(t=>Ca(n[t]))||n.registeredToday>n.totalRegistered||n.activeToday>n.totalRegistered||n.recent5m>n.totalRegistered||n.timezone!=="Asia/Pontianak"||n.activityWindowMinutes!==5||n.testExclusion!=="MARKED_ONLY"||n.scope!=="PUBLIC_ACCOUNTS"||n.activityCoverage!=="OBSERVED_DEVICE_ACTIVITY"||!Ca(n.dayStart)||!Ca(n.dayEnd)||n.dayEnd-n.dayStart!==864e5||typeof n.localDate!="string"||!/^\d{4}-\d\d-\d\d$/.test(n.localDate))return!1;const e=new Date(n.dayStart+7*36e5);return Number.isFinite(e.getTime())&&e.toISOString()===n.localDate+"T00:00:00.000Z"}function Hu(n){return aa(n)?[["Pendaftar hari ini",Gn(n.registeredToday)],["Total pendaftar publik",Gn(n.totalRegistered)],["Akun aktif tercatat hari ini",Gn(n.activeToday)],["Akun beraktivitas ≤5 menit",Gn(n.recent5m)],["Pemain aktif sekarang","UNKNOWN"]]:[]}function Wu(n){return aa(n)?[`Tanggal laporan: ${new Intl.DateTimeFormat("id-ID",{timeZone:"Asia/Pontianak",day:"2-digit",month:"long",year:"numeric"}).format(n.dayStart)} · WIB. “Hari ini” mengikuti tanggal laporan.`,"Aktivitas menghitung akun publik unik dari waktu aktivitas perangkat. Satu akun dengan beberapa perangkat tetap dihitung sekali. Akun internal dan pengunjung anonim tidak termasuk.","Pemain aktif sekarang: UNKNOWN. Sumber status permainan dan kehadiran peserta belum terhubung; aktivitas perangkat tidak membuktikan sedang bermain.","Catatan perangkat diperbarui paling cepat tiap 5 menit. Jendela ≤5 menit dihitung mundur dari waktu bukti; ini indikasi aktivitas terbaru, bukan kepastian sedang online.",`${Gn(n.excludedTestAccounts)} akun uji bertanda dikecualikan. Akun uji yang belum bertanda masih mungkin terhitung.`]:[]}function uc(n,e,t=Date.now(),i=!0){const r={id:e,status:"UNKNOWN",recordedStatus:null,freshness:"unknown",lastAt:null,maxAgeMs:null,source:"unavailable",scope:"Cakupan belum dapat diverifikasi.",blocker:"Bukti belum tersedia atau tidak valid.",evidence:[],capabilities:[],metrics:null};if(n?.schemaVersion!==1||!Number.isSafeInteger(n.generatedAt)||n.generatedAt>t||!Array.isArray(n.roles))return r;const s=n.roles.filter(o=>o?.id===e),a=s.length===1?s[0]:null;return!a||!Object.hasOwn($i,a.status)||!["current","historical","unknown"].includes(a.freshness)||!Number.isSafeInteger(a.lastAt)||a.lastAt>t||a.lastAt<0||!Number.isSafeInteger(a.maxAgeMs)||a.maxAgeMs<=0||a.maxAgeMs>2592e6||!Array.isArray(a.evidence)||!Array.isArray(a.capabilities)||typeof a.scope!="string"||typeof a.blocker!="string"||e==="growth-stats"&&a.metrics!==null&&a.metrics?.kind!=="growth"||a.metrics?.kind==="growth"&&(e!=="growth-stats"||!aa(a.metrics)||a.maxAgeMs!==12e4||a.lastAt<a.metrics.dayStart||a.lastAt>=a.metrics.dayEnd)?r:i?a.freshness==="unknown"?{...a,status:"UNKNOWN"}:t-a.lastAt>a.maxAgeMs||a.freshness==="historical"||a.metrics?.kind==="growth"&&t>=a.metrics.dayEnd?{...a,status:"HISTORICAL",freshness:"historical"}:a:{...a,status:"UNKNOWN",freshness:"unknown",blocker:"Koneksi laporan terputus. Bukti tersimpan bukan kondisi saat ini. "+a.blocker}}function rl(n){return Number.isSafeInteger(n)&&n>=0?new Intl.DateTimeFormat("id-ID",{timeZone:"Asia/Pontianak",day:"2-digit",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!1}).format(n)+" WIB":"Belum ada bukti"}function sl(n){return n?n.kind==="growth"?aa(n)?`${Gn(n.registeredToday)} pendaftar hari ini · ${Gn(n.totalRegistered)} total publik · ${Gn(n.activeToday)} akun beraktivitas tercatat hari ini · ${Gn(n.recent5m)} dalam ≤5 menit`:"Metrik pertumbuhan belum tersedia.":`CPU ${n.cpu.usagePct.toFixed(2)}% · RAM ${n.ram.usedPct.toFixed(2)}% · Disk ${n.disk.usedPct.toFixed(2)}%`:""}const Ai=[{id:"coordinator",name:"Koordinator tim",short:"KT",color:"#9787bd",desk:[-9,0,-2.5]},{id:"health",name:"Pemantau layanan",short:"PL",color:"#629893",desk:[-2.1,0,-1.9]},{id:"release",name:"Penjaga rilis",short:"PR",color:"#9f927f",desk:[.3,0,-1.9]},{id:"capacity",name:"Penjaga kapasitas",short:"KP",color:"#6b9ed0",desk:[2.6,0,-3.7]},{id:"qa",name:"Penguji permainan",short:"QA",color:"#d5ab63",desk:[6.5,0,-2.6]},{id:"accounts",name:"Penjaga akun",short:"AK",color:"#73b9a6",desk:[9.8,0,-2.6]},{id:"security",name:"Penjaga keamanan",short:"KM",color:"#758fc3",desk:[-10.7,0,5.9]},{id:"backup",name:"Penjaga backup",short:"BK",color:"#c98d72",desk:[-7.5,0,5.9]},{id:"content",name:"Kurator bank materi",short:"MT",color:"#b092c9",desk:[-.7,0,5.7]},{id:"payments",name:"Penjaga pembayaran",short:"PB",color:"#cfac63",desk:[6.2,0,5.6]},{id:"support",name:"Pendamping pelanggan",short:"BP",color:"#c88daa",desk:[9.5,0,5.6]},{id:"growth",name:"Pengembang pertumbuhan",short:"PT",color:"#65b0a7",desk:[8.6,0,8.2]},{id:"growth-stats",name:"Statistik Game",short:"SG",color:"#65b9d2",desk:[6.2,0,8.2]},{id:"instagram-admin",name:"AI Admin KIP",short:"DM",color:"#a575db",desk:[11,0,8.2]}];for(const n of oc)Object.assign(Ai.find(e=>e.id===n.id),n,{floor:2});const dc=Ai.filter(n=>!["health","release"].includes(n.id)),al=n=>n==="health"||n==="release";function Xu(n,e=Date.now(),t=!0){return dc.map(i=>{const r=uc(n,i.id,e,t);return{...r,name:i.name,label:$i[r.status]+" · "+as[r.freshness],tone:["ACTIVE","HEALTHY"].includes(r.status)&&r.freshness==="current"?"good":["PARTIAL","BLOCKED","DEGRADED","INCIDENT"].includes(r.status)?"attention":"unknown",canRest:!oc.some(s=>s.id===i.id)&&["ACTIVE","HEALTHY"].includes(r.status)&&r.freshness==="current"}})}const Pa=dc.map(n=>[n.id,n.name,n.short]),ol=n=>["ACTIVE","HEALTHY"].includes(n)?"good":["PARTIAL","BLOCKED","DEGRADED","INCIDENT"].includes(n)?"attention":"unknown";function qu({getOffice:n=()=>null,focusAgent:e=()=>{}}={}){const t=M=>document.querySelector(M),i=new Map,r=t("#role-evidence-dialog");let s=null,a=!1,o="capacity",c=!1,l=!1,d=!1,h=null;for(const[M,R,b]of Pa){const v=document.createElement("button");v.className="observer-card",v.dataset.role=M,v.setAttribute("aria-haspopup","dialog"),v.innerHTML='<span class="agent-monogram"></span><span class="agent-summary"><b></b><span class="agent-result"></span><span class="agent-checked"></span><span class="agent-activity"></span></span><span class="report-arrow" aria-hidden="true">↗</span>',v.querySelector(".agent-monogram").textContent=b,v.querySelector("b").textContent=R,v.onclick=()=>u(M),i.set(M,v),t(M==="coordinator"||M==="capacity"||M==="growth-stats"?"#role-primary-cards":"#role-audit-cards").append(v)}function u(M){i.has(M)&&(o=M,S(),r.open||r.showModal())}const m=M=>uc(s,M,Date.now(),a);function S(){const M=m(o);t("#role-evidence-name").textContent=Pa.find(v=>v[0]===o)[1],t("#role-evidence-status").textContent=$i[M.status]+" · "+as[M.freshness],t("#role-evidence-status").dataset.tone=ol(M.status),t("#role-evidence-scope").textContent=M.scope,t("#role-evidence-blocker").textContent=M.blocker||"Tidak ada kendala tambahan tercatat. Cakupan tetap terbatas pada bukti di atas.";const R={time:rl(M.lastAt),source:M.source==="unavailable"?"Belum tersedia":M.source,expiry:M.maxAgeMs?M.maxAgeMs<36e5?Math.round(M.maxAgeMs/1e3)+" detik":Math.round(M.maxAgeMs/36e5)+" jam":"Belum tersedia",recorded:$i[M.recordedStatus]||"Belum tersedia"};for(const[v,x]of Object.entries(R))t("#role-evidence-"+v).textContent=x;for(const v of["capabilities","evidence"])t("#role-evidence-"+v).replaceChildren(...(M[v].length?M[v]:["Belum tersedia."]).map(x=>{const p=document.createElement("li");return p.textContent=x,p}));const b=t("#role-evidence-metrics");if(b.replaceChildren(),o==="instagram-admin"){const v=document.createElement("p");v.textContent="@kampunginggrispontianak · DM saja · Balasan otomatis belum aktif";const x=document.createElement("button");x.type="button",x.className="report-button",x.textContent="Kelola panduan DM",x.onclick=()=>{r.close(),location.hash="#agent-skill",dispatchEvent(new CustomEvent("office:agent-select",{detail:{id:"instagram-admin"}}))},b.append(v,x)}if(o==="growth-stats"){const v=document.createElement("a");v.className="report-button",v.textContent="Buka dashboard game",v.setAttribute("href",Vu),v.setAttribute("target","_blank"),v.setAttribute("rel","noopener noreferrer");const x=document.createElement("p");x.textContent="Tautan membuka game KIP. Ketersediaan statistik otomatis tetap mengikuti bukti dan status koneksi di bawah.",b.append(v,x)}if(M.metrics){const v=document.createElement("p");if(v.textContent=(M.metrics.kind==="growth"?"Pendaftaran & aktivitas":sl(M.metrics))+" · "+as[M.freshness],b.append(v),M.metrics.kind==="growth"){const x=document.createElement("dl");x.className="growth-metrics";for(const[p,y]of Hu(M.metrics)){const A=document.createElement("div"),L=document.createElement("dt"),B=document.createElement("dd");L.textContent=p,B.textContent=y,A.append(L,B),x.append(A)}b.append(x);for(const p of Wu(M.metrics)){const y=document.createElement("p");y.textContent=p,b.append(y)}}else for(const x of[`CPU: ${M.metrics.cpu.count} inti.`,`RAM: ${(M.metrics.ram.usedBytes/2**30).toFixed(2)} / ${(M.metrics.ram.totalBytes/2**30).toFixed(2)} GiB.`,`Disk: ${(M.metrics.disk.usedBytes/2**30).toFixed(2)} / ${(M.metrics.disk.totalBytes/2**30).toFixed(2)} GiB. ${M.metrics.disk.label}.`,`Interval sampel: ${M.metrics.intervalSeconds} detik. Uptime: ${Math.round(M.metrics.uptimeSeconds/3600)} jam.`]){const p=document.createElement("p");p.textContent=x,b.append(p)}}}function w(){if(!l){n()?.updateAgents(Xu(s,Date.now(),a));for(const[M,R]of Pa){const b=m(M),v=i.get(M);v.dataset.tone=ol(b.status),v.querySelector(".agent-result").textContent=$i[b.status]+" · "+as[b.freshness],v.querySelector(".agent-checked").textContent=rl(b.lastAt),v.querySelector(".agent-activity").textContent=b.metrics?sl(b.metrics):b.scope,v.setAttribute("aria-label",R+". "+$i[b.status]+". Buka bukti dan batas cakupan.")}t("#refresh-roles").disabled=c||d,t("#role-connection").textContent=d?"Sesi berakhir. Masuk kembali.":a?"Bukti dibaca setiap 30 detik; masa berlaku mengikuti tiap catatan.":c?"Membaca bukti peran…":"Bukti peran belum tersedia. Status tidak diasumsikan aktif.",r.open&&S()}}async function g(){if(c||l||d||document.hidden)return;c=!0,h=new AbortController;const M=setTimeout(()=>h?.abort(),8e3);w();try{const R=await fetch("/agent-office/api/roles",{credentials:"same-origin",cache:"no-store",signal:h.signal});if(R.status===401)throw d=!0,Error();if(!R.ok)throw Error();const b=await R.json();if(b?.schemaVersion!==1||!Array.isArray(b.roles))throw Error();s=b,a=!0}catch{a=!1}finally{clearTimeout(M),h=null,c=!1,w()}}t("#role-evidence-focus").onclick=()=>{r.close(),e(o)},t("#refresh-roles").onclick=g,t("#role-evidence-close").onclick=()=>r.close();const f=()=>{document.hidden||(w(),g())};document.addEventListener("visibilitychange",f);const P=setInterval(g,3e4),T=setInterval(()=>{document.hidden||w()},1e3);return addEventListener("pagehide",()=>{l=!0,h?.abort(),clearInterval(P),clearInterval(T),document.removeEventListener("visibilitychange",f)},{once:!0}),w(),g(),{open:u,refresh:g}}function Yu({announce:n}){const e=a=>document.querySelector(a);let t=null;function i(a){history.replaceState(null,"",a==="board"?"#papan":"#kantor");for(const o of["office","board"])e("#view-"+o).hidden=o!==a,e("#tab-"+o).setAttribute("aria-pressed",String(o===a));a==="office"&&dispatchEvent(new Event("resize"))}e(".skip").onclick=a=>{a.preventDefault(),i("office"),e("#office").focus()},e("#tab-office").onclick=()=>i("office"),e("#tab-board").onclick=()=>i("board");function r(){const a=!!document.fullscreenElement||document.body.classList.contains("focus-mode");e("#fullscreen").textContent=a?"Exit":"Full screen",e("#fullscreen").setAttribute("aria-label",a?"Exit · keluar dari layar penuh":"Full screen · layar penuh"),e("#fullscreen").setAttribute("aria-pressed",String(a))}async function s(){if(document.fullscreenElement)try{await document.exitFullscreen()}catch{n("Tekan Esc untuk keluar dari layar penuh.");return}document.body.classList.remove("focus-mode"),r(),t?.focus({preventScroll:!0})}return e("#fullscreen").onclick=async()=>{if(document.fullscreenElement||document.body.classList.contains("focus-mode"))return s();t=document.activeElement;try{if(!document.documentElement.requestFullscreen)throw Error();await document.documentElement.requestFullscreen()}catch{document.body.classList.add("focus-mode"),n("Mode layar penuh halaman. Tekan Exit untuk kembali.")}r()},document.addEventListener("fullscreenchange",()=>{r(),dispatchEvent(new Event("resize")),document.fullscreenElement||t?.focus({preventScroll:!0})}),document.addEventListener("keydown",a=>{a.key==="Escape"&&document.body.classList.contains("focus-mode")&&s()}),r(),i(location.hash==="#papan"?"board":"office"),{show:i}}const ps=[{id:"command",title:"Pusat koordinasi",subtitle:"Rencana & arah tim",icon:"compass",seats:1,x:-8.6,z:-4.7,description:"Meja koordinator, papan rencana, dan sudut diskusi untuk menyatukan prioritas.",roles:["Koordinator tim"]},{id:"infrastructure",title:"Server & operasi",subtitle:"Layanan, rilis & kapasitas",icon:"server",seats:3,x:0,z:-4.7,description:"Tiga meja operasional dan rak server. Tiga robot terhubung ke hasil Pemantau layanan, Penjaga rilis, dan Penjaga kapasitas. Klik karakter untuk membaca laporan serta waktu pemeriksaannya.",roles:["Pemantau layanan","Penjaga versi rilis","Penjaga kapasitas"]},{id:"qa_lab",title:"Lab pengujian",subtitle:"Game, login & akses",icon:"cube",seats:2,x:8.6,z:-4.7,description:"Dua meja uji, layar presentasi, dan perangkat contoh untuk meninjau pengalaman guru serta siswa.",roles:["Penguji permainan","Penjaga akun"]},{id:"security",title:"Keamanan & backup",subtitle:"Perlindungan & pemulihan",icon:"shield",seats:2,x:-8.6,z:4.7,description:"Dua meja khusus, lemari arsip, dan unit cadangan dalam area dengan partisi kaca.",roles:["Penjaga keamanan","Penjaga backup"]},{id:"content",title:"Studio materi",subtitle:"Ide & materi belajar",icon:"book",seats:1,x:0,z:4.7,description:"Studio yang hangat dengan perpustakaan kecil, meja kreatif, mikrofon, dan sudut membaca.",roles:["Kurator bank materi"]},{id:"customers",title:"Pelanggan & pertumbuhan",subtitle:"Bantuan, pilot & statistik game",icon:"growth",seats:5,x:8.6,z:4.7,description:"Lima meja untuk bantuan guru, transaksi uji, pilot komunitas, statistik game, dan AI Admin KIP khusus DM Instagram.",roles:["Penjaga pembayaran","Pendamping pelanggan","Pengembang pertumbuhan","Statistik Game","AI Admin KIP"]}],Ku=[{id:"boardroom",title:"Tim Game & IT",subtitle:"Pemantau, teknisi & penguji",icon:"compass",seats:8,x:-7,z:-3,description:"Meja rapat walnut delapan kursi dan layar presentasi. Tempat meninjau hasil serta rencana tim.",roles:["Pemantau Game","Teknisi IT","Teknisi Tampilan","Teknisi Server","Penguji Game"]},{id:"lounge",title:"Sky lounge",subtitle:"Percakapan & ide baru",icon:"coffee",seats:6,x:5,z:3,description:"Sofa modular, meja kopi rendah, dan karpet hangat. Ruang informal untuk bertukar ide.",roles:["Diskusi","Refleksi"]},{id:"bar",title:"Coffee bar",subtitle:"Rehat sejenak",icon:"cup",seats:4,x:6,z:-5,description:"Bar walnut, empat kursi tinggi, serta rak terbuka dengan pencahayaan lembut.",roles:["Rehat","Kolaborasi informal"]},{id:"terrace",title:"Teras hijau",subtitle:"Cahaya & ruang bernapas",icon:"leaf",seats:4,x:-7,z:5,description:"Area duduk terbuka di antara tanaman, dengan railing kaca menghadap lanskap kota.",roles:["Taman","Ruang terbuka"]}],Zu=[{id:"karaoke",title:"Karaoke room",subtitle:"Musik & panggung kecil",icon:"music",x:-7.4,z:-4.8,description:"Ruang karaoke dengan layar lirik, dua mikrofon, speaker, panel akustik walnut, dan sofa untuk berkumpul.",roles:["Panggung","Sofa bersama","Ruang kedap visual"]},{id:"gym",title:"Gym & wellness",subtitle:"Gerak & energi baru",icon:"gym",x:6,z:-4.8,description:"Area gym dengan treadmill, sepeda statis, bangku latihan, dumbbell, dan matras. Partisi kaca menjaga kesan terbuka.",roles:["Cardio","Latihan beban","Peregangan"]},{id:"pool",title:"Kolam renang",subtitle:"Pool deck & sun loungers",icon:"pool",x:6,z:4.6,description:"Kolam bernuansa turquoise dengan tangga masuk, dek walnut, kursi santai, dan pagar kaca di tepi gedung.",roles:["Kolam","Dek santai","Tanaman"]},{id:"games",title:"Mini game lounge",subtitle:"Biliar, arcade & konsol",icon:"game",x:-7.2,z:4.7,description:"Area rekreasi dengan meja biliar, dua mesin arcade, serta sudut konsol dan sofa. Peralatan merupakan bagian dari model visual.",roles:["Biliar","Arcade","Konsol"]}],$u=[{id:"arrival",title:"Jalan & gerbang",subtitle:"Akses kantor & pagar keliling",icon:"route",x:-2,z:19,description:"Jalan beraspal dengan marka, trotoar, gerbang terbuka, pagar keliling, dan jalur menuju pintu tangga kantor.",roles:["Jalan masuk","Pagar","Lampu taman"]},{id:"garden",title:"Taman pinus & mawar",subtitle:"Hijau, warna, dan ruang rehat",icon:"leaf",x:-13,z:15,description:"Deretan pohon pinus, bedeng mawar merah, merah muda dan krem, bangku taman, serta jalur pedestrian mengelilingi halaman.",roles:["Pinus","Mawar","Bangku taman"]},{id:"beach",title:"Pantai pasir putih",subtitle:"Laut turquoise & dek kayu",icon:"waves",x:30,z:5.5,description:"Pantai di sisi kanan kantor dengan pasir putih, ombak lembut berbentuk geometri, dek kayu, payung dan kursi santai. Jalur kayu melewati pintu pagar pantai.",roles:["Pasir putih","Boardwalk","Tepi laut"]},{id:"mountains",title:"Pegunungan belakang",subtitle:"Lapis bukit & hutan pinus",icon:"mountain",x:-15,z:-35,description:"Punggung gunung berlapis di belakang kantor, dengan warna yang semakin lembut ke kejauhan dan pohon pinus di kaki bukit. Lingkungan ini adalah lanskap imajinatif.",roles:["Pegunungan","Perbukitan","Lanskap konsep"]}],ms={external:"M7 5H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2M13 3h8v8M21 3 10 14",eye:"M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Z M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0",layers:"m12 3 10 5-10 5L2 8l10-5Zm-9 10 9 5 9-5M3 18l9 5 9-5",sun:"M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0",moon:"M20 14a8 8 0 0 1-10-10A9 9 0 1 0 20 14Z",left:"m14 6-6 6 6 6",right:"m10 6 6 6-6 6",minus:"M5 12h14",plus:"M5 12h14M12 5v14",frame:"M8 3H3v5m13-5h5v5M3 16v5h5m8 0h5v-5M9 9h6v6H9Z",expand:"M8 3H3v5m13-5h5v5M3 16v5h5m8 0h5v-5",mouse:"M8 3h8a3 3 0 0 1 3 3v11a5 5 0 0 1-5 5h-4a5 5 0 0 1-5-5V6a3 3 0 0 1 3-3ZM12 3v7",play:"m8 4 12 8-12 8V4Z",pause:"M8 5v14M16 5v14",compass:"M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-6-3-2 4-4 2 2-4 4-2Z",server:"M4 3h16v7H4ZM4 14h16v7H4ZM7 6.5h.1m-.1 11h.1M11 6.5h6m-6 11h6",cube:"m12 3 9 5v9l-9 5-9-5V8l9-5Zm0 10 9-5M12 13 3 8m9 5v9",shield:"M12 3 3 7v5c0 5 9 10 9 10s9-5 9-10V7l-9-4Zm-5 9 3 3 7-7",book:"M12 5v16M12 5C8 2 3 3 3 3v16s5-1 9 2c4-3 9-2 9-2V3s-5-1-9 2",growth:"m3 17 6-6 4 4 8-10M15 5h6v6M3 22h18",coffee:"M4 8h13v9a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V8Zm13 1h2a3 3 0 0 1 0 6h-2M7 2v3m5-3v3",cup:"M4 8h13v9a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V8Zm13 1h2a3 3 0 0 1 0 6h-2M7 2v3m5-3v3",leaf:"M20 3C10 2 3 6 3 13a7 7 0 0 0 7 7C17 20 21 13 20 3ZM4 20 15 9"};Object.assign(ms,{music:"M9 18V5l11-2v13M9 8l11-2M9 18a3 3 0 1 1-3-3c1.7 0 3 1.3 3 3Zm11-2a3 3 0 1 1-3-3c1.7 0 3 1.3 3 3Z",gym:"m6 6 12 12M4 8l4-4M2 6l4-4M16 20l4-4M18 22l4-4",pool:"M3 20c3-3 3 3 6 0s3 3 6 0 3 3 6 0M5 16V5a2 2 0 0 1 4 0M15 16V5a2 2 0 0 1 4 0M5 8h10M5 13h10",game:"M6 7h12l3 10a2 2 0 0 1-3 2l-3-3H9l-3 3a2 2 0 0 1-3-2L6 7ZM6 11h5M8.5 8.5v5M16 11h.01M18 14h.01",stairs:"M3 21v-6h6V9h6V3h6M3 10l14-8M7 21h14V7"});Object.assign(ms,{route:"M4 21V3m16 18V3M12 3v4m0 3v4m0 3v4",waves:"M2 7c4-4 4 4 8 0s4 4 8 0h4M2 12c4-4 4 4 8 0s4 4 8 0h4M2 17c4-4 4 4 8 0s4 4 8 0h4",mountain:"m2 20 8-16 6 11 3-6 3 11H2Zm5-10 3 2 2-3",landscape:"M3 3h18v18H3ZM3 17l7-9 5 7 3-4 3 6M17 6h.01"});const Eo=n=>`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="${ms[n]||ms.cube}"/></svg>`,ll={waiting:"Ruang operasi · menunggu verifikasi",ascending:"Menuju lantai 3 lewat tangga",returning:"Kembali ke ruang operasi",reviewing:"Meninjau hasil baru · ilustrasi",resting:"Rehat di lantai 3"};function ju({getOffice:n,focusAgent:e,announce:t,onViews:i=()=>{}}){const r=D=>document.querySelector(D),s=new Map,a=new Map;let o=null,c="loading",l="health",d=!1,h=!1,u=!1,m=!1,S=null,w=null;const g=r("#agent-report");r("#agent-cards").innerHTML=hs.map(D=>`<button class="observer-card" id="agent-${D.id}" data-agent="${D.id}" aria-haspopup="dialog"><span class="agent-monogram">${D.short}</span><span class="agent-summary"><b>${D.name}</b><span class="agent-result">Mengambil laporan…</span><span class="agent-checked">Pemeriksaan terakhir: belum ada</span><span class="agent-activity">${ll.waiting}</span></span><span class="report-arrow" aria-hidden="true">↗</span></button>`).join("");for(const D of hs){const N=r("#agent-"+D.id);s.set(D.id,N),N.onclick=()=>b(D.id)}function f(){return Pu(o,Date.now(),c)}function P(D){const N=a.get(D.id)||"waiting";return(h?"Gerak dijeda · ":"")+(N==="waiting"&&D.tone==="attention"?"Ruang operasi · perlu perhatian":ll[N])+(N==="resting"?" · "+D.activity:"")}function T(){const D=f().find(k=>k.id===l);if(!D)return;r("#report-name").textContent=D.name,r("#report-result").textContent=D.label+" · "+D.freshness,r("#report-result").dataset.tone=D.tone,r("#report-reason").textContent=D.reason,r("#report-activity").textContent=P(D);const N={time:Mi(D.lastAt),age:oo(D.lastAt),source:D.source,code:D.lastCode||"Belum ada",latency:D.latencyMs===null?"Belum ada":D.latencyMs+" ms",release:D.release||"Tidak tercatat pada pemeriksaan ini",cycle:Mi(D.lastCycleAt),next:Mi(D.nextDueAt),received:Mi(w),recorded:D.lastResult};for(const[k,W]of Object.entries(N))r("#report-"+k).textContent=W}function M(){if(u)return;const D=f();for(const k of D){const W=s.get(k.id);W.dataset.tone=k.tone,W.querySelector(".agent-result").textContent=k.label+" · "+k.freshness,W.querySelector(".agent-checked").textContent="Diperiksa "+oo(k.lastAt)+" · "+Mi(k.lastAt),W.querySelector(".agent-activity").textContent=P(k),W.setAttribute("aria-label",k.name+". "+k.label+". "+k.freshness+". Buka laporan nyata.")}n()?.updateAgents(D),i(D);const N=c==="loading"?"Mengambil laporan…":c==="session"?"Sesi berakhir. Masuk kembali.":c==="error"?"Koneksi terputus · mencoba lagi setiap 30 detik":o?.source==="observer"?"Laporan VPS · 30 dtk":"Sumber langsung belum tersedia";r("#report-connection").textContent!==N&&(r("#report-connection").textContent=N),r("#refresh-report").disabled=d||m,g.open&&T()}async function R(){if(d||u||document.hidden||m)return;d=!0,S=new AbortController;const D=setTimeout(()=>S?.abort(),12e3);M();try{const N=await fetch("/agent-office/api/report",{credentials:"same-origin",cache:"no-store",signal:S.signal});if(N.status===401){c="session",m=!0;return}if(!N.ok)throw Error("Report unavailable");const k=await N.json();if(!k||!Array.isArray(k.checks)||!k.observer||!["observer","snapshot","unavailable"].includes(k.source))throw Error("Invalid report");o=k,w=Date.now(),c="ready"}catch{u||(c="error")}finally{clearTimeout(D),d=!1,S=null,M()}}function b(D){["health","release"].includes(D)&&(l=D,T(),g.open||g.showModal())}function v(D,N){a.set(D,N);const k=f().find(W=>W.id===D);k&&s.get(D)?.querySelector(".agent-activity")?.replaceChildren(document.createTextNode(P(k))),g.open&&l===D&&T()}function x(){const D=n()?.software,N=D||matchMedia("(prefers-reduced-motion: reduce)").matches;r("#walk").disabled=!n()||N,r("#walk").setAttribute("aria-pressed",String(h)),r("#walk").innerHTML=Eo(h?"play":"pause")+"<span>"+(h?"Lanjutkan gerak karakter":"Jeda gerak karakter")+"</span>",r("#motion-note").textContent=D?"Mode kompatibel: posisi diperbarui tanpa animasi berjalan.":N?"Gerakan disederhanakan sesuai preferensi perangkat.":h?"Gerakan dijeda. Pembacaan laporan tetap berjalan.":"Gerakan mengilustrasikan hasil terakhir · bukan aktivitas langsung"}r("#walk").onclick=()=>{h=!h,n()?.pauseMotion(h),x(),M(),t(h?"Gerakan dijeda; laporan tetap diperbarui.":"Gerakan karakter dilanjutkan.")},r("#refresh-report").onclick=R,r("#report-focus").onclick=()=>{g.close(),e(l)},r("#report-close").onclick=()=>g.close();const p=()=>{document.hidden||(M(),R())};document.addEventListener("visibilitychange",p);const y=matchMedia("(prefers-reduced-motion: reduce)");y.addEventListener("change",x);const A=setInterval(R,3e4),L=setInterval(()=>{document.hidden||M()},5e3),B=()=>{u=!0,S?.abort(),clearInterval(A),clearInterval(L),document.removeEventListener("visibilitychange",p),y.removeEventListener("change",x)};return addEventListener("pagehide",B,{once:!0}),x(),M(),R(),{open:b,move:v,dispose:B,refresh:R}}function Ju(){const n=document.querySelector("#logout"),e=document.querySelector("#session-notice");let t=!1;function i(a){e.textContent=a,e.hidden=!a}async function r(){if(!(document.hidden||t)){t=!0;try{const a=await fetch("/auth/session",{credentials:"same-origin",cache:"no-store",signal:AbortSignal.timeout(12e3)});if(a.status===401){location.replace("/login.html");return}if(!a.ok)throw Error();i("")}catch{i("Koneksi sesi belum tersedia. Periksa koneksi sebelum melanjutkan.")}finally{t=!1}}}n.addEventListener("click",async()=>{if(!n.disabled){n.disabled=!0,n.textContent="Keluar…";try{if(!(await fetch("/auth/logout",{method:"POST",credentials:"same-origin",signal:AbortSignal.timeout(12e3)})).ok)throw Error();location.replace("/login.html")}catch{i("Belum berhasil keluar. Periksa koneksi lalu coba lagi."),n.disabled=!1,n.textContent="Keluar akun"}}}),document.addEventListener("visibilitychange",r),addEventListener("pageshow",r);const s=setInterval(r,6e4);addEventListener("pagehide",()=>clearInterval(s),{once:!0}),r()}const oa="185",ci={ROTATE:0,DOLLY:1,PAN:2},bi={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},hc=0,lo=1,fc=2,_r=1,To=2,ji=3,Wn=0,jt=1,$t=2,Cn=0,yi=1,co=2,uo=3,ho=4,pc=5,si=100,mc=101,gc=102,_c=103,xc=104,vc=200,Mc=201,Sc=202,bc=203,gs=204,_s=205,yc=206,Ec=207,Tc=208,Ac=209,wc=210,Rc=211,Cc=212,Pc=213,Lc=214,xs=0,vs=1,Ms=2,wi=3,Ss=4,bs=5,ys=6,Es=7,Ao=0,Dc=1,Ic=2,Sn=0,wo=1,Ro=2,Co=3,la=4,Po=5,Lo=6,Do=7,Io=300,ui=301,Ri=302,os=303,ls=304,Dr=306,Er=1e3,Rn=1001,Ts=1002,kt=1003,Uc=1004,mr=1005,Gt=1006,cs=1007,ai=1008,en=1009,Uo=1010,No=1011,tr=1012,ca=1013,yn=1014,vn=1015,Pn=1016,ua=1017,da=1018,nr=1020,Fo=35902,Oo=35899,ko=1021,Bo=1022,dn=1023,Ln=1026,oi=1027,zo=1028,ha=1029,di=1030,fa=1031,pa=1033,xr=33776,vr=33777,Mr=33778,Sr=33779,As=35840,ws=35841,Rs=35842,Cs=35843,Ps=36196,Ls=37492,Ds=37496,Is=37488,Us=37489,Tr=37490,Ns=37491,Fs=37808,Os=37809,ks=37810,Bs=37811,zs=37812,Gs=37813,Vs=37814,Hs=37815,Ws=37816,Xs=37817,qs=37818,Ys=37819,Ks=37820,Zs=37821,$s=36492,js=36494,Js=36495,Qs=36283,ea=36284,Ar=36285,ta=36286,Nc=3200,na=0,Fc=1,Bn="",zt="srgb",wr="srgb-linear",Rr="linear",gt="srgb",vi=7680,fo=519,Oc=512,kc=513,Bc=514,ma=515,zc=516,Gc=517,ga=518,Vc=519,po=35044,mo="300 es",Mn=2e3,ir=2001;function Qu(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function ia(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function Hc(){const n=ia("canvas");return n.style.display="block",n}const cl={};function go(...n){const e="THREE."+n.shift();console.log(e,...n)}function Wc(n){const e=n[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=n[1];t&&t.isStackTrace?n[0]+=" "+t.getLocation():n[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return n}function Ke(...n){n=Wc(n);const e="THREE."+n.shift();{const t=n[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...n)}}function ft(...n){n=Wc(n);const e="THREE."+n.shift();{const t=n[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...n)}}function Ei(...n){const e=n.join(" ");e in cl||(cl[e]=!0,Ke(...n))}function ed(n,e,t){return new Promise(function(i,r){function s(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:r();break;case n.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:i()}}setTimeout(s,t)})}const td={[xs]:vs,[Ms]:ys,[Ss]:Es,[wi]:bs,[vs]:xs,[ys]:Ms,[Es]:Ss,[bs]:wi};class Yn{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){const i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){const i=this._listeners;if(i===void 0)return;const r=i[e];if(r!==void 0){const s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const i=t[e.type];if(i!==void 0){e.target=this;const r=i.slice(0);for(let s=0,a=r.length;s<a;s++)r[s].call(this,e);e.target=null}}}const Xt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let ul=1234567;const br=Math.PI/180,Cr=180/Math.PI;function sr(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Xt[n&255]+Xt[n>>8&255]+Xt[n>>16&255]+Xt[n>>24&255]+"-"+Xt[e&255]+Xt[e>>8&255]+"-"+Xt[e>>16&15|64]+Xt[e>>24&255]+"-"+Xt[t&63|128]+Xt[t>>8&255]+"-"+Xt[t>>16&255]+Xt[t>>24&255]+Xt[i&255]+Xt[i>>8&255]+Xt[i>>16&255]+Xt[i>>24&255]).toLowerCase()}function ut(n,e,t){return Math.max(e,Math.min(t,n))}function Go(n,e){return(n%e+e)%e}function nd(n,e,t,i,r){return i+(n-e)*(r-i)/(t-e)}function id(n,e,t){return n!==e?(t-n)/(e-n):0}function yr(n,e,t){return(1-t)*n+t*e}function rd(n,e,t,i){return yr(n,e,1-Math.exp(-t*i))}function sd(n,e=1){return e-Math.abs(Go(n,e*2)-e)}function ad(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*(3-2*n))}function od(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*n*(n*(n*6-15)+10))}function ld(n,e){return n+Math.floor(Math.random()*(e-n+1))}function cd(n,e){return n+Math.random()*(e-n)}function ud(n){return n*(.5-Math.random())}function dd(n){n!==void 0&&(ul=n);let e=ul+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function hd(n){return n*br}function fd(n){return n*Cr}function pd(n){return(n&n-1)===0&&n!==0}function md(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function gd(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function _d(n,e,t,i,r){const s=Math.cos,a=Math.sin,o=s(t/2),c=a(t/2),l=s((e+i)/2),d=a((e+i)/2),h=s((e-i)/2),u=a((e-i)/2),m=s((i-e)/2),S=a((i-e)/2);switch(r){case"XYX":n.set(o*d,c*h,c*u,o*l);break;case"YZY":n.set(c*u,o*d,c*h,o*l);break;case"ZXZ":n.set(c*h,c*u,o*d,o*l);break;case"XZX":n.set(o*d,c*S,c*m,o*l);break;case"YXY":n.set(c*m,o*d,c*S,o*l);break;case"ZYZ":n.set(c*S,c*m,o*d,o*l);break;default:Ke("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}}function Zi(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function Kt(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}const ra={DEG2RAD:br,RAD2DEG:Cr,generateUUID:sr,clamp:ut,euclideanModulo:Go,mapLinear:nd,inverseLerp:id,lerp:yr,damp:rd,pingpong:sd,smoothstep:ad,smootherstep:od,randInt:ld,randFloat:cd,randFloatSpread:ud,seededRandom:dd,degToRad:hd,radToDeg:fd,isPowerOfTwo:pd,ceilPowerOfTwo:md,floorPowerOfTwo:gd,setQuaternionFromProperEuler:_d,normalize:Kt,denormalize:Zi};class He{static{He.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6],this.y=r[1]*t+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=ut(this.x,e.x,t.x),this.y=ut(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=ut(this.x,e,t),this.y=ut(this.y,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(ut(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(ut(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),r=Math.sin(t),s=this.x-e.x,a=this.y-e.y;return this.x=s*i-a*r+e.x,this.y=s*r+a*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Xn{constructor(e=0,t=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=r}static slerpFlat(e,t,i,r,s,a,o){let c=i[r+0],l=i[r+1],d=i[r+2],h=i[r+3],u=s[a+0],m=s[a+1],S=s[a+2],w=s[a+3];if(h!==w||c!==u||l!==m||d!==S){let g=c*u+l*m+d*S+h*w;g<0&&(u=-u,m=-m,S=-S,w=-w,g=-g);let f=1-o;if(g<.9995){const P=Math.acos(g),T=Math.sin(P);f=Math.sin(f*P)/T,o=Math.sin(o*P)/T,c=c*f+u*o,l=l*f+m*o,d=d*f+S*o,h=h*f+w*o}else{c=c*f+u*o,l=l*f+m*o,d=d*f+S*o,h=h*f+w*o;const P=1/Math.sqrt(c*c+l*l+d*d+h*h);c*=P,l*=P,d*=P,h*=P}}e[t]=c,e[t+1]=l,e[t+2]=d,e[t+3]=h}static multiplyQuaternionsFlat(e,t,i,r,s,a){const o=i[r],c=i[r+1],l=i[r+2],d=i[r+3],h=s[a],u=s[a+1],m=s[a+2],S=s[a+3];return e[t]=o*S+d*h+c*m-l*u,e[t+1]=c*S+d*u+l*h-o*m,e[t+2]=l*S+d*m+o*u-c*h,e[t+3]=d*S-o*h-c*u-l*m,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,r){return this._x=e,this._y=t,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,r=e._y,s=e._z,a=e._order,o=Math.cos,c=Math.sin,l=o(i/2),d=o(r/2),h=o(s/2),u=c(i/2),m=c(r/2),S=c(s/2);switch(a){case"XYZ":this._x=u*d*h+l*m*S,this._y=l*m*h-u*d*S,this._z=l*d*S+u*m*h,this._w=l*d*h-u*m*S;break;case"YXZ":this._x=u*d*h+l*m*S,this._y=l*m*h-u*d*S,this._z=l*d*S-u*m*h,this._w=l*d*h+u*m*S;break;case"ZXY":this._x=u*d*h-l*m*S,this._y=l*m*h+u*d*S,this._z=l*d*S+u*m*h,this._w=l*d*h-u*m*S;break;case"ZYX":this._x=u*d*h-l*m*S,this._y=l*m*h+u*d*S,this._z=l*d*S-u*m*h,this._w=l*d*h+u*m*S;break;case"YZX":this._x=u*d*h+l*m*S,this._y=l*m*h+u*d*S,this._z=l*d*S-u*m*h,this._w=l*d*h-u*m*S;break;case"XZY":this._x=u*d*h-l*m*S,this._y=l*m*h-u*d*S,this._z=l*d*S+u*m*h,this._w=l*d*h+u*m*S;break;default:Ke("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],r=t[4],s=t[8],a=t[1],o=t[5],c=t[9],l=t[2],d=t[6],h=t[10],u=i+o+h;if(u>0){const m=.5/Math.sqrt(u+1);this._w=.25/m,this._x=(d-c)*m,this._y=(s-l)*m,this._z=(a-r)*m}else if(i>o&&i>h){const m=2*Math.sqrt(1+i-o-h);this._w=(d-c)/m,this._x=.25*m,this._y=(r+a)/m,this._z=(s+l)/m}else if(o>h){const m=2*Math.sqrt(1+o-i-h);this._w=(s-l)/m,this._x=(r+a)/m,this._y=.25*m,this._z=(c+d)/m}else{const m=2*Math.sqrt(1+h-i-o);this._w=(a-r)/m,this._x=(s+l)/m,this._y=(c+d)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(ut(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const r=Math.min(1,t/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,r=e._y,s=e._z,a=e._w,o=t._x,c=t._y,l=t._z,d=t._w;return this._x=i*d+a*o+r*l-s*c,this._y=r*d+a*c+s*o-i*l,this._z=s*d+a*l+i*c-r*o,this._w=a*d-i*o-r*c-s*l,this._onChangeCallback(),this}slerp(e,t){let i=e._x,r=e._y,s=e._z,a=e._w,o=this.dot(e);o<0&&(i=-i,r=-r,s=-s,a=-a,o=-o);let c=1-t;if(o<.9995){const l=Math.acos(o),d=Math.sin(l);c=Math.sin(c*l)/d,t=Math.sin(t*l)/d,this._x=this._x*c+i*t,this._y=this._y*c+r*t,this._z=this._z*c+s*t,this._w=this._w*c+a*t,this._onChangeCallback()}else this._x=this._x*c+i*t,this._y=this._y*c+r*t,this._z=this._z*c+s*t,this._w=this._w*c+a*t,this.normalize();return this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class G{static{G.prototype.isVector3=!0}constructor(e=0,t=0,i=0){this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(dl.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(dl.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6]*r,this.y=s[1]*t+s[4]*i+s[7]*r,this.z=s[2]*t+s[5]*i+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=e.elements,a=1/(s[3]*t+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*i+s[8]*r+s[12])*a,this.y=(s[1]*t+s[5]*i+s[9]*r+s[13])*a,this.z=(s[2]*t+s[6]*i+s[10]*r+s[14])*a,this}applyQuaternion(e){const t=this.x,i=this.y,r=this.z,s=e.x,a=e.y,o=e.z,c=e.w,l=2*(a*r-o*i),d=2*(o*t-s*r),h=2*(s*i-a*t);return this.x=t+c*l+a*h-o*d,this.y=i+c*d+o*l-s*h,this.z=r+c*h+s*d-a*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*i+s[8]*r,this.y=s[1]*t+s[5]*i+s[9]*r,this.z=s[2]*t+s[6]*i+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=ut(this.x,e.x,t.x),this.y=ut(this.y,e.y,t.y),this.z=ut(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=ut(this.x,e,t),this.y=ut(this.y,e,t),this.z=ut(this.z,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(ut(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,r=e.y,s=e.z,a=t.x,o=t.y,c=t.z;return this.x=r*c-s*o,this.y=s*a-i*c,this.z=i*o-r*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return La.copy(this).projectOnVector(e),this.sub(La)}reflect(e){return this.sub(La.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(ut(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return t*t+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const r=Math.sin(t)*e;return this.x=r*Math.sin(i),this.y=Math.cos(t)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const La=new G,dl=new Xn;class je{static{je.prototype.isMatrix3=!0}constructor(e,t,i,r,s,a,o,c,l){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,a,o,c,l)}set(e,t,i,r,s,a,o,c,l){const d=this.elements;return d[0]=e,d[1]=r,d[2]=o,d[3]=t,d[4]=s,d[5]=c,d[6]=i,d[7]=a,d[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,a=i[0],o=i[3],c=i[6],l=i[1],d=i[4],h=i[7],u=i[2],m=i[5],S=i[8],w=r[0],g=r[3],f=r[6],P=r[1],T=r[4],M=r[7],R=r[2],b=r[5],v=r[8];return s[0]=a*w+o*P+c*R,s[3]=a*g+o*T+c*b,s[6]=a*f+o*M+c*v,s[1]=l*w+d*P+h*R,s[4]=l*g+d*T+h*b,s[7]=l*f+d*M+h*v,s[2]=u*w+m*P+S*R,s[5]=u*g+m*T+S*b,s[8]=u*f+m*M+S*v,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],d=e[8];return t*a*d-t*o*l-i*s*d+i*o*c+r*s*l-r*a*c}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],d=e[8],h=d*a-o*l,u=o*c-d*s,m=l*s-a*c,S=t*h+i*u+r*m;if(S===0)return this.set(0,0,0,0,0,0,0,0,0);const w=1/S;return e[0]=h*w,e[1]=(r*l-d*i)*w,e[2]=(o*i-r*a)*w,e[3]=u*w,e[4]=(d*t-r*c)*w,e[5]=(r*s-o*t)*w,e[6]=m*w,e[7]=(i*c-l*t)*w,e[8]=(a*t-i*s)*w,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,r,s,a,o){const c=Math.cos(s),l=Math.sin(s);return this.set(i*c,i*l,-i*(c*a+l*o)+a+e,-r*l,r*c,-r*(-l*a+c*o)+o+t,0,0,1),this}scale(e,t){return Ei("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Da.makeScale(e,t)),this}rotate(e){return Ei("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Da.makeRotation(-e)),this}translate(e,t){return Ei("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Da.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<9;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Da=new je,hl=new je().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),fl=new je().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function xd(){const n={enabled:!0,workingColorSpace:wr,spaces:{},convert:function(r,s,a){return this.enabled===!1||s===a||!s||!a||(this.spaces[s].transfer===gt&&(r.r=Vn(r.r),r.g=Vn(r.g),r.b=Vn(r.b)),this.spaces[s].primaries!==this.spaces[a].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===gt&&(r.r=Qi(r.r),r.g=Qi(r.g),r.b=Qi(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===Bn?Rr:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,a){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,s){return Ei("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(r,s)},toWorkingColorSpace:function(r,s){return Ei("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(r,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[wr]:{primaries:e,whitePoint:i,transfer:Rr,toXYZ:hl,fromXYZ:fl,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:zt},outputColorSpaceConfig:{drawingBufferColorSpace:zt}},[zt]:{primaries:e,whitePoint:i,transfer:gt,toXYZ:hl,fromXYZ:fl,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:zt}}}),n}const ht=xd();function Vn(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function Qi(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let Fi;class Xc{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{Fi===void 0&&(Fi=ia("canvas")),Fi.width=e.width,Fi.height=e.height;const r=Fi.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),i=Fi}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=ia("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const r=i.getImageData(0,0,e.width,e.height),s=r.data;for(let a=0;a<s.length;a++)s[a]=Vn(s[a]/255)*255;return i.putImageData(r,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(Vn(t[i]/255)*255):t[i]=Vn(t[i]);return{data:t,width:e.width,height:e.height}}else return Ke("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let vd=0;class _a{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:vd++}),this.uuid=sr(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let a=0,o=r.length;a<o;a++)r[a].isDataTexture?s.push(Ia(r[a].image)):s.push(Ia(r[a]))}else s=Ia(r);i.url=s}return t||(e.images[this.uuid]=i),i}}function Ia(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?Xc.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(Ke("Texture: Unable to serialize Texture."),{})}let Md=0;const Ua=new G;class Vt extends Yn{constructor(e=Vt.DEFAULT_IMAGE,t=Vt.DEFAULT_MAPPING,i=Rn,r=Rn,s=Gt,a=ai,o=dn,c=en,l=Vt.DEFAULT_ANISOTROPY,d=Bn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Md++}),this.uuid=sr(),this.name="",this.source=new _a(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new He(0,0),this.repeat=new He(1,1),this.center=new He(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new je,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=d,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Ua).x}get height(){return this.source.getSize(Ua).y}get depth(){return this.source.getSize(Ua).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const i=e[t];if(i===void 0){Ke(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){Ke(`Texture.setValues(): property '${t}' does not exist.`);continue}r&&i&&r.isVector2&&i.isVector2||r&&i&&r.isVector3&&i.isVector3||r&&i&&r.isMatrix3&&i.isMatrix3?r.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Io)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Er:e.x=e.x-Math.floor(e.x);break;case Rn:e.x=e.x<0?0:1;break;case Ts:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Er:e.y=e.y-Math.floor(e.y);break;case Rn:e.y=e.y<0?0:1;break;case Ts:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Vt.DEFAULT_IMAGE=null;Vt.DEFAULT_MAPPING=Io;Vt.DEFAULT_ANISOTROPY=1;class mt{static{mt.prototype.isVector4=!0}constructor(e=0,t=0,i=0,r=1){this.x=e,this.y=t,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,r){return this.x=e,this.y=t,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=this.w,a=e.elements;return this.x=a[0]*t+a[4]*i+a[8]*r+a[12]*s,this.y=a[1]*t+a[5]*i+a[9]*r+a[13]*s,this.z=a[2]*t+a[6]*i+a[10]*r+a[14]*s,this.w=a[3]*t+a[7]*i+a[11]*r+a[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,r,s;const c=e.elements,l=c[0],d=c[4],h=c[8],u=c[1],m=c[5],S=c[9],w=c[2],g=c[6],f=c[10];if(Math.abs(d-u)<.01&&Math.abs(h-w)<.01&&Math.abs(S-g)<.01){if(Math.abs(d+u)<.1&&Math.abs(h+w)<.1&&Math.abs(S+g)<.1&&Math.abs(l+m+f-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const T=(l+1)/2,M=(m+1)/2,R=(f+1)/2,b=(d+u)/4,v=(h+w)/4,x=(S+g)/4;return T>M&&T>R?T<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(T),r=b/i,s=v/i):M>R?M<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(M),i=b/r,s=x/r):R<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(R),i=v/s,r=x/s),this.set(i,r,s,t),this}let P=Math.sqrt((g-S)*(g-S)+(h-w)*(h-w)+(u-d)*(u-d));return Math.abs(P)<.001&&(P=1),this.x=(g-S)/P,this.y=(h-w)/P,this.z=(u-d)/P,this.w=Math.acos((l+m+f-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=ut(this.x,e.x,t.x),this.y=ut(this.y,e.y,t.y),this.z=ut(this.z,e.z,t.z),this.w=ut(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=ut(this.x,e,t),this.y=ut(this.y,e,t),this.z=ut(this.z,e,t),this.w=ut(this.w,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(ut(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class qc extends Yn{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Gt,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new mt(0,0,e,t),this.scissorTest=!1,this.viewport=new mt(0,0,e,t),this.textures=[];const r={width:e,height:t,depth:i.depth},s=new Vt(r),a=i.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview,this.useArrayDepthTexture=i.useArrayDepthTexture}_setTextureOptions(e={}){const t={minFilter:Gt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=i,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const r=Object.assign({},e.textures[t].image);this.textures[t].source=new _a(r)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class bn extends qc{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class Vo extends Vt{constructor(e=null,t=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=kt,this.minFilter=kt,this.wrapR=Rn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Yc extends Vt{constructor(e=null,t=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=kt,this.minFilter=kt,this.wrapR=Rn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class _t{static{_t.prototype.isMatrix4=!0}constructor(e,t,i,r,s,a,o,c,l,d,h,u,m,S,w,g){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,a,o,c,l,d,h,u,m,S,w,g)}set(e,t,i,r,s,a,o,c,l,d,h,u,m,S,w,g){const f=this.elements;return f[0]=e,f[4]=t,f[8]=i,f[12]=r,f[1]=s,f[5]=a,f[9]=o,f[13]=c,f[2]=l,f[6]=d,f[10]=h,f[14]=u,f[3]=m,f[7]=S,f[11]=w,f[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new _t().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),i.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();const t=this.elements,i=e.elements,r=1/Oi.setFromMatrixColumn(e,0).length(),s=1/Oi.setFromMatrixColumn(e,1).length(),a=1/Oi.setFromMatrixColumn(e,2).length();return t[0]=i[0]*r,t[1]=i[1]*r,t[2]=i[2]*r,t[3]=0,t[4]=i[4]*s,t[5]=i[5]*s,t[6]=i[6]*s,t[7]=0,t[8]=i[8]*a,t[9]=i[9]*a,t[10]=i[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,r=e.y,s=e.z,a=Math.cos(i),o=Math.sin(i),c=Math.cos(r),l=Math.sin(r),d=Math.cos(s),h=Math.sin(s);if(e.order==="XYZ"){const u=a*d,m=a*h,S=o*d,w=o*h;t[0]=c*d,t[4]=-c*h,t[8]=l,t[1]=m+S*l,t[5]=u-w*l,t[9]=-o*c,t[2]=w-u*l,t[6]=S+m*l,t[10]=a*c}else if(e.order==="YXZ"){const u=c*d,m=c*h,S=l*d,w=l*h;t[0]=u+w*o,t[4]=S*o-m,t[8]=a*l,t[1]=a*h,t[5]=a*d,t[9]=-o,t[2]=m*o-S,t[6]=w+u*o,t[10]=a*c}else if(e.order==="ZXY"){const u=c*d,m=c*h,S=l*d,w=l*h;t[0]=u-w*o,t[4]=-a*h,t[8]=S+m*o,t[1]=m+S*o,t[5]=a*d,t[9]=w-u*o,t[2]=-a*l,t[6]=o,t[10]=a*c}else if(e.order==="ZYX"){const u=a*d,m=a*h,S=o*d,w=o*h;t[0]=c*d,t[4]=S*l-m,t[8]=u*l+w,t[1]=c*h,t[5]=w*l+u,t[9]=m*l-S,t[2]=-l,t[6]=o*c,t[10]=a*c}else if(e.order==="YZX"){const u=a*c,m=a*l,S=o*c,w=o*l;t[0]=c*d,t[4]=w-u*h,t[8]=S*h+m,t[1]=h,t[5]=a*d,t[9]=-o*d,t[2]=-l*d,t[6]=m*h+S,t[10]=u-w*h}else if(e.order==="XZY"){const u=a*c,m=a*l,S=o*c,w=o*l;t[0]=c*d,t[4]=-h,t[8]=l*d,t[1]=u*h+w,t[5]=a*d,t[9]=m*h-S,t[2]=S*h-m,t[6]=o*d,t[10]=w*h+u}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Sd,e,bd)}lookAt(e,t,i){const r=this.elements;return rn.subVectors(e,t),rn.lengthSq()===0&&(rn.z=1),rn.normalize(),Jn.crossVectors(i,rn),Jn.lengthSq()===0&&(Math.abs(i.z)===1?rn.x+=1e-4:rn.z+=1e-4,rn.normalize(),Jn.crossVectors(i,rn)),Jn.normalize(),kr.crossVectors(rn,Jn),r[0]=Jn.x,r[4]=kr.x,r[8]=rn.x,r[1]=Jn.y,r[5]=kr.y,r[9]=rn.y,r[2]=Jn.z,r[6]=kr.z,r[10]=rn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,a=i[0],o=i[4],c=i[8],l=i[12],d=i[1],h=i[5],u=i[9],m=i[13],S=i[2],w=i[6],g=i[10],f=i[14],P=i[3],T=i[7],M=i[11],R=i[15],b=r[0],v=r[4],x=r[8],p=r[12],y=r[1],A=r[5],L=r[9],B=r[13],D=r[2],N=r[6],k=r[10],W=r[14],$=r[3],re=r[7],me=r[11],be=r[15];return s[0]=a*b+o*y+c*D+l*$,s[4]=a*v+o*A+c*N+l*re,s[8]=a*x+o*L+c*k+l*me,s[12]=a*p+o*B+c*W+l*be,s[1]=d*b+h*y+u*D+m*$,s[5]=d*v+h*A+u*N+m*re,s[9]=d*x+h*L+u*k+m*me,s[13]=d*p+h*B+u*W+m*be,s[2]=S*b+w*y+g*D+f*$,s[6]=S*v+w*A+g*N+f*re,s[10]=S*x+w*L+g*k+f*me,s[14]=S*p+w*B+g*W+f*be,s[3]=P*b+T*y+M*D+R*$,s[7]=P*v+T*A+M*N+R*re,s[11]=P*x+T*L+M*k+R*me,s[15]=P*p+T*B+M*W+R*be,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],r=e[8],s=e[12],a=e[1],o=e[5],c=e[9],l=e[13],d=e[2],h=e[6],u=e[10],m=e[14],S=e[3],w=e[7],g=e[11],f=e[15],P=c*m-l*u,T=o*m-l*h,M=o*u-c*h,R=a*m-l*d,b=a*u-c*d,v=a*h-o*d;return t*(w*P-g*T+f*M)-i*(S*P-g*R+f*b)+r*(S*T-w*R+f*v)-s*(S*M-w*b+g*v)}determinantAffine(){const e=this.elements,t=e[0],i=e[4],r=e[8],s=e[1],a=e[5],o=e[9],c=e[2],l=e[6],d=e[10];return t*(a*d-o*l)-i*(s*d-o*c)+r*(s*l-a*c)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],d=e[8],h=e[9],u=e[10],m=e[11],S=e[12],w=e[13],g=e[14],f=e[15],P=t*o-i*a,T=t*c-r*a,M=t*l-s*a,R=i*c-r*o,b=i*l-s*o,v=r*l-s*c,x=d*w-h*S,p=d*g-u*S,y=d*f-m*S,A=h*g-u*w,L=h*f-m*w,B=u*f-m*g,D=P*B-T*L+M*A+R*y-b*p+v*x;if(D===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const N=1/D;return e[0]=(o*B-c*L+l*A)*N,e[1]=(r*L-i*B-s*A)*N,e[2]=(w*v-g*b+f*R)*N,e[3]=(u*b-h*v-m*R)*N,e[4]=(c*y-a*B-l*p)*N,e[5]=(t*B-r*y+s*p)*N,e[6]=(g*M-S*v-f*T)*N,e[7]=(d*v-u*M+m*T)*N,e[8]=(a*L-o*y+l*x)*N,e[9]=(i*y-t*L-s*x)*N,e[10]=(S*b-w*M+f*P)*N,e[11]=(h*M-d*b-m*P)*N,e[12]=(o*p-a*A-c*x)*N,e[13]=(t*A-i*p+r*x)*N,e[14]=(w*T-S*R-g*P)*N,e[15]=(d*R-h*T+u*P)*N,this}scale(e){const t=this.elements,i=e.x,r=e.y,s=e.z;return t[0]*=i,t[4]*=r,t[8]*=s,t[1]*=i,t[5]*=r,t[9]*=s,t[2]*=i,t[6]*=r,t[10]*=s,t[3]*=i,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,r))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),r=Math.sin(t),s=1-i,a=e.x,o=e.y,c=e.z,l=s*a,d=s*o;return this.set(l*a+i,l*o-r*c,l*c+r*o,0,l*o+r*c,d*o+i,d*c-r*a,0,l*c-r*o,d*c+r*a,s*c*c+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,r,s,a){return this.set(1,i,s,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,i){const r=this.elements,s=t._x,a=t._y,o=t._z,c=t._w,l=s+s,d=a+a,h=o+o,u=s*l,m=s*d,S=s*h,w=a*d,g=a*h,f=o*h,P=c*l,T=c*d,M=c*h,R=i.x,b=i.y,v=i.z;return r[0]=(1-(w+f))*R,r[1]=(m+M)*R,r[2]=(S-T)*R,r[3]=0,r[4]=(m-M)*b,r[5]=(1-(u+f))*b,r[6]=(g+P)*b,r[7]=0,r[8]=(S+T)*v,r[9]=(g-P)*v,r[10]=(1-(u+w))*v,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,i){const r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];const s=this.determinantAffine();if(s===0)return i.set(1,1,1),t.identity(),this;let a=Oi.set(r[0],r[1],r[2]).length();const o=Oi.set(r[4],r[5],r[6]).length(),c=Oi.set(r[8],r[9],r[10]).length();s<0&&(a=-a),pn.copy(this);const l=1/a,d=1/o,h=1/c;return pn.elements[0]*=l,pn.elements[1]*=l,pn.elements[2]*=l,pn.elements[4]*=d,pn.elements[5]*=d,pn.elements[6]*=d,pn.elements[8]*=h,pn.elements[9]*=h,pn.elements[10]*=h,t.setFromRotationMatrix(pn),i.x=a,i.y=o,i.z=c,this}makePerspective(e,t,i,r,s,a,o=Mn,c=!1){const l=this.elements,d=2*s/(t-e),h=2*s/(i-r),u=(t+e)/(t-e),m=(i+r)/(i-r);let S,w;if(c)S=s/(a-s),w=a*s/(a-s);else if(o===Mn)S=-(a+s)/(a-s),w=-2*a*s/(a-s);else if(o===ir)S=-a/(a-s),w=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=d,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=h,l[9]=m,l[13]=0,l[2]=0,l[6]=0,l[10]=S,l[14]=w,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,i,r,s,a,o=Mn,c=!1){const l=this.elements,d=2/(t-e),h=2/(i-r),u=-(t+e)/(t-e),m=-(i+r)/(i-r);let S,w;if(c)S=1/(a-s),w=a/(a-s);else if(o===Mn)S=-2/(a-s),w=-(a+s)/(a-s);else if(o===ir)S=-1/(a-s),w=-s/(a-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=d,l[4]=0,l[8]=0,l[12]=u,l[1]=0,l[5]=h,l[9]=0,l[13]=m,l[2]=0,l[6]=0,l[10]=S,l[14]=w,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<16;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}}const Oi=new G,pn=new _t,Sd=new G(0,0,0),bd=new G(1,1,1),Jn=new G,kr=new G,rn=new G,pl=new _t,ml=new Xn;class qn{constructor(e=0,t=0,i=0,r=qn.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,r=this._order){return this._x=e,this._y=t,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const r=e.elements,s=r[0],a=r[4],o=r[8],c=r[1],l=r[5],d=r[9],h=r[2],u=r[6],m=r[10];switch(t){case"XYZ":this._y=Math.asin(ut(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-d,m),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(u,l),this._z=0);break;case"YXZ":this._x=Math.asin(-ut(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(o,m),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-h,s),this._z=0);break;case"ZXY":this._x=Math.asin(ut(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-h,m),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,s));break;case"ZYX":this._y=Math.asin(-ut(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(u,m),this._z=Math.atan2(c,s)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(ut(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-d,l),this._y=Math.atan2(-h,s)):(this._x=0,this._y=Math.atan2(o,m));break;case"XZY":this._z=Math.asin(-ut(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(u,l),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-d,m),this._y=0);break;default:Ke("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return pl.makeRotationFromQuaternion(e),this.setFromRotationMatrix(pl,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return ml.setFromEuler(this),this.setFromQuaternion(ml,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}qn.DEFAULT_ORDER="XYZ";class xa{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let yd=0;const gl=new G,ki=new Xn,In=new _t,Br=new G,cr=new G,Ed=new G,Td=new Xn,_l=new G(1,0,0),xl=new G(0,1,0),vl=new G(0,0,1),Ml={type:"added"},Ad={type:"removed"},Bi={type:"childadded",child:null},Na={type:"childremoved",child:null};class Bt extends Yn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:yd++}),this.uuid=sr(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Bt.DEFAULT_UP.clone();const e=new G,t=new qn,i=new Xn,r=new G(1,1,1);function s(){i.setFromEuler(t,!1)}function a(){t.setFromQuaternion(i,void 0,!1)}t._onChange(s),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new _t},normalMatrix:{value:new je}}),this.matrix=new _t,this.matrixWorld=new _t,this.matrixAutoUpdate=Bt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Bt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new xa,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return ki.setFromAxisAngle(e,t),this.quaternion.multiply(ki),this}rotateOnWorldAxis(e,t){return ki.setFromAxisAngle(e,t),this.quaternion.premultiply(ki),this}rotateX(e){return this.rotateOnAxis(_l,e)}rotateY(e){return this.rotateOnAxis(xl,e)}rotateZ(e){return this.rotateOnAxis(vl,e)}translateOnAxis(e,t){return gl.copy(e).applyQuaternion(this.quaternion),this.position.add(gl.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(_l,e)}translateY(e){return this.translateOnAxis(xl,e)}translateZ(e){return this.translateOnAxis(vl,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(In.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?Br.copy(e):Br.set(e,t,i);const r=this.parent;this.updateWorldMatrix(!0,!1),cr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?In.lookAt(cr,Br,this.up):In.lookAt(Br,cr,this.up),this.quaternion.setFromRotationMatrix(In),r&&(In.extractRotation(r.matrixWorld),ki.setFromRotationMatrix(In),this.quaternion.premultiply(ki.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(ft("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Ml),Bi.child=e,this.dispatchEvent(Bi),Bi.child=null):ft("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Ad),Na.child=e,this.dispatchEvent(Na),Na.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),In.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),In.multiply(e.parent.matrixWorld)),e.applyMatrix4(In),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Ml),Bi.child=e,this.dispatchEvent(Bi),Bi.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,r=this.children.length;i<r;i++){const a=this.children[i].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(cr,e,Ed),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(cr,Td,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,i=e.y,r=e.z,s=this.matrix.elements;s[12]+=t-s[0]*t-s[4]*i-s[8]*r,s[13]+=i-s[1]*t-s[5]*i-s[9]*r,s[14]+=r-s[2]*t-s[6]*i-s[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t,i=!1){const r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||i)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,i=!0),t===!0){const s=this.children;for(let a=0,o=s.length;a<o;a++)s[a].updateWorldMatrix(!1,!0,i)}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),this.static!==!1&&(r.static=this.static),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(o=>({...o})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function s(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const c=o.shapes;if(Array.isArray(c))for(let l=0,d=c.length;l<d;l++){const h=c[l];s(e.shapes,h)}else s(e.shapes,c)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(s(e.materials,this.material[c]));r.material=o}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){const c=this.animations[o];r.animations.push(s(e.animations,c))}}if(t){const o=a(e.geometries),c=a(e.materials),l=a(e.textures),d=a(e.images),h=a(e.shapes),u=a(e.skeletons),m=a(e.animations),S=a(e.nodes);o.length>0&&(i.geometries=o),c.length>0&&(i.materials=c),l.length>0&&(i.textures=l),d.length>0&&(i.images=d),h.length>0&&(i.shapes=h),u.length>0&&(i.skeletons=u),m.length>0&&(i.animations=m),S.length>0&&(i.nodes=S)}return i.object=r,i;function a(o){const c=[];for(const l in o){const d=o[l];delete d.metadata,c.push(d)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const r=e.children[i];this.add(r.clone())}return this}}Bt.DEFAULT_UP=new G(0,1,0);Bt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Bt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class _n extends Bt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const wd={type:"move"};class us{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new _n,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new _n,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new G,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new G),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new _n,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new G,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new G,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let r=null,s=null,a=null;const o=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){a=!0;for(const w of e.hand.values()){const g=t.getJointPose(w,i),f=this._getHandJoint(l,w);g!==null&&(f.matrix.fromArray(g.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=g.radius),f.visible=g!==null}const d=l.joints["index-finger-tip"],h=l.joints["thumb-tip"],u=d.position.distanceTo(h.position),m=.02,S=.005;l.inputState.pinching&&u>m+S?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&u<=m-S&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,i),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1,c.eventsEnabled&&c.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(r=t.getPose(e.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(wd)))}return o!==null&&(o.visible=r!==null),c!==null&&(c.visible=s!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new _n;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}const Kc={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Qn={h:0,s:0,l:0},zr={h:0,s:0,l:0};function Fa(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class Je{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=zt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,ht.colorSpaceToWorking(this,t),this}setRGB(e,t,i,r=ht.workingColorSpace){return this.r=e,this.g=t,this.b=i,ht.colorSpaceToWorking(this,r),this}setHSL(e,t,i,r=ht.workingColorSpace){if(e=Go(e,1),t=ut(t,0,1),i=ut(i,0,1),t===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+t):i+t-i*t,a=2*i-s;this.r=Fa(a,s,e+1/3),this.g=Fa(a,s,e),this.b=Fa(a,s,e-1/3)}return ht.colorSpaceToWorking(this,r),this}setStyle(e,t=zt){function i(s){s!==void 0&&parseFloat(s)<1&&Ke("Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const a=r[1],o=r[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:Ke("Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(s,16),t);Ke("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=zt){const i=Kc[e.toLowerCase()];return i!==void 0?this.setHex(i,t):Ke("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Vn(e.r),this.g=Vn(e.g),this.b=Vn(e.b),this}copyLinearToSRGB(e){return this.r=Qi(e.r),this.g=Qi(e.g),this.b=Qi(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=zt){return ht.workingToColorSpace(qt.copy(this),e),Math.round(ut(qt.r*255,0,255))*65536+Math.round(ut(qt.g*255,0,255))*256+Math.round(ut(qt.b*255,0,255))}getHexString(e=zt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=ht.workingColorSpace){ht.workingToColorSpace(qt.copy(this),t);const i=qt.r,r=qt.g,s=qt.b,a=Math.max(i,r,s),o=Math.min(i,r,s);let c,l;const d=(o+a)/2;if(o===a)c=0,l=0;else{const h=a-o;switch(l=d<=.5?h/(a+o):h/(2-a-o),a){case i:c=(r-s)/h+(r<s?6:0);break;case r:c=(s-i)/h+2;break;case s:c=(i-r)/h+4;break}c/=6}return e.h=c,e.s=l,e.l=d,e}getRGB(e,t=ht.workingColorSpace){return ht.workingToColorSpace(qt.copy(this),t),e.r=qt.r,e.g=qt.g,e.b=qt.b,e}getStyle(e=zt){ht.workingToColorSpace(qt.copy(this),e);const t=qt.r,i=qt.g,r=qt.b;return e!==zt?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,t,i){return this.getHSL(Qn),this.setHSL(Qn.h+e,Qn.s+t,Qn.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(Qn),e.getHSL(zr);const i=yr(Qn.h,zr.h,t),r=yr(Qn.s,zr.s,t),s=yr(Qn.l,zr.l,t);return this.setHSL(i,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*i+s[6]*r,this.g=s[1]*t+s[4]*i+s[7]*r,this.b=s[2]*t+s[5]*i+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const qt=new Je;Je.NAMES=Kc;class va{constructor(e,t=1,i=1e3){this.isFog=!0,this.name="",this.color=new Je(e),this.near=t,this.far=i}clone(){return new va(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class Zc extends Bt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new qn,this.environmentIntensity=1,this.environmentRotation=new qn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}const mn=new G,Un=new G,Oa=new G,Nn=new G,zi=new G,Gi=new G,Sl=new G,ka=new G,Ba=new G,za=new G,Ga=new mt,Va=new mt,Ha=new mt;class un{constructor(e=new G,t=new G,i=new G){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,r){r.subVectors(i,t),mn.subVectors(e,t),r.cross(mn);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,i,r,s){mn.subVectors(r,t),Un.subVectors(i,t),Oa.subVectors(e,t);const a=mn.dot(mn),o=mn.dot(Un),c=mn.dot(Oa),l=Un.dot(Un),d=Un.dot(Oa),h=a*l-o*o;if(h===0)return s.set(0,0,0),null;const u=1/h,m=(l*c-o*d)*u,S=(a*d-o*c)*u;return s.set(1-m-S,S,m)}static containsPoint(e,t,i,r){return this.getBarycoord(e,t,i,r,Nn)===null?!1:Nn.x>=0&&Nn.y>=0&&Nn.x+Nn.y<=1}static getInterpolation(e,t,i,r,s,a,o,c){return this.getBarycoord(e,t,i,r,Nn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(s,Nn.x),c.addScaledVector(a,Nn.y),c.addScaledVector(o,Nn.z),c)}static getInterpolatedAttribute(e,t,i,r,s,a){return Ga.setScalar(0),Va.setScalar(0),Ha.setScalar(0),Ga.fromBufferAttribute(e,t),Va.fromBufferAttribute(e,i),Ha.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(Ga,s.x),a.addScaledVector(Va,s.y),a.addScaledVector(Ha,s.z),a}static isFrontFacing(e,t,i,r){return mn.subVectors(i,t),Un.subVectors(e,t),mn.cross(Un).dot(r)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,r){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,i,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return mn.subVectors(this.c,this.b),Un.subVectors(this.a,this.b),mn.cross(Un).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return un.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return un.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,r,s){return un.getInterpolation(e,this.a,this.b,this.c,t,i,r,s)}containsPoint(e){return un.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return un.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,r=this.b,s=this.c;let a,o;zi.subVectors(r,i),Gi.subVectors(s,i),ka.subVectors(e,i);const c=zi.dot(ka),l=Gi.dot(ka);if(c<=0&&l<=0)return t.copy(i);Ba.subVectors(e,r);const d=zi.dot(Ba),h=Gi.dot(Ba);if(d>=0&&h<=d)return t.copy(r);const u=c*h-d*l;if(u<=0&&c>=0&&d<=0)return a=c/(c-d),t.copy(i).addScaledVector(zi,a);za.subVectors(e,s);const m=zi.dot(za),S=Gi.dot(za);if(S>=0&&m<=S)return t.copy(s);const w=m*l-c*S;if(w<=0&&l>=0&&S<=0)return o=l/(l-S),t.copy(i).addScaledVector(Gi,o);const g=d*S-m*h;if(g<=0&&h-d>=0&&m-S>=0)return Sl.subVectors(s,r),o=(h-d)/(h-d+(m-S)),t.copy(r).addScaledVector(Sl,o);const f=1/(g+w+u);return a=w*f,o=u*f,t.copy(i).addScaledVector(zi,a).addScaledVector(Gi,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class hi{constructor(e=new G(1/0,1/0,1/0),t=new G(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(gn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(gn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=gn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const s=i.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,gn):gn.fromBufferAttribute(s,a),gn.applyMatrix4(e.matrixWorld),this.expandByPoint(gn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Gr.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Gr.copy(i.boundingBox)),Gr.applyMatrix4(e.matrixWorld),this.union(Gr)}const r=e.children;for(let s=0,a=r.length;s<a;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,gn),gn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(ur),Vr.subVectors(this.max,ur),Vi.subVectors(e.a,ur),Hi.subVectors(e.b,ur),Wi.subVectors(e.c,ur),ei.subVectors(Hi,Vi),ti.subVectors(Wi,Hi),mi.subVectors(Vi,Wi);let t=[0,-ei.z,ei.y,0,-ti.z,ti.y,0,-mi.z,mi.y,ei.z,0,-ei.x,ti.z,0,-ti.x,mi.z,0,-mi.x,-ei.y,ei.x,0,-ti.y,ti.x,0,-mi.y,mi.x,0];return!Wa(t,Vi,Hi,Wi,Vr)||(t=[1,0,0,0,1,0,0,0,1],!Wa(t,Vi,Hi,Wi,Vr))?!1:(Hr.crossVectors(ei,ti),t=[Hr.x,Hr.y,Hr.z],Wa(t,Vi,Hi,Wi,Vr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,gn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(gn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Fn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Fn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Fn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Fn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Fn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Fn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Fn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Fn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Fn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const Fn=[new G,new G,new G,new G,new G,new G,new G,new G],gn=new G,Gr=new hi,Vi=new G,Hi=new G,Wi=new G,ei=new G,ti=new G,mi=new G,ur=new G,Vr=new G,Hr=new G,gi=new G;function Wa(n,e,t,i,r){for(let s=0,a=n.length-3;s<=a;s+=3){gi.fromArray(n,s);const o=r.x*Math.abs(gi.x)+r.y*Math.abs(gi.y)+r.z*Math.abs(gi.z),c=e.dot(gi),l=t.dot(gi),d=i.dot(gi);if(Math.max(-Math.max(c,l,d),Math.min(c,l,d))>o)return!1}return!0}const Dt=new G,Wr=new He;let Rd=0;class hn extends Yn{constructor(e,t,i=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Rd++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=po,this.updateRanges=[],this.gpuType=vn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)Wr.fromBufferAttribute(this,t),Wr.applyMatrix3(e),this.setXY(t,Wr.x,Wr.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)Dt.fromBufferAttribute(this,t),Dt.applyMatrix3(e),this.setXYZ(t,Dt.x,Dt.y,Dt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)Dt.fromBufferAttribute(this,t),Dt.applyMatrix4(e),this.setXYZ(t,Dt.x,Dt.y,Dt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Dt.fromBufferAttribute(this,t),Dt.applyNormalMatrix(e),this.setXYZ(t,Dt.x,Dt.y,Dt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Dt.fromBufferAttribute(this,t),Dt.transformDirection(e),this.setXYZ(t,Dt.x,Dt.y,Dt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=Zi(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=Kt(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Zi(t,this.array)),t}setX(e,t){return this.normalized&&(t=Kt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Zi(t,this.array)),t}setY(e,t){return this.normalized&&(t=Kt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Zi(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Kt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Zi(t,this.array)),t}setW(e,t){return this.normalized&&(t=Kt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=Kt(t,this.array),i=Kt(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,r){return e*=this.itemSize,this.normalized&&(t=Kt(t,this.array),i=Kt(i,this.array),r=Kt(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,t,i,r,s){return e*=this.itemSize,this.normalized&&(t=Kt(t,this.array),i=Kt(i,this.array),r=Kt(r,this.array),s=Kt(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==po&&(e.usage=this.usage),e}dispose(){this.dispatchEvent({type:"dispose"})}}class Ho extends hn{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class Wo extends hn{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class Yt extends hn{constructor(e,t,i){super(new Float32Array(e),t,i)}}const Cd=new hi,dr=new G,Xa=new G;class Ma{constructor(e=new G,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):Cd.setFromPoints(e).getCenter(i);let r=0;for(let s=0,a=e.length;s<a;s++)r=Math.max(r,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;dr.subVectors(e,this.center);const t=dr.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),r=(i-this.radius)*.5;this.center.addScaledVector(dr,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Xa.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(dr.copy(e.center).add(Xa)),this.expandByPoint(dr.copy(e.center).sub(Xa))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let Pd=0;const cn=new _t,qa=new Bt,Xi=new G,sn=new hi,hr=new hi,Ot=new G;class on extends Yn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Pd++}),this.uuid=sr(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Qu(e)?Wo:Ho)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new je().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return cn.makeRotationFromQuaternion(e),this.applyMatrix4(cn),this}rotateX(e){return cn.makeRotationX(e),this.applyMatrix4(cn),this}rotateY(e){return cn.makeRotationY(e),this.applyMatrix4(cn),this}rotateZ(e){return cn.makeRotationZ(e),this.applyMatrix4(cn),this}translate(e,t,i){return cn.makeTranslation(e,t,i),this.applyMatrix4(cn),this}scale(e,t,i){return cn.makeScale(e,t,i),this.applyMatrix4(cn),this}lookAt(e){return qa.lookAt(e),qa.updateMatrix(),this.applyMatrix4(qa.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Xi).negate(),this.translate(Xi.x,Xi.y,Xi.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const i=[];for(let r=0,s=e.length;r<s;r++){const a=e[r];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Yt(i,3))}else{const i=Math.min(e.length,t.count);for(let r=0;r<i;r++){const s=e[r];t.setXYZ(r,s.x,s.y,s.z||0)}e.length>t.count&&Ke("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new hi);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){ft("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new G(-1/0,-1/0,-1/0),new G(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,r=t.length;i<r;i++){const s=t[i];sn.setFromBufferAttribute(s),this.morphTargetsRelative?(Ot.addVectors(this.boundingBox.min,sn.min),this.boundingBox.expandByPoint(Ot),Ot.addVectors(this.boundingBox.max,sn.max),this.boundingBox.expandByPoint(Ot)):(this.boundingBox.expandByPoint(sn.min),this.boundingBox.expandByPoint(sn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&ft('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ma);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){ft("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new G,1/0);return}if(e){const i=this.boundingSphere.center;if(sn.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){const o=t[s];hr.setFromBufferAttribute(o),this.morphTargetsRelative?(Ot.addVectors(sn.min,hr.min),sn.expandByPoint(Ot),Ot.addVectors(sn.max,hr.max),sn.expandByPoint(Ot)):(sn.expandByPoint(hr.min),sn.expandByPoint(hr.max))}sn.getCenter(i);let r=0;for(let s=0,a=e.count;s<a;s++)Ot.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(Ot));if(t)for(let s=0,a=t.length;s<a;s++){const o=t[s],c=this.morphTargetsRelative;for(let l=0,d=o.count;l<d;l++)Ot.fromBufferAttribute(o,l),c&&(Xi.fromBufferAttribute(e,l),Ot.add(Xi)),r=Math.max(r,i.distanceToSquared(Ot))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&ft('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){ft("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=t.position,r=t.normal,s=t.uv;let a=this.getAttribute("tangent");(a===void 0||a.count!==i.count)&&(a=new hn(new Float32Array(4*i.count),4),this.setAttribute("tangent",a));const o=[],c=[];for(let x=0;x<i.count;x++)o[x]=new G,c[x]=new G;const l=new G,d=new G,h=new G,u=new He,m=new He,S=new He,w=new G,g=new G;function f(x,p,y){l.fromBufferAttribute(i,x),d.fromBufferAttribute(i,p),h.fromBufferAttribute(i,y),u.fromBufferAttribute(s,x),m.fromBufferAttribute(s,p),S.fromBufferAttribute(s,y),d.sub(l),h.sub(l),m.sub(u),S.sub(u);const A=1/(m.x*S.y-S.x*m.y);isFinite(A)&&(w.copy(d).multiplyScalar(S.y).addScaledVector(h,-m.y).multiplyScalar(A),g.copy(h).multiplyScalar(m.x).addScaledVector(d,-S.x).multiplyScalar(A),o[x].add(w),o[p].add(w),o[y].add(w),c[x].add(g),c[p].add(g),c[y].add(g))}let P=this.groups;P.length===0&&(P=[{start:0,count:e.count}]);for(let x=0,p=P.length;x<p;++x){const y=P[x],A=y.start,L=y.count;for(let B=A,D=A+L;B<D;B+=3)f(e.getX(B+0),e.getX(B+1),e.getX(B+2))}const T=new G,M=new G,R=new G,b=new G;function v(x){R.fromBufferAttribute(r,x),b.copy(R);const p=o[x];T.copy(p),T.sub(R.multiplyScalar(R.dot(p))).normalize(),M.crossVectors(b,p);const A=M.dot(c[x])<0?-1:1;a.setXYZW(x,T.x,T.y,T.z,A)}for(let x=0,p=P.length;x<p;++x){const y=P[x],A=y.start,L=y.count;for(let B=A,D=A+L;B<D;B+=3)v(e.getX(B+0)),v(e.getX(B+1)),v(e.getX(B+2))}this._transformed=!0}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0||i.count!==t.count)i=new hn(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let u=0,m=i.count;u<m;u++)i.setXYZ(u,0,0,0);const r=new G,s=new G,a=new G,o=new G,c=new G,l=new G,d=new G,h=new G;if(e)for(let u=0,m=e.count;u<m;u+=3){const S=e.getX(u+0),w=e.getX(u+1),g=e.getX(u+2);r.fromBufferAttribute(t,S),s.fromBufferAttribute(t,w),a.fromBufferAttribute(t,g),d.subVectors(a,s),h.subVectors(r,s),d.cross(h),o.fromBufferAttribute(i,S),c.fromBufferAttribute(i,w),l.fromBufferAttribute(i,g),o.add(d),c.add(d),l.add(d),i.setXYZ(S,o.x,o.y,o.z),i.setXYZ(w,c.x,c.y,c.z),i.setXYZ(g,l.x,l.y,l.z)}else for(let u=0,m=t.count;u<m;u+=3)r.fromBufferAttribute(t,u+0),s.fromBufferAttribute(t,u+1),a.fromBufferAttribute(t,u+2),d.subVectors(a,s),h.subVectors(r,s),d.cross(h),i.setXYZ(u+0,d.x,d.y,d.z),i.setXYZ(u+1,d.x,d.y,d.z),i.setXYZ(u+2,d.x,d.y,d.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)Ot.fromBufferAttribute(e,t),Ot.normalize(),e.setXYZ(t,Ot.x,Ot.y,Ot.z)}toNonIndexed(){function e(o,c){const l=o.array,d=o.itemSize,h=o.normalized,u=new l.constructor(c.length*d);let m=0,S=0;for(let w=0,g=c.length;w<g;w++){o.isInterleavedBufferAttribute?m=c[w]*o.data.stride+o.offset:m=c[w]*d;for(let f=0;f<d;f++)u[S++]=l[m++]}return new hn(u,d,h)}if(this.index===null)return Ke("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new on,i=this.index.array,r=this.attributes;for(const o in r){const c=r[o],l=e(c,i);t.setAttribute(o,l)}const s=this.morphAttributes;for(const o in s){const c=[],l=s[o];for(let d=0,h=l.length;d<h;d++){const u=l[d],m=e(u,i);c.push(m)}t.morphAttributes[o]=c}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,c=a.length;o<c;o++){const l=a[o];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const c in i){const l=i[c];e.data.attributes[c]=l.toJSON(e.data)}const r={};let s=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],d=[];for(let h=0,u=l.length;h<u;h++){const m=l[h];d.push(m.toJSON(e.data))}d.length>0&&(r[c]=d,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone());const r=e.attributes;for(const l in r){const d=r[l];this.setAttribute(l,d.clone(t))}const s=e.morphAttributes;for(const l in s){const d=[],h=s[l];for(let u=0,m=h.length;u<m;u++)d.push(h[u].clone(t));this.morphAttributes[l]=d}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let l=0,d=a.length;l<d;l++){const h=a[l];this.addGroup(h.start,h.count,h.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}let Ld=0;class ar extends Yn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Ld++}),this.uuid=sr(),this.name="",this.type="Material",this.blending=yi,this.side=Wn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=gs,this.blendDst=_s,this.blendEquation=si,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Je(0,0,0),this.blendAlpha=0,this.depthFunc=wi,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=fo,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=vi,this.stencilZFail=vi,this.stencilZPass=vi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){Ke(`Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){Ke(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector2&&i&&i.isVector2||r&&r.isEuler&&i&&i.isEuler||r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==yi&&(i.blending=this.blending),this.side!==Wn&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==gs&&(i.blendSrc=this.blendSrc),this.blendDst!==_s&&(i.blendDst=this.blendDst),this.blendEquation!==si&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==wi&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==fo&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==vi&&(i.stencilFail=this.stencilFail),this.stencilZFail!==vi&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==vi&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.allowOverride===!1&&(i.allowOverride=!1),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){const a=[];for(const o in s){const c=s[o];delete c.metadata,a.push(c)}return a}if(t){const s=r(e.textures),a=r(e.images);s.length>0&&(i.textures=s),a.length>0&&(i.images=a)}return i}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new Je().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let i=e.normalScale;Array.isArray(i)===!1&&(i=[i,i]),this.normalScale=new He().fromArray(i)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new He().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const r=t.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=t[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const On=new G,Ya=new G,Xr=new G,ni=new G,Ka=new G,qr=new G,Za=new G;class Sa{constructor(e=new G,t=new G(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,On)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=On.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(On.copy(this.origin).addScaledVector(this.direction,t),On.distanceToSquared(e))}distanceSqToSegment(e,t,i,r){Ya.copy(e).add(t).multiplyScalar(.5),Xr.copy(t).sub(e).normalize(),ni.copy(this.origin).sub(Ya);const s=e.distanceTo(t)*.5,a=-this.direction.dot(Xr),o=ni.dot(this.direction),c=-ni.dot(Xr),l=ni.lengthSq(),d=Math.abs(1-a*a);let h,u,m,S;if(d>0)if(h=a*c-o,u=a*o-c,S=s*d,h>=0)if(u>=-S)if(u<=S){const w=1/d;h*=w,u*=w,m=h*(h+a*u+2*o)+u*(a*h+u+2*c)+l}else u=s,h=Math.max(0,-(a*u+o)),m=-h*h+u*(u+2*c)+l;else u=-s,h=Math.max(0,-(a*u+o)),m=-h*h+u*(u+2*c)+l;else u<=-S?(h=Math.max(0,-(-a*s+o)),u=h>0?-s:Math.min(Math.max(-s,-c),s),m=-h*h+u*(u+2*c)+l):u<=S?(h=0,u=Math.min(Math.max(-s,-c),s),m=u*(u+2*c)+l):(h=Math.max(0,-(a*s+o)),u=h>0?s:Math.min(Math.max(-s,-c),s),m=-h*h+u*(u+2*c)+l);else u=a>0?-s:s,h=Math.max(0,-(a*u+o)),m=-h*h+u*(u+2*c)+l;return i&&i.copy(this.origin).addScaledVector(this.direction,h),r&&r.copy(Ya).addScaledVector(Xr,u),m}intersectSphere(e,t){On.subVectors(e.center,this.origin);const i=On.dot(this.direction),r=On.dot(On)-i*i,s=e.radius*e.radius;if(r>s)return null;const a=Math.sqrt(s-r),o=i-a,c=i+a;return c<0?null:o<0?this.at(c,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,r,s,a,o,c;const l=1/this.direction.x,d=1/this.direction.y,h=1/this.direction.z,u=this.origin;return l>=0?(i=(e.min.x-u.x)*l,r=(e.max.x-u.x)*l):(i=(e.max.x-u.x)*l,r=(e.min.x-u.x)*l),d>=0?(s=(e.min.y-u.y)*d,a=(e.max.y-u.y)*d):(s=(e.max.y-u.y)*d,a=(e.min.y-u.y)*d),i>a||s>r||((s>i||isNaN(i))&&(i=s),(a<r||isNaN(r))&&(r=a),h>=0?(o=(e.min.z-u.z)*h,c=(e.max.z-u.z)*h):(o=(e.max.z-u.z)*h,c=(e.min.z-u.z)*h),i>c||o>r)||((o>i||i!==i)&&(i=o),(c<r||r!==r)&&(r=c),r<0)?null:this.at(i>=0?i:r,t)}intersectsBox(e){return this.intersectBox(e,On)!==null}intersectTriangle(e,t,i,r,s){Ka.subVectors(t,e),qr.subVectors(i,e),Za.crossVectors(Ka,qr);let a=this.direction.dot(Za),o;if(a>0){if(r)return null;o=1}else if(a<0)o=-1,a=-a;else return null;ni.subVectors(this.origin,e);const c=o*this.direction.dot(qr.crossVectors(ni,qr));if(c<0)return null;const l=o*this.direction.dot(Ka.cross(ni));if(l<0||c+l>a)return null;const d=-o*ni.dot(Za);return d<0?null:this.at(d/a,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class er extends ar{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Je(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new qn,this.combine=Ao,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const bl=new _t,_i=new Sa,Yr=new Ma,yl=new G,Kr=new G,Zr=new G,$r=new G,$a=new G,jr=new G,El=new G,Jr=new G;class tn extends Bt{constructor(e=new on,t=new er){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,t){const i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,a=i.morphTargetsRelative;t.fromBufferAttribute(r,e);const o=this.morphTargetInfluences;if(s&&o){jr.set(0,0,0);for(let c=0,l=s.length;c<l;c++){const d=o[c],h=s[c];d!==0&&($a.fromBufferAttribute(h,e),a?jr.addScaledVector($a,d):jr.addScaledVector($a.sub(t),d))}t.add(jr)}return t}raycast(e,t){const i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Yr.copy(i.boundingSphere),Yr.applyMatrix4(s),_i.copy(e.ray).recast(e.near),!(Yr.containsPoint(_i.origin)===!1&&(_i.intersectSphere(Yr,yl)===null||_i.origin.distanceToSquared(yl)>(e.far-e.near)**2))&&(bl.copy(s).invert(),_i.copy(e.ray).applyMatrix4(bl),!(i.boundingBox!==null&&_i.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,_i)))}_computeIntersections(e,t,i){let r;const s=this.geometry,a=this.material,o=s.index,c=s.attributes.position,l=s.attributes.uv,d=s.attributes.uv1,h=s.attributes.normal,u=s.groups,m=s.drawRange;if(o!==null)if(Array.isArray(a))for(let S=0,w=u.length;S<w;S++){const g=u[S],f=a[g.materialIndex],P=Math.max(g.start,m.start),T=Math.min(o.count,Math.min(g.start+g.count,m.start+m.count));for(let M=P,R=T;M<R;M+=3){const b=o.getX(M),v=o.getX(M+1),x=o.getX(M+2);r=Qr(this,f,e,i,l,d,h,b,v,x),r&&(r.faceIndex=Math.floor(M/3),r.face.materialIndex=g.materialIndex,t.push(r))}}else{const S=Math.max(0,m.start),w=Math.min(o.count,m.start+m.count);for(let g=S,f=w;g<f;g+=3){const P=o.getX(g),T=o.getX(g+1),M=o.getX(g+2);r=Qr(this,a,e,i,l,d,h,P,T,M),r&&(r.faceIndex=Math.floor(g/3),t.push(r))}}else if(c!==void 0)if(Array.isArray(a))for(let S=0,w=u.length;S<w;S++){const g=u[S],f=a[g.materialIndex],P=Math.max(g.start,m.start),T=Math.min(c.count,Math.min(g.start+g.count,m.start+m.count));for(let M=P,R=T;M<R;M+=3){const b=M,v=M+1,x=M+2;r=Qr(this,f,e,i,l,d,h,b,v,x),r&&(r.faceIndex=Math.floor(M/3),r.face.materialIndex=g.materialIndex,t.push(r))}}else{const S=Math.max(0,m.start),w=Math.min(c.count,m.start+m.count);for(let g=S,f=w;g<f;g+=3){const P=g,T=g+1,M=g+2;r=Qr(this,a,e,i,l,d,h,P,T,M),r&&(r.faceIndex=Math.floor(g/3),t.push(r))}}}}function Dd(n,e,t,i,r,s,a,o){let c;if(e.side===jt?c=i.intersectTriangle(a,s,r,!0,o):c=i.intersectTriangle(r,s,a,e.side===Wn,o),c===null)return null;Jr.copy(o),Jr.applyMatrix4(n.matrixWorld);const l=t.ray.origin.distanceTo(Jr);return l<t.near||l>t.far?null:{distance:l,point:Jr.clone(),object:n}}function Qr(n,e,t,i,r,s,a,o,c,l){n.getVertexPosition(o,Kr),n.getVertexPosition(c,Zr),n.getVertexPosition(l,$r);const d=Dd(n,e,t,i,Kr,Zr,$r,El);if(d){const h=new G;un.getBarycoord(El,Kr,Zr,$r,h),r&&(d.uv=un.getInterpolatedAttribute(r,o,c,l,h,new He)),s&&(d.uv1=un.getInterpolatedAttribute(s,o,c,l,h,new He)),a&&(d.normal=un.getInterpolatedAttribute(a,o,c,l,h,new G),d.normal.dot(i.direction)>0&&d.normal.multiplyScalar(-1));const u={a:o,b:c,c:l,normal:new G,materialIndex:0};un.getNormal(Kr,Zr,$r,u.normal),d.face=u,d.barycoord=h}return d}class $c extends Vt{constructor(e=null,t=1,i=1,r,s,a,o,c,l=kt,d=kt,h,u){super(null,a,o,c,l,d,r,s,h,u),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const ja=new G,Id=new G,Ud=new je;class kn{constructor(e=new G(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,r){return this.normal.set(e,t,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const r=ja.subVectors(i,t).cross(Id.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,i=!0){const r=e.delta(ja),s=this.normal.dot(r);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const a=-(e.start.dot(this.normal)+this.constant)/s;return i===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(r,a)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||Ud.getNormalMatrix(e),r=this.coplanarPoint(ja).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const xi=new Ma,Nd=new He(.5,.5),es=new G;class Ir{constructor(e=new kn,t=new kn,i=new kn,r=new kn,s=new kn,a=new kn){this.planes=[e,t,i,r,s,a]}set(e,t,i,r,s,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(i),o[3].copy(r),o[4].copy(s),o[5].copy(a),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=Mn,i=!1){const r=this.planes,s=e.elements,a=s[0],o=s[1],c=s[2],l=s[3],d=s[4],h=s[5],u=s[6],m=s[7],S=s[8],w=s[9],g=s[10],f=s[11],P=s[12],T=s[13],M=s[14],R=s[15];if(r[0].setComponents(l-a,m-d,f-S,R-P).normalize(),r[1].setComponents(l+a,m+d,f+S,R+P).normalize(),r[2].setComponents(l+o,m+h,f+w,R+T).normalize(),r[3].setComponents(l-o,m-h,f-w,R-T).normalize(),i)r[4].setComponents(c,u,g,M).normalize(),r[5].setComponents(l-c,m-u,f-g,R-M).normalize();else if(r[4].setComponents(l-c,m-u,f-g,R-M).normalize(),t===Mn)r[5].setComponents(l+c,m+u,f+g,R+M).normalize();else if(t===ir)r[5].setComponents(c,u,g,M).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),xi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),xi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(xi)}intersectsSprite(e){xi.center.set(0,0,0);const t=Nd.distanceTo(e.center);return xi.radius=.7071067811865476+t,xi.applyMatrix4(e.matrixWorld),this.intersectsSphere(xi)}intersectsSphere(e){const t=this.planes,i=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const r=t[i];if(es.x=r.normal.x>0?e.max.x:e.min.x,es.y=r.normal.y>0?e.max.y:e.min.y,es.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(es)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Xo extends Vt{constructor(e=[],t=ui,i,r,s,a,o,c,l,d){super(e,t,i,r,s,a,o,c,l,d),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class _o extends Vt{constructor(e,t,i,r,s,a,o,c,l){super(e,t,i,r,s,a,o,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Ci extends Vt{constructor(e,t,i=yn,r,s,a,o=kt,c=kt,l,d=Ln,h=1){if(d!==Ln&&d!==oi)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const u={width:e,height:t,depth:h};super(u,r,s,a,o,c,d,i,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new _a(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class jc extends Ci{constructor(e,t=yn,i=ui,r,s,a=kt,o=kt,c,l=Ln){const d={width:e,height:e,depth:1},h=[d,d,d,d,d,d];super(e,e,t,i,r,s,a,o,c,l),this.image=h,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class qo extends Vt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class fi extends on{constructor(e=1,t=1,i=1,r=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:r,heightSegments:s,depthSegments:a};const o=this;r=Math.floor(r),s=Math.floor(s),a=Math.floor(a);const c=[],l=[],d=[],h=[];let u=0,m=0;S("z","y","x",-1,-1,i,t,e,a,s,0),S("z","y","x",1,-1,i,t,-e,a,s,1),S("x","z","y",1,1,e,i,t,r,a,2),S("x","z","y",1,-1,e,i,-t,r,a,3),S("x","y","z",1,-1,e,t,i,r,s,4),S("x","y","z",-1,-1,e,t,-i,r,s,5),this.setIndex(c),this.setAttribute("position",new Yt(l,3)),this.setAttribute("normal",new Yt(d,3)),this.setAttribute("uv",new Yt(h,2));function S(w,g,f,P,T,M,R,b,v,x,p){const y=M/v,A=R/x,L=M/2,B=R/2,D=b/2,N=v+1,k=x+1;let W=0,$=0;const re=new G;for(let me=0;me<k;me++){const be=me*A-B;for(let _e=0;_e<N;_e++){const Be=_e*y-L;re[w]=Be*P,re[g]=be*T,re[f]=D,l.push(re.x,re.y,re.z),re[w]=0,re[g]=0,re[f]=b>0?1:-1,d.push(re.x,re.y,re.z),h.push(_e/v),h.push(1-me/x),W+=1}}for(let me=0;me<x;me++)for(let be=0;be<v;be++){const _e=u+be+N*me,Be=u+be+N*(me+1),Ze=u+(be+1)+N*(me+1),de=u+(be+1)+N*me;c.push(_e,Be,de),c.push(Be,Ze,de),$+=6}o.addGroup(m,$,p),m+=$,u+=W}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new fi(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class Ur extends on{constructor(e=1,t=1,i=1,r=32,s=1,a=!1,o=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:i,radialSegments:r,heightSegments:s,openEnded:a,thetaStart:o,thetaLength:c};const l=this;r=Math.floor(r),s=Math.floor(s);const d=[],h=[],u=[],m=[];let S=0;const w=[],g=i/2;let f=0;P(),a===!1&&(e>0&&T(!0),t>0&&T(!1)),this.setIndex(d),this.setAttribute("position",new Yt(h,3)),this.setAttribute("normal",new Yt(u,3)),this.setAttribute("uv",new Yt(m,2));function P(){const M=new G,R=new G;let b=0;const v=(t-e)/i;for(let x=0;x<=s;x++){const p=[],y=x/s,A=y*(t-e)+e;for(let L=0;L<=r;L++){const B=L/r,D=B*c+o,N=Math.sin(D),k=Math.cos(D);R.x=A*N,R.y=-y*i+g,R.z=A*k,h.push(R.x,R.y,R.z),M.set(N,v,k).normalize(),u.push(M.x,M.y,M.z),m.push(B,1-y),p.push(S++)}w.push(p)}for(let x=0;x<r;x++)for(let p=0;p<s;p++){const y=w[p][x],A=w[p+1][x],L=w[p+1][x+1],B=w[p][x+1];(e>0||p!==0)&&(d.push(y,A,B),b+=3),(t>0||p!==s-1)&&(d.push(A,L,B),b+=3)}l.addGroup(f,b,0),f+=b}function T(M){const R=S,b=new He,v=new G;let x=0;const p=M===!0?e:t,y=M===!0?1:-1;for(let L=1;L<=r;L++)h.push(0,g*y,0),u.push(0,y,0),m.push(.5,.5),S++;const A=S;for(let L=0;L<=r;L++){const D=L/r*c+o,N=Math.cos(D),k=Math.sin(D);v.x=p*k,v.y=g*y,v.z=p*N,h.push(v.x,v.y,v.z),u.push(0,y,0),b.x=N*.5+.5,b.y=k*.5*y+.5,m.push(b.x,b.y),S++}for(let L=0;L<r;L++){const B=R+L,D=A+L;M===!0?d.push(D,D+1,B):d.push(D+1,D,B),x+=3}l.addGroup(f,x,M===!0?1:2),f+=x}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ur(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Yo extends Ur{constructor(e=1,t=1,i=32,r=1,s=!1,a=0,o=Math.PI*2){super(0,e,t,i,r,s,a,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:i,heightSegments:r,openEnded:s,thetaStart:a,thetaLength:o}}static fromJSON(e){return new Yo(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Pi extends on{constructor(e=1,t=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:r};const s=e/2,a=t/2,o=Math.floor(i),c=Math.floor(r),l=o+1,d=c+1,h=e/o,u=t/c,m=[],S=[],w=[],g=[];for(let f=0;f<d;f++){const P=f*u-a;for(let T=0;T<l;T++){const M=T*h-s;S.push(M,-P,0),w.push(0,0,1),g.push(T/o),g.push(1-f/c)}}for(let f=0;f<c;f++)for(let P=0;P<o;P++){const T=P+l*f,M=P+l*(f+1),R=P+1+l*(f+1),b=P+1+l*f;m.push(T,M,b),m.push(M,R,b)}this.setIndex(m),this.setAttribute("position",new Yt(S,3)),this.setAttribute("normal",new Yt(w,3)),this.setAttribute("uv",new Yt(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Pi(e.width,e.height,e.widthSegments,e.heightSegments)}}class ba extends on{constructor(e=1,t=32,i=16,r=0,s=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:r,phiLength:s,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));const c=Math.min(a+o,Math.PI);let l=0;const d=[],h=new G,u=new G,m=[],S=[],w=[],g=[];for(let f=0;f<=i;f++){const P=[],T=f/i,M=a+T*o,R=e*Math.cos(M),b=Math.sqrt(e*e-R*R);let v=0;f===0&&a===0?v=.5/t:f===i&&c===Math.PI&&(v=-.5/t);for(let x=0;x<=t;x++){const p=x/t,y=r+p*s;h.x=-b*Math.cos(y),h.y=R,h.z=b*Math.sin(y),S.push(h.x,h.y,h.z),u.copy(h).normalize(),w.push(u.x,u.y,u.z),g.push(p+v,1-T),P.push(l++)}d.push(P)}for(let f=0;f<i;f++)for(let P=0;P<t;P++){const T=d[f][P+1],M=d[f][P],R=d[f+1][P],b=d[f+1][P+1];(f!==0||a>0)&&m.push(T,M,b),(f!==i-1||c<Math.PI)&&m.push(M,R,b)}this.setIndex(m),this.setAttribute("position",new Yt(S,3)),this.setAttribute("normal",new Yt(w,3)),this.setAttribute("uv",new Yt(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ba(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}function rr(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const r=n[t][i];if(Tl(r))r.isRenderTargetTexture?(Ke("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=r.clone();else if(Array.isArray(r))if(Tl(r[0])){const s=[];for(let a=0,o=r.length;a<o;a++)s[a]=r[a].clone();e[t][i]=s}else e[t][i]=r.slice();else e[t][i]=r}}return e}function Zt(n){const e={};for(let t=0;t<n.length;t++){const i=rr(n[t]);for(const r in i)e[r]=i[r]}return e}function Tl(n){return n&&(n.isColor||n.isMatrix3||n.isMatrix4||n.isVector2||n.isVector3||n.isVector4||n.isTexture||n.isQuaternion)}function Fd(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function Jc(n){const e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:ht.workingColorSpace}const Qc={clone:rr,merge:Zt};var Od=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,kd=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class En extends ar{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Od,this.fragmentShader=kd,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=rr(e.uniforms),this.uniformsGroups=Fd(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const a=this.uniforms[r].value;a&&a.isTexture?t.uniforms[r]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[r]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[r]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[r]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[r]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[r]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[r]={type:"m4",value:a.toArray()}:t.uniforms[r]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(const i in e.uniforms){const r=e.uniforms[i];switch(this.uniforms[i]={},r.type){case"t":this.uniforms[i].value=t[r.value]||null;break;case"c":this.uniforms[i].value=new Je().setHex(r.value);break;case"v2":this.uniforms[i].value=new He().fromArray(r.value);break;case"v3":this.uniforms[i].value=new G().fromArray(r.value);break;case"v4":this.uniforms[i].value=new mt().fromArray(r.value);break;case"m3":this.uniforms[i].value=new je().fromArray(r.value);break;case"m4":this.uniforms[i].value=new _t().fromArray(r.value);break;default:this.uniforms[i].value=r.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(const i in e.extensions)this.extensions[i]=e.extensions[i];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}}class eu extends En{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class ri extends ar{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Je(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Je(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=na,this.normalScale=new He(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new qn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class tu extends ar{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Nc,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class nu extends ar{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class ya extends Bt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Je(e),this.intensity=t}dispose(){this.dispatchEvent({type:"dispose"})}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}}class iu extends ya{constructor(e,t,i){super(e,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Bt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Je(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){const t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}}const Ja=new _t,Al=new G,wl=new G;class Bd{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new He(512,512),this.mapType=en,this.map=null,this.mapPass=null,this.matrix=new _t,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ir,this._frameExtents=new He(1,1),this._viewportCount=1,this._viewports=[new mt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,i=this.matrix;Al.setFromMatrixPosition(e.matrixWorld),t.position.copy(Al),wl.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(wl),t.updateMatrixWorld(),Ja.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Ja,t.coordinateSystem,t.reversedDepth),t.coordinateSystem===ir||t.reversedDepth?i.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(Ja)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const ts=new G,ns=new Xn,An=new G;class Ea extends Bt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new _t,this.projectionMatrix=new _t,this.projectionMatrixInverse=new _t,this.coordinateSystem=Mn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(ts,ns,An),An.x===1&&An.y===1&&An.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(ts,ns,An.set(1,1,1)).invert()}updateWorldMatrix(e,t,i=!1){super.updateWorldMatrix(e,t,i),this.matrixWorld.decompose(ts,ns,An),An.x===1&&An.y===1&&An.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(ts,ns,An.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const ii=new G,Rl=new He,Cl=new He;class an extends Ea{constructor(e=50,t=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Cr*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(br*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Cr*2*Math.atan(Math.tan(br*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){ii.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(ii.x,ii.y).multiplyScalar(-e/ii.z),ii.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(ii.x,ii.y).multiplyScalar(-e/ii.z)}getViewSize(e,t){return this.getViewBounds(e,Rl,Cl),t.subVectors(Cl,Rl)}setViewOffset(e,t,i,r,s,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(br*.5*this.fov)/this.zoom,i=2*t,r=this.aspect*i,s=-.5*r;const a=this.view;if(this.view!==null&&this.view.enabled){const c=a.fullWidth,l=a.fullHeight;s+=a.offsetX*r/c,t-=a.offsetY*i/l,r*=a.width/c,i*=a.height/l}const o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class Ta extends Ea{constructor(e=-1,t=1,i=1,r=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=r,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,r,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=i-e,a=i+e,o=r+t,c=r-t;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,d=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=l*this.view.offsetX,a=s+l*this.view.width,o-=d*this.view.offsetY,c=o-d*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class zd extends Bd{constructor(){super(new Ta(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class xo extends ya{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Bt.DEFAULT_UP),this.updateMatrix(),this.target=new Bt,this.shadow=new zd}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}}class ru extends ya{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}const qi=-90,Yi=1;class su extends Bt{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new an(qi,Yi,e,t);r.layers=this.layers,this.add(r);const s=new an(qi,Yi,e,t);s.layers=this.layers,this.add(s);const a=new an(qi,Yi,e,t);a.layers=this.layers,this.add(a);const o=new an(qi,Yi,e,t);o.layers=this.layers,this.add(o);const c=new an(qi,Yi,e,t);c.layers=this.layers,this.add(c);const l=new an(qi,Yi,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,r,s,a,o,c]=t;for(const l of t)this.remove(l);if(e===Mn)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===ir)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,a,o,c,l,d]=this.children,h=e.getRenderTarget(),u=e.getActiveCubeFace(),m=e.getActiveMipmapLevel(),S=e.xr.enabled;e.xr.enabled=!1;const w=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let g=!1;e.isWebGLRenderer===!0?g=e.state.buffers.depth.getReversed():g=e.reversedDepthBuffer,e.setRenderTarget(i,0,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(i,1,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(i,2,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(i,3,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),e.setRenderTarget(i,4,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),i.texture.generateMipmaps=w,e.setRenderTarget(i,5,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,d),e.setRenderTarget(h,u,m),e.xr.enabled=S,i.texture.needsPMREMUpdate=!0}}class au extends an{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}const Pl=new _t;class ou{constructor(e,t,i=0,r=1/0){this.ray=new Sa(e,t),this.near=i,this.far=r,this.camera=null,this.layers=new xa,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,t.projectionMatrix.elements[14]).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):ft("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return Pl.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Pl),this}intersectObject(e,t=!0,i=[]){return vo(e,this,i,t),i.sort(Ll),i}intersectObjects(e,t=!0,i=[]){for(let r=0,s=e.length;r<s;r++)vo(e[r],this,i,t);return i.sort(Ll),i}}function Ll(n,e){return n.distance-e.distance}function vo(n,e,t,i){let r=!0;if(n.layers.test(e.layers)&&n.raycast(e,t)===!1&&(r=!1),r===!0&&i===!0){const s=n.children;for(let a=0,o=s.length;a<o;a++)vo(s[a],e,t,!0)}}class sa{constructor(e=1,t=0,i=0){this.radius=e,this.phi=t,this.theta=i}set(e,t,i){return this.radius=e,this.phi=t,this.theta=i,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=ut(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,i){return this.radius=Math.sqrt(e*e+t*t+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,i),this.phi=Math.acos(ut(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class Ko{static{Ko.prototype.isMatrix2=!0}constructor(e,t,i,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,i,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let i=0;i<4;i++)this.elements[i]=e[i+t];return this}set(e,t,i,r){const s=this.elements;return s[0]=e,s[2]=t,s[1]=i,s[3]=r,this}}const Dl=new He;class Mo{constructor(e=new He(1/0,1/0),t=new He(-1/0,-1/0)){this.isBox2=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=Dl.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=1/0,this.max.x=this.max.y=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y}getCenter(e){return this.isEmpty()?e.set(0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Dl).distanceTo(e)}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}class lu extends Yn{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){if(e===void 0){Ke("Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}}function Il(n,e,t,i){const r=Gd(i);switch(t){case ko:return n*e;case zo:return n*e/r.components*r.byteLength;case ha:return n*e/r.components*r.byteLength;case di:return n*e*2/r.components*r.byteLength;case fa:return n*e*2/r.components*r.byteLength;case Bo:return n*e*3/r.components*r.byteLength;case dn:return n*e*4/r.components*r.byteLength;case pa:return n*e*4/r.components*r.byteLength;case xr:case vr:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Mr:case Sr:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case ws:case Cs:return Math.max(n,16)*Math.max(e,8)/4;case As:case Rs:return Math.max(n,8)*Math.max(e,8)/2;case Ps:case Ls:case Is:case Us:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Ds:case Tr:case Ns:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Fs:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Os:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case ks:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case Bs:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case zs:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case Gs:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case Vs:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case Hs:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case Ws:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case Xs:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case qs:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case Ys:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case Ks:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case Zs:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case $s:case js:case Js:return Math.ceil(n/4)*Math.ceil(e/4)*16;case Qs:case ea:return Math.ceil(n/4)*Math.ceil(e/4)*8;case Ar:case ta:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Gd(n){switch(n){case en:case Uo:return{byteLength:1,components:1};case tr:case No:case Pn:return{byteLength:2,components:1};case ua:case da:return{byteLength:2,components:4};case yn:case ca:case vn:return{byteLength:4,components:1};case Fo:case Oo:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:oa}}));typeof window<"u"&&(window.__THREE__?Ke("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=oa);function cu(){let n=null,e=!1,t=null,i=null;function r(s,a){t(s,a),i=n.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&n!==null&&(i=n.requestAnimationFrame(r),e=!0)},stop:function(){n!==null&&n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){n=s}}}function Vd(n){const e=new WeakMap;function t(o,c){const l=o.array,d=o.usage,h=l.byteLength,u=n.createBuffer();n.bindBuffer(c,u),n.bufferData(c,l,d),o.onUploadCallback();let m;if(l instanceof Float32Array)m=n.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)m=n.HALF_FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?m=n.HALF_FLOAT:m=n.UNSIGNED_SHORT;else if(l instanceof Int16Array)m=n.SHORT;else if(l instanceof Uint32Array)m=n.UNSIGNED_INT;else if(l instanceof Int32Array)m=n.INT;else if(l instanceof Int8Array)m=n.BYTE;else if(l instanceof Uint8Array)m=n.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)m=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:u,type:m,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:h}}function i(o,c,l){const d=c.array,h=c.updateRanges;if(n.bindBuffer(l,o),h.length===0)n.bufferSubData(l,0,d);else{h.sort((m,S)=>m.start-S.start);let u=0;for(let m=1;m<h.length;m++){const S=h[u],w=h[m];w.start<=S.start+S.count+1?S.count=Math.max(S.count,w.start+w.count-S.start):(++u,h[u]=w)}h.length=u+1;for(let m=0,S=h.length;m<S;m++){const w=h[m];n.bufferSubData(l,w.start*d.BYTES_PER_ELEMENT,d,w.start,w.count)}c.clearUpdateRanges()}c.onUploadCallback()}function r(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);const c=e.get(o);c&&(n.deleteBuffer(c.buffer),e.delete(o))}function a(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const d=e.get(o);(!d||d.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const l=e.get(o);if(l===void 0)e.set(o,t(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(l.buffer,o,c),l.version=o.version}}return{get:r,remove:s,update:a}}var Hd=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Wd=`#ifdef USE_ALPHAHASH
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
#endif`,Xd=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,qd=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Yd=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Kd=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Zd=`#ifdef USE_AOMAP
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
#endif`,$d=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,jd=`#ifdef USE_BATCHING
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
#endif`,Jd=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Qd=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,eh=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,th=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,nh=`#ifdef USE_IRIDESCENCE
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
#endif`,ih=`#ifdef USE_BUMPMAP
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
#endif`,rh=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,sh=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,ah=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,oh=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,lh=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,ch=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,uh=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,dh=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,hh=`#define PI 3.141592653589793
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
} // validated`,fh=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,ph=`vec3 transformedNormal = objectNormal;
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
#endif`,mh=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,gh=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,_h=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,xh=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,vh="gl_FragColor = linearToOutputTexel( gl_FragColor );",Mh=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Sh=`#ifdef USE_ENVMAP
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
#endif`,bh=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,yh=`#ifdef USE_ENVMAP
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
#endif`,Eh=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Th=`#ifdef USE_ENVMAP
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
#endif`,Ah=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,wh=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Rh=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Ch=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Ph=`#ifdef USE_GRADIENTMAP
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
}`,Lh=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Dh=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Ih=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Uh=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,Nh=`#ifdef USE_ENVMAP
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
#endif`,Fh=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Oh=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,kh=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Bh=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,zh=`PhysicalMaterial material;
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
#endif`,Gh=`uniform sampler2D dfgLUT;
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
}`,Vh=`
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
#endif`,Hh=`#if defined( RE_IndirectDiffuse )
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
#endif`,Wh=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Xh=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,qh=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Yh=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Kh=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Zh=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,$h=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,jh=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Jh=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Qh=`#if defined( USE_POINTS_UV )
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
#endif`,ef=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,tf=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,nf=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,rf=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,sf=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,af=`#ifdef USE_MORPHTARGETS
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
#endif`,of=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,lf=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,cf=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,uf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,df=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,hf=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,ff=`#ifdef USE_NORMALMAP
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
#endif`,pf=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,mf=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,gf=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,_f=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,xf=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,vf=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Mf=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Sf=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,bf=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,yf=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Ef=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Tf=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Af=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,wf=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Rf=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Cf=`float getShadowMask() {
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
}`,Pf=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Lf=`#ifdef USE_SKINNING
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
#endif`,Df=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,If=`#ifdef USE_SKINNING
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
#endif`,Uf=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Nf=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Ff=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Of=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,kf=`#ifdef USE_TRANSMISSION
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
#endif`,Bf=`#ifdef USE_TRANSMISSION
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
#endif`,zf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Gf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Vf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Hf=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Wf=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Xf=`uniform sampler2D t2D;
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
}`,qf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Yf=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Kf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Zf=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,$f=`#include <common>
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
}`,jf=`#if DEPTH_PACKING == 3200
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
}`,Jf=`#define DISTANCE
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
}`,Qf=`#define DISTANCE
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
}`,ep=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,tp=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,np=`uniform float scale;
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
}`,ip=`uniform vec3 diffuse;
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
}`,rp=`#include <common>
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
}`,sp=`uniform vec3 diffuse;
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
}`,ap=`#define LAMBERT
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
}`,op=`#define LAMBERT
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
}`,lp=`#define MATCAP
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
}`,cp=`#define MATCAP
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
}`,up=`#define NORMAL
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
}`,dp=`#define NORMAL
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
}`,hp=`#define PHONG
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
}`,fp=`#define PHONG
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
}`,pp=`#define STANDARD
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
}`,mp=`#define STANDARD
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
}`,gp=`#define TOON
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
}`,_p=`#define TOON
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
}`,xp=`uniform float size;
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
}`,vp=`uniform vec3 diffuse;
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
}`,Mp=`#include <common>
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
}`,Sp=`uniform vec3 color;
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
}`,bp=`uniform float rotation;
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
}`,yp=`uniform vec3 diffuse;
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
}`,ot={alphahash_fragment:Hd,alphahash_pars_fragment:Wd,alphamap_fragment:Xd,alphamap_pars_fragment:qd,alphatest_fragment:Yd,alphatest_pars_fragment:Kd,aomap_fragment:Zd,aomap_pars_fragment:$d,batching_pars_vertex:jd,batching_vertex:Jd,begin_vertex:Qd,beginnormal_vertex:eh,bsdfs:th,iridescence_fragment:nh,bumpmap_pars_fragment:ih,clipping_planes_fragment:rh,clipping_planes_pars_fragment:sh,clipping_planes_pars_vertex:ah,clipping_planes_vertex:oh,color_fragment:lh,color_pars_fragment:ch,color_pars_vertex:uh,color_vertex:dh,common:hh,cube_uv_reflection_fragment:fh,defaultnormal_vertex:ph,displacementmap_pars_vertex:mh,displacementmap_vertex:gh,emissivemap_fragment:_h,emissivemap_pars_fragment:xh,colorspace_fragment:vh,colorspace_pars_fragment:Mh,envmap_fragment:Sh,envmap_common_pars_fragment:bh,envmap_pars_fragment:yh,envmap_pars_vertex:Eh,envmap_physical_pars_fragment:Nh,envmap_vertex:Th,fog_vertex:Ah,fog_pars_vertex:wh,fog_fragment:Rh,fog_pars_fragment:Ch,gradientmap_pars_fragment:Ph,lightmap_pars_fragment:Lh,lights_lambert_fragment:Dh,lights_lambert_pars_fragment:Ih,lights_pars_begin:Uh,lights_toon_fragment:Fh,lights_toon_pars_fragment:Oh,lights_phong_fragment:kh,lights_phong_pars_fragment:Bh,lights_physical_fragment:zh,lights_physical_pars_fragment:Gh,lights_fragment_begin:Vh,lights_fragment_maps:Hh,lights_fragment_end:Wh,lightprobes_pars_fragment:Xh,logdepthbuf_fragment:qh,logdepthbuf_pars_fragment:Yh,logdepthbuf_pars_vertex:Kh,logdepthbuf_vertex:Zh,map_fragment:$h,map_pars_fragment:jh,map_particle_fragment:Jh,map_particle_pars_fragment:Qh,metalnessmap_fragment:ef,metalnessmap_pars_fragment:tf,morphinstance_vertex:nf,morphcolor_vertex:rf,morphnormal_vertex:sf,morphtarget_pars_vertex:af,morphtarget_vertex:of,normal_fragment_begin:lf,normal_fragment_maps:cf,normal_pars_fragment:uf,normal_pars_vertex:df,normal_vertex:hf,normalmap_pars_fragment:ff,clearcoat_normal_fragment_begin:pf,clearcoat_normal_fragment_maps:mf,clearcoat_pars_fragment:gf,iridescence_pars_fragment:_f,opaque_fragment:xf,packing:vf,premultiplied_alpha_fragment:Mf,project_vertex:Sf,dithering_fragment:bf,dithering_pars_fragment:yf,roughnessmap_fragment:Ef,roughnessmap_pars_fragment:Tf,shadowmap_pars_fragment:Af,shadowmap_pars_vertex:wf,shadowmap_vertex:Rf,shadowmask_pars_fragment:Cf,skinbase_vertex:Pf,skinning_pars_vertex:Lf,skinning_vertex:Df,skinnormal_vertex:If,specularmap_fragment:Uf,specularmap_pars_fragment:Nf,tonemapping_fragment:Ff,tonemapping_pars_fragment:Of,transmission_fragment:kf,transmission_pars_fragment:Bf,uv_pars_fragment:zf,uv_pars_vertex:Gf,uv_vertex:Vf,worldpos_vertex:Hf,background_vert:Wf,background_frag:Xf,backgroundCube_vert:qf,backgroundCube_frag:Yf,cube_vert:Kf,cube_frag:Zf,depth_vert:$f,depth_frag:jf,distance_vert:Jf,distance_frag:Qf,equirect_vert:ep,equirect_frag:tp,linedashed_vert:np,linedashed_frag:ip,meshbasic_vert:rp,meshbasic_frag:sp,meshlambert_vert:ap,meshlambert_frag:op,meshmatcap_vert:lp,meshmatcap_frag:cp,meshnormal_vert:up,meshnormal_frag:dp,meshphong_vert:hp,meshphong_frag:fp,meshphysical_vert:pp,meshphysical_frag:mp,meshtoon_vert:gp,meshtoon_frag:_p,points_vert:xp,points_frag:vp,shadow_vert:Mp,shadow_frag:Sp,sprite_vert:bp,sprite_frag:yp},Re={common:{diffuse:{value:new Je(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new je},alphaMap:{value:null},alphaMapTransform:{value:new je},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new je}},envmap:{envMap:{value:null},envMapRotation:{value:new je},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new je}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new je}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new je},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new je},normalScale:{value:new He(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new je},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new je}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new je}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new je}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Je(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new G},probesMax:{value:new G},probesResolution:{value:new G}},points:{diffuse:{value:new Je(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new je},alphaTest:{value:0},uvTransform:{value:new je}},sprite:{diffuse:{value:new Je(16777215)},opacity:{value:1},center:{value:new He(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new je},alphaMap:{value:null},alphaMapTransform:{value:new je},alphaTest:{value:0}}},xn={basic:{uniforms:Zt([Re.common,Re.specularmap,Re.envmap,Re.aomap,Re.lightmap,Re.fog]),vertexShader:ot.meshbasic_vert,fragmentShader:ot.meshbasic_frag},lambert:{uniforms:Zt([Re.common,Re.specularmap,Re.envmap,Re.aomap,Re.lightmap,Re.emissivemap,Re.bumpmap,Re.normalmap,Re.displacementmap,Re.fog,Re.lights,{emissive:{value:new Je(0)},envMapIntensity:{value:1}}]),vertexShader:ot.meshlambert_vert,fragmentShader:ot.meshlambert_frag},phong:{uniforms:Zt([Re.common,Re.specularmap,Re.envmap,Re.aomap,Re.lightmap,Re.emissivemap,Re.bumpmap,Re.normalmap,Re.displacementmap,Re.fog,Re.lights,{emissive:{value:new Je(0)},specular:{value:new Je(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:ot.meshphong_vert,fragmentShader:ot.meshphong_frag},standard:{uniforms:Zt([Re.common,Re.envmap,Re.aomap,Re.lightmap,Re.emissivemap,Re.bumpmap,Re.normalmap,Re.displacementmap,Re.roughnessmap,Re.metalnessmap,Re.fog,Re.lights,{emissive:{value:new Je(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ot.meshphysical_vert,fragmentShader:ot.meshphysical_frag},toon:{uniforms:Zt([Re.common,Re.aomap,Re.lightmap,Re.emissivemap,Re.bumpmap,Re.normalmap,Re.displacementmap,Re.gradientmap,Re.fog,Re.lights,{emissive:{value:new Je(0)}}]),vertexShader:ot.meshtoon_vert,fragmentShader:ot.meshtoon_frag},matcap:{uniforms:Zt([Re.common,Re.bumpmap,Re.normalmap,Re.displacementmap,Re.fog,{matcap:{value:null}}]),vertexShader:ot.meshmatcap_vert,fragmentShader:ot.meshmatcap_frag},points:{uniforms:Zt([Re.points,Re.fog]),vertexShader:ot.points_vert,fragmentShader:ot.points_frag},dashed:{uniforms:Zt([Re.common,Re.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ot.linedashed_vert,fragmentShader:ot.linedashed_frag},depth:{uniforms:Zt([Re.common,Re.displacementmap]),vertexShader:ot.depth_vert,fragmentShader:ot.depth_frag},normal:{uniforms:Zt([Re.common,Re.bumpmap,Re.normalmap,Re.displacementmap,{opacity:{value:1}}]),vertexShader:ot.meshnormal_vert,fragmentShader:ot.meshnormal_frag},sprite:{uniforms:Zt([Re.sprite,Re.fog]),vertexShader:ot.sprite_vert,fragmentShader:ot.sprite_frag},background:{uniforms:{uvTransform:{value:new je},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ot.background_vert,fragmentShader:ot.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new je}},vertexShader:ot.backgroundCube_vert,fragmentShader:ot.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ot.cube_vert,fragmentShader:ot.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ot.equirect_vert,fragmentShader:ot.equirect_frag},distance:{uniforms:Zt([Re.common,Re.displacementmap,{referencePosition:{value:new G},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ot.distance_vert,fragmentShader:ot.distance_frag},shadow:{uniforms:Zt([Re.lights,Re.fog,{color:{value:new Je(0)},opacity:{value:1}}]),vertexShader:ot.shadow_vert,fragmentShader:ot.shadow_frag}};xn.physical={uniforms:Zt([xn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new je},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new je},clearcoatNormalScale:{value:new He(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new je},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new je},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new je},sheen:{value:0},sheenColor:{value:new Je(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new je},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new je},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new je},transmissionSamplerSize:{value:new He},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new je},attenuationDistance:{value:0},attenuationColor:{value:new Je(0)},specularColor:{value:new Je(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new je},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new je},anisotropyVector:{value:new He},anisotropyMap:{value:null},anisotropyMapTransform:{value:new je}}]),vertexShader:ot.meshphysical_vert,fragmentShader:ot.meshphysical_frag};const is={r:0,b:0,g:0},Ep=new _t,uu=new je;uu.set(-1,0,0,0,1,0,0,0,1);function Tp(n,e,t,i,r,s){const a=new Je(0);let o=r===!0?0:1,c,l,d=null,h=0,u=null;function m(P){let T=P.isScene===!0?P.background:null;if(T&&T.isTexture){const M=P.backgroundBlurriness>0;T=e.get(T,M)}return T}function S(P){let T=!1;const M=m(P);M===null?g(a,o):M&&M.isColor&&(g(M,1),T=!0);const R=n.xr.getEnvironmentBlendMode();R==="additive"?t.buffers.color.setClear(0,0,0,1,s):R==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,s),(n.autoClear||T)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function w(P,T){const M=m(T);M&&(M.isCubeTexture||M.mapping===Dr)?(l===void 0&&(l=new tn(new fi(1,1,1),new En({name:"BackgroundCubeMaterial",uniforms:rr(xn.backgroundCube.uniforms),vertexShader:xn.backgroundCube.vertexShader,fragmentShader:xn.backgroundCube.fragmentShader,side:jt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(R,b,v){this.matrixWorld.copyPosition(v.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(l)),l.material.uniforms.envMap.value=M,l.material.uniforms.backgroundBlurriness.value=T.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=T.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(Ep.makeRotationFromEuler(T.backgroundRotation)).transpose(),M.isCubeTexture&&M.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(uu),l.material.toneMapped=ht.getTransfer(M.colorSpace)!==gt,(d!==M||h!==M.version||u!==n.toneMapping)&&(l.material.needsUpdate=!0,d=M,h=M.version,u=n.toneMapping),l.layers.enableAll(),P.unshift(l,l.geometry,l.material,0,0,null)):M&&M.isTexture&&(c===void 0&&(c=new tn(new Pi(2,2),new En({name:"BackgroundMaterial",uniforms:rr(xn.background.uniforms),vertexShader:xn.background.vertexShader,fragmentShader:xn.background.fragmentShader,side:Wn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=M,c.material.uniforms.backgroundIntensity.value=T.backgroundIntensity,c.material.toneMapped=ht.getTransfer(M.colorSpace)!==gt,M.matrixAutoUpdate===!0&&M.updateMatrix(),c.material.uniforms.uvTransform.value.copy(M.matrix),(d!==M||h!==M.version||u!==n.toneMapping)&&(c.material.needsUpdate=!0,d=M,h=M.version,u=n.toneMapping),c.layers.enableAll(),P.unshift(c,c.geometry,c.material,0,0,null))}function g(P,T){P.getRGB(is,Jc(n)),t.buffers.color.setClear(is.r,is.g,is.b,T,s)}function f(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(P,T=1){a.set(P),o=T,g(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(P){o=P,g(a,o)},render:S,addToRenderList:w,dispose:f}}function Ap(n,e){const t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},r=u(null);let s=r,a=!1;function o(A,L,B,D,N){let k=!1;const W=h(A,D,B,L);s!==W&&(s=W,l(s.object)),k=m(A,D,B,N),k&&S(A,D,B,N),N!==null&&e.update(N,n.ELEMENT_ARRAY_BUFFER),(k||a)&&(a=!1,M(A,L,B,D),N!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(N).buffer))}function c(){return n.createVertexArray()}function l(A){return n.bindVertexArray(A)}function d(A){return n.deleteVertexArray(A)}function h(A,L,B,D){const N=D.wireframe===!0;let k=i[L.id];k===void 0&&(k={},i[L.id]=k);const W=A.isInstancedMesh===!0?A.id:0;let $=k[W];$===void 0&&($={},k[W]=$);let re=$[B.id];re===void 0&&(re={},$[B.id]=re);let me=re[N];return me===void 0&&(me=u(c()),re[N]=me),me}function u(A){const L=[],B=[],D=[];for(let N=0;N<t;N++)L[N]=0,B[N]=0,D[N]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:L,enabledAttributes:B,attributeDivisors:D,object:A,attributes:{},index:null}}function m(A,L,B,D){const N=s.attributes,k=L.attributes;let W=0;const $=B.getAttributes();for(const re in $)if($[re].location>=0){const be=N[re];let _e=k[re];if(_e===void 0&&(re==="instanceMatrix"&&A.instanceMatrix&&(_e=A.instanceMatrix),re==="instanceColor"&&A.instanceColor&&(_e=A.instanceColor)),be===void 0||be.attribute!==_e||_e&&be.data!==_e.data)return!0;W++}return s.attributesNum!==W||s.index!==D}function S(A,L,B,D){const N={},k=L.attributes;let W=0;const $=B.getAttributes();for(const re in $)if($[re].location>=0){let be=k[re];be===void 0&&(re==="instanceMatrix"&&A.instanceMatrix&&(be=A.instanceMatrix),re==="instanceColor"&&A.instanceColor&&(be=A.instanceColor));const _e={};_e.attribute=be,be&&be.data&&(_e.data=be.data),N[re]=_e,W++}s.attributes=N,s.attributesNum=W,s.index=D}function w(){const A=s.newAttributes;for(let L=0,B=A.length;L<B;L++)A[L]=0}function g(A){f(A,0)}function f(A,L){const B=s.newAttributes,D=s.enabledAttributes,N=s.attributeDivisors;B[A]=1,D[A]===0&&(n.enableVertexAttribArray(A),D[A]=1),N[A]!==L&&(n.vertexAttribDivisor(A,L),N[A]=L)}function P(){const A=s.newAttributes,L=s.enabledAttributes;for(let B=0,D=L.length;B<D;B++)L[B]!==A[B]&&(n.disableVertexAttribArray(B),L[B]=0)}function T(A,L,B,D,N,k,W){W===!0?n.vertexAttribIPointer(A,L,B,N,k):n.vertexAttribPointer(A,L,B,D,N,k)}function M(A,L,B,D){w();const N=D.attributes,k=B.getAttributes(),W=L.defaultAttributeValues;for(const $ in k){const re=k[$];if(re.location>=0){let me=N[$];if(me===void 0&&($==="instanceMatrix"&&A.instanceMatrix&&(me=A.instanceMatrix),$==="instanceColor"&&A.instanceColor&&(me=A.instanceColor)),me!==void 0){const be=me.normalized,_e=me.itemSize,Be=e.get(me);if(Be===void 0)continue;const Ze=Be.buffer,de=Be.type,z=Be.bytesPerElement,ve=de===n.INT||de===n.UNSIGNED_INT||me.gpuType===ca;if(me.isInterleavedBufferAttribute){const fe=me.data,We=fe.stride,Ye=me.offset;if(fe.isInstancedInterleavedBuffer){for(let ze=0;ze<re.locationSize;ze++)f(re.location+ze,fe.meshPerAttribute);A.isInstancedMesh!==!0&&D._maxInstanceCount===void 0&&(D._maxInstanceCount=fe.meshPerAttribute*fe.count)}else for(let ze=0;ze<re.locationSize;ze++)g(re.location+ze);n.bindBuffer(n.ARRAY_BUFFER,Ze);for(let ze=0;ze<re.locationSize;ze++)T(re.location+ze,_e/re.locationSize,de,be,We*z,(Ye+_e/re.locationSize*ze)*z,ve)}else{if(me.isInstancedBufferAttribute){for(let fe=0;fe<re.locationSize;fe++)f(re.location+fe,me.meshPerAttribute);A.isInstancedMesh!==!0&&D._maxInstanceCount===void 0&&(D._maxInstanceCount=me.meshPerAttribute*me.count)}else for(let fe=0;fe<re.locationSize;fe++)g(re.location+fe);n.bindBuffer(n.ARRAY_BUFFER,Ze);for(let fe=0;fe<re.locationSize;fe++)T(re.location+fe,_e/re.locationSize,de,be,_e*z,_e/re.locationSize*fe*z,ve)}}else if(W!==void 0){const be=W[$];if(be!==void 0)switch(be.length){case 2:n.vertexAttrib2fv(re.location,be);break;case 3:n.vertexAttrib3fv(re.location,be);break;case 4:n.vertexAttrib4fv(re.location,be);break;default:n.vertexAttrib1fv(re.location,be)}}}}P()}function R(){p();for(const A in i){const L=i[A];for(const B in L){const D=L[B];for(const N in D){const k=D[N];for(const W in k)d(k[W].object),delete k[W];delete D[N]}}delete i[A]}}function b(A){if(i[A.id]===void 0)return;const L=i[A.id];for(const B in L){const D=L[B];for(const N in D){const k=D[N];for(const W in k)d(k[W].object),delete k[W];delete D[N]}}delete i[A.id]}function v(A){for(const L in i){const B=i[L];for(const D in B){const N=B[D];if(N[A.id]===void 0)continue;const k=N[A.id];for(const W in k)d(k[W].object),delete k[W];delete N[A.id]}}}function x(A){for(const L in i){const B=i[L],D=A.isInstancedMesh===!0?A.id:0,N=B[D];if(N!==void 0){for(const k in N){const W=N[k];for(const $ in W)d(W[$].object),delete W[$];delete N[k]}delete B[D],Object.keys(B).length===0&&delete i[L]}}}function p(){y(),a=!0,s!==r&&(s=r,l(s.object))}function y(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:o,reset:p,resetDefaultState:y,dispose:R,releaseStatesOfGeometry:b,releaseStatesOfObject:x,releaseStatesOfProgram:v,initAttributes:w,enableAttribute:g,disableUnusedAttributes:P}}function wp(n,e,t){let i;function r(c){i=c}function s(c,l){n.drawArrays(i,c,l),t.update(l,i,1)}function a(c,l,d){d!==0&&(n.drawArraysInstanced(i,c,l,d),t.update(l,i,d))}function o(c,l,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,l,0,d);let u=0;for(let m=0;m<d;m++)u+=l[m];t.update(u,i,1)}this.setMode=r,this.render=s,this.renderInstances=a,this.renderMultiDraw=o}function Rp(n,e,t,i){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const v=e.get("EXT_texture_filter_anisotropic");r=n.getParameter(v.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function a(v){return!(v!==dn&&i.convert(v)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(v){const x=v===Pn&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(v!==en&&i.convert(v)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&v!==vn&&!x)}function c(v){if(v==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";v="mediump"}return v==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp";const d=c(l);d!==l&&(Ke("WebGLRenderer:",l,"not supported, using",d,"instead."),l=d);const h=t.logarithmicDepthBuffer===!0,u=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&u===!1&&Ke("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const m=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),S=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),w=n.getParameter(n.MAX_TEXTURE_SIZE),g=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),f=n.getParameter(n.MAX_VERTEX_ATTRIBS),P=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),T=n.getParameter(n.MAX_VARYING_VECTORS),M=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),R=n.getParameter(n.MAX_SAMPLES),b=n.getParameter(n.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:c,textureFormatReadable:a,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:h,reversedDepthBuffer:u,maxTextures:m,maxVertexTextures:S,maxTextureSize:w,maxCubemapSize:g,maxAttributes:f,maxVertexUniforms:P,maxVaryings:T,maxFragmentUniforms:M,maxSamples:R,samples:b}}function Cp(n){const e=this;let t=null,i=0,r=!1,s=!1;const a=new kn,o=new je,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(h,u){const m=h.length!==0||u||i!==0||r;return r=u,i=h.length,m},this.beginShadows=function(){s=!0,d(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(h,u){t=d(h,u,0)},this.setState=function(h,u,m){const S=h.clippingPlanes,w=h.clipIntersection,g=h.clipShadows,f=n.get(h);if(!r||S===null||S.length===0||s&&!g)s?d(null):l();else{const P=s?0:i,T=P*4;let M=f.clippingState||null;c.value=M,M=d(S,u,T,m);for(let R=0;R!==T;++R)M[R]=t[R];f.clippingState=M,this.numIntersection=w?this.numPlanes:0,this.numPlanes+=P}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function d(h,u,m,S){const w=h!==null?h.length:0;let g=null;if(w!==0){if(g=c.value,S!==!0||g===null){const f=m+w*4,P=u.matrixWorldInverse;o.getNormalMatrix(P),(g===null||g.length<f)&&(g=new Float32Array(f));for(let T=0,M=m;T!==w;++T,M+=4)a.copy(h[T]).applyMatrix4(P,o),a.normal.toArray(g,M),g[M+3]=a.constant}c.value=g,c.needsUpdate=!0}return e.numPlanes=w,e.numIntersection=0,g}}const li=4,Ul=[.125,.215,.35,.446,.526,.582],Si=20,Pp=256,fr=new Ta,Nl=new Je;let Qa=null,eo=0,to=0,no=!1;const Lp=new G;class So{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,i=.1,r=100,s={}){const{size:a=256,position:o=Lp}=s;Qa=this._renderer.getRenderTarget(),eo=this._renderer.getActiveCubeFace(),to=this._renderer.getActiveMipmapLevel(),no=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(e,i,r,c,o),t>0&&this._blur(c,0,0,t),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=kl(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Ol(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Qa,eo,to),this._renderer.xr.enabled=no,e.scissorTest=!1,Ki(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===ui||e.mapping===Ri?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Qa=this._renderer.getRenderTarget(),eo=this._renderer.getActiveCubeFace(),to=this._renderer.getActiveMipmapLevel(),no=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:Gt,minFilter:Gt,generateMipmaps:!1,type:Pn,format:dn,colorSpace:wr,depthBuffer:!1},r=Fl(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Fl(e,t,i);const{_lodMax:s}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=Dp(s)),this._blurMaterial=Up(s,e,t),this._ggxMaterial=Ip(s,e,t)}return r}_compileMaterial(e){const t=new tn(new on,e);this._renderer.compile(t,fr)}_sceneToCubeUV(e,t,i,r,s){const c=new an(90,1,t,i),l=[1,-1,1,1,1,1],d=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,m=h.toneMapping;h.getClearColor(Nl),h.toneMapping=Sn,h.autoClear=!1,h.state.buffers.depth.getReversed()&&(h.setRenderTarget(r),h.clearDepth(),h.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new tn(new fi,new er({name:"PMREM.Background",side:jt,depthWrite:!1,depthTest:!1})));const w=this._backgroundBox,g=w.material;let f=!1;const P=e.background;P?P.isColor&&(g.color.copy(P),e.background=null,f=!0):(g.color.copy(Nl),f=!0);for(let T=0;T<6;T++){const M=T%3;M===0?(c.up.set(0,l[T],0),c.position.set(s.x,s.y,s.z),c.lookAt(s.x+d[T],s.y,s.z)):M===1?(c.up.set(0,0,l[T]),c.position.set(s.x,s.y,s.z),c.lookAt(s.x,s.y+d[T],s.z)):(c.up.set(0,l[T],0),c.position.set(s.x,s.y,s.z),c.lookAt(s.x,s.y,s.z+d[T]));const R=this._cubeSize;Ki(r,M*R,T>2?R:0,R,R),h.setRenderTarget(r),f&&h.render(w,c),h.render(e,c)}h.toneMapping=m,h.autoClear=u,e.background=P}_textureToCubeUV(e,t){const i=this._renderer,r=e.mapping===ui||e.mapping===Ri;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=kl()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Ol());const s=r?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=s;const o=s.uniforms;o.envMap.value=e;const c=this._cubeSize;Ki(t,0,0,3*c,2*c),i.setRenderTarget(t),i.render(a,fr)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;const r=this._lodMeshes.length;for(let s=1;s<r;s++)this._applyGGXFilter(e,s-1,s);t.autoClear=i}_applyGGXFilter(e,t,i){const r=this._renderer,s=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[i];o.material=a;const c=a.uniforms,l=i/(this._lodMeshes.length-1),d=t/(this._lodMeshes.length-1),h=Math.sqrt(l*l-d*d),u=0+l*1.25,m=h*u,{_lodMax:S}=this,w=this._sizeLods[i],g=3*w*(i>S-li?i-S+li:0),f=4*(this._cubeSize-w);c.envMap.value=e.texture,c.roughness.value=m,c.mipInt.value=S-t,Ki(s,g,f,3*w,2*w),r.setRenderTarget(s),r.render(o,fr),c.envMap.value=s.texture,c.roughness.value=0,c.mipInt.value=S-i,Ki(e,g,f,3*w,2*w),r.setRenderTarget(e),r.render(o,fr)}_blur(e,t,i,r,s){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,i,r,"latitudinal",s),this._halfBlur(a,e,i,i,r,"longitudinal",s)}_halfBlur(e,t,i,r,s,a,o){const c=this._renderer,l=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&ft("blur direction must be either latitudinal or longitudinal!");const d=3,h=this._lodMeshes[r];h.material=l;const u=l.uniforms,m=this._sizeLods[i]-1,S=isFinite(s)?Math.PI/(2*m):2*Math.PI/(2*Si-1),w=s/S,g=isFinite(s)?1+Math.floor(d*w):Si;g>Si&&Ke(`sigmaRadians, ${s}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${Si}`);const f=[];let P=0;for(let v=0;v<Si;++v){const x=v/w,p=Math.exp(-x*x/2);f.push(p),v===0?P+=p:v<g&&(P+=2*p)}for(let v=0;v<f.length;v++)f[v]=f[v]/P;u.envMap.value=e.texture,u.samples.value=g,u.weights.value=f,u.latitudinal.value=a==="latitudinal",o&&(u.poleAxis.value=o);const{_lodMax:T}=this;u.dTheta.value=S,u.mipInt.value=T-i;const M=this._sizeLods[r],R=3*M*(r>T-li?r-T+li:0),b=4*(this._cubeSize-M);Ki(t,R,b,3*M,2*M),c.setRenderTarget(t),c.render(h,fr)}}function Dp(n){const e=[],t=[],i=[];let r=n;const s=n-li+1+Ul.length;for(let a=0;a<s;a++){const o=Math.pow(2,r);e.push(o);let c=1/o;a>n-li?c=Ul[a-n+li-1]:a===0&&(c=0),t.push(c);const l=1/(o-2),d=-l,h=1+l,u=[d,d,h,d,h,h,d,d,h,h,d,h],m=6,S=6,w=3,g=2,f=1,P=new Float32Array(w*S*m),T=new Float32Array(g*S*m),M=new Float32Array(f*S*m);for(let b=0;b<m;b++){const v=b%3*2/3-1,x=b>2?0:-1,p=[v,x,0,v+2/3,x,0,v+2/3,x+1,0,v,x,0,v+2/3,x+1,0,v,x+1,0];P.set(p,w*S*b),T.set(u,g*S*b);const y=[b,b,b,b,b,b];M.set(y,f*S*b)}const R=new on;R.setAttribute("position",new hn(P,w)),R.setAttribute("uv",new hn(T,g)),R.setAttribute("faceIndex",new hn(M,f)),i.push(new tn(R,null)),r>li&&r--}return{lodMeshes:i,sizeLods:e,sigmas:t}}function Fl(n,e,t){const i=new bn(n,e,t);return i.texture.mapping=Dr,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Ki(n,e,t,i,r){n.viewport.set(e,t,i,r),n.scissor.set(e,t,i,r)}function Ip(n,e,t){return new En({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:Pp,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Aa(),fragmentShader:`

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
		`,blending:Cn,depthTest:!1,depthWrite:!1})}function Up(n,e,t){const i=new Float32Array(Si),r=new G(0,1,0);return new En({name:"SphericalGaussianBlur",defines:{n:Si,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:Aa(),fragmentShader:`

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
		`,blending:Cn,depthTest:!1,depthWrite:!1})}function Ol(){return new En({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Aa(),fragmentShader:`

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
		`,blending:Cn,depthTest:!1,depthWrite:!1})}function kl(){return new En({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Aa(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Cn,depthTest:!1,depthWrite:!1})}function Aa(){return`

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
	`}class Zo extends bn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];this.texture=new Xo(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new fi(5,5,5),s=new En({name:"CubemapFromEquirect",uniforms:rr(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:jt,blending:Cn});s.uniforms.tEquirect.value=t;const a=new tn(r,s),o=t.minFilter;return t.minFilter===ai&&(t.minFilter=Gt),new su(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,i=!0,r=!0){const s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,i,r);e.setRenderTarget(s)}}function Np(n){let e=new WeakMap,t=new WeakMap,i=null;function r(u,m=!1){return u==null?null:m?a(u):s(u)}function s(u){if(u&&u.isTexture){const m=u.mapping;if(m===os||m===ls)if(e.has(u)){const S=e.get(u).texture;return o(S,u.mapping)}else{const S=u.image;if(S&&S.height>0){const w=new Zo(S.height);return w.fromEquirectangularTexture(n,u),e.set(u,w),u.addEventListener("dispose",l),o(w.texture,u.mapping)}else return null}}return u}function a(u){if(u&&u.isTexture){const m=u.mapping,S=m===os||m===ls,w=m===ui||m===Ri;if(S||w){let g=t.get(u);const f=g!==void 0?g.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==f)return i===null&&(i=new So(n)),g=S?i.fromEquirectangular(u,g):i.fromCubemap(u,g),g.texture.pmremVersion=u.pmremVersion,t.set(u,g),g.texture;if(g!==void 0)return g.texture;{const P=u.image;return S&&P&&P.height>0||w&&P&&c(P)?(i===null&&(i=new So(n)),g=S?i.fromEquirectangular(u):i.fromCubemap(u),g.texture.pmremVersion=u.pmremVersion,t.set(u,g),u.addEventListener("dispose",d),g.texture):null}}}return u}function o(u,m){return m===os?u.mapping=ui:m===ls&&(u.mapping=Ri),u}function c(u){let m=0;const S=6;for(let w=0;w<S;w++)u[w]!==void 0&&m++;return m===S}function l(u){const m=u.target;m.removeEventListener("dispose",l);const S=e.get(m);S!==void 0&&(e.delete(m),S.dispose())}function d(u){const m=u.target;m.removeEventListener("dispose",d);const S=t.get(m);S!==void 0&&(t.delete(m),S.dispose())}function h(){e=new WeakMap,t=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:r,dispose:h}}function Fp(n){const e={};function t(i){if(e[i]!==void 0)return e[i];const r=n.getExtension(i);return e[i]=r,r}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const r=t(i);return r===null&&Ei("WebGLRenderer: "+i+" extension not supported."),r}}}function Op(n,e,t,i){const r={},s=new WeakMap;function a(h){const u=h.target;u.index!==null&&e.remove(u.index);for(const S in u.attributes)e.remove(u.attributes[S]);u.removeEventListener("dispose",a),delete r[u.id];const m=s.get(u);m&&(e.remove(m),s.delete(u)),i.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,t.memory.geometries--}function o(h,u){return r[u.id]===!0||(u.addEventListener("dispose",a),r[u.id]=!0,t.memory.geometries++),u}function c(h){const u=h.attributes;for(const m in u)e.update(u[m],n.ARRAY_BUFFER)}function l(h){const u=[],m=h.index,S=h.attributes.position;let w=0;if(S===void 0)return;if(m!==null){const P=m.array;w=m.version;for(let T=0,M=P.length;T<M;T+=3){const R=P[T+0],b=P[T+1],v=P[T+2];u.push(R,b,b,v,v,R)}}else{const P=S.array;w=S.version;for(let T=0,M=P.length/3-1;T<M;T+=3){const R=T+0,b=T+1,v=T+2;u.push(R,b,b,v,v,R)}}const g=new(S.count>=65535?Wo:Ho)(u,1);g.version=w;const f=s.get(h);f&&e.remove(f),s.set(h,g)}function d(h){const u=s.get(h);if(u){const m=h.index;m!==null&&u.version<m.version&&l(h)}else l(h);return s.get(h)}return{get:o,update:c,getWireframeAttribute:d}}function kp(n,e,t){let i;function r(h){i=h}let s,a;function o(h){s=h.type,a=h.bytesPerElement}function c(h,u){n.drawElements(i,u,s,h*a),t.update(u,i,1)}function l(h,u,m){m!==0&&(n.drawElementsInstanced(i,u,s,h*a,m),t.update(u,i,m))}function d(h,u,m){if(m===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,u,0,s,h,0,m);let w=0;for(let g=0;g<m;g++)w+=u[g];t.update(w,i,1)}this.setMode=r,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=d}function Bp(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,a,o){switch(t.calls++,a){case n.TRIANGLES:t.triangles+=o*(s/3);break;case n.LINES:t.lines+=o*(s/2);break;case n.LINE_STRIP:t.lines+=o*(s-1);break;case n.LINE_LOOP:t.lines+=o*s;break;case n.POINTS:t.points+=o*s;break;default:ft("WebGLInfo: Unknown draw mode:",a);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:i}}function zp(n,e,t){const i=new WeakMap,r=new mt;function s(a,o,c){const l=a.morphTargetInfluences,d=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,h=d!==void 0?d.length:0;let u=i.get(o);if(u===void 0||u.count!==h){let p=function(){v.dispose(),i.delete(o),o.removeEventListener("dispose",p)};u!==void 0&&u.texture.dispose();const m=o.morphAttributes.position!==void 0,S=o.morphAttributes.normal!==void 0,w=o.morphAttributes.color!==void 0,g=o.morphAttributes.position||[],f=o.morphAttributes.normal||[],P=o.morphAttributes.color||[];let T=0;m===!0&&(T=1),S===!0&&(T=2),w===!0&&(T=3);let M=o.attributes.position.count*T,R=1;M>e.maxTextureSize&&(R=Math.ceil(M/e.maxTextureSize),M=e.maxTextureSize);const b=new Float32Array(M*R*4*h),v=new Vo(b,M,R,h);v.type=vn,v.needsUpdate=!0;const x=T*4;for(let y=0;y<h;y++){const A=g[y],L=f[y],B=P[y],D=M*R*4*y;for(let N=0;N<A.count;N++){const k=N*x;m===!0&&(r.fromBufferAttribute(A,N),b[D+k+0]=r.x,b[D+k+1]=r.y,b[D+k+2]=r.z,b[D+k+3]=0),S===!0&&(r.fromBufferAttribute(L,N),b[D+k+4]=r.x,b[D+k+5]=r.y,b[D+k+6]=r.z,b[D+k+7]=0),w===!0&&(r.fromBufferAttribute(B,N),b[D+k+8]=r.x,b[D+k+9]=r.y,b[D+k+10]=r.z,b[D+k+11]=B.itemSize===4?r.w:1)}}u={count:h,texture:v,size:new He(M,R)},i.set(o,u),o.addEventListener("dispose",p)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)c.getUniforms().setValue(n,"morphTexture",a.morphTexture,t);else{let m=0;for(let w=0;w<l.length;w++)m+=l[w];const S=o.morphTargetsRelative?1:1-m;c.getUniforms().setValue(n,"morphTargetBaseInfluence",S),c.getUniforms().setValue(n,"morphTargetInfluences",l)}c.getUniforms().setValue(n,"morphTargetsTexture",u.texture,t),c.getUniforms().setValue(n,"morphTargetsTextureSize",u.size)}return{update:s}}function Gp(n,e,t,i,r){let s=new WeakMap;function a(l){const d=r.render.frame,h=l.geometry,u=e.get(l,h);if(s.get(u)!==d&&(e.update(u),s.set(u,d)),l.isInstancedMesh&&(l.hasEventListener("dispose",c)===!1&&l.addEventListener("dispose",c),s.get(l)!==d&&(t.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,n.ARRAY_BUFFER),s.set(l,d))),l.isSkinnedMesh){const m=l.skeleton;s.get(m)!==d&&(m.update(),s.set(m,d))}return u}function o(){s=new WeakMap}function c(l){const d=l.target;d.removeEventListener("dispose",c),i.releaseStatesOfObject(d),t.remove(d.instanceMatrix),d.instanceColor!==null&&t.remove(d.instanceColor)}return{update:a,dispose:o}}const Vp={[wo]:"LINEAR_TONE_MAPPING",[Ro]:"REINHARD_TONE_MAPPING",[Co]:"CINEON_TONE_MAPPING",[la]:"ACES_FILMIC_TONE_MAPPING",[Lo]:"AGX_TONE_MAPPING",[Do]:"NEUTRAL_TONE_MAPPING",[Po]:"CUSTOM_TONE_MAPPING"};function Hp(n,e,t,i,r,s){const a=new bn(e,t,{type:n,depthBuffer:r,stencilBuffer:s,samples:i?4:0,depthTexture:r?new Ci(e,t):void 0}),o=new bn(e,t,{type:Pn,depthBuffer:!1,stencilBuffer:!1}),c=new on;c.setAttribute("position",new Yt([-1,3,0,-1,-1,0,3,-1,0],3)),c.setAttribute("uv",new Yt([0,2,0,0,2,0],2));const l=new eu({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),d=new tn(c,l),h=new Ta(-1,1,1,-1,0,1);let u=null,m=null,S=!1,w,g=null,f=[],P=!1;this.setSize=function(T,M){a.setSize(T,M),o.setSize(T,M);for(let R=0;R<f.length;R++){const b=f[R];b.setSize&&b.setSize(T,M)}},this.setEffects=function(T){f=T,P=f.length>0&&f[0].isRenderPass===!0;const M=a.width,R=a.height;for(let b=0;b<f.length;b++){const v=f[b];v.setSize&&v.setSize(M,R)}},this.begin=function(T,M){if(S||T.toneMapping===Sn&&f.length===0)return!1;if(g=M,M!==null){const R=M.width,b=M.height;(a.width!==R||a.height!==b)&&this.setSize(R,b)}return P===!1&&T.setRenderTarget(a),w=T.toneMapping,T.toneMapping=Sn,!0},this.hasRenderPass=function(){return P},this.end=function(T,M){T.toneMapping=w,S=!0;let R=a,b=o;for(let v=0;v<f.length;v++){const x=f[v];if(x.enabled!==!1&&(x.render(T,b,R,M),x.needsSwap!==!1)){const p=R;R=b,b=p}}if(u!==T.outputColorSpace||m!==T.toneMapping){u=T.outputColorSpace,m=T.toneMapping,l.defines={},ht.getTransfer(u)===gt&&(l.defines.SRGB_TRANSFER="");const v=Vp[m];v&&(l.defines[v]=""),l.needsUpdate=!0}l.uniforms.tDiffuse.value=R.texture,T.setRenderTarget(g),T.render(d,h),g=null,S=!1},this.isCompositing=function(){return S},this.dispose=function(){a.depthTexture&&a.depthTexture.dispose(),a.dispose(),o.dispose(),c.dispose(),l.dispose()}}const du=new Vt,bo=new Ci(1,1),hu=new Vo,fu=new Yc,pu=new Xo,Bl=[],zl=[],Gl=new Float32Array(16),Vl=new Float32Array(9),Hl=new Float32Array(4);function or(n,e,t){const i=n[0];if(i<=0||i>0)return n;const r=e*t;let s=Bl[r];if(s===void 0&&(s=new Float32Array(r),Bl[r]=s),e!==0){i.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=t,n[a].toArray(s,o)}return s}function Ut(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function Nt(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function wa(n,e){let t=zl[e];t===void 0&&(t=new Int32Array(e),zl[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function Wp(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function Xp(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ut(t,e))return;n.uniform2fv(this.addr,e),Nt(t,e)}}function qp(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Ut(t,e))return;n.uniform3fv(this.addr,e),Nt(t,e)}}function Yp(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ut(t,e))return;n.uniform4fv(this.addr,e),Nt(t,e)}}function Kp(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Ut(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),Nt(t,e)}else{if(Ut(t,i))return;Hl.set(i),n.uniformMatrix2fv(this.addr,!1,Hl),Nt(t,i)}}function Zp(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Ut(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),Nt(t,e)}else{if(Ut(t,i))return;Vl.set(i),n.uniformMatrix3fv(this.addr,!1,Vl),Nt(t,i)}}function $p(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Ut(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),Nt(t,e)}else{if(Ut(t,i))return;Gl.set(i),n.uniformMatrix4fv(this.addr,!1,Gl),Nt(t,i)}}function jp(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function Jp(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ut(t,e))return;n.uniform2iv(this.addr,e),Nt(t,e)}}function Qp(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ut(t,e))return;n.uniform3iv(this.addr,e),Nt(t,e)}}function em(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ut(t,e))return;n.uniform4iv(this.addr,e),Nt(t,e)}}function tm(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function nm(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ut(t,e))return;n.uniform2uiv(this.addr,e),Nt(t,e)}}function im(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ut(t,e))return;n.uniform3uiv(this.addr,e),Nt(t,e)}}function rm(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ut(t,e))return;n.uniform4uiv(this.addr,e),Nt(t,e)}}function sm(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r);let s;this.type===n.SAMPLER_2D_SHADOW?(bo.compareFunction=t.isReversedDepthBuffer()?ga:ma,s=bo):s=du,t.setTexture2D(e||s,r)}function am(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture3D(e||fu,r)}function om(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTextureCube(e||pu,r)}function lm(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture2DArray(e||hu,r)}function cm(n){switch(n){case 5126:return Wp;case 35664:return Xp;case 35665:return qp;case 35666:return Yp;case 35674:return Kp;case 35675:return Zp;case 35676:return $p;case 5124:case 35670:return jp;case 35667:case 35671:return Jp;case 35668:case 35672:return Qp;case 35669:case 35673:return em;case 5125:return tm;case 36294:return nm;case 36295:return im;case 36296:return rm;case 35678:case 36198:case 36298:case 36306:case 35682:return sm;case 35679:case 36299:case 36307:return am;case 35680:case 36300:case 36308:case 36293:return om;case 36289:case 36303:case 36311:case 36292:return lm}}function um(n,e){n.uniform1fv(this.addr,e)}function dm(n,e){const t=or(e,this.size,2);n.uniform2fv(this.addr,t)}function hm(n,e){const t=or(e,this.size,3);n.uniform3fv(this.addr,t)}function fm(n,e){const t=or(e,this.size,4);n.uniform4fv(this.addr,t)}function pm(n,e){const t=or(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function mm(n,e){const t=or(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function gm(n,e){const t=or(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function _m(n,e){n.uniform1iv(this.addr,e)}function xm(n,e){n.uniform2iv(this.addr,e)}function vm(n,e){n.uniform3iv(this.addr,e)}function Mm(n,e){n.uniform4iv(this.addr,e)}function Sm(n,e){n.uniform1uiv(this.addr,e)}function bm(n,e){n.uniform2uiv(this.addr,e)}function ym(n,e){n.uniform3uiv(this.addr,e)}function Em(n,e){n.uniform4uiv(this.addr,e)}function Tm(n,e,t){const i=this.cache,r=e.length,s=wa(t,r);Ut(i,s)||(n.uniform1iv(this.addr,s),Nt(i,s));let a;this.type===n.SAMPLER_2D_SHADOW?a=bo:a=du;for(let o=0;o!==r;++o)t.setTexture2D(e[o]||a,s[o])}function Am(n,e,t){const i=this.cache,r=e.length,s=wa(t,r);Ut(i,s)||(n.uniform1iv(this.addr,s),Nt(i,s));for(let a=0;a!==r;++a)t.setTexture3D(e[a]||fu,s[a])}function wm(n,e,t){const i=this.cache,r=e.length,s=wa(t,r);Ut(i,s)||(n.uniform1iv(this.addr,s),Nt(i,s));for(let a=0;a!==r;++a)t.setTextureCube(e[a]||pu,s[a])}function Rm(n,e,t){const i=this.cache,r=e.length,s=wa(t,r);Ut(i,s)||(n.uniform1iv(this.addr,s),Nt(i,s));for(let a=0;a!==r;++a)t.setTexture2DArray(e[a]||hu,s[a])}function Cm(n){switch(n){case 5126:return um;case 35664:return dm;case 35665:return hm;case 35666:return fm;case 35674:return pm;case 35675:return mm;case 35676:return gm;case 5124:case 35670:return _m;case 35667:case 35671:return xm;case 35668:case 35672:return vm;case 35669:case 35673:return Mm;case 5125:return Sm;case 36294:return bm;case 36295:return ym;case 36296:return Em;case 35678:case 36198:case 36298:case 36306:case 35682:return Tm;case 35679:case 36299:case 36307:return Am;case 35680:case 36300:case 36308:case 36293:return wm;case 36289:case 36303:case 36311:case 36292:return Rm}}class Pm{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=cm(t.type)}}class Lm{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Cm(t.type)}}class Dm{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const r=this.seq;for(let s=0,a=r.length;s!==a;++s){const o=r[s];o.setValue(e,t[o.id],i)}}}const io=/(\w+)(\])?(\[|\.)?/g;function Wl(n,e){n.seq.push(e),n.map[e.id]=e}function Im(n,e,t){const i=n.name,r=i.length;for(io.lastIndex=0;;){const s=io.exec(i),a=io.lastIndex;let o=s[1];const c=s[2]==="]",l=s[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===r){Wl(t,l===void 0?new Pm(o,n,e):new Lm(o,n,e));break}else{let h=t.map[o];h===void 0&&(h=new Dm(o),Wl(t,h)),t=h}}}class ds{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<i;++a){const o=e.getActiveUniform(t,a),c=e.getUniformLocation(t,o.name);Im(o,c,this)}const r=[],s=[];for(const a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(a):s.push(a);r.length>0&&(this.seq=r.concat(s))}setValue(e,t,i,r){const s=this.map[t];s!==void 0&&s.setValue(e,i,r)}setOptional(e,t,i){const r=t[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,t,i,r){for(let s=0,a=t.length;s!==a;++s){const o=t[s],c=i[o.id];c.needsUpdate!==!1&&o.setValue(e,c.value,r)}}static seqWithValue(e,t){const i=[];for(let r=0,s=e.length;r!==s;++r){const a=e[r];a.id in t&&i.push(a)}return i}}function Xl(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const Um=37297;let Nm=0;function Fm(n,e){const t=n.split(`
`),i=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let a=r;a<s;a++){const o=a+1;i.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return i.join(`
`)}const ql=new je;function Om(n){ht._getMatrix(ql,ht.workingColorSpace,n);const e=`mat3( ${ql.elements.map(t=>t.toFixed(4))} )`;switch(ht.getTransfer(n)){case Rr:return[e,"LinearTransferOETF"];case gt:return[e,"sRGBTransferOETF"];default:return Ke("WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function Yl(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),s=(n.getShaderInfoLog(e)||"").trim();if(i&&s==="")return"";const a=/ERROR: 0:(\d+)/.exec(s);if(a){const o=parseInt(a[1]);return t.toUpperCase()+`

`+s+`

`+Fm(n.getShaderSource(e),o)}else return s}function km(n,e){const t=Om(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const Bm={[wo]:"Linear",[Ro]:"Reinhard",[Co]:"Cineon",[la]:"ACESFilmic",[Lo]:"AgX",[Do]:"Neutral",[Po]:"Custom"};function zm(n,e){const t=Bm[e];return t===void 0?(Ke("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+n+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const rs=new G;function Gm(){ht.getLuminanceCoefficients(rs);const n=rs.x.toFixed(4),e=rs.y.toFixed(4),t=rs.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Vm(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(gr).join(`
`)}function Hm(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function Wm(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const s=n.getActiveAttrib(e,r),a=s.name;let o=1;s.type===n.FLOAT_MAT2&&(o=2),s.type===n.FLOAT_MAT3&&(o=3),s.type===n.FLOAT_MAT4&&(o=4),t[a]={type:s.type,location:n.getAttribLocation(e,a),locationSize:o}}return t}function gr(n){return n!==""}function Kl(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Zl(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const Xm=/^[ \t]*#include +<([\w\d./]+)>/gm;function yo(n){return n.replace(Xm,Ym)}const qm=new Map;function Ym(n,e){let t=ot[e];if(t===void 0){const i=qm.get(e);if(i!==void 0)t=ot[i],Ke('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return yo(t)}const Km=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function $l(n){return n.replace(Km,Zm)}function Zm(n,e,t,i){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function jl(n){let e=`precision ${n.precision} float;
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
#define LOW_PRECISION`),e}const $m={[_r]:"SHADOWMAP_TYPE_PCF",[ji]:"SHADOWMAP_TYPE_VSM"};function jm(n){return $m[n.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const Jm={[ui]:"ENVMAP_TYPE_CUBE",[Ri]:"ENVMAP_TYPE_CUBE",[Dr]:"ENVMAP_TYPE_CUBE_UV"};function Qm(n){return n.envMap===!1?"ENVMAP_TYPE_CUBE":Jm[n.envMapMode]||"ENVMAP_TYPE_CUBE"}const eg={[Ri]:"ENVMAP_MODE_REFRACTION"};function tg(n){return n.envMap===!1?"ENVMAP_MODE_REFLECTION":eg[n.envMapMode]||"ENVMAP_MODE_REFLECTION"}const ng={[Ao]:"ENVMAP_BLENDING_MULTIPLY",[Dc]:"ENVMAP_BLENDING_MIX",[Ic]:"ENVMAP_BLENDING_ADD"};function ig(n){return n.envMap===!1?"ENVMAP_BLENDING_NONE":ng[n.combine]||"ENVMAP_BLENDING_NONE"}function rg(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function sg(n,e,t,i){const r=n.getContext(),s=t.defines;let a=t.vertexShader,o=t.fragmentShader;const c=jm(t),l=Qm(t),d=tg(t),h=ig(t),u=rg(t),m=Vm(t),S=Hm(s),w=r.createProgram();let g,f,P=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,S].filter(gr).join(`
`),g.length>0&&(g+=`
`),f=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,S].filter(gr).join(`
`),f.length>0&&(f+=`
`)):(g=[jl(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,S,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+d:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(gr).join(`
`),f=[jl(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,S,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+d:"",t.envMap?"#define "+h:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Sn?"#define TONE_MAPPING":"",t.toneMapping!==Sn?ot.tonemapping_pars_fragment:"",t.toneMapping!==Sn?zm("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",ot.colorspace_pars_fragment,km("linearToOutputTexel",t.outputColorSpace),Gm(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(gr).join(`
`)),a=yo(a),a=Kl(a,t),a=Zl(a,t),o=yo(o),o=Kl(o,t),o=Zl(o,t),a=$l(a),o=$l(o),t.isRawShaderMaterial!==!0&&(P=`#version 300 es
`,g=[m,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,f=["#define varying in",t.glslVersion===mo?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===mo?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);const T=P+g+a,M=P+f+o,R=Xl(r,r.VERTEX_SHADER,T),b=Xl(r,r.FRAGMENT_SHADER,M);r.attachShader(w,R),r.attachShader(w,b),t.index0AttributeName!==void 0?r.bindAttribLocation(w,0,t.index0AttributeName):t.hasPositionAttribute===!0&&r.bindAttribLocation(w,0,"position"),r.linkProgram(w);function v(A){if(n.debug.checkShaderErrors){const L=r.getProgramInfoLog(w)||"",B=r.getShaderInfoLog(R)||"",D=r.getShaderInfoLog(b)||"",N=L.trim(),k=B.trim(),W=D.trim();let $=!0,re=!0;if(r.getProgramParameter(w,r.LINK_STATUS)===!1)if($=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(r,w,R,b);else{const me=Yl(r,R,"vertex"),be=Yl(r,b,"fragment");ft("WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(w,r.VALIDATE_STATUS)+`

Material Name: `+A.name+`
Material Type: `+A.type+`

Program Info Log: `+N+`
`+me+`
`+be)}else N!==""?Ke("WebGLProgram: Program Info Log:",N):(k===""||W==="")&&(re=!1);re&&(A.diagnostics={runnable:$,programLog:N,vertexShader:{log:k,prefix:g},fragmentShader:{log:W,prefix:f}})}r.deleteShader(R),r.deleteShader(b),x=new ds(r,w),p=Wm(r,w)}let x;this.getUniforms=function(){return x===void 0&&v(this),x};let p;this.getAttributes=function(){return p===void 0&&v(this),p};let y=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return y===!1&&(y=r.getProgramParameter(w,Um)),y},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(w),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Nm++,this.cacheKey=e,this.usedTimes=1,this.program=w,this.vertexShader=R,this.fragmentShader=b,this}let ag=0;class og{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,i){const r=this._getShaderCacheForMaterial(e);return r.has(t)===!1&&(r.add(t),t.usedTimes++),r.has(i)===!1&&(r.add(i),i.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new lg(e),t.set(e,i)),i}}class lg{constructor(e){this.id=ag++,this.code=e,this.usedTimes=0}}function cg(n){return n===di||n===Tr||n===Ar}function ug(n,e,t,i,r,s){const a=new xa,o=new og,c=new Set,l=[],d=new Map,h=i.logarithmicDepthBuffer;let u=i.precision;const m={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function S(x){return c.add(x),x===0?"uv":`uv${x}`}function w(x,p,y,A,L,B){const D=A.fog,N=L.geometry,k=x.isMeshStandardMaterial||x.isMeshLambertMaterial||x.isMeshPhongMaterial?A.environment:null,W=x.isMeshStandardMaterial||x.isMeshLambertMaterial&&!x.envMap||x.isMeshPhongMaterial&&!x.envMap,$=e.get(x.envMap||k,W),re=$&&$.mapping===Dr?$.image.height:null,me=m[x.type];x.precision!==null&&(u=i.getMaxPrecision(x.precision),u!==x.precision&&Ke("WebGLProgram.getParameters:",x.precision,"not supported, using",u,"instead."));const be=N.morphAttributes.position||N.morphAttributes.normal||N.morphAttributes.color,_e=be!==void 0?be.length:0;let Be=0;N.morphAttributes.position!==void 0&&(Be=1),N.morphAttributes.normal!==void 0&&(Be=2),N.morphAttributes.color!==void 0&&(Be=3);let Ze,de,z,ve;if(me){const Ie=xn[me];Ze=Ie.vertexShader,de=Ie.fragmentShader}else{Ze=x.vertexShader,de=x.fragmentShader;const Ie=o.getVertexShaderStage(x),tt=o.getFragmentShaderStage(x);o.update(x,Ie,tt),z=Ie.id,ve=tt.id}const fe=n.getRenderTarget(),We=n.state.buffers.depth.getReversed(),Ye=L.isInstancedMesh===!0,ze=L.isBatchedMesh===!0,nt=!!x.map,Qe=!!x.matcap,it=!!$,ct=!!x.aoMap,$e=!!x.lightMap,ye=!!x.bumpMap&&x.wireframe===!1,j=!!x.normalMap,ce=!!x.displacementMap,pe=!!x.emissiveMap,ae=!!x.metalnessMap,Ae=!!x.roughnessMap,U=x.anisotropy>0,et=x.clearcoat>0,Le=x.dispersion>0,C=x.iridescence>0,_=x.sheen>0,O=x.transmission>0,V=U&&!!x.anisotropyMap,q=et&&!!x.clearcoatMap,ue=et&&!!x.clearcoatNormalMap,Q=et&&!!x.clearcoatRoughnessMap,H=C&&!!x.iridescenceMap,Y=C&&!!x.iridescenceThicknessMap,oe=_&&!!x.sheenColorMap,xe=_&&!!x.sheenRoughnessMap,ge=!!x.specularMap,Me=!!x.specularColorMap,De=!!x.specularIntensityMap,Fe=O&&!!x.transmissionMap,Xe=O&&!!x.thicknessMap,F=!!x.gradientMap,Se=!!x.alphaMap,ie=x.alphaTest>0,Ee=!!x.alphaHash,we=!!x.extensions;let le=Sn;x.toneMapped&&(fe===null||fe.isXRRenderTarget===!0)&&(le=n.toneMapping);const Oe={shaderID:me,shaderType:x.type,shaderName:x.name,vertexShader:Ze,fragmentShader:de,defines:x.defines,customVertexShaderID:z,customFragmentShaderID:ve,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:u,batching:ze,batchingColor:ze&&L._colorsTexture!==null,instancing:Ye,instancingColor:Ye&&L.instanceColor!==null,instancingMorph:Ye&&L.morphTexture!==null,outputColorSpace:fe===null?n.outputColorSpace:fe.isXRRenderTarget===!0?fe.texture.colorSpace:ht.workingColorSpace,alphaToCoverage:!!x.alphaToCoverage,map:nt,matcap:Qe,envMap:it,envMapMode:it&&$.mapping,envMapCubeUVHeight:re,aoMap:ct,lightMap:$e,bumpMap:ye,normalMap:j,displacementMap:ce,emissiveMap:pe,normalMapObjectSpace:j&&x.normalMapType===Fc,normalMapTangentSpace:j&&x.normalMapType===na,packedNormalMap:j&&x.normalMapType===na&&cg(x.normalMap.format),metalnessMap:ae,roughnessMap:Ae,anisotropy:U,anisotropyMap:V,clearcoat:et,clearcoatMap:q,clearcoatNormalMap:ue,clearcoatRoughnessMap:Q,dispersion:Le,iridescence:C,iridescenceMap:H,iridescenceThicknessMap:Y,sheen:_,sheenColorMap:oe,sheenRoughnessMap:xe,specularMap:ge,specularColorMap:Me,specularIntensityMap:De,transmission:O,transmissionMap:Fe,thicknessMap:Xe,gradientMap:F,opaque:x.transparent===!1&&x.blending===yi&&x.alphaToCoverage===!1,alphaMap:Se,alphaTest:ie,alphaHash:Ee,combine:x.combine,mapUv:nt&&S(x.map.channel),aoMapUv:ct&&S(x.aoMap.channel),lightMapUv:$e&&S(x.lightMap.channel),bumpMapUv:ye&&S(x.bumpMap.channel),normalMapUv:j&&S(x.normalMap.channel),displacementMapUv:ce&&S(x.displacementMap.channel),emissiveMapUv:pe&&S(x.emissiveMap.channel),metalnessMapUv:ae&&S(x.metalnessMap.channel),roughnessMapUv:Ae&&S(x.roughnessMap.channel),anisotropyMapUv:V&&S(x.anisotropyMap.channel),clearcoatMapUv:q&&S(x.clearcoatMap.channel),clearcoatNormalMapUv:ue&&S(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Q&&S(x.clearcoatRoughnessMap.channel),iridescenceMapUv:H&&S(x.iridescenceMap.channel),iridescenceThicknessMapUv:Y&&S(x.iridescenceThicknessMap.channel),sheenColorMapUv:oe&&S(x.sheenColorMap.channel),sheenRoughnessMapUv:xe&&S(x.sheenRoughnessMap.channel),specularMapUv:ge&&S(x.specularMap.channel),specularColorMapUv:Me&&S(x.specularColorMap.channel),specularIntensityMapUv:De&&S(x.specularIntensityMap.channel),transmissionMapUv:Fe&&S(x.transmissionMap.channel),thicknessMapUv:Xe&&S(x.thicknessMap.channel),alphaMapUv:Se&&S(x.alphaMap.channel),vertexTangents:!!N.attributes.tangent&&(j||U),vertexNormals:!!N.attributes.normal,vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!N.attributes.color&&N.attributes.color.itemSize===4,pointsUvs:L.isPoints===!0&&!!N.attributes.uv&&(nt||Se),fog:!!D,useFog:x.fog===!0,fogExp2:!!D&&D.isFogExp2,flatShading:x.wireframe===!1&&(x.flatShading===!0||N.attributes.normal===void 0&&j===!1&&(x.isMeshLambertMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isMeshPhysicalMaterial)),sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:h,reversedDepthBuffer:We,skinning:L.isSkinnedMesh===!0,hasPositionAttribute:N.attributes.position!==void 0,morphTargets:N.morphAttributes.position!==void 0,morphNormals:N.morphAttributes.normal!==void 0,morphColors:N.morphAttributes.color!==void 0,morphTargetsCount:_e,morphTextureStride:Be,numDirLights:p.directional.length,numPointLights:p.point.length,numSpotLights:p.spot.length,numSpotLightMaps:p.spotLightMap.length,numRectAreaLights:p.rectArea.length,numHemiLights:p.hemi.length,numDirLightShadows:p.directionalShadowMap.length,numPointLightShadows:p.pointShadowMap.length,numSpotLightShadows:p.spotShadowMap.length,numSpotLightShadowsWithMaps:p.numSpotLightShadowsWithMaps,numLightProbes:p.numLightProbes,numLightProbeGrids:B.length,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:x.dithering,shadowMapEnabled:n.shadowMap.enabled&&y.length>0,shadowMapType:n.shadowMap.type,toneMapping:le,decodeVideoTexture:nt&&x.map.isVideoTexture===!0&&ht.getTransfer(x.map.colorSpace)===gt,decodeVideoTextureEmissive:pe&&x.emissiveMap.isVideoTexture===!0&&ht.getTransfer(x.emissiveMap.colorSpace)===gt,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===$t,flipSided:x.side===jt,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionClipCullDistance:we&&x.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(we&&x.extensions.multiDraw===!0||ze)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:x.customProgramCacheKey()};return Oe.vertexUv1s=c.has(1),Oe.vertexUv2s=c.has(2),Oe.vertexUv3s=c.has(3),c.clear(),Oe}function g(x){const p=[];if(x.shaderID?p.push(x.shaderID):(p.push(x.customVertexShaderID),p.push(x.customFragmentShaderID)),x.defines!==void 0)for(const y in x.defines)p.push(y),p.push(x.defines[y]);return x.isRawShaderMaterial===!1&&(f(p,x),P(p,x),p.push(n.outputColorSpace)),p.push(x.customProgramCacheKey),p.join()}function f(x,p){x.push(p.precision),x.push(p.outputColorSpace),x.push(p.envMapMode),x.push(p.envMapCubeUVHeight),x.push(p.mapUv),x.push(p.alphaMapUv),x.push(p.lightMapUv),x.push(p.aoMapUv),x.push(p.bumpMapUv),x.push(p.normalMapUv),x.push(p.displacementMapUv),x.push(p.emissiveMapUv),x.push(p.metalnessMapUv),x.push(p.roughnessMapUv),x.push(p.anisotropyMapUv),x.push(p.clearcoatMapUv),x.push(p.clearcoatNormalMapUv),x.push(p.clearcoatRoughnessMapUv),x.push(p.iridescenceMapUv),x.push(p.iridescenceThicknessMapUv),x.push(p.sheenColorMapUv),x.push(p.sheenRoughnessMapUv),x.push(p.specularMapUv),x.push(p.specularColorMapUv),x.push(p.specularIntensityMapUv),x.push(p.transmissionMapUv),x.push(p.thicknessMapUv),x.push(p.combine),x.push(p.fogExp2),x.push(p.sizeAttenuation),x.push(p.morphTargetsCount),x.push(p.morphAttributeCount),x.push(p.numDirLights),x.push(p.numPointLights),x.push(p.numSpotLights),x.push(p.numSpotLightMaps),x.push(p.numHemiLights),x.push(p.numRectAreaLights),x.push(p.numDirLightShadows),x.push(p.numPointLightShadows),x.push(p.numSpotLightShadows),x.push(p.numSpotLightShadowsWithMaps),x.push(p.numLightProbes),x.push(p.shadowMapType),x.push(p.toneMapping),x.push(p.numClippingPlanes),x.push(p.numClipIntersection),x.push(p.depthPacking)}function P(x,p){a.disableAll(),p.instancing&&a.enable(0),p.instancingColor&&a.enable(1),p.instancingMorph&&a.enable(2),p.matcap&&a.enable(3),p.envMap&&a.enable(4),p.normalMapObjectSpace&&a.enable(5),p.normalMapTangentSpace&&a.enable(6),p.clearcoat&&a.enable(7),p.iridescence&&a.enable(8),p.alphaTest&&a.enable(9),p.vertexColors&&a.enable(10),p.vertexAlphas&&a.enable(11),p.vertexUv1s&&a.enable(12),p.vertexUv2s&&a.enable(13),p.vertexUv3s&&a.enable(14),p.vertexTangents&&a.enable(15),p.anisotropy&&a.enable(16),p.alphaHash&&a.enable(17),p.batching&&a.enable(18),p.dispersion&&a.enable(19),p.batchingColor&&a.enable(20),p.gradientMap&&a.enable(21),p.packedNormalMap&&a.enable(22),p.vertexNormals&&a.enable(23),x.push(a.mask),a.disableAll(),p.fog&&a.enable(0),p.useFog&&a.enable(1),p.flatShading&&a.enable(2),p.logarithmicDepthBuffer&&a.enable(3),p.reversedDepthBuffer&&a.enable(4),p.skinning&&a.enable(5),p.morphTargets&&a.enable(6),p.morphNormals&&a.enable(7),p.morphColors&&a.enable(8),p.premultipliedAlpha&&a.enable(9),p.shadowMapEnabled&&a.enable(10),p.doubleSided&&a.enable(11),p.flipSided&&a.enable(12),p.useDepthPacking&&a.enable(13),p.dithering&&a.enable(14),p.transmission&&a.enable(15),p.sheen&&a.enable(16),p.opaque&&a.enable(17),p.pointsUvs&&a.enable(18),p.decodeVideoTexture&&a.enable(19),p.decodeVideoTextureEmissive&&a.enable(20),p.alphaToCoverage&&a.enable(21),p.numLightProbeGrids>0&&a.enable(22),p.hasPositionAttribute&&a.enable(23),x.push(a.mask)}function T(x){const p=m[x.type];let y;if(p){const A=xn[p];y=Qc.clone(A.uniforms)}else y=x.uniforms;return y}function M(x,p){let y=d.get(p);return y!==void 0?++y.usedTimes:(y=new sg(n,p,x,r),l.push(y),d.set(p,y)),y}function R(x){if(--x.usedTimes===0){const p=l.indexOf(x);l[p]=l[l.length-1],l.pop(),d.delete(x.cacheKey),x.destroy()}}function b(x){o.remove(x)}function v(){o.dispose()}return{getParameters:w,getProgramCacheKey:g,getUniforms:T,acquireProgram:M,releaseProgram:R,releaseShaderCache:b,programs:l,dispose:v}}function dg(){let n=new WeakMap;function e(a){return n.has(a)}function t(a){let o=n.get(a);return o===void 0&&(o={},n.set(a,o)),o}function i(a){n.delete(a)}function r(a,o,c){n.get(a)[o]=c}function s(){n=new WeakMap}return{has:e,get:t,remove:i,update:r,dispose:s}}function hg(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.materialVariant!==e.materialVariant?n.materialVariant-e.materialVariant:n.z!==e.z?n.z-e.z:n.id-e.id}function Jl(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function Ql(){const n=[];let e=0;const t=[],i=[],r=[];function s(){e=0,t.length=0,i.length=0,r.length=0}function a(u){let m=0;return u.isInstancedMesh&&(m+=2),u.isSkinnedMesh&&(m+=1),m}function o(u,m,S,w,g,f){let P=n[e];return P===void 0?(P={id:u.id,object:u,geometry:m,material:S,materialVariant:a(u),groupOrder:w,renderOrder:u.renderOrder,z:g,group:f},n[e]=P):(P.id=u.id,P.object=u,P.geometry=m,P.material=S,P.materialVariant=a(u),P.groupOrder=w,P.renderOrder=u.renderOrder,P.z=g,P.group=f),e++,P}function c(u,m,S,w,g,f){const P=o(u,m,S,w,g,f);S.transmission>0?i.push(P):S.transparent===!0?r.push(P):t.push(P)}function l(u,m,S,w,g,f){const P=o(u,m,S,w,g,f);S.transmission>0?i.unshift(P):S.transparent===!0?r.unshift(P):t.unshift(P)}function d(u,m,S){t.length>1&&t.sort(u||hg),i.length>1&&i.sort(m||Jl),r.length>1&&r.sort(m||Jl),S&&(t.reverse(),i.reverse(),r.reverse())}function h(){for(let u=e,m=n.length;u<m;u++){const S=n[u];if(S.id===null)break;S.id=null,S.object=null,S.geometry=null,S.material=null,S.group=null}}return{opaque:t,transmissive:i,transparent:r,init:s,push:c,unshift:l,finish:h,sort:d}}function fg(){let n=new WeakMap;function e(i,r){const s=n.get(i);let a;return s===void 0?(a=new Ql,n.set(i,[a])):r>=s.length?(a=new Ql,s.push(a)):a=s[r],a}function t(){n=new WeakMap}return{get:e,dispose:t}}function pg(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new G,color:new Je};break;case"SpotLight":t={position:new G,direction:new G,color:new Je,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new G,color:new Je,distance:0,decay:0};break;case"HemisphereLight":t={direction:new G,skyColor:new Je,groundColor:new Je};break;case"RectAreaLight":t={color:new Je,position:new G,halfWidth:new G,halfHeight:new G};break}return n[e.id]=t,t}}}function mg(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new He};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new He};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new He,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let gg=0;function _g(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function xg(n){const e=new pg,t=mg(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)i.probe.push(new G);const r=new G,s=new _t,a=new _t;function o(l){let d=0,h=0,u=0;for(let p=0;p<9;p++)i.probe[p].set(0,0,0);let m=0,S=0,w=0,g=0,f=0,P=0,T=0,M=0,R=0,b=0,v=0;l.sort(_g);for(let p=0,y=l.length;p<y;p++){const A=l[p],L=A.color,B=A.intensity,D=A.distance;let N=null;if(A.shadow&&A.shadow.map&&(A.shadow.map.texture.format===di?N=A.shadow.map.texture:N=A.shadow.map.depthTexture||A.shadow.map.texture),A.isAmbientLight)d+=L.r*B,h+=L.g*B,u+=L.b*B;else if(A.isLightProbe){for(let k=0;k<9;k++)i.probe[k].addScaledVector(A.sh.coefficients[k],B);v++}else if(A.isDirectionalLight){const k=e.get(A);if(k.color.copy(A.color).multiplyScalar(A.intensity),A.castShadow){const W=A.shadow,$=t.get(A);$.shadowIntensity=W.intensity,$.shadowBias=W.bias,$.shadowNormalBias=W.normalBias,$.shadowRadius=W.radius,$.shadowMapSize=W.mapSize,i.directionalShadow[m]=$,i.directionalShadowMap[m]=N,i.directionalShadowMatrix[m]=A.shadow.matrix,P++}i.directional[m]=k,m++}else if(A.isSpotLight){const k=e.get(A);k.position.setFromMatrixPosition(A.matrixWorld),k.color.copy(L).multiplyScalar(B),k.distance=D,k.coneCos=Math.cos(A.angle),k.penumbraCos=Math.cos(A.angle*(1-A.penumbra)),k.decay=A.decay,i.spot[w]=k;const W=A.shadow;if(A.map&&(i.spotLightMap[R]=A.map,R++,W.updateMatrices(A),A.castShadow&&b++),i.spotLightMatrix[w]=W.matrix,A.castShadow){const $=t.get(A);$.shadowIntensity=W.intensity,$.shadowBias=W.bias,$.shadowNormalBias=W.normalBias,$.shadowRadius=W.radius,$.shadowMapSize=W.mapSize,i.spotShadow[w]=$,i.spotShadowMap[w]=N,M++}w++}else if(A.isRectAreaLight){const k=e.get(A);k.color.copy(L).multiplyScalar(B),k.halfWidth.set(A.width*.5,0,0),k.halfHeight.set(0,A.height*.5,0),i.rectArea[g]=k,g++}else if(A.isPointLight){const k=e.get(A);if(k.color.copy(A.color).multiplyScalar(A.intensity),k.distance=A.distance,k.decay=A.decay,A.castShadow){const W=A.shadow,$=t.get(A);$.shadowIntensity=W.intensity,$.shadowBias=W.bias,$.shadowNormalBias=W.normalBias,$.shadowRadius=W.radius,$.shadowMapSize=W.mapSize,$.shadowCameraNear=W.camera.near,$.shadowCameraFar=W.camera.far,i.pointShadow[S]=$,i.pointShadowMap[S]=N,i.pointShadowMatrix[S]=A.shadow.matrix,T++}i.point[S]=k,S++}else if(A.isHemisphereLight){const k=e.get(A);k.skyColor.copy(A.color).multiplyScalar(B),k.groundColor.copy(A.groundColor).multiplyScalar(B),i.hemi[f]=k,f++}}g>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=Re.LTC_FLOAT_1,i.rectAreaLTC2=Re.LTC_FLOAT_2):(i.rectAreaLTC1=Re.LTC_HALF_1,i.rectAreaLTC2=Re.LTC_HALF_2)),i.ambient[0]=d,i.ambient[1]=h,i.ambient[2]=u;const x=i.hash;(x.directionalLength!==m||x.pointLength!==S||x.spotLength!==w||x.rectAreaLength!==g||x.hemiLength!==f||x.numDirectionalShadows!==P||x.numPointShadows!==T||x.numSpotShadows!==M||x.numSpotMaps!==R||x.numLightProbes!==v)&&(i.directional.length=m,i.spot.length=w,i.rectArea.length=g,i.point.length=S,i.hemi.length=f,i.directionalShadow.length=P,i.directionalShadowMap.length=P,i.pointShadow.length=T,i.pointShadowMap.length=T,i.spotShadow.length=M,i.spotShadowMap.length=M,i.directionalShadowMatrix.length=P,i.pointShadowMatrix.length=T,i.spotLightMatrix.length=M+R-b,i.spotLightMap.length=R,i.numSpotLightShadowsWithMaps=b,i.numLightProbes=v,x.directionalLength=m,x.pointLength=S,x.spotLength=w,x.rectAreaLength=g,x.hemiLength=f,x.numDirectionalShadows=P,x.numPointShadows=T,x.numSpotShadows=M,x.numSpotMaps=R,x.numLightProbes=v,i.version=gg++)}function c(l,d){let h=0,u=0,m=0,S=0,w=0;const g=d.matrixWorldInverse;for(let f=0,P=l.length;f<P;f++){const T=l[f];if(T.isDirectionalLight){const M=i.directional[h];M.direction.setFromMatrixPosition(T.matrixWorld),r.setFromMatrixPosition(T.target.matrixWorld),M.direction.sub(r),M.direction.transformDirection(g),h++}else if(T.isSpotLight){const M=i.spot[m];M.position.setFromMatrixPosition(T.matrixWorld),M.position.applyMatrix4(g),M.direction.setFromMatrixPosition(T.matrixWorld),r.setFromMatrixPosition(T.target.matrixWorld),M.direction.sub(r),M.direction.transformDirection(g),m++}else if(T.isRectAreaLight){const M=i.rectArea[S];M.position.setFromMatrixPosition(T.matrixWorld),M.position.applyMatrix4(g),a.identity(),s.copy(T.matrixWorld),s.premultiply(g),a.extractRotation(s),M.halfWidth.set(T.width*.5,0,0),M.halfHeight.set(0,T.height*.5,0),M.halfWidth.applyMatrix4(a),M.halfHeight.applyMatrix4(a),S++}else if(T.isPointLight){const M=i.point[u];M.position.setFromMatrixPosition(T.matrixWorld),M.position.applyMatrix4(g),u++}else if(T.isHemisphereLight){const M=i.hemi[w];M.direction.setFromMatrixPosition(T.matrixWorld),M.direction.transformDirection(g),w++}}}return{setup:o,setupView:c,state:i}}function ec(n){const e=new xg(n),t=[],i=[],r=[];function s(u){h.camera=u,t.length=0,i.length=0,r.length=0}function a(u){t.push(u)}function o(u){i.push(u)}function c(u){r.push(u)}function l(){e.setup(t)}function d(u){e.setupView(t,u)}const h={lightsArray:t,shadowsArray:i,lightProbeGridArray:r,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:s,state:h,setupLights:l,setupLightsView:d,pushLight:a,pushShadow:o,pushLightProbeGrid:c}}function vg(n){let e=new WeakMap;function t(r,s=0){const a=e.get(r);let o;return a===void 0?(o=new ec(n),e.set(r,[o])):s>=a.length?(o=new ec(n),a.push(o)):o=a[s],o}function i(){e=new WeakMap}return{get:t,dispose:i}}const Mg=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Sg=`uniform sampler2D shadow_pass;
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
}`,bg=[new G(1,0,0),new G(-1,0,0),new G(0,1,0),new G(0,-1,0),new G(0,0,1),new G(0,0,-1)],yg=[new G(0,-1,0),new G(0,-1,0),new G(0,0,1),new G(0,0,-1),new G(0,-1,0),new G(0,-1,0)],tc=new _t,pr=new G,ro=new G;function Eg(n,e,t){let i=new Ir;const r=new He,s=new He,a=new mt,o=new tu,c=new nu,l={},d=t.maxTextureSize,h={[Wn]:jt,[jt]:Wn,[$t]:$t},u=new En({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new He},radius:{value:4}},vertexShader:Mg,fragmentShader:Sg}),m=u.clone();m.defines.HORIZONTAL_PASS=1;const S=new on;S.setAttribute("position",new hn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const w=new tn(S,u),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=_r;let f=this.type;this.render=function(b,v,x){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||b.length===0)return;this.type===To&&(Ke("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=_r);const p=n.getRenderTarget(),y=n.getActiveCubeFace(),A=n.getActiveMipmapLevel(),L=n.state;L.setBlending(Cn),L.buffers.depth.getReversed()===!0?L.buffers.color.setClear(0,0,0,0):L.buffers.color.setClear(1,1,1,1),L.buffers.depth.setTest(!0),L.setScissorTest(!1);const B=f!==this.type;B&&v.traverse(function(D){D.material&&(Array.isArray(D.material)?D.material.forEach(N=>N.needsUpdate=!0):D.material.needsUpdate=!0)});for(let D=0,N=b.length;D<N;D++){const k=b[D],W=k.shadow;if(W===void 0){Ke("WebGLShadowMap:",k,"has no shadow.");continue}if(W.autoUpdate===!1&&W.needsUpdate===!1)continue;r.copy(W.mapSize);const $=W.getFrameExtents();r.multiply($),s.copy(W.mapSize),(r.x>d||r.y>d)&&(r.x>d&&(s.x=Math.floor(d/$.x),r.x=s.x*$.x,W.mapSize.x=s.x),r.y>d&&(s.y=Math.floor(d/$.y),r.y=s.y*$.y,W.mapSize.y=s.y));const re=n.state.buffers.depth.getReversed();if(W.camera._reversedDepth=re,W.map===null||B===!0){if(W.map!==null&&(W.map.depthTexture!==null&&(W.map.depthTexture.dispose(),W.map.depthTexture=null),W.map.dispose()),this.type===ji){if(k.isPointLight){Ke("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}W.map=new bn(r.x,r.y,{format:di,type:Pn,minFilter:Gt,magFilter:Gt,generateMipmaps:!1}),W.map.texture.name=k.name+".shadowMap",W.map.depthTexture=new Ci(r.x,r.y,vn),W.map.depthTexture.name=k.name+".shadowMapDepth",W.map.depthTexture.format=Ln,W.map.depthTexture.compareFunction=null,W.map.depthTexture.minFilter=kt,W.map.depthTexture.magFilter=kt}else k.isPointLight?(W.map=new Zo(r.x),W.map.depthTexture=new jc(r.x,yn)):(W.map=new bn(r.x,r.y),W.map.depthTexture=new Ci(r.x,r.y,yn)),W.map.depthTexture.name=k.name+".shadowMap",W.map.depthTexture.format=Ln,this.type===_r?(W.map.depthTexture.compareFunction=re?ga:ma,W.map.depthTexture.minFilter=Gt,W.map.depthTexture.magFilter=Gt):(W.map.depthTexture.compareFunction=null,W.map.depthTexture.minFilter=kt,W.map.depthTexture.magFilter=kt);W.camera.updateProjectionMatrix()}const me=W.map.isWebGLCubeRenderTarget?6:1;for(let be=0;be<me;be++){if(W.map.isWebGLCubeRenderTarget)n.setRenderTarget(W.map,be),n.clear();else{be===0&&(n.setRenderTarget(W.map),n.clear());const _e=W.getViewport(be);a.set(s.x*_e.x,s.y*_e.y,s.x*_e.z,s.y*_e.w),L.viewport(a)}if(k.isPointLight){const _e=W.camera,Be=W.matrix,Ze=k.distance||_e.far;Ze!==_e.far&&(_e.far=Ze,_e.updateProjectionMatrix()),pr.setFromMatrixPosition(k.matrixWorld),_e.position.copy(pr),ro.copy(_e.position),ro.add(bg[be]),_e.up.copy(yg[be]),_e.lookAt(ro),_e.updateMatrixWorld(),Be.makeTranslation(-pr.x,-pr.y,-pr.z),tc.multiplyMatrices(_e.projectionMatrix,_e.matrixWorldInverse),W._frustum.setFromProjectionMatrix(tc,_e.coordinateSystem,_e.reversedDepth)}else W.updateMatrices(k);i=W.getFrustum(),M(v,x,W.camera,k,this.type)}W.isPointLightShadow!==!0&&this.type===ji&&P(W,x),W.needsUpdate=!1}f=this.type,g.needsUpdate=!1,n.setRenderTarget(p,y,A)};function P(b,v){const x=e.update(w);u.defines.VSM_SAMPLES!==b.blurSamples&&(u.defines.VSM_SAMPLES=b.blurSamples,m.defines.VSM_SAMPLES=b.blurSamples,u.needsUpdate=!0,m.needsUpdate=!0),b.mapPass===null&&(b.mapPass=new bn(r.x,r.y,{format:di,type:Pn})),u.uniforms.shadow_pass.value=b.map.depthTexture,u.uniforms.resolution.value=b.mapSize,u.uniforms.radius.value=b.radius,n.setRenderTarget(b.mapPass),n.clear(),n.renderBufferDirect(v,null,x,u,w,null),m.uniforms.shadow_pass.value=b.mapPass.texture,m.uniforms.resolution.value=b.mapSize,m.uniforms.radius.value=b.radius,n.setRenderTarget(b.map),n.clear(),n.renderBufferDirect(v,null,x,m,w,null)}function T(b,v,x,p){let y=null;const A=x.isPointLight===!0?b.customDistanceMaterial:b.customDepthMaterial;if(A!==void 0)y=A;else if(y=x.isPointLight===!0?c:o,n.localClippingEnabled&&v.clipShadows===!0&&Array.isArray(v.clippingPlanes)&&v.clippingPlanes.length!==0||v.displacementMap&&v.displacementScale!==0||v.alphaMap&&v.alphaTest>0||v.map&&v.alphaTest>0||v.alphaToCoverage===!0){const L=y.uuid,B=v.uuid;let D=l[L];D===void 0&&(D={},l[L]=D);let N=D[B];N===void 0&&(N=y.clone(),D[B]=N,v.addEventListener("dispose",R)),y=N}if(y.visible=v.visible,y.wireframe=v.wireframe,p===ji?y.side=v.shadowSide!==null?v.shadowSide:v.side:y.side=v.shadowSide!==null?v.shadowSide:h[v.side],y.alphaMap=v.alphaMap,y.alphaTest=v.alphaToCoverage===!0?.5:v.alphaTest,y.map=v.map,y.clipShadows=v.clipShadows,y.clippingPlanes=v.clippingPlanes,y.clipIntersection=v.clipIntersection,y.displacementMap=v.displacementMap,y.displacementScale=v.displacementScale,y.displacementBias=v.displacementBias,y.wireframeLinewidth=v.wireframeLinewidth,y.linewidth=v.linewidth,x.isPointLight===!0&&y.isMeshDistanceMaterial===!0){const L=n.properties.get(y);L.light=x}return y}function M(b,v,x,p,y){if(b.visible===!1)return;if(b.layers.test(v.layers)&&(b.isMesh||b.isLine||b.isPoints)&&(b.castShadow||b.receiveShadow&&y===ji)&&(!b.frustumCulled||i.intersectsObject(b))){b.modelViewMatrix.multiplyMatrices(x.matrixWorldInverse,b.matrixWorld);const B=e.update(b),D=b.material;if(Array.isArray(D)){const N=B.groups;for(let k=0,W=N.length;k<W;k++){const $=N[k],re=D[$.materialIndex];if(re&&re.visible){const me=T(b,re,p,y);b.onBeforeShadow(n,b,v,x,B,me,$),n.renderBufferDirect(x,null,B,me,b,$),b.onAfterShadow(n,b,v,x,B,me,$)}}}else if(D.visible){const N=T(b,D,p,y);b.onBeforeShadow(n,b,v,x,B,N,null),n.renderBufferDirect(x,null,B,N,b,null),b.onAfterShadow(n,b,v,x,B,N,null)}}const L=b.children;for(let B=0,D=L.length;B<D;B++)M(L[B],v,x,p,y)}function R(b){b.target.removeEventListener("dispose",R);for(const x in l){const p=l[x],y=b.target.uuid;y in p&&(p[y].dispose(),delete p[y])}}}function Tg(n,e){function t(){let F=!1;const Se=new mt;let ie=null;const Ee=new mt(0,0,0,0);return{setMask:function(we){ie!==we&&!F&&(n.colorMask(we,we,we,we),ie=we)},setLocked:function(we){F=we},setClear:function(we,le,Oe,Ie,tt){tt===!0&&(we*=Ie,le*=Ie,Oe*=Ie),Se.set(we,le,Oe,Ie),Ee.equals(Se)===!1&&(n.clearColor(we,le,Oe,Ie),Ee.copy(Se))},reset:function(){F=!1,ie=null,Ee.set(-1,0,0,0)}}}function i(){let F=!1,Se=!1,ie=null,Ee=null,we=null;return{setReversed:function(le){if(Se!==le){const Oe=e.get("EXT_clip_control");le?Oe.clipControlEXT(Oe.LOWER_LEFT_EXT,Oe.ZERO_TO_ONE_EXT):Oe.clipControlEXT(Oe.LOWER_LEFT_EXT,Oe.NEGATIVE_ONE_TO_ONE_EXT),Se=le;const Ie=we;we=null,this.setClear(Ie)}},getReversed:function(){return Se},setTest:function(le){le?fe(n.DEPTH_TEST):We(n.DEPTH_TEST)},setMask:function(le){ie!==le&&!F&&(n.depthMask(le),ie=le)},setFunc:function(le){if(Se&&(le=td[le]),Ee!==le){switch(le){case xs:n.depthFunc(n.NEVER);break;case vs:n.depthFunc(n.ALWAYS);break;case Ms:n.depthFunc(n.LESS);break;case wi:n.depthFunc(n.LEQUAL);break;case Ss:n.depthFunc(n.EQUAL);break;case bs:n.depthFunc(n.GEQUAL);break;case ys:n.depthFunc(n.GREATER);break;case Es:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}Ee=le}},setLocked:function(le){F=le},setClear:function(le){we!==le&&(we=le,Se&&(le=1-le),n.clearDepth(le))},reset:function(){F=!1,ie=null,Ee=null,we=null,Se=!1}}}function r(){let F=!1,Se=null,ie=null,Ee=null,we=null,le=null,Oe=null,Ie=null,tt=null;return{setTest:function(at){F||(at?fe(n.STENCIL_TEST):We(n.STENCIL_TEST))},setMask:function(at){Se!==at&&!F&&(n.stencilMask(at),Se=at)},setFunc:function(at,Et,At){(ie!==at||Ee!==Et||we!==At)&&(n.stencilFunc(at,Et,At),ie=at,Ee=Et,we=At)},setOp:function(at,Et,At){(le!==at||Oe!==Et||Ie!==At)&&(n.stencilOp(at,Et,At),le=at,Oe=Et,Ie=At)},setLocked:function(at){F=at},setClear:function(at){tt!==at&&(n.clearStencil(at),tt=at)},reset:function(){F=!1,Se=null,ie=null,Ee=null,we=null,le=null,Oe=null,Ie=null,tt=null}}}const s=new t,a=new i,o=new r,c=new WeakMap,l=new WeakMap;let d={},h={},u={},m=new WeakMap,S=[],w=null,g=!1,f=null,P=null,T=null,M=null,R=null,b=null,v=null,x=new Je(0,0,0),p=0,y=!1,A=null,L=null,B=null,D=null,N=null;const k=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let W=!1,$=0;const re=n.getParameter(n.VERSION);re.indexOf("WebGL")!==-1?($=parseFloat(/^WebGL (\d)/.exec(re)[1]),W=$>=1):re.indexOf("OpenGL ES")!==-1&&($=parseFloat(/^OpenGL ES (\d)/.exec(re)[1]),W=$>=2);let me=null,be={};const _e=n.getParameter(n.SCISSOR_BOX),Be=n.getParameter(n.VIEWPORT),Ze=new mt().fromArray(_e),de=new mt().fromArray(Be);function z(F,Se,ie,Ee){const we=new Uint8Array(4),le=n.createTexture();n.bindTexture(F,le),n.texParameteri(F,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(F,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Oe=0;Oe<ie;Oe++)F===n.TEXTURE_3D||F===n.TEXTURE_2D_ARRAY?n.texImage3D(Se,0,n.RGBA,1,1,Ee,0,n.RGBA,n.UNSIGNED_BYTE,we):n.texImage2D(Se+Oe,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,we);return le}const ve={};ve[n.TEXTURE_2D]=z(n.TEXTURE_2D,n.TEXTURE_2D,1),ve[n.TEXTURE_CUBE_MAP]=z(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),ve[n.TEXTURE_2D_ARRAY]=z(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),ve[n.TEXTURE_3D]=z(n.TEXTURE_3D,n.TEXTURE_3D,1,1),s.setClear(0,0,0,1),a.setClear(1),o.setClear(0),fe(n.DEPTH_TEST),a.setFunc(wi),ye(!1),j(lo),fe(n.CULL_FACE),ct(Cn);function fe(F){d[F]!==!0&&(n.enable(F),d[F]=!0)}function We(F){d[F]!==!1&&(n.disable(F),d[F]=!1)}function Ye(F,Se){return u[F]!==Se?(n.bindFramebuffer(F,Se),u[F]=Se,F===n.DRAW_FRAMEBUFFER&&(u[n.FRAMEBUFFER]=Se),F===n.FRAMEBUFFER&&(u[n.DRAW_FRAMEBUFFER]=Se),!0):!1}function ze(F,Se){let ie=S,Ee=!1;if(F){ie=m.get(Se),ie===void 0&&(ie=[],m.set(Se,ie));const we=F.textures;if(ie.length!==we.length||ie[0]!==n.COLOR_ATTACHMENT0){for(let le=0,Oe=we.length;le<Oe;le++)ie[le]=n.COLOR_ATTACHMENT0+le;ie.length=we.length,Ee=!0}}else ie[0]!==n.BACK&&(ie[0]=n.BACK,Ee=!0);Ee&&n.drawBuffers(ie)}function nt(F){return w!==F?(n.useProgram(F),w=F,!0):!1}const Qe={[si]:n.FUNC_ADD,[mc]:n.FUNC_SUBTRACT,[gc]:n.FUNC_REVERSE_SUBTRACT};Qe[_c]=n.MIN,Qe[xc]=n.MAX;const it={[vc]:n.ZERO,[Mc]:n.ONE,[Sc]:n.SRC_COLOR,[gs]:n.SRC_ALPHA,[wc]:n.SRC_ALPHA_SATURATE,[Tc]:n.DST_COLOR,[yc]:n.DST_ALPHA,[bc]:n.ONE_MINUS_SRC_COLOR,[_s]:n.ONE_MINUS_SRC_ALPHA,[Ac]:n.ONE_MINUS_DST_COLOR,[Ec]:n.ONE_MINUS_DST_ALPHA,[Rc]:n.CONSTANT_COLOR,[Cc]:n.ONE_MINUS_CONSTANT_COLOR,[Pc]:n.CONSTANT_ALPHA,[Lc]:n.ONE_MINUS_CONSTANT_ALPHA};function ct(F,Se,ie,Ee,we,le,Oe,Ie,tt,at){if(F===Cn){g===!0&&(We(n.BLEND),g=!1);return}if(g===!1&&(fe(n.BLEND),g=!0),F!==pc){if(F!==f||at!==y){if((P!==si||R!==si)&&(n.blendEquation(n.FUNC_ADD),P=si,R=si),at)switch(F){case yi:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case co:n.blendFunc(n.ONE,n.ONE);break;case uo:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case ho:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:ft("WebGLState: Invalid blending: ",F);break}else switch(F){case yi:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case co:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case uo:ft("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case ho:ft("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:ft("WebGLState: Invalid blending: ",F);break}T=null,M=null,b=null,v=null,x.set(0,0,0),p=0,f=F,y=at}return}we=we||Se,le=le||ie,Oe=Oe||Ee,(Se!==P||we!==R)&&(n.blendEquationSeparate(Qe[Se],Qe[we]),P=Se,R=we),(ie!==T||Ee!==M||le!==b||Oe!==v)&&(n.blendFuncSeparate(it[ie],it[Ee],it[le],it[Oe]),T=ie,M=Ee,b=le,v=Oe),(Ie.equals(x)===!1||tt!==p)&&(n.blendColor(Ie.r,Ie.g,Ie.b,tt),x.copy(Ie),p=tt),f=F,y=!1}function $e(F,Se){F.side===$t?We(n.CULL_FACE):fe(n.CULL_FACE);let ie=F.side===jt;Se&&(ie=!ie),ye(ie),F.blending===yi&&F.transparent===!1?ct(Cn):ct(F.blending,F.blendEquation,F.blendSrc,F.blendDst,F.blendEquationAlpha,F.blendSrcAlpha,F.blendDstAlpha,F.blendColor,F.blendAlpha,F.premultipliedAlpha),a.setFunc(F.depthFunc),a.setTest(F.depthTest),a.setMask(F.depthWrite),s.setMask(F.colorWrite);const Ee=F.stencilWrite;o.setTest(Ee),Ee&&(o.setMask(F.stencilWriteMask),o.setFunc(F.stencilFunc,F.stencilRef,F.stencilFuncMask),o.setOp(F.stencilFail,F.stencilZFail,F.stencilZPass)),pe(F.polygonOffset,F.polygonOffsetFactor,F.polygonOffsetUnits),F.alphaToCoverage===!0?fe(n.SAMPLE_ALPHA_TO_COVERAGE):We(n.SAMPLE_ALPHA_TO_COVERAGE)}function ye(F){A!==F&&(F?n.frontFace(n.CW):n.frontFace(n.CCW),A=F)}function j(F){F!==hc?(fe(n.CULL_FACE),F!==L&&(F===lo?n.cullFace(n.BACK):F===fc?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):We(n.CULL_FACE),L=F}function ce(F){F!==B&&(W&&n.lineWidth(F),B=F)}function pe(F,Se,ie){F?(fe(n.POLYGON_OFFSET_FILL),(D!==Se||N!==ie)&&(D=Se,N=ie,a.getReversed()&&(Se=-Se),n.polygonOffset(Se,ie))):We(n.POLYGON_OFFSET_FILL)}function ae(F){F?fe(n.SCISSOR_TEST):We(n.SCISSOR_TEST)}function Ae(F){F===void 0&&(F=n.TEXTURE0+k-1),me!==F&&(n.activeTexture(F),me=F)}function U(F,Se,ie){ie===void 0&&(me===null?ie=n.TEXTURE0+k-1:ie=me);let Ee=be[ie];Ee===void 0&&(Ee={type:void 0,texture:void 0},be[ie]=Ee),(Ee.type!==F||Ee.texture!==Se)&&(me!==ie&&(n.activeTexture(ie),me=ie),n.bindTexture(F,Se||ve[F]),Ee.type=F,Ee.texture=Se)}function et(){const F=be[me];F!==void 0&&F.type!==void 0&&(n.bindTexture(F.type,null),F.type=void 0,F.texture=void 0)}function Le(){try{n.compressedTexImage2D(...arguments)}catch(F){ft("WebGLState:",F)}}function C(){try{n.compressedTexImage3D(...arguments)}catch(F){ft("WebGLState:",F)}}function _(){try{n.texSubImage2D(...arguments)}catch(F){ft("WebGLState:",F)}}function O(){try{n.texSubImage3D(...arguments)}catch(F){ft("WebGLState:",F)}}function V(){try{n.compressedTexSubImage2D(...arguments)}catch(F){ft("WebGLState:",F)}}function q(){try{n.compressedTexSubImage3D(...arguments)}catch(F){ft("WebGLState:",F)}}function ue(){try{n.texStorage2D(...arguments)}catch(F){ft("WebGLState:",F)}}function Q(){try{n.texStorage3D(...arguments)}catch(F){ft("WebGLState:",F)}}function H(){try{n.texImage2D(...arguments)}catch(F){ft("WebGLState:",F)}}function Y(){try{n.texImage3D(...arguments)}catch(F){ft("WebGLState:",F)}}function oe(F){return h[F]!==void 0?h[F]:n.getParameter(F)}function xe(F,Se){h[F]!==Se&&(n.pixelStorei(F,Se),h[F]=Se)}function ge(F){Ze.equals(F)===!1&&(n.scissor(F.x,F.y,F.z,F.w),Ze.copy(F))}function Me(F){de.equals(F)===!1&&(n.viewport(F.x,F.y,F.z,F.w),de.copy(F))}function De(F,Se){let ie=l.get(Se);ie===void 0&&(ie=new WeakMap,l.set(Se,ie));let Ee=ie.get(F);Ee===void 0&&(Ee=n.getUniformBlockIndex(Se,F.name),ie.set(F,Ee))}function Fe(F,Se){const Ee=l.get(Se).get(F);c.get(Se)!==Ee&&(n.uniformBlockBinding(Se,Ee,F.__bindingPointIndex),c.set(Se,Ee))}function Xe(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),a.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),n.pixelStorei(n.PACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!1),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,n.BROWSER_DEFAULT_WEBGL),n.pixelStorei(n.PACK_ROW_LENGTH,0),n.pixelStorei(n.PACK_SKIP_PIXELS,0),n.pixelStorei(n.PACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_ROW_LENGTH,0),n.pixelStorei(n.UNPACK_IMAGE_HEIGHT,0),n.pixelStorei(n.UNPACK_SKIP_PIXELS,0),n.pixelStorei(n.UNPACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_SKIP_IMAGES,0),d={},h={},me=null,be={},u={},m=new WeakMap,S=[],w=null,g=!1,f=null,P=null,T=null,M=null,R=null,b=null,v=null,x=new Je(0,0,0),p=0,y=!1,A=null,L=null,B=null,D=null,N=null,Ze.set(0,0,n.canvas.width,n.canvas.height),de.set(0,0,n.canvas.width,n.canvas.height),s.reset(),a.reset(),o.reset()}return{buffers:{color:s,depth:a,stencil:o},enable:fe,disable:We,bindFramebuffer:Ye,drawBuffers:ze,useProgram:nt,setBlending:ct,setMaterial:$e,setFlipSided:ye,setCullFace:j,setLineWidth:ce,setPolygonOffset:pe,setScissorTest:ae,activeTexture:Ae,bindTexture:U,unbindTexture:et,compressedTexImage2D:Le,compressedTexImage3D:C,texImage2D:H,texImage3D:Y,pixelStorei:xe,getParameter:oe,updateUBOMapping:De,uniformBlockBinding:Fe,texStorage2D:ue,texStorage3D:Q,texSubImage2D:_,texSubImage3D:O,compressedTexSubImage2D:V,compressedTexSubImage3D:q,scissor:ge,viewport:Me,reset:Xe}}function Ag(n,e,t,i,r,s,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new He,d=new WeakMap,h=new Set;let u;const m=new WeakMap;let S=!1;try{S=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function w(C,_){return S?new OffscreenCanvas(C,_):ia("canvas")}function g(C,_,O){let V=1;const q=Le(C);if((q.width>O||q.height>O)&&(V=O/Math.max(q.width,q.height)),V<1)if(typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&C instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&C instanceof ImageBitmap||typeof VideoFrame<"u"&&C instanceof VideoFrame){const ue=Math.floor(V*q.width),Q=Math.floor(V*q.height);u===void 0&&(u=w(ue,Q));const H=_?w(ue,Q):u;return H.width=ue,H.height=Q,H.getContext("2d").drawImage(C,0,0,ue,Q),Ke("WebGLRenderer: Texture has been resized from ("+q.width+"x"+q.height+") to ("+ue+"x"+Q+")."),H}else return"data"in C&&Ke("WebGLRenderer: Image in DataTexture is too big ("+q.width+"x"+q.height+")."),C;return C}function f(C){return C.generateMipmaps}function P(C){n.generateMipmap(C)}function T(C){return C.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:C.isWebGL3DRenderTarget?n.TEXTURE_3D:C.isWebGLArrayRenderTarget||C.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function M(C,_,O,V,q,ue=!1){if(C!==null){if(n[C]!==void 0)return n[C];Ke("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+C+"'")}let Q;V&&(Q=e.get("EXT_texture_norm16"),Q||Ke("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let H=_;if(_===n.RED&&(O===n.FLOAT&&(H=n.R32F),O===n.HALF_FLOAT&&(H=n.R16F),O===n.UNSIGNED_BYTE&&(H=n.R8),O===n.UNSIGNED_SHORT&&Q&&(H=Q.R16_EXT),O===n.SHORT&&Q&&(H=Q.R16_SNORM_EXT)),_===n.RED_INTEGER&&(O===n.UNSIGNED_BYTE&&(H=n.R8UI),O===n.UNSIGNED_SHORT&&(H=n.R16UI),O===n.UNSIGNED_INT&&(H=n.R32UI),O===n.BYTE&&(H=n.R8I),O===n.SHORT&&(H=n.R16I),O===n.INT&&(H=n.R32I)),_===n.RG&&(O===n.FLOAT&&(H=n.RG32F),O===n.HALF_FLOAT&&(H=n.RG16F),O===n.UNSIGNED_BYTE&&(H=n.RG8),O===n.UNSIGNED_SHORT&&Q&&(H=Q.RG16_EXT),O===n.SHORT&&Q&&(H=Q.RG16_SNORM_EXT)),_===n.RG_INTEGER&&(O===n.UNSIGNED_BYTE&&(H=n.RG8UI),O===n.UNSIGNED_SHORT&&(H=n.RG16UI),O===n.UNSIGNED_INT&&(H=n.RG32UI),O===n.BYTE&&(H=n.RG8I),O===n.SHORT&&(H=n.RG16I),O===n.INT&&(H=n.RG32I)),_===n.RGB_INTEGER&&(O===n.UNSIGNED_BYTE&&(H=n.RGB8UI),O===n.UNSIGNED_SHORT&&(H=n.RGB16UI),O===n.UNSIGNED_INT&&(H=n.RGB32UI),O===n.BYTE&&(H=n.RGB8I),O===n.SHORT&&(H=n.RGB16I),O===n.INT&&(H=n.RGB32I)),_===n.RGBA_INTEGER&&(O===n.UNSIGNED_BYTE&&(H=n.RGBA8UI),O===n.UNSIGNED_SHORT&&(H=n.RGBA16UI),O===n.UNSIGNED_INT&&(H=n.RGBA32UI),O===n.BYTE&&(H=n.RGBA8I),O===n.SHORT&&(H=n.RGBA16I),O===n.INT&&(H=n.RGBA32I)),_===n.RGB&&(O===n.UNSIGNED_SHORT&&Q&&(H=Q.RGB16_EXT),O===n.SHORT&&Q&&(H=Q.RGB16_SNORM_EXT),O===n.UNSIGNED_INT_5_9_9_9_REV&&(H=n.RGB9_E5),O===n.UNSIGNED_INT_10F_11F_11F_REV&&(H=n.R11F_G11F_B10F)),_===n.RGBA){const Y=ue?Rr:ht.getTransfer(q);O===n.FLOAT&&(H=n.RGBA32F),O===n.HALF_FLOAT&&(H=n.RGBA16F),O===n.UNSIGNED_BYTE&&(H=Y===gt?n.SRGB8_ALPHA8:n.RGBA8),O===n.UNSIGNED_SHORT&&Q&&(H=Q.RGBA16_EXT),O===n.SHORT&&Q&&(H=Q.RGBA16_SNORM_EXT),O===n.UNSIGNED_SHORT_4_4_4_4&&(H=n.RGBA4),O===n.UNSIGNED_SHORT_5_5_5_1&&(H=n.RGB5_A1)}return(H===n.R16F||H===n.R32F||H===n.RG16F||H===n.RG32F||H===n.RGBA16F||H===n.RGBA32F)&&e.get("EXT_color_buffer_float"),H}function R(C,_){let O;return C?_===null||_===yn||_===nr?O=n.DEPTH24_STENCIL8:_===vn?O=n.DEPTH32F_STENCIL8:_===tr&&(O=n.DEPTH24_STENCIL8,Ke("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):_===null||_===yn||_===nr?O=n.DEPTH_COMPONENT24:_===vn?O=n.DEPTH_COMPONENT32F:_===tr&&(O=n.DEPTH_COMPONENT16),O}function b(C,_){return f(C)===!0||C.isFramebufferTexture&&C.minFilter!==kt&&C.minFilter!==Gt?Math.log2(Math.max(_.width,_.height))+1:C.mipmaps!==void 0&&C.mipmaps.length>0?C.mipmaps.length:C.isCompressedTexture&&Array.isArray(C.image)?_.mipmaps.length:1}function v(C){const _=C.target;_.removeEventListener("dispose",v),p(_),_.isVideoTexture&&d.delete(_),_.isHTMLTexture&&h.delete(_)}function x(C){const _=C.target;_.removeEventListener("dispose",x),A(_)}function p(C){const _=i.get(C);if(_.__webglInit===void 0)return;const O=C.source,V=m.get(O);if(V){const q=V[_.__cacheKey];q.usedTimes--,q.usedTimes===0&&y(C),Object.keys(V).length===0&&m.delete(O)}i.remove(C)}function y(C){const _=i.get(C);n.deleteTexture(_.__webglTexture);const O=C.source,V=m.get(O);delete V[_.__cacheKey],a.memory.textures--}function A(C){const _=i.get(C);if(C.depthTexture&&(C.depthTexture.dispose(),i.remove(C.depthTexture)),C.isWebGLCubeRenderTarget)for(let V=0;V<6;V++){if(Array.isArray(_.__webglFramebuffer[V]))for(let q=0;q<_.__webglFramebuffer[V].length;q++)n.deleteFramebuffer(_.__webglFramebuffer[V][q]);else n.deleteFramebuffer(_.__webglFramebuffer[V]);_.__webglDepthbuffer&&n.deleteRenderbuffer(_.__webglDepthbuffer[V])}else{if(Array.isArray(_.__webglFramebuffer))for(let V=0;V<_.__webglFramebuffer.length;V++)n.deleteFramebuffer(_.__webglFramebuffer[V]);else n.deleteFramebuffer(_.__webglFramebuffer);if(_.__webglDepthbuffer&&n.deleteRenderbuffer(_.__webglDepthbuffer),_.__webglMultisampledFramebuffer&&n.deleteFramebuffer(_.__webglMultisampledFramebuffer),_.__webglColorRenderbuffer)for(let V=0;V<_.__webglColorRenderbuffer.length;V++)_.__webglColorRenderbuffer[V]&&n.deleteRenderbuffer(_.__webglColorRenderbuffer[V]);_.__webglDepthRenderbuffer&&n.deleteRenderbuffer(_.__webglDepthRenderbuffer)}const O=C.textures;for(let V=0,q=O.length;V<q;V++){const ue=i.get(O[V]);ue.__webglTexture&&(n.deleteTexture(ue.__webglTexture),a.memory.textures--),i.remove(O[V])}i.remove(C)}let L=0;function B(){L=0}function D(){return L}function N(C){L=C}function k(){const C=L;return C>=r.maxTextures&&Ke("WebGLTextures: Trying to use "+C+" texture units while this GPU supports only "+r.maxTextures),L+=1,C}function W(C){const _=[];return _.push(C.wrapS),_.push(C.wrapT),_.push(C.wrapR||0),_.push(C.magFilter),_.push(C.minFilter),_.push(C.anisotropy),_.push(C.internalFormat),_.push(C.format),_.push(C.type),_.push(C.generateMipmaps),_.push(C.premultiplyAlpha),_.push(C.flipY),_.push(C.unpackAlignment),_.push(C.colorSpace),_.join()}function $(C,_){const O=i.get(C);if(C.isVideoTexture&&U(C),C.isRenderTargetTexture===!1&&C.isExternalTexture!==!0&&C.version>0&&O.__version!==C.version){const V=C.image;if(V===null)Ke("WebGLRenderer: Texture marked for update but no image data found.");else if(V.complete===!1)Ke("WebGLRenderer: Texture marked for update but image is incomplete");else{We(O,C,_);return}}else C.isExternalTexture&&(O.__webglTexture=C.sourceTexture?C.sourceTexture:null);t.bindTexture(n.TEXTURE_2D,O.__webglTexture,n.TEXTURE0+_)}function re(C,_){const O=i.get(C);if(C.isRenderTargetTexture===!1&&C.version>0&&O.__version!==C.version){We(O,C,_);return}else C.isExternalTexture&&(O.__webglTexture=C.sourceTexture?C.sourceTexture:null);t.bindTexture(n.TEXTURE_2D_ARRAY,O.__webglTexture,n.TEXTURE0+_)}function me(C,_){const O=i.get(C);if(C.isRenderTargetTexture===!1&&C.version>0&&O.__version!==C.version){We(O,C,_);return}t.bindTexture(n.TEXTURE_3D,O.__webglTexture,n.TEXTURE0+_)}function be(C,_){const O=i.get(C);if(C.isCubeDepthTexture!==!0&&C.version>0&&O.__version!==C.version){Ye(O,C,_);return}t.bindTexture(n.TEXTURE_CUBE_MAP,O.__webglTexture,n.TEXTURE0+_)}const _e={[Er]:n.REPEAT,[Rn]:n.CLAMP_TO_EDGE,[Ts]:n.MIRRORED_REPEAT},Be={[kt]:n.NEAREST,[Uc]:n.NEAREST_MIPMAP_NEAREST,[mr]:n.NEAREST_MIPMAP_LINEAR,[Gt]:n.LINEAR,[cs]:n.LINEAR_MIPMAP_NEAREST,[ai]:n.LINEAR_MIPMAP_LINEAR},Ze={[Oc]:n.NEVER,[Vc]:n.ALWAYS,[kc]:n.LESS,[ma]:n.LEQUAL,[Bc]:n.EQUAL,[ga]:n.GEQUAL,[zc]:n.GREATER,[Gc]:n.NOTEQUAL};function de(C,_){if(_.type===vn&&e.has("OES_texture_float_linear")===!1&&(_.magFilter===Gt||_.magFilter===cs||_.magFilter===mr||_.magFilter===ai||_.minFilter===Gt||_.minFilter===cs||_.minFilter===mr||_.minFilter===ai)&&Ke("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(C,n.TEXTURE_WRAP_S,_e[_.wrapS]),n.texParameteri(C,n.TEXTURE_WRAP_T,_e[_.wrapT]),(C===n.TEXTURE_3D||C===n.TEXTURE_2D_ARRAY)&&n.texParameteri(C,n.TEXTURE_WRAP_R,_e[_.wrapR]),n.texParameteri(C,n.TEXTURE_MAG_FILTER,Be[_.magFilter]),n.texParameteri(C,n.TEXTURE_MIN_FILTER,Be[_.minFilter]),_.compareFunction&&(n.texParameteri(C,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(C,n.TEXTURE_COMPARE_FUNC,Ze[_.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(_.magFilter===kt||_.minFilter!==mr&&_.minFilter!==ai||_.type===vn&&e.has("OES_texture_float_linear")===!1)return;if(_.anisotropy>1||i.get(_).__currentAnisotropy){const O=e.get("EXT_texture_filter_anisotropic");n.texParameterf(C,O.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(_.anisotropy,r.getMaxAnisotropy())),i.get(_).__currentAnisotropy=_.anisotropy}}}function z(C,_){let O=!1;C.__webglInit===void 0&&(C.__webglInit=!0,_.addEventListener("dispose",v));const V=_.source;let q=m.get(V);q===void 0&&(q={},m.set(V,q));const ue=W(_);if(ue!==C.__cacheKey){q[ue]===void 0&&(q[ue]={texture:n.createTexture(),usedTimes:0},a.memory.textures++,O=!0),q[ue].usedTimes++;const Q=q[C.__cacheKey];Q!==void 0&&(q[C.__cacheKey].usedTimes--,Q.usedTimes===0&&y(_)),C.__cacheKey=ue,C.__webglTexture=q[ue].texture}return O}function ve(C,_,O){return Math.floor(Math.floor(C/O)/_)}function fe(C,_,O,V){const ue=C.updateRanges;if(ue.length===0)t.texSubImage2D(n.TEXTURE_2D,0,0,0,_.width,_.height,O,V,_.data);else{ue.sort((xe,ge)=>xe.start-ge.start);let Q=0;for(let xe=1;xe<ue.length;xe++){const ge=ue[Q],Me=ue[xe],De=ge.start+ge.count,Fe=ve(Me.start,_.width,4),Xe=ve(ge.start,_.width,4);Me.start<=De+1&&Fe===Xe&&ve(Me.start+Me.count-1,_.width,4)===Fe?ge.count=Math.max(ge.count,Me.start+Me.count-ge.start):(++Q,ue[Q]=Me)}ue.length=Q+1;const H=t.getParameter(n.UNPACK_ROW_LENGTH),Y=t.getParameter(n.UNPACK_SKIP_PIXELS),oe=t.getParameter(n.UNPACK_SKIP_ROWS);t.pixelStorei(n.UNPACK_ROW_LENGTH,_.width);for(let xe=0,ge=ue.length;xe<ge;xe++){const Me=ue[xe],De=Math.floor(Me.start/4),Fe=Math.ceil(Me.count/4),Xe=De%_.width,F=Math.floor(De/_.width),Se=Fe,ie=1;t.pixelStorei(n.UNPACK_SKIP_PIXELS,Xe),t.pixelStorei(n.UNPACK_SKIP_ROWS,F),t.texSubImage2D(n.TEXTURE_2D,0,Xe,F,Se,ie,O,V,_.data)}C.clearUpdateRanges(),t.pixelStorei(n.UNPACK_ROW_LENGTH,H),t.pixelStorei(n.UNPACK_SKIP_PIXELS,Y),t.pixelStorei(n.UNPACK_SKIP_ROWS,oe)}}function We(C,_,O){let V=n.TEXTURE_2D;(_.isDataArrayTexture||_.isCompressedArrayTexture)&&(V=n.TEXTURE_2D_ARRAY),_.isData3DTexture&&(V=n.TEXTURE_3D);const q=z(C,_),ue=_.source;t.bindTexture(V,C.__webglTexture,n.TEXTURE0+O);const Q=i.get(ue);if(ue.version!==Q.__version||q===!0){if(t.activeTexture(n.TEXTURE0+O),(typeof ImageBitmap<"u"&&_.image instanceof ImageBitmap)===!1){const ie=ht.getPrimaries(ht.workingColorSpace),Ee=_.colorSpace===Bn?null:ht.getPrimaries(_.colorSpace),we=_.colorSpace===Bn||ie===Ee?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,_.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,we)}t.pixelStorei(n.UNPACK_ALIGNMENT,_.unpackAlignment);let Y=g(_.image,!1,r.maxTextureSize);Y=et(_,Y);const oe=s.convert(_.format,_.colorSpace),xe=s.convert(_.type);let ge=M(_.internalFormat,oe,xe,_.normalized,_.colorSpace,_.isVideoTexture);de(V,_);let Me;const De=_.mipmaps,Fe=_.isVideoTexture!==!0,Xe=Q.__version===void 0||q===!0,F=ue.dataReady,Se=b(_,Y);if(_.isDepthTexture)ge=R(_.format===oi,_.type),Xe&&(Fe?t.texStorage2D(n.TEXTURE_2D,1,ge,Y.width,Y.height):t.texImage2D(n.TEXTURE_2D,0,ge,Y.width,Y.height,0,oe,xe,null));else if(_.isDataTexture)if(De.length>0){Fe&&Xe&&t.texStorage2D(n.TEXTURE_2D,Se,ge,De[0].width,De[0].height);for(let ie=0,Ee=De.length;ie<Ee;ie++)Me=De[ie],Fe?F&&t.texSubImage2D(n.TEXTURE_2D,ie,0,0,Me.width,Me.height,oe,xe,Me.data):t.texImage2D(n.TEXTURE_2D,ie,ge,Me.width,Me.height,0,oe,xe,Me.data);_.generateMipmaps=!1}else Fe?(Xe&&t.texStorage2D(n.TEXTURE_2D,Se,ge,Y.width,Y.height),F&&fe(_,Y,oe,xe)):t.texImage2D(n.TEXTURE_2D,0,ge,Y.width,Y.height,0,oe,xe,Y.data);else if(_.isCompressedTexture)if(_.isCompressedArrayTexture){Fe&&Xe&&t.texStorage3D(n.TEXTURE_2D_ARRAY,Se,ge,De[0].width,De[0].height,Y.depth);for(let ie=0,Ee=De.length;ie<Ee;ie++)if(Me=De[ie],_.format!==dn)if(oe!==null)if(Fe){if(F)if(_.layerUpdates.size>0){const we=Il(Me.width,Me.height,_.format,_.type);for(const le of _.layerUpdates){const Oe=Me.data.subarray(le*we/Me.data.BYTES_PER_ELEMENT,(le+1)*we/Me.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,ie,0,0,le,Me.width,Me.height,1,oe,Oe)}_.clearLayerUpdates()}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,ie,0,0,0,Me.width,Me.height,Y.depth,oe,Me.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,ie,ge,Me.width,Me.height,Y.depth,0,Me.data,0,0);else Ke("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Fe?F&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,ie,0,0,0,Me.width,Me.height,Y.depth,oe,xe,Me.data):t.texImage3D(n.TEXTURE_2D_ARRAY,ie,ge,Me.width,Me.height,Y.depth,0,oe,xe,Me.data)}else{Fe&&Xe&&t.texStorage2D(n.TEXTURE_2D,Se,ge,De[0].width,De[0].height);for(let ie=0,Ee=De.length;ie<Ee;ie++)Me=De[ie],_.format!==dn?oe!==null?Fe?F&&t.compressedTexSubImage2D(n.TEXTURE_2D,ie,0,0,Me.width,Me.height,oe,Me.data):t.compressedTexImage2D(n.TEXTURE_2D,ie,ge,Me.width,Me.height,0,Me.data):Ke("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Fe?F&&t.texSubImage2D(n.TEXTURE_2D,ie,0,0,Me.width,Me.height,oe,xe,Me.data):t.texImage2D(n.TEXTURE_2D,ie,ge,Me.width,Me.height,0,oe,xe,Me.data)}else if(_.isDataArrayTexture)if(Fe){if(Xe&&t.texStorage3D(n.TEXTURE_2D_ARRAY,Se,ge,Y.width,Y.height,Y.depth),F)if(_.layerUpdates.size>0){const ie=Il(Y.width,Y.height,_.format,_.type);for(const Ee of _.layerUpdates){const we=Y.data.subarray(Ee*ie/Y.data.BYTES_PER_ELEMENT,(Ee+1)*ie/Y.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,Ee,Y.width,Y.height,1,oe,xe,we)}_.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,Y.width,Y.height,Y.depth,oe,xe,Y.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,ge,Y.width,Y.height,Y.depth,0,oe,xe,Y.data);else if(_.isData3DTexture)Fe?(Xe&&t.texStorage3D(n.TEXTURE_3D,Se,ge,Y.width,Y.height,Y.depth),F&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,Y.width,Y.height,Y.depth,oe,xe,Y.data)):t.texImage3D(n.TEXTURE_3D,0,ge,Y.width,Y.height,Y.depth,0,oe,xe,Y.data);else if(_.isFramebufferTexture){if(Xe)if(Fe)t.texStorage2D(n.TEXTURE_2D,Se,ge,Y.width,Y.height);else{let ie=Y.width,Ee=Y.height;for(let we=0;we<Se;we++)t.texImage2D(n.TEXTURE_2D,we,ge,ie,Ee,0,oe,xe,null),ie>>=1,Ee>>=1}}else if(_.isHTMLTexture){if("texElementImage2D"in n){const ie=n.canvas;if(ie.hasAttribute("layoutsubtree")||ie.setAttribute("layoutsubtree","true"),Y.parentNode!==ie){ie.appendChild(Y),h.add(_),ie.onpaint=Ee=>{const we=Ee.changedElements;for(const le of h)we.includes(le.image)&&(le.needsUpdate=!0)},ie.requestPaint();return}if(n.texElementImage2D.length===3)n.texElementImage2D(n.TEXTURE_2D,n.RGBA8,Y);else{const we=n.RGBA,le=n.RGBA,Oe=n.UNSIGNED_BYTE;n.texElementImage2D(n.TEXTURE_2D,0,we,le,Oe,Y)}n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE)}}else if(De.length>0){if(Fe&&Xe){const ie=Le(De[0]);t.texStorage2D(n.TEXTURE_2D,Se,ge,ie.width,ie.height)}for(let ie=0,Ee=De.length;ie<Ee;ie++)Me=De[ie],Fe?F&&t.texSubImage2D(n.TEXTURE_2D,ie,0,0,oe,xe,Me):t.texImage2D(n.TEXTURE_2D,ie,ge,oe,xe,Me);_.generateMipmaps=!1}else if(Fe){if(Xe){const ie=Le(Y);t.texStorage2D(n.TEXTURE_2D,Se,ge,ie.width,ie.height)}F&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,oe,xe,Y)}else t.texImage2D(n.TEXTURE_2D,0,ge,oe,xe,Y);f(_)&&P(V),Q.__version=ue.version,_.onUpdate&&_.onUpdate(_)}C.__version=_.version}function Ye(C,_,O){if(_.image.length!==6)return;const V=z(C,_),q=_.source;t.bindTexture(n.TEXTURE_CUBE_MAP,C.__webglTexture,n.TEXTURE0+O);const ue=i.get(q);if(q.version!==ue.__version||V===!0){t.activeTexture(n.TEXTURE0+O);const Q=ht.getPrimaries(ht.workingColorSpace),H=_.colorSpace===Bn?null:ht.getPrimaries(_.colorSpace),Y=_.colorSpace===Bn||Q===H?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,_.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),t.pixelStorei(n.UNPACK_ALIGNMENT,_.unpackAlignment),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Y);const oe=_.isCompressedTexture||_.image[0].isCompressedTexture,xe=_.image[0]&&_.image[0].isDataTexture,ge=[];for(let le=0;le<6;le++)!oe&&!xe?ge[le]=g(_.image[le],!0,r.maxCubemapSize):ge[le]=xe?_.image[le].image:_.image[le],ge[le]=et(_,ge[le]);const Me=ge[0],De=s.convert(_.format,_.colorSpace),Fe=s.convert(_.type),Xe=M(_.internalFormat,De,Fe,_.normalized,_.colorSpace),F=_.isVideoTexture!==!0,Se=ue.__version===void 0||V===!0,ie=q.dataReady;let Ee=b(_,Me);de(n.TEXTURE_CUBE_MAP,_);let we;if(oe){F&&Se&&t.texStorage2D(n.TEXTURE_CUBE_MAP,Ee,Xe,Me.width,Me.height);for(let le=0;le<6;le++){we=ge[le].mipmaps;for(let Oe=0;Oe<we.length;Oe++){const Ie=we[Oe];_.format!==dn?De!==null?F?ie&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+le,Oe,0,0,Ie.width,Ie.height,De,Ie.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+le,Oe,Xe,Ie.width,Ie.height,0,Ie.data):Ke("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):F?ie&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+le,Oe,0,0,Ie.width,Ie.height,De,Fe,Ie.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+le,Oe,Xe,Ie.width,Ie.height,0,De,Fe,Ie.data)}}}else{if(we=_.mipmaps,F&&Se){we.length>0&&Ee++;const le=Le(ge[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,Ee,Xe,le.width,le.height)}for(let le=0;le<6;le++)if(xe){F?ie&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+le,0,0,0,ge[le].width,ge[le].height,De,Fe,ge[le].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+le,0,Xe,ge[le].width,ge[le].height,0,De,Fe,ge[le].data);for(let Oe=0;Oe<we.length;Oe++){const tt=we[Oe].image[le].image;F?ie&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+le,Oe+1,0,0,tt.width,tt.height,De,Fe,tt.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+le,Oe+1,Xe,tt.width,tt.height,0,De,Fe,tt.data)}}else{F?ie&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+le,0,0,0,De,Fe,ge[le]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+le,0,Xe,De,Fe,ge[le]);for(let Oe=0;Oe<we.length;Oe++){const Ie=we[Oe];F?ie&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+le,Oe+1,0,0,De,Fe,Ie.image[le]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+le,Oe+1,Xe,De,Fe,Ie.image[le])}}}f(_)&&P(n.TEXTURE_CUBE_MAP),ue.__version=q.version,_.onUpdate&&_.onUpdate(_)}C.__version=_.version}function ze(C,_,O,V,q,ue){const Q=s.convert(O.format,O.colorSpace),H=s.convert(O.type),Y=M(O.internalFormat,Q,H,O.normalized,O.colorSpace),oe=i.get(_),xe=i.get(O);if(xe.__renderTarget=_,!oe.__hasExternalTextures){const ge=Math.max(1,_.width>>ue),Me=Math.max(1,_.height>>ue);q===n.TEXTURE_3D||q===n.TEXTURE_2D_ARRAY?t.texImage3D(q,ue,Y,ge,Me,_.depth,0,Q,H,null):t.texImage2D(q,ue,Y,ge,Me,0,Q,H,null)}t.bindFramebuffer(n.FRAMEBUFFER,C),Ae(_)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,V,q,xe.__webglTexture,0,ae(_)):(q===n.TEXTURE_2D||q>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&q<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,V,q,xe.__webglTexture,ue),t.bindFramebuffer(n.FRAMEBUFFER,null)}function nt(C,_,O){if(n.bindRenderbuffer(n.RENDERBUFFER,C),_.depthBuffer){const V=_.depthTexture,q=V&&V.isDepthTexture?V.type:null,ue=R(_.stencilBuffer,q),Q=_.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;Ae(_)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,ae(_),ue,_.width,_.height):O?n.renderbufferStorageMultisample(n.RENDERBUFFER,ae(_),ue,_.width,_.height):n.renderbufferStorage(n.RENDERBUFFER,ue,_.width,_.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,Q,n.RENDERBUFFER,C)}else{const V=_.textures;for(let q=0;q<V.length;q++){const ue=V[q],Q=s.convert(ue.format,ue.colorSpace),H=s.convert(ue.type),Y=M(ue.internalFormat,Q,H,ue.normalized,ue.colorSpace);Ae(_)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,ae(_),Y,_.width,_.height):O?n.renderbufferStorageMultisample(n.RENDERBUFFER,ae(_),Y,_.width,_.height):n.renderbufferStorage(n.RENDERBUFFER,Y,_.width,_.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function Qe(C,_,O){const V=_.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(n.FRAMEBUFFER,C),!(_.depthTexture&&_.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const q=i.get(_.depthTexture);if(q.__renderTarget=_,(!q.__webglTexture||_.depthTexture.image.width!==_.width||_.depthTexture.image.height!==_.height)&&(_.depthTexture.image.width=_.width,_.depthTexture.image.height=_.height,_.depthTexture.needsUpdate=!0),V){if(q.__webglInit===void 0&&(q.__webglInit=!0,_.depthTexture.addEventListener("dispose",v)),q.__webglTexture===void 0){q.__webglTexture=n.createTexture(),t.bindTexture(n.TEXTURE_CUBE_MAP,q.__webglTexture),de(n.TEXTURE_CUBE_MAP,_.depthTexture);const oe=s.convert(_.depthTexture.format),xe=s.convert(_.depthTexture.type);let ge;_.depthTexture.format===Ln?ge=n.DEPTH_COMPONENT24:_.depthTexture.format===oi&&(ge=n.DEPTH24_STENCIL8);for(let Me=0;Me<6;Me++)n.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Me,0,ge,_.width,_.height,0,oe,xe,null)}}else $(_.depthTexture,0);const ue=q.__webglTexture,Q=ae(_),H=V?n.TEXTURE_CUBE_MAP_POSITIVE_X+O:n.TEXTURE_2D,Y=_.depthTexture.format===oi?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;if(_.depthTexture.format===Ln)Ae(_)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,Y,H,ue,0,Q):n.framebufferTexture2D(n.FRAMEBUFFER,Y,H,ue,0);else if(_.depthTexture.format===oi)Ae(_)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,Y,H,ue,0,Q):n.framebufferTexture2D(n.FRAMEBUFFER,Y,H,ue,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function it(C){const _=i.get(C),O=C.isWebGLCubeRenderTarget===!0;if(_.__boundDepthTexture!==C.depthTexture){const V=C.depthTexture;if(_.__depthDisposeCallback&&_.__depthDisposeCallback(),V){const q=()=>{delete _.__boundDepthTexture,delete _.__depthDisposeCallback,V.removeEventListener("dispose",q)};V.addEventListener("dispose",q),_.__depthDisposeCallback=q}_.__boundDepthTexture=V}if(C.depthTexture&&!_.__autoAllocateDepthBuffer)if(O)for(let V=0;V<6;V++)Qe(_.__webglFramebuffer[V],C,V);else{const V=C.texture.mipmaps;V&&V.length>0?Qe(_.__webglFramebuffer[0],C,0):Qe(_.__webglFramebuffer,C,0)}else if(O){_.__webglDepthbuffer=[];for(let V=0;V<6;V++)if(t.bindFramebuffer(n.FRAMEBUFFER,_.__webglFramebuffer[V]),_.__webglDepthbuffer[V]===void 0)_.__webglDepthbuffer[V]=n.createRenderbuffer(),nt(_.__webglDepthbuffer[V],C,!1);else{const q=C.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ue=_.__webglDepthbuffer[V];n.bindRenderbuffer(n.RENDERBUFFER,ue),n.framebufferRenderbuffer(n.FRAMEBUFFER,q,n.RENDERBUFFER,ue)}}else{const V=C.texture.mipmaps;if(V&&V.length>0?t.bindFramebuffer(n.FRAMEBUFFER,_.__webglFramebuffer[0]):t.bindFramebuffer(n.FRAMEBUFFER,_.__webglFramebuffer),_.__webglDepthbuffer===void 0)_.__webglDepthbuffer=n.createRenderbuffer(),nt(_.__webglDepthbuffer,C,!1);else{const q=C.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ue=_.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,ue),n.framebufferRenderbuffer(n.FRAMEBUFFER,q,n.RENDERBUFFER,ue)}}t.bindFramebuffer(n.FRAMEBUFFER,null)}function ct(C,_,O){const V=i.get(C);_!==void 0&&ze(V.__webglFramebuffer,C,C.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),O!==void 0&&it(C)}function $e(C){const _=C.texture,O=i.get(C),V=i.get(_);C.addEventListener("dispose",x);const q=C.textures,ue=C.isWebGLCubeRenderTarget===!0,Q=q.length>1;if(Q||(V.__webglTexture===void 0&&(V.__webglTexture=n.createTexture()),V.__version=_.version,a.memory.textures++),ue){O.__webglFramebuffer=[];for(let H=0;H<6;H++)if(_.mipmaps&&_.mipmaps.length>0){O.__webglFramebuffer[H]=[];for(let Y=0;Y<_.mipmaps.length;Y++)O.__webglFramebuffer[H][Y]=n.createFramebuffer()}else O.__webglFramebuffer[H]=n.createFramebuffer()}else{if(_.mipmaps&&_.mipmaps.length>0){O.__webglFramebuffer=[];for(let H=0;H<_.mipmaps.length;H++)O.__webglFramebuffer[H]=n.createFramebuffer()}else O.__webglFramebuffer=n.createFramebuffer();if(Q)for(let H=0,Y=q.length;H<Y;H++){const oe=i.get(q[H]);oe.__webglTexture===void 0&&(oe.__webglTexture=n.createTexture(),a.memory.textures++)}if(C.samples>0&&Ae(C)===!1){O.__webglMultisampledFramebuffer=n.createFramebuffer(),O.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,O.__webglMultisampledFramebuffer);for(let H=0;H<q.length;H++){const Y=q[H];O.__webglColorRenderbuffer[H]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,O.__webglColorRenderbuffer[H]);const oe=s.convert(Y.format,Y.colorSpace),xe=s.convert(Y.type),ge=M(Y.internalFormat,oe,xe,Y.normalized,Y.colorSpace,C.isXRRenderTarget===!0),Me=ae(C);n.renderbufferStorageMultisample(n.RENDERBUFFER,Me,ge,C.width,C.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+H,n.RENDERBUFFER,O.__webglColorRenderbuffer[H])}n.bindRenderbuffer(n.RENDERBUFFER,null),C.depthBuffer&&(O.__webglDepthRenderbuffer=n.createRenderbuffer(),nt(O.__webglDepthRenderbuffer,C,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(ue){t.bindTexture(n.TEXTURE_CUBE_MAP,V.__webglTexture),de(n.TEXTURE_CUBE_MAP,_);for(let H=0;H<6;H++)if(_.mipmaps&&_.mipmaps.length>0)for(let Y=0;Y<_.mipmaps.length;Y++)ze(O.__webglFramebuffer[H][Y],C,_,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+H,Y);else ze(O.__webglFramebuffer[H],C,_,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+H,0);f(_)&&P(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Q){for(let H=0,Y=q.length;H<Y;H++){const oe=q[H],xe=i.get(oe);let ge=n.TEXTURE_2D;(C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(ge=C.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(ge,xe.__webglTexture),de(ge,oe),ze(O.__webglFramebuffer,C,oe,n.COLOR_ATTACHMENT0+H,ge,0),f(oe)&&P(ge)}t.unbindTexture()}else{let H=n.TEXTURE_2D;if((C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(H=C.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(H,V.__webglTexture),de(H,_),_.mipmaps&&_.mipmaps.length>0)for(let Y=0;Y<_.mipmaps.length;Y++)ze(O.__webglFramebuffer[Y],C,_,n.COLOR_ATTACHMENT0,H,Y);else ze(O.__webglFramebuffer,C,_,n.COLOR_ATTACHMENT0,H,0);f(_)&&P(H),t.unbindTexture()}C.depthBuffer&&it(C)}function ye(C){const _=C.textures;for(let O=0,V=_.length;O<V;O++){const q=_[O];if(f(q)){const ue=T(C),Q=i.get(q).__webglTexture;t.bindTexture(ue,Q),P(ue),t.unbindTexture()}}}const j=[],ce=[];function pe(C){if(C.samples>0){if(Ae(C)===!1){const _=C.textures,O=C.width,V=C.height;let q=n.COLOR_BUFFER_BIT;const ue=C.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Q=i.get(C),H=_.length>1;if(H)for(let oe=0;oe<_.length;oe++)t.bindFramebuffer(n.FRAMEBUFFER,Q.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+oe,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,Q.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+oe,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,Q.__webglMultisampledFramebuffer);const Y=C.texture.mipmaps;Y&&Y.length>0?t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Q.__webglFramebuffer[0]):t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Q.__webglFramebuffer);for(let oe=0;oe<_.length;oe++){if(C.resolveDepthBuffer&&(C.depthBuffer&&(q|=n.DEPTH_BUFFER_BIT),C.stencilBuffer&&C.resolveStencilBuffer&&(q|=n.STENCIL_BUFFER_BIT)),H){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,Q.__webglColorRenderbuffer[oe]);const xe=i.get(_[oe]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,xe,0)}n.blitFramebuffer(0,0,O,V,0,0,O,V,q,n.NEAREST),c===!0&&(j.length=0,ce.length=0,j.push(n.COLOR_ATTACHMENT0+oe),C.depthBuffer&&C.resolveDepthBuffer===!1&&(j.push(ue),ce.push(ue),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,ce)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,j))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),H)for(let oe=0;oe<_.length;oe++){t.bindFramebuffer(n.FRAMEBUFFER,Q.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+oe,n.RENDERBUFFER,Q.__webglColorRenderbuffer[oe]);const xe=i.get(_[oe]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,Q.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+oe,n.TEXTURE_2D,xe,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Q.__webglMultisampledFramebuffer)}else if(C.depthBuffer&&C.resolveDepthBuffer===!1&&c){const _=C.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[_])}}}function ae(C){return Math.min(r.maxSamples,C.samples)}function Ae(C){const _=i.get(C);return C.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&_.__useRenderToTexture!==!1}function U(C){const _=a.render.frame;d.get(C)!==_&&(d.set(C,_),C.update())}function et(C,_){const O=C.colorSpace,V=C.format,q=C.type;return C.isCompressedTexture===!0||C.isVideoTexture===!0||O!==wr&&O!==Bn&&(ht.getTransfer(O)===gt?(V!==dn||q!==en)&&Ke("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):ft("WebGLTextures: Unsupported texture color space:",O)),_}function Le(C){return typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement?(l.width=C.naturalWidth||C.width,l.height=C.naturalHeight||C.height):typeof VideoFrame<"u"&&C instanceof VideoFrame?(l.width=C.displayWidth,l.height=C.displayHeight):(l.width=C.width,l.height=C.height),l}this.allocateTextureUnit=k,this.resetTextureUnits=B,this.getTextureUnits=D,this.setTextureUnits=N,this.setTexture2D=$,this.setTexture2DArray=re,this.setTexture3D=me,this.setTextureCube=be,this.rebindTextures=ct,this.setupRenderTarget=$e,this.updateRenderTargetMipmap=ye,this.updateMultisampleRenderTarget=pe,this.setupDepthRenderbuffer=it,this.setupFrameBufferTexture=ze,this.useMultisampledRTT=Ae,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function mu(n,e){function t(i,r=Bn){let s;const a=ht.getTransfer(r);if(i===en)return n.UNSIGNED_BYTE;if(i===ua)return n.UNSIGNED_SHORT_4_4_4_4;if(i===da)return n.UNSIGNED_SHORT_5_5_5_1;if(i===Fo)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===Oo)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===Uo)return n.BYTE;if(i===No)return n.SHORT;if(i===tr)return n.UNSIGNED_SHORT;if(i===ca)return n.INT;if(i===yn)return n.UNSIGNED_INT;if(i===vn)return n.FLOAT;if(i===Pn)return n.HALF_FLOAT;if(i===ko)return n.ALPHA;if(i===Bo)return n.RGB;if(i===dn)return n.RGBA;if(i===Ln)return n.DEPTH_COMPONENT;if(i===oi)return n.DEPTH_STENCIL;if(i===zo)return n.RED;if(i===ha)return n.RED_INTEGER;if(i===di)return n.RG;if(i===fa)return n.RG_INTEGER;if(i===pa)return n.RGBA_INTEGER;if(i===xr||i===vr||i===Mr||i===Sr)if(a===gt)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===xr)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===vr)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Mr)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Sr)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===xr)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===vr)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Mr)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Sr)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===As||i===ws||i===Rs||i===Cs)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===As)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===ws)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Rs)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Cs)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Ps||i===Ls||i===Ds||i===Is||i===Us||i===Tr||i===Ns)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(i===Ps||i===Ls)return a===gt?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===Ds)return a===gt?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC;if(i===Is)return s.COMPRESSED_R11_EAC;if(i===Us)return s.COMPRESSED_SIGNED_R11_EAC;if(i===Tr)return s.COMPRESSED_RG11_EAC;if(i===Ns)return s.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===Fs||i===Os||i===ks||i===Bs||i===zs||i===Gs||i===Vs||i===Hs||i===Ws||i===Xs||i===qs||i===Ys||i===Ks||i===Zs)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(i===Fs)return a===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Os)return a===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===ks)return a===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Bs)return a===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===zs)return a===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Gs)return a===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Vs)return a===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Hs)return a===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Ws)return a===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Xs)return a===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===qs)return a===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Ys)return a===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Ks)return a===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Zs)return a===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===$s||i===js||i===Js)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(i===$s)return a===gt?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===js)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Js)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Qs||i===ea||i===Ar||i===ta)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(i===Qs)return s.COMPRESSED_RED_RGTC1_EXT;if(i===ea)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Ar)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===ta)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===nr?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}const wg=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Rg=`
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

}`;class Cg{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const i=new qo(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,i=new En({vertexShader:wg,fragmentShader:Rg,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new tn(new Pi(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Pg extends Yn{constructor(e,t){super();const i=this;let r=null,s=1,a=null,o="local-floor",c=1,l=null,d=null,h=null,u=null,m=null,S=null;const w=typeof XRWebGLBinding<"u",g=new Cg,f={},P=t.getContextAttributes();let T=null,M=null;const R=[],b=[],v=new He;let x=null;const p=new an;p.viewport=new mt;const y=new an;y.viewport=new mt;const A=[p,y],L=new au;let B=null,D=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(z){let ve=R[z];return ve===void 0&&(ve=new us,R[z]=ve),ve.getTargetRaySpace()},this.getControllerGrip=function(z){let ve=R[z];return ve===void 0&&(ve=new us,R[z]=ve),ve.getGripSpace()},this.getHand=function(z){let ve=R[z];return ve===void 0&&(ve=new us,R[z]=ve),ve.getHandSpace()};function N(z){const ve=b.indexOf(z.inputSource);if(ve===-1)return;const fe=R[ve];fe!==void 0&&(fe.update(z.inputSource,z.frame,l||a),fe.dispatchEvent({type:z.type,data:z.inputSource}))}function k(){r.removeEventListener("select",N),r.removeEventListener("selectstart",N),r.removeEventListener("selectend",N),r.removeEventListener("squeeze",N),r.removeEventListener("squeezestart",N),r.removeEventListener("squeezeend",N),r.removeEventListener("end",k),r.removeEventListener("inputsourceschange",W);for(let z=0;z<R.length;z++){const ve=b[z];ve!==null&&(b[z]=null,R[z].disconnect(ve))}B=null,D=null,g.reset();for(const z in f)delete f[z];e.setRenderTarget(T),m=null,u=null,h=null,r=null,M=null,de.stop(),i.isPresenting=!1,e.setPixelRatio(x),e.setSize(v.width,v.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(z){s=z,i.isPresenting===!0&&Ke("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(z){o=z,i.isPresenting===!0&&Ke("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(z){l=z},this.getBaseLayer=function(){return u!==null?u:m},this.getBinding=function(){return h===null&&w&&(h=new XRWebGLBinding(r,t)),h},this.getFrame=function(){return S},this.getSession=function(){return r},this.setSession=async function(z){if(r=z,r!==null){if(T=e.getRenderTarget(),r.addEventListener("select",N),r.addEventListener("selectstart",N),r.addEventListener("selectend",N),r.addEventListener("squeeze",N),r.addEventListener("squeezestart",N),r.addEventListener("squeezeend",N),r.addEventListener("end",k),r.addEventListener("inputsourceschange",W),P.xrCompatible!==!0&&await t.makeXRCompatible(),x=e.getPixelRatio(),e.getSize(v),w&&"createProjectionLayer"in XRWebGLBinding.prototype){let fe=null,We=null,Ye=null;P.depth&&(Ye=P.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,fe=P.stencil?oi:Ln,We=P.stencil?nr:yn);const ze={colorFormat:t.RGBA8,depthFormat:Ye,scaleFactor:s};h=this.getBinding(),u=h.createProjectionLayer(ze),r.updateRenderState({layers:[u]}),e.setPixelRatio(1),e.setSize(u.textureWidth,u.textureHeight,!1),M=new bn(u.textureWidth,u.textureHeight,{format:dn,type:en,depthTexture:new Ci(u.textureWidth,u.textureHeight,We,void 0,void 0,void 0,void 0,void 0,void 0,fe),stencilBuffer:P.stencil,colorSpace:e.outputColorSpace,samples:P.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1})}else{const fe={antialias:P.antialias,alpha:!0,depth:P.depth,stencil:P.stencil,framebufferScaleFactor:s};m=new XRWebGLLayer(r,t,fe),r.updateRenderState({baseLayer:m}),e.setPixelRatio(1),e.setSize(m.framebufferWidth,m.framebufferHeight,!1),M=new bn(m.framebufferWidth,m.framebufferHeight,{format:dn,type:en,colorSpace:e.outputColorSpace,stencilBuffer:P.stencil,resolveDepthBuffer:m.ignoreDepthValues===!1,resolveStencilBuffer:m.ignoreDepthValues===!1})}M.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await r.requestReferenceSpace(o),de.setContext(r),de.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function W(z){for(let ve=0;ve<z.removed.length;ve++){const fe=z.removed[ve],We=b.indexOf(fe);We>=0&&(b[We]=null,R[We].disconnect(fe))}for(let ve=0;ve<z.added.length;ve++){const fe=z.added[ve];let We=b.indexOf(fe);if(We===-1){for(let ze=0;ze<R.length;ze++)if(ze>=b.length){b.push(fe),We=ze;break}else if(b[ze]===null){b[ze]=fe,We=ze;break}if(We===-1)break}const Ye=R[We];Ye&&Ye.connect(fe)}}const $=new G,re=new G;function me(z,ve,fe){$.setFromMatrixPosition(ve.matrixWorld),re.setFromMatrixPosition(fe.matrixWorld);const We=$.distanceTo(re),Ye=ve.projectionMatrix.elements,ze=fe.projectionMatrix.elements,nt=Ye[14]/(Ye[10]-1),Qe=Ye[14]/(Ye[10]+1),it=(Ye[9]+1)/Ye[5],ct=(Ye[9]-1)/Ye[5],$e=(Ye[8]-1)/Ye[0],ye=(ze[8]+1)/ze[0],j=nt*$e,ce=nt*ye,pe=We/(-$e+ye),ae=pe*-$e;if(ve.matrixWorld.decompose(z.position,z.quaternion,z.scale),z.translateX(ae),z.translateZ(pe),z.matrixWorld.compose(z.position,z.quaternion,z.scale),z.matrixWorldInverse.copy(z.matrixWorld).invert(),Ye[10]===-1)z.projectionMatrix.copy(ve.projectionMatrix),z.projectionMatrixInverse.copy(ve.projectionMatrixInverse);else{const Ae=nt+pe,U=Qe+pe,et=j-ae,Le=ce+(We-ae),C=it*Qe/U*Ae,_=ct*Qe/U*Ae;z.projectionMatrix.makePerspective(et,Le,C,_,Ae,U),z.projectionMatrixInverse.copy(z.projectionMatrix).invert()}}function be(z,ve){ve===null?z.matrixWorld.copy(z.matrix):z.matrixWorld.multiplyMatrices(ve.matrixWorld,z.matrix),z.matrixWorldInverse.copy(z.matrixWorld).invert()}this.updateCamera=function(z){if(r===null)return;let ve=z.near,fe=z.far;g.texture!==null&&(g.depthNear>0&&(ve=g.depthNear),g.depthFar>0&&(fe=g.depthFar)),L.near=y.near=p.near=ve,L.far=y.far=p.far=fe,(B!==L.near||D!==L.far)&&(r.updateRenderState({depthNear:L.near,depthFar:L.far}),B=L.near,D=L.far),L.layers.mask=z.layers.mask|6,p.layers.mask=L.layers.mask&-5,y.layers.mask=L.layers.mask&-3;const We=z.parent,Ye=L.cameras;be(L,We);for(let ze=0;ze<Ye.length;ze++)be(Ye[ze],We);Ye.length===2?me(L,p,y):L.projectionMatrix.copy(p.projectionMatrix),_e(z,L,We)};function _e(z,ve,fe){fe===null?z.matrix.copy(ve.matrixWorld):(z.matrix.copy(fe.matrixWorld),z.matrix.invert(),z.matrix.multiply(ve.matrixWorld)),z.matrix.decompose(z.position,z.quaternion,z.scale),z.updateMatrixWorld(!0),z.projectionMatrix.copy(ve.projectionMatrix),z.projectionMatrixInverse.copy(ve.projectionMatrixInverse),z.isPerspectiveCamera&&(z.fov=Cr*2*Math.atan(1/z.projectionMatrix.elements[5]),z.zoom=1)}this.getCamera=function(){return L},this.getFoveation=function(){if(!(u===null&&m===null))return c},this.setFoveation=function(z){c=z,u!==null&&(u.fixedFoveation=z),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=z)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(L)},this.getCameraTexture=function(z){return f[z]};let Be=null;function Ze(z,ve){if(d=ve.getViewerPose(l||a),S=ve,d!==null){const fe=d.views;m!==null&&(e.setRenderTargetFramebuffer(M,m.framebuffer),e.setRenderTarget(M));let We=!1;fe.length!==L.cameras.length&&(L.cameras.length=0,We=!0);for(let Qe=0;Qe<fe.length;Qe++){const it=fe[Qe];let ct=null;if(m!==null)ct=m.getViewport(it);else{const ye=h.getViewSubImage(u,it);ct=ye.viewport,Qe===0&&(e.setRenderTargetTextures(M,ye.colorTexture,ye.depthStencilTexture),e.setRenderTarget(M))}let $e=A[Qe];$e===void 0&&($e=new an,$e.layers.enable(Qe),$e.viewport=new mt,A[Qe]=$e),$e.matrix.fromArray(it.transform.matrix),$e.matrix.decompose($e.position,$e.quaternion,$e.scale),$e.projectionMatrix.fromArray(it.projectionMatrix),$e.projectionMatrixInverse.copy($e.projectionMatrix).invert(),$e.viewport.set(ct.x,ct.y,ct.width,ct.height),Qe===0&&(L.matrix.copy($e.matrix),L.matrix.decompose(L.position,L.quaternion,L.scale)),We===!0&&L.cameras.push($e)}const Ye=r.enabledFeatures;if(Ye&&Ye.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&w){h=i.getBinding();const Qe=h.getDepthInformation(fe[0]);Qe&&Qe.isValid&&Qe.texture&&g.init(Qe,r.renderState)}if(Ye&&Ye.includes("camera-access")&&w){e.state.unbindTexture(),h=i.getBinding();for(let Qe=0;Qe<fe.length;Qe++){const it=fe[Qe].camera;if(it){let ct=f[it];ct||(ct=new qo,f[it]=ct);const $e=h.getCameraImage(it);ct.sourceTexture=$e}}}}for(let fe=0;fe<R.length;fe++){const We=b[fe],Ye=R[fe];We!==null&&Ye!==void 0&&Ye.update(We,ve,l||a)}Be&&Be(z,ve),ve.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:ve}),S=null}const de=new cu;de.setAnimationLoop(Ze),this.setAnimationLoop=function(z){Be=z},this.dispose=function(){}}}const Lg=new _t,gu=new je;gu.set(-1,0,0,0,1,0,0,0,1);function Dg(n,e){function t(g,f){g.matrixAutoUpdate===!0&&g.updateMatrix(),f.value.copy(g.matrix)}function i(g,f){f.color.getRGB(g.fogColor.value,Jc(n)),f.isFog?(g.fogNear.value=f.near,g.fogFar.value=f.far):f.isFogExp2&&(g.fogDensity.value=f.density)}function r(g,f,P,T,M){f.isNodeMaterial?f.uniformsNeedUpdate=!1:f.isMeshBasicMaterial?s(g,f):f.isMeshLambertMaterial?(s(g,f),f.envMap&&(g.envMapIntensity.value=f.envMapIntensity)):f.isMeshToonMaterial?(s(g,f),h(g,f)):f.isMeshPhongMaterial?(s(g,f),d(g,f),f.envMap&&(g.envMapIntensity.value=f.envMapIntensity)):f.isMeshStandardMaterial?(s(g,f),u(g,f),f.isMeshPhysicalMaterial&&m(g,f,M)):f.isMeshMatcapMaterial?(s(g,f),S(g,f)):f.isMeshDepthMaterial?s(g,f):f.isMeshDistanceMaterial?(s(g,f),w(g,f)):f.isMeshNormalMaterial?s(g,f):f.isLineBasicMaterial?(a(g,f),f.isLineDashedMaterial&&o(g,f)):f.isPointsMaterial?c(g,f,P,T):f.isSpriteMaterial?l(g,f):f.isShadowMaterial?(g.color.value.copy(f.color),g.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function s(g,f){g.opacity.value=f.opacity,f.color&&g.diffuse.value.copy(f.color),f.emissive&&g.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(g.map.value=f.map,t(f.map,g.mapTransform)),f.alphaMap&&(g.alphaMap.value=f.alphaMap,t(f.alphaMap,g.alphaMapTransform)),f.bumpMap&&(g.bumpMap.value=f.bumpMap,t(f.bumpMap,g.bumpMapTransform),g.bumpScale.value=f.bumpScale,f.side===jt&&(g.bumpScale.value*=-1)),f.normalMap&&(g.normalMap.value=f.normalMap,t(f.normalMap,g.normalMapTransform),g.normalScale.value.copy(f.normalScale),f.side===jt&&g.normalScale.value.negate()),f.displacementMap&&(g.displacementMap.value=f.displacementMap,t(f.displacementMap,g.displacementMapTransform),g.displacementScale.value=f.displacementScale,g.displacementBias.value=f.displacementBias),f.emissiveMap&&(g.emissiveMap.value=f.emissiveMap,t(f.emissiveMap,g.emissiveMapTransform)),f.specularMap&&(g.specularMap.value=f.specularMap,t(f.specularMap,g.specularMapTransform)),f.alphaTest>0&&(g.alphaTest.value=f.alphaTest);const P=e.get(f),T=P.envMap,M=P.envMapRotation;T&&(g.envMap.value=T,g.envMapRotation.value.setFromMatrix4(Lg.makeRotationFromEuler(M)).transpose(),T.isCubeTexture&&T.isRenderTargetTexture===!1&&g.envMapRotation.value.premultiply(gu),g.reflectivity.value=f.reflectivity,g.ior.value=f.ior,g.refractionRatio.value=f.refractionRatio),f.lightMap&&(g.lightMap.value=f.lightMap,g.lightMapIntensity.value=f.lightMapIntensity,t(f.lightMap,g.lightMapTransform)),f.aoMap&&(g.aoMap.value=f.aoMap,g.aoMapIntensity.value=f.aoMapIntensity,t(f.aoMap,g.aoMapTransform))}function a(g,f){g.diffuse.value.copy(f.color),g.opacity.value=f.opacity,f.map&&(g.map.value=f.map,t(f.map,g.mapTransform))}function o(g,f){g.dashSize.value=f.dashSize,g.totalSize.value=f.dashSize+f.gapSize,g.scale.value=f.scale}function c(g,f,P,T){g.diffuse.value.copy(f.color),g.opacity.value=f.opacity,g.size.value=f.size*P,g.scale.value=T*.5,f.map&&(g.map.value=f.map,t(f.map,g.uvTransform)),f.alphaMap&&(g.alphaMap.value=f.alphaMap,t(f.alphaMap,g.alphaMapTransform)),f.alphaTest>0&&(g.alphaTest.value=f.alphaTest)}function l(g,f){g.diffuse.value.copy(f.color),g.opacity.value=f.opacity,g.rotation.value=f.rotation,f.map&&(g.map.value=f.map,t(f.map,g.mapTransform)),f.alphaMap&&(g.alphaMap.value=f.alphaMap,t(f.alphaMap,g.alphaMapTransform)),f.alphaTest>0&&(g.alphaTest.value=f.alphaTest)}function d(g,f){g.specular.value.copy(f.specular),g.shininess.value=Math.max(f.shininess,1e-4)}function h(g,f){f.gradientMap&&(g.gradientMap.value=f.gradientMap)}function u(g,f){g.metalness.value=f.metalness,f.metalnessMap&&(g.metalnessMap.value=f.metalnessMap,t(f.metalnessMap,g.metalnessMapTransform)),g.roughness.value=f.roughness,f.roughnessMap&&(g.roughnessMap.value=f.roughnessMap,t(f.roughnessMap,g.roughnessMapTransform)),f.envMap&&(g.envMapIntensity.value=f.envMapIntensity)}function m(g,f,P){g.ior.value=f.ior,f.sheen>0&&(g.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),g.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(g.sheenColorMap.value=f.sheenColorMap,t(f.sheenColorMap,g.sheenColorMapTransform)),f.sheenRoughnessMap&&(g.sheenRoughnessMap.value=f.sheenRoughnessMap,t(f.sheenRoughnessMap,g.sheenRoughnessMapTransform))),f.clearcoat>0&&(g.clearcoat.value=f.clearcoat,g.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(g.clearcoatMap.value=f.clearcoatMap,t(f.clearcoatMap,g.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,t(f.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(g.clearcoatNormalMap.value=f.clearcoatNormalMap,t(f.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===jt&&g.clearcoatNormalScale.value.negate())),f.dispersion>0&&(g.dispersion.value=f.dispersion),f.iridescence>0&&(g.iridescence.value=f.iridescence,g.iridescenceIOR.value=f.iridescenceIOR,g.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(g.iridescenceMap.value=f.iridescenceMap,t(f.iridescenceMap,g.iridescenceMapTransform)),f.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=f.iridescenceThicknessMap,t(f.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),f.transmission>0&&(g.transmission.value=f.transmission,g.transmissionSamplerMap.value=P.texture,g.transmissionSamplerSize.value.set(P.width,P.height),f.transmissionMap&&(g.transmissionMap.value=f.transmissionMap,t(f.transmissionMap,g.transmissionMapTransform)),g.thickness.value=f.thickness,f.thicknessMap&&(g.thicknessMap.value=f.thicknessMap,t(f.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=f.attenuationDistance,g.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(g.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(g.anisotropyMap.value=f.anisotropyMap,t(f.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=f.specularIntensity,g.specularColor.value.copy(f.specularColor),f.specularColorMap&&(g.specularColorMap.value=f.specularColorMap,t(f.specularColorMap,g.specularColorMapTransform)),f.specularIntensityMap&&(g.specularIntensityMap.value=f.specularIntensityMap,t(f.specularIntensityMap,g.specularIntensityMapTransform))}function S(g,f){f.matcap&&(g.matcap.value=f.matcap)}function w(g,f){const P=e.get(f).light;g.referencePosition.value.setFromMatrixPosition(P.matrixWorld),g.nearDistance.value=P.shadow.camera.near,g.farDistance.value=P.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function Ig(n,e,t,i){let r={},s={},a=[];const o=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function c(M,R){const b=R.program;i.uniformBlockBinding(M,b)}function l(M,R){let b=r[M.id];b===void 0&&(g(M),b=d(M),r[M.id]=b,M.addEventListener("dispose",P));const v=R.program;i.updateUBOMapping(M,v);const x=e.render.frame;s[M.id]!==x&&(u(M),s[M.id]=x)}function d(M){const R=h();M.__bindingPointIndex=R;const b=n.createBuffer(),v=M.__size,x=M.usage;return n.bindBuffer(n.UNIFORM_BUFFER,b),n.bufferData(n.UNIFORM_BUFFER,v,x),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,R,b),b}function h(){for(let M=0;M<o;M++)if(a.indexOf(M)===-1)return a.push(M),M;return ft("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(M){const R=r[M.id],b=M.uniforms,v=M.__cache;n.bindBuffer(n.UNIFORM_BUFFER,R);for(let x=0,p=b.length;x<p;x++){const y=b[x];if(Array.isArray(y))for(let A=0,L=y.length;A<L;A++)m(y[A],x,A,v);else m(y,x,0,v)}n.bindBuffer(n.UNIFORM_BUFFER,null)}function m(M,R,b,v){if(w(M,R,b,v)===!0){const x=M.__offset,p=M.value;if(Array.isArray(p)){let y=0;for(let A=0;A<p.length;A++){const L=p[A],B=f(L);S(L,M.__data,y),typeof L!="number"&&typeof L!="boolean"&&!L.isMatrix3&&!ArrayBuffer.isView(L)&&(y+=B.storage/Float32Array.BYTES_PER_ELEMENT)}}else S(p,M.__data,0);n.bufferSubData(n.UNIFORM_BUFFER,x,M.__data)}}function S(M,R,b){typeof M=="number"||typeof M=="boolean"?R[0]=M:M.isMatrix3?(R[0]=M.elements[0],R[1]=M.elements[1],R[2]=M.elements[2],R[3]=0,R[4]=M.elements[3],R[5]=M.elements[4],R[6]=M.elements[5],R[7]=0,R[8]=M.elements[6],R[9]=M.elements[7],R[10]=M.elements[8],R[11]=0):ArrayBuffer.isView(M)?R.set(new M.constructor(M.buffer,M.byteOffset,R.length)):M.toArray(R,b)}function w(M,R,b,v){const x=M.value,p=R+"_"+b;if(v[p]===void 0)return typeof x=="number"||typeof x=="boolean"?v[p]=x:ArrayBuffer.isView(x)?v[p]=x.slice():v[p]=x.clone(),!0;{const y=v[p];if(typeof x=="number"||typeof x=="boolean"){if(y!==x)return v[p]=x,!0}else{if(ArrayBuffer.isView(x))return!0;if(y.equals(x)===!1)return y.copy(x),!0}}return!1}function g(M){const R=M.uniforms;let b=0;const v=16;for(let p=0,y=R.length;p<y;p++){const A=Array.isArray(R[p])?R[p]:[R[p]];for(let L=0,B=A.length;L<B;L++){const D=A[L],N=Array.isArray(D.value)?D.value:[D.value];for(let k=0,W=N.length;k<W;k++){const $=N[k],re=f($),me=b%v,be=me%re.boundary,_e=me+be;b+=be,_e!==0&&v-_e<re.storage&&(b+=v-_e),D.__data=new Float32Array(re.storage/Float32Array.BYTES_PER_ELEMENT),D.__offset=b,b+=re.storage}}}const x=b%v;return x>0&&(b+=v-x),M.__size=b,M.__cache={},this}function f(M){const R={boundary:0,storage:0};return typeof M=="number"||typeof M=="boolean"?(R.boundary=4,R.storage=4):M.isVector2?(R.boundary=8,R.storage=8):M.isVector3||M.isColor?(R.boundary=16,R.storage=12):M.isVector4?(R.boundary=16,R.storage=16):M.isMatrix3?(R.boundary=48,R.storage=48):M.isMatrix4?(R.boundary=64,R.storage=64):M.isTexture?Ke("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(M)?(R.boundary=16,R.storage=M.byteLength):Ke("WebGLRenderer: Unsupported uniform value type.",M),R}function P(M){const R=M.target;R.removeEventListener("dispose",P);const b=a.indexOf(R.__bindingPointIndex);a.splice(b,1),n.deleteBuffer(r[R.id]),delete r[R.id],delete s[R.id]}function T(){for(const M in r)n.deleteBuffer(r[M]);a=[],r={},s={}}return{bind:c,update:l,dispose:T}}const Ug=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let wn=null;function Ng(){return wn===null&&(wn=new $c(Ug,16,16,di,Pn),wn.name="DFG_LUT",wn.minFilter=Gt,wn.magFilter=Gt,wn.wrapS=Rn,wn.wrapT=Rn,wn.generateMipmaps=!1,wn.needsUpdate=!0),wn}class _u{constructor(e={}){const{canvas:t=Hc(),context:i=null,depth:r=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:d="default",failIfMajorPerformanceCaveat:h=!1,reversedDepthBuffer:u=!1,outputBufferType:m=en}=e;this.isWebGLRenderer=!0;let S;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");S=i.getContextAttributes().alpha}else S=a;const w=m,g=new Set([pa,fa,ha]),f=new Set([en,yn,tr,nr,ua,da]),P=new Uint32Array(4),T=new Int32Array(4),M=new G;let R=null,b=null;const v=[],x=[];let p=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Sn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const y=this;let A=!1,L=null,B=null,D=null,N=null;this._outputColorSpace=zt;let k=0,W=0,$=null,re=-1,me=null;const be=new mt,_e=new mt;let Be=null;const Ze=new Je(0);let de=0,z=t.width,ve=t.height,fe=1,We=null,Ye=null;const ze=new mt(0,0,z,ve),nt=new mt(0,0,z,ve);let Qe=!1;const it=new Ir;let ct=!1,$e=!1;const ye=new _t,j=new G,ce=new mt,pe={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let ae=!1;function Ae(){return $===null?fe:1}let U=i;function et(E,X){return t.getContext(E,X)}try{const E={alpha:!0,depth:r,stencil:s,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:d,failIfMajorPerformanceCaveat:h};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${oa}`),t.addEventListener("webglcontextlost",tt,!1),t.addEventListener("webglcontextrestored",at,!1),t.addEventListener("webglcontextcreationerror",Et,!1),U===null){const X="webgl2";if(U=et(X,E),U===null)throw et(X)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}}catch(E){throw ft("WebGLRenderer: "+E.message),E}let Le,C,_,O,V,q,ue,Q,H,Y,oe,xe,ge,Me,De,Fe,Xe,F,Se,ie,Ee,we,le;function Oe(){Le=new Fp(U),Le.init(),Ee=new mu(U,Le),C=new Rp(U,Le,e,Ee),_=new Tg(U,Le),C.reversedDepthBuffer&&u&&_.buffers.depth.setReversed(!0),B=U.createFramebuffer(),D=U.createFramebuffer(),N=U.createFramebuffer(),O=new Bp(U),V=new dg,q=new Ag(U,Le,_,V,C,Ee,O),ue=new Np(y),Q=new Vd(U),we=new Ap(U,Q),H=new Op(U,Q,O,we),Y=new Gp(U,H,Q,we,O),F=new zp(U,C,q),De=new Cp(V),oe=new ug(y,ue,Le,C,we,De),xe=new Dg(y,V),ge=new fg,Me=new vg(Le),Xe=new Tp(y,ue,_,Y,S,c),Fe=new Eg(y,Y,C),le=new Ig(U,O,C,_),Se=new wp(U,Le,O),ie=new kp(U,Le,O),O.programs=oe.programs,y.capabilities=C,y.extensions=Le,y.properties=V,y.renderLists=ge,y.shadowMap=Fe,y.state=_,y.info=O}Oe(),w!==en&&(p=new Hp(w,t.width,t.height,o,r,s));const Ie=new Pg(y,U);this.xr=Ie,this.getContext=function(){return U},this.getContextAttributes=function(){return U.getContextAttributes()},this.forceContextLoss=function(){const E=Le.get("WEBGL_lose_context");E&&E.loseContext()},this.forceContextRestore=function(){const E=Le.get("WEBGL_lose_context");E&&E.restoreContext()},this.getPixelRatio=function(){return fe},this.setPixelRatio=function(E){E!==void 0&&(fe=E,this.setSize(z,ve,!1))},this.getSize=function(E){return E.set(z,ve)},this.setSize=function(E,X,J=!0){if(Ie.isPresenting){Ke("WebGLRenderer: Can't change size while VR device is presenting.");return}z=E,ve=X,t.width=Math.floor(E*fe),t.height=Math.floor(X*fe),J===!0&&(t.style.width=E+"px",t.style.height=X+"px"),p!==null&&p.setSize(t.width,t.height),this.setViewport(0,0,E,X)},this.getDrawingBufferSize=function(E){return E.set(z*fe,ve*fe).floor()},this.setDrawingBufferSize=function(E,X,J){z=E,ve=X,fe=J,t.width=Math.floor(E*J),t.height=Math.floor(X*J),this.setViewport(0,0,E,X)},this.setEffects=function(E){if(w===en){ft("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(E){for(let X=0;X<E.length;X++)if(E[X].isOutputPass===!0){Ke("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}p.setEffects(E||[])},this.getCurrentViewport=function(E){return E.copy(be)},this.getViewport=function(E){return E.copy(ze)},this.setViewport=function(E,X,J,K){E.isVector4?ze.set(E.x,E.y,E.z,E.w):ze.set(E,X,J,K),_.viewport(be.copy(ze).multiplyScalar(fe).round())},this.getScissor=function(E){return E.copy(nt)},this.setScissor=function(E,X,J,K){E.isVector4?nt.set(E.x,E.y,E.z,E.w):nt.set(E,X,J,K),_.scissor(_e.copy(nt).multiplyScalar(fe).round())},this.getScissorTest=function(){return Qe},this.setScissorTest=function(E){_.setScissorTest(Qe=E)},this.setOpaqueSort=function(E){We=E},this.setTransparentSort=function(E){Ye=E},this.getClearColor=function(E){return E.copy(Xe.getClearColor())},this.setClearColor=function(){Xe.setClearColor(...arguments)},this.getClearAlpha=function(){return Xe.getClearAlpha()},this.setClearAlpha=function(){Xe.setClearAlpha(...arguments)},this.clear=function(E=!0,X=!0,J=!0){let K=0;if(E){let Z=!1;if($!==null){const Pe=$.texture.format;Z=g.has(Pe)}if(Z){const Pe=$.texture.type,Ne=f.has(Pe),Ce=Xe.getClearColor(),ke=Xe.getClearAlpha(),Ge=Ce.r,st=Ce.g,lt=Ce.b;Ne?(P[0]=Ge,P[1]=st,P[2]=lt,P[3]=ke,U.clearBufferuiv(U.COLOR,0,P)):(T[0]=Ge,T[1]=st,T[2]=lt,T[3]=ke,U.clearBufferiv(U.COLOR,0,T))}else K|=U.COLOR_BUFFER_BIT}X&&(K|=U.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),J&&(K|=U.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),K!==0&&U.clear(K)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(E){E.setRenderer(this),L=E},this.dispose=function(){t.removeEventListener("webglcontextlost",tt,!1),t.removeEventListener("webglcontextrestored",at,!1),t.removeEventListener("webglcontextcreationerror",Et,!1),Xe.dispose(),ge.dispose(),Me.dispose(),V.dispose(),ue.dispose(),Y.dispose(),we.dispose(),le.dispose(),oe.dispose(),Ie.dispose(),Ie.removeEventListener("sessionstart",te),Ie.removeEventListener("sessionend",se),he.stop()};function tt(E){E.preventDefault(),go("WebGLRenderer: Context Lost."),A=!0}function at(){go("WebGLRenderer: Context Restored."),A=!1;const E=O.autoReset,X=Fe.enabled,J=Fe.autoUpdate,K=Fe.needsUpdate,Z=Fe.type;Oe(),O.autoReset=E,Fe.enabled=X,Fe.autoUpdate=J,Fe.needsUpdate=K,Fe.type=Z}function Et(E){ft("WebGLRenderer: A WebGL context could not be created. Reason: ",E.statusMessage)}function At(E){const X=E.target;X.removeEventListener("dispose",At),fn(X)}function fn(E){pi(E),V.remove(E)}function pi(E){const X=V.get(E).programs;X!==void 0&&(X.forEach(function(J){oe.releaseProgram(J)}),E.isShaderMaterial&&oe.releaseShaderCache(E))}this.renderBufferDirect=function(E,X,J,K,Z,Pe){X===null&&(X=pe);const Ne=Z.isMesh&&Z.matrixWorld.determinantAffine()<0,Ce=Ht(E,X,J,K,Z);_.setMaterial(K,Ne);let ke=J.index,Ge=1;if(K.wireframe===!0){if(ke=H.getWireframeAttribute(J),ke===void 0)return;Ge=2}const st=J.drawRange,lt=J.attributes.position;let Ve=st.start*Ge,xt=(st.start+st.count)*Ge;Pe!==null&&(Ve=Math.max(Ve,Pe.start*Ge),xt=Math.min(xt,(Pe.start+Pe.count)*Ge)),ke!==null?(Ve=Math.max(Ve,0),xt=Math.min(xt,ke.count)):lt!=null&&(Ve=Math.max(Ve,0),xt=Math.min(xt,lt.count));const Rt=xt-Ve;if(Rt<0||Rt===1/0)return;we.setup(Z,K,Ce,J,ke);let Tt,St=Se;if(ke!==null&&(Tt=Q.get(ke),St=ie,St.setIndex(Tt)),Z.isMesh)K.wireframe===!0?(_.setLineWidth(K.wireframeLinewidth*Ae()),St.setMode(U.LINES)):St.setMode(U.TRIANGLES);else if(Z.isLine){let Wt=K.linewidth;Wt===void 0&&(Wt=1),_.setLineWidth(Wt*Ae()),Z.isLineSegments?St.setMode(U.LINES):Z.isLineLoop?St.setMode(U.LINE_LOOP):St.setMode(U.LINE_STRIP)}else Z.isPoints?St.setMode(U.POINTS):Z.isSprite&&St.setMode(U.TRIANGLES);if(Z.isBatchedMesh)if(Le.get("WEBGL_multi_draw"))St.renderMultiDraw(Z._multiDrawStarts,Z._multiDrawCounts,Z._multiDrawCount);else{const Wt=Z._multiDrawStarts,Ue=Z._multiDrawCounts,nn=Z._multiDrawCount,pt=ke?Q.get(ke).bytesPerElement:1,ln=V.get(K).currentProgram.getUniforms();for(let Tn=0;Tn<nn;Tn++)ln.setValue(U,"_gl_DrawID",Tn),St.render(Wt[Tn]/pt,Ue[Tn])}else if(Z.isInstancedMesh)St.renderInstances(Ve,Rt,Z.count);else if(J.isInstancedBufferGeometry){const Wt=J._maxInstanceCount!==void 0?J._maxInstanceCount:1/0,Ue=Math.min(J.instanceCount,Wt);St.renderInstances(Ve,Rt,Ue)}else St.render(Ve,Rt)};function Di(E,X,J){E.transparent===!0&&E.side===$t&&E.forceSinglePass===!1?(E.side=jt,E.needsUpdate=!0,Ft(E,X,J),E.side=Wn,E.needsUpdate=!0,Ft(E,X,J),E.side=$t):Ft(E,X,J)}this.compile=function(E,X,J=null){J===null&&(J=E),b=Me.get(J),b.init(X),x.push(b),J.traverseVisible(function(Z){Z.isLight&&Z.layers.test(X.layers)&&(b.pushLight(Z),Z.castShadow&&b.pushShadow(Z))}),E!==J&&E.traverseVisible(function(Z){Z.isLight&&Z.layers.test(X.layers)&&(b.pushLight(Z),Z.castShadow&&b.pushShadow(Z))}),b.setupLights();const K=new Set;return E.traverse(function(Z){if(!(Z.isMesh||Z.isPoints||Z.isLine||Z.isSprite))return;const Pe=Z.material;if(Pe)if(Array.isArray(Pe))for(let Ne=0;Ne<Pe.length;Ne++){const Ce=Pe[Ne];Di(Ce,J,Z),K.add(Ce)}else Di(Pe,J,Z),K.add(Pe)}),b=x.pop(),K},this.compileAsync=function(E,X,J=null){const K=this.compile(E,X,J);return new Promise(Z=>{function Pe(){if(K.forEach(function(Ne){V.get(Ne).currentProgram.isReady()&&K.delete(Ne)}),K.size===0){Z(E);return}setTimeout(Pe,10)}Le.get("KHR_parallel_shader_compile")!==null?Pe():setTimeout(Pe,10)})};let I=null;function ee(E){I&&I(E)}function te(){he.stop()}function se(){he.start()}const he=new cu;he.setAnimationLoop(ee),typeof self<"u"&&he.setContext(self),this.setAnimationLoop=function(E){I=E,Ie.setAnimationLoop(E),E===null?he.stop():he.start()},Ie.addEventListener("sessionstart",te),Ie.addEventListener("sessionend",se),this.render=function(E,X){if(X!==void 0&&X.isCamera!==!0){ft("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(A===!0)return;L!==null&&L.renderStart(E,X);const J=Ie.enabled===!0&&Ie.isPresenting===!0,K=p!==null&&($===null||J)&&p.begin(y,$);if(E.matrixWorldAutoUpdate===!0&&E.updateMatrixWorld(),X.parent===null&&X.matrixWorldAutoUpdate===!0&&X.updateMatrixWorld(),Ie.enabled===!0&&Ie.isPresenting===!0&&(p===null||p.isCompositing()===!1)&&(Ie.cameraAutoUpdate===!0&&Ie.updateCamera(X),X=Ie.getCamera()),E.isScene===!0&&E.onBeforeRender(y,E,X,$),b=Me.get(E,x.length),b.init(X),b.state.textureUnits=q.getTextureUnits(),x.push(b),ye.multiplyMatrices(X.projectionMatrix,X.matrixWorldInverse),it.setFromProjectionMatrix(ye,Mn,X.reversedDepth),$e=this.localClippingEnabled,ct=De.init(this.clippingPlanes,$e),R=ge.get(E,v.length),R.init(),v.push(R),Ie.enabled===!0&&Ie.isPresenting===!0){const Ne=y.xr.getDepthSensingMesh();Ne!==null&&ne(Ne,X,-1/0,y.sortObjects)}ne(E,X,0,y.sortObjects),R.finish(),y.sortObjects===!0&&R.sort(We,Ye,X.reversedDepth),ae=Ie.enabled===!1||Ie.isPresenting===!1||Ie.hasDepthSensing()===!1,ae&&Xe.addToRenderList(R,E),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),ct===!0&&De.beginShadows();const Z=b.state.shadowsArray;if(Fe.render(Z,E,X),ct===!0&&De.endShadows(),(K&&p.hasRenderPass())===!1){const Ne=R.opaque,Ce=R.transmissive;if(b.setupLights(),X.isArrayCamera){const ke=X.cameras;if(Ce.length>0)for(let Ge=0,st=ke.length;Ge<st;Ge++){const lt=ke[Ge];rt(Ne,Ce,E,lt)}ae&&Xe.render(E);for(let Ge=0,st=ke.length;Ge<st;Ge++){const lt=ke[Ge];Te(R,E,lt,lt.viewport)}}else Ce.length>0&&rt(Ne,Ce,E,X),ae&&Xe.render(E),Te(R,E,X)}$!==null&&W===0&&(q.updateMultisampleRenderTarget($),q.updateRenderTargetMipmap($)),K&&p.end(y),E.isScene===!0&&E.onAfterRender(y,E,X),we.resetDefaultState(),re=-1,me=null,x.pop(),x.length>0?(b=x[x.length-1],q.setTextureUnits(b.state.textureUnits),ct===!0&&De.setGlobalState(y.clippingPlanes,b.state.camera)):b=null,v.pop(),v.length>0?R=v[v.length-1]:R=null,L!==null&&L.renderEnd()};function ne(E,X,J,K){if(E.visible===!1)return;if(E.layers.test(X.layers)){if(E.isGroup)J=E.renderOrder;else if(E.isLOD)E.autoUpdate===!0&&E.update(X);else if(E.isLightProbeGrid)b.pushLightProbeGrid(E);else if(E.isLight)b.pushLight(E),E.castShadow&&b.pushShadow(E);else if(E.isSprite){if(!E.frustumCulled||it.intersectsSprite(E)){K&&ce.setFromMatrixPosition(E.matrixWorld).applyMatrix4(ye);const Ne=Y.update(E),Ce=E.material;Ce.visible&&R.push(E,Ne,Ce,J,ce.z,null)}}else if((E.isMesh||E.isLine||E.isPoints)&&(!E.frustumCulled||it.intersectsObject(E))){const Ne=Y.update(E),Ce=E.material;if(K&&(E.boundingSphere!==void 0?(E.boundingSphere===null&&E.computeBoundingSphere(),ce.copy(E.boundingSphere.center)):(Ne.boundingSphere===null&&Ne.computeBoundingSphere(),ce.copy(Ne.boundingSphere.center)),ce.applyMatrix4(E.matrixWorld).applyMatrix4(ye)),Array.isArray(Ce)){const ke=Ne.groups;for(let Ge=0,st=ke.length;Ge<st;Ge++){const lt=ke[Ge],Ve=Ce[lt.materialIndex];Ve&&Ve.visible&&R.push(E,Ne,Ve,J,ce.z,lt)}}else Ce.visible&&R.push(E,Ne,Ce,J,ce.z,null)}}const Pe=E.children;for(let Ne=0,Ce=Pe.length;Ne<Ce;Ne++)ne(Pe[Ne],X,J,K)}function Te(E,X,J,K){const{opaque:Z,transmissive:Pe,transparent:Ne}=E;b.setupLightsView(J),ct===!0&&De.setGlobalState(y.clippingPlanes,J),K&&_.viewport(be.copy(K)),Z.length>0&&qe(Z,X,J),Pe.length>0&&qe(Pe,X,J),Ne.length>0&&qe(Ne,X,J),_.buffers.depth.setTest(!0),_.buffers.depth.setMask(!0),_.buffers.color.setMask(!0),_.setPolygonOffset(!1)}function rt(E,X,J,K){if((J.isScene===!0?J.overrideMaterial:null)!==null)return;if(b.state.transmissionRenderTarget[K.id]===void 0){const Ve=Le.has("EXT_color_buffer_half_float")||Le.has("EXT_color_buffer_float");b.state.transmissionRenderTarget[K.id]=new bn(1,1,{generateMipmaps:!0,type:Ve?Pn:en,minFilter:ai,samples:Math.max(4,C.samples),stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:ht.workingColorSpace})}const Pe=b.state.transmissionRenderTarget[K.id],Ne=K.viewport||be;Pe.setSize(Ne.z*y.transmissionResolutionScale,Ne.w*y.transmissionResolutionScale);const Ce=y.getRenderTarget(),ke=y.getActiveCubeFace(),Ge=y.getActiveMipmapLevel();y.setRenderTarget(Pe),y.getClearColor(Ze),de=y.getClearAlpha(),de<1&&y.setClearColor(16777215,.5),y.clear(),ae&&Xe.render(J);const st=y.toneMapping;y.toneMapping=Sn;const lt=K.viewport;if(K.viewport!==void 0&&(K.viewport=void 0),b.setupLightsView(K),ct===!0&&De.setGlobalState(y.clippingPlanes,K),qe(E,J,K),q.updateMultisampleRenderTarget(Pe),q.updateRenderTargetMipmap(Pe),Le.has("WEBGL_multisampled_render_to_texture")===!1){let Ve=!1;for(let xt=0,Rt=X.length;xt<Rt;xt++){const Tt=X[xt],{object:St,geometry:Wt,material:Ue,group:nn}=Tt;if(Ue.side===$t&&St.layers.test(K.layers)){const pt=Ue.side;Ue.side=jt,Ue.needsUpdate=!0,Lt(St,J,K,Wt,Ue,nn),Ue.side=pt,Ue.needsUpdate=!0,Ve=!0}}Ve===!0&&(q.updateMultisampleRenderTarget(Pe),q.updateRenderTargetMipmap(Pe))}y.setRenderTarget(Ce,ke,Ge),y.setClearColor(Ze,de),lt!==void 0&&(K.viewport=lt),y.toneMapping=st}function qe(E,X,J){const K=X.isScene===!0?X.overrideMaterial:null;for(let Z=0,Pe=E.length;Z<Pe;Z++){const Ne=E[Z],{object:Ce,geometry:ke,group:Ge}=Ne;let st=Ne.material;st.allowOverride===!0&&K!==null&&(st=K),Ce.layers.test(J.layers)&&Lt(Ce,X,J,ke,st,Ge)}}function Lt(E,X,J,K,Z,Pe){E.onBeforeRender(y,X,J,K,Z,Pe),E.modelViewMatrix.multiplyMatrices(J.matrixWorldInverse,E.matrixWorld),E.normalMatrix.getNormalMatrix(E.modelViewMatrix),Z.onBeforeRender(y,X,J,K,E,Pe),Z.transparent===!0&&Z.side===$t&&Z.forceSinglePass===!1?(Z.side=jt,Z.needsUpdate=!0,y.renderBufferDirect(J,X,K,Z,E,Pe),Z.side=Wn,Z.needsUpdate=!0,y.renderBufferDirect(J,X,K,Z,E,Pe),Z.side=$t):y.renderBufferDirect(J,X,K,Z,E,Pe),E.onAfterRender(y,X,J,K,Z,Pe)}function Ft(E,X,J){X.isScene!==!0&&(X=pe);const K=V.get(E),Z=b.state.lights,Pe=b.state.shadowsArray,Ne=Z.state.version,Ce=oe.getParameters(E,Z.state,Pe,X,J,b.state.lightProbeGridArray),ke=oe.getProgramCacheKey(Ce);let Ge=K.programs;K.environment=E.isMeshStandardMaterial||E.isMeshLambertMaterial||E.isMeshPhongMaterial?X.environment:null,K.fog=X.fog;const st=E.isMeshStandardMaterial||E.isMeshLambertMaterial&&!E.envMap||E.isMeshPhongMaterial&&!E.envMap;K.envMap=ue.get(E.envMap||K.environment,st),K.envMapRotation=K.environment!==null&&E.envMap===null?X.environmentRotation:E.envMapRotation,Ge===void 0&&(E.addEventListener("dispose",At),Ge=new Map,K.programs=Ge);let lt=Ge.get(ke);if(lt!==void 0){if(K.currentProgram===lt&&K.lightsStateVersion===Ne)return Jt(E,Ce),lt}else Ce.uniforms=oe.getUniforms(E),L!==null&&E.isNodeMaterial&&L.build(E,J,Ce),E.onBeforeCompile(Ce,y),lt=oe.acquireProgram(Ce,ke),Ge.set(ke,lt),K.uniforms=Ce.uniforms;const Ve=K.uniforms;return(!E.isShaderMaterial&&!E.isRawShaderMaterial||E.clipping===!0)&&(Ve.clippingPlanes=De.uniform),Jt(E,Ce),K.needsLights=Au(E),K.lightsStateVersion=Ne,K.needsLights&&(Ve.ambientLightColor.value=Z.state.ambient,Ve.lightProbe.value=Z.state.probe,Ve.directionalLights.value=Z.state.directional,Ve.directionalLightShadows.value=Z.state.directionalShadow,Ve.spotLights.value=Z.state.spot,Ve.spotLightShadows.value=Z.state.spotShadow,Ve.rectAreaLights.value=Z.state.rectArea,Ve.ltc_1.value=Z.state.rectAreaLTC1,Ve.ltc_2.value=Z.state.rectAreaLTC2,Ve.pointLights.value=Z.state.point,Ve.pointLightShadows.value=Z.state.pointShadow,Ve.hemisphereLights.value=Z.state.hemi,Ve.directionalShadowMatrix.value=Z.state.directionalShadowMatrix,Ve.spotLightMatrix.value=Z.state.spotLightMatrix,Ve.spotLightMap.value=Z.state.spotLightMap,Ve.pointShadowMatrix.value=Z.state.pointShadowMatrix),K.lightProbeGrid=b.state.lightProbeGridArray.length>0,K.currentProgram=lt,K.uniformsList=null,lt}function wt(E){if(E.uniformsList===null){const X=E.currentProgram.getUniforms();E.uniformsList=ds.seqWithValue(X.seq,E.uniforms)}return E.uniformsList}function Jt(E,X){const J=V.get(E);J.outputColorSpace=X.outputColorSpace,J.batching=X.batching,J.batchingColor=X.batchingColor,J.instancing=X.instancing,J.instancingColor=X.instancingColor,J.instancingMorph=X.instancingMorph,J.skinning=X.skinning,J.morphTargets=X.morphTargets,J.morphNormals=X.morphNormals,J.morphColors=X.morphColors,J.morphTargetsCount=X.morphTargetsCount,J.numClippingPlanes=X.numClippingPlanes,J.numIntersection=X.numClipIntersection,J.vertexAlphas=X.vertexAlphas,J.vertexTangents=X.vertexTangents,J.toneMapping=X.toneMapping}function Kn(E,X){if(E.length===0)return null;if(E.length===1)return E[0].texture!==null?E[0]:null;M.setFromMatrixPosition(X.matrixWorld);for(let J=0,K=E.length;J<K;J++){const Z=E[J];if(Z.texture!==null&&Z.boundingBox.containsPoint(M))return Z}return null}function Ht(E,X,J,K,Z){X.isScene!==!0&&(X=pe),q.resetTextureUnits();const Pe=X.fog,Ne=K.isMeshStandardMaterial||K.isMeshLambertMaterial||K.isMeshPhongMaterial?X.environment:null,Ce=$===null?y.outputColorSpace:$.isXRRenderTarget===!0?$.texture.colorSpace:ht.workingColorSpace,ke=K.isMeshStandardMaterial||K.isMeshLambertMaterial&&!K.envMap||K.isMeshPhongMaterial&&!K.envMap,Ge=ue.get(K.envMap||Ne,ke),st=K.vertexColors===!0&&!!J.attributes.color&&J.attributes.color.itemSize===4,lt=!!J.attributes.tangent&&(!!K.normalMap||K.anisotropy>0),Ve=!!J.morphAttributes.position,xt=!!J.morphAttributes.normal,Rt=!!J.morphAttributes.color;let Tt=Sn;K.toneMapped&&($===null||$.isXRRenderTarget===!0)&&(Tt=y.toneMapping);const St=J.morphAttributes.position||J.morphAttributes.normal||J.morphAttributes.color,Wt=St!==void 0?St.length:0,Ue=V.get(K),nn=b.state.lights;if(ct===!0&&($e===!0||E!==me)){const yt=E===me&&K.id===re;De.setState(K,E,yt)}let pt=!1;K.version===Ue.__version?(Ue.needsLights&&Ue.lightsStateVersion!==nn.state.version||Ue.outputColorSpace!==Ce||Z.isBatchedMesh&&Ue.batching===!1||!Z.isBatchedMesh&&Ue.batching===!0||Z.isBatchedMesh&&Ue.batchingColor===!0&&Z.colorTexture===null||Z.isBatchedMesh&&Ue.batchingColor===!1&&Z.colorTexture!==null||Z.isInstancedMesh&&Ue.instancing===!1||!Z.isInstancedMesh&&Ue.instancing===!0||Z.isSkinnedMesh&&Ue.skinning===!1||!Z.isSkinnedMesh&&Ue.skinning===!0||Z.isInstancedMesh&&Ue.instancingColor===!0&&Z.instanceColor===null||Z.isInstancedMesh&&Ue.instancingColor===!1&&Z.instanceColor!==null||Z.isInstancedMesh&&Ue.instancingMorph===!0&&Z.morphTexture===null||Z.isInstancedMesh&&Ue.instancingMorph===!1&&Z.morphTexture!==null||Ue.envMap!==Ge||K.fog===!0&&Ue.fog!==Pe||Ue.numClippingPlanes!==void 0&&(Ue.numClippingPlanes!==De.numPlanes||Ue.numIntersection!==De.numIntersection)||Ue.vertexAlphas!==st||Ue.vertexTangents!==lt||Ue.morphTargets!==Ve||Ue.morphNormals!==xt||Ue.morphColors!==Rt||Ue.toneMapping!==Tt||Ue.morphTargetsCount!==Wt||!!Ue.lightProbeGrid!=b.state.lightProbeGridArray.length>0)&&(pt=!0):(pt=!0,Ue.__version=K.version);let ln=Ue.currentProgram;pt===!0&&(ln=Ft(K,X,Z),L&&K.isNodeMaterial&&L.onUpdateProgram(K,ln,Ue));let Tn=!1,Zn=!1,Ii=!1;const bt=ln.getUniforms(),Ct=Ue.uniforms;if(_.useProgram(ln.program)&&(Tn=!0,Zn=!0,Ii=!0),K.id!==re&&(re=K.id,Zn=!0),Ue.needsLights){const yt=Kn(b.state.lightProbeGridArray,Z);Ue.lightProbeGrid!==yt&&(Ue.lightProbeGrid=yt,Zn=!0)}if(Tn||me!==E){_.buffers.depth.getReversed()&&E.reversedDepth!==!0&&(E._reversedDepth=!0,E.updateProjectionMatrix()),bt.setValue(U,"projectionMatrix",E.projectionMatrix),bt.setValue(U,"viewMatrix",E.matrixWorldInverse);const jn=bt.map.cameraPosition;jn!==void 0&&jn.setValue(U,j.setFromMatrixPosition(E.matrixWorld)),C.logarithmicDepthBuffer&&bt.setValue(U,"logDepthBufFC",2/(Math.log(E.far+1)/Math.LN2)),(K.isMeshPhongMaterial||K.isMeshToonMaterial||K.isMeshLambertMaterial||K.isMeshBasicMaterial||K.isMeshStandardMaterial||K.isShaderMaterial)&&bt.setValue(U,"isOrthographic",E.isOrthographicCamera===!0),me!==E&&(me=E,Zn=!0,Ii=!0)}if(Ue.needsLights&&(nn.state.directionalShadowMap.length>0&&bt.setValue(U,"directionalShadowMap",nn.state.directionalShadowMap,q),nn.state.spotShadowMap.length>0&&bt.setValue(U,"spotShadowMap",nn.state.spotShadowMap,q),nn.state.pointShadowMap.length>0&&bt.setValue(U,"pointShadowMap",nn.state.pointShadowMap,q)),Z.isSkinnedMesh){bt.setOptional(U,Z,"bindMatrix"),bt.setOptional(U,Z,"bindMatrixInverse");const yt=Z.skeleton;yt&&(yt.boneTexture===null&&yt.computeBoneTexture(),bt.setValue(U,"boneTexture",yt.boneTexture,q))}Z.isBatchedMesh&&(bt.setOptional(U,Z,"batchingTexture"),bt.setValue(U,"batchingTexture",Z._matricesTexture,q),bt.setOptional(U,Z,"batchingIdTexture"),bt.setValue(U,"batchingIdTexture",Z._indirectTexture,q),bt.setOptional(U,Z,"batchingColorTexture"),Z._colorsTexture!==null&&bt.setValue(U,"batchingColorTexture",Z._colorsTexture,q));const $n=J.morphAttributes;if(($n.position!==void 0||$n.normal!==void 0||$n.color!==void 0)&&F.update(Z,J,ln),(Zn||Ue.receiveShadow!==Z.receiveShadow)&&(Ue.receiveShadow=Z.receiveShadow,bt.setValue(U,"receiveShadow",Z.receiveShadow)),(K.isMeshStandardMaterial||K.isMeshLambertMaterial||K.isMeshPhongMaterial)&&K.envMap===null&&X.environment!==null&&(Ct.envMapIntensity.value=X.environmentIntensity),Ct.dfgLUT!==void 0&&(Ct.dfgLUT.value=Ng()),Zn){if(bt.setValue(U,"toneMappingExposure",y.toneMappingExposure),Ue.needsLights&&Ra(Ct,Ii),Pe&&K.fog===!0&&xe.refreshFogUniforms(Ct,Pe),xe.refreshMaterialUniforms(Ct,K,fe,ve,b.state.transmissionRenderTarget[E.id]),Ue.needsLights&&Ue.lightProbeGrid){const yt=Ue.lightProbeGrid;Ct.probesSH.value=yt.texture,Ct.probesMin.value.copy(yt.boundingBox.min),Ct.probesMax.value.copy(yt.boundingBox.max),Ct.probesResolution.value.copy(yt.resolution)}ds.upload(U,wt(Ue),Ct,q)}if(K.isShaderMaterial&&K.uniformsNeedUpdate===!0&&(ds.upload(U,wt(Ue),Ct,q),K.uniformsNeedUpdate=!1),K.isSpriteMaterial&&bt.setValue(U,"center",Z.center),bt.setValue(U,"modelViewMatrix",Z.modelViewMatrix),bt.setValue(U,"normalMatrix",Z.normalMatrix),bt.setValue(U,"modelMatrix",Z.matrixWorld),K.uniformsGroups!==void 0){const yt=K.uniformsGroups;for(let jn=0,Ui=yt.length;jn<Ui;jn++){const Jo=yt[jn];le.update(Jo,ln),le.bind(Jo,ln)}}return ln}function Ra(E,X){E.ambientLightColor.needsUpdate=X,E.lightProbe.needsUpdate=X,E.directionalLights.needsUpdate=X,E.directionalLightShadows.needsUpdate=X,E.pointLights.needsUpdate=X,E.pointLightShadows.needsUpdate=X,E.spotLights.needsUpdate=X,E.spotLightShadows.needsUpdate=X,E.rectAreaLights.needsUpdate=X,E.hemisphereLights.needsUpdate=X}function Au(E){return E.isMeshLambertMaterial||E.isMeshToonMaterial||E.isMeshPhongMaterial||E.isMeshStandardMaterial||E.isShadowMaterial||E.isShaderMaterial&&E.lights===!0}this.getActiveCubeFace=function(){return k},this.getActiveMipmapLevel=function(){return W},this.getRenderTarget=function(){return $},this.setRenderTargetTextures=function(E,X,J){const K=V.get(E);K.__autoAllocateDepthBuffer=E.resolveDepthBuffer===!1,K.__autoAllocateDepthBuffer===!1&&(K.__useRenderToTexture=!1),V.get(E.texture).__webglTexture=X,V.get(E.depthTexture).__webglTexture=K.__autoAllocateDepthBuffer?void 0:J,K.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(E,X){const J=V.get(E);J.__webglFramebuffer=X,J.__useDefaultFramebuffer=X===void 0},this.setRenderTarget=function(E,X=0,J=0){$=E,k=X,W=J;let K=null,Z=!1,Pe=!1;if(E){const Ce=V.get(E);if(Ce.__useDefaultFramebuffer!==void 0){_.bindFramebuffer(U.FRAMEBUFFER,Ce.__webglFramebuffer),be.copy(E.viewport),_e.copy(E.scissor),Be=E.scissorTest,_.viewport(be),_.scissor(_e),_.setScissorTest(Be),re=-1;return}else if(Ce.__webglFramebuffer===void 0)q.setupRenderTarget(E);else if(Ce.__hasExternalTextures)q.rebindTextures(E,V.get(E.texture).__webglTexture,V.get(E.depthTexture).__webglTexture);else if(E.depthBuffer){const st=E.depthTexture;if(Ce.__boundDepthTexture!==st){if(st!==null&&V.has(st)&&(E.width!==st.image.width||E.height!==st.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");q.setupDepthRenderbuffer(E)}}const ke=E.texture;(ke.isData3DTexture||ke.isDataArrayTexture||ke.isCompressedArrayTexture)&&(Pe=!0);const Ge=V.get(E).__webglFramebuffer;E.isWebGLCubeRenderTarget?(Array.isArray(Ge[X])?K=Ge[X][J]:K=Ge[X],Z=!0):E.samples>0&&q.useMultisampledRTT(E)===!1?K=V.get(E).__webglMultisampledFramebuffer:Array.isArray(Ge)?K=Ge[J]:K=Ge,be.copy(E.viewport),_e.copy(E.scissor),Be=E.scissorTest}else be.copy(ze).multiplyScalar(fe).floor(),_e.copy(nt).multiplyScalar(fe).floor(),Be=Qe;if(J!==0&&(K=B),_.bindFramebuffer(U.FRAMEBUFFER,K)&&_.drawBuffers(E,K),_.viewport(be),_.scissor(_e),_.setScissorTest(Be),Z){const Ce=V.get(E.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_CUBE_MAP_POSITIVE_X+X,Ce.__webglTexture,J)}else if(Pe){const Ce=X;for(let ke=0;ke<E.textures.length;ke++){const Ge=V.get(E.textures[ke]);U.framebufferTextureLayer(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0+ke,Ge.__webglTexture,J,Ce)}}else if(E!==null&&J!==0){const Ce=V.get(E.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,Ce.__webglTexture,J)}re=-1},this.readRenderTargetPixels=function(E,X,J,K,Z,Pe,Ne,Ce=0){if(!(E&&E.isWebGLRenderTarget)){ft("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let ke=V.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&Ne!==void 0&&(ke=ke[Ne]),ke){_.bindFramebuffer(U.FRAMEBUFFER,ke);try{const Ge=E.textures[Ce],st=Ge.format,lt=Ge.type;if(E.textures.length>1&&U.readBuffer(U.COLOR_ATTACHMENT0+Ce),!C.textureFormatReadable(st)){ft("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!C.textureTypeReadable(lt)){ft("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}X>=0&&X<=E.width-K&&J>=0&&J<=E.height-Z&&U.readPixels(X,J,K,Z,Ee.convert(st),Ee.convert(lt),Pe)}finally{const Ge=$!==null?V.get($).__webglFramebuffer:null;_.bindFramebuffer(U.FRAMEBUFFER,Ge)}}},this.readRenderTargetPixelsAsync=async function(E,X,J,K,Z,Pe,Ne,Ce=0){if(!(E&&E.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let ke=V.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&Ne!==void 0&&(ke=ke[Ne]),ke)if(X>=0&&X<=E.width-K&&J>=0&&J<=E.height-Z){_.bindFramebuffer(U.FRAMEBUFFER,ke);const Ge=E.textures[Ce],st=Ge.format,lt=Ge.type;if(E.textures.length>1&&U.readBuffer(U.COLOR_ATTACHMENT0+Ce),!C.textureFormatReadable(st))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!C.textureTypeReadable(lt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Ve=U.createBuffer();U.bindBuffer(U.PIXEL_PACK_BUFFER,Ve),U.bufferData(U.PIXEL_PACK_BUFFER,Pe.byteLength,U.STREAM_READ),U.readPixels(X,J,K,Z,Ee.convert(st),Ee.convert(lt),0);const xt=$!==null?V.get($).__webglFramebuffer:null;_.bindFramebuffer(U.FRAMEBUFFER,xt);const Rt=U.fenceSync(U.SYNC_GPU_COMMANDS_COMPLETE,0);return U.flush(),await ed(U,Rt,4),U.bindBuffer(U.PIXEL_PACK_BUFFER,Ve),U.getBufferSubData(U.PIXEL_PACK_BUFFER,0,Pe),U.deleteBuffer(Ve),U.deleteSync(Rt),Pe}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(E,X=null,J=0){const K=Math.pow(2,-J),Z=Math.floor(E.image.width*K),Pe=Math.floor(E.image.height*K),Ne=X!==null?X.x:0,Ce=X!==null?X.y:0;q.setTexture2D(E,0),U.copyTexSubImage2D(U.TEXTURE_2D,J,0,0,Ne,Ce,Z,Pe),_.unbindTexture()},this.copyTextureToTexture=function(E,X,J=null,K=null,Z=0,Pe=0){let Ne,Ce,ke,Ge,st,lt,Ve,xt,Rt;const Tt=E.isCompressedTexture?E.mipmaps[Pe]:E.image;if(J!==null)Ne=J.max.x-J.min.x,Ce=J.max.y-J.min.y,ke=J.isBox3?J.max.z-J.min.z:1,Ge=J.min.x,st=J.min.y,lt=J.isBox3?J.min.z:0;else{const Ct=Math.pow(2,-Z);Ne=Math.floor(Tt.width*Ct),Ce=Math.floor(Tt.height*Ct),E.isDataArrayTexture?ke=Tt.depth:E.isData3DTexture?ke=Math.floor(Tt.depth*Ct):ke=1,Ge=0,st=0,lt=0}K!==null?(Ve=K.x,xt=K.y,Rt=K.z):(Ve=0,xt=0,Rt=0);const St=Ee.convert(X.format),Wt=Ee.convert(X.type);let Ue;X.isData3DTexture?(q.setTexture3D(X,0),Ue=U.TEXTURE_3D):X.isDataArrayTexture||X.isCompressedArrayTexture?(q.setTexture2DArray(X,0),Ue=U.TEXTURE_2D_ARRAY):(q.setTexture2D(X,0),Ue=U.TEXTURE_2D),_.activeTexture(U.TEXTURE0),_.pixelStorei(U.UNPACK_FLIP_Y_WEBGL,X.flipY),_.pixelStorei(U.UNPACK_PREMULTIPLY_ALPHA_WEBGL,X.premultiplyAlpha),_.pixelStorei(U.UNPACK_ALIGNMENT,X.unpackAlignment);const nn=_.getParameter(U.UNPACK_ROW_LENGTH),pt=_.getParameter(U.UNPACK_IMAGE_HEIGHT),ln=_.getParameter(U.UNPACK_SKIP_PIXELS),Tn=_.getParameter(U.UNPACK_SKIP_ROWS),Zn=_.getParameter(U.UNPACK_SKIP_IMAGES);_.pixelStorei(U.UNPACK_ROW_LENGTH,Tt.width),_.pixelStorei(U.UNPACK_IMAGE_HEIGHT,Tt.height),_.pixelStorei(U.UNPACK_SKIP_PIXELS,Ge),_.pixelStorei(U.UNPACK_SKIP_ROWS,st),_.pixelStorei(U.UNPACK_SKIP_IMAGES,lt);const Ii=E.isDataArrayTexture||E.isData3DTexture,bt=X.isDataArrayTexture||X.isData3DTexture;if(E.isDepthTexture){const Ct=V.get(E),$n=V.get(X),yt=V.get(Ct.__renderTarget),jn=V.get($n.__renderTarget);_.bindFramebuffer(U.READ_FRAMEBUFFER,yt.__webglFramebuffer),_.bindFramebuffer(U.DRAW_FRAMEBUFFER,jn.__webglFramebuffer);for(let Ui=0;Ui<ke;Ui++)Ii&&(U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,V.get(E).__webglTexture,Z,lt+Ui),U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,V.get(X).__webglTexture,Pe,Rt+Ui)),U.blitFramebuffer(Ge,st,Ne,Ce,Ve,xt,Ne,Ce,U.DEPTH_BUFFER_BIT,U.NEAREST);_.bindFramebuffer(U.READ_FRAMEBUFFER,null),_.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else if(Z!==0||E.isRenderTargetTexture||V.has(E)){const Ct=V.get(E),$n=V.get(X);_.bindFramebuffer(U.READ_FRAMEBUFFER,D),_.bindFramebuffer(U.DRAW_FRAMEBUFFER,N);for(let yt=0;yt<ke;yt++)Ii?U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,Ct.__webglTexture,Z,lt+yt):U.framebufferTexture2D(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,Ct.__webglTexture,Z),bt?U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,$n.__webglTexture,Pe,Rt+yt):U.framebufferTexture2D(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,$n.__webglTexture,Pe),Z!==0?U.blitFramebuffer(Ge,st,Ne,Ce,Ve,xt,Ne,Ce,U.COLOR_BUFFER_BIT,U.NEAREST):bt?U.copyTexSubImage3D(Ue,Pe,Ve,xt,Rt+yt,Ge,st,Ne,Ce):U.copyTexSubImage2D(Ue,Pe,Ve,xt,Ge,st,Ne,Ce);_.bindFramebuffer(U.READ_FRAMEBUFFER,null),_.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else bt?E.isDataTexture||E.isData3DTexture?U.texSubImage3D(Ue,Pe,Ve,xt,Rt,Ne,Ce,ke,St,Wt,Tt.data):X.isCompressedArrayTexture?U.compressedTexSubImage3D(Ue,Pe,Ve,xt,Rt,Ne,Ce,ke,St,Tt.data):U.texSubImage3D(Ue,Pe,Ve,xt,Rt,Ne,Ce,ke,St,Wt,Tt):E.isDataTexture?U.texSubImage2D(U.TEXTURE_2D,Pe,Ve,xt,Ne,Ce,St,Wt,Tt.data):E.isCompressedTexture?U.compressedTexSubImage2D(U.TEXTURE_2D,Pe,Ve,xt,Tt.width,Tt.height,St,Tt.data):U.texSubImage2D(U.TEXTURE_2D,Pe,Ve,xt,Ne,Ce,St,Wt,Tt);_.pixelStorei(U.UNPACK_ROW_LENGTH,nn),_.pixelStorei(U.UNPACK_IMAGE_HEIGHT,pt),_.pixelStorei(U.UNPACK_SKIP_PIXELS,ln),_.pixelStorei(U.UNPACK_SKIP_ROWS,Tn),_.pixelStorei(U.UNPACK_SKIP_IMAGES,Zn),Pe===0&&X.generateMipmaps&&U.generateMipmap(Ue),_.unbindTexture()},this.initRenderTarget=function(E){V.get(E).__webglFramebuffer===void 0&&q.setupRenderTarget(E)},this.initTexture=function(E){E.isCubeTexture?q.setTextureCube(E,0):E.isData3DTexture?q.setTexture3D(E,0):E.isDataArrayTexture||E.isCompressedArrayTexture?q.setTexture2DArray(E,0):q.setTexture2D(E,0),_.unbindTexture()},this.resetState=function(){k=0,W=0,$=null,_.reset(),we.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Mn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=ht._getDrawingBufferColorSpace(e),t.unpackColorSpace=ht._getUnpackColorSpace()}}const so=Object.freeze(Object.defineProperty({__proto__:null,ACESFilmicToneMapping:la,AddEquation:si,AddOperation:Ic,AdditiveBlending:co,AgXToneMapping:Lo,AlphaFormat:ko,AlwaysCompare:Vc,AlwaysDepth:vs,AlwaysStencilFunc:fo,AmbientLight:ru,ArrayCamera:au,BackSide:jt,BasicDepthPacking:Nc,Box2:Mo,Box3:hi,BoxGeometry:fi,BufferAttribute:hn,BufferGeometry:on,ByteType:Uo,Camera:Ea,CanvasTexture:_o,CineonToneMapping:Co,ClampToEdgeWrapping:Rn,Color:Je,ColorManagement:ht,ConeGeometry:Yo,ConstantAlphaFactor:Pc,ConstantColorFactor:Rc,Controls:lu,CubeCamera:su,CubeDepthTexture:jc,CubeReflectionMapping:ui,CubeRefractionMapping:Ri,CubeTexture:Xo,CubeUVReflectionMapping:Dr,CullFaceBack:lo,CullFaceFront:fc,CullFaceNone:hc,CustomBlending:pc,CustomToneMapping:Po,CylinderGeometry:Ur,Data3DTexture:Yc,DataArrayTexture:Vo,DataTexture:$c,DepthFormat:Ln,DepthStencilFormat:oi,DepthTexture:Ci,DirectionalLight:xo,DoubleSide:$t,DstAlphaFactor:yc,DstColorFactor:Tc,EqualCompare:Bc,EqualDepth:Ss,EquirectangularReflectionMapping:os,EquirectangularRefractionMapping:ls,Euler:qn,EventDispatcher:Yn,ExternalTexture:qo,Float32BufferAttribute:Yt,FloatType:vn,Fog:va,FrontSide:Wn,Frustum:Ir,GLSL3:mo,GreaterCompare:zc,GreaterDepth:ys,GreaterEqualCompare:ga,GreaterEqualDepth:bs,Group:_n,HalfFloatType:Pn,HemisphereLight:iu,ImageUtils:Xc,IntType:ca,KeepStencilOp:vi,Layers:xa,LessCompare:kc,LessDepth:Ms,LessEqualCompare:ma,LessEqualDepth:wi,Light:ya,LinearFilter:Gt,LinearMipmapLinearFilter:ai,LinearMipmapNearestFilter:cs,LinearSRGBColorSpace:wr,LinearToneMapping:wo,LinearTransfer:Rr,MOUSE:ci,Material:ar,MathUtils:ra,Matrix2:Ko,Matrix3:je,Matrix4:_t,MaxEquation:xc,Mesh:tn,MeshBasicMaterial:er,MeshDepthMaterial:tu,MeshDistanceMaterial:nu,MeshStandardMaterial:ri,MinEquation:_c,MirroredRepeatWrapping:Ts,MixOperation:Dc,MultiplyBlending:ho,MultiplyOperation:Ao,NearestFilter:kt,NearestMipmapLinearFilter:mr,NearestMipmapNearestFilter:Uc,NeutralToneMapping:Do,NeverCompare:Oc,NeverDepth:xs,NoBlending:Cn,NoColorSpace:Bn,NoToneMapping:Sn,NormalBlending:yi,NotEqualCompare:Gc,NotEqualDepth:Es,Object3D:Bt,ObjectSpaceNormalMap:Fc,OneFactor:Mc,OneMinusConstantAlphaFactor:Lc,OneMinusConstantColorFactor:Cc,OneMinusDstAlphaFactor:Ec,OneMinusDstColorFactor:Ac,OneMinusSrcAlphaFactor:_s,OneMinusSrcColorFactor:bc,OrthographicCamera:Ta,PCFShadowMap:_r,PCFSoftShadowMap:To,PMREMGenerator:So,PerspectiveCamera:an,Plane:kn,PlaneGeometry:Pi,Quaternion:Xn,R11_EAC_Format:Is,RED_GREEN_RGTC2_Format:Ar,RED_RGTC1_Format:Qs,REVISION:oa,RG11_EAC_Format:Tr,RGBAFormat:dn,RGBAIntegerFormat:pa,RGBA_ASTC_10x10_Format:Ys,RGBA_ASTC_10x5_Format:Ws,RGBA_ASTC_10x6_Format:Xs,RGBA_ASTC_10x8_Format:qs,RGBA_ASTC_12x10_Format:Ks,RGBA_ASTC_12x12_Format:Zs,RGBA_ASTC_4x4_Format:Fs,RGBA_ASTC_5x4_Format:Os,RGBA_ASTC_5x5_Format:ks,RGBA_ASTC_6x5_Format:Bs,RGBA_ASTC_6x6_Format:zs,RGBA_ASTC_8x5_Format:Gs,RGBA_ASTC_8x6_Format:Vs,RGBA_ASTC_8x8_Format:Hs,RGBA_BPTC_Format:$s,RGBA_ETC2_EAC_Format:Ds,RGBA_PVRTC_2BPPV1_Format:Cs,RGBA_PVRTC_4BPPV1_Format:Rs,RGBA_S3TC_DXT1_Format:vr,RGBA_S3TC_DXT3_Format:Mr,RGBA_S3TC_DXT5_Format:Sr,RGBFormat:Bo,RGB_BPTC_SIGNED_Format:js,RGB_BPTC_UNSIGNED_Format:Js,RGB_ETC1_Format:Ps,RGB_ETC2_Format:Ls,RGB_PVRTC_2BPPV1_Format:ws,RGB_PVRTC_4BPPV1_Format:As,RGB_S3TC_DXT1_Format:xr,RGFormat:di,RGIntegerFormat:fa,RawShaderMaterial:eu,Ray:Sa,Raycaster:ou,RedFormat:zo,RedIntegerFormat:ha,ReinhardToneMapping:Ro,RenderTarget:qc,RepeatWrapping:Er,ReverseSubtractEquation:gc,SIGNED_R11_EAC_Format:Us,SIGNED_RED_GREEN_RGTC2_Format:ta,SIGNED_RED_RGTC1_Format:ea,SIGNED_RG11_EAC_Format:Ns,SRGBColorSpace:zt,SRGBTransfer:gt,Scene:Zc,ShaderChunk:ot,ShaderLib:xn,ShaderMaterial:En,ShortType:No,Source:_a,Sphere:Ma,SphereGeometry:ba,Spherical:sa,SrcAlphaFactor:gs,SrcAlphaSaturateFactor:wc,SrcColorFactor:Sc,StaticDrawUsage:po,SubtractEquation:mc,SubtractiveBlending:uo,TOUCH:bi,TangentSpaceNormalMap:na,Texture:Vt,Triangle:un,UVMapping:Io,Uint16BufferAttribute:Ho,Uint32BufferAttribute:Wo,UniformsLib:Re,UniformsUtils:Qc,UnsignedByteType:en,UnsignedInt101111Type:Oo,UnsignedInt248Type:nr,UnsignedInt5999Type:Fo,UnsignedIntType:yn,UnsignedShort4444Type:ua,UnsignedShort5551Type:da,UnsignedShortType:tr,VSMShadowMap:ji,Vector2:He,Vector3:G,Vector4:mt,WebGLCoordinateSystem:Mn,WebGLCubeRenderTarget:Zo,WebGLRenderTarget:bn,WebGLRenderer:_u,WebGLUtils:mu,WebGPUCoordinateSystem:ir,WebXRController:us,ZeroFactor:vc,createCanvasElement:Hc,error:ft,log:go,warn:Ke,warnOnce:Ei},Symbol.toStringTag,{value:"Module"})),vt=4.6;function Fg(n){const e=Ai.find(c=>c.id===n);if(!e)throw Error("Unknown robot");const[t,i,r]=e.desk,s=["security","backup"].includes(n)?[[-4.8,0,r],[-4.8,0,0]]:["growth","growth-stats","instagram-admin"].includes(n)?[[t,0,8.8],[4.8,0,8.8],[4.8,0,2],[8.4,0,2],[8.4,0,0]]:["payments","support"].includes(n)?[[4.8,0,r],[4.8,0,2],[8.4,0,2],[8.4,0,0]]:n==="qa"?[[8.4,0,r],[8.4,0,0]]:r>0?[[t+1.2,0,r],[t+1.2,0,0]]:[[t,0,0]],a=i===vt?[[t,vt,r],[t,vt,r<-3?-6.5:0],[-12,vt,r<-3?-6.5:.6],[-12,vt,0],[-13.6,vt,0],[-16.5,vt,.7],[-16.5,vt,0]]:[[t,0,r],...s,[-13.6,0,0],[-16.5,0,.7],[-16.5,0,0]];for(let c=i===vt?1:0;c<2;c++){const l=c*vt;a.push([-16.5,l+vt/2,-4.2],[-16.5,l+vt/2,-4.85],[-14.4,l+vt/2,-4.85],[-14.4,l+vt/2,-4.2],[-14.4,l+vt,0],[-14.4,l+vt,.7]),c===0&&a.push([-16.5,vt,.7],[-16.5,vt,0])}if(a.push([-13.6,2*vt,.7],[-12.5,2*vt,.6]),n==="health"||n==="release")a.push([-7.2,2*vt,.6],[-7.2,2*vt,3.4]),a.push(...n==="health"?[[-5.25,2*vt,3.4]]:[[-10.4,2*vt,3.4],[-10.4,2*vt,5.5]]);else{const c=Ai.filter(h=>!["health","release"].includes(h.id)),l=c.findIndex(h=>h.id===n),d=Math.round((-11.7+l*23.4/(c.length-1))*100)/100;a.push([d,2*vt,.6],[d,2*vt,0])}const o=a.slice(1).map((c,l)=>Math.hypot(...c.map((d,h)=>d-a[l][h])));return{points:a,lengths:o,length:o.reduce((c,l)=>c+l,0)}}function Og(n,e,t=1){let i=Math.max(0,Math.min(n.length,e)),r=0;for(;r<n.lengths.length-1&&i>n.lengths[r];)i-=n.lengths[r++];const s=n.points[r],a=n.points[r+1],o=i/n.lengths[r];return{position:e>=n.length?[...n.points.at(-1)]:s.map((c,l)=>c+(a[l]-c)*o),rotation:Math.atan2((a[0]-s[0])*t,(a[2]-s[2])*t)}}function kg(n){const e=Fg(n);let t=0,i=0,r=0,s=!1,a=!1,o=0,c=!1,l="waiting",d=0,h=!1;function u(S){const w=s&&S.lastAt>r;S.canRest&&S.lastAt&&(r=Math.max(r,S.lastAt)),c=S.canRest,c?w?(a=!0,o=4,i=0):a||(i=e.length):(i=0,a=!1,o=0),S.canRest&&(s=!0)}function m(S,{snap:w=!1,pause:g=!1}={}){h=g,w&&(a=!1,o=0,i=c?e.length:0,t=i);const f=i>=t?1:-1;!g&&!w&&(t+=f*Math.min(Math.abs(i-t),Math.max(0,Math.min(S,.25))*4),t===0&&a&&(o-=S,o<=0&&(a=!1,i=c?e.length:0)));const P=l;l=t!==i?i===0?"returning":"ascending":a?"reviewing":c?"resting":"waiting",w||l!=="resting"?d=0:P!=="resting"?d=6:g||(d=Math.max(0,d-S));const T=Og(e,t,f);return l==="resting"&&(T.rotation=n==="health"?Math.PI:Math.PI/2),t===0&&(T.rotation=Math.PI),{...T,phase:l,paused:h,enjoying:!g&&d>0,active:!g&&(t!==i||a||d>0),moving:!g&&t!==i,level:t===e.length?2:Math.min(2,Math.floor((T.position[1]+.01)/vt))}}return{update:u,step:m,route:e}}class Bg{constructor(){this.id=0,this.object=null,this.z=0,this.renderOrder=0}}class xu{constructor(){this.id=0,this.v1=new Ti,this.v2=new Ti,this.v3=new Ti,this.normalModel=new G,this.vertexNormalsModel=[new G,new G,new G],this.vertexNormalsLength=0,this.color=new Je,this.material=null,this.uvs=[new He,new He,new He],this.z=0,this.renderOrder=0}}class Ti{constructor(){this.position=new G,this.positionWorld=new G,this.positionScreen=new mt,this.visible=!0}copy(e){this.positionWorld.copy(e.positionWorld),this.positionScreen.copy(e.positionScreen)}}class vu{constructor(){this.id=0,this.v1=new Ti,this.v2=new Ti,this.vertexColors=[new Je,new Je],this.material=null,this.z=0,this.renderOrder=0}}class Mu{constructor(){this.id=0,this.object=null,this.x=0,this.y=0,this.z=0,this.rotation=0,this.scale=new He,this.material=null,this.renderOrder=0}}class zg{constructor(){let e,t,i=0,r,s,a=0,o,c,l=0,d,h,u=0,m,S,w=0,g,f=[],P=[];const T={objects:[],lights:[],elements:[]},M=new G,R=new mt,b=new hi(new G(-1,-1,-1),new G(1,1,1)),v=new hi,x=new Array(3),p=new _t,y=new _t,A=new _t,L=new Ir,B=[],D=[],N=[],k=[],W=[],$=[],re=new mt,me=new mt,be=new mt,_e=[],Be=[null,null,null],Ze=[{sign:1},{sign:-1}];function de(){const j=[],ce=[],pe=[];let ae=null;const Ae=new je;function U(H){ae=H,Ae.getNormalMatrix(ae.matrixWorld),j.length=0,ce.length=0,pe.length=0}function et(H){const Y=H.position,oe=H.positionWorld,xe=H.positionScreen;oe.copy(Y).applyMatrix4(g),xe.copy(oe).applyMatrix4(y);const ge=1/xe.w;xe.x*=ge,xe.y*=ge,xe.z*=ge,H.visible=xe.x>=-1&&xe.x<=1&&xe.y>=-1&&xe.y<=1&&xe.z>=-1&&xe.z<=1}function Le(H,Y,oe){r=ze(),r.position.set(H,Y,oe),et(r)}function C(H,Y,oe){j.push(H,Y,oe)}function _(H,Y,oe){ce.push(H,Y,oe)}function O(H,Y){pe.push(H,Y)}function V(H,Y,oe){return H.visible===!0||Y.visible===!0||oe.visible===!0?!0:(x[0]=H.positionScreen,x[1]=Y.positionScreen,x[2]=oe.positionScreen,b.intersectsBox(v.setFromPoints(x)))}function q(H,Y,oe){return(oe.positionScreen.x-H.positionScreen.x)*(Y.positionScreen.y-H.positionScreen.y)-(oe.positionScreen.y-H.positionScreen.y)*(Y.positionScreen.x-H.positionScreen.x)<0}function ue(H,Y){const oe=D[H],xe=D[Y];oe.positionScreen.copy(oe.position).applyMatrix4(A),xe.positionScreen.copy(xe.position).applyMatrix4(A),ye(oe.positionScreen,xe.positionScreen)===!0&&(oe.positionScreen.multiplyScalar(1/oe.positionScreen.w),xe.positionScreen.multiplyScalar(1/xe.positionScreen.w),d=Qe(),d.id=ae.id,d.v1.copy(oe),d.v2.copy(xe),d.z=Math.max(oe.positionScreen.z,xe.positionScreen.z),d.renderOrder=ae.renderOrder,d.material=ae.material,ae.material.vertexColors&&(d.vertexColors[0].fromArray(ce,H*3),d.vertexColors[1].fromArray(ce,Y*3)),T.elements.push(d))}function Q(H,Y,oe,xe){const ge=D[H],Me=D[Y],De=D[oe],Fe=ge.positionScreen.w,Xe=Me.positionScreen.w,F=De.positionScreen.w,Se=Fe*(ge.positionScreen.z+1),ie=Xe*(Me.positionScreen.z+1),Ee=F*(De.positionScreen.z+1),we=Fe*(1-ge.positionScreen.z),le=Xe*(1-Me.positionScreen.z),Oe=F*(1-De.positionScreen.z);if(Se<0&&ie<0&&Ee<0||we<0&&le<0&&Oe<0)return;if(Se>=0&&ie>=0&&Ee>=0&&we>=0&&le>=0&&Oe>=0){if(V(ge,Me,De)===!1)return;if(xe.side===$t||q(ge,Me,De)===!0){o=nt(),o.id=ae.id,o.v1.copy(ge),o.v2.copy(Me),o.v3.copy(De),o.z=(ge.positionScreen.z+Me.positionScreen.z+De.positionScreen.z)/3,o.renderOrder=ae.renderOrder,M.subVectors(De.position,Me.position),R.subVectors(ge.position,Me.position),M.cross(R),o.normalModel.copy(M),o.normalModel.applyMatrix3(Ae).normalize();for(let tt=0;tt<3;tt++){const at=o.vertexNormalsModel[tt];at.fromArray(j,arguments[tt]*3),at.applyMatrix3(Ae).normalize(),o.uvs[tt].fromArray(pe,arguments[tt]*2)}o.vertexNormalsLength=3,o.material=xe,xe.vertexColors&&o.color.fromArray(ce,H*3),T.elements.push(o)}return}re.set(ge.positionScreen.x*Fe,ge.positionScreen.y*Fe,ge.positionScreen.z*Fe,Fe),me.set(Me.positionScreen.x*Xe,Me.positionScreen.y*Xe,Me.positionScreen.z*Xe,Xe),be.set(De.positionScreen.x*F,De.positionScreen.y*F,De.positionScreen.z*F,F),Be[0]=re,Be[1]=me,Be[2]=be;const Ie=$e(Be);if(!(Ie<3)){for(let tt=0;tt<Ie;tt++){const at=f[tt];let Et=_e[tt];Et||(Et=new Ti,_e[tt]=Et);const At=1/at.w;Et.positionScreen.set(at.x*At,at.y*At,at.z*At,1),Et.positionWorld.copy(ge.positionWorld),Et.visible=!0}for(let tt=1;tt<Ie-1;tt++){const at=_e[0],Et=_e[tt],At=_e[tt+1];if(xe.side===$t||q(at,Et,At)===!0){o=nt(),o.id=ae.id,o.v1.copy(at),o.v2.copy(Et),o.v3.copy(At),o.z=(at.positionScreen.z+Et.positionScreen.z+At.positionScreen.z)/3,o.renderOrder=ae.renderOrder,M.subVectors(De.position,Me.position),R.subVectors(ge.position,Me.position),M.cross(R),o.normalModel.copy(M),o.normalModel.applyMatrix3(Ae).normalize();for(let fn=0;fn<3;fn++){const pi=o.vertexNormalsModel[fn];pi.fromArray(j,arguments[fn]*3),pi.applyMatrix3(Ae).normalize(),o.uvs[fn].fromArray(pe,arguments[fn]*2)}o.vertexNormalsLength=3,o.material=xe,xe.vertexColors&&o.color.fromArray(ce,H*3),T.elements.push(o)}}}}return{setObject:U,projectVertex:et,checkTriangleVisibility:V,checkBackfaceCulling:q,pushVertex:Le,pushNormal:C,pushColor:_,pushUv:O,pushLine:ue,pushTriangle:Q}}const z=new de;function ve(j){if(j.visible===!1)return;if(j.isLight)T.lights.push(j);else if(j.isMesh||j.isLine||j.isPoints){if(j.material.visible===!1||j.frustumCulled===!0&&L.intersectsObject(j)===!1)return;fe(j)}else if(j.isSprite){if(j.material.visible===!1||j.frustumCulled===!0&&L.intersectsSprite(j)===!1)return;fe(j)}const ce=j.children;for(let pe=0,ae=ce.length;pe<ae;pe++)ve(ce[pe])}function fe(j){e=Ye(),e.id=j.id,e.object=j,M.setFromMatrixPosition(j.matrixWorld),M.applyMatrix4(y),e.z=M.z,e.renderOrder=j.renderOrder,T.objects.push(e)}this.projectScene=function(j,ce,pe,ae){c=0,h=0,S=0,T.elements.length=0,j.matrixWorldAutoUpdate===!0&&j.updateMatrixWorld(),ce.parent===null&&ce.matrixWorldAutoUpdate===!0&&ce.updateMatrixWorld(),p.copy(ce.matrixWorldInverse),y.multiplyMatrices(ce.projectionMatrix,p),L.setFromProjectionMatrix(y),t=0,T.objects.length=0,T.lights.length=0,ve(j),pe===!0&&T.objects.sort(ct);const Ae=T.objects;for(let U=0,et=Ae.length;U<et;U++){const Le=Ae[U].object,C=Le.geometry;if(z.setObject(Le),g=Le.matrixWorld,s=0,Le.isMesh){let _=Le.material;const O=Array.isArray(_),V=C.attributes,q=C.groups;if(V.position===void 0)continue;const ue=V.position.array;for(let Q=0,H=ue.length;Q<H;Q+=3){let Y=ue[Q],oe=ue[Q+1],xe=ue[Q+2];const ge=C.morphAttributes.position;if(ge!==void 0){const Me=C.morphTargetsRelative,De=Le.morphTargetInfluences;for(let Fe=0,Xe=ge.length;Fe<Xe;Fe++){const F=De[Fe];if(F===0)continue;const Se=ge[Fe];Me?(Y+=Se.getX(Q/3)*F,oe+=Se.getY(Q/3)*F,xe+=Se.getZ(Q/3)*F):(Y+=(Se.getX(Q/3)-ue[Q])*F,oe+=(Se.getY(Q/3)-ue[Q+1])*F,xe+=(Se.getZ(Q/3)-ue[Q+2])*F)}}z.pushVertex(Y,oe,xe)}if(V.normal!==void 0){const Q=V.normal.array;for(let H=0,Y=Q.length;H<Y;H+=3)z.pushNormal(Q[H],Q[H+1],Q[H+2])}if(V.color!==void 0){const Q=V.color.array;for(let H=0,Y=Q.length;H<Y;H+=3)z.pushColor(Q[H],Q[H+1],Q[H+2])}if(V.uv!==void 0){const Q=V.uv.array;for(let H=0,Y=Q.length;H<Y;H+=2)z.pushUv(Q[H],Q[H+1])}if(C.index!==null){const Q=C.index.array;if(q.length>0)for(let H=0;H<q.length;H++){const Y=q[H];if(_=O===!0?Le.material[Y.materialIndex]:Le.material,_!==void 0)for(let oe=Y.start,xe=Y.start+Y.count;oe<xe;oe+=3)z.pushTriangle(Q[oe],Q[oe+1],Q[oe+2],_)}else for(let H=0,Y=Q.length;H<Y;H+=3)z.pushTriangle(Q[H],Q[H+1],Q[H+2],_)}else if(q.length>0)for(let Q=0;Q<q.length;Q++){const H=q[Q];if(_=O===!0?Le.material[H.materialIndex]:Le.material,_!==void 0)for(let Y=H.start,oe=H.start+H.count;Y<oe;Y+=3)z.pushTriangle(Y,Y+1,Y+2,_)}else for(let Q=0,H=ue.length/3;Q<H;Q+=3)z.pushTriangle(Q,Q+1,Q+2,_)}else if(Le.isLine){A.multiplyMatrices(y,g);const _=C.attributes;if(_.position!==void 0){const O=_.position.array;for(let V=0,q=O.length;V<q;V+=3)z.pushVertex(O[V],O[V+1],O[V+2]);if(_.color!==void 0){const V=_.color.array;for(let q=0,ue=V.length;q<ue;q+=3)z.pushColor(V[q],V[q+1],V[q+2])}if(C.index!==null){const V=C.index.array;for(let q=0,ue=V.length;q<ue;q+=2)z.pushLine(V[q],V[q+1])}else{const V=Le.isLineSegments?2:1;for(let q=0,ue=O.length/3-1;q<ue;q+=V)z.pushLine(q,q+1)}}}else if(Le.isPoints){A.multiplyMatrices(y,g);const _=C.attributes;if(_.position!==void 0){const O=_.position.array;for(let V=0,q=O.length;V<q;V+=3)R.set(O[V],O[V+1],O[V+2],1),R.applyMatrix4(A),We(R,Le,ce)}}else Le.isSprite&&(Le.modelViewMatrix.multiplyMatrices(ce.matrixWorldInverse,Le.matrixWorld),R.set(g.elements[12],g.elements[13],g.elements[14],1),R.applyMatrix4(y),We(R,Le,ce))}return ae===!0&&T.elements.sort(ct),T};function We(j,ce,pe){const ae=1/j.w;j.z*=ae,j.z>=-1&&j.z<=1&&(m=it(),m.id=ce.id,m.x=j.x*ae,m.y=j.y*ae,m.z=j.z,m.renderOrder=ce.renderOrder,m.object=ce,m.rotation=ce.rotation,m.scale.x=ce.scale.x*Math.abs(m.x-(j.x+pe.projectionMatrix.elements[0])/(j.w+pe.projectionMatrix.elements[12])),m.scale.y=ce.scale.y*Math.abs(m.y-(j.y+pe.projectionMatrix.elements[5])/(j.w+pe.projectionMatrix.elements[13])),m.material=ce.material,T.elements.push(m))}function Ye(){if(t===i){const j=new Bg;return B.push(j),i++,t++,j}return B[t++]}function ze(){if(s===a){const j=new Ti;return D.push(j),a++,s++,j}return D[s++]}function nt(){if(c===l){const j=new xu;return N.push(j),l++,c++,j}return N[c++]}function Qe(){if(h===u){const j=new vu;return k.push(j),u++,h++,j}return k[h++]}function it(){if(S===w){const j=new Mu;return W.push(j),w++,S++,j}return W[S++]}function ct(j,ce){return j.renderOrder!==ce.renderOrder?j.renderOrder-ce.renderOrder:j.z!==ce.z?ce.z-j.z:j.id!==ce.id?j.id-ce.id:0}function $e(j){f[0]=j[0],f[1]=j[1],f[2]=j[2];let ce=3,pe=0;for(let ae=0;ae<Ze.length;ae++){const Ae=Ze[ae];if(pe=0,ce===0)break;for(let et=0;et<ce;et++){const Le=f[et],C=f[(et+1)%ce],_=Ae.sign*Le.z+Le.w,O=Ae.sign*C.z+C.w,V=_>=0,q=O>=0;if(V&&q)P[pe++]=Le;else if(V&&!q){P[pe++]=Le;const ue=_/(_-O);let Q=$[pe];Q||(Q=new mt,$[pe]=Q),Q.lerpVectors(Le,C,ue),P[pe++]=Q}else if(!V&&q){const ue=_/(_-O);let Q=$[pe];Q||(Q=new mt,$[pe]=Q),Q.lerpVectors(Le,C,ue),P[pe++]=Q}}const U=f;f=P,P=U,ce=pe}return ce}function ye(j,ce){let pe=0,ae=1;const Ae=j.z+j.w,U=ce.z+ce.w,et=-j.z+j.w,Le=-ce.z+ce.w;return Ae>=0&&U>=0&&et>=0&&Le>=0?!0:Ae<0&&U<0||et<0&&Le<0?!1:(Ae<0?pe=Math.max(pe,Ae/(Ae-U)):U<0&&(ae=Math.min(ae,Ae/(Ae-U))),et<0?pe=Math.max(pe,et/(et-Le)):Le<0&&(ae=Math.min(ae,et/(et-Le))),ae<pe?!1:(j.lerp(ce,pe),ce.lerp(j,1-ae),!0))}}}class Gg{constructor(){let e,t,i,r,s,a,o,c,l,d,h,u=0,m=0,S=0,w=null,g=1,f,P;const T=this,M=new Mo,R=new Mo,b=new Je,v=new Je,x=new Je,p=new Je,y=new Je,A=new Je,L=new G,B=new G,D=new G,N=new je,k=new _t,W=new _t,$=[],re=[],me=[],be=new zg,_e=document.createElementNS("http://www.w3.org/2000/svg","svg");this.domElement=_e,this.autoClear=!0,this.sortObjects=!0,this.sortElements=!0,this.overdraw=.5,this.outputColorSpace=zt,this.info={render:{vertices:0,faces:0}},this.setQuality=function(ye){switch(ye){case"high":g=1;break;case"low":g=0;break}},this.setClearColor=function(ye){A.set(ye)},this.setPixelRatio=function(){},this.setSize=function(ye,j){r=ye,s=j,a=r/2,o=s/2,_e.setAttribute("viewBox",-a+" "+-o+" "+r+" "+s),_e.setAttribute("width",r),_e.setAttribute("height",s),M.min.set(-a,-o),M.max.set(a,o)},this.getSize=function(){return{width:r,height:s}},this.setPrecision=function(ye){w=ye};function Be(){for(u=0;_e.childNodes.length>0;)_e.removeChild(_e.childNodes[0])}function Ze(ye){return w!==null?ye.toFixed(w):ye}function de(ye,j){const ce=ye.data.renderOrder!==void 0?ye.data.renderOrder:0,pe=j.data.renderOrder!==void 0?j.data.renderOrder:0;if(ce!==pe)return ce-pe;{const ae=ye.data.z!==void 0?ye.data.z:0;return(j.data.z!==void 0?j.data.z:0)-ae}}this.clear=function(){Be(),_e.style.backgroundColor=A.getStyle(T.outputColorSpace)},this.render=function(ye,j){if(!(j instanceof Ea)){console.error("THREE.SVGRenderer.render: camera is not an instance of Camera.");return}const ce=ye.background;ce&&ce.isColor?(Be(),_e.style.backgroundColor=ce.getStyle(T.outputColorSpace)):this.autoClear===!0&&this.clear(),T.info.render.vertices=0,T.info.render.faces=0,k.copy(j.matrixWorldInverse),W.multiplyMatrices(j.projectionMatrix,k),e=be.projectScene(ye,j,this.sortObjects,this.sortElements),t=e.elements,i=e.lights,N.getNormalMatrix(j.matrixWorldInverse),z(i),S=0;for(let pe=0,ae=t.length;pe<ae;pe++){const Ae=t[pe],U=Ae.material;U===void 0||U.opacity===0||$e(S++,"element",Ae,U)}m=0,ye.traverseVisible(function(pe){if(pe.isSVGObject){if(L.setFromMatrixPosition(pe.matrixWorld),L.applyMatrix4(W),L.z<-1||L.z>1)return;const ae=L.x*a,Ae=-L.y*o,U=ct(m++);U.node=pe.node,U.x=ae,U.y=Ae,U.z=L.z,U.renderOrder=pe.renderOrder,$e(S++,"svgObject",U,null)}}),me.length=S,this.sortElements&&m>0&&me.sort(de),f="",P="";for(let pe=0;pe<S;pe++){const ae=me[pe];if(ae.type==="svgObject"){Qe();const Ae=ae.data,U=Ae.node;U.setAttribute("transform","translate("+Ae.x+","+Ae.y+")"),_e.appendChild(U)}else{const Ae=ae.data,U=ae.material;R.makeEmpty(),Ae instanceof Mu?(c=Ae,c.x*=a,c.y*=-o,fe(c,Ae,U)):Ae instanceof vu?(c=Ae.v1,l=Ae.v2,c.positionScreen.x*=a,c.positionScreen.y*=-o,l.positionScreen.x*=a,l.positionScreen.y*=-o,R.setFromPoints([c.positionScreen,l.positionScreen]),M.intersectsBox(R)===!0&&We(c,l,U)):Ae instanceof xu&&(c=Ae.v1,l=Ae.v2,d=Ae.v3,c.positionScreen.x*=a,c.positionScreen.y*=-o,l.positionScreen.x*=a,l.positionScreen.y*=-o,d.positionScreen.x*=a,d.positionScreen.y*=-o,this.overdraw>0&&(ze(c.positionScreen,l.positionScreen,this.overdraw),ze(l.positionScreen,d.positionScreen,this.overdraw),ze(d.positionScreen,c.positionScreen,this.overdraw)),R.setFromPoints([c.positionScreen,l.positionScreen,d.positionScreen]),M.intersectsBox(R)===!0&&Ye(c,l,d,Ae,U))}}Qe()};function z(ye){x.setRGB(0,0,0),p.setRGB(0,0,0),y.setRGB(0,0,0);for(let j=0,ce=ye.length;j<ce;j++){const pe=ye[j],ae=pe.color;pe.isAmbientLight?(x.r+=ae.r,x.g+=ae.g,x.b+=ae.b):pe.isDirectionalLight?(p.r+=ae.r,p.g+=ae.g,p.b+=ae.b):pe.isPointLight&&(y.r+=ae.r,y.g+=ae.g,y.b+=ae.b)}}function ve(ye,j,ce,pe){for(let ae=0,Ae=ye.length;ae<Ae;ae++){const U=ye[ae],et=U.color;if(U.isDirectionalLight){const Le=L.setFromMatrixPosition(U.matrixWorld).normalize();let C=ce.dot(Le);if(C<=0)continue;C*=U.intensity,pe.r+=et.r*C,pe.g+=et.g*C,pe.b+=et.b*C}else if(U.isPointLight){const Le=L.setFromMatrixPosition(U.matrixWorld);let C=ce.dot(L.subVectors(Le,j).normalize());if(C<=0||(C*=U.distance==0?1:1-Math.min(j.distanceTo(Le)/U.distance,1),C==0))continue;C*=U.intensity,pe.r+=et.r*C,pe.g+=et.g*C,pe.b+=et.b*C}}}function fe(ye,j,ce){let pe=j.scale.x*a,ae=j.scale.y*o;ce.isPointsMaterial&&(pe*=ce.size,ae*=ce.size);const Ae="M"+Ze(ye.x-pe*.5)+","+Ze(ye.y-ae*.5)+"h"+Ze(pe)+"v"+Ze(ae)+"h"+Ze(-pe)+"z";let U="";(ce.isSpriteMaterial||ce.isPointsMaterial)&&(U="fill:"+ce.color.getStyle(T.outputColorSpace)+";fill-opacity:"+ce.opacity),nt(U,Ae)}function We(ye,j,ce){const pe="M"+Ze(ye.positionScreen.x)+","+Ze(ye.positionScreen.y)+"L"+Ze(j.positionScreen.x)+","+Ze(j.positionScreen.y);if(ce.isLineBasicMaterial){let ae="fill:none;stroke:"+ce.color.getStyle(T.outputColorSpace)+";stroke-opacity:"+ce.opacity+";stroke-width:"+ce.linewidth+";stroke-linecap:"+ce.linecap;ce.isLineDashedMaterial&&(ae=ae+";stroke-dasharray:"+ce.dashSize+","+ce.gapSize),nt(ae,pe)}}function Ye(ye,j,ce,pe,ae){T.info.render.vertices+=3,T.info.render.faces++;const Ae="M"+Ze(ye.positionScreen.x)+","+Ze(ye.positionScreen.y)+"L"+Ze(j.positionScreen.x)+","+Ze(j.positionScreen.y)+"L"+Ze(ce.positionScreen.x)+","+Ze(ce.positionScreen.y)+"z";let U="";ae.isMeshBasicMaterial?(b.copy(ae.color),ae.vertexColors&&b.multiply(pe.color)):ae.isMeshLambertMaterial||ae.isMeshPhongMaterial||ae.isMeshStandardMaterial?(v.copy(ae.color),ae.vertexColors&&v.multiply(pe.color),b.copy(x),B.copy(ye.positionWorld).add(j.positionWorld).add(ce.positionWorld).divideScalar(3),ve(i,B,pe.normalModel,b),b.multiply(v).add(ae.emissive)):ae.isMeshNormalMaterial&&(D.copy(pe.normalModel).applyMatrix3(N).normalize(),b.setRGB(D.x,D.y,D.z).multiplyScalar(.5).addScalar(.5)),ae.wireframe?U="fill:none;stroke:"+b.getStyle(T.outputColorSpace)+";stroke-opacity:"+ae.opacity+";stroke-width:"+ae.wireframeLinewidth+";stroke-linecap:"+ae.wireframeLinecap+";stroke-linejoin:"+ae.wireframeLinejoin:U="fill:"+b.getStyle(T.outputColorSpace)+";fill-opacity:"+ae.opacity,nt(U,Ae)}function ze(ye,j,ce){let pe=j.x-ye.x,ae=j.y-ye.y;const Ae=pe*pe+ae*ae;if(Ae===0)return;const U=ce/Math.sqrt(Ae);pe*=U,ae*=U,j.x+=pe,j.y+=ae,ye.x-=pe,ye.y-=ae}function nt(ye,j){P===ye?f+=j:(Qe(),P=ye,f=j)}function Qe(){f&&(h=it(u++),h.setAttribute("d",f),h.setAttribute("style",P),_e.appendChild(h)),f="",P=""}function it(ye){let j=$[ye];return j===void 0&&(j=document.createElementNS("http://www.w3.org/2000/svg","path"),g==0&&j.setAttribute("shape-rendering","crispEdges"),$[ye]=j),j}function ct(ye){let j=re[ye];return j===void 0&&(j={node:null,x:0,y:0,z:0,renderOrder:0},re[ye]=j),j}function $e(ye,j,ce,pe){let ae=me[ye];return ae===void 0?(ae={type:j,data:ce,material:pe},me[ye]=ae,ae):(ae.type=j,ae.data=ce,ae.material=pe,ae)}}}const nc={type:"change"},$o={type:"start"},Su={type:"end"},ss=new Sa,ic=new kn,Vg=Math.cos(70*ra.DEG2RAD),It=new G,Qt=2*Math.PI,Mt={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},ao=1e-6;class Hg extends lu{constructor(e,t=null){super(e,t),this.state=Mt.NONE,this.target=new G,this.cursor=new G,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:ci.ROTATE,MIDDLE:ci.DOLLY,RIGHT:ci.PAN},this.touches={ONE:bi.ROTATE,TWO:bi.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new G,this._lastQuaternion=new Xn,this._lastTargetPosition=new G,this._quat=new Xn().setFromUnitVectors(e.up,new G(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new sa,this._sphericalDelta=new sa,this._scale=1,this._panOffset=new G,this._rotateStart=new He,this._rotateEnd=new He,this._rotateDelta=new He,this._panStart=new He,this._panEnd=new He,this._panDelta=new He,this._dollyStart=new He,this._dollyEnd=new He,this._dollyDelta=new He,this._dollyDirection=new G,this._mouse=new He,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=Xg.bind(this),this._onPointerDown=Wg.bind(this),this._onPointerUp=qg.bind(this),this._onContextMenu=Qg.bind(this),this._onMouseWheel=Zg.bind(this),this._onKeyDown=$g.bind(this),this._onTouchStart=jg.bind(this),this._onTouchMove=Jg.bind(this),this._onMouseDown=Yg.bind(this),this._onMouseMove=Kg.bind(this),this._interceptControlDown=e0.bind(this),this._interceptControlUp=t0.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(e){this._cursorStyle=e,e==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction=""}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(nc),this.update(),this.state=Mt.NONE}pan(e,t){this._pan(e,t),this.update()}dollyIn(e){this._dollyIn(e),this.update()}dollyOut(e){this._dollyOut(e),this.update()}rotateLeft(e){this._rotateLeft(e),this.update()}rotateUp(e){this._rotateUp(e),this.update()}update(e=null){const t=this.object.position;It.copy(t).sub(this.target),It.applyQuaternion(this._quat),this._spherical.setFromVector3(It),this.autoRotate&&this.state===Mt.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let i=this.minAzimuthAngle,r=this.maxAzimuthAngle;isFinite(i)&&isFinite(r)&&(i<-Math.PI?i+=Qt:i>Math.PI&&(i-=Qt),r<-Math.PI?r+=Qt:r>Math.PI&&(r-=Qt),i<=r?this._spherical.theta=Math.max(i,Math.min(r,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(i+r)/2?Math.max(i,this._spherical.theta):Math.min(r,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let s=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const a=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),s=a!=this._spherical.radius}if(It.setFromSpherical(this._spherical),It.applyQuaternion(this._quatInverse),t.copy(this.target).add(It),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let a=null;if(this.object.isPerspectiveCamera){const o=It.length();a=this._clampDistance(o*this._scale);const c=o-a;this.object.position.addScaledVector(this._dollyDirection,c),this.object.updateMatrixWorld(),s=!!c}else if(this.object.isOrthographicCamera){const o=new G(this._mouse.x,this._mouse.y,0);o.unproject(this.object);const c=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),s=c!==this.object.zoom;const l=new G(this._mouse.x,this._mouse.y,0);l.unproject(this.object),this.object.position.sub(l).add(o),this.object.updateMatrixWorld(),a=It.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;a!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(a).add(this.object.position):(ss.origin.copy(this.object.position),ss.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(ss.direction))<Vg?this.object.lookAt(this.target):(ic.setFromNormalAndCoplanarPoint(this.object.up,this.target),ss.intersectPlane(ic,this.target))))}else if(this.object.isOrthographicCamera){const a=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),a!==this.object.zoom&&(this.object.updateProjectionMatrix(),s=!0)}return this._scale=1,this._performCursorZoom=!1,s||this._lastPosition.distanceToSquared(this.object.position)>ao||8*(1-this._lastQuaternion.dot(this.object.quaternion))>ao||this._lastTargetPosition.distanceToSquared(this.target)>ao?(this.dispatchEvent(nc),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?Qt/60*this.autoRotateSpeed*e:Qt/60/60*this.autoRotateSpeed}_getZoomScale(e){const t=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){It.setFromMatrixColumn(t,0),It.multiplyScalar(-e),this._panOffset.add(It)}_panUp(e,t){this.screenSpacePanning===!0?It.setFromMatrixColumn(t,1):(It.setFromMatrixColumn(t,0),It.crossVectors(this.object.up,It)),It.multiplyScalar(e),this._panOffset.add(It)}_pan(e,t){const i=this.domElement;if(this.object.isPerspectiveCamera){const r=this.object.position;It.copy(r).sub(this.target);let s=It.length();s*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*s/i.clientHeight,this.object.matrix),this._panUp(2*t*s/i.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/i.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/i.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const i=this.domElement.getBoundingClientRect(),r=e-i.left,s=t-i.top,a=i.width,o=i.height;this._mouse.x=r/a*2-1,this._mouse.y=-(s/o)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(Qt*this._rotateDelta.x/t.clientHeight),this._rotateUp(Qt*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(Qt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-Qt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(Qt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-Qt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),r=.5*(e.pageY+t.y);this._rotateStart.set(i,r)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),r=.5*(e.pageY+t.y);this._panStart.set(i,r)}}_handleTouchStartDolly(e){const t=this._getSecondPointerPosition(e),i=e.pageX-t.x,r=e.pageY-t.y,s=Math.sqrt(i*i+r*r);this._dollyStart.set(0,s)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{const i=this._getSecondPointerPosition(e),r=.5*(e.pageX+i.x),s=.5*(e.pageY+i.y);this._rotateEnd.set(r,s)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(Qt*this._rotateDelta.x/t.clientHeight),this._rotateUp(Qt*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),r=.5*(e.pageY+t.y);this._panEnd.set(i,r)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){const t=this._getSecondPointerPosition(e),i=e.pageX-t.x,r=e.pageY-t.y,s=Math.sqrt(i*i+r*r);this._dollyEnd.set(0,s),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const a=(e.pageX+t.x)*.5,o=(e.pageY+t.y)*.5;this._updateZoomParameters(a,o)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new He,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){const t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){const t=e.deltaMode,i={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:i.deltaY*=16;break;case 2:i.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(i.deltaY*=10),i}}function Wg(n){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(n.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(n)&&(this._addPointer(n),n.pointerType==="touch"?this._onTouchStart(n):this._onMouseDown(n),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function Xg(n){this.enabled!==!1&&(n.pointerType==="touch"?this._onTouchMove(n):this._onMouseMove(n))}function qg(n){switch(this._removePointer(n),this._pointers.length){case 0:this.domElement.releasePointerCapture(n.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Su),this.state=Mt.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:const e=this._pointers[0],t=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:t.x,pageY:t.y});break}}function Yg(n){let e;switch(n.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case ci.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(n),this.state=Mt.DOLLY;break;case ci.ROTATE:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=Mt.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=Mt.ROTATE}break;case ci.PAN:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=Mt.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=Mt.PAN}break;default:this.state=Mt.NONE}this.state!==Mt.NONE&&this.dispatchEvent($o)}function Kg(n){switch(this.state){case Mt.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(n);break;case Mt.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(n);break;case Mt.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(n);break}}function Zg(n){this.enabled===!1||this.enableZoom===!1||this.state!==Mt.NONE||(n.preventDefault(),this.dispatchEvent($o),this._handleMouseWheel(this._customWheelEvent(n)),this.dispatchEvent(Su))}function $g(n){this.enabled!==!1&&this._handleKeyDown(n)}function jg(n){switch(this._trackPointer(n),this._pointers.length){case 1:switch(this.touches.ONE){case bi.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(n),this.state=Mt.TOUCH_ROTATE;break;case bi.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(n),this.state=Mt.TOUCH_PAN;break;default:this.state=Mt.NONE}break;case 2:switch(this.touches.TWO){case bi.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(n),this.state=Mt.TOUCH_DOLLY_PAN;break;case bi.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(n),this.state=Mt.TOUCH_DOLLY_ROTATE;break;default:this.state=Mt.NONE}break;default:this.state=Mt.NONE}this.state!==Mt.NONE&&this.dispatchEvent($o)}function Jg(n){switch(this._trackPointer(n),this.state){case Mt.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(n),this.update();break;case Mt.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(n),this.update();break;case Mt.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(n),this.update();break;case Mt.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(n),this.update();break;default:this.state=Mt.NONE}}function Qg(n){this.enabled!==!1&&n.preventDefault()}function e0(n){n.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function t0(n){n.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function n0(n,e=!1){const t=n[0].index!==null,i=new Set(Object.keys(n[0].attributes)),r=new Set(Object.keys(n[0].morphAttributes)),s={},a={},o=n[0].morphTargetsRelative,c=new on;let l=0;for(let d=0;d<n.length;++d){const h=n[d];let u=0;if(t!==(h.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+d+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const m in h.attributes){if(!i.has(m))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+d+'. All geometries must have compatible attributes; make sure "'+m+'" attribute exists among all geometries, or in none of them.'),null;s[m]===void 0&&(s[m]=[]),s[m].push(h.attributes[m]),u++}if(u!==i.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+d+". Make sure all geometries have the same number of attributes."),null;if(o!==h.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+d+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const m in h.morphAttributes){if(!r.has(m))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+d+".  .morphAttributes must be consistent throughout all geometries."),null;a[m]===void 0&&(a[m]=[]),a[m].push(h.morphAttributes[m])}if(e){let m;if(t)m=h.index.count;else if(h.attributes.position!==void 0)m=h.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+d+". The geometry must have either an index or a position attribute"),null;c.addGroup(l,m,d),l+=m}}if(t){let d=0;const h=[];for(let u=0;u<n.length;++u){const m=n[u].index;for(let S=0;S<m.count;++S)h.push(m.getX(S)+d);d+=n[u].attributes.position.count}c.setIndex(h)}for(const d in s){const h=rc(s[d]);if(!h)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+d+" attribute."),null;c.setAttribute(d,h)}for(const d in a){const h=a[d][0].length;if(h!==0){c.morphAttributes=c.morphAttributes||{},c.morphAttributes[d]=[];for(let u=0;u<h;++u){const m=[];for(let w=0;w<a[d].length;++w)m.push(a[d][w][u]);const S=rc(m);if(!S)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+d+" morphAttribute."),null;c.morphAttributes[d].push(S)}}}return c}function rc(n){let e,t,i,r=-1,s=0;for(let l=0;l<n.length;++l){const d=n[l];if(e===void 0&&(e=d.array.constructor),e!==d.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(t===void 0&&(t=d.itemSize),t!==d.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(i===void 0&&(i=d.normalized),i!==d.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(r===-1&&(r=d.gpuType),r!==d.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;s+=d.count*t}const a=new e(s),o=new hn(a,t,i);let c=0;for(let l=0;l<n.length;++l){const d=n[l];if(d.isInterleavedBufferAttribute){const h=c/t;for(let u=0,m=d.count;u<m;u++)for(let S=0;S<t;S++){const w=d.getComponent(u,S);o.setComponent(u+h,S,w)}}else a.set(d.array,c);c+=d.count*t}return r!==void 0&&(o.gpuType=r),o}function i0(n,{T:e,m:t,box:i,cyl:r,orb:s,group:a,sofa:o,plant:c,partition:l,windowWall:d,label:h,software:u}){const m=new e.MeshStandardMaterial({color:"#255f52",roughness:.95}),S=new e.MeshStandardMaterial({color:"#694954",roughness:.9}),w=new e.MeshStandardMaterial({color:"#2babb8",emissive:"#0e6875",emissiveIntensity:.22,roughness:.17,metalness:.18}),g=new e.MeshStandardMaterial({color:"#b3d5cc",roughness:.4}),f=new e.MeshStandardMaterial({color:"#92d6d3",emissive:"#3e989e",emissiveIntensity:.12,roughness:.2});function P(p,y,A,L=.035,B=t.brass){const D=new e.Vector3(...y),N=new e.Vector3(...A),k=r(p,0,0,0,L,D.distanceTo(N),B);return k.position.copy(D).add(N).multiplyScalar(.5),k.quaternion.setFromUnitVectors(new e.Vector3(0,1,0),N.sub(D).normalize()),k}i(n,-7.2,.08,-4.6,9.8,.06,7.3,S),i(n,-7.6,.21,-7.1,5.2,.33,1.9,t.darkWood),i(n,-7.6,.41,-6.18,5.2,.025,.035,t.warm),i(n,-7.7,2.05,-8.73,4.5,1.85,.16,t.frame),i(n,-7.7,2.05,-8.62,4.26,1.62,.035,t.screen);for(let p=0;p<12;p++)i(n,-9.35+p*.3,1.8,-8.59,.14,.2+(.5+.5*Math.sin(p*1.4))*.7,.015,p%3===0?t.warm:t.cyan);for(const p of[-11.2,-4.2]){i(n,p,1.15,-7.7,.78,2,.7,t.rubber);for(const y of[.65,1.45]){const A=r(n,p,y,-7.32,.24,.06,t.charcoal);A.rotation.x=Math.PI/2}r(n,p,2.26,-7.7,.16,.12,t.brass)}for(const p of[-8.8,-6.3]){r(n,p,.43,-6.8,.26,.06,t.frame),r(n,p,1.04,-6.8,.025,1.2,t.brass);const y=r(n,p,1.7,-6.8,.07,.3,t.rubber);y.rotation.z=-.3}o(n,-7.8,-2.35,Math.PI,4.3),o(n,-11,-4.2,Math.PI/2,2.5),r(n,-7.8,.43,-4.25,.93,.13,t.darkWood),r(n,-7.8,.22,-4.25,.24,.4,t.frame),i(n,-7.7,.52,-4.3,.48,.04,.3,t.brass),c(n,-3.2,-2.1,1.1),l(n,-1.5,-4.6,6.9,Math.PI/2),h(n,"KARAOKE / SOUND LOUNGE",-7.5,.14,-1.35,5.9,.3,"#e4d7bc",null,!0),i(n,6.1,.08,-4.7,11.8,.06,7.1,t.rubber),i(n,7,1.83,-8.75,9,2.3,.055,t.glass);function T(p,y){const A=a(n,p,0,y);i(A,0,.27,0,1.4,.28,2.55,t.charcoal),i(A,0,.43,.1,1.04,.045,2.15,t.rubber);for(const L of[-1,1])P(A,[L*.62,.35,-.92],[L*.62,1.65,-.92],.045,t.frame),P(A,[L*.62,1.4,-.95],[L*.62,1.4,.35],.04,t.brass);i(A,0,1.6,-.94,1.35,.32,.3,t.frame),i(A,0,1.78,-.9,.55,.035,.22,t.cyan);for(let L=0;L<6;L++)i(A,0,.46,-.75+L*.33,.98,.009,.015,t.edge)}T(2.6,-6),T(5,-6);for(const p of[.6,1.1]){i(n,10.1,p,-7.1,3.1,.08,.55,t.frame);for(let y=0;y<5;y++){const A=8.95+y*.56;P(n,[A-.14,p+.17,-7.08],[A+.14,p+.17,-7.08],.035,t.brass);for(const L of[-1,1]){const B=r(n,A+L*.2,p+.17,-7.08,.13,.12,t.rubber);B.rotation.z=Math.PI/2}}}for(const p of[8.7,11.5])i(n,p,.6,-7.1,.07,1.2,.7,t.frame);i(n,8.8,.6,-3.9,.65,.18,2.1,t.charcoal);for(const p of[-4.6,-3.2])i(n,8.8,.3,p,.5,.6,.1,t.frame);P(n,[7.8,1.4,-4.8],[9.8,1.4,-4.8],.045,t.brass);for(const p of[7.9,9.7]){const y=r(n,p,1.4,-4.8,.27,.15,t.rubber);y.rotation.z=Math.PI/2,i(n,p,.75,-4.8,.07,1.5,.07,t.frame)}const M=a(n,3.5,0,-2.7),R=r(M,0,.48,0,.42,.22,t.charcoal);R.rotation.z=Math.PI/2,P(M,[0,.15,.7],[0,1.05,.45],.06,t.frame),P(M,[0,.1,-.65],[0,1.35,-.45],.05,t.frame),i(M,0,1.05,.45,.55,.12,.38,t.rubber),i(M,0,1.4,-.45,.8,.08,.07,t.brass),i(M,0,.1,0,1.2,.08,1.7,t.frame);for(const p of[6.1,10.9])i(n,p,.14,-2.3,.85,.05,1.8,t.rug);h(n,"MOVE / RESET / REPEAT",6,.15,-1.4,7,.3,"#c7d7cd",null,!0),i(n,6,.08,4.7,11.8,.06,7.2,t.darkWood);const b=i(n,6.4,.24,4.15,8.2,.36,4.8,g),v=i(n,6.4,.43,4.15,7.65,.025,4.25,w);u&&(b.renderOrder=-12,v.renderOrder=-10);for(const p of[1.73,6.57])i(n,6.4,.49,p,8.65,.17,.38,t.cream);for(const p of[2.24,10.56])i(n,p,.49,4.15,.38,.17,4.8,t.cream);for(let p=0;p<13;p++){const y=2.23+p*.29;for(let A=0;A<3;A++){const L=i(n,3.3+A*2.15+Math.sin(p*.9)*.18,.451,y,.8+Math.sin(p+A)*.35,.005,.018,f);u&&(L.renderOrder=-9),L.rotation.y=Math.sin(p*.6+A)*.08}}for(const p of[3.55,4.45])P(n,[1.7,.09,p],[1.7,1.17,p],.045,t.brass),P(n,[1.7,1.17,p],[2.9,1.17,p],.045,t.brass),P(n,[2.9,1.17,p],[2.9,.25,p],.045,t.brass);for(const p of[.3,.55,.8])P(n,[2.85,p,3.55],[2.85,p,4.45],.04,t.brass);for(const p of[4.1,7,9.9]){i(n,p,.36,7.65,1.1,.24,1.4,t.cream);const y=i(n,p,.67,7.02,1.1,.15,.8,t.cream);y.rotation.x=-.55;for(const A of[7.2,8.2])i(n,p,.13,A,.9,.24,.07,t.frame)}c(n,1,7.8,1.4),c(n,11.9,7.8,1.4),d(n,12.94,4.5,8.6,Math.PI/2,1.05),d(n,0,9,25.5,0,1.05),i(n,-7.2,.08,4.7,9.8,.06,7.2,t.rug),i(n,-7.9,.92,5.5,3.8,.28,2.2,t.darkWood),i(n,-7.9,1.07,5.5,3.35,.035,1.75,m);for(const p of[-9.3,-6.5])for(const y of[4.8,6.2])i(n,p,.45,y,.22,.9,.22,t.frame);for(const p of[-9.55,-7.9,-6.25])for(const y of[4.65,6.35])r(n,p,1.095,y,.09,.025,t.rubber);for(let p=0;p<6;p++)s(n,-7.4+p%3*.15,1.17,5.35+Math.floor(p/3)*.16,.075,.075,.075,[t.paper,t.brass,S][p%3]);s(n,-8.7,1.17,5.5,.075,.075,.075,t.white),P(n,[-9.1,1.15,6.5],[-6.5,1.15,6.5],.025,t.wood);function x(p,y,A){const L=a(n,p,0,y);i(L,0,.7,0,1.1,1.4,.9,t.charcoal),i(L,0,1.65,-.2,1.1,.9,.55,t.frame),i(L,0,1.65,.1,.88,.64,.035,A),i(L,0,2.22,-.14,1.2,.26,.68,t.darkWood),i(L,0,2.22,.22,1,.16,.02,t.warm),i(L,0,1.25,.35,1.15,.12,.55,t.wood),r(L,-.28,1.38,.35,.035,.18,t.frame),s(L,-.28,1.48,.35,.07,.07,.07,S);for(const B of[.1,.3])r(L,B,1.33,.4,.065,.03,t.brass);for(let B=0;B<3;B++)i(L,-.2+B*.2,1.65,.13,.1,.18+Math.sin(B)*.15,.02,t.warm)}x(-5.25,2.25,t.cyan),x(-3.75,2.25,S),o(n,-10.4,2.3,Math.PI,2.5),i(n,-10.4,.68,1.23,2.5,.07,.6,t.darkWood),i(n,-10.4,1.35,1.18,2.15,1.2,.1,t.frame),i(n,-10.4,1.35,1.24,1.98,1.02,.025,t.cyan),i(n,-9.5,.9,1.22,.23,.4,.3,t.rubber),l(n,-1.5,4.65,6.9,Math.PI/2),c(n,-11.6,7.7,1.4),h(n,"03   /   PLAY CLUB",0,-.22,9.63,6,.29,"#e2cfaa"),h(n,"MINI GAME LOUNGE",-7.2,.15,8,6,.3,"#e4d7bc",null,!0)}const zn=4.6;function r0(n,{T:e,m:t,box:i,cyl:r,software:s},a){const l=zn/2,d=l/12,h=4.2;function u(S,w,g=.07,f=t.frame){const P=new e.Vector3(...S),T=new e.Vector3(...w),M=i(n,0,0,0,g,P.distanceTo(T),g,f);return M.position.copy(P).add(T).multiplyScalar(.5),M.quaternion.setFromUnitVectors(new e.Vector3(0,1,0),T.sub(P).normalize()),M}function m(S,w,g,f,P){const T=s?8:1;for(let M=0;M<T;M++){const R=M/T,b=(M+1)/T,v=e.MathUtils.lerp(w,f,R),x=e.MathUtils.lerp(w,f,b),p=e.MathUtils.lerp(g,P,R),y=e.MathUtils.lerp(g,P,b),A=new e.BufferGeometry;A.setAttribute("position",new e.Float32BufferAttribute([S,v,p,S,x,y,S,x+1.05,y,S,v,p,S,x+1.05,y,S,v+1.05,p],3)),A.computeVertexNormals();const L=new e.Mesh(A,t.stairGlass);n.add(L)}u([S,w+1.08,g],[S,f+1.08,P],.055,t.brass);for(let M=0;M<=4;M++){const R=M/4,b=e.MathUtils.lerp(w,f,R),v=e.MathUtils.lerp(g,P,R);u([S,b,v],[S,b+1.06,v],.035,t.frame)}}i(n,-15.275,-.11,.75,4.55,.3,1.6,t.charcoal),i(n,-15.275,.05,.75,4.55,.03,1.6,t.wood),i(n,-15.275,.025,1.58,4.55,.045,.06,t.brass),a===0&&(i(n,-15.275,-.3,-1.95,4.55,.6,7.1,t.charcoal),i(n,-15.275,.015,-1.95,4.55,.04,7.1,t.floor));for(const S of[-17.5,-13.12])for(const w of[-5.45,1.52]){const g=a<2?zn:1.2;i(n,S,g/2-.1,w,.13,g,.13,t.frame)}if(m(-17.55,.1,.05,.1,1.55),i(n,-15.275,.65,1.53,4.55,1.1,.035,t.stairGlass),i(n,-15.275,1.22,1.53,4.55,.055,.055,t.brass),a===2){i(n,-16.5,.65,-.04,1.9,1.1,.035,t.stairGlass),i(n,-16.5,1.22,-.04,1.9,.055,.055,t.brass);return}for(let S=0;S<2;S++){const w=S===0?-16.5:-14.4,g=S*l;for(let R=0;R<12;R++){const b=.05+g+(R+1)*d,v=S===0?-(R+.5)*h/12:-h+(R+.5)*h/12;i(n,w,b-.07,v,1.74,.14,h/12+.012,t.wood),i(n,w,b+.005,v+(S===0?.15:-.15),1.7,.012,.025,t.brass)}const f=S===0?0:-h,P=S===0?-h:0,T=.05+g,M=.05+g+l;for(const R of[-1,1])u([w+R*.62,T-.13,f],[w+R*.62,M-.13,P],.13,t.frame),m(w+R*.91,T+.06,f,M+.06,P)}i(n,-15.275,l-.055,-4.85,4.55,.21,1.3,t.charcoal),i(n,-15.275,l+.06,-4.85,4.55,.03,1.3,t.wood),i(n,-15.275,l+.65,-5.5,4.55,1.1,.035,t.stairGlass),i(n,-15.275,l+1.22,-5.5,4.55,.055,.055,t.brass);for(const S of[-17.55,-13.15])m(S,l+.1,-4.2,l+.1,-5.5);i(n,-15.275,zn-.11,.75,4.55,.3,1.6,t.charcoal),i(n,-15.275,zn+.05,.75,4.55,.03,1.6,t.wood)}function s0({T:n,software:e,compact:t}){const i=new n.Group;i.name="KIP coastal grounds";const r=(p,y=.88)=>new n.MeshStandardMaterial({color:p,roughness:y}),s={lawn:r("#748d61"),lawnLight:r("#8d9d70"),soil:r("#78654b"),sand:r("#eee7d1"),wetSand:r("#d9d1b1"),sea:r("#478d9e",.3),shallows:r("#77bdbb",.3),surf:r("#d5e8db"),road:r("#4c5554"),roadMark:r("#d6d3ba"),paving:r("#b5b4a0"),stone:r("#8a8b79"),dark:r("#283b34"),wood:r("#936e4c"),pine:r("#365c48"),pineLight:r("#4f7355"),leaf:r("#4a6845"),rose:r("#aa465a"),rosePink:r("#d58a8b"),roseCream:r("#e9c9b0"),mountainFar:r("#7f9b9d"),mountain:r("#6a8274"),mountainNear:r("#607459"),cream:r("#d9c9a8"),brass:r("#ae9060",.45),lamp:new n.MeshStandardMaterial({color:"#f5d6a0",emissive:"#ffd38b",emissiveIntensity:.6})},a={box:new n.BoxGeometry(1,1,1),cyl:new n.CylinderGeometry(1,1,1,10),cone:new n.ConeGeometry(1,1,9),orb:new n.SphereGeometry(1,6,4)};function o(p,y,A,L,B,D,N,k){const W=new n.Mesh(p,y);return W.position.set(A,L,B),W.scale.set(D,N,k),W.castShadow=!0,W.receiveShadow=!0,i.add(W),W}const c=(p,y,A,L,B,D,N=s.wood)=>o(a.box,N,p,y,A,L,B,D),l=(p,y,A,L,B,D=s.dark)=>o(a.cyl,D,p,y,A,L,B,L),d=(p,y,A,L,B,D,N)=>o(a.orb,N,p,y,A,L,B,D);function h(p,y,A,L,B,D,N){let k;return L>40||B>40?(k=new n.Mesh(new n.PlaneGeometry(L,B),D),k.rotation.x=-Math.PI/2,k.position.set(p,y,A),k.receiveShadow=!0,i.add(k)):k=c(p,y,A,L,.025,B,D),e&&(k.renderOrder=N),k.castShadow=!1,k}function u(p,y,A,L,B){const D=[],N=[];for(let $=0;$<p.length-1;$++){const re=p[$],me=p[$+1],be=y[$+1],_e=y[$];for(const Be of[re,me,be,re,be,_e])D.push(Be[0],A,Be[1]),N.push(Be[0]*.05,Be[1]*.05)}const k=new n.BufferGeometry;k.setAttribute("position",new n.Float32BufferAttribute(D,3)),k.setAttribute("uv",new n.Float32BufferAttribute(N,2)),k.setIndex(Array.from({length:k.attributes.position.count},($,re)=>re)),k.computeVertexNormals();const W=new n.Mesh(k,L);return W.receiveShadow=!0,e&&(W.renderOrder=B),i.add(W),W}function m(p,y,A,L,B,D,N,k=s.dark){const W=new n.Vector3(p,y,A),$=new n.Vector3(L,B,D),re=c(0,0,0,N,W.distanceTo($),N,k);return re.position.copy(W).add($).multiplyScalar(.5),re.quaternion.setFromUnitVectors(new n.Vector3(0,1,0),$.sub(W).normalize()),re}h(-112,-.73,80,270,290,s.lawn,-900),h(150,-.82,-5,260,420,s.sea,-920);const S=[],w=[],g=[],f=[],P=[];for(let p=-65;p<=210;p+=6.5){const y=34+Math.sin(p*.055)*3.2+Math.sin(p*.16)*.7;S.push([y,p]),w.push([y-1.8,p]),g.push([y+.7,p]),f.push([23+Math.sin(p*.05)*1.2,p]),P.push([y+10,p])}u(f,w,-.69,s.sand,-880),u(w,S,-.7,s.wetSand,-879),u(S,P,-.78,s.shallows,-910),u(S,g,-.72,s.surf,-878);for(let p=0;p<24;p++){const y=-34+p*3.5,A=42+Math.sin(y*.1)*2;h(A,-.735,y,.055,1.8,s.surf,-877)}for(let p=0;p<20;p++)h(49+p%5*5,-.75,-22+Math.floor(p/5)*12+p%3*2,.045,1.2+p%4,s.shallows,-876);h(-78,-.66,26,200,7,s.road,-860),h(-78,-.65,21.85,200,1.3,s.paving,-855),h(-78,-.65,30.15,200,1.3,s.paving,-855);for(let p=-173;p<=20;p+=5)h(p,-.635,26,2.4,.12,s.roadMark,-850);for(const p of[22.8,29.2])h(-78,-.635,p,200,.1,s.roadMark,-850);for(let p=0;p<7;p++)h(1.5,-.63,23.2+p*.85,3.6,.4,s.roadMark,-849);h(-2,-.62,14.8,8,14,s.paving,-845),h(-1.7,-.63,0,38,24,s.paving,-845);for(let p=-19;p<=16;p+=2)h(p,-.605,12.05,.025,3.2,s.stone,-840);h(-19.4,-.6,7.9,2,13,s.paving,-842),h(-10,-.6,13.6,20,2,s.paving,-842),c(-15.3,-.34,2.2,4.4,.3,.7,s.stone),c(-15.3,-.08,1.75,4.4,.22,.4,s.wood);function T(p,y,A,L){const B=Math.hypot(A-p,L-y),D=Math.ceil(B/3),N=Math.ceil(B/.45);m(p,-.08,y,A,-.08,L,.2,s.stone);for(const k of[.1,.85])m(p,k,y,A,k,L,.07,s.dark);for(let k=0;k<=N;k++){const W=k/N;c(p+(A-p)*W,.37,y+(L-y)*W,.055,1.12,.055,s.dark)}for(let k=0;k<=D;k++){const W=k/D,$=p+(A-p)*W,re=y+(L-y)*W;c($,.25,re,.25,1.7,.25,s.stone),c($,1.13,re,.31,.07,.31,s.brass)}}T(-25,19,-6,19),T(3,19,23,19),T(-25,-18,-25,19),T(-25,-18,23,-18),T(23,-18,23,3.4),T(23,7.6,23,19);for(const p of[-6,3])c(p,.65,19,.65,2.6,.65,s.dark),c(p,1.98,19,.72,.08,.72,s.brass);T(-5.8,19,-5.8,16.1),T(2.8,19,2.8,16.1),c(9.5,.7,19,7,.95,.2,s.dark),c(9.5,.75,19.13,6.5,.025,.02,s.brass);function M(p,y,A=5){l(p,A*.28-.65,y,.16,A*.6,s.wood);for(let L=0;L<3;L++){const B=A*(.56-L*.08),D=A*(.28-L*.055),N=A*(.39+L*.21)-.6;o(a.cone,L%2?s.pineLight:s.pine,p,N,y,D,B,D)}}for(const[p,y,A]of[[-22,-13,6],[-22,-5,5.4],[-22,3,5],[-22,11,5.8],[-15,-15,5.8],[-6,-15,6.5],[4,-15,5.8],[14,-15,6.3],[20,-11,5.6],[20,-3,4.8],[20,11,5.2],[-31,12,6.5],[-34,3,6],[-30,-10,7],[-34,-22,7],[-23,-25,6],[-12,-24,7.4],[1,-25,6.2],[16,-25,7.5],[27,-27,5.5]])M(p,y,A);function R(p,y,A,L,B){c(p,-.4,y,A,.5,L,s.stone),h(p,-.135,y,A-.2,L-.2,s.soil,-830);for(let D=0;D<B;D++){const N=p-A*.35+D%3*A*.35,k=y+(Math.floor(D/3)%2-.5)*L*.36;d(N,.03,k,.56,.3,.4,s.leaf);for(let W=0;W<3;W++){const $=N+Math.cos(W*2.1)*.29,re=k+Math.sin(W*2.1)*.24,me=.52+W%2*.15;l($,me/2,re,.018,me,s.leaf);const be=[s.rose,s.rosePink,s.roseCream][D%3];for(let _e=0;_e<5;_e++){const Be=_e*Math.PI*2/5;d($+Math.cos(Be)*.09,me,re+Math.sin(Be)*.09,.12,.075,.12,be)}d($,me+.04,re,.07,.07,.07,s.rose)}}}for(const p of[-14,-8,8,15])R(p,16,4.3,1.65,6);R(-22,15.8,2,3,3),R(20,16,2,3,3);function b(p,y,A=0){const L=new n.Group;i.add(L);const B=[];for(let D=0;D<4;D++)B.push(c(p,.03,y-.24+D*.16,2.7,.08,.12,s.wood));for(let D=0;D<3;D++)B.push(c(p,.43+D*.15,y-.34,2.7,.1,.08,s.wood));for(const D of[-1,1])B.push(c(p+D*1.06,-.27,y,.09,.6,.62,s.dark)),B.push(c(p+D*1.06,.3,y-.34,.06,1.05,.06,s.dark));for(const D of B)L.attach(D);L.position.set(p,0,y);for(const D of B)D.position.sub(L.position);L.rotation.y=A}b(-12,12.6,Math.PI),b(10,13,Math.PI),b(20,-.5,Math.PI/2);for(const[p,y]of[[-6.5,15],[4.1,15],[-24,7],[21,-8],[21,12],[-18,22],[13,22]])l(p,.95,y,.055,3.2,s.dark),c(p,2.57,y,.48,.13,.48,s.dark),c(p,2.47,y,.34,.12,.34,s.lamp);for(const p of[-4,0,4,8])l(p,-.1,11.3,.085,1,s.dark),l(p,.37,11.3,.1,.09,s.lamp);for(const p of[-20.5,-19.6])m(p,-.6,15,p,.2,15,.05,s.dark),m(p,.2,15,p,.2,16.5,.05,s.dark),m(p,.2,16.5,p,-.6,16.5,.05,s.dark);for(let p=16.5;p<=38;p+=.45)c(p,-.49,5.5,.39,.12,3.2,s.wood);c(37,-.58,5.5,5,.18,5,s.wood);for(const p of[3.4,7.6])for(const y of[35,38.8])l(y,-.43,p,.06,1.9,s.dark);for(const[p,y]of[[29,13],[30,-7]]){l(p,.65,y,.065,2.7,s.wood),o(a.cone,s.cream,p,2.15,y,2.4,.65,2.4);for(const A of[p-1.3,p+1.3]){c(A,-.27,y+.5,.85,.24,1.8,s.cream);const L=c(A,.05,y-.4,.85,.15,.8,s.cream);L.rotation.x=-.6}}for(const[p,y]of[[26,17],[25,-4],[28,-18],[30,23],[27,8],[31,-12]])for(let A=0;A<4;A++){const L=o(a.cone,s.lawnLight,p+A%2*.25,-.25,y+Math.floor(A/2)*.22,.12,.85,.12);L.rotation.z=(A-1.5)*.12}function v(p,y,A,L,B,D,N){const k=[],W=[],re=[p+A*.1*Math.sin(N),B-.7,y-L*.12],me=[],be=[];for(let de=0;de<13;de++){const z=de*Math.PI*2/13,ve=.86+.12*Math.sin(de*2.7+N);me.push([p+Math.cos(z)*A*ve,-.73,y+Math.sin(z)*L*ve]);const fe=.38+.13*Math.sin(de*1.8+N);be.push([p+Math.cos(z)*A*fe,B*(.32+.22*(.5+.5*Math.sin(de*2.3+N)))-.7,y+Math.sin(z)*L*fe])}const _e=(de,z,ve)=>{for(const fe of[de,z,ve])k.push(...fe),W.push(fe[0]*.025,fe[2]*.025)};for(let de=0;de<13;de++){const z=(de+1)%13;_e(me[de],be[de],be[z]),_e(me[de],be[z],me[z]),_e(be[de],re,be[z])}const Be=new n.BufferGeometry;Be.setAttribute("position",new n.Float32BufferAttribute(k,3)),Be.setAttribute("uv",new n.Float32BufferAttribute(W,2)),Be.setIndex(Array.from({length:Be.attributes.position.count},(de,z)=>z)),Be.computeVertexNormals();const Ze=new n.Mesh(Be,D);Ze.castShadow=!1,Ze.receiveShadow=!0,i.add(Ze)}for(const[p,y]of[-59,-34,-8,18].entries())v(y,-53-p%2*8,22,19,[17,25,23,16][p],s.mountainFar,p+2);for(const[p,y]of[-49,-22,5].entries())v(y,-36-p%2*4,18,13,[12,16,11][p],p%2?s.mountainNear:s.mountain,p+7);const x=Object.fromEntries(Object.entries(s).map(([p,y])=>[p,y.color.clone()]));return t(i),{root:i,setNight(p){const y={lawn:"#354f3c",lawnLight:"#526549",sand:"#a3aea0",wetSand:"#839385",road:"#293c40",paving:"#738178",stone:"#637569",pine:"#24493a",pineLight:"#345848",mountainFar:"#405d6b",mountain:"#3d5a53",mountainNear:"#314b43",sea:"#254c61",shallows:"#3d7178",surf:"#8cadb0"};for(const[A,L]of Object.entries(y))p?s[A].color.set(L):s[A].color.copy(x[A]);s.lamp.emissiveIntensity=p?2.4:.6}}}function a0(n,{onPick:e,onAgentPick:t,onAgentMove:i,onError:r}){let s,a=!1;try{s=new _u({antialias:!0,alpha:!1,powerPreference:"low-power"})}catch{a=!0,s=new Gg,s.setPrecision(1),s.setQuality("high"),s.setPixelRatio=()=>{},s.shadowMap={},s.capabilities={getMaxAnisotropy:()=>1},s.dispose=()=>{}}s.setPixelRatio(Math.min(devicePixelRatio,1.5)),s.outputColorSpace=zt,s.toneMapping=la,s.toneMappingExposure=1.13,s.shadowMap.enabled=!0,s.shadowMap.type=To,s.shadowMap.autoUpdate=!1,n.appendChild(s.domElement);const o=new Zc;o.background=new Je("#d8d9cd"),o.fog=new va("#d8d9cd",70,130);const c=new an(33,1,.1,700),l=new Hg(c,s.domElement);l.enableDamping=!a,l.dampingFactor=.1,l.minDistance=10,l.maxDistance=420,l.minPolarAngle=.28,l.maxPolarAngle=1.34,l.enablePan=!1,l.zoomToCursor=!1,l.mouseButtons.RIGHT=ci.ROTATE;const d=new iu("#e9f4ff","#8d7860",2.5);o.add(d);const h=new xo("#ffe5c3",3.2);h.position.set(-14,30,12),h.castShadow=!0,Object.assign(h.shadow.camera,{left:-22,right:22,top:23,bottom:-23,near:1,far:90}),h.shadow.mapSize.set(2048,2048),h.shadow.normalBias=.035,h.shadow.bias=-2e-4,h.shadow.radius=3,o.add(h);const u=new xo("#e3eaff",1.1),m=new ru("#cfd5bb",a?.65:0);o.add(m),a&&(h.intensity=.72,u.intensity=.3),u.position.set(20,10,-15),o.add(u);const S=new fi(1,1,1),w=new Ur(1,1,1,16),g=new ba(1,10,6),f=document.createElement("canvas");f.width=128,f.height=512;const P=f.getContext("2d");let T=2026;const M=()=>(T=T*1664525+1013904223>>>0,T/4294967296);P.fillStyle="#936b48",P.fillRect(0,0,128,512);for(let I=0;I<230;I++){P.strokeStyle=`rgba(${I%3?48:225},${I%3?30:184},${I%3?20:130},${M()*.23+.025})`,P.lineWidth=M()*1.3+.2,P.beginPath();const ee=M()*128;P.moveTo(ee,0);for(let te=0;te<=512;te+=25)P.lineTo(ee+Math.sin(te*.018+I)*1.8,te);P.stroke()}const R=new _o(f);R.colorSpace=zt,R.wrapS=R.wrapT=Er,R.anisotropy=Math.min(4,s.capabilities.getMaxAnisotropy());const b=(I,ee=.75,te=0)=>new ri({color:I,roughness:ee,metalness:te}),v={wood:new ri({map:R,color:"#c89f7e",roughness:.68}),darkWood:new ri({map:R,color:"#886548",roughness:.8}),charcoal:b("#303b35"),frame:b("#24322d",.4,.28),floor:b("#b8b4a4"),edge:b("#454a40"),cream:b("#cec7b3"),paper:b("#ece5d5"),brass:b("#ad8c56",.4,.55),rubber:b("#1e2b27"),green:b("#375747"),greenLight:b("#6e8253"),pot:b("#b8af98"),rug:b("#777f69"),rug2:b("#a49476"),screen:b("#122a2b",.35),cyan:new ri({color:"#79c2bd",emissive:"#5aa9a3",emissiveIntensity:.4}),warm:new ri({color:"#f8d59a",emissive:"#ffcb77",emissiveIntensity:.7}),white:b("#e0e2d3"),glass:new ri({color:"#a5c4b7",transparent:!0,opacity:.16,roughness:.12,depthWrite:!1,side:$t}),skin:b("#c79369"),hair:b("#352b22"),shirt:b("#629893"),shirt2:b("#9f927f")};a&&(v.wood.color.set("#8f6749"),v.darkWood.color.set("#5a4434"),h.color.set("#fff5e8"),m.color.set("#e0e0d7")),v.stairGlass=new ri({color:"#9ecfce",transparent:!0,opacity:a?.28:.24,roughness:.12,depthWrite:!1,side:$t});const x=(I,ee,te,se,he)=>{const ne=new tn(I,ee);return ne.position.set(...te),ne.scale.set(...se),ne.castShadow=!ee.transparent,ne.receiveShadow=!ee.transparent,he.add(ne),ne},p=new Map,y=(I,ee,te,se,he,ne,Te,rt=v.wood)=>{let qe=S;if(a){const Ft=[he,ne,Te].map(Jt=>Math.max(1,Math.ceil(Jt/1.5))),wt=Ft.join(",");p.has(wt)||p.set(wt,new fi(1,1,1,...Ft)),qe=p.get(wt)}const Lt=x(qe,rt,[ee,te,se],[he,ne,Te],I);return a&&te<.16&&(he>4||Te>4)&&ne<.7&&(Lt.renderOrder=-100+Math.round(te*500)),Lt},A=(I,ee,te,se,he,ne,Te=v.frame)=>x(w,Te,[ee,te,se],[he,ne,he],I),L=(I,ee,te,se,he,ne,Te,rt)=>x(g,rt,[ee,te,se],[he,ne,Te],I),B=(I,ee=0,te=0,se=0,he=0)=>{const ne=new _n;return ne.position.set(ee,te,se),ne.rotation.y=he,I.add(ne),ne},D=(I,ee,te,se,he,ne=3.8,Te=.42,rt="#e4d9ba",qe=null,Lt=!1)=>{if(a)return;const Ft=document.createElement("canvas");Ft.width=1024,Ft.height=128;const wt=Ft.getContext("2d");qe&&(wt.fillStyle=qe,wt.fillRect(0,0,1024,128)),wt.fillStyle=rt,wt.font="500 49px Arial",wt.textAlign="center",wt.textBaseline="middle",wt.fillText(ee,512,65,980);const Jt=new _o(Ft);Jt.colorSpace=zt;const Kn=new er({map:Jt,transparent:!0,depthWrite:!1,side:$t}),Ht=new tn(new Pi(ne,Te),Kn);return Ht.position.set(te,se,he),Lt&&(Ht.rotation.x=-Math.PI/2),I.add(Ht),Ht};function N(I,ee,te,se=1,he=0){const ne=B(I,ee,he,te);A(ne,0,.24*se,0,.29*se,.48*se,v.pot),A(ne,0,.48*se,0,.245*se,.025,v.darkWood),A(ne,0,.93*se,0,.032*se,.9*se,v.darkWood);for(let Te=0;Te<9;Te++){const rt=Te*2.4,qe=L(ne,Math.cos(rt)*.24*se,(1.03+Te%3*.2)*se,Math.sin(rt)*.24*se,.14*se,.46*se,.18*se,Te%2?v.green:v.greenLight);qe.rotation.z=Math.sin(rt)*.75,qe.rotation.x=Math.cos(rt)*.75}}function k(I,ee,te,se=1.1,he=.91){y(I,ee,he+.34,te,se,.66,.07,v.frame),y(I,ee,he+.34,te+.041,se-.09,.55,.012,v.screen),y(I,ee,he+.04,te,.075,.2,.075,v.frame),y(I,ee,he-.03,te+.02,.38,.025,.25,v.frame);for(let ne=0;ne<4;ne++)y(I,ee-.17,he+.48-ne*.1,te+.052,.54-ne*.08,.018,.008,ne===0?v.cyan:v.greenLight);y(I,ee+.34,he+.29,te+.055,.13,.3,.012,v.cyan)}function W(I,ee,te,se=0,he=!1){const ne=B(I,ee,0,te,se),Te=he?.92:.48;A(ne,0,Te/2,0,.04,Te,v.frame);for(let rt=0;rt<5;rt++){const qe=rt*Math.PI*2/5,Lt=y(ne,Math.sin(qe)*.17,.1,Math.cos(qe)*.17,.05,.05,.4,v.frame);Lt.rotation.y=qe,A(ne,Math.sin(qe)*.33,.065,Math.cos(qe)*.33,.055,.08,v.rubber)}y(ne,0,Te,0,.56,.14,.56,v.charcoal),y(ne,0,Te+.36,-.24,.54,.6,.12,v.charcoal),y(ne,-.32,Te+.22,0,.07,.06,.4,v.frame),y(ne,.32,Te+.22,0,.07,.06,.4,v.frame)}function $(I,ee,te,se,he=0){const ne=B(I,ee,0,te,he);y(ne,0,.86,0,1.95,.12,.95,v.wood);for(const Te of[-.83,.83])y(ne,Te,.42,0,.065,.84,.75,v.frame),y(ne,Te,.055,0,.34,.055,.78,v.frame);return y(ne,0,.57,-.35,1.7,.07,.05,v.frame),k(ne,0,-.22),y(ne,0,.94,.19,.62,.035,.19,v.charcoal),y(ne,.5,.94,.21,.1,.035,.16,v.charcoal),A(ne,-.74,1.03,.1,.075,.18,v.cream),y(ne,.75,.95,-.06,.23,.028,.31,v.paper),D(ne,String(se).padStart(2,"0"),-.8,.96,.33,.2,.12,"#5b4a35",null,!0),W(ne,0,.95,Math.PI),ne}function re(I,ee,te,se=0,he=2.7){const ne=B(I,ee,0,te,se);y(ne,0,.3,0,he,.4,1.05,v.cream),y(ne,0,.78,-.47,he,.65,.2,v.cream);for(const Te of[-1,1])y(ne,Te*(he/2-.1),.6,0,.2,.55,1.12,v.cream);for(let Te=0;Te<3;Te++)y(ne,-he/3+Te*he/3,.55,.02,he/3-.07,.17,.8,v.pot);for(const Te of[-he*.35,he*.35])for(const rt of[-.32,.32])A(ne,Te,.12,rt,.035,.2,v.brass)}function me(I,ee,te,se=0,he=2.5){const ne=B(I,ee,0,te,se);y(ne,0,1.2,-.2,he,2.4,.08,v.darkWood);for(const Te of[.12,.75,1.4,2.1]){y(ne,0,Te,0,he,.06,.55,v.wood);for(let rt=0;rt<6;rt++)y(ne,-he*.4+rt*he*.14,Te+.22,.03,.13,.35+M()*.12,.32,[v.charcoal,v.cream,v.brass,v.green][rt%4])}for(const Te of[-he/2,he/2])y(ne,Te,1.2,0,.06,2.4,.55,v.frame)}function be(I,ee,te){y(I,ee,1.24,te,.92,2.46,.82,v.frame),y(I,ee,1.25,te+.42,.78,2.15,.035,v.charcoal);for(let se=0;se<7;se++)y(I,ee,.36+se*.28,te+.455,.7,.19,.025,v.rubber),y(I,ee-.25,.36+se*.28,te+.475,.035,.035,.015,v.cyan),y(I,ee+.03,.36+se*.28,te+.475,.32,.012,.01,v.brass);y(I,ee,2.52,te,.94,.06,.88,v.charcoal)}function _e(I,ee,te,se,he=0){const ne=B(I,ee,0,te,he);y(ne,0,.85,0,se,1.7,.035,v.glass);for(const Te of[-se/2,se/2])y(ne,Te,.89,0,.045,1.78,.045,v.frame);y(ne,0,.08,0,se,.1,.05,v.frame),y(ne,0,1.75,0,se,.04,.045,v.brass)}function Be(I,ee,te,se,he=0,ne=2.65){const Te=B(I,ee,0,te,he);y(Te,0,ne/2+.08,0,se,ne,.07,v.glass);for(let rt=-se/2;rt<=se/2+.01;rt+=se/5)y(Te,rt,ne/2+.08,0,.07,ne+.15,.1,v.frame);y(Te,0,.12,0,se,.13,.12,v.frame),y(Te,0,ne+.1,0,se,.13,.14,v.frame),y(Te,0,ne*.55,0,se,.045,.08,v.frame)}function Ze(I,ee=!1){y(I,0,-.3,0,26.6,.6,18.6,v.charcoal),y(I,0,.005,0,26,.07,18,ee?v.darkWood:v.floor),y(I,0,-.19,9.32,26.5,.035,.04,v.brass),y(I,13.32,-.19,0,.04,.035,18.6,v.brass);for(let te=-12;te<=12;te+=1.5)y(I,te,.048,0,.013,.005,18,ee?v.brass:v.edge);if(!ee){y(I,0,.057,0,26,.018,1.7,v.wood);for(let te=-12;te<=12;te++)y(I,te,.069,0,.016,.004,1.7,v.darkWood)}y(I,0,1.65,-9.1,26.5,3.3,.2,v.charcoal);for(const te of[-5.15,5.15])y(I,-13.1,1.65,te,.2,3.3,8.1,v.charcoal);y(I,-13.1,3,0,.2,.6,2.2,v.charcoal);for(let te=-12.6;te<13;te+=.3)y(I,te,1.55,-8.97,.055,2.9,.07,v.darkWood);for(let te=-8.8;te<9;te+=.32)Math.abs(te)>1.15&&y(I,-12.97,1.55,te,.07,2.9,.055,v.darkWood);y(I,0,3.24,-8.94,26,.045,.06,v.warm),y(I,-12.95,3.24,0,.06,.045,18,v.warm);for(let te of[-12.8,-4.3,4.3,12.8])y(I,te,1.75,-8.7,.18,3.5,.18,v.frame),y(I,te,3.48,-4.5,.15,.16,8.5,v.frame);Be(I,12.94,-4.5,8.5,Math.PI/2,2.9),D(I,"K I P   /   H E A D Q U A R T E R S",0,2.73,-8.82,7.9,.48,"#e2d1ad","#2a322c");for(let te of[-11,11])N(I,te,8,1.5),N(I,te,-7.6,1.1)}const de=new _n,z=new _n,ve=new _n;o.add(de,z,ve),Ze(de),Ze(z,!0),Ze(ve,!0),z.visible=!1,ve.visible=!1;const fe=[];for(const I of ps){const ee=I.id==="content"?v.rug2:v.rug;y(de,I.x,.063,I.z,7.7,.03,6.9,ee);for(const se of[-1,1])y(de,I.x+se*3.9,.08,I.z,.035,.02,7,v.brass);D(de,I.title.toUpperCase(),I.x,.093,I.z+2.85,5.6,.34,"#e6e0cd",null,!0);const te=new tn(new Pi(7.7,6.9),new er({visible:!1}));te.rotation.x=-Math.PI/2,te.position.set(I.x,.1,I.z),te.userData.id=I.id,de.add(te),fe.push(te)}for(const I of[-4.3,4.3])_e(de,I,-4.6,6.7,Math.PI/2),_e(de,I,4.6,6.7,Math.PI/2);for(const I of[-8.6,0,8.6])_e(de,I-2.3,-1,3.1),_e(de,I-2.3,1,3.1);$(de,-9,-4.2,1),y(de,-9,1.8,-8.77,3.4,1.4,.1,v.frame),y(de,-9,1.8,-8.7,3.2,1.23,.04,v.paper);for(let I=0;I<6;I++)y(de,-10+I%3*.9,1.94-Math.floor(I/3)*.46,-8.65,.7,.3,.025,[v.rug,v.brass,v.charcoal][I%3]);A(de,-6.8,.71,-2.9,.65,.09,v.wood),A(de,-6.8,.35,-2.9,.08,.7,v.frame),W(de,-6.5,-1.9,Math.PI),N(de,-11.6,-2.5,1.2);for(let I=0;I<3;I++)be(de,-2.3+I*1.1,-7.6);$(de,-2.1,-3.6,2),$(de,.3,-3.6,3),$(de,2.6,-5.4,4),$(de,6.5,-4.3,5),$(de,9.8,-4.3,6),y(de,8.7,1.87,-8.73,4.1,1.6,.12,v.frame),y(de,8.7,1.87,-8.65,3.9,1.4,.02,v.screen),D(de,"PLAY. TEST. IMPROVE.",8.7,1.95,-8.61,3.4,.35,"#a3d8c6"),N(de,11.9,-2,1.2),$(de,-10.7,4.2,7),$(de,-7.5,4.2,8),be(de,-11.6,1.9),y(de,-6,1.05,2,1.7,2.1,.85,v.charcoal),y(de,-6,1.05,2.44,1.5,1.9,.04,v.frame);const We=A(de,-6,1.1,2.5,.15,.05,v.brass);We.rotation.x=Math.PI/2,y(de,-5.65,1.1,2.5,.07,.4,.06,v.brass),$(de,-.7,4,9),me(de,2.2,2.1,0,2.7),re(de,1.1,6.9,0,2.4),A(de,-1.3,.6,7.1,.5,.08,v.wood),A(de,-1.3,.28,7.1,.08,.56,v.frame),A(de,-1.36,.98,3.7,.07,.07,v.frame),A(de,-1.36,1.16,3.7,.023,.35,v.frame),A(de,-1.36,1.38,3.7,.07,.17,v.rubber),N(de,-3,6.7,1.25),$(de,6.2,3.9,10),$(de,9.5,3.9,11),$(de,8.6,6.5,12),$(de,6.2,6.5,13),$(de,11,6.5,14),me(de,11.5,2.1,0,1.8),D(de,"01   /   THE LOFT",0,-.22,9.63,5.8,.29,"#e2cfaa"),y(z,-6.9,.09,-3.5,9,.05,7.5,v.rug),y(z,-6.9,.9,-3.6,5.6,.17,2.25,v.wood);for(const I of[-8.7,-5.1])y(z,I,.44,-3.6,.16,.88,1.5,v.frame);for(const I of[-5.2,-1.9])for(const ee of[-8.6,-7,-5.4])W(z,ee,I,I<-3?0:Math.PI);W(z,-10.4,-3.6,-Math.PI/2),W(z,-3.4,-3.6,Math.PI/2);for(const I of[-8.5,-6.9,-5.3])y(z,I,1.01,-3.6,.6,.028,.38,v.paper),A(z,I+.4,1.08,-3.5,.06,.13,v.cream);y(z,-7,1.85,-8.7,5,1.7,.15,v.frame),y(z,-7,1.85,-8.61,4.8,1.5,.02,v.screen),D(z,"PANTAU · PERBAIKI · UJI",-7,1.9,-8.57,4.1,.42,"#e0ce9f");for(const I of[-8.6,-7,-5.4])k(z,I,-3.5);_e(z,-1.8,-4.5,6.3,Math.PI/2),y(z,6.8,.66,-5,8.3,1.3,1.05,v.darkWood),y(z,6.8,1.36,-5,8.65,.13,1.4,v.wood),y(z,6.8,.1,-4.46,8,.04,.04,v.warm);for(let I=0;I<30;I++)y(z,2.85+I*.27,.7,-4.45,.05,1.1,.04,v.brass);for(const I of[3.6,5.6,7.6,9.6])W(z,I,-3.8,Math.PI,!0);me(z,7.3,-8.6,0,6.5),y(z,10.3,1.7,-5.1,.7,.62,.52,v.frame),y(z,10.3,1.7,-4.82,.55,.29,.02,v.brass);for(let I=0;I<3;I++)A(z,4+I*.4,1.5,-5,.08,.18,v.cream);y(z,6,.08,4.1,10,.04,7,v.rug2),re(z,6,2.3,0,4.4),re(z,9.3,4.3,-Math.PI/2,3.5),re(z,3.2,5.5,Math.PI/2,2.7),A(z,6.1,.39,4.6,1.2,.11,v.darkWood),A(z,6.1,.19,4.6,.35,.33,v.charcoal),y(z,5.9,.48,4.6,.8,.07,.55,v.paper),A(z,6.6,.53,4.7,.1,.2,v.brass),N(z,10.5,7.5,1.6),N(z,2,1.6,1.6),y(z,-7,.07,4.7,9,.06,6.8,v.floor);for(let I=0;I<9;I++)y(z,-11+I,.11,4.7,.03,.012,6.8,v.brass);re(z,-9.7,4.6,Math.PI/2,2.4),re(z,-4.5,4.6,-Math.PI/2,2.4),A(z,-7.1,.5,4.6,.8,.12,v.wood),A(z,-7.1,.24,4.6,.09,.48,v.frame);for(const I of[-11,-8.7,-6.4,-4.1])N(z,I,7.5,1.2);for(const I of[2,4,6])N(z,-11.8,I,1.1);Be(z,0,9,25.5,0,1),Be(z,12.94,4.5,8.6,Math.PI/2,1),D(z,"TIM GAME & IT",-7,.15,-.15,4,.3,"#e4d7bc",null,!0),D(z,"SKY LOUNGE",6,.12,7.3,4,.3,"#e5dcc6",null,!0),D(z,"02   /   SKY CLUB",0,-.22,9.63,5.8,.29,"#e2cfaa");for(const I of[4,7,10])A(z,I,2.75,-5,.28,.25,v.charcoal),A(z,I,2.61,-5,.23,.025,v.warm),A(z,I,3.18,-5,.018,.7,v.frame);i0(ve,{T:so,m:v,box:y,cyl:A,orb:L,group:B,sofa:re,plant:N,partition:_e,windowWall:Be,label:D,software:a}),[de,z,ve].forEach((I,ee)=>r0(I,{T:so,m:v,box:y,cyl:A,software:a},ee));const Ye=new _n;o.add(Ye),Ye.visible=!1;for(const I of[0,zn])for(const ee of[-12.8,12.8])for(const te of[-8.7,8.7])y(Ye,ee,I+zn/2,te,.18,zn,.18,v.frame);function ze(I){I.updateMatrixWorld(!0);const ee=new Map,te=[];I.traverse(se=>{if(se.isMesh&&!se.material.transparent&&se.material.visible!==!1){const he=se.material.uuid+":"+se.renderOrder,ne=ee.get(he)||{material:se.material,order:se.renderOrder,geometries:[]};ne.geometries.push(se.geometry.clone().applyMatrix4(se.matrixWorld)),ee.set(he,ne),te.push(se)}});for(const se of te)se.removeFromParent();for(const se of ee.values()){const he=n0(se.geometries,!1),ne=new tn(he,se.material);ne.renderOrder=se.order,ne.castShadow=!0,ne.receiveShadow=!0,I.add(ne),se.geometries.forEach(Te=>Te.dispose())}}for(const I of[de,z,ve])ze(I),I.traverse(ee=>ee.userData.baseOrder=ee.renderOrder);const nt=new _n;o.add(nt);const Qe=new er({color:"#dec18e",transparent:!0,opacity:.8,depthWrite:!1});for(const I of[-3.52,3.52])y(nt,0,.15,I,7.9,.025,.06,Qe);for(const I of[-3.95,3.95])y(nt,I,.15,0,.06,.025,7.1,Qe);nt.visible=!1;const it=[];function ct(I){const{id:ee,name:te,short:se,color:he,desk:[ne,,Te]}=I,rt=b(he,.4,.35),qe=B(o,ne,0,Te),Lt=B(qe,-.12,.45,0),Ft=B(qe,.12,.45,0);y(Lt,0,-.19,0,.14,.4,.17,v.charcoal),y(Ft,0,-.19,0,.14,.4,.17,v.charcoal),y(Lt,0,-.4,.05,.18,.1,.29,v.rubber),y(Ft,0,-.4,.05,.18,.1,.29,v.rubber),y(qe,0,.75,0,.48,.56,.26,rt),y(qe,0,1.24,0,.48,.4,.36,v.white),y(qe,0,1.25,.19,.4,.23,.035,v.screen),A(qe,0,1.53,0,.025,.2,v.brass),L(qe,0,1.65,0,.065,.065,.065,rt),y(qe,0,.78,.15,.18,.18,.025,v.cyan);const wt=B(qe,-.29,.96,0),Jt=B(qe,.29,.96,0);y(wt,0,-.19,0,.12,.4,.14,rt),y(Jt,0,-.19,0,.12,.4,.14,rt),A(wt,0,-.4,0,.06,.12,v.white),A(Jt,0,-.4,0,.06,.12,v.white),y(qe,.09,1.27,.214,.065,.05,.01,v.cyan),y(qe,-.09,1.27,.214,.065,.05,.01,v.cyan);const Kn=A(qe,0,.01,0,.35,.015,v.cyan);Kn.castShadow=!1,qe.traverse(Ra=>Ra.userData.agentId=ee);const Ht=document.createElement("button");return Ht.className="agent-pin",Ht.textContent=se,Ht.dataset.agent=ee,Ht.dataset.tone="unknown",Ht.title=te,Ht.setAttribute("aria-label",te+" — belum terverifikasi — buka laporan"),Ht.onclick=()=>t?.(ee),n.appendChild(Ht),it.push({id:ee,root:qe,left:Lt,right:Ft,armL:wt,armR:Jt,x:ne,z:Te,pin:Ht,motion:kg(ee),pose:null}),qe}Ai.forEach(ct);const $e=s0({T:so,software:a,compact:ze});o.add($e.root),$e.root.visible=!1;let ye="loft",j=!1,ce=matchMedia("(prefers-reduced-motion: reduce)").matches,pe=!1,ae=0,Ae=0,U=a?1:3,et=!1,Le=!1,C=null;const _=(I=ye)=>{const ee=n.clientWidth<600;if(I==="campus"){const he=new G(1,2,-1),ne=ee?1.92:1.08;return{position:he.clone().add(new G(72,64,100).multiplyScalar(ne)),target:he}}const te=I==="building",se=ee?2.25:1.27;return{position:new G(28*se,(te?29:30)*se,(te?42:34)*se),target:new G(-2,te?4.6:.2,0)}};function O(){U=Math.max(U,a?1:3),!Ae&&!document.hidden&&!Le&&!et&&(Ae=requestAnimationFrame(we))}function V(I,ee,te=!0){ce||a||!te?(c.position.copy(I),l.target.copy(ee),l.update(),C=null):C={from:c.position.clone(),to:I.clone(),targetFrom:l.target.clone(),targetTo:ee.clone(),started:performance.now()},O()}function q(){$e.root.visible=ye==="campus"||ye==="building";const I=_();V(I.position,I.target),nt.visible=!1}function ue(){const I=n.clientWidth,ee=n.clientHeight;!I||!ee||(s.setSize(I,ee,!1),c.aspect=I/ee,c.updateProjectionMatrix(),O())}function Q(I){const ee=ps.find(te=>te.id===I);if(ye==="loft"&&ee){nt.position.set(ee.x,0,ee.z),nt.visible=!0;const te=new G(ee.x,.5,ee.z);V(te.clone().add(new G(13,16,19)),te)}else nt.visible=!1,O()}function H(I,ee){nt.visible=!1;const te=new G(I,.45,ee);V(te.clone().add(new G(14,17,20)),te)}function Y(I){const ee=it.map(he=>[he.pose?.phase,he.pose?.position?.join(","),he.pin.dataset.tone].join(":")).join("|");for(const he of I){const ne=it.find(Te=>Te.id===he.id);ne&&(ne.motion.update(he),ne.pin.dataset.tone=he.tone,ne.pin.setAttribute("aria-label",he.name+" — "+he.label+" — buka laporan"))}const te=xe(0,ce||a||document.hidden),se=it.map(he=>[he.pose?.phase,he.pose?.position?.join(","),he.pin.dataset.tone].join(":")).join("|");(te||ee!==se)&&O()}function oe(I){pe=I,ae=0,xe(0,ce||a),O()}function xe(I,ee=!1){let te=!1;const se=["building","campus"].includes(ye),he={loft:0,sky:1,entertain:2}[ye]??0;for(const ne of it){const Te=ne.motion.step(I,{snap:ee,pause:pe}),rt=ne.pose?.phase;ne.pose=Te,ne.root.position.set(Te.position[0],Te.position[1]-(se?0:he*zn),Te.position[2]),ne.root.rotation.y=Te.rotation,ne.root.visible=se||Te.level===he;const qe=Te.moving?Math.sin(performance.now()*.011)*.45:0;if(ne.left.rotation.x=qe,ne.right.rotation.x=-qe,ne.armL.rotation.x=-qe*.8,ne.armR.rotation.x=qe*.8,Te.phase==="resting"){const Lt=Te.enjoying?Math.sin(performance.now()*.008)*.14:0;ne.armL.rotation.x=-.8+Lt,ne.armR.rotation.x=-.8-Lt}else Te.phase==="reviewing"&&(ne.armR.rotation.x=-1);a&&ne.root.traverse(Lt=>Lt.renderOrder=se?Te.level*1e3:0),rt!==Te.phase&&i?.(ne.id,Te.phase),te||=Te.active}return te&&(s.shadowMap.needsUpdate=!0),te}function ge(){const I=[],ee=n.clientWidth,te=n.clientHeight;for(const se of it){const he=se.root.position.clone().add(new G(0,2,0)).project(c),ne=se.root.visible&&he.z>-1&&he.z<1&&Math.abs(he.x)<.94&&Math.abs(he.y)<.86;if(se.pin.hidden=!ne,!ne)continue;const Te={x:(he.x+1)*ee/2,y:(1-he.y)*te/2};let rt=null;for(let qe=0;qe<=5&&!rt;qe++)for(const[Lt,Ft]of[[0,qe],[0,-qe],[qe,0],[-qe,0],[qe,qe],[-qe,qe]]){const wt=Math.max(25,Math.min(ee-25,Te.x+Lt*48)),Jt=Math.max(48,Math.min(te-8,Te.y+Ft*48));if(I.every(Kn=>Math.abs(wt-Kn.x)>=46||Math.abs(Jt-Kn.y)>=46)){rt={x:wt,y:Jt};break}}rt??={x:Math.max(25,Math.min(ee-25,Te.x)),y:Math.max(48,Math.min(te-8,Te.y))},I.push(rt),se.pin.style.left=rt.x+"px",se.pin.style.top=rt.y+"px"}}function Me(I){const ee=it.find(he=>he.id===I);if(!ee)return;$e.root.visible=!1,nt.visible=!1;const te=ee.root.position.clone().add(new G(0,.7,0)),se=n.clientWidth<600?1.4:1;V(te.clone().add(new G(8,10,12).multiplyScalar(se)),te)}function De(I){const ee=it.find(te=>te.id===I)?.pose;return ee?.moving?"building":["loft","sky","entertain"][ee?.level??0]}function Fe(I){ye=I;const ee=I==="building"||I==="campus";l.maxDistance=ee?420:145,[["loft",de],["sky",z],["entertain",ve]].forEach(([se,he],ne)=>{he.visible=ee||I===se,he.position.y=ee?ne*zn:0,a&&he.traverse(Te=>Te.renderOrder=(Te.userData.baseOrder||0)+(ee?ne*1e3:0))}),Ye.visible=ee,$e.root.visible=ee,nt.visible=!1,xe(0,ce||a),Se(j),q(),s.shadowMap.needsUpdate=!0,O()}function Xe(){$e.root.visible=!1,nt.visible=!1;const I=new G(-13,4.5,-1.6),ee=n.clientWidth<600;V(I.clone().add(new G(-22,13,29).multiplyScalar(ee?1.5:1)),I)}function F(I,ee,te){nt.visible=!1,$e.root.visible=!0;const se={arrival:[26,21,34],garden:[-17,17,26],beach:[27,24,34],mountains:[42,30,48]},he=new G(ee,I==="mountains"?6:0,te),ne=n.clientWidth<600?1.65:1;V(he.clone().add(new G(...se[I]).multiplyScalar(ne)),he)}function Se(I){j=I;const ee=ye==="campus"||ye==="building";o.background.set(I?ee?"#142b36":"#131d1c":ee?"#cbded9":"#d8d9cd"),o.fog.color.copy(o.background),o.fog.near=ee?180:90,o.fog.far=ee?430:190,$e.setNight(I),d.intensity=I?.8:2.5,d.color.set(I?"#b7c9db":"#e9f4ff"),h.intensity=a?I?.3:.72:I?.65:3.2,m.intensity=a?I?.5:.65:0,h.color.set(I?"#9fbdd7":a?"#fff5e8":"#ffe5c3"),u.intensity=a?I?.22:.3:I?.5:1.1,s.toneMappingExposure=I?1.35:1.13,v.warm.emissiveIntensity=I?2.2:.7,v.cyan.emissiveIntensity=I?1.6:.4,s.shadowMap.needsUpdate=!0,O()}function ie(I){C=null;const ee=c.position.clone().sub(l.target);ee.applyAxisAngle(new G(0,1,0),I),c.position.copy(l.target).add(ee),l.update(),O()}function Ee(I){C=null;const ee=c.position.clone().sub(l.target);ee.setLength(ra.clamp(ee.length()*I,l.minDistance,l.maxDistance)),c.position.copy(l.target).add(ee),l.update(),O()}function we(I){if(Ae=0,Le||document.hidden||et)return;const ee=Math.min((I-(ae||I))/1e3,.25);ae=I;let te=!1;if(C){const he=Math.min(1,(I-C.started)/650),ne=1-Math.pow(1-he,3);c.position.lerpVectors(C.from,C.to,ne),l.target.lerpVectors(C.targetFrom,C.targetTo,ne),te=he<1,he===1&&(C=null)}te=xe(ee,ce||a)||te;const se=l.update(ee);s.render(o,c),ge(),U--,(te||se||U>0)&&!Ae&&(Ae=requestAnimationFrame(we))}l.addEventListener("change",O),l.addEventListener("start",()=>{C=null,O()});let le=null;const Oe=I=>{le={x:I.clientX,y:I.clientY}},Ie=I=>{if(!le||Math.hypot(I.clientX-le.x,I.clientY-le.y)>6)return;const ee=s.domElement.getBoundingClientRect(),te=new He((I.clientX-ee.left)/ee.width*2-1,-(I.clientY-ee.top)/ee.height*2+1),se=new ou;se.setFromCamera(te,c);const he=se.intersectObjects(it.filter(Te=>Te.root.visible).map(Te=>Te.root),!0)[0];if(he){t?.(he.object.userData.agentId);return}if(ye!=="loft")return;const ne=se.intersectObjects(fe)[0];ne&&e?.(ne.object.userData.id)};s.domElement.addEventListener("pointerdown",Oe),s.domElement.addEventListener("pointerup",Ie);const tt=I=>{if(I.key==="ArrowLeft")I.preventDefault(),ie(-.18);else if(I.key==="ArrowRight")I.preventDefault(),ie(.18);else if(["+","="].includes(I.key))I.preventDefault(),Ee(.85);else if(I.key==="-")I.preventDefault(),Ee(1.15);else if(I.key==="Home")I.preventDefault(),q();else if(["ArrowUp","ArrowDown"].includes(I.key)){I.preventDefault();const ee=c.position.clone().sub(l.target),te=new sa().setFromVector3(ee);te.phi=ra.clamp(te.phi+(I.key==="ArrowUp"?-.08:.08),.28,1.34),c.position.copy(l.target).add(new G().setFromSpherical(te)),l.update(),O()}};n.addEventListener("keydown",tt);const at=()=>{document.hidden?(cancelAnimationFrame(Ae),Ae=0,xe(0,!0),ae=0):O()};document.addEventListener("visibilitychange",at);const Et=matchMedia("(prefers-reduced-motion: reduce)"),At=I=>{ce=I.matches,ce&&(xe(0,!0),C=null),O()};Et.addEventListener("change",At);const fn=I=>{I.preventDefault(),et=!0,cancelAnimationFrame(Ae),Ae=0,r?.("Tampilan 3D terhenti.")};s.domElement.addEventListener("webglcontextlost",fn);const pi=new ResizeObserver(ue);pi.observe(n);const Di=_();return c.position.copy(Di.position),l.target.copy(Di.target),l.update(),ue(),s.shadowMap.needsUpdate=!0,O(),{software:a,setFloor:Fe,setNight:Se,select:Q,focusPoint:H,focusStairs:Xe,focusOutdoor:F,rotate:ie,zoom:Ee,reset:q,updateAgents:Y,pauseMotion:oe,focusAgent:Me,agentFloor:De,get reducedMotion(){return ce},get state(){return{floor:ye,night:j,motionPaused:pe,renderer:a?"svg-fallback":"webgl2",drawCalls:s.info.render.calls??null,triangles:s.info.render.triangles??s.info.render.faces}},dispose(){Le=!0,cancelAnimationFrame(Ae),pi.disconnect(),l.dispose(),s.dispose(),document.removeEventListener("visibilitychange",at),Et.removeEventListener("change",At),n.removeEventListener("keydown",tt),s.domElement.removeEventListener("pointerdown",Oe),s.domElement.removeEventListener("pointerup",Ie),s.domElement.removeEventListener("webglcontextlost",fn);const I=new Set,ee=new Set,te=new Set;o.traverse(se=>{if(se.geometry&&I.add(se.geometry),se.material)for(const he of[].concat(se.material)){ee.add(he);for(const ne of Object.values(he))ne?.isTexture&&te.add(ne)}}),I.forEach(se=>se.dispose()),ee.forEach(se=>se.dispose()),te.forEach(se=>se.dispose()),it.forEach(se=>se.pin.remove()),s.domElement.remove()}}}const dt=n=>document.querySelector(n),Li=n=>[...document.querySelectorAll(n)];Li("[data-icon]").forEach(n=>n.innerHTML=Eo(n.dataset.icon));let Pr=null,bu=null,Pt=null,Hn="loft",sc=!1;function Dn(n){dt("#announcement").textContent=n}const Lr={campus:{rooms:$u,number:"COASTAL CAMPUS",caption:"KIP HEADQUARTERS / COASTAL CAMPUS",title:"Between peaks & sea",description:"Kantor, taman, dan garis pantai.",panel:"Bekerja dekat alam,<br/> menikmati ruang.",intro:"Jalan masuk, taman pinus dan mawar, pantai pasir putih, serta gunung di belakang kantor.",first:"4",firstLabel:"zona luar",second:"360°",secondLabel:"sudut pandang",detail:"Kawasan pesisir KIP",detailText:"Pilih area untuk menjelajah. Gunakan tab lantai untuk kembali melihat interior kantor."},loft:{rooms:ps,number:"01 / 03",caption:"LANTAI 01 / WORKSPACE",title:"The Loft",description:"Enam divisi. Ruang untuk bertumbuh.",panel:"Ruang kerja,<br/> dipikirkan ulang.",intro:"Material hangat. Ruang terbuka. Setiap peran punya tempatnya.",first:"6",firstLabel:"divisi",second:String(Ai.length),secondLabel:"meja khusus",detail:"Dirancang untuk tim KIP",detailText:"Pilih ruangan untuk melihat tata letak dan rencana penghuninya."},sky:{rooms:Ku,number:"02 / 03",caption:"LANTAI 02 / TIM GAME & IT",title:"Game & IT Team",description:"Bertemu. Berbagi. Melihat lebih jauh.",panel:"Good ideas<br/> need good company.",intro:"Tempat tim berkumpul, merencanakan, dan mengambil jeda.",first:"4",firstLabel:"area bersama",second:"22",secondLabel:"tempat duduk",detail:"Ruang untuk bertemu",detailText:"Ruang strategi, lounge, coffee bar, dan teras hijau untuk bertukar ide."},entertain:{rooms:Zu,number:"03 / 03",caption:"LANTAI 03 / ENTERTAIN & WELLNESS",title:"The Play Club",description:"Recharge. Play. Repeat.",panel:"Ruang untuk rehat,<br/> energi untuk berkarya.",intro:"Karaoke, gym, kolam renang, dan mini game dalam satu lantai rekreasi.",first:"4",firstLabel:"zona hiburan",second:"2",secondLabel:"sisi kaca tangga",detail:"Rehat di atas kota",detailText:"Pilih zona untuk melihat fasilitasnya. Semua tetap berupa pratinjau visual."},building:{rooms:ps,number:"01 + 02 + 03",caption:"KIP HEADQUARTERS / TIGA LANTAI",title:"One headquarters",description:"Tiga lantai, satu tangga yang terhubung.",panel:"Satu gedung,<br/> tiga suasana.",intro:"Loft, Sky Club, dan Play Club disatukan tangga dua arah dengan pagar kaca.",first:"14",firstLabel:"ruang & zona",second:String(Ai.length),secondLabel:"meja kerja",detail:"Sambungan yang utuh",detailText:"Bordes menghubungkan tangga ke koridor tiap lantai. Pilih Lihat tangga kaca untuk melihatnya dari dekat."}};function yu(n){const e=Lr[Hn].rooms.find(t=>t.id===n);e&&(Li(".room-button").forEach(t=>t.setAttribute("aria-pressed",String(t.dataset.room===n))),dt("#detail-title").textContent=e.title,dt("#detail-roles").replaceChildren(...e.roles.map(t=>{const i=document.createElement("span");return i.textContent=t,i})),Hn==="campus"?Pt?.focusOutdoor(n,e.x,e.z):Hn==="loft"?Pt?.select(n):Pt?.focusPoint(e.x,e.z),Dn("Ruangan dipilih: "+e.title))}function Eu(){const n=Lr[Hn].rooms;dt("#rooms").innerHTML=n.map((e,t)=>`<button class="room-button" data-room="${e.id}" aria-pressed="false"><span class="room-icon">${Eo(e.icon)}</span><span class="room-name"><b>${e.title}</b></span><span class="room-number">${e.seats&&Hn!=="sky"?e.seats+" meja":String(t+1).padStart(2,"0")}</span></button>`).join(""),Li(".room-button").forEach(e=>e.addEventListener("click",()=>{Hn==="building"&&lr("loft"),yu(e.dataset.room)}))}function jo(){const n=Lr[Hn];Li(".room-button").forEach(e=>e.setAttribute("aria-pressed","false")),dt("#detail-title").textContent=n.detail,dt("#detail-roles").replaceChildren(),dt("#stairs-view").setAttribute("aria-pressed","false"),dt("#campus-view").setAttribute("aria-pressed",String(Hn==="campus")),Pt?.reset(),Dn("Tampilan seluruh "+n.title)}function lr(n){if(!Lr[n])return;Hn=n,document.body.classList.toggle("campus",n==="campus");const e=Lr[n];Li("[data-floor]").forEach(t=>t.setAttribute("aria-pressed",String(t.dataset.floor===n))),Pt?.setFloor(n),dt("#floor-caption").textContent=e.caption,dt("#scene-title").innerHTML=e.title+"<span>.</span>",dt("#floor-number").textContent=e.number,dt("#room-list-label").textContent=n==="building"?"DIVISI DI LOFT":n==="campus"?"JELAJAHI KAWASAN":"RUANGAN DI LANTAI INI",Eu(),jo(),Dn(e.caption)}function ac(){sc||(sc=!0,Pt?.dispose(),Pt=null,dt("#office").innerHTML='<div id="loading"><div class="error-3d"><b>Tampilan 3D belum tersedia</b><p>Browser memerlukan WebGL 2. Coba aktifkan akselerasi grafis atau buka di browser lain. Daftar ruangan tetap dapat dibaca.</p><button id="retry-3d">Coba muat ulang</button></div></div>',dt("#retry-3d").onclick=()=>location.reload(),Li(".camera-tools button").forEach(n=>n.disabled=!0),dt("#stairs-view").disabled=!0,dt("#campus-view").disabled=!0,dt("#walk").disabled=!0,Dn("Tampilan 3D belum tersedia; daftar ruangan tetap tersedia."))}Eu();try{if(Pt=a0(dt("#office"),{onPick:yu,onAgentPick:n=>al(n)?Pr?.open(n):bu?.open(n),onAgentMove:(n,e)=>{al(n)&&Pr?.move(n,e)},onError:ac}),dt("#loading")?.remove(),Pt.software){const n=document.createElement("span");n.className="compatibility",n.textContent="Mode kompatibel",dt(".scene-card").appendChild(n)}}catch(n){console.error("3D preview unavailable:",n.message),ac()}Li("[data-floor]").forEach(n=>n.addEventListener("click",()=>lr(n.dataset.floor)));dt("#overview").onclick=jo;dt("#campus-view").onclick=()=>lr("campus");dt("#stairs-view").onclick=()=>{lr("building"),Pt?.focusStairs(),dt("#stairs-view").setAttribute("aria-pressed","true"),dt("#detail-title").textContent="Tangga menyatu dengan gedung",Dn("Melihat tangga kaca yang menghubungkan tiga lantai")};for(const[n,e]of[["day",!1],["night",!0]])dt("#"+n).onclick=()=>{document.body.classList.toggle("night",e),dt("#day").setAttribute("aria-pressed",String(!e)),dt("#night").setAttribute("aria-pressed",String(e)),Pt?.setNight(e),Dn("Suasana "+(e?"malam":"siang"))};dt("#rotate-left").onclick=()=>Pt?.rotate(-.26);dt("#rotate-right").onclick=()=>Pt?.rotate(.26);dt("#zoom-in").onclick=()=>Pt?.zoom(.85);dt("#zoom-out").onclick=()=>Pt?.zoom(1.15);dt("#reset").onclick=jo;const o0=Yu({announce:Dn});dt("#credits-link").onclick=n=>{n.preventDefault(),dt("#credits").showModal()};addEventListener("pagehide",()=>Pt?.dispose(),{once:!0});lr("sky");addEventListener("pageshow",n=>{n.persisted&&location.reload()});const l0=Du({openReport:n=>Pr?.open(n),refreshReport:()=>Pr?.refresh(),announce:Dn});Ou({announce:Dn});Gu();function Tu(n){o0.show("office"),Pt&&(lr(Pt.agentFloor(n)),Pt.focusAgent(n),dt("#office").focus({preventScroll:!0}),dt(".scene-card").scrollIntoView({behavior:"instant",block:"center"}))}Pr=ju({onViews:n=>l0.receive(n),getOffice:()=>Pt,focusAgent:Tu,announce:Dn});Ju();bu=qu({getOffice:()=>Pt,focusAgent:Tu});await Cu(()=>import("./agent-skills-entry-BQu8SU4x.js"),__vite__mapDeps([0,1]));
