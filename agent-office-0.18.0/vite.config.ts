import {defineConfig} from 'vite';
import {readFileSync} from 'node:fs';
import {sanitize,unavailable} from './server/report.mjs';
export default defineConfig({
 base:'/agent-office/',
 plugins:[{
  name:'kip-readonly-dev-report',
  configureServer(server){
   server.middlewares.use('/agent-office/api/report',(_req,res)=>{
    res.setHeader('Content-Type','application/json');res.setHeader('Cache-Control','no-store');
    try{res.end(JSON.stringify(sanitize(JSON.parse(readFileSync(new URL('./development-snapshot.json',import.meta.url),'utf8')),'snapshot')));}
    catch{res.end(JSON.stringify(unavailable()));}
   });
  }
 }],
 server:{port:5173,allowedHosts:['terminal.local']},
 build:{target:'es2022'}
});
