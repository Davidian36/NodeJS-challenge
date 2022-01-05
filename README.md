# NodeJS-challenge: subscrition service

This is a full subscription service built with Node.js version 16.13.1 (Gallium LTS) and Typescript, designed with an hexagonal arquitecture.

It consists of a public NGINX service that connects to a backend subscription microservice that stores the data into a mysql database and makes a request to a another backend microservice that send a notification via email.
