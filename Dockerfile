# ARG CUSTOM_USER=umer

FROM ethereum/client-go:stable

ARG ACCOUNT_PASSWORD

COPY genesis.json /tmp

RUN geth init /tmp/genesis.json \
    && rm -f ~/.ethereum/geth/nodekey \
    && echo ${ACCOUNT_PASSWORD} > /tmp/password \
    && geth account new --password /tmp/password \
    && rm -f /tmp/password

# ARG CUSTOM_USER

# RUN addgroup -S "$CUSTOM_USER"

# RUN adduser \
#     --disabled-password \
#     --gecos "" \
#     --ingroup "$CUSTOM_USER" \
#     "$CUSTOM_USER"

# WORKDIR /home/$CUSTOM_USER

# USER "$CUSTOM_USER"

ENTRYPOINT ["geth"]