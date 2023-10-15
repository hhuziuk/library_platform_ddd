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
import RedisStore from "connect-redis";
import redisClient from "./tools/RedisConnect";
import {setupSwagger} from "./swagger";
import { graphqlHTTP } from "express-graphql"
const PORT = process.env.PORT || 3015;
const app = express();
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import schema from "./infrastructure/services/GraphQLInfrastructure/GraphQLSchemas";
import {bookResolvers} from "./infrastructure/services/GraphQLInfrastructure/GraphQLSchemas/resolvers/BookResolver";
import {userResolvers} from "./infrastructure/services/GraphQLInfrastructure/GraphQLSchemas/resolvers/UserResolver";
import {
    publisherResolvers
} from "./infrastructure/services/GraphQLInfrastructure/GraphQLSchemas/resolvers/PublisherResolver";
import {typeResolvers} from "./infrastructure/services/GraphQLInfrastructure/GraphQLSchemas/resolvers/TypeResolver";
import {UserType} from "./infrastructure/services/GraphQLInfrastructure/GraphQLSchemas/TypeDefs/UserTypeDef";
import {BookType} from "./infrastructure/services/GraphQLInfrastructure/GraphQLSchemas/TypeDefs/BookTypeDef";
import {PublisherType} from "./infrastructure/services/GraphQLInfrastructure/GraphQLSchemas/TypeDefs/PublisherTypeDef";
import {TypeType} from "./infrastructure/services/GraphQLInfrastructure/GraphQLSchemas/TypeDefs/TypeTypeDef";
app.use(
    "/graphql",
    graphqlHTTP({
        schema,
        graphiql: process.env.NODE_ENV === 'development',
    })
)
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
app.use(express.json())
app.use(cors())
app.use(fileUpload({}))
app.use(cookieParser())
app.use(errorMiddleware)
app.use('/api', router)

setupSwagger(app);

const start = async() => {
    try{
        await redisClient.connect().then(() => console.log('Redis Connected...'))
        await PostgresDataSource.initialize()
            .then(() => console.log('Postgres Connected...'))
            .catch((error) => console.log(error))
        await mongoose.connect(process.env.MONGODB_URL || '')
            .then(() => console.log('MongoDB Connected...'))
            .catch((error) => logger.error(error))
        // const { url } = await startStandaloneServer(server, {
        //     listen: { port: 4000 },
        // })
        app.listen(PORT, () => {logger.info(`app is running on ${PORT} port`)})
    } catch(e){
        logger.error(e)
    }
}


start();

export default app