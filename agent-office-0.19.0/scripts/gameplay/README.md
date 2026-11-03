# Gameplay monitoring

Office distinguishes recorded production material playthroughs from isolated browser checks. HTTP availability never certifies gameplay.

The existing five-role team remains on floor 2. The monitor imports validated reports from `/gameplay`; fresh failed scenarios matching the approved live release enter the existing coordinator/IT repair queue once per run. A failed check requires diagnosis: test-fixture failures are not automatically production bugs. UI/server specialists and QA use the existing repair evidence workflow.

## Evidence

- `sessions.sql` is a read-only 30-day aggregate of existing completion records. It returns no user identifiers. Data can include internal/testing use, covers only instrumented materials and unfinished sessions are not automatically bugs.
- Initial browser scenarios: EduRace kart One Screen, LuckyWheel One Screen and Tower One Screen. They use actual UI/engines, answer all six prepared questions, assert both teams' results and exercise replay. No forced finish or score injection.
- Inputs are seeded; Studio authoring and paid AI are excluded. Account/material upstream is explicitly synthetic. These runs do not certify production Supabase, production authentication, Live rooms, other EduRace arenas or all devices.
- `prepare.mjs` validates the private source audit receipt and original build fingerprint before/after constructing the isolated environment. Never copy private source into this repository.
- `daemon.mjs` runs a bounded suite, closes browsers/runtime, then waits one hour. Only its owned synthetic room directory is reset. The service has no network, published ports, production data volume or Docker socket.
- The source release/fingerprint is checked against the current healthy approved observer report. Changed releases show STALE_RELEASE; evidence older than two hours shows STALE. Uncovered games/modes remain untested.

## Operation

Hostinger VM2091961: runner `kip-gameplay-runner-20261103`; QA volume `kip-gameplay-qa-20261103`; reports `kip-gameplay-reports-20261103`. Office mounts reports read-only. The existing hourly repair automation refreshes the aggregate with the Supabase connector and writes only validated aggregate JSON atomically using `kip-gameplay-metrics-20261103`.

After an authorized game release, stop the QA runner, rebuild from the actual audited deployed source, and run the relevant checks before resuming. Preserve the fixture/network boundary. Never replace the recorded identity with a new live hash without rebuilding/testing. Preserve previous evidence as stale if access or rebuilding fails.

Error counts include repeated retained client/synthetic incidents, excluding HTTP-only checks. Repair duration measures task creation to verified repair; recovery without a fix and unresolved work are excluded. No duration is invented when there are no verified repairs.
