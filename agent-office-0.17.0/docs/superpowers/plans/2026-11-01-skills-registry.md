# Persistent Skills Registry Implementation Plan

> Execute natively using superpowers:executing-plans.

**Goal:** Connect + Skill Baru, Test, Aktifkan and Rollback to persistent, versioned VPS state.
**Architecture:** Extend existing server/skills.mjs and the campus skill editor. Keep the registry in its existing persistent volume; publish code to a new GitHub branch.
**Tech Stack:** Node built-ins, browser ES modules, existing Docker image.
**Spec:** ../specs/2026-11-01-skills-registry-design.md

## Constraints and review focus
- No external skill execution or new credentials; preserve owner auth and all report mounts.
- Editing after Test invalidates receipt; rollback can never activate an untested draft.
- Restart and two writers must not lose updates; malformed or symlink state fails closed.
- Preserve old state backup and unknown-outcome writes; UI must refresh without automatic retries.
- Scenario fields are definitions, not evidence that an AI/tool ran them.

## Tasks
- [ ] Test and implement schema migration, atomic locking, receipt and activation/audit history in server/skills.mjs; verify persistence, conflicts, corruption, and rollback in tests/skills.test.mjs.
- [ ] Add Test and history UI; fix editor dirty-state and busy locks; verify real HTTP authorization and model state with tests/skills-http.test.mjs and tests/skill-model.test.mjs.
- [ ] Run complete Node suite and syntax checks, review changes, publish new branch and separate VPS candidate, verify health and restart persistence. Record any unavailable owner browser acceptance accurately.
