FROM kip-agent-office:0.16.0-candidate-ceab366
USER root
WORKDIR /app
COPY overlay/ /app/
COPY SHA256SUMS /tmp/kip017-sha256sums
COPY tests/ /app/tests-017/
COPY test-support/campus/ /app/campus/
COPY scripts/registry-probe.mjs /app/scripts/registry-probe.mjs
RUN sha256sum -c /tmp/kip017-sha256sums \
 && node --test tests-017/*.test.mjs \
 && mkdir -p /office-state \
 && chown 1000:1000 /office-state
LABEL org.opencontainers.image.version="0.17.0"
USER 1000:1000
EXPOSE 3180
CMD ["node", "server/main.mjs"]
