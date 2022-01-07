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

import subscriptionController from './controllers/subscription.controller'


// API endpoints
app.get('/api/v1/', (req, res) => { res.send('hi api v1 here') })

app.post('/api/v1/subsc/subscribe', subscriptionController.createSubscriptionController)

app.post('/api/v1/subsc/cancelSubscription', subscriptionController.cancelSubscriptionController)

app.get('/api/v1/subsc/getSubscription', subscriptionController.getSubscriptionController)

app.get('/api/v1/subsc/getAllSubscriptions', subscriptionController.getAllSubscriptionsController)


const listenPort: number = 8081
app.listen(listenPort, () => { 
    console.log('listening on localhost:' + listenPort) 
})