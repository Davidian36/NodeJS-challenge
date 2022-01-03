import notifyNewSubscriptionRepo from './notifyNewSubscription.datasource'

describe('test1', () => {
    test('test1 should return: 100000', () => {
        let expected = 100000
        let notifyNewSubscription = new notifyNewSubscriptionRepo()
        let result = notifyNewSubscription.notifySubscription(
            user_email: string, user_firstName: string, user_gender: string, user_birthDate: string,
            consent_flag: number, newsletter_id: number)
        expect(expected).toBe(result)
    })

    test('fillObject should return resolved promise with msg: object fullfilled', () => {
        let expected = 'object fullfilled'
        notifyNewSubscriptionRepo.fillObject().then(msg => {
            expect(msg).toBe(expected)
        }).catch((error) => {
            console.log('Something bad happened ' + error)
        })
    })

})

