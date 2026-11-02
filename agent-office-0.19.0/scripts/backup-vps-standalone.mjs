import {openSync,closeSync,readSync,writeFileSync,fsyncSync,fstatSync,mkdirSync,renameSync,realpathSync,constants} from 'node:fs';
import {join,dirname,resolve} from 'node:path';
import {createHash,randomUUID} from 'node:crypto';
import {makeSkills} from '/runtime-code/runtime/server/skills.mjs';
const MAX_BYTES=2097152;
const hash=bytes=>createHash('sha256').update(bytes).digest('hex');
function readBounded(path){
 let fd;try{fd=openSync(path,constants.O_RDONLY|constants.O_NOFOLLOW|constants.O_NONBLOCK);const s=fstatSync(fd);if(!s.isFile()||s.size<2||s.size>MAX_BYTES)throw Error('INVALID_REGISTRY');const b=Buffer.alloc(MAX_BYTES+1);let n=0,c;while(n<b.length&&(c=readSync(fd,b,n,b.length-n,null))>0)n+=c;if(n>MAX_BYTES)throw Error('REGISTRY_TOO_LARGE');return b.subarray(0,n);}finally{if(fd!==undefined)closeSync(fd);}
}
function directory(path){mkdirSync(path,{recursive:true,mode:0o700});if(realpathSync(path)!==resolve(path))throw Error('SYMLINK_DIRECTORY');}
function syncDirectory(path){const fd=openSync(path,'r');try{fsyncSync(fd);}finally{closeSync(fd);}}
function exclusive(path,bytes){const fd=openSync(path,constants.O_WRONLY|constants.O_CREAT|constants.O_EXCL|constants.O_NOFOLLOW,0o600);try{writeFileSync(fd,bytes);fsyncSync(fd);}finally{closeSync(fd);}syncDirectory(dirname(path));}
function parse(bytes){const d=JSON.parse(bytes);if(d?.schemaVersion!==2||!Number.isSafeInteger(d.revision)||d.revision<0||!Array.isArray(d.agents)||!Array.isArray(d.skills)||!d.agents.some(a=>a.id==='instagram-admin'))throw Error('INVALID_REGISTRY');return d;}
export function restoreRegistry({snapshotPath,sha256,targetPath}){
 const bytes=readBounded(snapshotPath);if(!/^[a-f0-9]{64}$/.test(sha256)||hash(bytes)!==sha256)throw Error('BACKUP_HASH_MISMATCH');parse(bytes);directory(dirname(targetPath));exclusive(targetPath,bytes);
 // Full registry validation runs only on the new isolated copy, never the live source.
 makeSkills({path:targetPath}).read();if(hash(readBounded(targetPath))!==sha256)throw Error('RESTORE_CHANGED_REGISTRY');return {restored:true,sha256};
}
export function backupRegistry({sourcePath,backupDirectory,restoreDirectory,clock=Date.now}){
 const bytes=readBounded(sourcePath),state=parse(bytes),id=new Date(clock()).toISOString().replace(/[:.]/g,'-')+'-'+randomUUID(),sha256=hash(bytes);
 directory(backupDirectory);directory(restoreDirectory);const temporary=join(backupDirectory,'.'+id),final=join(backupDirectory,id);mkdirSync(temporary,{mode:0o700});exclusive(join(temporary,'skills.json'),bytes);
 restoreRegistry({snapshotPath:join(temporary,'skills.json'),sha256,targetPath:join(restoreDirectory,id,'skills.json')});
 const receipt={schemaVersion:1,id,at:clock(),sha256,bytes:bytes.length,revision:state.revision,agents:state.agents.length,skills:state.skills.length,restored:true};
 exclusive(join(temporary,'receipt.json'),JSON.stringify(receipt)+'\n');renameSync(temporary,final);syncDirectory(backupDirectory);return receipt;
}

console.log(JSON.stringify({type:'REGISTRY_BACKUP_RESTORE',status:'PASS',sourceMount:'read-only',...backupRegistry({sourcePath:'/source/skills.json',backupDirectory:'/backups/snapshots',restoreDirectory:'/backups/restore-checks'})}));
