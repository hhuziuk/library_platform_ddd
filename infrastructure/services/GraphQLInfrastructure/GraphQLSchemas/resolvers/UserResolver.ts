import PostgresUserRepository from "../../../../db/repositories/PostgresRepository/PostgresUserRepository";

export const userResolvers = {
    Query: {
        getAll: async (parent, args) => {
            //const mongoUsers = await MongoUserRepository.find();
            const postgresUsers = await PostgresUserRepository.find();
            return [...postgresUsers];
        },
        getOne: async (parent, args) => {
            return await PostgresUserRepository.findOne(user => user.id === args.id);
        },
    },
};