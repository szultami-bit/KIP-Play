import React from 'react';
import {getRole} from './roles';
export function Avatar({id,large=false}:{id:string;large?:boolean}){return <svg viewBox="-40 -111 80 121" className={large?'avatar large':'avatar'} aria-hidden="true"><Character id={id}/></svg>;}
export function Character({id}:{id:string}){const {accent:color,look}=getRole(id);const {hair,skin,style,accessory}=look;return <g className="avatar-figure">
 <ellipse cy="4" rx="25" ry="7" fill="#050c20" opacity=".3"/>
 <g className="avatar-leg leg-left"><path d="M-13-19-16 1-4 2 0-19" fill="#243451"/><path d="M-17-3-19 4Q-11 9-3 5L-4-3" fill="#c4d4e9"/></g>
 <g className="avatar-leg leg-right"><path d="M3-19 5 1 18 1 14-20" fill="#243451"/><path d="M5-3 4 4Q13 9 22 4L17-3" fill="#c4d4e9"/></g>
 <g className="avatar-upper">
 {style==='long'&&<path d="M-24-76Q-30-37-19-30L24-36Q28-64 23-84Z" fill={hair}/>}
 <g className="avatar-arm arm-left"><path d="M-21-48Q-28-44-26-23L-16-21-13-41" fill={color}/><circle cx="-24" cy="-23" r="7" fill={skin}/></g>
 <g className="avatar-arm arm-right"><path d="M19-48Q28-42 28-26L17-23 13-40" fill={color}/><circle cx="25" cy="-24" r="7" fill={skin}/></g>
 <path d="M-19-50Q0-63 20-50L17-19Q-2-11-19-21Z" fill={color}/><path d="M10-50 20-50 17-19 8-17Z" fill="#1a2855" opacity=".25"/>
 <path d="M-8-51-1-39 8-52" fill="#e6f6ff"/><path d="M-1-39-1-17" stroke="#17365c" opacity=".35"/>
 {accessory==='tie'?<path d="m-1-46 4 6-1 19-5-2 1-17-3-5Z" fill="#253650"/>:<rect x="6" y="-37" width="9" height="8" rx="2" fill="#edf7ff" opacity=".8"/>}
 <rect x="-7" y="-64" width="14" height="14" rx="5" fill={skin}/><ellipse cy="-76" rx="23" ry="24" fill={skin}/>
 <path d="M-23-73Q-32-104 1-103Q30-104 25-75L18-77 16-88Q2-84-9-91L-18-76Z" fill={hair}/>
 {style==='curly'?<g fill={hair}>{[[-18,-94],[-8,-102],[4,-103],[17,-96]].map(([x,y],i)=><circle key={i} cx={x} cy={y} r="10"/>)}</g>:<path d="M-18-93Q-4-111 18-95L8-88-4-90Z" fill="#ffffff" opacity=".12"/>}
 {style==='long'&&<path d="M-22-85Q-30-65-20-51L-15-76M18-89Q30-67 20-51L17-78" fill={hair}/>}
 <ellipse cx="-8" cy="-74" rx="2.4" ry="3.2" fill="#2b2633"/><ellipse cx="10" cy="-74" rx="2.4" ry="3.2" fill="#2b2633"/>
 <path d="M-4-63Q2-59 7-64" fill="none" stroke="#8b5341" strokeWidth="2" strokeLinecap="round"/>
 {accessory==='glasses'&&<g fill="none" stroke="#314664" strokeWidth="2.5"><rect x="-16" y="-81" width="14" height="12" rx="4"/><rect x="4" y="-81" width="14" height="12" rx="4"/><path d="M-2-77H4"/></g>}
 {accessory==='headset'&&<g><path d="M-26-74V-84Q0-113 26-84V-73" fill="none" stroke={color} strokeWidth="4"/><rect x="-29" y="-80" width="8" height="16" rx="4" fill="#334868"/><rect x="23" y="-80" width="8" height="16" rx="4" fill="#334868"/><path d="M26-65Q24-54 11-57" fill="none" stroke="#334868" strokeWidth="3"/></g>}
 {accessory==='cap'&&<g><path d="M-24-89Q-23-111 1-110Q26-109 26-88Z" fill={color}/><path d="M-23-89Q5-98 34-87Q28-81 20-85Q0-90-23-85Z" fill="#465975"/><path d="M1-107V-95" stroke="#fff" opacity=".4"/></g>}
 </g></g>;}
