import getAllSubscriptionsRepository from "../core/repositories/getAllSubscriptions.repository"
import { databaseAccess } from '../dbaccess/databaseAccess.class'

export default class getAllSubscriptionsRepo implements getAllSubscriptionsRepository {

    public async getAllSubscriptions(): Promise<any> {

        // Connect to db
        const db = new databaseAccess
        const dbConnection = await db.connectToDB()

        // Return false if the db connection fails
        if(dbConnection === 0) {
            return 0
        }

        // Query the db and return the result of all the subscriptions details
        return (await db.getAllQuery('SELECT * FROM subscriptions'))
    }
}