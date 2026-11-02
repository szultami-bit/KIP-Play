import {robotRoster} from './robot-roster.js';
import * as T from 'three';
import {createMotion} from './agent-motion.js';
import {SVGRenderer} from 'three/addons/renderers/SVGRenderer.js';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import {mergeGeometries} from 'three/addons/utils/BufferGeometryUtils.js';
import {rooms} from './data.js';
import {buildAmenities} from './amenities.js';
import {buildStairCore,FLOOR_HEIGHT} from './staircase.js';
import {buildLandscape} from './landscape.js';

export function createOffice(container,{onPick,onAgentPick,onAgentMove,onError}){
 let renderer,software=false;
 try{renderer=new T.WebGLRenderer({antialias:true,alpha:false,powerPreference:'low-power'})}catch{software=true;renderer=new SVGRenderer();renderer.setPrecision(1);renderer.setQuality('high');renderer.setPixelRatio=()=>{};renderer.shadowMap={};renderer.capabilities={getMaxAnisotropy:()=>1};renderer.dispose=()=>{}}
 renderer.setPixelRatio(Math.min(devicePixelRatio,1.5));renderer.outputColorSpace=T.SRGBColorSpace;
 renderer.toneMapping=T.ACESFilmicToneMapping;renderer.toneMappingExposure=1.13;
 renderer.shadowMap.enabled=true;renderer.shadowMap.type=T.PCFSoftShadowMap;renderer.shadowMap.autoUpdate=false;
 container.appendChild(renderer.domElement);
 const scene=new T.Scene();scene.background=new T.Color('#d8d9cd');scene.fog=new T.Fog('#d8d9cd',70,130);
 const camera=new T.PerspectiveCamera(33,1,.1,700);
 const controls=new OrbitControls(camera,renderer.domElement);controls.enableDamping=!software;controls.dampingFactor=.1;
 controls.minDistance=10;controls.maxDistance=420;controls.minPolarAngle=.28;controls.maxPolarAngle=1.34;controls.enablePan=false;
 controls.zoomToCursor=false;controls.mouseButtons.RIGHT=T.MOUSE.ROTATE;
 const hemi=new T.HemisphereLight('#e9f4ff','#8d7860',2.5);scene.add(hemi);
 const sun=new T.DirectionalLight('#ffe5c3',3.2);sun.position.set(-14,30,12);sun.castShadow=true;
 Object.assign(sun.shadow.camera,{left:-22,right:22,top:23,bottom:-23,near:1,far:90});sun.shadow.mapSize.set(2048,2048);sun.shadow.normalBias=.035;sun.shadow.bias=-.0002;sun.shadow.radius=3;scene.add(sun);
 const fill=new T.DirectionalLight('#e3eaff',1.1);const ambient=new T.AmbientLight('#cfd5bb',software?.65:0);scene.add(ambient);if(software){sun.intensity=.72;fill.intensity=.3}fill.position.set(20,10,-15);scene.add(fill);
 const boxGeo=new T.BoxGeometry(1,1,1),cylGeo=new T.CylinderGeometry(1,1,1,16),leafGeo=new T.SphereGeometry(1,10,6);
 const woodCanvas=document.createElement('canvas');woodCanvas.width=128;woodCanvas.height=512;
 const wx=woodCanvas.getContext('2d');let randSeed=2026;const rand=()=>{randSeed=(randSeed*1664525+1013904223)>>>0;return randSeed/4294967296};
 wx.fillStyle='#936b48';wx.fillRect(0,0,128,512);
 for(let i=0;i<230;i++){wx.strokeStyle=`rgba(${i%3?48:225},${i%3?30:184},${i%3?20:130},${rand()*.23+.025})`;wx.lineWidth=rand()*1.3+.2;wx.beginPath();const x=rand()*128;wx.moveTo(x,0);for(let y=0;y<=512;y+=25)wx.lineTo(x+Math.sin(y*.018+i)*1.8,y);wx.stroke()}
 const woodMap=new T.CanvasTexture(woodCanvas);woodMap.colorSpace=T.SRGBColorSpace;woodMap.wrapS=woodMap.wrapT=T.RepeatWrapping;woodMap.anisotropy=Math.min(4,renderer.capabilities.getMaxAnisotropy());
 const mat=(color,roughness=.75,metalness=0)=>new T.MeshStandardMaterial({color,roughness,metalness});
 const m={wood:new T.MeshStandardMaterial({map:woodMap,color:'#c89f7e',roughness:.68}),darkWood:new T.MeshStandardMaterial({map:woodMap,color:'#886548',roughness:.8}),charcoal:mat('#303b35'),frame:mat('#24322d',.4,.28),floor:mat('#b8b4a4'),edge:mat('#454a40'),cream:mat('#cec7b3'),paper:mat('#ece5d5'),brass:mat('#ad8c56',.4,.55),rubber:mat('#1e2b27'),green:mat('#375747'),greenLight:mat('#6e8253'),pot:mat('#b8af98'),rug:mat('#777f69'),rug2:mat('#a49476'),screen:mat('#122a2b',.35),cyan:new T.MeshStandardMaterial({color:'#79c2bd',emissive:'#5aa9a3',emissiveIntensity:.4}),warm:new T.MeshStandardMaterial({color:'#f8d59a',emissive:'#ffcb77',emissiveIntensity:.7}),white:mat('#e0e2d3'),glass:new T.MeshStandardMaterial({color:'#a5c4b7',transparent:true,opacity:.16,roughness:.12,depthWrite:false,side:T.DoubleSide}),skin:mat('#c79369'),hair:mat('#352b22'),shirt:mat('#629893'),shirt2:mat('#9f927f')};
 if(software){m.wood.color.set('#8f6749');m.darkWood.color.set('#5a4434');sun.color.set('#fff5e8');ambient.color.set('#e0e0d7')}
 m.stairGlass=new T.MeshStandardMaterial({color:'#9ecfce',transparent:true,opacity:software?.28:.24,roughness:.12,depthWrite:false,side:T.DoubleSide});
 const mesh=(geo,material,p,s,root)=>{const o=new T.Mesh(geo,material);o.position.set(...p);o.scale.set(...s);o.castShadow=!material.transparent;o.receiveShadow=!material.transparent;root.add(o);return o};
 const boxCache=new Map();
 const box=(g,x,y,z,w,h,d,material=m.wood)=>{let geo=boxGeo;if(software){const seg=[w,h,d].map(v=>Math.max(1,Math.ceil(v/1.5)));const key=seg.join(',');if(!boxCache.has(key))boxCache.set(key,new T.BoxGeometry(1,1,1,...seg));geo=boxCache.get(key)}const o=mesh(geo,material,[x,y,z],[w,h,d],g);if(software&&y<.16&&(w>4||d>4)&&h<.7)o.renderOrder=-100+Math.round(y*500);return o};
 const cyl=(g,x,y,z,r,h,material=m.frame)=>mesh(cylGeo,material,[x,y,z],[r,h,r],g);
 const orb=(g,x,y,z,sx,sy,sz,material)=>mesh(leafGeo,material,[x,y,z],[sx,sy,sz],g);
 const group=(root,x=0,y=0,z=0,angle=0)=>{const g=new T.Group();g.position.set(x,y,z);g.rotation.y=angle;root.add(g);return g};
 const label=(g,text,x,y,z,w=3.8,h=.42,color='#e4d9ba',bg=null,flat=false)=>{
  if(software)return;
  const c=document.createElement('canvas');c.width=1024;c.height=128;const cx=c.getContext('2d');if(bg){cx.fillStyle=bg;cx.fillRect(0,0,1024,128)}cx.fillStyle=color;cx.font='500 49px Arial';cx.textAlign='center';cx.textBaseline='middle';cx.fillText(text,512,65,980);
  const tex=new T.CanvasTexture(c);tex.colorSpace=T.SRGBColorSpace;const material=new T.MeshBasicMaterial({map:tex,transparent:true,depthWrite:false,side:T.DoubleSide});const p=new T.Mesh(new T.PlaneGeometry(w,h),material);p.position.set(x,y,z);if(flat)p.rotation.x=-Math.PI/2;g.add(p);return p;
 };
 function plant(g,x,z,s=1,y=0){const p=group(g,x,y,z);cyl(p,0,.24*s,0,.29*s,.48*s,m.pot);cyl(p,0,.48*s,0,.245*s,.025,m.darkWood);cyl(p,0,.93*s,0,.032*s,.9*s,m.darkWood);for(let i=0;i<9;i++){const a=i*2.4;const leaf=orb(p,Math.cos(a)*.24*s,(1.03+(i%3)*.2)*s,Math.sin(a)*.24*s,.14*s,.46*s,.18*s,i%2?m.green:m.greenLight);leaf.rotation.z=Math.sin(a)*.75;leaf.rotation.x=Math.cos(a)*.75}}
 function monitor(g,x,z,w=1.1,y=.91){box(g,x,y+.34,z,w,.66,.07,m.frame);box(g,x,y+.34,z+.041,w-.09,.55,.012,m.screen);box(g,x,y+.04,z,.075,.2,.075,m.frame);box(g,x,y-.03,z+.02,.38,.025,.25,m.frame);for(let j=0;j<4;j++)box(g,x-.17,y+.48-j*.1,z+.052,.54-j*.08,.018,.008,j===0?m.cyan:m.greenLight);box(g,x+.34,y+.29,z+.055,.13,.3,.012,m.cyan)}
 function chair(g,x,z,angle=0,high=false){const q=group(g,x,0,z,angle),h=high?.92:.48;cyl(q,0,h/2,0,.04,h,m.frame);for(let i=0;i<5;i++){const a=i*Math.PI*2/5;const leg=box(q,Math.sin(a)*.17,.1,Math.cos(a)*.17,.05,.05,.4,m.frame);leg.rotation.y=a;cyl(q,Math.sin(a)*.33,.065,Math.cos(a)*.33,.055,.08,m.rubber)}box(q,0,h,0,.56,.14,.56,m.charcoal);box(q,0,h+.36,-.24,.54,.6,.12,m.charcoal);box(q,-.32,h+.22,0,.07,.06,.4,m.frame);box(q,.32,h+.22,0,.07,.06,.4,m.frame)}
 const deskPoints=[];
 function desk(g,x,z,num,angle=0){const d=group(g,x,0,z,angle);box(d,0,.86,0,1.95,.12,.95,m.wood);for(const s of[-.83,.83]){box(d,s,.42,0,.065,.84,.75,m.frame);box(d,s,.055,0,.34,.055,.78,m.frame)}box(d,0,.57,-.35,1.7,.07,.05,m.frame);monitor(d,0,-.22);box(d,0,.94,.19,.62,.035,.19,m.charcoal);box(d,.5,.94,.21,.1,.035,.16,m.charcoal);cyl(d,-.74,1.03,.1,.075,.18,m.cream);box(d,.75,.95,-.06,.23,.028,.31,m.paper);label(d,String(num).padStart(2,'0'),-.8,.96,.33,.2,.12,'#5b4a35',null,true);chair(d,0,.95,Math.PI);deskPoints.push([x,z]);return d}
 function sofa(g,x,z,angle=0,w=2.7){const q=group(g,x,0,z,angle);box(q,0,.3,0,w,.4,1.05,m.cream);box(q,0,.78,-.47,w,.65,.2,m.cream);for(const s of[-1,1])box(q,s*(w/2-.1),.6,0,.2,.55,1.12,m.cream);for(let i=0;i<3;i++)box(q,-w/3+i*w/3,.55,.02,w/3-.07,.17,.8,m.pot);for(const x1 of[-w*.35,w*.35])for(const z1 of[-.32,.32])cyl(q,x1,.12,z1,.035,.2,m.brass)}
 function shelf(g,x,z,angle=0,w=2.5){const q=group(g,x,0,z,angle);box(q,0,1.2,-.2,w,2.4,.08,m.darkWood);for(const y of[.12,.75,1.4,2.1]){box(q,0,y,0,w,.06,.55,m.wood);for(let i=0;i<6;i++)box(q,-w*.4+i*w*.14,y+.22,.03,.13,.35+rand()*.12,.32,[m.charcoal,m.cream,m.brass,m.green][i%4])}for(const x1 of[-w/2,w/2])box(q,x1,1.2,0,.06,2.4,.55,m.frame)}
 function rack(g,x,z){box(g,x,1.24,z,.92,2.46,.82,m.frame);box(g,x,1.25,z+.42,.78,2.15,.035,m.charcoal);for(let i=0;i<7;i++){box(g,x, .36+i*.28,z+.455,.7,.19,.025,m.rubber);box(g,x-.25,.36+i*.28,z+.475,.035,.035,.015,m.cyan);box(g,x+.03,.36+i*.28,z+.475,.32,.012,.01,m.brass)}box(g,x,2.52,z,.94,.06,.88,m.charcoal)}
 function partition(g,x,z,w,angle=0){const q=group(g,x,0,z,angle);box(q,0,.85,0,w,1.7,.035,m.glass);for(const xx of[-w/2,w/2])box(q,xx,.89,0,.045,1.78,.045,m.frame);box(q,0,.08,0,w,.1,.05,m.frame);box(q,0,1.75,0,w,.04,.045,m.brass)}
 function windowWall(g,x,z,w,angle=0,h=2.65){const q=group(g,x,0,z,angle);box(q,0,h/2+.08,0,w,h,.07,m.glass);for(let xx=-w/2;xx<=w/2+.01;xx+=w/5)box(q,xx,h/2+.08,0,.07,h+.15,.1,m.frame);box(q,0,.12,0,w,.13,.12,m.frame);box(q,0,h+.1,0,w,.13,.14,m.frame);box(q,0,h*.55,0,w,.045,.08,m.frame)}
 function floor(g,sky=false){box(g,0,-.3,0,26.6,.6,18.6,m.charcoal);box(g,0,.005,0,26,.07,18,sky?m.darkWood:m.floor);box(g,0,-.19,9.32,26.5,.035,.04,m.brass);box(g,13.32,-.19,0,.04,.035,18.6,m.brass);for(let i=-12;i<=12;i+=1.5)box(g,i,.048,0,.013,.005,18,sky?m.brass:m.edge);if(!sky){box(g,0,.057,0,26,.018,1.7,m.wood);for(let i=-12;i<=12;i++)box(g,i,.069,0,.016,.004,1.7,m.darkWood)}
  box(g,0,1.65,-9.1,26.5,3.3,.2,m.charcoal);for(const z of[-5.15,5.15])box(g,-13.1,1.65,z,.2,3.3,8.1,m.charcoal);box(g,-13.1,3,0,.2,.6,2.2,m.charcoal);
  for(let x=-12.6;x<13;x+=.3)box(g,x,1.55,-8.97,.055,2.9,.07,m.darkWood);
  for(let z=-8.8;z<9;z+=.32)if(Math.abs(z)>1.15)box(g,-12.97,1.55,z,.07,2.9,.055,m.darkWood);
  box(g,0,3.24,-8.94,26,.045,.06,m.warm);box(g,-12.95,3.24,0,.06,.045,18,m.warm);
  for(let x of[-12.8,-4.3,4.3,12.8]){box(g,x,1.75,-8.7,.18,3.5,.18,m.frame);box(g,x,3.48,-4.5,.15,.16,8.5,m.frame)}
  windowWall(g,12.94,-4.5,8.5,Math.PI/2,2.9);
  label(g,'K I P   /   H E A D Q U A R T E R S',0,2.73,-8.82,7.9,.48,'#e2d1ad','#2a322c');
  for(let x of[-11,11]){plant(g,x,8,1.5);plant(g,x,-7.6,1.1)}
 }
 const loft=new T.Group(),sky=new T.Group(),entertain=new T.Group();scene.add(loft,sky,entertain);floor(loft);floor(sky,true);floor(entertain,true);sky.visible=false;entertain.visible=false;
 const roomTargets=[];
 for(const r of rooms){
  const floorColor=r.id==='content'?m.rug2:m.rug;box(loft,r.x,.063,r.z,7.7,.03,6.9,floorColor);
  for(const s of[-1,1]){box(loft,r.x+s*3.9,.08,r.z,.035,.02,7,m.brass)}
  label(loft,r.title.toUpperCase(),r.x,.093,r.z+2.85,5.6,.34,'#e6e0cd',null,true);
  const target=new T.Mesh(new T.PlaneGeometry(7.7,6.9),new T.MeshBasicMaterial({visible:false}));target.rotation.x=-Math.PI/2;target.position.set(r.x,.1,r.z);target.userData.id=r.id;loft.add(target);roomTargets.push(target);
 }
 for(const x of[-4.3,4.3]){partition(loft,x,-4.6,6.7,Math.PI/2);partition(loft,x,4.6,6.7,Math.PI/2)}
 for(const x of[-8.6,0,8.6]){partition(loft,x-2.3,-1,3.1);partition(loft,x-2.3,1,3.1)}
 desk(loft,-9,-4.2,1);box(loft,-9,1.8,-8.77,3.4,1.4,.1,m.frame);box(loft,-9,1.8,-8.7,3.2,1.23,.04,m.paper);
 for(let i=0;i<6;i++)box(loft,-10+i%3*.9,1.94-Math.floor(i/3)*.46,-8.65,.7,.3,.025,[m.rug,m.brass,m.charcoal][i%3]);
 cyl(loft,-6.8,.71,-2.9,.65,.09,m.wood);cyl(loft,-6.8,.35,-2.9,.08,.7,m.frame);chair(loft,-6.5,-1.9,Math.PI);plant(loft,-11.6,-2.5,1.2);
 for(let i=0;i<3;i++)rack(loft,-2.3+i*1.1,-7.6);
 desk(loft,-2.1,-3.6,2);desk(loft,.3,-3.6,3);desk(loft,2.6,-5.4,4);
 desk(loft,6.5,-4.3,5);desk(loft,9.8,-4.3,6);
 box(loft,8.7,1.87,-8.73,4.1,1.6,.12,m.frame);box(loft,8.7,1.87,-8.65,3.9,1.4,.02,m.screen);label(loft,'PLAY. TEST. IMPROVE.',8.7,1.95,-8.61,3.4,.35,'#a3d8c6');plant(loft,11.9,-2,1.2);
 desk(loft,-10.7,4.2,7);desk(loft,-7.5,4.2,8);rack(loft,-11.6,1.9);box(loft,-6,1.05,2,1.7,2.1,.85,m.charcoal);box(loft,-6,1.05,2.44,1.5,1.9,.04,m.frame);const dial=cyl(loft,-6,1.1,2.5,.15,.05,m.brass);dial.rotation.x=Math.PI/2;box(loft,-5.65,1.1,2.5,.07,.4,.06,m.brass);
 desk(loft,-.7,4,9);shelf(loft,2.2,2.1,0,2.7);sofa(loft,1.1,6.9,0,2.4);cyl(loft,-1.3,.6,7.1,.5,.08,m.wood);cyl(loft,-1.3,.28,7.1,.08,.56,m.frame);cyl(loft,-1.36,.98,3.7,.07,.07,m.frame);cyl(loft,-1.36,1.16,3.7,.023,.35,m.frame);cyl(loft,-1.36,1.38,3.7,.07,.17,m.rubber);plant(loft,-3,6.7,1.25);
 desk(loft,6.2,3.9,10);desk(loft,9.5,3.9,11);desk(loft,8.6,6.5,12);desk(loft,6.2,6.5,13);desk(loft,11,6.5,14);shelf(loft,11.5,2.1,0,1.8);
 label(loft,'01   /   THE LOFT',0,-.22,9.63,5.8,.29,'#e2cfaa');
 // Sky Club: strategy, coffee, lounge and planted terrace.
 box(sky,-6.9,.09,-3.5,9,.05,7.5,m.rug);box(sky,-6.9,.9,-3.6,5.6,.17,2.25,m.wood);for(const x of[-8.7,-5.1])box(sky,x,.44,-3.6,.16,.88,1.5,m.frame);
 for(const z of[-5.2,-1.9])for(const x of[-8.6,-7,-5.4])chair(sky,x,z,z<-3?0:Math.PI);
 chair(sky,-10.4,-3.6,-Math.PI/2);chair(sky,-3.4,-3.6,Math.PI/2);
 for(const x of[-8.5,-6.9,-5.3]){box(sky,x,1.01,-3.6,.6,.028,.38,m.paper);cyl(sky,x+.4,1.08,-3.5,.06,.13,m.cream)}
 box(sky,-7,1.85,-8.7,5,1.7,.15,m.frame);box(sky,-7,1.85,-8.61,4.8,1.5,.02,m.screen);label(sky,'MAKE ROOM FOR BIG IDEAS.',-7,1.9,-8.57,4.1,.42,'#e0ce9f');
 partition(sky,-1.8,-4.5,6.3,Math.PI/2);
 box(sky,6.8,.66,-5,8.3,1.3,1.05,m.darkWood);box(sky,6.8,1.36,-5,8.65,.13,1.4,m.wood);box(sky,6.8,.1,-4.46,8,.04,.04,m.warm);for(let i=0;i<30;i++)box(sky,2.85+i*.27,.7,-4.45,.05,1.1,.04,m.brass);
 for(const x of[3.6,5.6,7.6,9.6])chair(sky,x,-3.8,Math.PI,true);shelf(sky,7.3,-8.6,0,6.5);box(sky,10.3,1.7,-5.1,.7,.62,.52,m.frame);box(sky,10.3,1.7,-4.82,.55,.29,.02,m.brass);for(let i=0;i<3;i++)cyl(sky,4+i*.4,1.5,-5,.08,.18,m.cream);
 box(sky,6,.08,4.1,10,.04,7,m.rug2);sofa(sky,6,2.3,0,4.4);sofa(sky,9.3,4.3,-Math.PI/2,3.5);sofa(sky,3.2,5.5,Math.PI/2,2.7);cyl(sky,6.1,.39,4.6,1.2,.11,m.darkWood);cyl(sky,6.1,.19,4.6,.35,.33,m.charcoal);box(sky,5.9,.48,4.6,.8,.07,.55,m.paper);cyl(sky,6.6,.53,4.7,.1,.2,m.brass);plant(sky,10.5,7.5,1.6);plant(sky,2,1.6,1.6);
 box(sky,-7,.07,4.7,9,.06,6.8,m.floor);for(let i=0;i<9;i++)box(sky,-11+i,.11,4.7,.03,.012,6.8,m.brass);sofa(sky,-9.7,4.6,Math.PI/2,2.4);sofa(sky,-4.5,4.6,-Math.PI/2,2.4);cyl(sky,-7.1,.5,4.6,.8,.12,m.wood);cyl(sky,-7.1,.24,4.6,.09,.48,m.frame);
 for(const x of[-11,-8.7,-6.4,-4.1])plant(sky,x,7.5,1.2);for(const z of[2,4,6])plant(sky,-11.8,z,1.1);
 windowWall(sky,0,9,25.5,0,1.0);windowWall(sky,12.94,4.5,8.6,Math.PI/2,1.0);
 label(sky,'STRATEGY ROOM',-7,.15,-.15,4,.3,'#e4d7bc',null,true);label(sky,'SKY LOUNGE',6,.12,7.3,4,.3,'#e5dcc6',null,true);label(sky,'02   /   SKY CLUB',0,-.22,9.63,5.8,.29,'#e2cfaa');
 for(const x of[4,7,10]){cyl(sky,x,2.75,-5,.28,.25,m.charcoal);cyl(sky,x,2.61,-5,.23,.025,m.warm);cyl(sky,x,3.18,-5,.018,.7,m.frame)}
 buildAmenities(entertain,{T,m,box,cyl,orb,group,sofa,plant,partition,windowWall,label,software});
 [loft,sky,entertain].forEach((root,level)=>buildStairCore(root,{T,m,box,cyl,software},level));
 // Structural corner posts line up with the next slab in the assembled view.
 const connectors=new T.Group();scene.add(connectors);connectors.visible=false;
 for(const y of[0,FLOOR_HEIGHT])for(const x of[-12.8,12.8])for(const z of[-8.7,8.7])box(connectors,x,y+FLOOR_HEIGHT/2,z,.18,FLOOR_HEIGHT,.18,m.frame);
 // Merge static opaque objects by material to keep draw calls bounded.
 function compact(root){root.updateMatrixWorld(true);const buckets=new Map(),old=[];root.traverse(o=>{if(o.isMesh&&!o.material.transparent&&o.material.visible!==false){const k=o.material.uuid+':'+o.renderOrder;const arr=buckets.get(k)||{material:o.material,order:o.renderOrder,geometries:[]};arr.geometries.push(o.geometry.clone().applyMatrix4(o.matrixWorld));buckets.set(k,arr);old.push(o)}});for(const o of old)o.removeFromParent();for(const v of buckets.values()){const geo=mergeGeometries(v.geometries,false);const object=new T.Mesh(geo,v.material);object.renderOrder=v.order;object.castShadow=true;object.receiveShadow=true;root.add(object);v.geometries.forEach(g=>g.dispose())}}
 for(const root of[loft,sky,entertain]){compact(root);root.traverse(o=>o.userData.baseOrder=o.renderOrder)}
 const selection=new T.Group();scene.add(selection);const selMaterial=new T.MeshBasicMaterial({color:'#dec18e',transparent:true,opacity:.8,depthWrite:false});for(const z of[-3.52,3.52])box(selection,0,.15,z,7.9,.025,.06,selMaterial);for(const x of[-3.95,3.95])box(selection,x,.15,0,.06,.025,7.1,selMaterial);selection.visible=false;
 const characters=[];
 function character(robot){const {id,name,short,color,desk:[x,,z]}=robot,shirt=mat(color,.4,.35);const root=group(scene,x,0,z);const left=group(root,-.12,.45,0),right=group(root,.12,.45,0);box(left,0,-.19,0,.14,.4,.17,m.charcoal);box(right,0,-.19,0,.14,.4,.17,m.charcoal);box(left,0,-.4,.05,.18,.1,.29,m.rubber);box(right,0,-.4,.05,.18,.1,.29,m.rubber);box(root,0,.75,0,.48,.56,.26,shirt);box(root,0,1.24,0,.48,.4,.36,m.white);box(root,0,1.25,.19,.4,.23,.035,m.screen);cyl(root,0,1.53,0,.025,.2,m.brass);orb(root,0,1.65,0,.065,.065,.065,shirt);box(root,0,.78,.15,.18,.18,.025,m.cyan);const armL=group(root,-.29,.96,0),armR=group(root,.29,.96,0);box(armL,0,-.19,0,.12,.4,.14,shirt);box(armR,0,-.19,0,.12,.4,.14,shirt);cyl(armL,0,-.4,0,.06,.12,m.white);cyl(armR,0,-.4,0,.06,.12,m.white);box(root,.09,1.27,.214,.065,.05,.01,m.cyan);box(root,-.09,1.27,.214,.065,.05,.01,m.cyan);const disk=cyl(root,0,.01,0,.35,.015,m.cyan);disk.castShadow=false;root.traverse(o=>o.userData.agentId=id);const pin=document.createElement('button');pin.className='agent-pin';pin.textContent=short;pin.dataset.agent=id;pin.dataset.tone='unknown';pin.title=name;pin.setAttribute('aria-label',name+' — belum terverifikasi — buka laporan');pin.onclick=()=>onAgentPick?.(id);container.appendChild(pin);characters.push({id,root,left,right,armL,armR,x,z,pin,motion:createMotion(id),pose:null});return root}
 robotRoster.forEach(character);
 const landscape=buildLandscape({T,software,compact});scene.add(landscape.root);landscape.root.visible=false;
 let currentFloor='loft',night=false,reduced=matchMedia('(prefers-reduced-motion: reduce)').matches,motionPaused=false,last=0,frameId=0,dirtyFrames=software?1:3,lost=false,disposed=false,tween=null;
 const home=(floor=currentFloor)=>{const mobile=container.clientWidth<600;if(floor==='campus'){const target=new T.Vector3(1,2,-1),scale=mobile?1.92:1.08;return {position:target.clone().add(new T.Vector3(72,64,100).multiplyScalar(scale)),target}}const both=floor==='building',dist=mobile?2.25:1.27;return {position:new T.Vector3(28*dist,(both?29:30)*dist,(both?42:34)*dist),target:new T.Vector3(-2,both?4.6:.2,0)}};
 function requestRender(){dirtyFrames=Math.max(dirtyFrames,software?1:3);if(!frameId&&!document.hidden&&!disposed&&!lost)frameId=requestAnimationFrame(tick)}
 function moveTo(position,target,animate=true){if(reduced||software||!animate){camera.position.copy(position);controls.target.copy(target);controls.update();tween=null}else tween={from:camera.position.clone(),to:position.clone(),targetFrom:controls.target.clone(),targetTo:target.clone(),started:performance.now()};requestRender()}
 function reset(){landscape.root.visible=currentFloor==='campus'||currentFloor==='building';const h=home();moveTo(h.position,h.target);selection.visible=false}
 function resize(){const w=container.clientWidth,h=container.clientHeight;if(!w||!h)return;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();requestRender()}
 function select(id){const r=rooms.find(r=>r.id===id);if(currentFloor==='loft'&&r){selection.position.set(r.x,0,r.z);selection.visible=true;const target=new T.Vector3(r.x,.5,r.z);moveTo(target.clone().add(new T.Vector3(13,16,19)),target)}else{selection.visible=false;requestRender()}}
 function focusPoint(x,z){selection.visible=false;const target=new T.Vector3(x,.45,z);moveTo(target.clone().add(new T.Vector3(14,17,20)),target)}
 function updateAgents(views){const before=characters.map(c=>[c.pose?.phase,c.pose?.position?.join(','),c.pin.dataset.tone].join(':')).join('|');for(const view of views){const c=characters.find(c=>c.id===view.id);if(!c)continue;c.motion.update(view);c.pin.dataset.tone=view.tone;c.pin.setAttribute('aria-label',view.name+' — '+view.label+' — buka laporan');}const active=syncCharacters(0,reduced||software||document.hidden);const after=characters.map(c=>[c.pose?.phase,c.pose?.position?.join(','),c.pin.dataset.tone].join(':')).join('|');if(active||before!==after)requestRender()}
 function pauseMotion(value){motionPaused=value;last=0;syncCharacters(0,reduced||software);requestRender()}
 function syncCharacters(dt,snap=false){let active=false;const assembled=['building','campus'].includes(currentFloor),floorLevel={loft:0,sky:1,entertain:2}[currentFloor]??0;
  for(const c of characters){const pose=c.motion.step(dt,{snap,pause:motionPaused});const oldPhase=c.pose?.phase;c.pose=pose;c.root.position.set(pose.position[0],pose.position[1]-(assembled?0:floorLevel*FLOOR_HEIGHT),pose.position[2]);c.root.rotation.y=pose.rotation;c.root.visible=assembled||pose.level===floorLevel;
   const stride=pose.moving?Math.sin(performance.now()*.011)*.45:0;c.left.rotation.x=stride;c.right.rotation.x=-stride;c.armL.rotation.x=-stride*.8;c.armR.rotation.x=stride*.8;
   if(pose.phase==='resting'){const play=pose.enjoying?Math.sin(performance.now()*.008)*.14:0;c.armL.rotation.x=-.8+play;c.armR.rotation.x=-.8-play;}else if(pose.phase==='reviewing'){c.armR.rotation.x=-1;}
   if(software)c.root.traverse(o=>o.renderOrder=assembled?pose.level*1000:0);
   if(oldPhase!==pose.phase)onAgentMove?.(c.id,pose.phase);
   active||=pose.active;
  }if(active)renderer.shadowMap.needsUpdate=true;return active;
 }
 function positionPins(){const used=[],w=container.clientWidth,h=container.clientHeight;for(const c of characters){const p=c.root.position.clone().add(new T.Vector3(0,2,0)).project(camera);const visible=c.root.visible&&p.z>-1&&p.z<1&&Math.abs(p.x)<.94&&Math.abs(p.y)<.86;c.pin.hidden=!visible;if(!visible)continue;const anchor={x:(p.x+1)*w/2,y:(1-p.y)*h/2};let position=null;for(let radius=0;radius<=5&&!position;radius++)for(const [dx,dy]of [[0,radius],[0,-radius],[radius,0],[-radius,0],[radius,radius],[-radius,radius]]){const x=Math.max(25,Math.min(w-25,anchor.x+dx*48)),y=Math.max(48,Math.min(h-8,anchor.y+dy*48));if(used.every(v=>Math.abs(x-v.x)>=46||Math.abs(y-v.y)>=46)){position={x,y};break;}}position??={x:Math.max(25,Math.min(w-25,anchor.x)),y:Math.max(48,Math.min(h-8,anchor.y))};used.push(position);c.pin.style.left=position.x+'px';c.pin.style.top=position.y+'px';}}

 function focusAgent(id){const c=characters.find(c=>c.id===id);if(!c)return;landscape.root.visible=false;selection.visible=false;const target=c.root.position.clone().add(new T.Vector3(0,.7,0));const scale=container.clientWidth<600?1.4:1;moveTo(target.clone().add(new T.Vector3(8,10,12).multiplyScalar(scale)),target)}
 function agentFloor(id){const p=characters.find(c=>c.id===id)?.pose;return p?.moving?'building':['loft','sky','entertain'][p?.level??0]}
 function setFloor(value){currentFloor=value;const building=value==='building'||value==='campus';controls.maxDistance=building?420:145;const levels=[['loft',loft],['sky',sky],['entertain',entertain]];levels.forEach(([name,root],i)=>{root.visible=building||value===name;root.position.y=building?i*FLOOR_HEIGHT:0;if(software)root.traverse(o=>o.renderOrder=(o.userData.baseOrder||0)+(building?i*1000:0))});connectors.visible=building;landscape.root.visible=building;selection.visible=false;syncCharacters(0,reduced||software);setNight(night);reset();renderer.shadowMap.needsUpdate=true;requestRender()}
 function focusStairs(){landscape.root.visible=false;selection.visible=false;const target=new T.Vector3(-13,4.5,-1.6);const mobile=container.clientWidth<600;moveTo(target.clone().add(new T.Vector3(-22,13,29).multiplyScalar(mobile?1.5:1)),target)}
 function focusOutdoor(id,x,z){selection.visible=false;landscape.root.visible=true;const offsets={arrival:[26,21,34],garden:[-17,17,26],beach:[27,24,34],mountains:[42,30,48]};const target=new T.Vector3(x,id==='mountains'?6:0,z),scale=container.clientWidth<600?1.65:1;moveTo(target.clone().add(new T.Vector3(...offsets[id]).multiplyScalar(scale)),target)}
 function setNight(value){night=value;const outside=currentFloor==='campus'||currentFloor==='building';scene.background.set(value?(outside?'#142b36':'#131d1c'):(outside?'#cbded9':'#d8d9cd'));scene.fog.color.copy(scene.background);scene.fog.near=outside?180:90;scene.fog.far=outside?430:190;landscape.setNight(value);hemi.intensity=value?.8:2.5;hemi.color.set(value?'#b7c9db':'#e9f4ff');sun.intensity=software?(value?.3:.72):(value?.65:3.2);ambient.intensity=software?(value?.5:.65):0;sun.color.set(value?'#9fbdd7':software?'#fff5e8':'#ffe5c3');fill.intensity=software?(value?.22:.3):(value?.5:1.1);renderer.toneMappingExposure=value?1.35:1.13;m.warm.emissiveIntensity=value?2.2:.7;m.cyan.emissiveIntensity=value?1.6:.4;renderer.shadowMap.needsUpdate=true;requestRender()}
 function rotate(amount){tween=null;const v=camera.position.clone().sub(controls.target);v.applyAxisAngle(new T.Vector3(0,1,0),amount);camera.position.copy(controls.target).add(v);controls.update();requestRender()}
 function zoom(factor){tween=null;const v=camera.position.clone().sub(controls.target);v.setLength(T.MathUtils.clamp(v.length()*factor,controls.minDistance,controls.maxDistance));camera.position.copy(controls.target).add(v);controls.update();requestRender()}
 function tick(t){frameId=0;if(disposed||document.hidden||lost)return;const dt=Math.min((t-(last||t))/1000,.25);last=t;let active=false;
  if(tween){const p=Math.min(1,(t-tween.started)/650),e=1-Math.pow(1-p,3);camera.position.lerpVectors(tween.from,tween.to,e);controls.target.lerpVectors(tween.targetFrom,tween.targetTo,e);active=p<1;if(p===1)tween=null}
  active=syncCharacters(dt,reduced||software)||active;
  const changed=controls.update(dt);renderer.render(scene,camera);positionPins();dirtyFrames--;if((active||changed||dirtyFrames>0)&&!frameId)frameId=requestAnimationFrame(tick);
 }
 controls.addEventListener('change',requestRender);controls.addEventListener('start',()=>{tween=null;requestRender()});
 let startPoint=null;
 const down=e=>{startPoint={x:e.clientX,y:e.clientY}};
 const up=e=>{if(!startPoint||Math.hypot(e.clientX-startPoint.x,e.clientY-startPoint.y)>6)return;const b=renderer.domElement.getBoundingClientRect(),pointer=new T.Vector2((e.clientX-b.left)/b.width*2-1,-(e.clientY-b.top)/b.height*2+1),ray=new T.Raycaster();ray.setFromCamera(pointer,camera);const person=ray.intersectObjects(characters.filter(c=>c.root.visible).map(c=>c.root),true)[0];if(person){onAgentPick?.(person.object.userData.agentId);return;}if(currentFloor!=='loft')return;const hit=ray.intersectObjects(roomTargets)[0];if(hit)onPick?.(hit.object.userData.id)};
 renderer.domElement.addEventListener('pointerdown',down);renderer.domElement.addEventListener('pointerup',up);
 const keys=e=>{if(e.key==='ArrowLeft'){e.preventDefault();rotate(-.18)}else if(e.key==='ArrowRight'){e.preventDefault();rotate(.18)}else if(['+','='].includes(e.key)){e.preventDefault();zoom(.85)}else if(e.key==='-'){e.preventDefault();zoom(1.15)}else if(e.key==='Home'){e.preventDefault();reset()}else if(['ArrowUp','ArrowDown'].includes(e.key)){e.preventDefault();const v=camera.position.clone().sub(controls.target);const s=new T.Spherical().setFromVector3(v);s.phi=T.MathUtils.clamp(s.phi+(e.key==='ArrowUp'?-.08:.08),.28,1.34);camera.position.copy(controls.target).add(new T.Vector3().setFromSpherical(s));controls.update();requestRender()}};
 container.addEventListener('keydown',keys);
 const visibility=()=>{if(document.hidden){cancelAnimationFrame(frameId);frameId=0;syncCharacters(0,true);last=0}else requestRender()};document.addEventListener('visibilitychange',visibility);
 const media=matchMedia('(prefers-reduced-motion: reduce)');const mediaChange=e=>{reduced=e.matches;if(reduced){syncCharacters(0,true);tween=null}requestRender()};media.addEventListener('change',mediaChange);
 const onLost=e=>{e.preventDefault();lost=true;cancelAnimationFrame(frameId);frameId=0;onError?.('Tampilan 3D terhenti.')};renderer.domElement.addEventListener('webglcontextlost',onLost);
 const ro=new ResizeObserver(resize);ro.observe(container);const h=home();camera.position.copy(h.position);controls.target.copy(h.target);controls.update();resize();renderer.shadowMap.needsUpdate=true;requestRender();
 return {software,setFloor,setNight,select,focusPoint,focusStairs,focusOutdoor,rotate,zoom,reset,updateAgents,pauseMotion,focusAgent,agentFloor,get reducedMotion(){return reduced},get state(){return{floor:currentFloor,night,motionPaused,renderer:software?'svg-fallback':'webgl2',drawCalls:renderer.info.render.calls??null,triangles:renderer.info.render.triangles??renderer.info.render.faces}},dispose(){disposed=true;cancelAnimationFrame(frameId);ro.disconnect();controls.dispose();renderer.dispose();document.removeEventListener('visibilitychange',visibility);media.removeEventListener('change',mediaChange);container.removeEventListener('keydown',keys);renderer.domElement.removeEventListener('pointerdown',down);renderer.domElement.removeEventListener('pointerup',up);renderer.domElement.removeEventListener('webglcontextlost',onLost);const gs=new Set(),ms=new Set(),ts=new Set();scene.traverse(o=>{if(o.geometry)gs.add(o.geometry);if(o.material)for(const material of[].concat(o.material)){ms.add(material);for(const value of Object.values(material))if(value?.isTexture)ts.add(value)}});gs.forEach(g=>g.dispose());ms.forEach(m=>m.dispose());ts.forEach(t=>t.dispose());characters.forEach(c=>c.pin.remove());renderer.domElement.remove()}};
}
