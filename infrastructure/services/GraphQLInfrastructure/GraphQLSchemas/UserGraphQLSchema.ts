import {GraphQLBoolean, GraphQLID, GraphQLList, GraphQLObjectType, GraphQLString} from "graphql/type";
import {GraphQLSchema} from "graphql";
import MongoUserRepository from "../../../db/repositories/MongoRepository/MongoUserRepository";
import PostgresUserRepository from "../../../db/repositories/PostgresRepository/PostgresUserRepository";

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: {type: GraphQLID},
        username: {type: GraphQLString},
        password: {type: GraphQLString},
        email: {type: GraphQLString},
        role: {type: GraphQLString},
        isActivated: {type: GraphQLBoolean},
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        users: {
            type: new GraphQLList(UserType),
            async resolve(parent, args){
                //const mongoUsers = await MongoUserRepository.find();
                const postgresUsers = await PostgresUserRepository.find();
                return [...postgresUsers];
            }
        },
        user: {
            type: UserType,
            args: {id: {type: GraphQLID}},
            async resolve(parent, args){
                return await PostgresUserRepository.findOne(user => user.id === args.id)
            }
        }
    }
})

export default new GraphQLSchema({
    query: RootQuery
})