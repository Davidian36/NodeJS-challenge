import getSubscription from './getSubscription.interactor'
import getSubscriptionRepo from '../../../datasources/getSubscription.datasource'

// The datasources implementation 
const getSubscriptionRepository = new getSubscriptionRepo() 

export default getSubscription(getSubscriptionRepository)