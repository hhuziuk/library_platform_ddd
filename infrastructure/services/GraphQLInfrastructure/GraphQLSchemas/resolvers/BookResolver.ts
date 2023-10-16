import PostgresBookRepository from '../../../../db/repositories/PostgresRepository/PostgresBookRepository';
import { BookType } from '../TypeDefs/BookTypeDef';
import { GraphQLString, GraphQLID, GraphQLList, GraphQLNonNull } from 'graphql';
import { User } from '../../../../db/entities/PostgresEntities/UserModel';
import { Book } from '../../../../db/entities/PostgresEntities/BookModel';

const getAllBooks = async (parent, args) => {
    const postgresBooks = await PostgresBookRepository.find();
    return [...postgresBooks];
};

const getOneBook = async (parent, args) => {
    return await PostgresBookRepository.findOne({ id: args.id });
};

const addBook = async (parent, args) => {
    const user = new User();
    return await PostgresBookRepository.save({
        name: args.name,
        author: args.author,
        description: args.description,
        file: args.file,
        ISBN: args.ISBN,
        typeId: args.typeId,
        publisherId: args.publisherId,
    });
};

const deleteBook = async (parent, args) => {
    const book = new Book();
    return await PostgresBookRepository.delete(args.id);
};

export const bookResolvers = {
    Query: {
        getAll: getAllBooks,
        getOne: getOneBook,
        books: {
            type: new GraphQLList(BookType),
            resolve: getAllBooks,
        },
        book: {
            type: BookType,
            args: { id: { type: GraphQLID } },
            resolve: getOneBook,
        },
    },
    Mutation: {
        name: 'BookMutation',
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
                resolve: addBook,
            },
            deleteBook: {
                type: BookType,
                args: {
                    id: { type: GraphQLNonNull(GraphQLID) },
                },
                resolve: deleteBook,
            },
        },
    },
};
