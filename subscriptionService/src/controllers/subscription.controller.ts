import { Request, Response } from 'express'
import winston from 'winston'
import createSubscription from '../core/interactors/createSubscription/index'
import cancelSubscription from '../core/interactors/cancelSubscription/index'
import getSubscription from '../core/interactors/getSubscription/index'
import getAllSubscriptions from '../core/interactors/getAllSubscriptions/index'

const createSubscriptionController = async (request: Request, response: Response) => {
    
    // Extracting data from the request
    const subscribedClient = extractIncomingData(request)

    // console.log(subscribedClient)

    try {
        // Executing the interactor function with the data
        const subscriptionID = await createSubscription(subscribedClient)

        if(!subscriptionID) {
            response.status(500)
        }

        response.status(201).json(subscriptionID)

    } catch (error: any) {
        response.status(500)
        logger.info(error)
    }
}

const cancelSubscriptionController = async (request: Request, response: Response) => {
    
    // Extracting data from the request
    const subscribedClient = extractIncomingData(request)

    try {
        // Executing the interactor function with the data
        const cancelSubscriptionRes = await cancelSubscription(subscribedClient)
        
        // Answers 0 if the cancellation failed
        if(!cancelSubscriptionRes) {
            response.status(500)
        }

        // Answers 1 if the cancellation was succesfull
        response.status(201).json(cancelSubscriptionRes)

    } catch (error: any) {
        response.status(500)
        logger.info(error)
    }
}

const getSubscriptionController = async (request: Request, response: Response) => {
    
    // Extracting data from the request
    const subscribedClient = extractIncomingData(request)

    try {
        // Executing the interactor function with the data
        const subscriptionDetails = await getSubscription(subscribedClient)
        
        // Answers 0 if the cancellation failed
        if(!subscriptionDetails) {
            response.status(500)
        }

        // Answers 1 if the cancellation was succesfull
        response.status(200).json(subscriptionDetails)

    } catch (error: any) {
        response.status(500)
        logger.info(error)
    }
}

const getAllSubscriptionsController = async (request: Request, response: Response) => {
    
    // Extracting data from the request
    const subscribedClient = extractIncomingData(request)

    try {
        // Executing the interactor function with the data
        const allSubscriptionsDetails = await getAllSubscriptions(subscribedClient)
        
        // Answers 0 if the cancellation failed
        if(!allSubscriptionsDetails) {
            response.status(500)
        }

        // Answers 1 if the cancellation was succesfull
        response.status(200).json(allSubscriptionsDetails)

    } catch (error: any) {
        response.status(500)
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


export default { createSubscriptionController, cancelSubscriptionController, getSubscriptionController, getAllSubscriptionsController }
