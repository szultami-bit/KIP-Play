# Observer baseline reconciliation

Approved runtime release: 3d940fab463ba96d48daf4414fb99bdf702b563f
Fingerprint: e7fe22233694dafcfc53d44849347a1c1e247d174571ca19f57fa69f204166b8

The runtime is the unchanged observer from manifest 640ab23efff67958af3bd7fcc42c85143b2b5d76309c5f42cfb5b24c988ec368, with this configuration and test overlays. Current manifest: b354080a8e501188906394f9da51989e1510168b2b3252c158af5cd7bbb46f3b. Full observer suite: 47 passed, zero failures. Existing negative identity, admission and release-correlation assertions remain. Historical test fixtures use their fixed historic identity independently of the deployed configuration; an additional check verifies the current configuration and rejection of the prior release.

Immutable volume: kip-ops-observer-baseline-20261102-3d940fa. Preserve existing ops.sqlite. Release acceptance is based on the active game runtime mounts, its approved source receipt, build log, public health and release proof; never copy an unverified live identity into the expectation.
