# Release baseline integration

The baseline remains an explicitly reviewed target. A private source receipt and its generated passing build certificate feed the internal release hook, which also reads the built production profile. The hook requires two bounded paired production checks before writing an atomic, revisioned expectation to the existing observer state volume. The observer reloads that approved value before each five-minute cycle.

This extends the existing Node observer and deployment executor. A public endpoint or automatic adoption of live fingerprints would let an unexpected deployment authorize itself, so neither is used. The existing repair automation invokes the hook after every authorized audited production deployment; a failure remains visible and retains the previous baseline. Explicit audited rollback follows the same check.

Source verification: 56 local and VPS tests passed, including rejection, live mismatch, concurrency, idempotency, persisted history, rollback, symlink state and existing incident/lease/request-budget tests. Immutable code volume preserves the previous observer as rollback; existing ops.sqlite remains in place. No production game release is changed by this hook installation.
