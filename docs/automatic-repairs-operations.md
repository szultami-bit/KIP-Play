# Automatic repair operations — 2 November 2026

Office 0.20.0 is installed on production and staging. The browser board distinguishes manual reviews, read-only diagnoses, claimed repairs, verification, and recovery.

## Runtime identity
- Office source: `84c336d638ea4fcd3122fb437a9ce9e7cf713e7d`; source tree `afbf1ff33cd9aea0b8a86cf925ef26da2447f41e`.
- Runtime volume: `kip-agent-office-020-runtime-84c336d`, mounted read-only. The existing container base image retains its 0.16 label; package release and pinned `.ready` identify the actual 0.20 application.
- Production project: `kip-agent-office-20261031`, loopback 18795, existing state `kip-agent-office_board_v01`.
- Staging project: `kip-agent-office-016-candidate`, loopback 18796, separate state `kip-agent-office-018-candidate-20261102_state`.
- Owner authentication remains unchanged. Public health returns 200; unauthenticated repairs API returns 401.

## Execution
Resident intake polls the trusted monitor and bounded supported game receiver every 5 seconds. ChatGPT task **Perbaikan otomatis KIP** is enabled hourly in Asia/Pontianak. It uses the existing GitHub and Hostinger connections; it is not a resident model process or instantaneous repair guarantee.

The private `kip-office-repair-executor` project runs `node scripts/repair-cli.mjs` from `/runtime/runtime`, code read-only and production state writable, no network, user 1000, no capabilities. Commands are list, claim, heartbeat, result, retry. A report never supplies a command. Inspect latest production mounts before running it after future releases.

Claims are exclusive with 30-minute leases. Expired claims requeue. Monitor verification times out after 30 minutes as blocked. A valid receipt contains root cause, patch commit, passing checks, deployed identity and fresh verification. The observer must subsequently supply both healthy matching observations. Recovery without a repair receipt is labelled recovered, not repaired. Game completion additionally requires gameplay evidence newer than the latest event. Supported game intake remains the existing Lucky Wheel pilot; deployment of new telemetry to other games is outside this change.

Do not print claim tokens, credentials or private game source. An unavailable connection, unknown source identity, failed proof or out-of-scope change must be reported as blocked. Preserve accounts, rooms, authentication, pricing and unrelated features. Re-read configuration immediately before external mutations.

## First repair
The observer expected `ed042a6` after approved production updates. During this work production moved from `a2421ac` to `3d940fab463ba96d48daf4414fb99bdf702b563f`; the final baseline was checked against the latest runtime mounts, approved receipt, build and smoke logs, public health and release proof.

Final fingerprint: `e7fe22233694dafcfc53d44849347a1c1e247d174571ca19f57fa69f204166b8`. Game build evidence: 3456 passing tests, 2207 source files. The observer patch is `66f87c03d6d4c197b766e4f48be1425b43ec17d7`; source/fixture overlays are in `ops-observer-20261102`. Existing observer SQLite history is preserved.

Office 136/136 tests passed locally, in the exact 105-file package, and on VPS. Observer 47/47 tests passed on VPS. Independent review found six Important defects in the initial implementation; all were regression tested and independently confirmed resolved. Office build passed; existing 652 kB campus bundle warning remains.

## State and rollback
Before production deployment, board.json was copied and hash verified in volume `kip-agent-office-before020-20261102`, path `20261102-before020-retry1`. SHA256: `92cb95508a1cc9d92e46f11935fae0aeb59c12d3aef9649a6263bf73f60a47c5`. Production had no existing skills.json; isolated seed/migration verification passed. Existing board bytes were preserved. Schema 1 skill migration was independently checked against a fixture and preserved prior agents and definitions.

Rollback code without replacing current data. Preserve skills.json, board.json, tasks.sqlite and repairs.sqlite. The old observer code volume remains `kip-ops-hybrid-20261031_code_v011_640ab23e`; keep current ops.sqlite. Do not revert the expected release to an obsolete fingerprint as a normal recovery step.

## Verification limits
The immediate run exercised claim → actual configuration repair → result submission → observer confirmation. The first future hourly invocation is separately observable in task run history; schedule configuration is not evidence that a future invocation already ran. Browser testing reached the public login page; no owner session was fabricated, and authenticated owner UI acceptance is not claimed.

Final production confirmation at 2026-11-02T14:23:15Z: first job completed with resolution verified-repair; the paired report recovered with observed-recovery. Read-only probe confirmed both terminal states and unchanged board.json hash. Two genuine observer cycles supplied OK before closure; no status was forced.
