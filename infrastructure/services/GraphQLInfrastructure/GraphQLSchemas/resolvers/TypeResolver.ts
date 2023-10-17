import PostgresTypeRepository from "../../../../db/repositories/PostgresRepository/PostgresTypeRepository";
import {GraphQLID, GraphQLNonNull} from "graphql/type";
import {Type} from "../../../../db/entities/PostgresEntities/TypeModel";
import {TypeType} from "../TypeDefs/TypeTypeDef";
import {GraphQLList, GraphQLString} from "graphql";
import {BookType} from "../TypeDefs/BookTypeDef";

const getAllTypes = async (parent, args) => {
    const postgresTypes = await PostgresTypeRepository.find();
    return [...postgresTypes];
};

const getOneType = async (parent, args) => {
    return await PostgresTypeRepository.findOne({ id: args.id });
};

export const typeResolvers = {
    Query: {
        getAll: getAllTypes,
        getOne: getOneType,
        types: {
            type: new GraphQLList(TypeType),
            resolve: getAllTypes,
        },
        type: {
            type: BookType,
            args: { id: { type: GraphQLID } },
            resolve: getOneType,
        },
    },
    Mutation: {
        name: "TypeMutation",
        fields: {
            //Create new type
            addType: {
                type: TypeType,
                args: {
                    name: { type: GraphQLString },
                },
                async resolve(parent, args){
                    const type = new Type();
                    return await PostgresTypeRepository.save({
                        name: args.name
                    })
                }
            },
            //Delete a type
            deleteType: {
                type: TypeType,
                args: {
                    id: { type: GraphQLNonNull(GraphQLID) },
                },
                async resolve(parent, args){
                    const type = new Type();
                    return await PostgresTypeRepository.delete(args.id)
                }
            },
        }
    }
};