import winston from 'winston'

let logger = winston.createLogger({
    transports: [
        new (winston.transports.File)({ 
            filename: 'subscriptionService_logs/error.log' 
        })
    ]
})

export default logger