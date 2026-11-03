import assert from 'node:assert/strict';

// Synthetic One Screen checks. Seed only a teacher's input question pack, never
// a room, score, answer, completion flag, or persisted match. Authoring, paid AI,
// production Supabase, and Live multiplayer are outside these scenarios.
export const scenarioLimits = Object.freeze([
  'Prepared teacher input; Studio authoring is not exercised.',
  'One Screen only; production authentication and Live rooms are not covered.',
]);
const origin = 'http://localhost:18798';
const questions = [
  {text:'Which animal says meow?',choices:['Cat','Dog','Cow','Duck'],answer:0},
  {text:'What color is a ripe banana?',choices:['Blue','Yellow','Purple','Black'],answer:1},
  {text:'Which object tells the time?',choices:['Spoon','Plate','Clock','Pillow'],answer:2},
  {text:'Which drink comes from a cow?',choices:['Tea','Juice','Coffee','Milk'],answer:3},
  {text:'Which room is used for cooking?',choices:['Kitchen','Bedroom','Bathroom','Garage'],answer:0},
  {text:'What do people use to write on paper?',choices:['Fork','Pencil','Cup','Shoe'],answer:1},
];
const answerByQuestion = new Map(questions.map(q=>[q.text,q.choices[q.answer]]));

async function seed(page, game) {
  if (new URL(page.url()).origin !== origin) throw Error('ISOLATED_QA_ORIGIN_REQUIRED');
  await page.evaluate(({game,questions})=>{
    const key='kip:fun-studio:launch:v1'+(game==='wheel'?':wheel':'');
    sessionStorage.removeItem(game==='wheel'?'kip:wheel:screen:v1':'kip:tower:one-screen:v2-distinct');
    sessionStorage.setItem(key,JSON.stringify({version:1,game,title:'Synthetic completion check',questions,mode:'screen',size:2,seconds:30,createdAt:Date.now()}));
  },{game,questions});
}

async function answerVisibleQuestion(page, seen) {
  const title=page.locator('#question-title');
  await title.waitFor({state:'visible',timeout:15000});
  const question=(await title.textContent()).trim();
  const answer=answerByQuestion.get(question);
  assert.ok(answer,'VISIBLE_QUESTION_MUST_MATCH_PREPARED_INPUT');
  assert.ok(!seen.has(question),'QUESTION_MUST_NOT_REPEAT_BETWEEN_TEAMS');
  const choice=await page.locator('[data-action="answer"]:enabled').evaluateAll((buttons,answer)=>{
    const matching=buttons.filter(b=>b.textContent.trim().replace(/^[ABCD]\s*/, '').trim()===answer);
    return matching.length===1?matching[0].dataset.choice:null;
  },answer);
  assert.notEqual(choice,null,'EXACT_CORRECT_CHOICE_MUST_BE_VISIBLE');
  await page.locator('[data-action="answer"][data-choice="'+choice+'"]:enabled').click();
  seen.add(question);
  return answer;
}

