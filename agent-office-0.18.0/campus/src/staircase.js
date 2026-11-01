export const FLOOR_HEIGHT=4.6;
export const STAIR_CORE={left:-17.55,right:-13,back:-5.5,front:1.55};

// Shared attached stair wing. Every flight reaches the next landing exactly.
export function buildStairCore(root,{T,m,box,cyl,software},level){
 const mid=-15.275,width=4.55,half=FLOOR_HEIGHT/2,rise=half/12,run=4.2;
 function beam(a,b,thickness=.07,material=m.frame){const from=new T.Vector3(...a),to=new T.Vector3(...b);const o=box(root,0,0,0,thickness,from.distanceTo(to),thickness,material);o.position.copy(from).add(to).multiplyScalar(.5);o.quaternion.setFromUnitVectors(new T.Vector3(0,1,0),to.sub(from).normalize());return o}
 function glassRail(x,y1,z1,y2,z2){
  const segments=software?8:1;
  for(let i=0;i<segments;i++){
   const a=i/segments,b=(i+1)/segments,ya=T.MathUtils.lerp(y1,y2,a),yb=T.MathUtils.lerp(y1,y2,b),za=T.MathUtils.lerp(z1,z2,a),zb=T.MathUtils.lerp(z1,z2,b);
   const geo=new T.BufferGeometry();geo.setAttribute('position',new T.Float32BufferAttribute([x,ya,za,x,yb,zb,x,yb+1.05,zb,x,ya,za,x,yb+1.05,zb,x,ya+1.05,za],3));geo.computeVertexNormals();const glass=new T.Mesh(geo,m.stairGlass);root.add(glass);
  }
  beam([x,y1+1.08,z1],[x,y2+1.08,z2],.055,m.brass);
  for(let i=0;i<=4;i++){const t=i/4,y=T.MathUtils.lerp(y1,y2,t),z=T.MathUtils.lerp(z1,z2,t);beam([x,y,z],[x,y+1.06,z],.035,m.frame)}
 }
 // The landing crosses the old exterior wall and meets the corridor at z = 0.
 box(root,mid,-.11,.75,width,.3,1.6,m.charcoal);box(root,mid,.05,.75,width,.03,1.6,m.wood);
 box(root,mid,.025,1.58,width,.045,.06,m.brass);
 if(level===0){box(root,mid,-.3,-1.95,width,.6,7.1,m.charcoal);box(root,mid,.015,-1.95,width,.04,7.1,m.floor)}
 for(const x of[-17.5,-13.12])for(const z of[-5.45,1.52]){
  const height=level<2?FLOOR_HEIGHT:1.2;box(root,x,height/2-.1,z,.13,height,.13,m.frame);
 }
 // Landing guard leaves the 2.2-unit doorway into the building unobstructed.
 glassRail(-17.55,.1,.05,.1,1.55);
 box(root,mid,.65,1.53,width,1.1,.035,m.stairGlass);box(root,mid,1.22,1.53,width,.055,.055,m.brass);
 if(level===2){
  box(root,-16.5,.65,-.04,1.9,1.1,.035,m.stairGlass);box(root,-16.5,1.22,-.04,1.9,.055,.055,m.brass);
  return;
 }
 // Two U-shaped flights: no isolated/floating stair or gap between floors.
 for(let flight=0;flight<2;flight++){
  const x=flight===0?-16.5:-14.4,base=flight*half;
  for(let i=0;i<12;i++){
   const y=.05+base+(i+1)*rise,z=flight===0?-(i+.5)*run/12:-run+(i+.5)*run/12;
   box(root,x,y-.07,z,1.74,.14,run/12+.012,m.wood);
   box(root,x,y+.005,z+(flight===0?.15:-.15),1.7,.012,.025,m.brass);
  }
  const z1=flight===0?0:-run,z2=flight===0?-run:0,y1=.05+base,y2=.05+base+half;
  for(const side of[-1,1]){
   beam([x+side*.62,y1-.13,z1],[x+side*.62,y2-.13,z2],.13,m.frame);
   glassRail(x+side*.91,y1+.06,z1,y2+.06,z2);
  }
 }
 box(root,mid,half-.055,-4.85,width,.21,1.3,m.charcoal);box(root,mid,half+.06,-4.85,width,.03,1.3,m.wood);
 box(root,mid,half+.65,-5.5,width,1.1,.035,m.stairGlass);box(root,mid,half+1.22,-5.5,width,.055,.055,m.brass);
 for(const x of[-17.55,-13.15])glassRail(x,half+.1,-4.2,half+.1,-5.5);
 // Upper arrival is exactly at next slab; shared posts tie it to the wing.
 box(root,mid,FLOOR_HEIGHT-.11,.75,width,.3,1.6,m.charcoal);box(root,mid,FLOOR_HEIGHT+.05,.75,width,.03,1.6,m.wood);
}
