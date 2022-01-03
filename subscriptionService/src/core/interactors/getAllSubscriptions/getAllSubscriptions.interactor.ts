import SubscribedClient from '../../entities/subscribedClient'
import GetAllSubscriptionsRepository from '../../repositories/getAllSubscriptions.repository'

const getAllSubscriptions = (getAllSubscriptionsRepository: GetAllSubscriptionsRepository) => async (subscribedClient: SubscribedClient) => {

    // Save the subscription and get its ID
    const getAllSubscriptionDetails = await getAllSubscriptionsRepository.getAllSubscriptions(
        subscribedClient.user_email, 
        subscribedClient.user_firstName, 
        subscribedClient.user_gender, 
        subscribedClient.user_birthDate, 
        subscribedClient.consent_flag, 
        subscribedClient.newsletter_id
    )

    return getAllSubscriptionDetails
}

export default getAllSubscriptions
