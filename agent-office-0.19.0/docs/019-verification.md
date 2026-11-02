# Office 0.19.0 operational candidate — 2 November 2026

Base: current 0.18.0 DM release; preserve 14 agents, owner auth and registry values. Candidate only; production gate remains closed.

| Step | Implemented and checked | Remaining gate |
| --- | --- | --- |
| 1. Release readiness | Latest VPS registry backed up, checksum verified and restored in isolated persistent backup volume. | Owner browser acceptance BLOCKED by existing browser policy denial. |
| 2. Task runner | Durable SQLite queue, owner/origin-protected Jalankan, three fixed read-only checks, original-request idempotency, lease recovery and stored results. | Runtime staging verification pending below. |
| 3. Game reports | Enum-only receiver, occurrence/issue deduplication, rate/storage caps, bounded Lucky Wheel client for screen/live. | Private game full audit, deploy build, deployed fingerprint and actual game capture NOT RUN. |
| 4. Coordinator | Fixed QA/accounts/health routing with coordinator+agent skill pins, resumable assignment, diagnosis results in board. | Live-game diagnosis is not proven; runtime isolated flow pending below. |

## Evidence
- Baseline: 100 tests. Current full local suite: 116 passed; build passed. Bundle-size warning remains (~651 kB main campus JS); no build error.
- Independent reviewer inspected 235bf5f..35f0590 and fix delta to b221b18. Two Important findings fixed (unavailable-agent starvation and identical intent retry after skill change); eight focused tests and isolated runtime probe independently passed. Code review ready; no Critical/Important outstanding. Minor recovery notice subsequently separated from submission notices.
- VPS backup receipt 2026-11-02T00:47:29.568Z: revision0, 14 agents, 14 skills, 15852 bytes, restored:true, source mount read-only. SHA256 `3b01bda980c12b0676f25b55c7b8c7c35baa1dc47f17c048e17aeabe308c91f5`. Snapshot `2026-11-02T00-47-29-470Z-e6d165de-b8e4-48c7-9428-4e17f0ea8c53`; separate volume `kip-agent-office-registry-backups-20261102`. Registry contents are not published.
- Three independent one-shot backup project actions reported success without visible containers. Those actions were NOT accepted as verification. Existing staging project's bounded backup probe produced the receipt above.
- Private game candidate: `szultami-bit/kip-english-universe`, branch `feat/lucky-wheel-office-incidents-019`, commit `c0f3873c47e025e59eedd20a27d4ff2c054032cf`, based on active VPS source branch ed042a6. Private game source stays private. Three focused client tests passed; complete checkout/audit unavailable. Existing game release approval does not cover this candidate.

## Execution and data boundaries
- Fixed deterministic runners only. Custom skill instructions are configuration; not executed as code or prompts. No paid model API, shell executor, message sending, patching or deployment action.
- Incident observations remain UNVERIFIED even after diagnosis completes. Build marker `019-pilot-1` identifies the pilot client; it is not a verified release fingerprint.
- Only fixed game/mode/build/category/error/asset fields and bounded line/column; no messages, stacks, tokens, identities, room codes or game contents.
- Client: at most 3 event sends/page plus CORS preflight, 5-second abort, no retries/polling, no hidden/offline/finished sends, pagehide cleanup. Receiver accepts only pilot origin and strict JSON; Origin is an admission check, not proof that reports are authentic.
- Pilot storage bounds: 1000 total jobs, 500 issues, 10000 occurrence receipts; 30 reports/minute and 500/day globally. No automatic deletion. At the cap ingestion/enqueue fails closed; archival/retention is follow-up work before expanding beyond pilot.
- Isolated runtime probe uses synthetic evidence and temp state. It never creates fake jobs/incidents in owner state and must not be reported as owner acceptance or live game proof.

## Rollback
Keep the 0.18.0 immutable runtime and backup volume. Registry schema is unchanged. The new tasks.sqlite is separate and may be retained when switching office code back to 0.18.0; do not overwrite current skills.json with an old snapshot. Restore only after comparing source revision and explicit recovery need.

## Deployment evidence
Pending at source publication; append actual immutable runtime and logs after deployment.
