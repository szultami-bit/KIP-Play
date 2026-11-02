import {mkdirSync,readFileSync,writeFileSync,existsSync,renameSync,readdirSync} from 'node:fs';
import {join,dirname} from 'node:path';
import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';
const root='/office-state/runtime',commit=process.env.RUNTIME_SOURCE_COMMIT,manifestHash=process.env.RUNTIME_MANIFEST_SHA;
if(!/^[a-f0-9]{40}$/.test(commit||'')||!/^[a-f0-9]{64}$/.test(manifestHash||''))throw Error('RUNTIME_IDENTITY_REQUIRED');
const hash=b=>createHash('sha256').update(b).digest('hex');
const base='https://raw.githubusercontent.com/szultami-bit/KIP-Play/'+commit+'/agent-office-0.19.0/';
async function download(path,sha){const r=await fetch(base+path,{signal:AbortSignal.timeout(20000)});if(!r.ok)throw Error('SOURCE_HTTP_'+r.status);const b=Buffer.from(await r.arrayBuffer());if(hash(b)!==sha)throw Error('SOURCE_HASH_MISMATCH');return b;}
const files=JSON.parse(await download('deploy/runtime-020-manifest.json',manifestHash));
if(!Array.isArray(files)||files.length>250)throw Error('BAD_RUNTIME_MANIFEST');
mkdirSync(root,{recursive:true,mode:0o750});
for(const f of files){if(!/^(campus\/src|src|dist|server|tests|scripts|public)\/[\w./-]+$|^package.json$/.test(f.path)||f.path.includes('..')||!/^[a-f0-9]{64}$/.test(f.sha))throw Error('BAD_RUNTIME_PATH');const p=join(root,f.path);if(existsSync(p)&&hash(readFileSync(p))===f.sha)continue;const b=await download(f.path,f.sha);mkdirSync(dirname(p),{recursive:true,mode:0o750});writeFileSync(p+'.tmp',b,{mode:0o640});renameSync(p+'.tmp',p);}
execFileSync(process.execPath,['--test','--test-concurrency=1',...readdirSync(join(root,'tests')).filter(f=>f.endsWith('.test.mjs')).map(f=>'tests/'+f)],{cwd:root,stdio:'inherit'});
writeFileSync(root+'/.ready',commit,{mode:0o640});
console.log(JSON.stringify({type:'RUNTIME_PREPARED',version:'0.20.0',commit,tests:'FULL_SUITE',executor:'PRIVATE_REPAIR_CLI'}));
