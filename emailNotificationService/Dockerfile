FROM node:lts-alpine3.13

WORKDIR /usr/src/app

COPY ./package.json /usr/src/app 
COPY ./package-lock.json /usr/src/app

RUN npm install

COPY ./ /usr/src/app

RUN mkdir emailNotificationService_logs

RUN chown node emailNotificationService_logs
USER node

EXPOSE 8082

CMD npm start