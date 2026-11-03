import {readFileSync,writeFileSync,renameSync} from 'node:fs';
import {chromium} from '/qa/tools/node_modules/playwright/index.mjs';
import {eduraceScenario} from './edurace.mjs';
import {wheelScenario,towerScenario} from './wheel-tower.mjs';
const origin='http://localhost:18798',identity=JSON.parse(readFileSync('/qa/identity.json','utf8'));
if(identity.origin!==origin||identity.backend!=='isolated-synthetic')throw Error('QA_IDENTITY_REQUIRED');
const definitions=[['edurace-kart-screen','eduracing',eduraceScenario],['lucky-wheel-screen','lucky-wheel',wheelScenario],['tower-screen','tower',towerScenario]];
const scenarios=[];
const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
const context=await browser.newContext({viewport:{width:1365,height:1000},reducedMotion:'reduce'});
try{
 for(const [id,game,scenario] of definitions){
  const record={id,game,mode:'screen',status:'BLOCKED',startedAt:Date.now(),finishedAt:0,completedSessions:0,checkpoints:[],errors:[]};
  const mark=point=>{if(!record.checkpoints.includes(point))record.checkpoints.push(point)};
  const page=await context.newPage();page.setDefaultTimeout(20000);
  const runtimeErrors=[];page.on('pageerror',e=>runtimeErrors.push(e.name||'Error'));
  try{
   const response=await page.goto(origin+'/account.html?next=%2Fgames%2Feduracing%2F',{waitUntil:'domcontentloaded'});
   if(response.headers()['x-kip-qa-backend']!=='synthetic')throw Error('ISOLATED_BACKEND_REQUIRED');
   if(new URL(page.url()).pathname==='/account.html'){await page.locator('#email').fill('teacher@priority-qa.example.invalid');
   await page.locator('#password').fill(readFileSync('/qa/auth-secret','utf8'));
   await page.locator('#submitAuth').click();}await page.waitForURL('**/games/eduracing/**',{timeout:30000});mark('login');
   const result=await scenario(page,mark);
   if(runtimeErrors.length)throw Error('UNHANDLED_BROWSER_ERROR');
   record.completedSessions=result.completedSessions;record.status='PASS';
  }catch(e){
   record.status=record.checkpoints.includes('login')?'FAIL':'BLOCKED';
   // Bounded proof, no page content, URLs, account details or credentials in reports.
   record.errors=[e.name==='AssertionError'?String(e.message).split('\n')[0].slice(0,160):e.name==='TimeoutError'?'TIMEOUT_AFTER_'+(record.checkpoints.at(-1)||'initialization'):String(e.message).match(/^[A-Z_]+$/)?.[0]||'SCENARIO_EXECUTION_ERROR'];
   console.log(JSON.stringify({type:'QA_STEP_FAILURE',id,stage:record.checkpoints.at(-1)||'initialization',error:record.errors[0]}));
  }finally{record.finishedAt=Date.now();await page.close();scenarios.push(record);console.log(JSON.stringify({type:'GAMEPLAY_SCENARIO',...record}));}
 }
}finally{await browser.close()}
const report={schemaVersion:1,observedAt:Date.now(),sourceRelease:identity.sourceRelease,sourceFingerprint:identity.sourceFingerprint,backend:'isolated-synthetic',scenarios};
writeFileSync('/reports/synthetic.json.tmp',JSON.stringify(report),{mode:0o600});renameSync('/reports/synthetic.json.tmp','/reports/synthetic.json');
console.log(JSON.stringify({type:'GAMEPLAY_REPORT',completedSessions:scenarios.reduce((n,s)=>n+s.completedSessions,0),statuses:scenarios.map(s=>[s.id,s.status])}));
