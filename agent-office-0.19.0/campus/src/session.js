export function bindSessionControls(){
 const logout=document.querySelector('#logout'),notice=document.querySelector('#session-notice');
 let pending=false;
 function inform(text){notice.textContent=text;notice.hidden=!text;}
 async function check(){
  if(document.hidden||pending)return;
  pending=true;
  try{
   const response=await fetch('/auth/session',{credentials:'same-origin',cache:'no-store',signal:AbortSignal.timeout(12000)});
   if(response.status===401){location.replace('/login.html');return;}
   if(!response.ok)throw Error();
   inform('');
  }catch{inform('Koneksi sesi belum tersedia. Periksa koneksi sebelum melanjutkan.');}
  finally{pending=false;}
 }
 logout.addEventListener('click',async()=>{
  if(logout.disabled)return;
  logout.disabled=true;logout.textContent='Keluar…';
  try{
   const response=await fetch('/auth/logout',{method:'POST',credentials:'same-origin',signal:AbortSignal.timeout(12000)});
   if(!response.ok)throw Error();
   location.replace('/login.html');
  }catch{inform('Belum berhasil keluar. Periksa koneksi lalu coba lagi.');logout.disabled=false;logout.textContent='Keluar akun';}
 });
 document.addEventListener('visibilitychange',check);
 addEventListener('pageshow',check);
 const timer=setInterval(check,60000);
 addEventListener('pagehide',()=>clearInterval(timer),{once:true});
 check();
}
