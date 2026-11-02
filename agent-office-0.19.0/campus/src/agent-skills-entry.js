import {bindAgentSkills} from './agent-skills.js';

const $=selector=>document.querySelector(selector);
const hashes={office:'#kantor',board:'#papan',skills:'#agent-skill'};
function announce(message){const target=$('#announcement');if(target)target.textContent=message;}
function show(view,{hash=true}={}){
 if(!hashes[view])view='office';
 if(hash)history.replaceState(null,'',hashes[view]);
 for(const name of Object.keys(hashes)){
  const panel=$('#view-'+name),tab=$('#tab-'+name);if(panel)panel.hidden=name!==view;if(tab)tab.setAttribute('aria-pressed',String(name===view));
 }
 if(view==='office')dispatchEvent(new Event('resize'));
}
for(const name of Object.keys(hashes)){const tab=$('#tab-'+name);if(tab)tab.onclick=()=>show(name);}
addEventListener('hashchange',()=>show(Object.entries(hashes).find(([,hash])=>location.hash===hash)?.[0]||'office',{hash:false}));
const observer=new MutationObserver(()=>{
 if(!$('#view-office')?.hidden&&$('#view-skills')&&!$('#view-skills').hidden)show('office');
 else if(!$('#view-board')?.hidden&&$('#view-skills')&&!$('#view-skills').hidden)show('board');
});
for(const id of ['#view-office','#view-board']){const node=$(id);if(node)observer.observe(node,{attributes:true,attributeFilter:['hidden']});}
bindAgentSkills({announce});
show(Object.entries(hashes).find(([,hash])=>location.hash===hash)?.[0]||'office',{hash:false});
addEventListener('pagehide',()=>observer.disconnect(),{once:true});
