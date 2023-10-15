import PostgresBookRepository from "../../../../db/repositories/PostgresRepository/PostgresBookRepository";
import {BookType} from "../TypeDefs/BookTypeDef";
import {GraphQLString} from "graphql";
import {GraphQLID, GraphQLNonNull} from "graphql/type";
import {User} from "../../../../db/entities/PostgresEntities/UserModel";
import {Book} from "../../../../db/entities/PostgresEntities/BookModel";

export const bookResolvers = {
    Query: {
        getAll: async (parent, args) => {
            //const mongoBooks = await MongoBookRepository.find();
            const postgresBooks = await PostgresBookRepository.find();
            return [...postgresBooks];
        },
        getOne: async (parent, args) => {
            return await PostgresBookRepository.findOne({ id: args.id });
        },
    },
    Mutation: {
        name: "BookMutation",
        fields: {
            addBook: {
                type: BookType,
                args: {
                    name: { type: GraphQLString },
                    author: { type: GraphQLString },
                    description: { type: GraphQLString },
                    file: { type: GraphQLString },
                    ISBN: { type: GraphQLString },
                    typeId: { type: GraphQLID },
                    publisherId: { type: GraphQLID },
                },
                async resolve(parent, args){
                    const user = new User();
                    return await PostgresBookRepository.save({
                        name: args.name,
                        author: args.author,
                        description: args.description,
                        file: args.file,
                        ISBN: args.ISBN,
                        typeId: args.typeId,
                        publisherId: args.publisherId
                    })
                }
            },
            //Delete a book
            deleteBook: {
                type: BookType,
                args: {
                    id: { type: GraphQLNonNull(GraphQLID) },
                },
                async resolve(parent, args){
                    const book = new Book();
                    return await PostgresBookRepository.delete(args.id)
                }
            },
        }
    }
};
