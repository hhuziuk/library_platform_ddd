import {GraphQLObjectType} from "graphql/type";
import {bookResolvers} from "./resolvers/BookResolver";
import {GraphQLSchema} from "graphql";
import {userResolvers} from "./resolvers/UserResolver";
import {typeResolvers} from "./resolvers/TypeResolver";
import {publisherResolvers} from "./resolvers/PublisherResolver";


const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: bookResolvers.Query.book,
        books: bookResolvers.Query.books,
        user: userResolvers.Query.user,
        users: userResolvers.Query.users,
        type: typeResolvers.Query.type,
        types: typeResolvers.Query.types,
        publishers: publisherResolvers.Query.publishers,
        publisher: publisherResolvers.Query.publisher,
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