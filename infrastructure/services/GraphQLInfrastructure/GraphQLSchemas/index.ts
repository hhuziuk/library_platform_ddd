import {GraphQLID, GraphQLList, GraphQLNonNull, GraphQLObjectType} from "graphql/type";
import {BookType} from "./TypeDefs/BookTypeDef";
import {bookResolvers} from "./resolvers/BookResolver";
import {GraphQLSchema, GraphQLString} from "graphql";
import {UserType} from "./TypeDefs/UserTypeDef";
import {userResolvers} from "./resolvers/UserResolver";
import {User} from "../../../db/entities/PostgresEntities/UserModel";
import PostgresUserRepository from "../../../db/repositories/PostgresRepository/PostgresUserRepository";
import {typeResolvers} from "./resolvers/TypeResolver";
import {TypeType} from "./TypeDefs/TypeTypeDef";
import {publisherResolvers} from "./resolvers/PublisherResolver";
import {PublisherType} from "./TypeDefs/PublisherTypeDef";

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        books: {
            type: new GraphQLList(BookType),
            resolve: bookResolvers.Query.getAll,
        },
        book: {
            type: BookType,
            args: { id: { type: GraphQLID } },
            resolve: bookResolvers.Query.getOne,
        },
        types: {
            type: new GraphQLList(TypeType),
            resolve: typeResolvers.Query.getAll,
        },
        type: {
            type: TypeType,
            args: { id: { type: GraphQLID } },
            resolve: typeResolvers.Query.getOne,
        },
        publishers: {
            type: new GraphQLList(PublisherType),
            resolve: publisherResolvers.Query.getAll,
        },
        publisher: {
            type: PublisherType,
            args: { id: { type: GraphQLID } },
            resolve: publisherResolvers.Query.getOne,
        },
        users: {
            type: new GraphQLList(UserType),
            resolve: userResolvers.Query.getAll,
        },
        user: {
            type: UserType,
            args: { id: { type: GraphQLID } },
            resolve: userResolvers.Query.getOne,
        },
    }
});

const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        //Create new user
        addUser: {
            type: UserType,
            args: {
                username: { type: GraphQLNonNull(GraphQLString) },
                password: { type: GraphQLNonNull(GraphQLString) },
                email: { type: GraphQLNonNull(GraphQLString) },
                role: { type: GraphQLNonNull(GraphQLString) },
            },
            async resolve(parent, args){
                const user = new User();
                return await PostgresUserRepository.save({
                    username: args.username,
                    password: args.password,
                    email: args.email,
                    role: args.role
                })
            }
        },
        //Delete an user
        deleteUser: {
            type: UserType,
            args: {
                id: { type: GraphQLNonNull(GraphQLID) },
            },
            async resolve(parent, args){
                const user = new User();
                return await PostgresUserRepository.delete(args.id)
            }
        },
    }
})

const schema = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});

export default schema;