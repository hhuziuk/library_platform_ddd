import express from "express"
require('dotenv').config()
import cors from 'cors'
import logger from "./tools/logger";
import cookieParser from "cookie-parser";
import mongoose from 'mongoose'
import {PostgresDataSource} from "./tools/PGconnect";
import errorMiddleware from "./infrastructure/middleware/ErrorMiddleware";
import fileUpload from "express-fileupload";
import session from "express-session";
import router from "./infrastructure/routers";
import {createClient} from "redis";
import RedisStore from "connect-redis";
import redisClient from "./tools/RedisConnect";


const PORT = process.env.PORT || 3015;
const app = express();

app.use(express.json())
app.use(cors())
app.use(fileUpload({}))
app.use(cookieParser())
app.use(errorMiddleware)
app.use(session({
    store: new RedisStore({ client: redisClient }),
    name: 'sessioncookie',
    secret: process.env.REDIS_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false, // if true only transmit cookie over https
        httpOnly: true, // if true prevent client side JS from reading the cookie
        maxAge: 1000 * 60 * 10 // session max age in miliseconds
    }
}))
app.use('/api', router)


const start = async() => {
    try{
        await redisClient.connect().then(() => console.log('Redis Connected...'))
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