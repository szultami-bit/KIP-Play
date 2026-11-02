const form=document.getElementById('login-form'),button=document.getElementById('submit-login'),message=document.getElementById('login-message'),password=document.getElementById('password'),toggle=document.getElementById('toggle-password'),google=document.getElementById('google-login');
toggle.addEventListener('click',()=>{const show=password.type==='password';password.type=show?'text':'password';toggle.textContent=show?'Tutup':'Lihat';toggle.setAttribute('aria-label',show?'Sembunyikan kata sandi':'Tampilkan kata sandi');toggle.setAttribute('aria-pressed',String(show));});
form.addEventListener('submit',async event=>{
 event.preventDefault();if(button.disabled)return;message.hidden=true;button.disabled=true;google.disabled=true;button.textContent='Memeriksa akun…';form.setAttribute('aria-busy','true');
 try{
  const response=await fetch('/auth/login',{method:'POST',credentials:'same-origin',headers:{'Content-Type':'application/json'},body:JSON.stringify({email:form.elements.email.value.trim(),password:password.value}),signal:AbortSignal.timeout(25000)});
  const result=await response.json();
  if(response.ok&&result.ok){password.value='';location.replace('/');return;}
  if(response.status===429){const seconds=Number(response.headers.get('Retry-After')||60);message.textContent=`Terlalu banyak percobaan. Coba lagi dalam ${Math.max(1,Math.ceil(seconds/60))} menit.`;}
  else if(response.status===503)message.textContent='Layanan login sedang tidak tersedia. Silakan coba lagi sebentar.';
  else message.textContent='Belum bisa masuk. Periksa email dan kata sandi KIP Anda. Hanya akun yang diizinkan dapat mengakses kantor.';
 }catch{message.textContent='Koneksi belum berhasil. Periksa internet Anda, lalu coba lagi.';}
 password.value='';message.hidden=false;message.focus();button.disabled=false;google.disabled=false;button.innerHTML='Masuk ke kantor <span aria-hidden="true">→</span>';form.removeAttribute('aria-busy');
});

const notices={GOOGLE_CANCELLED:'Masuk dengan Google dibatalkan. Anda dapat mencobanya kembali.',GOOGLE_EXPIRED:'Proses masuk belum selesai atau sudah kedaluwarsa. Silakan klik Masuk dengan Google lagi.',ACCESS_DENIED:'Akun Google ini belum diizinkan masuk ke kantor. Pilih akun pemilik yang sudah terdaftar.',AUTH_UNAVAILABLE:'Layanan login sedang tidak tersedia. Silakan coba lagi sebentar.',TRY_LATER:'Terlalu banyak percobaan. Tunggu beberapa menit, lalu coba lagi.'};
const notice=new URL(location.href).searchParams.get('notice');
if(notice&&notices[notice]){message.textContent=notices[notice];message.hidden=false;message.focus();}
if(location.search||location.hash)history.replaceState(null,'',location.pathname);
google.addEventListener('click',async()=>{
 if(google.disabled)return;google.disabled=true;button.disabled=true;message.hidden=true;google.querySelector('span').textContent='Menghubungkan ke Google…';
 try{
  const response=await fetch('/auth/google',{method:'POST',credentials:'same-origin',headers:{'Content-Type':'application/json'},body:'{}',signal:AbortSignal.timeout(12000)}),result=await response.json();
  if(response.ok&&typeof result.url==='string'){
   const url=new URL(result.url);if(url.protocol!=='https:'||!url.hostname.endsWith('.supabase.co')||url.pathname!=='/auth/v1/authorize'||url.searchParams.get('provider')!=='google')throw Error();
   location.assign(url.href);return;
  }
  message.textContent=response.status===429?notices.TRY_LATER:notices.AUTH_UNAVAILABLE;
 }catch{message.textContent='Belum bisa terhubung ke Google. Periksa koneksi Anda, lalu coba lagi.';}
 google.disabled=false;button.disabled=false;google.querySelector('span').textContent='Masuk dengan Google';message.hidden=false;message.focus();
});
window.addEventListener('pageshow',event=>{if(event.persisted){google.disabled=false;button.disabled=false;google.querySelector('span').textContent='Masuk dengan Google';button.innerHTML='Masuk ke kantor <span aria-hidden="true">→</span>';form.removeAttribute('aria-busy');}});
