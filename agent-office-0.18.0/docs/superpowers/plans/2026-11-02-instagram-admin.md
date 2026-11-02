# AI Admin KIP Implementation Plan

**Goal:** Add a separate Instagram DM robot with an editable persistent skill and an honest connection state.
**Architecture:** Extend the existing Node role reader, durable skill registry and Three.js roster. Deploy as a new candidate runtime with a separate copied state volume; retain the original volume for rollback.
**Tech Stack:** Node 24, JavaScript, Three.js, Vite, Docker Compose.
**Spec:** ../specs/2026-11-02-instagram-admin.md

## Constraints and review focus
Preserve all existing registry entries and audit history. Never enable external execution. Reject conflicting reserved IDs, preserve unavailable/corrupt-state behavior, migrate once under the existing writer lock, retain owner authentication, and keep blocked robots at their desks.

## Tasks
- [x] Add failing tests for independent agent/skill registration, legacy migration and truthful blocked status.
- [x] Extend server/roles.mjs and server/skills.mjs with additive migration and a backup. Run the new tests.
- [x] Add the robot/desk and skill-directory name; link its report to the dedicated skill editor. Build campus with existing dependencies and retain the 0.17 controls.
- [x] Run the combined test suite and build. Package a checksum-pinned candidate and verify actual VPS logs/health; report any owner-login or messaging prerequisites accurately.

- [ ] Complete owner browser acceptance after Google passkey verification; only then consider production promotion.
