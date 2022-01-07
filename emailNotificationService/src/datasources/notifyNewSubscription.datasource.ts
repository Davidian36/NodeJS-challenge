import notifyNewSubscriptionRepository from "../core/repositories/notifyNewSubscription.repository"
import logger from '../logging/winstonLogger'
import nodemailer from 'nodemailer'

export default class notifyNewSubscriptionRepo implements notifyNewSubscriptionRepository {

    public async notifySubscription(user_email: string, user_firstName: string, user_gender: string, user_birthDate: string,
        consent_flag: number, newsletter_id: number): Promise<any> {
            
        return new Promise((resolve, reject) => {

            // Real SMTP server
            const mailer = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 465,
                secure: true,
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS,
                },
            })

            // Real mail options
            const realMailOptions = {
                from: '"Adidas_subscriptions" <' + process.env.EMAIL_USER + '>',
                to: user_email,
                subject: 'Succesfully subscribed to newsletter',
                text: user_firstName + ', thanks for the subscription to the newsletter...'
            }
            
            // Real mail sending
            mailer.sendMail(realMailOptions, (err: any, response: any) => {
        
                if (err) {
                    logger.error(err)
                    reject(0)
                }
        
                // logger.info(response)
                resolve(response)
            })
        })     
    }
}
