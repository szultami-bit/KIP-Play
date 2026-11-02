# Automatic Repairs Implementation Plan

> For agentic workers: use superpowers:executing-plans for inline execution and one independent final review.

**Goal:** Automatically collect failures, execute bug fixes through the scheduled coding agent, and show verified repair progress.
**Architecture:** Node 24 SQLite repair store and collector; owner-only read API; bounded internal CLI for an external coding agent. Existing manual reviews stay independent. Hourly ChatGPT automation supplies the coding executor.
**Tech Stack:** Node 24, SQLite, existing campus JavaScript/Vite, Hostinger, GitHub, ChatGPT Automations.
**Spec:** ../specs/2026-11-02-automatic-repairs-design.md

## Global Constraints
Preserve authentication, data and existing source changes. No arbitrary commands from reports, no auto-approval of unknown releases, no false repair completion. Source remains in its original repository.

## Review Focus
- Concurrent claims and stale leases must not permit two repair writers.
- Fresh or changed evidence during work must invalidate obsolete completion.
- Stale reports and initial diagnostics must never appear repaired.
- No internal claim token or credentials may reach browser responses.
- Startup and runtime packaging must include every new dependency; preserve current production mounts and identity.

### Task 1: Durable repair queue and collector
Files: server/repairs.mjs, server/repair-collector.mjs, tests/repairs.test.mjs.
Interfaces: makeRepairs({path,clock}), observeMonitor(report), observeIncidents(issues), claim({worker}), heartbeat({id,token}), result({id,token,...}), list().
- [ ] Write and run failing tests for automatic intake, persistence/deduplication, single claim, lease expiry, evidence changes, valid result receipt and fresh post-repair confirmation.
- [ ] Implement queue and collector, then run all tests.

### Task 2: Honest board and bounded executor interface
Files: server/main.mjs, server/http.mjs, scripts/repair-cli.mjs, campus/src/workboard.js, campus/src/task-board.js, tests/repairs-http.test.mjs, tests/board.test.mjs.
- [ ] Test manual review cannot put a card in doing; test owner-only repair response hides leases and POST execution is unavailable.
- [ ] Wire collector, read API and CLI; render repair progress and blockers alongside checks. Diagnosis is not repaired.
- [ ] Run the full suite and build.

### Task 3: Deployment, first incident and ongoing executor
Files: release packaging and deployment evidence; approved observer configuration only if independently verified.
- [ ] Verify exact deployed source receipt against live identity; reconcile only the reviewed baseline.
- [ ] Run independent whole-branch review and fix material findings with regression tests.
- [ ] Publish immutable package and deploy with existing state; verify full suite, health, queue and persistence on VPS.
- [ ] Configure hourly repair automation with exact bounded scope and claim/result procedure; run first repair and record evidence now.
- [ ] Report actual live status, schedule and any unresolved owner login limitation.
