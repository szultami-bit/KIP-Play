import {TaskError,REQUEST_ID} from './tasks.mjs';
export const INCIDENT_FIELDS=['eventId','game','mode','release','kind','errorClass','asset','line','column'];
export const INCIDENT_ASSETS=['unknown','app.mjs','screen.mjs','live.mjs','model.mjs','view.mjs','screen-view.mjs','effects.mjs','game-session.js','account-bridge.js'];
export const INCIDENT_ERRORS=['TypeError','ReferenceError','SyntaxError','RangeError','Error','UnhandledRejection','ResourceError'];
export function normalizeIncident(body){
 if(!body||Array.isArray(body)||Object.keys(body).length!==INCIDENT_FIELDS.length||!INCIDENT_FIELDS.every(k=>Object.hasOwn(body,k))||!REQUEST_ID.test(body.eventId)||body.game!=='lucky-wheel'||!['screen','live'].includes(body.mode)||body.release!=='019-pilot-1'||!['runtime','unhandled','resource'].includes(body.kind)||!INCIDENT_ERRORS.includes(body.errorClass)||!INCIDENT_ASSETS.includes(body.asset)||!['line','column'].every(k=>Number.isSafeInteger(body[k])&&body[k]>=0&&body[k]<=10000000))throw new TaskError('BAD_INCIDENT');
 return Object.fromEntries(INCIDENT_FIELDS.map(k=>[k,body[k]]));
}
