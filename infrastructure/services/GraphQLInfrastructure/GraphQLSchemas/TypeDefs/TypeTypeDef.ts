import { GraphQLID, GraphQLObjectType, GraphQLString } from "graphql";
export const TypeType = new GraphQLObjectType({
    name: 'Type',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
    })
});