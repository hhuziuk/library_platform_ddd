import RedisStore from "connect-redis";
import session from "express-session"
import {createClient} from "redis";

const REDIS_URL: any = process.env.REDIS_URL;
const redisClient = createClient(REDIS_URL)

redisClient.connect().catch(console.error).then(() => console.log('Redis Connected...'))

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