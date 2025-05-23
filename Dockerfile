FROM ethereum/client-go:stable

ARG ACCOUNT_PASSWORD

COPY genesis.json /tmp

RUN geth init /tmp/genesis.json \
    && rm -f ~/.ethereum/geth/nodekey \
    && echo ${ACCOUNT_PASSWORD} > /tmp/password \
    && geth account new --password /tmp/password \
    && rm -f /tmp/password

ENTRYPOINT ["geth"]

FROM node:18-alpine AS indexer
WORKDIR /app
COPY package*.json .
COPY . .
RUN npm install
RUN npm run build
CMD ["npm run", "start"]
