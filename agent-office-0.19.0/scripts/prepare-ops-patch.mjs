import {mkdirSync,cpSync,readFileSync,writeFileSync,existsSync,readdirSync,lstatSync,chownSync,chmodSync} from 'node:fs';
import {dirname,join} from 'node:path';
import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';
const commit=process.env.PATCH_COMMIT,expected=process.env.PATCH_MANIFEST_SHA,base='/base/runtime',root='/out/runtime';
if(!/^[a-f0-9]{40}$/.test(commit||'')||!/^[a-f0-9]{64}$/.test(expected||''))throw Error('IDENTITY_REQUIRED');
const sha=b=>createHash('sha256').update(b).digest('hex');
async function get(path,digest){const r=await fetch(`https://raw.githubusercontent.com/szultami-bit/KIP-Play/${commit}/agent-office-0.19.0/${path}`,{signal:AbortSignal.timeout(20000)});if(!r.ok)throw Error('SOURCE_HTTP_'+r.status);const b=Buffer.from(await r.arrayBuffer());if(sha(b)!==digest)throw Error('SOURCE_HASH_MISMATCH');return b;}
const manifest=JSON.parse(await get('deploy/ops-patch-manifest.json',expected));
const valid=p=>/^(server|scripts|tests|dist|public|src|campus|docs)\/[\w./-]+$|^package(-lock)?\.json$/.test(p)&&!p.includes('..');
if(!Array.isArray(manifest.files)||manifest.files.length>200)throw Error('BAD_MANIFEST');
for(const [p,digest] of Object.entries(manifest.baseFiles)){if(!valid(p)||sha(readFileSync(join(base,p)))!==digest)throw Error('BASE_CHANGED:'+p);}
if(existsSync(root+'/.ready')){if(readFileSync(root+'/.ready','utf8')===commit){console.log('PATCH_ALREADY_READY');process.exit(0);}throw Error('OUTPUT_NOT_EMPTY');}
mkdirSync(root,{recursive:true});cpSync(base,root,{recursive:true});
for(const f of manifest.files){if(!valid(f.path))throw Error('BAD_PATH');const p=join(root,f.path);mkdirSync(dirname(p),{recursive:true});writeFileSync(p,await get(f.path,f.sha));}
execFileSync(process.execPath,['--test','--test-concurrency=1',...readdirSync(root+'/tests').filter(n=>n.endsWith('.test.mjs')).map(n=>'tests/'+n)],{cwd:root,stdio:'inherit'});
writeFileSync(root+'/.ready',commit);
function permissions(p){const st=lstatSync(p);if(st.isSymbolicLink())throw Error('SYMLINK_NOT_ALLOWED');chownSync(p,1000,1000);chmodSync(p,st.isDirectory()?0o750:0o640);if(st.isDirectory())for(const n of readdirSync(p))permissions(join(p,n));}
permissions('/out');
console.log(JSON.stringify({type:'OPS_PATCH_READY',commit,version:JSON.parse(readFileSync(root+'/package.json')).version}));
