import {robotRoster} from './robot-roster.js';
// One reversible route per character: desk → corridor → both glass stair flights → Play Club.
const H=4.6;
export function agentRoute(id){
 const robot=robotRoster.find(r=>r.id===id);if(!robot)throw Error('Unknown robot');
 const [x,,z]=robot.desk;
 const aisle=['security','backup'].includes(id)?[[-4.8,0,z],[-4.8,0,0]]:['growth','growth-stats','instagram-admin'].includes(id)?[[x,0,8.8],[4.8,0,8.8],[4.8,0,2],[8.4,0,2],[8.4,0,0]]:['payments','support'].includes(id)?[[4.8,0,z],[4.8,0,2],[8.4,0,2],[8.4,0,0]]:id==='qa'?[[8.4,0,z],[8.4,0,0]]:z>0?[[x+1.2,0,z],[x+1.2,0,0]]:[[x,0,0]];
 const points=[[x,0,z],...aisle,[-13.6,0,0],[-16.5,0,.7],[-16.5,0,0]];
 for(let level=0;level<2;level++){
  const y=level*H;
  points.push([-16.5,y+H/2,-4.2],[-16.5,y+H/2,-4.85],[-14.4,y+H/2,-4.85],[-14.4,y+H/2,-4.2],[-14.4,y+H,0],[-14.4,y+H,.7]);
  if(level===0)points.push([-16.5,H,.7],[-16.5,H,0]);
 }
 points.push([-13.6,2*H,.7],[-12.5,2*H,.6]);
 if(id==='health'||id==='release'){points.push([-7.2,2*H,.6],[-7.2,2*H,3.4]);points.push(...(id==='health'?[[-5.25,2*H,3.4]]:[[-10.4,2*H,3.4],[-10.4,2*H,5.5]]));}
 else{const peers=robotRoster.filter(r=>!['health','release'].includes(r.id)),index=peers.findIndex(r=>r.id===id),restX=Math.round((-11.7+index*23.4/(peers.length-1))*100)/100;points.push([restX,2*H,.6],[restX,2*H,0]);}

 const lengths=points.slice(1).map((p,i)=>Math.hypot(...p.map((v,j)=>v-points[i][j])));
 return {points,lengths,length:lengths.reduce((a,b)=>a+b,0)};
}
export function pointOnRoute(route,distance,direction=1){
 let d=Math.max(0,Math.min(route.length,distance)),i=0;
 while(i<route.lengths.length-1&&d>route.lengths[i])d-=route.lengths[i++];
 const a=route.points[i],b=route.points[i+1],u=d/route.lengths[i];
 return {position:distance>=route.length?[...route.points.at(-1)]:a.map((v,j)=>v+(b[j]-v)*u),rotation:Math.atan2((b[0]-a[0])*direction,(b[2]-a[2])*direction)};
}
export function createMotion(id){
 const route=agentRoute(id);let distance=0,goal=0,lastAt=0,initialized=false,review=false,reviewLeft=0,rest=false,phase='waiting',enjoyLeft=0,paused=false;
 function update(view){
  const newer=initialized&&view.lastAt>lastAt;
  if(view.canRest&&view.lastAt)lastAt=Math.max(lastAt,view.lastAt);
  rest=view.canRest;
  if(!rest){goal=0;review=false;reviewLeft=0;}
  else if(newer){review=true;reviewLeft=4;goal=0;}
  else if(!review)goal=route.length;
  if(view.canRest)initialized=true;
 }
 function step(dt,{snap=false,pause=false}={}){
  paused=pause;
  if(snap){review=false;reviewLeft=0;goal=rest?route.length:0;distance=goal;}
  const direction=goal>=distance?1:-1;
  if(!pause&&!snap){
   distance+=direction*Math.min(Math.abs(goal-distance),Math.max(0,Math.min(dt,.25))*4);
   if(distance===0&&review){reviewLeft-=dt;if(reviewLeft<=0){review=false;goal=rest?route.length:0;}}
  }
  const priorPhase=phase;
  phase=distance!==goal?(goal===0?'returning':'ascending'):review?'reviewing':rest?'resting':'waiting';
  if(snap||phase!=='resting')enjoyLeft=0;else if(priorPhase!=='resting')enjoyLeft=6;else if(!pause)enjoyLeft=Math.max(0,enjoyLeft-dt);
  const point=pointOnRoute(route,distance,direction);
  if(phase==='resting')point.rotation=id==='health'?Math.PI:Math.PI/2;
  if(distance===0)point.rotation=Math.PI;
  return {...point,phase,paused,enjoying:!pause&&enjoyLeft>0,active:!pause&&(distance!==goal||review||enjoyLeft>0),moving:!pause&&distance!==goal,
   level:distance===route.length?2:Math.min(2,Math.floor((point.position[1]+.01)/H))};
 }
 return {update,step,route};
}
