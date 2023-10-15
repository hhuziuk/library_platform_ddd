import PostgresTypeRepository from "../../../../db/repositories/PostgresRepository/PostgresTypeRepository";
import {GraphQLID, GraphQLNonNull} from "graphql/type";
import {Type} from "../../../../db/entities/PostgresEntities/TypeModel";
import {TypeType} from "../TypeDefs/TypeTypeDef";
import {GraphQLString} from "graphql";

export const typeResolvers = {
    Query: {
        getAll: async (parent, args) => {
            //const mongoUsers = await MongoTypeRepository.find();
            const postgresTypes = await PostgresTypeRepository.find();
            return [...postgresTypes];
        },
        getOne: async (parent, args) => {
            return await PostgresTypeRepository.findOne({ id: args.id });
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