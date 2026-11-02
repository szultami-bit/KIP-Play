import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,readdirSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {makeServer} from '../server/http.mjs';

test('built campus and operations assets share the owner-only gate',async t=>{
 const directory=fileURLToPath(new URL('../dist',import.meta.url));
 let owner=false,reads=0;
 const auth={host:'127.0.0.1',origin:'https://agent.example.com',clearCookie:'',session:async()=>owner?{email:'owner@example.com'}:null};
 const server=makeServer({directory,auth,readReport:()=>{reads++;return{source:'observer'}}});
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
 t.after(()=>new Promise(resolve=>server.close(resolve)));
 auth.host='127.0.0.1:'+server.address().port;const base='http://'+auth.host;
 const paths=['/campus/index.html','/operations.html',...readdirSync(directory+'/campus/assets').map(f=>'/campus/assets/'+f)];
 for(const path of paths)assert.equal((await fetch(base+path)).status,401,path);
 assert.match(await(await fetch(base+'/')).text(),/Masuk dengan Google/);
 assert.equal(reads,0);
 owner=true;
 const html=await(await fetch(base+'/')).text();assert.match(html,/Papan pekerjaan/);assert.match(html,/Full screen/);assert.match(html,/Panel operasional/);assert.match(html,/id="logout"/);
 for(const path of paths){const r=await fetch(base+path);assert.equal(r.status,200,path);assert.equal(await r.text(),readFileSync(directory+path,'utf8'));assert.match(r.headers.get('content-security-policy'),/script-src 'self'/);}
 for(const page of ['index.html','operations.html']){
  for(const [,asset] of readFileSync(directory+'/'+page,'utf8').matchAll(/(?:src|href)="(\/agent-office\/[^" ]+\.(?:js|css))"/g)){
   const r=await fetch(base+asset.replace('/agent-office',''));assert.equal(r.status,200,asset);
  }
 }
 assert.equal((await fetch(base+'/api/report')).status,200);assert.equal(reads,1);
 owner=false;assert.equal((await fetch(base+'/campus/index.html')).status,401);
});
