const { mock } = require('nodemailer') // it automatically loads the mocked module from ./__mocks__/nodemailer.js 
import notifyNewSubscription from '../../src/datasources/notifyNewSubscription.datasource'
const theNotifierClass = new notifyNewSubscription()

test('Send an email using the mocked nodemailer', async () => {
  
    // test the function that send emails here
    const result = await theNotifierClass.notifySubscription('thomas333@to.com', 'Thomas', 'male', '15/05/1999', 1, 1)

    expect(result).toBeTruthy()

    // check the mock for our sent emails
    const sentEmails = mock.getSentMail()
    // there should be one
    expect(sentEmails.length).toBe(1)
    // and it should match the to address
    expect(sentEmails[0].to).toBe('thomas333@to.com')
})


