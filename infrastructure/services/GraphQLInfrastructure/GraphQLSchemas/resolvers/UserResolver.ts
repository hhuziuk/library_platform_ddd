import PostgresUserRepository from "../../../../db/repositories/PostgresRepository/PostgresUserRepository";
import {UserType} from "../TypeDefs/UserTypeDef";
import {GraphQLID, GraphQLNonNull} from "graphql/type";
import {GraphQLList, GraphQLString} from "graphql";
import {User} from "../../../../db/entities/PostgresEntities/UserModel";
import PostgresBookRepository from "../../../../db/repositories/PostgresRepository/PostgresBookRepository";
import {BookType} from "../TypeDefs/BookTypeDef";


const getAllUsers = async (parent, args) => {
    const postgresUsers = await PostgresUserRepository.find();
    return [...postgresUsers];
};

const getOneUser = async (parent, args) => {
    return await PostgresUserRepository.findOne({ id: args.id });
};

export const userResolvers = {
    Query: {
        getAll: getAllUsers,
        getOne: getOneUser,
        users: {
            type: new GraphQLList(UserType),
            resolve: getAllUsers,
        },
        user: {
            type: BookType,
            args: { id: { type: GraphQLID } },
            resolve: getOneUser,
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