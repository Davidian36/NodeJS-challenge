FROM node:lts-alpine3.13

WORKDIR /usr/src/app

COPY ./package.json /usr/src/app 
COPY ./package-lock.json /usr/src/app

RUN set -ex \
    apk update \
    apk add mysql-client

RUN npm install

COPY ./ /usr/src/app

USER node

EXPOSE 8081

CMD npm start