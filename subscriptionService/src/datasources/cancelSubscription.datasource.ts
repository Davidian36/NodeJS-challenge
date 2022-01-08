import cancelSubscriptionRepository from "../core/repositories/cancelSubscription.repository"
import { databaseAccess } from '../dbaccess/databaseAccess.class'

export default class cancelSubscriptionRepo implements cancelSubscriptionRepository {

    public async cancelSubscription(
        user_email: string, user_firstName: string, user_gender: string, user_birthDate: string,
        consent_flag: number, newsletter_id: number): Promise<number> {

        // Connect to db
        const db = new databaseAccess
        const dbConnection = await db.connectToDB()

        // Return false if the db connection fails
        if(dbConnection === 0) {
            return 0
        }

        // First we get the id of the user with the info and then we delete the subscription in the subscriptions table
        // (We could also set a column for the subscription state and update it for the cancellation)

        // As the purpose of this service is to cancel a subscription so we hardcode the user id here:
        let user_id = 1

        // Query the db and return the result
        return (await db.deleteQuery('DELETE FROM subscriptions WHERE user_id = ? AND newsletter_id = ?', [user_id, newsletter_id]))
    }
}