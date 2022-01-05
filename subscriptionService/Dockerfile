FROM node:lts-alpine3.13

WORKDIR /usr/src/app

COPY ./package.json /usr/src/app 
COPY ./package-lock.json /usr/src/app

RUN set -ex \
    apk update \
    apk add mysql-client

RUN npm install

COPY ./ /usr/src/app

RUN mkdir subscriptionService_logs

RUN chown node database_logs subscriptionService_logs
USER node

EXPOSE 8081

CMD npm start