# Observer baseline — 2a13b38

Correct a stale observer baseline after the reviewed display controls release. Runtime code and check behavior are unchanged; only the expected release and fingerprint change.

- Game release: 2a13b3878b6dfddddec842b208db8cf1c36c53d8
- Reviewed source fingerprint: 97bd7a5cbbcbd5a2389cce2fdd564be9613e1b75d4065de8a2b79c07422d21c1
- Immutable observer volume: kip-ops-observer-baseline-20261102-2a13b38
- Observer manifest SHA-256: 0b9ae6b52b244b7081ed005b369c293f1a49a0360beae1ec71d68067a8490864
- Previous observer manifest: 3af2f6e06aa2ec976802746fe3e4575814c994f4782d355b9fb809e3a8894ec9
- Validation: 47 observer tests passed, zero failed or skipped on the new volume.
- Source fingerprint recomputed from the exact mounted production source; matched the approved audit receipt, generated build certificate, bundled worker, and live release-safety response. Build certificate records 3551 passing tests across 298 test files.
- Preserve observer state volume and ops.sqlite; preserve office state, game runtime, rooms, authentication, origins and deployment configuration fingerprint.
- Require a fresh post-deployment health/release match and subsequent healthy monitor observations before completing the queue job.

This change does not certify untested physical mobile devices or genuine signed-in account usage.
