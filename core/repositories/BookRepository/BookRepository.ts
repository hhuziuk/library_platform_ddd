import {Book} from "../../domain/Book";
import {User} from "../../domain/User";
export interface BookRepository {
    createBook(
        name: string,
        author: string,
        description: string,
        file: string,
        ISBN: string,
        typeId: string | number,
        publisherId: string | number

    ): Promise<User>;
    getAll(): Promise<Book[]>;
    create(object: object): Promise<Book>;
    save(book: Book): Promise<Book>;
    findOne(object: object): Promise<Book>;
    getById(id: string | number): Promise<Book | null>;
    delete(id: string | number): Promise<void>;

}