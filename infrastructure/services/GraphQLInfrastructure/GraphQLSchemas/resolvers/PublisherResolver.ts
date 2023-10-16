import PostgresPublisherRepository from "../../../../db/repositories/PostgresRepository/PostgresPublisherRepository";
import {PublisherType} from "../TypeDefs/PublisherTypeDef";
import {GraphQLList, GraphQLString} from "graphql";
import {Publisher} from "../../../../db/entities/PostgresEntities/PublisherModel";
import {GraphQLID, GraphQLNonNull} from "graphql/type";
import PostgresUserRepository from "../../../../db/repositories/PostgresRepository/PostgresUserRepository";
import {UserType} from "../TypeDefs/UserTypeDef";
import {BookType} from "../TypeDefs/BookTypeDef";

const getAllPublishers = async (parent, args) => {
    const postgresPublishers = await PostgresPublisherRepository.find();
    return [...postgresPublishers];
};

const getOnePublisher = async (parent, args) => {
    return await PostgresPublisherRepository.findOne({ id: args.id });
};

export const publisherResolvers = {
    Query: {
        getAll: getAllPublishers,
        getOne: getOnePublisher,
        publishers: {
            type: new GraphQLList(PublisherType),
            resolve: getAllPublishers,
        },
        publisher: {
            type: BookType,
            args: { id: { type: GraphQLID } },
            resolve: getOnePublisher,
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