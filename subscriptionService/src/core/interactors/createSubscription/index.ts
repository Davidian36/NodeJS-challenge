import createSubscription from './createSubscription.interactor'
import saveNewSubscription from '../../../datasources/saveSubscription.datasource'

// The datasources implementation 
const createSubscriptionRepository = new saveNewSubscription() 

export default createSubscription(createSubscriptionRepository)