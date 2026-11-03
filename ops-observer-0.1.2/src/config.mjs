import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
export const ORIGIN='https://games.kampunginggrispontianak.com';
export const CHECKS=Object.freeze({health:'/healthz',release:'/api/release-safety'});
export function validateConfig(c){
 assert.equal(c?.schema,1,'Unknown config schema');assert.equal(c.origin,ORIGIN,'Forbidden origin');
 assert.equal(c.intervalMs,300000,'Polling interval must be five minutes');
 assert.equal(c.timeoutMs,5000);assert.equal(c.maxBytes,65536);
 assert.ok(/^[a-f0-9]{40}$/.test(c.expected?.release));assert.ok(/^[a-f0-9]{64}$/.test(c.expected?.fingerprint));
 assert.ok(/^[a-f0-9]{64}$/.test(c.expected?.configurationFingerprint));assert.ok(/^[a-z0-9]{20}$/.test(c.expected?.projectRef));
 assert.ok(Array.isArray(c.checks)&&c.checks.length===2);
 assert.deepEqual(c.checks.map(x=>x.id).sort(),['health','release']);
 for(const check of c.checks)assert.equal(check.path,CHECKS[check.id],'Forbidden endpoint');
 return c;
}
export function loadConfig(path=new URL('../config.json',import.meta.url)){return validateConfig(JSON.parse(readFileSync(path,'utf8')));}
