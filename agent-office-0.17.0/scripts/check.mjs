import {mkdtempSync,cpSync,writeFileSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {spawnSync} from 'node:child_process';
const root=fileURLToPath(new URL('../',import.meta.url)),dir=mkdtempSync(join(tmpdir(),'kip017-release-'));
try{
 cpSync(join(root,'test-support'),dir,{recursive:true});cpSync(join(root,'overlay'),dir,{recursive:true});cpSync(join(root,'tests'),join(dir,'tests'),{recursive:true});writeFileSync(join(dir,'package.json'),'{"type":"module"}');
 const result=spawnSync(process.execPath,['--test','tests/skills.test.mjs','tests/skills-dom.test.mjs','tests/skills-http.test.mjs','tests/skill-model.test.mjs'],{cwd:dir,stdio:'inherit'});process.exitCode=result.status??1;
}finally{rmSync(dir,{recursive:true,force:true});}
