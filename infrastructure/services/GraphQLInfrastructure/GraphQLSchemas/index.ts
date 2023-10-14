import {GraphQLID, GraphQLList, GraphQLObjectType} from "graphql/type";
import {BookType} from "./TypeDefs/BookTypeDef";
import {bookResolvers} from "./resolvers/BookResolver";
import {GraphQLSchema} from "graphql";
import {UserType} from "./TypeDefs/UserTypeDef";
import {userResolvers} from "./resolvers/UserResolver";

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        books: {
            type: new GraphQLList(BookType),
            resolve: bookResolvers.Query.books,
        },
        book: {
            type: BookType,
            args: { id: { type: GraphQLID } },
            resolve: bookResolvers.Query.book,
        },
        users: {
            type: new GraphQLList(UserType),
            resolve: userResolvers.Query.users,
        },
        user: {
            type: UserType,
            args: { id: { type: GraphQLID } },
            resolve: userResolvers.Query.user,
        },
    }
});

const schema = new GraphQLSchema({
    query: RootQuery,
});

export default schema;