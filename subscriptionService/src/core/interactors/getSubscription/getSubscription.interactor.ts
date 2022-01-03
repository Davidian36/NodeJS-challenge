import SubscribedClient from '../../entities/subscribedClient'
import GetSubscriptionRepository from '../../repositories/getSubscription.repository'

const getSubscription = (getSubscriptionRepository: GetSubscriptionRepository) => async (subscribedClient: SubscribedClient) => {

    // Save the subscription and get its ID
    const getSubscriptionDetails = await getSubscriptionRepository.getSubscription(
        subscribedClient.user_email, 
        subscribedClient.user_firstName, 
        subscribedClient.user_gender, 
        subscribedClient.user_birthDate, 
        subscribedClient.consent_flag, 
        subscribedClient.newsletter_id
    )

    return getSubscriptionDetails
}

export default getSubscription
