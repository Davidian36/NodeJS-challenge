import saveSubscriptionRepository from "../core/repositories/saveSubscription.repository"
import { databaseAccess } from '../dbaccess/databaseAccess.class'
import axios from 'axios'
import logger from '../logging/winstonLogger'

export class saveNewSubscription implements saveSubscriptionRepository {

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

        // 1: Query the bd to insert the new subscription and get its ID
        let query = 'INSERT INTO subscriptions (user_id,consent_flag,newsletter_id) SELECT ?, ?, ? WHERE NOT EXISTS(SELECT 1 FROM subscriptions WHERE user_id = ? AND consent_flag = ? AND newsletter_id = ?)'
        let subscriptionID = await db.insertQuery(query, [user_id, consent_flag, newsletter_id, user_id, consent_flag, newsletter_id])

        // 2: Only if the query was succesfull and returned a subscriptionID: 
        // Make a request to the mailing docker service to notify the client and return the subscription id
        if(!subscriptionID) { return 0 }
        await this.notifySubscription(user_email, user_firstName, user_gender, user_birthDate, consent_flag, newsletter_id)
 
        // Return the subscription ID to the client even if the notification failed
        // (we could return an array of responses instead to let the client know if the email was correctly deliverd too)
        return subscriptionID
    }

    private async notifySubscription(user_email: string, user_firstName: string, user_gender: string, user_birthDate: string,
        consent_flag: number, newsletter_id: number): Promise<number> {

        return new Promise(async (resolve, reject) => {

            try {
                const res = await axios.post('http://mailing-container:8082/api/v1/mail/notify_subscription', {
                    subscribedClient: {
                        user_email: user_email,
                        user_firstName: user_firstName,
                        user_gender: user_gender,
                        user_birthDate: user_birthDate,
                        consent_flag: consent_flag,
                        newsletter_id: newsletter_id
                    }
                })

                resolve(1) 

            } catch (err) {
                logger.error(err)
                reject(0)
            }
        })
    }
}





