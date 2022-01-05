import notifyNewSubscriptionRepository from "../core/repositories/notifyNewSubscription.repository"
import logger from '../logging/winstonLogger'
import nodemailer from 'nodemailer'
// const nodemailerMock = require('nodemailer-mock')

export default class notifyNewSubscriptionRepo implements notifyNewSubscriptionRepository {

    public async notifySubscription(
        user_email: string, user_firstName: string, user_gender: string, user_birthDate: string,
        consent_flag: number, newsletter_id: number): Promise<any> {

        // Real mail sending
        const realMailOptions = {
            from: '"Adidas_subscriptions" <' + process.env.EMAIL_USER + '>',
            to: user_email,
            subject: 'Succesfully subscribed to newsletter',
            text: user_firstName + ', thanks for the subscription to the newsletter...'
        }
        
        this.getMailer().sendMail(realMailOptions, (err: any, response: any) => {
    
            if (err) {
                logger.error(err)
            }
    
            return response
        })


        // // Mocked mail sending
        // const transport = nodemailerMock.createTransport();
        // const email = user_email

        // transport.sendMail(email, (err: any, info: any) => {
        //     if (err) {
        //         console.log('Error!', err, info);
        //     }

        //     console.log('Success!', info);
        // })

        // transport.verify(function(err: any, success: any) {
        //     if (err) {
        //       return console.log('Error!', err);
        //     }
        //     return console.log('Success!', success);
        // })
    }

    // Real SMTP server
    private getMailer() {

        return nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        })
    }
}
