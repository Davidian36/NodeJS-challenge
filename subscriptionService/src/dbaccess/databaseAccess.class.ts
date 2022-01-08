import dotenv from 'dotenv' 
dotenv.config()
import mysql from 'mysql2'
import logger from '../logging/winstonLogger'

export class databaseAccess {
    private conn: any
    static connectToDB: Function
    static queryDB: Function

    public async connectToDB(): Promise<number> {

        return new Promise((resolve, reject) => {
            try {
                this.conn = mysql.createConnection({
                    host: process.env.DB_HOST, 
                    user: process.env.DB_USER, 
                    password: process.env.DB_PASSWORD,
                    database: process.env.DB_DATABASE
                })
                // console.log('Connection established')
                resolve(1)
                
            } catch (err: any) {
                // console.log('Connection error')
                logger.error(err)
                reject(0)
            }
        })
    }

    public async insertQuery(query: string, vars: object): Promise<number> {
        return new Promise((resolve, reject) => {

            this.conn.query(query, vars, (err: string, result: any) => {

                if (err) {
                    // console.log('query_error' + err) 
                    logger.error(err)
                    reject(0)
                }

                // console.log(result.insertId)
                resolve(result.insertId)
            })
        })
    }

    public async deleteQuery(query: string, vars: object): Promise<number> {
        return new Promise((resolve, reject) => {
            this.conn.query(query, vars, (err: string) => {
                
                if (err) {
                    // console.log('query_error' + err) 
                    logger.error(err)
                    reject(0)
                }

                resolve(1)
            })
        })
    }

    public async getQuery(query: string, vars: object): Promise<any> {
        return new Promise((resolve, reject) => {

            this.conn.query(query, vars, (err: string, result: any) => {

                if (err) {
                    // console.log('query_error' + err) 
                    logger.error(err)
                    reject(0)
                }

                // console.log(result)
                resolve(result)
            })
        })
    }

    public async getAllQuery(query: string): Promise<any> {
        return new Promise((resolve, reject) => {

            this.conn.query(query, (err: string, result: any) => {

                if (err) {
                    // console.log('query_error' + err) 
                    logger.error(err)
                    reject(0)
                }

                resolve(result)
            })
        })
    }

    public async disconnectFromDB() {
        return this.conn.end((err: string) => {

        })
    }
}