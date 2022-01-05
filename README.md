# NodeJS-challenge: subscrition service

This is a full subscription service built with Node.js version 16.13.1 (Gallium LTS) and Typescript, designed with an hexagonal arquitecture.

It consists of a public NGINX service which connects to a backend subscription microservice that stores the data into a mysql database and makes a request to a another backend microservice in order to send a notification via email.

Once the Docker containers are built with the dependencies that will be listed below, you can run the service linking the containers with an Docker internal-bridge:

  - $ sudo docker network create internal-bridge --driver bridge
  - $ sudo docker inspect internal-bridge
  - $ sudo docker run -d -p 80:80 --name nginxproxy --network internal-bridge nginx:1.0
  - $ sudo docker run -d -p 8081:8081 --name subscription-container --network internal-bridge subscription-service:1.0
  - $ sudo docker run -d -p 8082:8082 --name mailing-container --network internal-bridge email-service:1.0

if you will use a mysql container for mysql:

  - $ sudo docker run -d --name mysql --network internal-bridge mysql/mysql-server:latest

PD: You'll need to allow the Docker subscription container IP in the myql settings to be able to connect to the mysql container or to a local mysql server in the host machine

The meaningfull dependencies used are:
