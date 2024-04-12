ARG CUSTOM_USER=umer

FROM ethereum/client-go:stable

ARG CUSTOM_USER

RUN addgroup -S "$CUSTOM_USER"

RUN adduser \
    --disabled-password \
    --gecos "" \
    --ingroup "$CUSTOM_USER" \
    "$CUSTOM_USER"

COPY genesis.json /tmp

RUN geth init /tmp/genesis.json 

WORKDIR /home/$CUSTOM_USER

USER "$CUSTOM_USER"