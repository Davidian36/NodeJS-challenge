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






//let accestoken: string

// Create a unique token for the connection and send token back to client

// const username = req.body.username
// const user = { name: username }
// accestoken = jwt.sign(user, SECRET)
// res.json({ accestoken: accestoken })

// console.log(req.body.username)
// console.log(process.env.ACCESS_TOKEN_SECRET)
// const SECRET:any = process.env.ACCESS_TOKEN_SECRET



// const authheader = socket.handshake.headers['authorization']
// const incomingToken = authheader && authheader.split(' ')[1]

// console.log(incomingToken)
// console.log(process.env.ACCESS_TOKEN_SECRET)
// const SECRET:any = process.env.ACCESS_TOKEN_SECRET

// try { 
//     if (incomingToken == null || incomingToken != accestoken) { return }

//     jwt.verify(incomingToken, SECRET, function(err:any, decoded:any) {
//         if (err) return
//         console.log(decoded)
//         //socket.decoded = decoded
//         // Delete token used for the connection
//         accestoken = ''
//         next()
//     })
// } catch (e:any) {
//     res.end(e.message || e.toString())
// }






