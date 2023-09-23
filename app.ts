import express from "express"
require('dotenv').config()
import cors from 'cors'
import logger from "./tools/logger";
import cookieParser from "cookie-parser";
import mongoose from 'mongoose'
import {PostgresDataSource} from "./tools/PGconnect";
import errorMiddleware from "./infrastructure/middleware/ErrorMiddleware";
import fileUpload from "express-fileupload";
import session from "./tools/RedisConnect";
import router from "./infrastructure/routers";
import {createClient} from "redis";


const PORT = process.env.PORT || 3015;
const app = express();

app.use(session)
app.use(express.json())
app.use(cors())
app.use(fileUpload({}))
app.use(cookieParser())
app.use(errorMiddleware)
app.use('/api', router)


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


start()

export default app