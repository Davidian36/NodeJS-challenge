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

<h3>Subscription microservice:</h3>
    - Express (most popular and minimal Node.js framework)<br>
    - Mysql2 (latest mysql driver for Node.js)<br>
    - Axios (http requests library for Node.js)<br>
    - Dotenv (for loading environment variables into the process.env object)<br>
    - Cors (part of the security against CSRF attacks)<br>
    - Winston (production ready logging library for Node.js)<br>

<h3>Mailing microservice:</h3>
  - Nodemailer (emailing tool for Node.js)

<h3>Here is the API Swagger documentation:</h3>
  - https://app.swaggerhub.com/apis/Davidian36/subscription-service/1.0.0

<h3>Important notes:</h3>

The subscription service getSubscription GET route does not accept url parameters, because libraries client side (like axios for example) accept body parameters in json format which is preferable, however in the swagger documentation the routes accepts a parameter.

There's no authentication system implemented with tokens to prevent CSRF attacks, because another container for creating access token and refresh tokens as well as their rotation should be created separately and it was not the purpose of this task.

In the subscription service tests, the mysql functions like createConnection or query should als be mocked but I had no time left for this task.                                                                                                                                                                                
