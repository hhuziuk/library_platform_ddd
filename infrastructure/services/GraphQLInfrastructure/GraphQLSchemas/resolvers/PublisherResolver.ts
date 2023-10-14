import PostgresPublisherRepository from "../../../../db/repositories/PostgresRepository/PostgresPublisherRepository";

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
};