import saveSubscriptionRepository from "../core/repositories/saveSubscription.repository"
import databaseAccess from '../dbaccess/databaseAccess.class'
import axios from 'axios'

export default class saveNewSubscription implements saveSubscriptionRepository {

    public async saveSubscription(
        user_email: string, user_firstName: string, user_gender: string, user_birthDate: string,
        consent_flag: number, newsletter_id: number): Promise<number> {

        // Connect to db
        const db = new databaseAccess
        const dbConnection = await db.connectToDB()

        // Return false if the db connection fails
        if(dbConnection === 0) {
            return 0
        }

        // First we save the user in the db in a users table if it doesn't exist and we get its id
        // or we get the id of the user if it already exists and then we insert the data in the subscriptions table
        // The subscritions table structure:
        // ID (auto increments) | user_id | consent_flag | newsletter_id
        // The purpose of this service is to create a subscription so we hardcode the user id here
        
        let user_id = 1
        const newSubscription = { 
            user_id: user_id, 
            consent_flag: consent_flag,
            newsletter_id: newsletter_id
        }

        
        ///////////////////////////////////////// IT DOESN'T CONNECT WITH THE LOCAL MYSQL SERVER!!!!!!!!!!!!!!!!!!!!!!!
        
        // Query the bd and return the subscription id
        let query = 'INSERT INTO subscriptions (user_id,consent_flag,newsletter_id) SELECT ?, ?, ? WHERE NOT EXISTS(SELECT 1 FROM subscriptions WHERE user_id = ? AND consent_flag = ? AND newsletter_id = ?)'
        await db.insertQuery(query, [user_id, consent_flag, newsletter_id, user_id, consent_flag, newsletter_id])


        // Making a request to the emailing docker linked service in order to notify the client
        axios.post('http://mailing-container:8082/api/v1/mail/notify_subscription', {
            subscribedClient: {
                user_email: "yyylknturpqczbhdcz@nvhrw.com", //using a 10minutemail email here to test
                user_firstName: "David",
                user_gender: "male",
                user_birthDate: "12/03/3520",
                consent_flag: 1,
                newsletter_id: 2
            }
        })
        .then(response => {
            console.log(response)
        })
        .catch(error => {
            console.log(error)
        })

        return 1
    }
}