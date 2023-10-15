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
import PostgresBookRepository from "../../../db/repositories/PostgresRepository/PostgresBookRepository";
import {Book} from "../../../db/entities/PostgresEntities/BookModel";
import {Publisher} from "../../../db/entities/PostgresEntities/PublisherModel";
import PostgresPublisherRepository from "../../../db/repositories/PostgresRepository/PostgresPublisherRepository";
import PostgresTypeRepository from "../../../db/repositories/PostgresRepository/PostgresTypeRepository";
import {Type} from "../../../db/entities/PostgresEntities/TypeModel";
import {ApolloServer} from "@apollo/server/dist/cjs";


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

    }
});

const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        addUser: userResolvers.Mutation.fields.addUser,
        deleteUser: userResolvers.Mutation.fields.deleteUser,
        addBook: bookResolvers.Mutation.fields.addBook,
        deleteBook: bookResolvers.Mutation.fields.deleteBook,
        addPublisher: publisherResolvers.Mutation.fields.addPublisher,
        deletePublisher: publisherResolvers.Mutation.fields.deletePublisher,
        addType: typeResolvers.Mutation.fields.addType,
        deleteType: typeResolvers.Mutation.fields.deleteType,
    }
})

const schema = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});

export default schema;