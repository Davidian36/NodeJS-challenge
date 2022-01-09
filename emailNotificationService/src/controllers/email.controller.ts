import { Request, Response } from 'express'
import logger from '../logging/winstonLogger'
import notifyNewSubscription from '../core/interactors/index'
import joi from 'joi'

  
const notifyCreatedSubscriptionController = async (request: Request, response: Response) => {
    
    // Extracting data from the request and validate it
    const subscribedClient = extractIncomingData(request)

    if(!subscribedClient){
        response.status(400) // Error with the sent data: bad request response
    }

    try {
        // Executing the interactor function with the data
        const notified = await notifyNewSubscription(subscribedClient)

        if(!notified) {
            response.status(500) // False response: server error response
        }

        response.status(250).json(notified) // All ok email delivered

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
          user_firstName: joi.string().min(3).max(45).required(),
          user_gender: joi.string().min(4).max(6).required(),
          user_birthDate: joi.string().min(10).max(10).required(),
          consent_flag: joi.string().min(1).max(1).required(),
          newsletter_id: joi.string().min(1).max(1).required()
        })
    
        const dataToValidate = {
            user_email: subscribedClient.user_email,
            user_firstName: subscribedClient.user_email,
            user_gender: subscribedClient.user_email,
            user_birthDate: subscribedClient.user_email,
            consent_flag: subscribedClient.user_email,
            newsletter_id: subscribedClient.user_email
        }

        const result = schema.validate(dataToValidate)
        if (result.error) {
            logger.error(result.error.details[0].message)
            return 0
        }

        return subscribedClient

    } catch (e) {
        logger.error(e)
        return 0
    }
}

export default { notifyCreatedSubscriptionController }
