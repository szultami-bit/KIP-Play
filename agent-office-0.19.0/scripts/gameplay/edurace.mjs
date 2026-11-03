import assert from 'node:assert/strict';
const origin='http://localhost:18798';
const questions=[
 {text:'Which animal says meow?',choices:['Cat','Dog','Cow','Duck'],answer:0},
 {text:'What color is a ripe banana?',choices:['Blue','Yellow','Purple','Black'],answer:1},
 {text:'Which object tells the time?',choices:['Spoon','Plate','Clock','Pillow'],answer:2},
 {text:'Which drink comes from a cow?',choices:['Tea','Juice','Coffee','Milk'],answer:3},
 {text:'Which room is used for cooking?',choices:['Kitchen','Bedroom','Bathroom','Garage'],answer:0},
 {text:'What do people use to write on paper?',choices:['Fork','Pencil','Cup','Shoe'],answer:1},
];
// Only teacher inputs are seeded. Room, score and completion are produced by UI actions.
export async function eduraceScenario(page,mark=()=>{}){
 assert.equal(new URL(page.url()).origin,origin);
 await page.evaluate(questions=>{
  const draft={arena:'kart',title:'Synthetic race completion',questions:questions.slice(0,3),index:0,mode:'screen',size:2,teams:['QA Cyan','QA Violet'],minutes:5,reviewed:true,topic:'Mixed basics',level:'basic',count:3,arenaChosen:false};
  draft.teamPreparation={key:JSON.stringify([2,draft.questions,draft.size,draft.level,draft.topic,draft.title]),decks:[questions.slice(0,3),questions.slice(3)],reviewed:[true,true]};
  localStorage.setItem('kip:eduracing:draft:v1',JSON.stringify(draft));sessionStorage.removeItem('kip:eduracing:local:v1');
 },questions);
 await page.goto(origin+'/games/eduracing/',{waitUntil:'domcontentloaded'});
 await page.locator('[data-action="mode-screen"]').click();
 await page.locator('[data-action="material-next"]').click();
 await page.locator('[data-action="select-arena"][data-arena="kart"]').waitFor({state:'visible',timeout:20000});
 mark('material-save');
 await page.locator('[data-action="select-arena"][data-arena="kart"]').click();
 await page.locator('[data-action="settings"]').click();
 await page.locator('[data-action="launch"]').click();
 await page.locator('[data-action="start"]').click();
 await page.locator('[data-action="answer"]').first().waitFor({state:'visible'});mark('start');
 const seen=new Set();
 for(let i=0;i<questions.length;i++){
  const title=page.locator('.question-panel > h2');await title.waitFor({state:'visible'});
  const text=(await title.textContent()).trim(),q=questions.find(q=>q.text===text);
  assert.ok(q,'EXPECTED_QUESTION');assert.ok(!seen.has(text),'QUESTIONS_MUST_BE_DISTINCT');
  const index=await page.locator('[data-action="answer"]').evaluateAll((buttons,answer)=>{
   const hits=buttons.filter(b=>b.textContent.trim().replace(/^[ABCD]\s*/,'').trim()===answer);
   return hits.length===1?hits[0].dataset.answer:null;
  },q.choices[q.answer]);assert.notEqual(index,null,'CORRECT_CHOICE_VISIBLE');
  await page.locator('[data-action="answer"][data-answer="'+index+'"]').click();seen.add(text);
  if(i===0)mark('answer');
  if(i<questions.length-1)await page.waitForFunction(last=>document.querySelector('.question-panel > h2')?.textContent.trim()!==last&&document.querySelector('[data-action="answer"]'),text);
 }
 await page.locator('.results-head h1').waitFor({state:'visible'});
 assert.equal(await page.locator('.results-table tbody tr').count(),2);
 assert.deepEqual(await page.locator('.results-table tbody tr td:last-child').allTextContents(),['Finish','Finish']);
 assert.deepEqual(await page.locator('.results-table tbody tr td:nth-child(3)').allTextContents(),['3 / 3','3 / 3']);
 mark('result');
 await page.locator('[data-action="replay"]').click();await page.locator('[data-action="start"]').click();
 await page.locator('[data-action="answer"]').first().waitFor({state:'visible'});mark('replay');
 return {completedSessions:1,answeredQuestions:seen.size,teams:2};
}
