import saveSubscriptionRepository from "../core/repositories/saveSubscription.repository"
import databaseAccess from '../dbaccess/databaseAccess.class'
import axios from 'axios'
import logger from '../logging/winstonLogger'

export default class saveNewSubscription implements saveSubscriptionRepository {

    public async saveSubscription(user_email: string, user_firstName: string, user_gender: string, user_birthDate: string,
        consent_flag: number, newsletter_id: number): Promise<number> {

        // Connect to db
        const db = new databaseAccess
        const dbConnection = await db.connectToDB()

        // Return false if the db connection fails
        if(dbConnection === 0) { return 0 }

        // First we save the user in the db in a users table if it doesn't exist and we get its id
        // or we get the id of the user if it already exists and then we insert the data in the subscriptions table
        // The subscritions table structure: ID (auto increments) | user_id | consent_flag | newsletter_id
        // The purpose of this service is to create a subscription so we hardcode the user id here
        
        let user_id = 1

        // Query the bd and return the subscription id
        let query = 'INSERT INTO subscriptions (user_id,consent_flag,newsletter_id) SELECT ?, ?, ? WHERE NOT EXISTS(SELECT 1 FROM subscriptions WHERE user_id = ? AND consent_flag = ? AND newsletter_id = ?)'
        let subscriptionID = await db.insertQuery(query, [user_id, consent_flag, newsletter_id, user_id, consent_flag, newsletter_id])

        return this.requestToEmailService(subscriptionID, user_email, user_firstName, user_gender, user_birthDate, consent_flag, newsletter_id)
    }

    private async requestToEmailService(subscriptionID: number, user_email: string, user_firstName: string, user_gender: string, user_birthDate: string,
        consent_flag: number, newsletter_id: number) {

        // If the query was succesfull and returned a subscriptionID: 
        // make a request to the emailing docker linked service in order to notify the client
        if(subscriptionID) {

            axios.post('http://mailing-container:8082/api/v1/mail/notify_subscription', {
                subscribedClient: {
                    user_email: user_email,
                    user_firstName: user_firstName,
                    user_gender: user_gender,
                    user_birthDate: user_birthDate,
                    consent_flag: consent_flag,
                    newsletter_id: newsletter_id
                }
            })
            .catch(error => {
                logger.error(error)
            })
        }

        return subscriptionID
    }
}