import RedisStore from "connect-redis";
import session from "express-session"
import {createClient} from "redis";
import logger from "./logger";

const REDIS_URL: any = process.env.REDIS_URL;
const redisClient = createClient(REDIS_URL)

const redisConnect = async function () {
    try{
        await redisClient.connect().then(() => console.log('Redis Connected...'))
    } catch (e) {
        logger.error('Redis Connection Error:', e)
    }

}

redisConnect()

export default session({
    store: new RedisStore({ client: redisClient }),
    secret: process.env.REDIS_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false, // if true only transmit cookie over https
        httpOnly: false, // if true prevent client side JS from reading the cookie
        maxAge: 1000 * 60 * 10 // session max age in miliseconds
    }
})