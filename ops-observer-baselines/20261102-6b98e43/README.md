# Approved observer baseline — 2 November 2026

Root cause: observer still expected the previous approved ReelTalk release after Dungeon Echoes deployment.

Release: 6b98e43e4c04fec7ab9cac87b9b9c27f86cbb4a2
Fingerprint: c42c1a4fc4ee42346e1f42104b4f92d503ab02bf89baa156ba7663986e2c81ee
Immutable code volume: kip-ops-observer-baseline-20261102-6b98e43
Manifest: 3af2f6e06aa2ec976802746fe3e4575814c994f4782d355b9fb809e3a8894ec9
Previous verified manifest: b354080a8e501188906394f9da51989e1510168b2b3252c158af5cd7bbb46f3b

Only config.json expectations changed. All prior observer source and tests retained, 47 tests passed on VPS. The active runtime mounts /opt/kip-dungeon-20261102/source/vps-build; approved source receipt, full audit/build logs (3521 tests, zero failed/skipped), smoke proof and fresh public health/release matched. Existing state ops.sqlite is preserved. Deployment and subsequent real observer recovery remain separate from these preparation tests.
