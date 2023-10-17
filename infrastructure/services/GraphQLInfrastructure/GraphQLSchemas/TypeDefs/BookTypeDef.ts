import { GraphQLID, GraphQLObjectType, GraphQLString } from "graphql/type";

export const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        author: { type: GraphQLString },
        description: { type: GraphQLString },
        file: { type: GraphQLString },
        ISBN: { type: GraphQLString },
        typeId: { type: GraphQLID },
        publisherId: { type: GraphQLID },
    })
});