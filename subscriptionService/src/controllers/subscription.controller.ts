import { Request, Response } from 'express'
import logger from '../logging/winstonLogger'
import createSubscription from '../core/interactors/createSubscription/index'
import cancelSubscription from '../core/interactors/cancelSubscription/index'
import getSubscription from '../core/interactors/getSubscription/index'
import getAllSubscriptions from '../core/interactors/getAllSubscriptions/index'
import joi from 'joi'


const createSubscriptionController = async (request: Request, response: Response) => {
    
    // Extracting data from the request
    const subscribedClient = extractIncomingData(request)
    
    if(!subscribedClient){
        response.status(400) // Error with the sent data: bad request response
    }

    try {
        // Executing the interactor function with the data
        const subscriptionID = await createSubscription(subscribedClient)

        if(!subscriptionID) {
            response.status(500)
        }

        response.status(201).json(subscriptionID) // All ok subscription created

    } catch (error: any) {
        response.status(500)
        logger.error(error)
    }
}

const cancelSubscriptionController = async (request: Request, response: Response) => {
    
    // Extracting data from the request
    const subscribedClient = extractIncomingData(request)

    if(!subscribedClient){
        response.status(400) // Error with the sent data: bad request response
    }

    try {
        // Executing the interactor function with the data
        const cancelSubscriptionRes = await cancelSubscription(subscribedClient)
        
        if(!cancelSubscriptionRes) {
            response.status(500)
        }

        response.status(201).json(cancelSubscriptionRes) // All ok cancellation was succesfull

    } catch (error: any) {
        response.status(500)
        logger.error(error)
    }
}

const getSubscriptionController = async (request: Request, response: Response) => {
    
    // Extracting data from the request
    const subscribedClient = extractIncomingData(request)

    if(!subscribedClient){
        response.status(400) // Error with the sent data: bad request response
    }

    try {
        // Executing the interactor function with the data
        const subscriptionDetails = await getSubscription(subscribedClient)
        
        if(!subscriptionDetails) {
            response.status(500)
        }
        
        console.log(subscriptionDetails)

        response.status(200).json(subscriptionDetails) // All ok information extracted

    } catch (error: any) {
        response.status(500)
        logger.error(error)
    }
}

const getAllSubscriptionsController = async (request: Request, response: Response) => {
    
    try {
        // Executing the interactor function with the data
        const allSubscriptionsDetails = await getAllSubscriptions()

        if(!allSubscriptionsDetails) {
            response.status(500)
        }

        response.status(200).json(allSubscriptionsDetails) // All ok information extracted

    } catch (error: any) {
        response.status(500)
        logger.error(error)
    }
}


const extractIncomingData = (request: Request) => {
    const { body } = request
    const { subscribedClient } = body

    return validateIncomingData(subscribedClient)
}

const validateIncomingData = (subscribedClient: any) => {
    try {
        const schema = joi.object().keys({
            user_email: joi.string().email().required(),
            user_firstName: joi.string().min(3).max(45),
            user_gender: joi.string().min(3).max(10),
            user_birthDate: joi.string().min(10).max(10).required(),
            consent_flag: joi.number().integer().min(1).max(1).required(),
            newsletter_id: joi.number().integer().min(1).max(30).required()
          })
      
          const dataToValidate = {
              user_email: subscribedClient.user_email,
              user_firstName: subscribedClient.user_firstName,
              user_gender: subscribedClient.user_gender,
              user_birthDate: subscribedClient.user_birthDate,
              consent_flag: subscribedClient.consent_flag,
              newsletter_id: subscribedClient.newsletter_id
          }  

        const result = schema.validate(dataToValidate)
        if (result.error) {
            logger.error(result.error.details[0].message)
        }

        return subscribedClient

    } catch (e) {
        logger.error(e)
    }
}

export default { createSubscriptionController, cancelSubscriptionController, getSubscriptionController, getAllSubscriptionsController }
