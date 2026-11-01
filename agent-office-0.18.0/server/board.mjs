import {readFileSync,statSync,openSync,writeFileSync,fsyncSync,closeSync,renameSync,unlinkSync} from 'node:fs';
import {randomUUID} from 'node:crypto';

const IDS=['health','release'],MAX_AGE=605000;
export class BoardError extends Error {constructor(code,status=400){super(code);this.code=code;this.status=status;}}
const fresh=(at,now)=>Number.isSafeInteger(at)&&at>0&&at<=now&&now-at<=MAX_AGE;
export function canComplete(report,id,now){
 const checks=Array.isArray(report?.checks)?report.checks.filter(c=>c?.id===id):[];
 return report?.source==='observer'&&report.observer?.status==='HEALTHY'&&fresh(report.observer.lastCycleAt,now)&&checks?.length===1&&checks[0].status==='HEALTHY'&&checks[0].lastCode==='OK'&&fresh(checks[0].lastAt,now);
}
const empty=()=>({version:1,revision:0,reviews:{health:null,release:null}});
function validate(data){
 if(!data||data.version!==1||!Number.isSafeInteger(data.revision)||data.revision<0||!data.reviews||Object.keys(data.reviews).sort().join(',')!=='health,release')throw Error('Invalid state');
 for(const id of IDS){const r=data.reviews[id];if(r!==null&&(!r||typeof r.reviewing!=='boolean'||!Number.isSafeInteger(r.startedAt)||r.startedAt<=0||!Number.isSafeInteger(r.updatedAt)||r.updatedAt<r.startedAt))throw Error('Invalid review');}
 return data;
}
export function makeBoard({path,clock=Date.now}){
 if(!path)throw Error('OFFICE_BOARD_PATH_REQUIRED');
 function read(){try{if(statSync(path).size>8192)throw Error('Oversized state');return validate(JSON.parse(readFileSync(path,'utf8')));}catch(e){if(e.code==='ENOENT')return empty();throw new BoardError('BOARD_UNAVAILABLE',503);}}
 function write(data){
  const temp=path+'.'+randomUUID()+'.tmp';let fd;
  try{fd=openSync(temp,'wx',0o600);writeFileSync(fd,JSON.stringify(data));fsyncSync(fd);closeSync(fd);fd=undefined;renameSync(temp,path);}
  catch{throw new BoardError('BOARD_UNAVAILABLE',503);}finally{if(fd!==undefined)closeSync(fd);try{unlinkSync(temp);}catch{}}
 }
 function update(body,readReport){
  const {id,action,revision,resultAt}=body;
  if(!IDS.includes(id)||!['start','cancel','complete'].includes(action)||!Number.isSafeInteger(revision)||revision<0||Object.keys(body).some(k=>!['id','action','revision','resultAt'].includes(k)))throw new BoardError('BAD_BOARD_REQUEST');
  const data=read();if(data.revision!==revision)throw new BoardError('BOARD_CHANGED',409);
  const now=clock();if(action==='complete'){
   if(!data.reviews[id]?.reviewing)throw new BoardError('NOT_REVIEWING',409);
   let report;try{report=readReport();}catch{throw new BoardError('RESULT_NOT_VERIFIED',409);}
   if(!canComplete(report,id,now))throw new BoardError('RESULT_NOT_VERIFIED',409);
   if(resultAt!==report.checks.find(c=>c.id===id).lastAt)throw new BoardError('RESULT_CHANGED',409);
  }
  if(action==='start'&&data.reviews[id]?.reviewing)throw new BoardError('ALREADY_REVIEWING',409);
  if(action==='cancel'&&!data.reviews[id]?.reviewing)throw new BoardError('NOT_REVIEWING',409);
  data.reviews[id]={reviewing:action==='start',startedAt:action==='start'?now:data.reviews[id].startedAt,updatedAt:now};data.revision++;
  if(!Number.isSafeInteger(data.revision))throw new BoardError('BOARD_UNAVAILABLE',503);
  write(data);return data;
 }
 return {read,update};
}
