# KIP Agent Office 0.17.0

Overlay for the verified 0.16.0 candidate image. VPS `/office-state/skills.json` is the permanent, authoritative registry. GitHub retains this application source and release history; live private skill data is **not** automatically mirrored to GitHub.

- **+ Skill Baru** saves a persistent candidate with a permanent ID.
- **Test** saves any edited candidate, validates structure and the registered tool list, and stores a SHA-256-bound receipt. Scenario execution is explicitly NOT RUN.
- **Aktifkan** requires a fresh passing receipt for the saved content. It activates configuration; external execution remains disabled.
- **Rollback** only targets a previously activated version. Candidate edits and the audit trail survive.

The schema 1 registry is backed up before migration. Writes use revision checks, atomic rename, fsync, and a SQLite OS-managed mutex that releases on process termination. JSON remains authoritative; `skills.json.lock.sqlite` contains no skill data. Malformed state fails closed.

## Verify

Use Node 24. `npm test` runs the portable release suite without installing dependencies. Docker build repeats the release suite against the existing base image modules and verifies overlay checksums. The development source suite had 97 passing tests before packaging; owner browser acceptance remains a separate gate.

## Candidate deployment and rollback

Deploy against a new state volume. Preserve owner authentication, loopback binding and read-only observer/capacity/role mounts from the current staging Compose. The optional `probe` service uses `acceptance-017-probe.json` on the candidate volume; it never edits owner `skills.json`. Restarting it must report READ_AFTER_RESTART with revision 8 and activeVersion 1.

Keep the previous staging Compose and state volume. Application rollback after schema 2 writes requires a schema-2-compatible image: do not run 0.16.0 against a migrated production registry, and do not overwrite new writes with the schema 1 backup. For staging, restore its former image and former volume together. No production promotion until owner acceptance succeeds.

Known minor inherited UI issue: the authority selector can remain disabled until an agent card is clicked again. It is outside this four-control release scope. No automatic work, messaging, credentials or external tool access is enabled by activation.
