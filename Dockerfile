FROM node:12-alpine

RUN apk add --no-cache alpine-sdk python3
RUN yarn global add lerna

WORKDIR /app

VOLUME /app

CMD ["yarn", "start"]