import PostgresPublisherRepository from "../../../../db/repositories/PostgresRepository/PostgresPublisherRepository";
import {PublisherType} from "../TypeDefs/PublisherTypeDef";
import {GraphQLString} from "graphql";
import {Publisher} from "../../../../db/entities/PostgresEntities/PublisherModel";
import {GraphQLID, GraphQLNonNull} from "graphql/type";

export const publisherResolvers = {
    Query: {
        getAll: async (parent, args) => {
            //const mongoUsers = await MongoPublisherRepository.find();
            const postgresPublishers = await PostgresPublisherRepository.find();
            return [...postgresPublishers];
        },
        getOne: async (parent, args) => {
            return await PostgresPublisherRepository.findOne({ id: args.id });
        },

    },

    Mutation: {
        name: "PublisherMutation",
        fields: {
            //Create new publisher
            addPublisher: {
                type: PublisherType,
                args: {
                    name: { type: GraphQLString },
                },
                async resolve(parent, args){
                    const publisher = new Publisher();
                    return await PostgresPublisherRepository.save({
                        name: args.name
                    })
                }
            },
            //Delete a publisher
            deletePublisher: {
                type: PublisherType,
                args: {
                    id: { type: GraphQLNonNull(GraphQLID) },
                },
                async resolve(parent, args){
                    const publisher = new Publisher();
                    return await PostgresPublisherRepository.delete(args.id)
                }
            },
        }
    }
};