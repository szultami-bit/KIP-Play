import {mkdirSync,writeFileSync,readFileSync,readdirSync,lstatSync,chownSync,chmodSync,existsSync} from 'node:fs';
import {dirname,join} from 'node:path';
import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';
const commit=process.env.OPS_COMMIT,digest=process.env.OPS_MANIFEST_SHA,root='/out';
if(!/^[a-f0-9]{40}$/.test(commit||'')||!/^[a-f0-9]{64}$/.test(digest||''))throw Error('IDENTITY_REQUIRED');
const sha=b=>createHash('sha256').update(b).digest('hex');
async function get(path,hash){const r=await fetch(`https://raw.githubusercontent.com/szultami-bit/KIP-Play/${commit}/ops-observer-0.1.2/${path}`,{redirect:'error',signal:AbortSignal.timeout(20000)});if(!r.ok)throw Error('SOURCE_HTTP');const b=Buffer.from(await r.arrayBuffer());if(sha(b)!==hash)throw Error('SOURCE_HASH');return b;}
if(existsSync(root+'/.ready')){if(readFileSync(root+'/.ready','utf8')===commit)process.exit(0);throw Error('OUTPUT_ALREADY_USED');}
const raw=await get('deploy/source-manifest.json',digest),manifest=JSON.parse(raw);
for(const [p,hash] of Object.entries(manifest)){if(!/^(?:package\.json|config\.json|deploy\/pack\.mjs|(?:src|tests)\/[\w-]+\.mjs)$/.test(p)||p.includes('..'))throw Error('BAD_SOURCE_PATH');const out=join(root,p);mkdirSync(dirname(out),{recursive:true});writeFileSync(out,await get(p,hash));}
writeFileSync(root+'/manifest.json',raw);
execFileSync(process.execPath,['--test','--test-concurrency=1',...readdirSync(root+'/tests').filter(n=>n.endsWith('.test.mjs')).map(n=>'tests/'+n)],{cwd:root,stdio:'inherit'});
writeFileSync(root+'/.ready',commit);
function perms(p){const s=lstatSync(p);if(s.isSymbolicLink())throw Error('SYMLINK_REFUSED');chownSync(p,1000,1000);chmodSync(p,s.isDirectory()?0o750:0o640);if(s.isDirectory())for(const n of readdirSync(p))perms(join(p,n));}perms(root);
console.log(JSON.stringify({type:'OBSERVER_READY',commit,sourceHash:digest}));
