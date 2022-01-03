import cancelSubscription from './cancelSubscription.interactor'
import cancelSubscriptionRepo from '../../../datasources/cancelSubscription.datasource'

// The datasources implementation 
const cancelSubscriptionRepository = new cancelSubscriptionRepo() 

export default cancelSubscription(cancelSubscriptionRepository)