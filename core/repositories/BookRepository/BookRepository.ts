import {Book} from "../../domain/Book";
import {User} from "../../domain/User";


export interface BookRepository {
    createBook(
        name: string,
        author: string,
        description: string,
        file: string,
        ISBN: string,
        typeId: any,
        publisherId: any

    ): Promise<User>;
    getAll(): Promise<Book[]>;
    create(object: object): Promise<Book>;
    save(book: Book): Promise<Book>;
    findOne(object: object): Promise<Book>;
    getById(id: any): Promise<Book | null>;
    delete(id: any): Promise<void>;

}