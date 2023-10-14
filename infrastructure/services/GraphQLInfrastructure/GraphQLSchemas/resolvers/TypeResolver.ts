import PostgresTypeRepository from "../../../../db/repositories/PostgresRepository/PostgresTypeRepository";

export const typeResolvers = {
    Query: {
        getAll: async (parent, args) => {
            //const mongoUsers = await MongoTypeRepository.find();
            const postgresTypes = await PostgresTypeRepository.find();
            return [...postgresTypes];
        },
        getOne: async (parent, args) => {
            return await PostgresTypeRepository.findOne(type => type.id === args.id);
        },
    },
};