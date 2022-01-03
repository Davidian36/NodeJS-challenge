import SubscribedClient from '../../entities/subscribedClient'
import SaveSubscriptionRepository from '../../repositories/saveSubscription.repository'

const createSubscription = (saveSubscriptionRepository: SaveSubscriptionRepository) => async (subscribedClient: SubscribedClient) => { 

    // Save the subscription and get its ID
    const subscriptionID = await saveSubscriptionRepository.saveSubscription(
        subscribedClient.user_email, 
        subscribedClient.user_firstName, 
        subscribedClient.user_gender, 
        subscribedClient.user_birthDate, 
        subscribedClient.consent_flag, 
        subscribedClient.newsletter_id
    )

    return subscriptionID
}

export default createSubscription 