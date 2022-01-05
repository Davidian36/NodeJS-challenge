import express from 'express'
import bodyParser from 'body-parser'

import dotenv from 'dotenv'
dotenv.config()

import cors from 'cors'
// import jwt from 'jsonwebtoken'

const app = express()
app.use (
    bodyParser.json(), 
    cors({ credentials: true, origin: 'http://localhost' })
)

import emailController from './controllers/email.controller'


// API endpoints
app.get('/api/v1/', (req, res) => { res.send('hi api v1 here') })

app.post('/api/v1/mail/notify_subscription', emailController.notifyCreatedSubscriptionController)


const listenPort: number = 8082
app.listen(listenPort, () => { 
    console.log('listening on localhost:' + listenPort) 
})


