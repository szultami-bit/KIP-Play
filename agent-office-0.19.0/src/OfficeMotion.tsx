import React,{useEffect,useState} from 'react';
import {Character} from './Avatar';

export type MotionRun={id:number;reason:'report'|'preview';roles:readonly string[]};
export const MOTION_DURATION=9000;
type Frame={x:number;y:number;phase:'idle'|'walking'|'working';duration:number};
const rest:Frame={x:0,y:0,phase:'idle',duration:0};

// Short, bounded visual tours stay inside the infrastructure room.
// The route is presentation only; it never executes an agent task.
export function TravelingCharacter({id,run}:{id:string;run:MotionRun|null}){
 const [frame,setFrame]=useState<Frame>(rest);
 useEffect(()=>{
  setFrame(rest);
  if(!run?.roles.includes(id))return;
  const release=id==='release',delay=release?900:0;
  const corner=release?[15.6,48]:[-7.8,36],server=release?[-74.1,102]:[-19.5,126];
  const steps:[number,Frame][]=[
   [delay,{x:corner[0],y:corner[1],phase:'walking',duration:1200}],
   [delay+1200,{x:server[0],y:server[1],phase:'walking',duration:1800}],
   [delay+3000,{x:server[0],y:server[1],phase:'working',duration:0}],
   [delay+4800,{x:corner[0],y:corner[1],phase:'walking',duration:1800}],
   [delay+6600,{x:0,y:0,phase:'walking',duration:1200}],
   [delay+7800,rest]
  ];
  const timers=steps.map(([at,next])=>window.setTimeout(()=>setFrame(next),at));
  return()=>timers.forEach(clearTimeout);
 },[run?.id,id]);
 return <g className={'agent-traveler '+frame.phase} data-phase={frame.phase} data-traveler={id} aria-hidden="true" style={{transform:`translate(${frame.x}px, ${frame.y}px)`,transition:frame.duration?`transform ${frame.duration}ms linear`:'none'}}>
  <ellipse className="work-ripple" cy="5" rx="37" ry="17" fill="none" stroke={id==='health'?'#70e4ed':'#b7a1f3'} strokeWidth="2"/>
  <g className="character"><Character id={id}/></g>
 </g>;
}
