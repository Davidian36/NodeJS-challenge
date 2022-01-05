import winston from 'winston'

let logger = winston.createLogger({
    transports: [
        new (winston.transports.File)({ 
            filename: 'emailNotificationService_logs/error.log' 
        })
    ]
})

export default logger