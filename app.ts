import express from "express"
require('dotenv').config()
import cors from 'cors'
import logger from "./tools/logger";
import cookieParser from "cookie-parser";
import mongoose from 'mongoose'
import {PostgresDataSource} from "./tools/PGconnect";

const PORT = process.env.PORT || 3015;
const app = express();

app.use(express.json())
app.use(cors())
app.use(cookieParser())


const start = async() => {
    try{
        await PostgresDataSource.initialize()
            .then(() => console.log('Postgres Connected...'))
            .catch((error) => console.log(error))
        await mongoose.connect(process.env.MONGODB_URL || '')
            .then(() => console.log('MongoDB Connected...'))
            .catch((error) => logger.error(error))
        app.listen(PORT, () => {logger.info(`app is running on ${PORT} port`)})
    } catch(e){
        logger.error(e)
    }
}

start();

export default app