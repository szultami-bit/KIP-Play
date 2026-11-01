# 0.17.0 verification record

Application source: `szultami-bit/KIP-Play`, branch `deploy-agent-office-0.17.0`, application commit `c520bf99909569a560b9ca9b8af36b147ca3fb01`, bootstrap commit `5791f898b75aeab676cb5131339015bd68d81e6c`.

## Completed

- Recovered exact 0.16.0 overlay; archive SHA-256 `7d37ae95675efdf3f40b83df01d6447ce7d5476364f55a396d4be558d5af5b0f`.
- Development suite: 97 passing tests, zero failures. Portable release suite: 16 passing tests.
- Real HTTP tests cover owner session, same-origin mutations, prefixed route, durable create/Test/activation, and stale revision.
- Store tests cover schema 1 migration and backup, restart, invalid input, corrupt/symlink files, content-bound receipts, stale tests, previous-activation rollback, preserved candidate, concurrent writers and SIGKILL lock recovery.
- Bounded DOM integration test invokes all four controls against the real persistent store. It also covers unsaved fields and a committed mutation whose response is lost. This is not browser acceptance.
- Independent review found three important issues; all were reproduced and fixed. The initially deferred authority-dropdown issue was fixed in the requested follow-up; see [017-authority-dropdown.md](017-authority-dropdown.md) for its verification and current runtime identity.

## Implementation decisions

- VPS JSON is the authoritative live registry. GitHub stores source/release history, without automatically publishing private registry contents.
- Test checks structure and registered tool names. Actual scenario execution is NOT_RUN; activating configuration does not give an agent external access.
- SQLite is used only as an operating-system-managed writer lock around atomic JSON writes. The lock is released after process termination, while registry data stays in JSON.
- Owner-only authentication, origin checks, read-only report mounts, and the production runtime are preserved.

## Deployment evidence and limitations

Hostinger VM 2091961. Existing staging project is named `kip-agent-office-016-candidate` even when it hosts a later candidate. Prior state volume is `kip-agent-office-016-candidate-20261101_state`; 0.17.0 uses `kip-agent-office-017-candidate-20261101_state` and immutable runtime volume `kip-agent-office-017-runtime-c520bf9`.

Action 123079963 returned success but logs showed `No such image`; the API did not build the image from the Compose build section. Therefore action success alone is not deployment evidence. The initial bootstrap then failed copying read-only source-directory modes. Staging was restored with action 123080680, and its login page was observed available. The corrected bootstrap copies regular runtime files with explicit permissions and verifies every downloaded file against its SHA-256 before running tests.

The initial corrected candidate request 123081162 failed because the existing candidate runtime directory was owned by another UID. A one-shot helper changed ownership only on the new code volume; action 123081478 then deployed successfully. At 17:56 WIB the VPS ran all 16 release tests successfully, verified the application commit and checksums, started the office, and reported healthy. The separate persistence probe wrote revision 8, two test receipts and eight audit events, finishing with active version 1 after rollback.

Restart action 123081700 was verified from actual logs at 17:58 WIB: READ_AFTER_RESTART, revision 8, activeVersion 1, auditEvents 8, testRuns 2, PASS. Runtime preparation verified hashes again and reported reused=true. Container 73a3390f96a9 is running and healthy. Its base image label is 0.16.0, while the verified mounted application is 0.17.0; these must not be confused.

Owner browser acceptance remains BLOCKED: the working browser denied page observation. No authenticated owner UI acceptance is claimed. Production has not been promoted. The staging candidate is at https://agent-staging.kampunginggrispontianak.com/ .

Rollback of staging must use its previous image and previous state volume together. Never run schema-1-only 0.16.0 against schema 2 or overwrite new owner data with the old backup.

## Follow-up

The authority-dropdown patch is deployed on the same staging state volume. Current runtime and rollback guidance: [017-authority-dropdown.md](017-authority-dropdown.md). The initial-release evidence above remains historical.
