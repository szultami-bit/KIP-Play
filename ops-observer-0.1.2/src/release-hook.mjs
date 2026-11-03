// Internal deployment hook. Mount audited source read-only and observer state
// read-write. There is no public endpoint and no implicit live-hash approval.
import {readFileSync,lstatSync} from 'node:fs';
import {resolve} from 'node:path';
import {loadConfig} from './config.mjs';
import {loadBaseline,applyBaseline} from './baseline.mjs';
function read(file,max=524288){const s=lstatSync(file);if(!s.isFile()||s.isSymbolicLink()||s.size>max)throw Error('INVALID_EVIDENCE_FILE');return readFileSync(file,'utf8');}
try{
 const args=process.argv.slice(2);if(args.length!==2||!/^\/[a-zA-Z0-9_./-]+$/.test(args[0])||!(/^[a-f0-9]{40}$/).test(args[1]))throw Error('Usage: release-hook.mjs /audited/source FULL_RELEASE_SHA');
 const source=resolve(args[0]),base=loadConfig(),file='/state/approved-baseline.json';
 const audit=JSON.parse(read(resolve(source,'docs/releases/release-audit.json'))),generated=read(resolve(source,'server/generated/release-safety.mjs'));
 const match=generated.match(/^\/\/ Generated only after source review and passing mandatory tests\. Do not commit\.\nexport const releaseSafety = Object\.freeze\(([\s\S]+)\);\n$/);if(!match)throw Error('INVALID_BUILD_PROOF');
 const build=JSON.parse(match[1]),deployment=JSON.parse(read(resolve(source,'vps-build/deployment.json')));
 const input={schema:1,previous:loadBaseline(base,file).expected,release:args[1],audit,build,deployment};
 console.log(JSON.stringify({type:'APPROVED_RELEASE_BASELINE',...await applyBaseline({base,file,input})}));
}catch(error){console.error(JSON.stringify({type:'BASELINE_UPDATE_REFUSED',reason:String(error.message).slice(0,300)}));process.exitCode=1;}
