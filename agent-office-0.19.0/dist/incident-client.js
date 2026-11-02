/* Lucky Wheel incident pilot: bounded enum-only observations, no messages or stacks. */
(()=>{
 'use strict';
 const endpoint='https://agent-staging.kampunginggrispontianak.com/api/incidents';
 const script=document.currentScript;
 if(script?.dataset.officeIncidents!=='019-pilot-1'||location.pathname!=='/games/lucky-wheel/'&&location.pathname!=='/games/lucky-wheel/index.html')return;
 const query=new URLSearchParams(location.search),mode=query.get('mode')==='screen'?'screen':['code','join','studio','host'].some(k=>query.has(k))?'live':null;
 if(!mode||!globalThis.crypto?.randomUUID||!globalThis.AbortController)return;
 const errors=['TypeError','ReferenceError','SyntaxError','RangeError','Error'];
 const names=['app.mjs','screen.mjs','live.mjs','model.mjs','view.mjs','screen-view.mjs','effects.mjs'];
 const seen=new Set(),active=new Map();let sent=0,disposed=false;
 const coordinate=n=>Number.isSafeInteger(n)&&n>=0&&n<=10000000?n:0;
 function asset(value){try{const u=new URL(value,location.href);if(u.origin!==location.origin)return 'unknown';for(const name of names)if(u.pathname==='/games/lucky-wheel/'+name)return name;for(const name of ['game-session.js','account-bridge.js'])if(u.pathname==='/assets/js/'+name)return name;}catch{}return 'unknown';}
 function cancel(){for(const [controller,timer]of active){clearTimeout(timer);controller.abort();}active.clear();}
 function report(kind,errorClass,path,line=0,column=0){
  if(disposed||document.hidden||navigator.onLine===false||document.getElementById('result-title')||sent>=3)return;
  const body={game:'lucky-wheel',mode,release:'019-pilot-1',kind,errorClass,asset:asset(path),line:coordinate(line),column:coordinate(column)},key=JSON.stringify(body);
  if(seen.has(key))return;seen.add(key);sent++;
  const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),5000);active.set(controller,timer);
  const finish=()=>{clearTimeout(timer);active.delete(controller);};
  try{Promise.resolve(fetch(endpoint,{method:'POST',credentials:'omit',mode:'cors',cache:'no-store',referrerPolicy:'no-referrer',headers:{'Content-Type':'application/json'},body:JSON.stringify({eventId:crypto.randomUUID(),...body}),signal:controller.signal})).catch(()=>{}).finally(finish);}catch{finish();}
 }
 function error(event){if(event.target&&event.target!==globalThis){report('resource','ResourceError',event.target.src||event.target.href);return;}report('runtime',errors.includes(event.error?.name)?event.error.name:'Error',event.filename,event.lineno,event.colno);}
 function rejection(event){report('unhandled',errors.includes(event.reason?.name)?event.reason.name:'UnhandledRejection','');}
 const visible=()=>{if(document.hidden)cancel();};
 function dispose(){disposed=true;cancel();removeEventListener('error',error,true);removeEventListener('unhandledrejection',rejection);removeEventListener('offline',cancel);document.removeEventListener('visibilitychange',visible);}
 addEventListener('error',error,true);addEventListener('unhandledrejection',rejection);addEventListener('offline',cancel);document.addEventListener('visibilitychange',visible);addEventListener('pagehide',dispose,{once:true});
})();
