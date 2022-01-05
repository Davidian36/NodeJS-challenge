import { Request, Response } from 'express'
import logger from '../logging/winstonLogger'
import notifyNewSubscription from '../core/interactors/index'

const notifyCreatedSubscriptionController = async (request: Request, response: Response) => {
    
    // Extracting data from the request
    const subscribedClient = extractIncomingData(request)

    try {
        // Executing the interactor function with the data
        const notified = await notifyNewSubscription(subscribedClient)

        if(!notified) {
            response.status(500)
        }

        response.status(201).json(notified)

    } catch (error: any) {
        response.status(400)
        logger.error(error)
    }
}

const extractIncomingData = (request: Request) => {
    const { body } = request
    const { subscribedClient } = body

    return subscribedClient
}


export default { notifyCreatedSubscriptionController }
