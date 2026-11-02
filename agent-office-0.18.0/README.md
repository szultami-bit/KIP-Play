# AI Admin KIP — DM Instagram · 0.18.0

Deployed to the owner-only VPS staging office on 2026-11-02 (Asia/Pontianak). Instagram messaging is NOT_CONNECTED and automatic replies remain disabled. Production has not been promoted.

Adds a separate purple DM robot and fifth desk in Pelanggan & Pertumbuhan. The robot appears in role reports and Agent & Skill with its own editable `instagram-dm-support` instructions. Click the robot, then **Kelola panduan DM** to select its skill. The role accurately reports BLOCKED until messaging and AI processing are connected. No Instagram message has been read or sent.

Validation: 100 local Node tests passed; TypeScript and both Vite builds succeeded. The checksum-pinned loader ran 22 deployment tests on the VPS, all passing. The live probe confirmed 14 agents, dedicated draft authority and the installed DM skill, with external execution disabled. The office container is healthy. Owner browser acceptance is pending Google passkey verification.

Deployment uses immutable runtime sources at commit `d2f20b6ddac5acf37f5d6e73f9c81b6ff37215bd`; loader commit `7178ffa46b5aa3ebbd3ff386785360eabb7283fc`, SHA-256 `58758edf4daeaedf1966b514561da219c2f2e3f7c50e850e65c20bfa4429e70b`. The user explicitly approved publishing this source in the public repository. The branch is `feat/ai-admin-kip-dm-20261102`; main was not modified.

Staging retains owner authentication, loopback binding and report mounts. A new runtime volume and a separate copied state volume isolate the candidate from the previous version. The old state is mounted read-only only in preparation/verification services. The source had no initialized skills.json: the live registry was seeded with 14 agents; migration of an existing 13-agent registry is covered by local and VPS tests. Preparation copied one existing JSON file. The new clone marker prevents overwriting later candidate state during a repeated deployment.

The previous 0.17 server cannot read a 14-agent registry. Roll back by restoring the previous Compose configuration and its untouched 0.17 state volume, not by pointing 0.17 at the new volume. Later writes in the new volume must be reviewed before reconciling states. Owner acceptance remains required before promotion.

Live DM replies still require the Meta messaging connection, approved KIP knowledge, an AI-processing service, inbound webhooks, message-window and duplicate protections, and human handover. These are not implemented by this profile release.
