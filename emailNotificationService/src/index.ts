import express from 'express'
import bodyParser from 'body-parser'

import dotenv from 'dotenv'
dotenv.config()

import cors from 'cors'
import helmet from 'helmet'
// import jwt from 'jsonwebtoken'
// import ExpressBrute from 'express-brute'

const app = express()
app.use (
    bodyParser.json(), 
    cors({ credentials: true, origin: 'http://localhost' }),
    helmet()
)

import emailController from './controllers/email.controller'


// API endpoints
app.post('/api/v1/mail/notify_subscription', emailController.notifyCreatedSubscriptionController)


const listenPort: number = 8082
app.listen(listenPort, () => { 
    console.log('listening on localhost:' + listenPort) 
})


