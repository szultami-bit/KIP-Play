// Coastal grounds built entirely from shared procedural geometry.
// Static surfaces and props are merged by material by the scene owner.
export function buildLandscape({T,software,compact}){
 const root=new T.Group();root.name='KIP coastal grounds';
 const material=(color,roughness=.88)=>new T.MeshStandardMaterial({color,roughness});
 const m={lawn:material('#748d61'),lawnLight:material('#8d9d70'),soil:material('#78654b'),sand:material('#eee7d1'),wetSand:material('#d9d1b1'),sea:material('#478d9e',.3),shallows:material('#77bdbb',.3),surf:material('#d5e8db'),road:material('#4c5554'),roadMark:material('#d6d3ba'),paving:material('#b5b4a0'),stone:material('#8a8b79'),dark:material('#283b34'),wood:material('#936e4c'),pine:material('#365c48'),pineLight:material('#4f7355'),leaf:material('#4a6845'),rose:material('#aa465a'),rosePink:material('#d58a8b'),roseCream:material('#e9c9b0'),mountainFar:material('#7f9b9d'),mountain:material('#6a8274'),mountainNear:material('#607459'),cream:material('#d9c9a8'),brass:material('#ae9060',.45),lamp:new T.MeshStandardMaterial({color:'#f5d6a0',emissive:'#ffd38b',emissiveIntensity:.6})};
 const geos={box:new T.BoxGeometry(1,1,1),cyl:new T.CylinderGeometry(1,1,1,10),cone:new T.ConeGeometry(1,1,9),orb:new T.SphereGeometry(1,6,4)};
 function shape(geo,mat,x,y,z,sx,sy,sz){const o=new T.Mesh(geo,mat);o.position.set(x,y,z);o.scale.set(sx,sy,sz);o.castShadow=true;o.receiveShadow=true;root.add(o);return o}
 const box=(x,y,z,w,h,d,mat=m.wood)=>shape(geos.box,mat,x,y,z,w,h,d);
 const cyl=(x,y,z,r,h,mat=m.dark)=>shape(geos.cyl,mat,x,y,z,r,h,r);
 const orb=(x,y,z,rx,ry,rz,mat)=>shape(geos.orb,mat,x,y,z,rx,ry,rz);
 function flat(x,y,z,w,d,mat,order){let o;if(w>40||d>40){o=new T.Mesh(new T.PlaneGeometry(w,d),mat);o.rotation.x=-Math.PI/2;o.position.set(x,y,z);o.receiveShadow=true;root.add(o)}else o=box(x,y,z,w,.025,d,mat);if(software)o.renderOrder=order;o.castShadow=false;return o}
 function strip(pointsA,pointsB,y,mat,order){const pos=[],uv=[];for(let i=0;i<pointsA.length-1;i++){const a=pointsA[i],b=pointsA[i+1],c=pointsB[i+1],d=pointsB[i];for(const p of[a,b,c,a,c,d]){pos.push(p[0],y,p[1]);uv.push(p[0]*.05,p[1]*.05)}}const geo=new T.BufferGeometry();geo.setAttribute('position',new T.Float32BufferAttribute(pos,3));geo.setAttribute('uv',new T.Float32BufferAttribute(uv,2));geo.setIndex(Array.from({length:geo.attributes.position.count},(_,i)=>i));geo.computeVertexNormals();const o=new T.Mesh(geo,mat);o.receiveShadow=true;if(software)o.renderOrder=order;root.add(o);return o}
 function beam(x1,y1,z1,x2,y2,z2,width,mat=m.dark){const a=new T.Vector3(x1,y1,z1),b=new T.Vector3(x2,y2,z2),o=box(0,0,0,width,a.distanceTo(b),width,mat);o.position.copy(a).add(b).multiplyScalar(.5);o.quaternion.setFromUnitVectors(new T.Vector3(0,1,0),b.sub(a).normalize());return o}
 // Coastal edge runs north/south to the right of the building.
 flat(-112,-.73,80,270,290,m.lawn,-900);
 flat(150,-.82,-5,260,420,m.sea,-920);
 const shore=[],wet=[],foam=[],land=[],offshore=[];
 for(let z=-65;z<=210;z+=6.5){const coast=34+Math.sin(z*.055)*3.2+Math.sin(z*.16)*.7;shore.push([coast,z]);wet.push([coast-1.8,z]);foam.push([coast+.7,z]);land.push([23+Math.sin(z*.05)*1.2,z]);offshore.push([coast+10,z])}
 strip(land,wet,-.69,m.sand,-880);strip(wet,shore,-.70,m.wetSand,-879);strip(shore,offshore,-.78,m.shallows,-910);strip(shore,foam,-.72,m.surf,-878);
 // Broken white surf lines and a few sea glints; no perpetual render loop.
 for(let i=0;i<24;i++){const z=-34+i*3.5,x=42+Math.sin(z*.1)*2;flat(x,-.735,z,.055,1.8,m.surf,-877)}
 for(let i=0;i<20;i++)flat(49+(i%5)*5,-.75,-22+Math.floor(i/5)*12+(i%3)*2,.045,1.2+(i%4),m.shallows,-876);
 // Street, sidewalks, front drive and accessible pedestrian route around stairs.
 flat(-78,-.66,26,200,7,m.road,-860);flat(-78,-.65,21.85,200,1.3,m.paving,-855);flat(-78,-.65,30.15,200,1.3,m.paving,-855);
 for(let x=-173;x<=20;x+=5)flat(x,-.635,26,2.4,.12,m.roadMark,-850);
 for(const z of[22.8,29.2])flat(-78,-.635,z,200,.1,m.roadMark,-850);
 for(let i=0;i<7;i++)flat(1.5,-.63,23.2+i*.85,3.6,.4,m.roadMark,-849);
 flat(-2,-.62,14.8,8,14,m.paving,-845);flat(-1.7,-.63,0,38,24,m.paving,-845);
 for(let x=-19;x<=16;x+=2)flat(x,-.605,12.05,.025,3.2,m.stone,-840);
 flat(-19.4,-.60,7.9,2,13,m.paving,-842);flat(-10,-.60,13.6,20,2,m.paving,-842);
 // Two shallow entrance steps join the courtyard to the office/stair foundation.
 box(-15.3,-.34,2.2,4.4,.3,.7,m.stone);box(-15.3,-.08,1.75,4.4,.22,.4,m.wood);
 // Enclosed garden with openings at the street gate and the beach path.
 function fence(x1,z1,x2,z2){const distance=Math.hypot(x2-x1,z2-z1),posts=Math.ceil(distance/3),slats=Math.ceil(distance/.45);beam(x1,-.08,z1,x2,-.08,z2,.2,m.stone);for(const y of[.1,.85])beam(x1,y,z1,x2,y,z2,.07,m.dark);for(let i=0;i<=slats;i++){const t=i/slats;box(x1+(x2-x1)*t,.37,z1+(z2-z1)*t,.055,1.12,.055,m.dark)}for(let i=0;i<=posts;i++){const t=i/posts,x=x1+(x2-x1)*t,z=z1+(z2-z1)*t;box(x,.25,z,.25,1.7,.25,m.stone);box(x,1.13,z,.31,.07,.31,m.brass)}}
 fence(-25,19,-6,19);fence(3,19,23,19);fence(-25,-18,-25,19);fence(-25,-18,23,-18);fence(23,-18,23,3.4);fence(23,7.6,23,19);
 for(const x of[-6,3]){box(x,.65,19,.65,2.6,.65,m.dark);box(x,1.98,19,.72,.08,.72,m.brass)}
 // Open gate leaves parallel to the drive, clear of the entrance route.
 fence(-5.8,19,-5.8,16.1);fence(2.8,19,2.8,16.1);
 box(9.5,.7,19,7,.95,.2,m.dark);box(9.5,.75,19.13,6.5,.025,.02,m.brass);
 // Pine trees reuse three layered conical crowns each.
 function pine(x,z,height=5){cyl(x,height*.28-.65,z,.16,height*.6,m.wood);for(let i=0;i<3;i++){const h=height*(.56-i*.08),r=height*(.28-i*.055),y=height*(.39+i*.21)-.6;shape(geos.cone,i%2?m.pineLight:m.pine,x,y,z,r,h,r)}}
 for(const [x,z,h]of[[-22,-13,6],[-22,-5,5.4],[-22,3,5],[-22,11,5.8],[-15,-15,5.8],[-6,-15,6.5],[4,-15,5.8],[14,-15,6.3],[20,-11,5.6],[20,-3,4.8],[20,11,5.2],[-31,12,6.5],[-34,3,6],[-30,-10,7],[-34,-22,7],[-23,-25,6],[-12,-24,7.4],[1,-25,6.2],[16,-25,7.5],[27,-27,5.5]])pine(x,z,h);
 // Raised rose beds around the front courtyard and along the garden path.
 function roseBed(x,z,w,d,count){box(x,-.4,z,w,.5,d,m.stone);flat(x,-.135,z,w-.2,d-.2,m.soil,-830);for(let i=0;i<count;i++){const px=x-w*.35+(i%3)*w*.35,pz=z+(Math.floor(i/3)%2-.5)*d*.36;orb(px,.03,pz,.56,.3,.4,m.leaf);for(let j=0;j<3;j++){const xx=px+Math.cos(j*2.1)*.29,zz=pz+Math.sin(j*2.1)*.24,y=.52+(j%2)*.15;cyl(xx,y/2,zz,.018,y,m.leaf);const rose=[m.rose,m.rosePink,m.roseCream][i%3];for(let k=0;k<5;k++){const a=k*Math.PI*2/5;orb(xx+Math.cos(a)*.09,y,zz+Math.sin(a)*.09,.12,.075,.12,rose)}orb(xx,y+.04,zz,.07,.07,.07,m.rose)}}}
 for(const x of[-14,-8,8,15])roseBed(x,16,4.3,1.65,6);roseBed(-22,15.8,2,3,3);roseBed(20,16,2,3,3);
 function bench(x,z,angle=0){const q=new T.Group();root.add(q);const items=[];for(let i=0;i<4;i++)items.push(box(x,.03,z-.24+i*.16,2.7,.08,.12,m.wood));for(let i=0;i<3;i++)items.push(box(x,.43+i*.15,z-.34,2.7,.1,.08,m.wood));for(const s of[-1,1]){items.push(box(x+s*1.06,-.27,z,.09,.6,.62,m.dark));items.push(box(x+s*1.06,.3,z-.34,.06,1.05,.06,m.dark))}for(const o of items){q.attach(o)}q.position.set(x,0,z);for(const o of items)o.position.sub(q.position);q.rotation.y=angle}
 bench(-12,12.6,Math.PI);bench(10,13,Math.PI);bench(20,-.5,Math.PI/2);
 // Lamp posts, low bollards, and two bicycle racks.
 for(const [x,z]of[[-6.5,15],[4.1,15],[-24,7],[21,-8],[21,12],[-18,22],[13,22]]){cyl(x,.95,z,.055,3.2,m.dark);box(x,2.57,z,.48,.13,.48,m.dark);box(x,2.47,z,.34,.12,.34,m.lamp)}
 for(const x of[-4,0,4,8]){cyl(x,-.1,11.3,.085,1,m.dark);cyl(x,.37,11.3,.1,.09,m.lamp)}
 for(const x of[-20.5,-19.6]){beam(x,-.6,15,x,.2,15,.05,m.dark);beam(x,.2,15,x,.2,16.5,.05,m.dark);beam(x,.2,16.5,x,-.6,16.5,.05,m.dark)}
 // Timber walk through the beach gate to a small seaside deck.
 for(let x=16.5;x<=38;x+=.45)box(x,-.49,5.5,.39,.12,3.2,m.wood);
 box(37,-.58,5.5,5,.18,5,m.wood);for(const z of[3.4,7.6])for(const x of[35,38.8])cyl(x,-.43,z,.06,1.9,m.dark);
 for(const [x,z]of[[29,13],[30,-7]]){cyl(x,.65,z,.065,2.7,m.wood);shape(geos.cone,m.cream,x,2.15,z,2.4,.65,2.4);for(const xx of[x-1.3,x+1.3]){box(xx,-.27,z+.5,.85,.24,1.8,m.cream);const back=box(xx,.05,z-.4,.85,.15,.8,m.cream);back.rotation.x=-.6}}
 for(const [x,z]of[[26,17],[25,-4],[28,-18],[30,23],[27,8],[31,-12]])for(let k=0;k<4;k++){const o=shape(geos.cone,m.lawnLight,x+(k%2)*.25,-.25,z+Math.floor(k/2)*.22,.12,.85,.12);o.rotation.z=(k-1.5)*.12}
 // Irregular ridges rise behind the office, far peaks first.
 function mountain(x,z,w,d,h,mat,seed){
  const positions=[],uv=[],n=13,peak=[x+w*.1*Math.sin(seed),h-.7,z-d*.12],outer=[],inner=[];
  for(let i=0;i<n;i++){const a=i*Math.PI*2/n,r=.86+.12*Math.sin(i*2.7+seed);outer.push([x+Math.cos(a)*w*r,-.73,z+Math.sin(a)*d*r]);const r2=.38+.13*Math.sin(i*1.8+seed);inner.push([x+Math.cos(a)*w*r2,h*(.32+.22*(.5+.5*Math.sin(i*2.3+seed)))-.7,z+Math.sin(a)*d*r2])}
  const triangle=(a,b,c)=>{for(const p of[a,b,c]){positions.push(...p);uv.push(p[0]*.025,p[2]*.025)}};
  for(let i=0;i<n;i++){const next=(i+1)%n;triangle(outer[i],inner[i],inner[next]);triangle(outer[i],inner[next],outer[next]);triangle(inner[i],peak,inner[next])}
  const geo=new T.BufferGeometry();geo.setAttribute('position',new T.Float32BufferAttribute(positions,3));geo.setAttribute('uv',new T.Float32BufferAttribute(uv,2));geo.setIndex(Array.from({length:geo.attributes.position.count},(_,i)=>i));geo.computeVertexNormals();const o=new T.Mesh(geo,mat);o.castShadow=false;o.receiveShadow=true;root.add(o)
 }
 for(const [i,x]of[-59,-34,-8,18].entries())mountain(x,-53-(i%2)*8,22,19,[17,25,23,16][i],m.mountainFar,i+2);
 for(const [i,x]of[-49,-22,5].entries())mountain(x,-36-(i%2)*4,18,13,[12,16,11][i],i%2?m.mountainNear:m.mountain,i+7);
 const daytime=Object.fromEntries(Object.entries(m).map(([key,mat])=>[key,mat.color.clone()]));
 compact(root);
 // Kept for disposal by the scene owner. Colors respond to shared day/night lights.
 return {root,setNight(night){
  const nightColors={lawn:'#354f3c',lawnLight:'#526549',sand:'#a3aea0',wetSand:'#839385',road:'#293c40',paving:'#738178',stone:'#637569',pine:'#24493a',pineLight:'#345848',mountainFar:'#405d6b',mountain:'#3d5a53',mountainNear:'#314b43',sea:'#254c61',shallows:'#3d7178',surf:'#8cadb0'};
  for(const [key,color]of Object.entries(nightColors)){if(night)m[key].color.set(color);else m[key].color.copy(daytime[key])}
  m.lamp.emissiveIntensity=night?2.4:.6;
 }};
}
