// Procedural room props. All facilities are visual models, without external assets.
export function buildAmenities(root,{T,m,box,cyl,orb,group,sofa,plant,partition,windowWall,label,software}){
 const felt=new T.MeshStandardMaterial({color:'#255f52',roughness:.95});
 const plum=new T.MeshStandardMaterial({color:'#694954',roughness:.9});
 const water=new T.MeshStandardMaterial({color:'#2babb8',emissive:'#0e6875',emissiveIntensity:.22,roughness:.17,metalness:.18});
 const tile=new T.MeshStandardMaterial({color:'#b3d5cc',roughness:.4});
 const ripple=new T.MeshStandardMaterial({color:'#92d6d3',emissive:'#3e989e',emissiveIntensity:.12,roughness:.2});
 function beam(g,a,b,r=.035,material=m.brass){const v1=new T.Vector3(...a),v2=new T.Vector3(...b);const o=cyl(g,0,0,0,r,v1.distanceTo(v2),material);o.position.copy(v1).add(v2).multiplyScalar(.5);o.quaternion.setFromUnitVectors(new T.Vector3(0,1,0),v2.sub(v1).normalize());return o}
 // Karaoke: acoustic wall, raised stage, microphones, speakers and lounge seats.
 box(root,-7.2,.08,-4.6,9.8,.06,7.3,plum);
 box(root,-7.6,.21,-7.1,5.2,.33,1.9,m.darkWood);
 box(root,-7.6,.41,-6.18,5.2,.025,.035,m.warm);
 box(root,-7.7,2.05,-8.73,4.5,1.85,.16,m.frame);
 box(root,-7.7,2.05,-8.62,4.26,1.62,.035,m.screen);
 for(let i=0;i<12;i++)box(root,-9.35+i*.3,1.8,-8.59,.14,.2+(.5+.5*Math.sin(i*1.4))*.7,.015,i%3===0?m.warm:m.cyan);
 for(const x of[-11.2,-4.2]){box(root,x,1.15,-7.7,.78,2,.7,m.rubber);for(const y of[.65,1.45]){const d=cyl(root,x,y,-7.32,.24,.06,m.charcoal);d.rotation.x=Math.PI/2}cyl(root,x,2.26,-7.7,.16,.12,m.brass)}
 for(const x of[-8.8,-6.3]){cyl(root,x,.43,-6.8,.26,.06,m.frame);cyl(root,x,1.04,-6.8,.025,1.2,m.brass);const mic=cyl(root,x,1.7,-6.8,.07,.3,m.rubber);mic.rotation.z=-.3}
 sofa(root,-7.8,-2.35,Math.PI,4.3);sofa(root,-11,-4.2,Math.PI/2,2.5);
 cyl(root,-7.8,.43,-4.25,.93,.13,m.darkWood);cyl(root,-7.8,.22,-4.25,.24,.4,m.frame);
 box(root,-7.7,.52,-4.3,.48,.04,.3,m.brass);plant(root,-3.2,-2.1,1.1);
 partition(root,-1.5,-4.6,6.9,Math.PI/2);
 label(root,'KARAOKE / SOUND LOUNGE',-7.5,.14,-1.35,5.9,.3,'#e4d7bc',null,true);
 // Gym: two treadmills, stationary bike, free-weight bench and a dumbbell rack.
 box(root,6.1,.08,-4.7,11.8,.06,7.1,m.rubber);
 box(root,7,1.83,-8.75,9,2.3,.055,m.glass);
 function treadmill(x,z){const q=group(root,x,0,z);box(q,0,.27,0,1.4,.28,2.55,m.charcoal);box(q,0,.43,.1,1.04,.045,2.15,m.rubber);for(const s of[-1,1]){beam(q,[s*.62,.35,-.92],[s*.62,1.65,-.92],.045,m.frame);beam(q,[s*.62,1.4,-.95],[s*.62,1.4,.35],.04,m.brass)}box(q,0,1.6,-.94,1.35,.32,.3,m.frame);box(q,0,1.78,-.9,.55,.035,.22,m.cyan);for(let i=0;i<6;i++)box(q,0,.46,-.75+i*.33,.98,.009,.015,m.edge)}
 treadmill(2.6,-6);treadmill(5,-6);
 for(const y of[.6,1.1]){box(root,10.1,y,-7.1,3.1,.08,.55,m.frame);for(let i=0;i<5;i++){const x=8.95+i*.56;beam(root,[x-.14,y+.17,-7.08],[x+.14,y+.17,-7.08],.035,m.brass);for(const s of[-1,1]){const weight=cyl(root,x+s*.2,y+.17,-7.08,.13,.12,m.rubber);weight.rotation.z=Math.PI/2}}}
 for(const x of[8.7,11.5])box(root,x,.6,-7.1,.07,1.2,.7,m.frame);
 box(root,8.8,.6,-3.9,.65,.18,2.1,m.charcoal);for(const z of[-4.6,-3.2])box(root,8.8,.3,z,.5,.6,.1,m.frame);
 beam(root,[7.8,1.4,-4.8],[9.8,1.4,-4.8],.045,m.brass);for(const x of[7.9,9.7]){const weight=cyl(root,x,1.4,-4.8,.27,.15,m.rubber);weight.rotation.z=Math.PI/2;box(root,x,.75,-4.8,.07,1.5,.07,m.frame)}
 const bike=group(root,3.5,0,-2.7);const wheel=cyl(bike,0,.48,0,.42,.22,m.charcoal);wheel.rotation.z=Math.PI/2;
 beam(bike,[0,.15,.7],[0,1.05,.45],.06,m.frame);beam(bike,[0,.1,-.65],[0,1.35,-.45],.05,m.frame);box(bike,0,1.05,.45,.55,.12,.38,m.rubber);box(bike,0,1.4,-.45,.8,.08,.07,m.brass);box(bike,0,.1,0,1.2,.08,1.7,m.frame);
 for(const x of[6.1,10.9])box(root,x,.14,-2.3,.85,.05,1.8,m.rug);
 label(root,'MOVE / RESET / REPEAT',6,.15,-1.4,7,.3,'#c7d7cd',null,true);
 // Pool: raised tiled basin, broad coping, water surface and entrance ladder.
 box(root,6,.08,4.7,11.8,.06,7.2,m.darkWood);
 const basin=box(root,6.4,.24,4.15,8.2,.36,4.8,tile),surface=box(root,6.4,.43,4.15,7.65,.025,4.25,water);if(software){basin.renderOrder=-12;surface.renderOrder=-10}
 for(const z of[1.73,6.57])box(root,6.4,.49,z,8.65,.17,.38,m.cream);
 for(const x of[2.24,10.56])box(root,x,.49,4.15,.38,.17,4.8,m.cream);
 for(let i=0;i<13;i++){const z=2.23+i*.29;for(let j=0;j<3;j++){const line=box(root,3.3+j*2.15+Math.sin(i*.9)*.18,.451,z,.8+Math.sin(i+j)*.35,.005,.018,ripple);if(software)line.renderOrder=-9;line.rotation.y=Math.sin(i*.6+j)*.08}}
 for(const z of[3.55,4.45]){beam(root,[1.7,.09,z],[1.7,1.17,z],.045,m.brass);beam(root,[1.7,1.17,z],[2.9,1.17,z],.045,m.brass);beam(root,[2.9,1.17,z],[2.9,.25,z],.045,m.brass)}
 for(const y of[.3,.55,.8])beam(root,[2.85,y,3.55],[2.85,y,4.45],.04,m.brass);
 for(const x of[4.1,7,9.9]){box(root,x,.36,7.65,1.1,.24,1.4,m.cream);const back=box(root,x,.67,7.02,1.1,.15,.8,m.cream);back.rotation.x=-.55;for(const z of[7.2,8.2])box(root,x,.13,z,.9,.24,.07,m.frame)}
 plant(root,1,7.8,1.4);plant(root,11.9,7.8,1.4);windowWall(root,12.94,4.5,8.6,Math.PI/2,1.05);
 windowWall(root,0,9,25.5,0,1.05);
 // Game lounge: billiards with balls and cues, arcade machines and console nook.
 box(root,-7.2,.08,4.7,9.8,.06,7.2,m.rug);
 box(root,-7.9,.92,5.5,3.8,.28,2.2,m.darkWood);box(root,-7.9,1.07,5.5,3.35,.035,1.75,felt);
 for(const x of[-9.3,-6.5])for(const z of[4.8,6.2])box(root,x,.45,z,.22,.9,.22,m.frame);
 for(const x of[-9.55,-7.9,-6.25])for(const z of[4.65,6.35])cyl(root,x,1.095,z,.09,.025,m.rubber);
 for(let i=0;i<6;i++)orb(root,-7.4+(i%3)*.15,1.17,5.35+Math.floor(i/3)*.16,.075,.075,.075,[m.paper,m.brass,plum][i%3]);orb(root,-8.7,1.17,5.5,.075,.075,.075,m.white);
 beam(root,[-9.1,1.15,6.5],[-6.5,1.15,6.5],.025,m.wood);
 function arcade(x,z,accent){const q=group(root,x,0,z);box(q,0,.7,0,1.1,1.4,.9,m.charcoal);box(q,0,1.65,-.2,1.1,.9,.55,m.frame);box(q,0,1.65,.1,.88,.64,.035,accent);box(q,0,2.22,-.14,1.2,.26,.68,m.darkWood);box(q,0,2.22,.22,1,.16,.02,m.warm);box(q,0,1.25,.35,1.15,.12,.55,m.wood);cyl(q,-.28,1.38,.35,.035,.18,m.frame);orb(q,-.28,1.48,.35,.07,.07,.07,plum);for(const x1 of[.1,.3])cyl(q,x1,1.33,.4,.065,.03,m.brass);for(let i=0;i<3;i++)box(q,-.2+i*.2,1.65,.13,.1,.18+Math.sin(i)*.15,.02,m.warm)}
 arcade(-5.25,2.25,m.cyan);arcade(-3.75,2.25,plum);
 sofa(root,-10.4,2.3,Math.PI,2.5);box(root,-10.4,.68,1.23,2.5,.07,.6,m.darkWood);box(root,-10.4,1.35,1.18,2.15,1.2,.1,m.frame);box(root,-10.4,1.35,1.24,1.98,1.02,.025,m.cyan);box(root,-9.5,.9,1.22,.23,.4,.3,m.rubber);
 partition(root,-1.5,4.65,6.9,Math.PI/2);plant(root,-11.6,7.7,1.4);
 label(root,'03   /   PLAY CLUB',0,-.22,9.63,6,.29,'#e2cfaa');
 label(root,'MINI GAME LOUNGE',-7.2,.15,8,6,.3,'#e4d7bc',null,true);
}
