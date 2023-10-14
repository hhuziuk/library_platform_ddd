import { GraphQLID, GraphQLList, GraphQLObjectType, GraphQLString, GraphQLBoolean } from "graphql";
export const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLID },
        username: { type: GraphQLString },
        password: { type: GraphQLString },
        email: { type: GraphQLString },
        role: { type: GraphQLString },
        isActivated: { type: GraphQLBoolean },
    })
});