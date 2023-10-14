import { GraphQLID, GraphQLObjectType, GraphQLString } from "graphql";
export const PublisherType = new GraphQLObjectType({
    name: 'Publisher',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
    })
});