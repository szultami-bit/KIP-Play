FROM kip-agent-office:0.15.0

USER root
WORKDIR /app

COPY overlay.part.* /tmp/overlay/

RUN cat /tmp/overlay/overlay.part.* | base64 -d > /tmp/overlay.tar.gz \
    && echo "7d37ae95675efdf3f40b83df01d6447ce7d5476364f55a396d4be558d5af5b0f  /tmp/overlay.tar.gz" | sha256sum -c - \
    && tar -xzf /tmp/overlay.tar.gz -C /app \
    && rm -rf /tmp/overlay /tmp/overlay.tar.gz

USER 1000:1000

LABEL org.opencontainers.image.title="KIP Agent Office"
LABEL org.opencontainers.image.version="0.16.0"

EXPOSE 3180

CMD ["node", "server/main.mjs"]
