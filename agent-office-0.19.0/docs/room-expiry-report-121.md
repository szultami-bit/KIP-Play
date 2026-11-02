# Room expiry report integration — issue 121

Status: IMPLEMENTASI, not deployed. Game executor remains a separate draft:
https://github.com/szultami-bit/kip-english-universe/pull/122

This Office branch adds the manual `room-expiry-check` task, “Periksa penutupan
room”, to the existing health agent and its validated service-monitoring skill.
It uses the existing owner-authenticated, same-origin `/api/jobs` route, durable
queue, skill pinning and stored reports. It never calls a room mutation or
creates a second scheduler/executor. An Office task completing does not mean
the game runner closed a room.

`main.mjs` deliberately supplies no report transport yet: the current production
runner and its authorized report endpoint have not been established. Thus this
task returns BLOCKED with null counts in the default composition. No report
payload can be provided by the browser or task POST body. This commit does not
install a job on the live dashboard or activate a VPS runner.

## Server-side reader contract for subsequent integration

The worker accepts `readRoomExpirySnapshot` and `readRoomExpiryRelease`. A future
verified, bounded, authenticated server-side read transport must supply both;
schema validation is not authentication. Do not wire either to untrusted client
data, a manually entered status, or an unverified file. No guessed URL, secret,
credential copying or impersonation is required or implemented here.

Snapshot fields (exact schema, no additional fields):

- schemaVersion: 1; source: VPS_ROOM_LIFECYCLE.
- fingerprint: current audited game deployment SHA-256 fingerprint.
- heartbeatAt: server epoch milliseconds, no older than 60 seconds.
- lastCycleAt: completion time of a real runner cycle, not a poll time.
- intervalMs: 1000–3600000; cycle age may not exceed interval + 60 seconds.
- singleExecutor: true, supported by runtime ownership evidence from producer.
- policy: CREATED_GT_3H_VERIFIED_IDLE.
- coverage: unique backend/status objects; initial reporting allowlist is
  tower, dragon, monster, with COVERED or NOT_COVERED. At least one COVERED
  required for ACTIVE. Omitted backends are not covered, never implied covered.
- counts: inspected, closed, failed, unknown, skipped, all nonnegative safe
  integers. The four outcomes partition inspected. closed counts confirmed
  new closures only; already-closed/reused/young/active rooms are skipped.
  Lost acknowledgements and ambiguous activity are unknown, not failed or
  confirmed closed. No room codes, account identifiers, tokens or raw errors.

Release reader fields: fingerprint and observedAt (server epoch milliseconds,
no older than 60 seconds), obtained independently from the actual game release
verification path. Fingerprints must match. Readers must use bounded I/O that
finishes within the existing 30-second Office job lease. No retrying mutations.

Output is always PARTIAL coverage. ACTIVE describes verified runner evidence
at the last cycle, not universal backend coverage or closure exactly at three
hours. Missing/stale/future/invalid evidence stays BLOCKED/UNKNOWN with null
metrics. Strict schema rejection prevents accidental PII from reaching reports.

## Validation and release boundary

Five new tests exercise the real durable SQLite worker, preserved reports,
default blocked behavior, validation, fingerprint freshness and skill revocation.
The owner HTTP regression additionally checks report-payload injection rejection
and a blocked default task through the actual HTTP/queue pipeline. Freshness is
evaluated after both reads finish, so fetch latency cannot bypass the age check.

Final validation: `npm test` passed 125/125 tests, zero failures/skips/cancellations.
`npm run build` passed TypeScript and both Vite builds; the pre-existing campus
bundle-size warning remains (651.45 kB versus 650 kB warning threshold).

Production recheck on 2 November 2026: game fingerprint
d47453009fa16391bc1db0d6abf17dd7acfc2c0fa1d3de627fba98eda1c3cf69,
Bomb Speaking Protocol R12; game container ab2dd9491510 healthy. That production
release is unrelated to this draft. It was not overwritten. General Hostinger
terminal execution was not found in available operations. No production room
was closed and no configuration, volume or account changed during this work.

Before activation: complete authoritative host/participant idle verification
under the owning lock, runtime executor/scheduler and aggregate producer,
authenticated report transport, all game AGENTS.md gates, official deployment
fingerprint verification, and evidence of one actual cycle. Office build/tests
alone are not permission or evidence that these game release gates passed.
