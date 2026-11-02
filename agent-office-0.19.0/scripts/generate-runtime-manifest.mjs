import{readdirSync,readFileSync,writeFileSync}from'node:fs';import{join}from'node:path';import{createHash}from'node:crypto';
const files=[];function walk(dir){for(const e of readdirSync(dir,{withFileTypes:true})){const p=join(dir,e.name);if(e.isDirectory())walk(p);else if(e.isFile())files.push(p);}}
for(const dir of ['campus/src','src','dist','server','tests'])walk(dir);
files.push('package.json','public/incident-client.js','scripts/repair-cli.mjs','scripts/ops-probe.mjs');
writeFileSync('deploy/runtime-020-manifest.json',JSON.stringify(files.sort().map(path=>({path,sha:createHash('sha256').update(readFileSync(path)).digest('hex')})),null,2)+'\n');
