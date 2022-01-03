import notifyNewSubscription from './notifyNewSubscription.interactor'
import notifyNewSubscriptionRepo from '../../datasources/notifyNewSubscription.datasource'

// The datasources implementation 
const notifyNewSubscriptionRepository = new notifyNewSubscriptionRepo() 

export default notifyNewSubscription(notifyNewSubscriptionRepository)