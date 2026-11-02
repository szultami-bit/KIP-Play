import {backupRegistry} from '../server/registry-backup.mjs';
try{const receipt=backupRegistry({sourcePath:process.env.REGISTRY_SOURCE||'/source/skills.json',backupDirectory:process.env.REGISTRY_BACKUPS||'/backups/snapshots',restoreDirectory:process.env.REGISTRY_RESTORE||'/backups/restore-checks'});console.log(JSON.stringify({type:'REGISTRY_BACKUP_RESTORE',...receipt,status:'PASS',sourceMount:'read-only'}));}
catch(error){console.error(JSON.stringify({type:'REGISTRY_BACKUP_RESTORE',status:'FAIL',code:error.code||error.message}));process.exitCode=1;}
