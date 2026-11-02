import {readFileSync} from 'node:fs';
import {makeRepairs} from '../server/repairs.mjs';
// Internal CLI, not an HTTP command endpoint. Requires the private state volume.
const allowed=new Set(['list','claim','heartbeat','result','retry']);
let store;
try{
 const [action,raw]=process.argv.slice(2);if(!allowed.has(action)||process.argv.length>4)throw Error('BAD_ACTION');
 const input=action==='list'?{}:JSON.parse(raw===undefined?readFileSync(0,'utf8'):raw);
 if(!input||typeof input!=='object'||Array.isArray(input)||JSON.stringify(input).length>20000)throw Error('BAD_INPUT');
 store=makeRepairs({path:process.env.OFFICE_REPAIRS_PATH||'/office-state/repairs.sqlite',automationId:process.env.OFFICE_REPAIR_AUTOMATION_ID});
 const result=store[action](input);console.log(JSON.stringify({type:'REPAIR_CLI',action,result}));
}catch(error){console.error(JSON.stringify({type:'REPAIR_CLI_ERROR',code:/^[A-Z_]+$/.test(error.code||'')?error.code:'REPAIR_REQUEST_FAILED'}));process.exitCode=1;}finally{store?.close();}
