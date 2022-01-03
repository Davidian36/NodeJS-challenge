import getAllSubscriptions from './getAllSubscriptions.interactor'
import getAllSubscriptionsRepo from '../../../datasources/getAllSubscriptions.datasource'

// The datasources implementation 
const getAllSubscriptionsRepository = new getAllSubscriptionsRepo() 

export default getAllSubscriptions(getAllSubscriptionsRepository)