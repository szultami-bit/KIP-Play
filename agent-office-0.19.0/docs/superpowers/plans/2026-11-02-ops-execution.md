# Agent Office operational execution implementation plan

> For agentic workers: use superpowers:executing-plans, completing tasks in order.

Goal: persist and run read-only tasks, intake one game's errors and automatically assign diagnosis.
Architecture: extend existing Node 24 HTTP server and board; SQLite task queue separate from skills JSON; existing report readers provide evidence.
Tech Stack: Node 24, built-in sqlite, vanilla JS, Vite.
Spec: docs/superpowers/specs/2026-11-02-ops-execution.md

## Global constraints
Preserve 0.18.0 DM profile and owner authentication. No external messaging, paid model API, arbitrary shell execution, production promotion without owner acceptance, or publication of private game source. Browser policy denial remains binding. No modification of production data for verification.

## Review focus
- Lost responses must not duplicate tasks; same request ID with changed payload must conflict.
- An interrupted worker must recover work and fence stale completions.
- Changing/removing an active skill between enqueue and execution must block that task.
- Adversarial incident contents must not become code, prompts, unsafe URLs or exposed PII.
- A completed diagnosis must never be presented as a repaired game or current healthy evidence when stale.

## Task 1: snapshot and isolated restore
Files: server/registry-backup.mjs, scripts/backup-registry.mjs, tests/registry-backup.test.mjs.
Interface: backupRegistry({sourcePath,backupDirectory,restoreDirectory,clock}) returns receipt {id,sha256,revision,bytes,restored:true} and never writes sourcePath.
- [ ] Reproduce missing snapshot behavior; cover changed-latest-write, corrupt/truncated source, symlink source, existing restore target and tampered backup.
- [ ] Implement atomic immutable backups with SHA-256 receipt, safe bounded reads and exclusive isolated restore.
- [ ] Run backup tests and full existing suite; deploy one-shot backup service with source state read-only, verify logs. Record owner acceptance BLOCKED separately.
- [ ] Commit source and evidence.

## Task 2: persistent execution
Files: server/tasks.mjs, server/task-runners.mjs, server/task-worker.mjs, server/http.mjs, server/main.mjs, campus/src/task-board.js, campus/src/workboard.js, campus/index.html, tests/tasks.test.mjs, tests/tasks-http.test.mjs.
Interfaces: makeTasks({path,clock}) offers enqueue, list, claim, finish, recover, incident; createTaskRequest(registry,{taskId,requestId}) pins the active skill; executeTask(job,{readRoles}) returns bounded structured result.
- [ ] Test durable enqueue, idempotency and conflicting reuse, lease recovery and completion fencing, missing/changed skills, owner/origin guards, unavailable/stale report blocking.
- [ ] Implement SQLite queue, allowlisted runners and bounded worker loop; add Jalankan controls and result display to board.
- [ ] Run task tests and full suite/build; commit.

## Task 3: incident intake and game pilot
Files: server/incidents.mjs, public/incident-client.js, tests/incidents.test.mjs, tests/incident-client.test.mjs; private game branch games/lucky-wheel/index.html and assets/js/office-incidents.js plus game-specific regression.
Interfaces: normalizeIncident(body) returns an allowlisted canonical record; intake deduplicates each occurrence and issue, applying bounded admission.
- [ ] Test schema, privacy constraints, origin/body/rate limits, duplicate reports, One Screen/Live capture, hidden/offline/disposed/finished budgets and no retries.
- [ ] Implement constrained receiver and client; integrate Lucky Wheel on private candidate branch.
- [ ] Run applicable game release gates and record any inaccessible deployment prerequisite honestly; commit.

## Task 4: coordinator and end-to-end evidence
Files: server/task-runners.mjs, server/incidents.mjs, campus/src/task-board.js, scripts/ops-probe.mjs, tests/ops-flow.test.mjs, docs/019-verification.md.
Interfaces: coordinator chooses only fixed task/agent mappings, enqueue within the incident transaction; result includes incident ID, evidence and explicit diagnosis-only boundary.
- [ ] Reproduce unassigned incidents; implement deterministic routing and automatic processing.
- [ ] Run end-to-end report -> dedup -> assignment -> execution -> stored result, interruption/reopen, and full build.
- [ ] Independent whole-branch review, fix important findings, then deploy a verified immutable runtime over preserved staging state with isolated verification data.
- [ ] Save source/receipts to GitHub and report DONE/BLOCKED separately; owner browser gate must not be labeled PASS.
