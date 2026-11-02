# Office 0.19.0 — verification, 2 November 2026

Office 0.19.0 is deployed and healthy on staging. The 0.18.0 DM profile, 14 agents, owner authentication and existing registry volume are preserved. The Lucky Wheel pilot is reviewed, built and green in CI, but is not published to game production. Owner browser acceptance remains blocked by the existing browser-policy restriction; no browser workaround or fabricated owner session was used.

| Step | Verified result | Remaining gate |
| --- | --- | --- |
| 1. Release readiness | Latest VPS registry backup, checksum verification and isolated persistent restore passed. | Owner browser acceptance. |
| 2. Task runner | Jalankan, durable queue, idempotent retries, skill pins, worker recovery and stored results operate in staging. | Owner UI acceptance. |
| 3. Game reports | Bounded enum-only receiver and Lucky Wheel screen/live client; deduplication, admission limits, full audit/build and CI passed. | Production publication, deployed fingerprint and actual game delivery. |
| 4. Coordinator | Fixed QA/accounts/health assignment and durable diagnosis results passed in isolated VPS execution. | Live-game observations; diagnosis never means repaired. |

## Office evidence

- 116 tests passed locally, in the exact 99-file manifest copy and on the VPS; zero failures. Build passed. Existing main campus bundle warning remains (~651 kB), not a build failure.
- Independent review found two Important issues: unavailable-agent starvation and retries conflicting after skill changes. Both fixed and regression tested. Eight focused tests and the isolated probe independently passed. No Critical or Important findings remain.
- Application commit: `78ee5f4975f7675c0e968bea19044386d825bbe0`; bootstrap: `4ee56bdf877d57e0e6cfef6c82dac20e37f5b78e`.
- VM `2091961`, project `kip-agent-office-016-candidate`, runtime volume `kip-agent-office-019-runtime-78ee5f4`, mounted read-only in office. Existing state volume `kip-agent-office-018-candidate-20261102_state` retained.
- 00:58:41Z: full 116-test VPS suite and RUNTIME_PREPARED passed. 00:58:42Z: OFFICE_READY with fixed read-only worker and no model API. 00:58:57Z: container Healthy. 00:58:58Z: OPS019_RUNTIME_PROBE passed durable reopen, lease recovery, incident deduplication, coordinator routing and stored results; isolated fixtures, unchanged owner-registry bytes, 14 agents, revision 0.
- Final deployment action `123175794`. An earlier preparation failed on runtime subfolder permissions; fixed ownership only in the candidate code volume. Healthcheck now verifies the 0.19.0 path, version and pinned application commit. Test preparation uses bounded serial execution.
- Reproducible redacted configuration: [compose-019.example.json](../deploy/compose-019.example.json). Authentication values remain environment references.

## Backup evidence

At 00:47:29.568Z, the staging backup probe read the source registry through a read-only mount and restored it separately: revision 0, 14 agents, 14 skills, 15,852 bytes, restored:true.

SHA256: `3b01bda980c12b0676f25b55c7b8c7c35baa1dc47f17c048e17aeabe308c91f5`.
Snapshot: `2026-11-02T00-47-29-470Z-e6d165de-b8e4-48c7-9428-4e17f0ea8c53`, volume `kip-agent-office-registry-backups-20261102`. Registry contents are not published. Earlier one-shot actions without container/log evidence were not counted as successful verification.

## Game evidence

Private candidate [PR120](https://github.com/szultami-bit/kip-english-universe/pull/120), commit `f8380d1fd46d4056eb820e29e5a97706204c4bb5`, based on approved VPS source `ed042a6`. Private game source remains private.

- Complete source recovered through a private one-day CI artifact; archive checksum, Git tree and source fingerprint independently verified. Actual mode routing and both result markers match the SDK.
- Independent scoped review of the five-file pilot delta: no Critical/Important findings. 104 focused tests passed. Every inherited test path preserved, plus the pilot regression: 277 paths, 3,316 tests, no failures/cancellations/skips.
- Formal `audit:release` passed; production-profile build reran the full gate and produced 1,363 assets. Built HTML contains the pilot hook and SDK bytes match source. Existing deployment profile fingerprint remains unchanged.
- Source fingerprint: `be6f8c3683562d69bd1f31bb3cd04726fece65d3619766168c343b8a4eb202e0`, 2,184 files.
- [Release safety CI](https://github.com/szultami-bit/kip-english-universe/actions/runs/41371988775) and [VPS runtime CI](https://github.com/szultami-bit/kip-english-universe/actions/runs/41371988779) both succeeded on the reviewed candidate. VPS CI passed 32 native tests, the isolated upstream fixture, fresh container gate/build, restricted container boot and detached-volume backup/restore with synthetic data.
- The earlier local native run did not complete and was interrupted with exit 130; it is not represented as a pass. Remote CI supplies the completed native evidence. Earlier stale-fingerprint CI failures are retained; a fresh scoped review and genuine passing gate replaced the old receipt.

## Boundaries and next gate

Fixed deterministic runners only: no arbitrary shell, instruction-as-code, model API, messaging, automatic patch or deployment executor. Incident reports remain UNVERIFIED after classification/diagnosis. No root cause, repair, account quota or player capacity is implied.

Client: at most three POST attempts plus up to three preflights per document, five-second timeout, no retries/polling, no hidden/offline/finished sends, pagehide cleanup. Payloads contain no messages, stacks, identities, tokens, room codes or gameplay content. After BFCache restoration, gameplay resumes but telemetry waits for a fresh document. Build marker `019-pilot-1` is an integration identifier, not a verified deployed fingerprint.

Pilot limits: 1,000 stored jobs, 500 issues, 10,000 occurrence receipts, 30 reports/minute and 500/day globally. No automatic deletion; archive/retention work is needed before expansion beyond the pilot.

Next: owner checks staging with their own account, runs a task and opens its result. After acceptance, recheck the active production baseline before publishing the reviewed game pilot and verifying its deployed fingerprint/delivery. No production update has been made by this work.

Rollback retains the immutable 0.18.0 runtime and backup volume. Registry schema is unchanged; tasks.sqlite is separate. Switching code back must preserve current skills.json, not overwrite it with an older snapshot.
