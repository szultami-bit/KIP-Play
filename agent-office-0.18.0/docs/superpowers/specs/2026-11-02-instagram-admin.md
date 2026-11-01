# AI Admin KIP — DM Instagram

Create a distinct robot, `instagram-admin`, in the existing VPS office. The user chose their VPS and a dedicated new role, rather than attaching this job to an existing robot or using Manychat.

The robot appears in the 3D customer area, role reports and agent/skills directory. Its dedicated, editable skill covers incoming Instagram DM enquiries for `@kampunginggrispontianak`, grounded in verified KIP information, with human escalation for unknown information, complaints and payments. It never invents prices or availability.

Initial state is blocked pending Meta messaging authorization and an AI message-processing service. No connector or token is present in the observed office configuration. This change must not claim messages are read, generated or sent. Existing agent settings and skill history are preserved with an additive, backed-up migration. Authentication and external-execution restrictions remain in force.

Implementation choice: reuse the existing role, robot and persistent skill systems. A standalone service/dashboard would duplicate authentication and storage; modifying the old customer-support role would not satisfy the separate-robot request. Activation of live messaging is a later integration step after its credentials and data source are available.
