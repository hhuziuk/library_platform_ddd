import PostgresUserRepository from "../../../../db/repositories/PostgresRepository/PostgresUserRepository";
import {UserType} from "../TypeDefs/UserTypeDef";
import {GraphQLID, GraphQLNonNull} from "graphql/type";
import {GraphQLString} from "graphql";
import {User} from "../../../../db/entities/PostgresEntities/UserModel";

export const userResolvers = {
    Query: {
        getAll: async (parent, args) => {
            //const mongoUsers = await MongoUserRepository.find();
            const postgresUsers = await PostgresUserRepository.find();
            return [...postgresUsers];
        },
        getOne: async (parent, args) => {
            return await PostgresUserRepository.findOne({ id: args.id });
        },

    },
    Mutation: {
        name: "UserMutation",
        fields: {
            //Create new user
            addUser: {
                type: UserType,
                args: {
                    username: {type: GraphQLNonNull(GraphQLString)},
                    password: {type: GraphQLNonNull(GraphQLString)},
                    email: {type: GraphQLNonNull(GraphQLString)},
                    role: {type: GraphQLNonNull(GraphQLString)},
                },
                async resolve(parent, args) {
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
                    id: {type: GraphQLNonNull(GraphQLID)},
                },
                async resolve(parent, args) {
                    const user = new User();
                    return await PostgresUserRepository.delete(args.id)
                }
            },
        }
    }
};