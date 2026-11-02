import {createServer} from 'node:http';
import {createReadStream,statSync,realpathSync} from 'node:fs';
import {resolve,extname,sep} from 'node:path';
import {unavailable} from './report.mjs';
import {BoardError} from './board.mjs';
import {AuthError} from './auth.mjs';
import {growthRole,unavailableGrowth} from './growth.mjs';
import {normalizeIncident} from './incidents.mjs';
import {TaskError} from './tasks.mjs';
import {TASK_CATALOG,createTaskRequest} from './task-runners.mjs';
import {SkillsError} from './skills.mjs';
const TYPES={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.png':'image/png','.txt':'text/plain; charset=utf-8','.json':'application/json; charset=utf-8','.ico':'image/x-icon'};
const PUBLIC=new Set(['/login.html','/login.css','/login.js']);
async function jsonBody(req,maxBytes=4096){
 if(!/^application\/json(?:\s*;|$)/i.test(req.headers['content-type']||''))throw new AuthError('JSON_REQUIRED',415);
 if(Number(req.headers['content-length'])>maxBytes)throw new AuthError('BODY_TOO_LARGE',413);
 let size=0;const chunks=[];
 for await(const chunk of req){size+=chunk.length;if(size>maxBytes)throw new AuthError('BODY_TOO_LARGE',413);chunks.push(chunk);}
 try{const data=JSON.parse(Buffer.concat(chunks).toString('utf8'));if(!data||typeof data!=='object'||Array.isArray(data))throw Error();return data;}catch{throw new AuthError('BAD_REQUEST',400);}
}
export function makeServer({directory,readReport,readRoles,readGrowth,auth,board,skills,tasks,clock=Date.now}){
 if(!auth?.host||!auth?.origin||typeof auth.session!=='function')throw Error('AUTH_CONFIGURATION_REQUIRED');
 const root=realpathSync(directory);let cached=null,cachedAt=0;
 return createServer({requestTimeout:10000,headersTimeout:10000,maxHeaderSize:8192},async(req,res)=>{
  const headers={'X-Content-Type-Options':'nosniff','Referrer-Policy':'no-referrer','X-Frame-Options':'DENY','X-Robots-Tag':'noindex, nofollow','Strict-Transport-Security':'max-age=31536000','Content-Security-Policy':"default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; connect-src 'self'; object-src 'none'; frame-ancestors 'none'; base-uri 'none'; form-action 'self'"};
  const send=(code,body,type='application/json; charset=utf-8')=>{res.writeHead(code,{...headers,'Content-Type':type,'Cache-Control':'private, no-store','Vary':'Cookie'});res.end(req.method==='HEAD'?'':body);};
  const fileResponse=path=>{
   if(path.includes('\0')||path.includes('\\')||path.split('/').some(p=>p.startsWith('.')))return send(404,'{"error":"NOT_FOUND"}');
   const relative=path==='/'?'index.html':path.replace(/^\/+/, '');let file;
   try{file=realpathSync(resolve(root,relative));if(!file.startsWith(root+sep)||!statSync(file).isFile())throw Error();}catch{return send(404,'{"error":"NOT_FOUND"}');}
   const type=TYPES[extname(file)];if(!type)return send(404,'{"error":"NOT_FOUND"}');
   res.writeHead(200,{...headers,'Content-Type':type,'Cache-Control':'private, no-store','Vary':'Cookie'});
   if(req.method==='HEAD')return res.end();createReadStream(file).on('error',()=>res.destroy()).pipe(res);
  };
  try{
  let path,url;try{url=new URL(req.url,'http://localhost');path=decodeURIComponent(url.pathname);}catch{return send(400,'{"error":"BAD_PATH"}');}
  if(['/skills','/jobs','/board'].some(p=>path==='/agent-office/api'+p))path=path.replace('/agent-office','');
  if(path==='/api/incidents'&&['POST','OPTIONS'].includes(req.method)){
   if(req.headers.host!==auth.host)return send(401,'{"error":"AUTH_REQUIRED"}');
   const origin='https://games.kampunginggrispontianak.com';
   if(req.headers.origin!==origin)return send(403,'{"error":"ORIGIN_DENIED"}');
   headers['Access-Control-Allow-Origin']=origin;headers['Access-Control-Allow-Methods']='POST';headers['Access-Control-Allow-Headers']='Content-Type';
   if(req.method==='OPTIONS'){
    if(req.headers['access-control-request-method']!=='POST'||(req.headers['access-control-request-headers']||'').toLowerCase().split(',').some(h=>h.trim()&&h.trim()!=='content-type'))return send(403,'{"error":"ORIGIN_DENIED"}');
    return send(204,'');
   }
   if(!tasks)return send(503,'{"error":"INCIDENTS_UNAVAILABLE"}');
   tasks.incident(normalizeIncident(await jsonBody(req,1024)));
   return send(202,'{"accepted":true}');
  }
  const authPost=req.method==='POST'&&['/auth/login','/auth/logout','/auth/google'].includes(path);
  const statePost=req.method==='POST'&&['/api/board','/api/skills','/api/jobs'].includes(path);
  if(!['GET','HEAD'].includes(req.method)&&!authPost&&!statePost){res.setHeader('Allow','GET, HEAD');return send(405,'{"error":"READ_ONLY"}');}
  if(path==='/healthz')return send(200,'{"service":"kip-agent-office","status":"ok","mode":"observer-read-only","access":"owner-only"}');
  if(req.headers.host!==auth.host){
   if(['GET','HEAD'].includes(req.method)&&['/','/index.html','/login.html'].includes(path)){res.setHeader('Location',auth.origin+'/');return send(308,'');}
   return send(401,'{"error":"AUTH_REQUIRED"}');
  }
  if(authPost){
   if(!auth.sameOrigin(req))return send(403,'{"error":"ORIGIN_DENIED"}');
   if(path==='/auth/google'){
    await jsonBody(req);const result=auth.startGoogle(req);res.setHeader('Set-Cookie',result.cookie);
    return send(200,JSON.stringify({url:result.url}));
   }
   if(path==='/auth/login'){
    const result=await auth.login(req,await jsonBody(req));res.setHeader('Set-Cookie',result.cookie);
    return send(200,JSON.stringify({ok:true,expiresAt:result.expiresAt}));
   }
   await auth.logout(req);res.setHeader('Set-Cookie',[auth.clearCookie,auth.clearFlowCookie]);return send(200,'{"ok":true}');
  }
  if(path==='/auth/callback'){
   if(req.method!=='GET'){res.setHeader('Allow','GET');return send(405,'{"error":"GET_REQUIRED"}');}
   res.setHeader('Set-Cookie',auth.clearFlowCookie);
   try{const result=await auth.finishGoogle(req,url.searchParams);res.setHeader('Set-Cookie',[auth.clearFlowCookie,result.cookie]);res.setHeader('Location','/');return send(303,'');}
   catch(error){const code=error instanceof AuthError?error.code:'AUTH_UNAVAILABLE';const allowed=['GOOGLE_CANCELLED','GOOGLE_EXPIRED','ACCESS_DENIED','TRY_LATER','AUTH_UNAVAILABLE'];res.setHeader('Location','/login.html?notice='+(allowed.includes(code)?code:'AUTH_UNAVAILABLE'));return send(303,'');}
  }
  if(PUBLIC.has(path))return fileResponse(path);
  const session=await auth.session(req);
  if(!session){
   res.setHeader('Set-Cookie',auth.clearCookie);
   if(path==='/'||path==='/index.html')return fileResponse('/login.html');
   return send(401,'{"error":"AUTH_REQUIRED"}');
  }
  if(path==='/auth/session')return send(200,JSON.stringify(session));
  if(path.startsWith('/auth/'))return send(404,'{"error":"NOT_FOUND"}');
  if(path==='/api/incidents')return tasks?send(200,JSON.stringify(tasks.incidents())):send(503,'{"error":"INCIDENTS_UNAVAILABLE"}');
  if(path==='/api/jobs'){
   if(!tasks||!skills)return send(503,'{"error":"TASKS_UNAVAILABLE"}');
   if(req.method==='POST'){
    if(!auth.sameOrigin(req))return send(403,'{"error":"ORIGIN_DENIED"}');
    const body=await jsonBody(req,1024);
    if(Object.keys(body).length!==2||!Object.hasOwn(body,'taskId')||!Object.hasOwn(body,'requestId'))throw new TaskError('BAD_TASK_REQUEST');
    const job=tasks.enqueue(createTaskRequest(skills.read(),body));
    return send(202,JSON.stringify({id:job.id,status:job.status}));
   }
   return send(200,JSON.stringify({...tasks.list(),incidents:tasks.incidents().issues,catalog:TASK_CATALOG.filter(t=>t.manual).map(({id,title,agentId})=>({id,title,agentId}))}));
  }
  if(path==='/api/skills'){
   if(!skills)return send(503,'{"error":"SKILLS_UNAVAILABLE"}');
   if(req.method==='POST'){
    if(!auth.sameOrigin(req))return send(403,'{"error":"ORIGIN_DENIED"}');
    return send(200,JSON.stringify(skills.update(await jsonBody(req,65536))));
   }
   return send(200,JSON.stringify(skills.read()));
  }
  if(path==='/api/board'){
   if(!board)return send(503,'{"error":"BOARD_UNAVAILABLE"}');
   if(req.method==='POST'){
    if(!auth.sameOrigin(req))return send(403,'{"error":"ORIGIN_DENIED"}');
    return send(200,JSON.stringify(board.update(await jsonBody(req),readReport)));
   }
   return send(200,JSON.stringify(board.read()));
  }
  if(path==='/api/report'){
   const now=clock();if(!cached||now-cachedAt>=5000||now<cachedAt){try{cached=readReport();}catch{cached=unavailable(now);}cachedAt=now;}
   return send(200,JSON.stringify(cached));
  }
  if(path==='/api/roles'){
   // Re-read on every authenticated request; freshness cannot outlive the evidence.
   if(!readRoles)return send(503,'{"error":"ROLES_UNAVAILABLE"}');
   try{const report=readRoles();if(readGrowth){let growth;try{growth=growthRole(await readGrowth(req),clock());}catch{growth=growthRole(null,clock());}report.roles=report.roles.map(r=>r.id==='growth-stats'?growth:r);}return send(200,JSON.stringify(report));}catch{return send(503,'{"error":"ROLES_UNAVAILABLE"}');}
  }
  if(path==='/api/growth'){
   try{return send(200,JSON.stringify(readGrowth?await readGrowth(req):unavailableGrowth(clock())));}catch{return send(200,JSON.stringify(unavailableGrowth(clock())));}
  }
  if(path.startsWith('/api/'))return send(404,'{"error":"NOT_FOUND"}');
  return fileResponse(path);
  }catch(error){
   if(res.headersSent)return res.destroy();
   if(error instanceof TaskError){if(error.status===429)res.setHeader('Retry-After','60');return send(error.status,JSON.stringify({error:error.code}));}
   if(error instanceof BoardError)return send(error.status,JSON.stringify({error:error.code}));
   if(error instanceof SkillsError)return send(error.status,JSON.stringify({error:error.code}));
   if(error instanceof AuthError){if(error.retryAfter)res.setHeader('Retry-After',String(error.retryAfter));return send(error.status,JSON.stringify({error:error.code}));}
   return send(503,'{"error":"AUTH_UNAVAILABLE"}');
  }
 });
}
