import SubscribedClient from '../../entities/subscribedClient'
import GetAllSubscriptionsRepository from '../../repositories/getAllSubscriptions.repository'

const getAllSubscriptions = (getAllSubscriptionsRepository: GetAllSubscriptionsRepository) => async () => {

    // Save the subscription and get its ID
    const getAllSubscriptionDetails = await getAllSubscriptionsRepository.getAllSubscriptions()

    return getAllSubscriptionDetails
}

export default getAllSubscriptions
