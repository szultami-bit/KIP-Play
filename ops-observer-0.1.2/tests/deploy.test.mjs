import test from 'node:test';
import assert from 'node:assert/strict';
import * as fs from 'node:fs';
import {join,resolve} from 'node:path';
import {tmpdir} from 'node:os';
import {spawnSync} from 'node:child_process';
import {runInNewContext} from 'node:vm';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url),root=resolve(new URL('..',import.meta.url).pathname);
function setup(t){
 const dir=fs.mkdtempSync(join(tmpdir(),'kip-deploy-'));t.after(()=>fs.rmSync(dir,{recursive:true,force:true}));
 const out=join(dir,'generated');const r=spawnSync(process.execPath,[join(root,'deploy/pack.mjs'),out],{encoding:'utf8'});assert.equal(r.status,0,r.stderr);
 fs.mkdirSync(join(dir,'code'));fs.mkdirSync(join(dir,'state'));const logs=[],ownership=[];
 const mapped=p=>typeof p==='string'&&/^\/(code|state)(\/|$)/.test(p)?join(dir,p):p;
 const adapter={...fs};for(const method of ['readFileSync','writeFileSync','mkdirSync','chmodSync','rmSync'])adapter[method]=(p,...args)=>fs[method](mapped(p),...args);
 adapter.chownSync=(p,uid,gid)=>{ownership.push([p,uid,gid]);};
 const execute=name=>{const compose=JSON.parse(fs.readFileSync(join(out,name+'.json')));const service=Object.values(compose.services)[0];runInNewContext(service.command[2],{require:id=>id==='fs'?adapter:require(id),Buffer,console:{log:x=>logs.push(JSON.parse(x))}},{timeout:5000});return compose;};
 return {dir,out,execute,logs,ownership};
}
test('generated upload and installer preserve exact source and set only own state ownership',t=>{
 const x=setup(t),receipt=JSON.parse(fs.readFileSync(join(x.out,'receipt.json')));
 for(let i=0;i<receipt.parts;i++)x.execute('upload-'+i);
 x.execute('install');assert.equal(x.logs.at(-1).sourceHash,receipt.sourceHash);assert.deepEqual(x.ownership,[['/state',1000,1000]]);
 for(const name of Object.keys(receipt.files))assert.deepEqual(fs.readFileSync(join(x.dir,'code',name)),fs.readFileSync(join(root,name)));
 assert.equal(fs.existsSync(join(x.dir,'code/parts')),false);
});
test('corrupt transferred bundle stops installation before source or state mutation',t=>{
 const x=setup(t),receipt=JSON.parse(fs.readFileSync(join(x.out,'receipt.json')));
 for(let i=0;i<receipt.parts;i++)x.execute('upload-'+i);
 fs.appendFileSync(join(x.dir,'code/parts/0'),'AAAA');assert.throws(()=>x.execute('install'),/Bundle mismatch/);
 assert.equal(x.ownership.length,0);assert.equal(fs.existsSync(join(x.dir,'code/config.json')),false);
});
test('runtime and QA manifests enforce dedicated volumes and bounded runtime without host access',t=>{
 const x=setup(t),runtime=JSON.parse(fs.readFileSync(join(x.out,'runtime.json'))),s=runtime.services.observer;
 assert.equal(s.user,'1000:1000');assert.equal(s.read_only,true);assert.equal(s.mem_limit,'128m');assert.equal(s.cpus,0.25);assert.deepEqual(s.cap_drop,['ALL']);assert.equal(s.ports,undefined);assert.equal(s.environment,undefined);assert.deepEqual(s.volumes,['code:/code:ro','state:/state']);
 for(const v of Object.values(runtime.volumes))assert.match(v.name,/^kip-ops-hybrid-20261031_/);
 const qa=JSON.parse(fs.readFileSync(join(x.out,'qa.json'))).services.qa;assert.equal(qa.network_mode,'none');assert.deepEqual(qa.volumes,['code:/code:ro']);
 for(const name of fs.readdirSync(x.out).filter(n=>/^(upload|install|qa|runtime)/.test(n)))assert.ok(fs.statSync(join(x.out,name)).size<=8192);
});
