FROM mhart/alpine-node:12.15

ENV NODE_ENV=development

# Default to UTF-8 file.encoding
ENV LANG C.UTF-8

RUN apk update && apk add bash git openssh openssl ffmpeg python make g++ p11-kit-trust

WORKDIR /application

ADD package.json package.json
ADD config config
ADD package-lock.json package-lock.json
ADD tsconfig.json tsconfig.json

RUN npm ci

ADD src src

RUN npm run build

ENV NODE_ENV=production

EXPOSE 9080

ADD start.sh start.sh
ADD dev.sh dev.sh
