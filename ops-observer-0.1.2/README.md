# Audited release baseline hook

The existing five-minute observer now loads `/state/approved-baseline.json` before each cycle. It continues to report unknown production identities as incidents. It never adopts a fingerprint from an HTTP response.

After a reviewed release passes the genuine game gate/build and is deployed, the internal deployment executor runs:

`node /code/src/release-hook.mjs /source FULL_RELEASE_SHA`

Mount this immutable observer code read-only, the exact audited game source read-only at `/source`, and the existing observer state volume read-write at `/state`. No game rooms, credentials, Docker socket or host root are needed. The hook reads the explicit source approval, generated build certificate and deployment profile. Two fresh health/release pairs must match that target before an atomic baseline update. A lock and previous identity prevent concurrent overwrite; repeated delivery is idempotent. Explicit audited rollback follows the same path. The bounded last-20 revision history retains reviewer, scope, tests digest/counts, old/new identities and verification time.

The repair automation must run this hook immediately after each authorized audited production deployment, before recording the deployment as fully verified. A failed hook leaves the previous expectations intact and must be reported, not replaced by copying the live fingerprint. This hook is internal; approval fields are not a public authentication mechanism. A stale lock after process death requires operator inspection before removal.

Tests cover audit rejection, failed live verification, two paired requests, persistence/reload, concurrent calls, idempotency, explicit rollback and invalid/symlink state. Existing observer leases, request limits and incident history remain unchanged.
