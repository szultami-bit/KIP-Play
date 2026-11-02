# Active account task — 2 November 2026

Status: IMPLEMENTASI; NOT DEPLOYED.

Uses existing agent `growth-stats` (Statistik Game), existing skill `game-statistics` and existing owner-authenticated aggregate RPC. No new agent, authority, model API, SQL migration or credential store.

## Behavior

The task catalog adds `active-accounts-check` (Pantau akun aktif). An authenticated same-origin POST to the existing jobs API reads the current growth aggregate using the owner's existing session. The shared cache retains only validated aggregate data. The fixed worker consumes a cloned snapshot without receiving credentials or a request object. Durable task results retain the sample time and report PARTIAL.

Scope: public accounts with device activity observed in the preceding five minutes; not all registered accounts and not proof of currently playing. Internal staff and marked test accounts are excluded by the existing RPC. This differs from the separate ChatGPT monitor. Playing count remains null/UNKNOWN; game leases and guest participants are not covered. No continuous collector or new schedule is installed by this change.

Stale (>120 seconds), future, malformed or absent evidence blocks the task. A process restart clears the aggregate cache; an owner request is required to refresh it. Existing idempotent requests, worker leases and pinned skill checks apply. No new external write endpoint, room closing, account mutation or message delivery.

## Validation

Node 24.22.1; npm test: 119 passed, zero failed/cancelled/skipped after npm run build. Build passed (existing campus chunk ~651 kB warning retained). The first full suite failed because the locally reconstructed checkout lacked dist; building resolved it. The first build lacked the unchanged src/roles.ts file; restoring that exact pinned source resolved it, without a production code workaround.

New tests exercise actual HTTP server, growth reader, SQLite task queue and worker: anonymous/cross-origin denial, duplicate request idempotence, existing-agent routing, persisted result/reopen, credential exclusion, stale/future/invalid data and cache copy/failure behavior. No production gameplay, load test or owner-browser acceptance was performed.

## Deployment boundary

Source parent: 9b9176fa2ca3320d70325682f37cf0e30c46e63b on feat/agent-office-019-ops.
Fresh VPS read: legacy project kip-agent-office-20261031 and candidate kip-agent-office-016-candidate are healthy; labels alone are not app-version proof. Candidate logs include RUNTIME_PREPARED and OPS019_RUNTIME_PROBE for the existing 78ee5f4 application, not this change. Public office opens its owner login page and protected API requests return 401. No session was fabricated.

The existing prepare-runtime-019.mjs remains pinned to the prior manifest. Running that bootstrap will NOT install this task. Release ownership, new immutable runtime manifest and owner acceptance must be resolved before promotion. Do not overwrite either team's runtime/state volume, reset skills.json, bypass login, or treat this PR/local tests as live activation. The existing hourly ChatGPT monitor remains separate.