export async function wheelScenario(page, mark=()=>{}) {
  await seed(page,'wheel');
  await page.goto(origin+'/games/lucky-wheel/?studio=1&mode=screen',{waitUntil:'domcontentloaded'});
  await page.locator('#start-form').waitFor({state:'visible',timeout:20000});
  await page.locator('#name-0').fill('QA Cyan');
  await page.locator('#name-1').fill('QA Violet');
  await page.locator('#start-form button[type="submit"]').click();
  await page.locator('[data-action="spin"]').waitFor({state:'visible'});
  mark('start');
  const seen=new Set();
  for(let i=0;i<questions.length;i++) {
    await page.locator('[data-action="spin"]').click();
    const answer=await answerVisibleQuestion(page,seen);
    await page.locator('[data-action="next"]').waitFor({state:'visible'});
    assert.ok((await page.locator('.lw-feedback').textContent()).includes(answer),'WHEEL_ANSWER_FEEDBACK_REQUIRED');
    assert.equal(await page.locator('.lw-round-recap .good').count(),1,'WHEEL_CORRECT_SCORE_REQUIRED');
    if(i===0)mark('answer');
    await page.locator('[data-action="next"]').click();
  }
  await page.locator('.lw-final #result-title').waitFor({state:'visible'});
  assert.equal(seen.size,questions.length,'EVERY_QUESTION_MUST_BE_ANSWERED');
  assert.equal(await page.locator('.lw-final .lw-ranks li').count(),2,'BOTH_TEAMS_MUST_HAVE_RESULTS');
  assert.deepEqual(await page.locator('.lw-final .lw-ranks strong small').allTextContents(),['3 benar','3 benar'],'WHEEL_COMPLETION_REQUIRES_ALL_CORRECT_ANSWERS');
  mark('result');
  await page.locator('[data-action="restart"]').click();
  await page.locator('[data-action="spin"]').click();
  await page.locator('[data-action="answer"]:enabled').first().waitFor({state:'visible',timeout:15000});
  assert.equal(await page.locator('.lw-final').count(),0,'REPLAY_MUST_LEAVE_RESULTS');
  assert.deepEqual(await page.locator('.lw-ranks strong small').allTextContents(),['0 benar','0 benar'],'REPLAY_MUST_RESET_SCORES');
  mark('replay');
  return {completedSessions:1,answeredQuestions:seen.size,teams:2};
}

export async function towerScenario(page, mark=()=>{}) {
  await seed(page,'tower');
  await page.goto(origin+'/games/tower/one-screen.html?studio=1',{waitUntil:'domcontentloaded'});
  await page.locator('#start').waitFor({state:'visible',timeout:20000});
  await page.locator('#name-0').fill('QA Cyan');
  await page.locator('#name-1').fill('QA Violet');
  await page.locator('#start button[type="submit"]').click();
  await page.locator('#question-title').waitFor({state:'visible'});
  mark('start');
  const seen=new Set();
  for(let round=0;round<questions.length/2;round++) {
    for(let team=0;team<2;team++) {
      // The UI intentionally debounces input for 300 ms after every answer.
      if(seen.size)await page.waitForTimeout(350);
      await answerVisibleQuestion(page,seen);
      if(team===0) {
        await page.locator('[data-action="next-team"]').waitFor({state:'visible'});
        if(round===0)mark('answer');
        await page.locator('[data-action="next-team"]').click();
      }
    }
    await page.locator('[data-action="next"]').waitFor({state:'visible'});
    assert.equal(await page.locator('.tw-round-results .correct').count(),2,'TOWER_BOTH_TEAMS_MUST_SCORE');
    await page.locator('[data-action="next"]').click();
  }
  await page.locator('.tl-result #result-title').waitFor({state:'visible'});
  assert.equal(seen.size,questions.length,'EVERY_QUESTION_MUST_BE_ANSWERED');
  assert.equal(await page.locator('.tl-result .tl-ranking li').count(),2,'BOTH_TEAMS_MUST_HAVE_RESULTS');
  const scores=(await page.locator('.tl-result .tl-ranking li b').allTextContents()).map(x=>Number(x.replace(/\s*pts\s*$/,'')));
  assert.deepEqual(scores,[30,30],'TOWER_COMPLETION_REQUIRES_THREE_CORRECT_ANSWERS_PER_TEAM');
  mark('result');
  await page.locator('[data-action="restart"]').click();
  await page.locator('[data-action="answer"]:enabled').first().waitFor({state:'visible'});
  assert.equal(await page.locator('.tl-result').count(),0,'REPLAY_MUST_LEAVE_RESULTS');
  assert.equal(await page.locator('[data-action="answer"]:enabled').count(),4,'REPLAY_MUST_ACCEPT_NEW_ANSWERS');
  mark('replay');
  return {completedSessions:1,answeredQuestions:seen.size,teams:2};
}
