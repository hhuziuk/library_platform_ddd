import PostgresBookRepository from "../../../../db/repositories/PostgresRepository/PostgresBookRepository";

export const bookResolvers = {
    Query: {
        getAll: async (parent, args) => {
            //const mongoBooks = await MongoBookRepository.find();
            const postgresBooks = await PostgresBookRepository.find();
            return [...postgresBooks];
        },
        getOne: async (parent, args) => {
            return await PostgresBookRepository.findOne(book => book.id === args.id);
        },
    },
};
