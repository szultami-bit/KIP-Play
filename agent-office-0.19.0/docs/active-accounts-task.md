# Active account task and current-player column
Updated: 2 November 2026.

## Installed scope
Existing agent: growth-stats (Statistik Game); existing skill: game-statistics. No new AI agent, model API, database migration, account changes or automation.

The fifth statistics card is **Pemain aktif sekarang — UNKNOWN**. The existing source reports device observations, not authoritative play-state and participant presence. Positive activity, active leases or unverified player fields cannot populate this count. Four existing public-account counters retain their definitions. Internal/marked test accounts are excluded by this source, unlike the separate ChatGPT aggregate monitor.

The fixed task catalog includes active-accounts-check (Pantau akun aktif). An authenticated owner request refreshes the existing aggregate reader and enqueues one idempotent job. The worker reads only a cloned sanitized snapshot and persists PARTIAL results, sample time and confirmedPlaying=null. Stale, future, invalid or absent evidence blocks the job. No continuous credential-backed collector was added; after restart an authenticated owner request refreshes the cache.

## Verified VPS deployment
- VM 2091961; existing project kip-agent-office-016-candidate.
- Application commit: 57e629fd5d1dcc6da249e2626d5d265546b21bfa.
- Bootstrap commit: fc531e5047e9f033101b522e6cadc98a0c80cc72.
- Bootstrap SHA256: c80dd0e631471aa337f116046833692e3d4d387f7a3c3e96444e1e89c60aa148.
- New immutable code volume: kip-agent-office-019-runtime-57e629f.
- Existing data volume retained: kip-agent-office-018-candidate-20261102_state.
- Official Hostinger Docker Compose deployment action 123238626 succeeded at 2026-11-02T08:36:27Z.
- 08:36:03Z: 120 tests passed on VPS; RUNTIME_PREPARED names the exact application commit, followed by OFFICE_READY.
- 08:36:19Z: OPS019_RUNTIME_PROBE PASS; isolated queue/recovery/results checks, owner registry unchanged, 14 agents, revision 0.
- Runtime container healthy; prepare/permissions/probe exited 0. Fresh compose matches the intended configuration; healthcheck validates the exact .ready application SHA.
- Changes to deployment were limited to the code volume, pinned bootstrap SHA/hash and pinned healthcheck. Existing service configuration, authentication, state, observer mounts and network are retained. No DNS/game deployment or data deletion.

The initial deployment request returned validation HTTP 422 for the optional environment field; no action was accepted. Omitting that unused field while preserving all inline service environment settings succeeded. No credentials were printed or changed.

## Validation
Build passed. Full local suite: 120 passed, zero failed/skipped/cancelled. Exact 102-file immutable manifest was separately downloaded, hash-verified and passed the same 120 tests locally, then again on VPS. Existing campus bundle-size warning (~651 kB) remains.

New UI regression checks the fifth card and UNKNOWN even with positive device activity or an injected player count. Existing HTTP/SQLite tests cover authorization, idempotency, persisted results, credential exclusion, stale/invalid evidence and worker routing. Both React and campus use the same metric renderer.

## Remaining acceptance
The browser available to this task still shows the owner login page. Therefore owner-authenticated UI visibility and execution of a real active-accounts-check job are **NOT_VERIFIED / NOT_RUN**. Public healthz responds 200, but does not expose an application fingerprint, so it alone is not evidence of public routing to this candidate. VPS installation is proven; do not call the current-player number available, claim a real owner job completed, or claim public UI acceptance.

Use the existing owner session to inspect Statistik Game and run Pantau akun aktif after verifying the public route serves this candidate. An actual playing count requires a separate authoritative runtime/presence source. Keep the prior immutable runtime volume available for rollback; preserve current skills.json and tasks.sqlite.
