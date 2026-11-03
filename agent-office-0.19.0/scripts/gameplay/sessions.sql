with clock as (select now() as observed), mapped as (
 select case when a.game='wheel' then 'lucky-wheel' when a.game='tower' then 'tower-challenge' when a.game='animal' then 'animal-party' when a.game is not null and a.game<>'' then a.game when a.template='wheel' then 'practice-wheel' else a.template end as game,
 p.total,p.completed,p.finished_at,p.started_at
 from kip_private.community_playthroughs p join kip_private.community_activities a on a.id=p.material_id,clock
 where p.started_at>=clock.observed-interval '30 days' and p.started_at<=clock.observed
), counts as (
select game,count(*)::int as started,count(*) filter(where finished_at is not null and total>0 and completed>=total)::int as completed,
count(*) filter(where not(finished_at is not null and total>0 and completed>=total) and started_at<(select observed from clock)-interval '3 hours')::int as "incompleteOver3h"
from mapped group by game
)
select jsonb_build_object('schemaVersion',1,'observedAt',floor(extract(epoch from observed)*1000)::bigint,'windowStart',floor(extract(epoch from observed-interval '30 days')*1000)::bigint,'windowEnd',floor(extract(epoch from observed)*1000)::bigint,'scope','recorded-material-playthroughs','includesTests',true,'games',(select coalesce(jsonb_agg(to_jsonb(counts) order by started desc,game),'[]'::jsonb) from counts)) as report from clock;
