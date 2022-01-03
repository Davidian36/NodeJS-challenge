import SubscribedClient from '../../entities/subscribedClient'
import CancelSubscriptionRepository from '../../repositories/cancelSubscription.repository'

const cancelSubscription = (cancelSubscriptionRepository: CancelSubscriptionRepository) => async (subscribedClient: SubscribedClient) => {

    // Save the subscription and get its ID
    const cancelSubscriptionRes = await cancelSubscriptionRepository.cancelSubscription(
        subscribedClient.user_email, 
        subscribedClient.user_firstName, 
        subscribedClient.user_gender, 
        subscribedClient.user_birthDate, 
        subscribedClient.consent_flag, 
        subscribedClient.newsletter_id
    )

    return cancelSubscriptionRes
}

export default cancelSubscription
