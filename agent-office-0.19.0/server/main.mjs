import {fileURLToPath} from 'node:url';
import {makeReader,unavailable} from './report.mjs';
import {makeServer} from './http.mjs';
import {makeBoard} from './board.mjs';
import {makeAuth} from './auth.mjs';
import {makeRolesReader} from './roles.mjs';
import {makeGrowthReader} from './growth.mjs';
import {makeSkills} from './skills.mjs';
import {makeTasks} from './tasks.mjs';
import {makeTaskWorker} from './task-worker.mjs';
const auth=makeAuth({origin:process.env.OFFICE_ORIGIN,supabaseUrl:process.env.OFFICE_SUPABASE_URL,publishableKey:process.env.OFFICE_PUBLISHABLE_KEY,allowedEmail:process.env.OFFICE_ALLOWED_EMAIL,allowedUserId:process.env.OFFICE_ALLOWED_USER_ID});
let readReport;try{readReport=await makeReader({modulePath:process.env.OBSERVER_MODULE,statePath:process.env.OBSERVER_STATE,snapshotPath:process.env.OFFICE_SNAPSHOT});}catch{readReport=()=>unavailable();}
const readRoles=makeRolesReader({registryPath:process.env.OFFICE_ROLES_PATH||'/role-data/roles.json',capacityPath:process.env.OFFICE_CAPACITY_PATH||'/capacity/latest.json',readReport});
const readGrowth=makeGrowthReader({load:req=>auth.growthSummary(req)});
const skills=makeSkills({path:process.env.OFFICE_SKILLS_PATH||'/office-state/skills.json'});
const tasks=makeTasks({path:process.env.OFFICE_TASKS_PATH||'/office-state/tasks.sqlite'});
const worker=makeTaskWorker({tasks,skills,readRoles,readGrowthSnapshot:()=>readGrowth.snapshot(),onError:code=>console.error(JSON.stringify({type:code}))});
worker.start();
const server=makeServer({directory:process.env.OFFICE_DIST||fileURLToPath(new URL('../dist',import.meta.url)),readReport,readRoles,readGrowth,auth,board:makeBoard({path:process.env.OFFICE_BOARD_PATH}),skills,tasks});
server.maxConnections=60;
server.listen(Number(process.env.PORT||3180),process.env.HOST||'0.0.0.0',()=>console.log(JSON.stringify({type:'OFFICE_READY',mode:'read-only-task-worker',modelApi:'NOT_USED'})));
for(const signal of ['SIGINT','SIGTERM'])process.once(signal,()=>{worker.stop();server.close(()=>{tasks.close();process.exit(0);});});

