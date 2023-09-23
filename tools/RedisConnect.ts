import RedisStore from "connect-redis";
import session from "express-session"
import {createClient} from "redis";
import logger from "./logger";

const REDIS_URL: any = process.env.REDIS_URL;
const RedisClient = createClient(REDIS_URL)

export default RedisClient