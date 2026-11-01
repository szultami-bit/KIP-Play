# Authority dropdown patch — 2026-11-01

The authority selector was rendered disabled while registry loading/saving was busy, but the final `setBusy(false)` only synchronized other controls. An agent-card click happened to render the selector again. The patch includes the authority selector in control synchronization, unlocking it when loading or saving finishes and retaining its disabled state while busy or when no agent is selectable.

- Application commit: `ce97894c10870477b0b78a7fdc4723543f3a5f58`.
- Bootstrap commit: `58cec2e1155da1a2d374da587d9bc6a52af0689e`.
- Focused temporary check reproduced the initial failure and passed after the fix for first load, refresh, saving, agent switching during refresh, refresh failure, and empty registry. It also passed against the packaged runtime copy. This is a bounded DOM check, not a real browser acceptance run.
- Full development suite: 97 passed; portable suite: 16 passed locally and directly on the VPS.
- Staging deploy action 123083258 was verified from actual logs at 18:10 WIB: patched commit prepared, office healthy, and READ_AFTER_RESTART probe PASS (revision 8, activeVersion 1, auditEvents 8, testRuns 2).
- Current container: `8687d78f93dd`; code volume: `kip-agent-office-017-runtime-ce97894`.
- Existing registry state volume retained: `kip-agent-office-017-candidate-20261101_state`. The probe reads its separate `acceptance-017-probe.json`; it does not modify owner skills.
- Runtime manifest patch: `authority-dropdown-refresh`; healthcheck requires this patch. Source, packaged runtime, and test-support JS hashes match.
- Owner browser acceptance remains blocked by the prior page-observation policy denial. Production has not been promoted.

For rollback of this UI patch, use the prior 0.17 staging Compose/code volume `kip-agent-office-017-runtime-c520bf9` with the same schema-2 state volume; do not restore an old state snapshot over newer owner writes.
