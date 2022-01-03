import { Request, Response } from 'express'
import winston from 'winston'
import notifyNewSubscription from '../core/interactors/index'

const notifyCreatedSubscriptionController = async (request: Request, response: Response) => {
    
    // Extracting data from the request
    const subscribedClient = extractIncomingData(request)

    // console.log(subscribedClient)

    try {
        // Executing the interactor function with the data
        const notified = await notifyNewSubscription(subscribedClient)

        if(!notified) {
            response.status(500)
        }

        response.status(201).json(notified)

    } catch (error: any) {
        response.status(400)
        logger.info(error)
    }
}

const extractIncomingData = (request: Request) => {
    const { body } = request
    const { subscribedClient } = body

    return subscribedClient
}

let logger = winston.createLogger({
    transports: [
        new (winston.transports.File)({ 
            filename: 'subscriptionService_logs/error.log' 
        })
    ]
})


export default { notifyCreatedSubscriptionController }
