# NodeJS-challenge: subscrition service

This is a full subscription service built with Node.js version 16.13.1 (Gallium LTS) and Typescript, designed with an hexagonal arquitecture.

It consists of a public NGINX service which connects to a backend subscription microservice that stores the data into a mysql database and makes a request to a another backend microservice in order to send a notification via email.

Once the Docker containers are built with the dependencies that will be listed below, you can run the service linking the containers with a Docker internal-bridge:

  - $ sudo docker network create internal-bridge --driver bridge
  - $ sudo docker inspect internal-bridge
  - $ sudo docker run -d -p 80:80 --name nginxproxy --network internal-bridge nginx:1.0
  - $ sudo docker run -d -p 8081:8081 --name subscription-container --network internal-bridge subscription-service:1.0
  - $ sudo docker run -d -p 8082:8082 --name mailing-container --network internal-bridge email-service:1.0

In case you want to use a mysql container for the database:

  - $ sudo docker run -d --name mysql --network internal-bridge mysql/mysql-server:latest

PD: You'll need to allow the Docker subscription container IP in the mysql settings to be able to connect to the mysql container or to a local mysql server in the host machine

The meaningfull dependencies used are:

# Subscription microservice:
  - Express (most popular and minimal Node.js framework)
  - Mysql2 (latest mysql driver for Node.js)
  - Axios (http requests library for Node.js)
  - Dotenv (for loading environment variables into the process.env object)
  - Cors (part of the security against CSRF attacks)
  - Winston (production ready logging library for Node.js)

# Mailing microservice:
  - Nodemailer (emailing tool for Node.js)

# Here is the API Swagger documentation:
  - https://app.swaggerhub.com/apis/Davidian36/subscription-service/1.0.0
