import {mkdirSync,cpSync,readFileSync,writeFileSync,existsSync,readdirSync} from 'node:fs';
import {dirname} from 'node:path';
import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';
const commit=process.env.TEAM_COMMIT,expected=process.env.TEAM_MANIFEST_SHA;
if(!/^[a-f0-9]{40}$/.test(commit||'')||!/^[a-f0-9]{64}$/.test(expected||''))throw Error('IDENTITY_REQUIRED');
const root='/out/runtime',hash=b=>createHash('sha256').update(b).digest('hex');
const base='https://raw.githubusercontent.com/szultami-bit/KIP-Play/'+commit+'/agent-office-0.19.0/';
async function get(path,sha){const r=await fetch(base+path,{signal:AbortSignal.timeout(20000)});if(!r.ok)throw Error('SOURCE_HTTP_'+r.status);const b=Buffer.from(await r.arrayBuffer());if(hash(b)!==sha)throw Error('SOURCE_HASH_MISMATCH');return b;}
if(existsSync(root+'/.ready')&&readFileSync(root+'/.ready','utf8')===commit){console.log('TEAM_RUNTIME_ALREADY_READY');process.exit(0);}
if(readFileSync('/base/runtime/.ready','utf8')!=='84c336d638ea4fcd3122fb437a9ce9e7cf713e7d')throw Error('BASE_RUNTIME_CHANGED');
mkdirSync(root,{recursive:true});cpSync('/base/runtime',root,{recursive:true});
const files=JSON.parse(await get('deploy/team-overlay.json',expected));
for(const f of files){if(!/^(campus|src|dist|server|tests|scripts|public|docs)\/[\w./-]+$|^package(-lock)?\.json$/.test(f.path)||f.path.includes('..'))throw Error('BAD_PATH');const b=await get(f.path,f.sha);mkdirSync(dirname(root+'/'+f.path),{recursive:true});writeFileSync(root+'/'+f.path,b);}
execFileSync(process.execPath,['--test','--test-concurrency=1',...readdirSync(root+'/tests').filter(n=>n.endsWith('.test.mjs')).map(n=>'tests/'+n)],{cwd:root,stdio:'inherit'});
writeFileSync(root+'/.ready',commit);console.log(JSON.stringify({type:'TEAM_RUNTIME_READY',version:'0.21.0',commit}));
