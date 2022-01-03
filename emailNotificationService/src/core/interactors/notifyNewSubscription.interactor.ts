import SubscribedClient from '../entities/subscribedClient'
import NotifyNewSubscription from '../repositories/notifyNewSubscription.repository'

const notifyNewSubscription = (notifyNewSubscription: NotifyNewSubscription) => async (subscribedClient: SubscribedClient) => {

    // Save the subscription and get its ID
    const notifySubscriptionRes = await notifyNewSubscription.notifySubscription(
        subscribedClient.user_email, 
        subscribedClient.user_firstName, 
        subscribedClient.user_gender, 
        subscribedClient.user_birthDate, 
        subscribedClient.consent_flag, 
        subscribedClient.newsletter_id
    )

    return notifySubscriptionRes
}

export default notifyNewSubscription
