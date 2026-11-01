# KIP Agent Office 0.17.0

Overlay for the verified 0.16.0 candidate image. VPS `/office-state/skills.json` is the permanent, authoritative registry. GitHub retains this application source and release history; live private skill data is **not** automatically mirrored to GitHub.

Hostinger's Compose operation did not build the requested image. The provided staging Compose therefore prepares a verified overlay in a separate code volume using the existing Node 24 image. Runtime code is pinned to application commit `ce97894c10870477b0b78a7fdc4723543f3a5f58`; the loader is pinned to commit `58cec2e1155da1a2d374da587d9bc6a52af0689e` and SHA-256 `1d4fd076f2c08f291ac47474e7989ab19d61b3e90fc45be7c96eba90835052c7`. The base Docker image label stays 0.16.0; application identity is in the verified runtime release.json.

The one-shot permissions service is limited to the new candidate code volume. The app and preparation/tests run as UID 1000; production state and host filesystem are not mounted into that helper. Retain the current owner-auth configuration when supplying the four environment placeholders in the example. An absent configuration fails closed.

- **+ Skill Baru** saves a persistent candidate with a permanent ID.
- **Test** saves any edited candidate, validates structure and the registered tool list, and stores a SHA-256-bound receipt. Scenario execution is explicitly NOT RUN.
- **Aktifkan** requires a fresh passing receipt for the saved content. It activates configuration; external execution remains disabled.
- **Rollback** only targets a previously activated version. Candidate edits and the audit trail survive.

The schema 1 registry is backed up before migration. Writes use revision checks, atomic rename, fsync, and a SQLite OS-managed mutex that releases on process termination. JSON remains authoritative; `skills.json.lock.sqlite` contains no skill data. Malformed state fails closed.

## Verify

Use Node 24. `npm test` runs the portable release suite without installing dependencies. Docker build repeats the release suite against the existing base image modules and verifies overlay checksums. The development source suite had 97 passing tests before packaging; owner browser acceptance remains a separate gate.

## Candidate deployment and rollback

For the original 0.16-to-0.17 migration, deploy against a new state volume. For the authority-dropdown patch, retain the existing 0.17 state volume and create only a new immutable code volume. Preserve owner authentication, loopback binding and read-only observer/capacity/role mounts from the current staging Compose. The optional `probe` service uses `acceptance-017-probe.json` on the candidate volume; it never edits owner `skills.json`. Restarting it must report READ_AFTER_RESTART with revision 8 and activeVersion 1.

Keep the previous staging Compose and state volume. Application rollback after schema 2 writes requires a schema-2-compatible image: do not run 0.16.0 against a migrated production registry, and do not overwrite new writes with the schema 1 backup. For staging, restore its former image and former volume together. No production promotion until owner acceptance succeeds.

Authority-dropdown patch: the selector becomes available automatically after registry loading or saving finishes. It stays disabled while a request is pending or no agent is selectable. The patch changes UI availability only. No automatic work, messaging, credentials or external tool access is enabled by activation.
