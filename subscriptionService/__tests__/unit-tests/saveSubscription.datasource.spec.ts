import { saveNewSubscription } from '../../src/datasources/saveSubscription.datasource'
const thesaveSubscriptionClass = new saveNewSubscription()
import { databaseAccess } from '../../src/dbaccess/databaseAccess.class'
const thedatabaseAccessClass = new databaseAccess()

// Mock the database access class here
jest.mock('../../src/dbaccess/databaseAccess.class', () => {
    const dbFunctions = { connectToDB: jest.fn(), insertQuery: jest.fn() }
    const mockedDatabaseAccess = jest.fn(() => dbFunctions);
    return { databaseAccess: mockedDatabaseAccess }
})

describe('Testing the subscription class public method call', () => {

    // Testing the public method call
    test('save subscription in the db and send a request to the emailing service', async () => {

        // Mock the database access class connectToDB function
        const mockedDatabaseConn = jest.spyOn(thedatabaseAccessClass, 'connectToDB')
        mockedDatabaseConn.mockImplementationOnce(async () => 1)

        // Mock the database access class insertQuery function
        const mockedDatabaseinsertQuery = jest.spyOn(thedatabaseAccessClass, 'insertQuery')
        mockedDatabaseinsertQuery.mockImplementationOnce(async () => 1)

        // Mock the saveNewSubscription class notifySubscription private function
        const mockedNotifySubscription = jest.spyOn(saveNewSubscription.prototype as any, 'notifySubscription')
        mockedNotifySubscription.mockImplementationOnce(async () => 1)

        // Call the public funstion to test
        const result = await thesaveSubscriptionClass.saveSubscription('thomas333@to.com', 'Thomas', 'male', '15/05/1999', 1, 1)

        expect(result).toBeTruthy()
        expect(mockedDatabaseConn).toHaveBeenCalledTimes(1)
        expect(mockedDatabaseinsertQuery).toHaveBeenCalledTimes(1)
        expect(mockedNotifySubscription).toHaveBeenCalledTimes(1)
    })
})


///////////////////////////////////////////////////////////////////////////////////////////////////////


import axios from 'axios'
// Mock for axios post method
const mockedAxiosPost = jest.spyOn(axios, 'post')
const expectedResult = 1 
mockedAxiosPost.mockImplementationOnce(() => 
    Promise.resolve({ 
        data: expectedResult
}))

describe('Testing the subscription class private method call', () => {
    
    afterAll(() => { jest.resetAllMocks() })

    // Testing the private method call
    test('send a http request to the emailing docker linked service to send the email to the client', async () => {

        const result = await thesaveSubscriptionClass['notifySubscription']('thomas333@to.com', 'Thomas', 'male', '15/05/1999', 1, 1) 

        expect(result).toBe(expectedResult)
        expect(mockedAxiosPost).toHaveBeenCalled()

        // Restore axios post method
        // mockedAxiosPost.mockRestore()
    })
})


