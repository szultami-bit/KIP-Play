export function bindViewControls({announce}){
 const $=s=>document.querySelector(s);let returnFocus=null;
 function show(view){history.replaceState(null,'',view==='board'?'#papan':'#kantor');for(const name of ['office','board']){$('#view-'+name).hidden=name!==view;$('#tab-'+name).setAttribute('aria-pressed',String(name===view));}if(view==='office')dispatchEvent(new Event('resize'));}
 $('.skip').onclick=e=>{e.preventDefault();show('office');$('#office').focus();};
 $('#tab-office').onclick=()=>show('office');$('#tab-board').onclick=()=>show('board');
 function sync(){const active=!!document.fullscreenElement||document.body.classList.contains('focus-mode');$('#fullscreen').textContent=active?'Exit':'Full screen';$('#fullscreen').setAttribute('aria-label',active?'Exit · keluar dari layar penuh':'Full screen · layar penuh');$('#fullscreen').setAttribute('aria-pressed',String(active));}
 async function exit(){if(document.fullscreenElement){try{await document.exitFullscreen();}catch{announce('Tekan Esc untuk keluar dari layar penuh.');return;}}document.body.classList.remove('focus-mode');sync();returnFocus?.focus({preventScroll:true});}
 $('#fullscreen').onclick=async()=>{if(document.fullscreenElement||document.body.classList.contains('focus-mode'))return exit();returnFocus=document.activeElement;try{if(!document.documentElement.requestFullscreen)throw Error();await document.documentElement.requestFullscreen();}catch{document.body.classList.add('focus-mode');announce('Mode layar penuh halaman. Tekan Exit untuk kembali.');}sync();};
 document.addEventListener('fullscreenchange',()=>{sync();dispatchEvent(new Event('resize'));if(!document.fullscreenElement)returnFocus?.focus({preventScroll:true});});document.addEventListener('keydown',e=>{if(e.key==='Escape'&&document.body.classList.contains('focus-mode'))exit();});
 sync();show(location.hash==='#papan'?'board':'office');return {show};
}
