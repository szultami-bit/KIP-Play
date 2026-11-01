# Agent Office 0.17.0

Continue the owner's requested four controls against the existing VPS registry. VPS is the authoritative store; GitHub stores reviewed application source and release history. Do not claim automatic GitHub mirroring of private registry data.

Use schema 2, atomically persisted JSON with a bounded audit trail, content-bound validation receipts, prior activation history, and a cross-process lock. Migrate schema 1 without changing installed skills or authority. Preserve a schema 1 backup before migration. Test means deterministic structure and registered-tool checks; scenarios are NOT RUN and external execution remains disabled. Activate changes configuration only, requires a fresh passing receipt, and does not grant tool access. Rollback selects a previously activated version and preserves candidates and audit history.

Maintain owner authentication, same-origin POST protection, existing reports and production state. Develop in an isolated source directory. Deploy a separate candidate with its own state and loopback port; do not promote until owner acceptance is evidenced.

Implementation choice: extend the existing JSON store instead of adding a database or GitHub write credential. This preserves the current runtime and avoids adding a second conflicting writer.
