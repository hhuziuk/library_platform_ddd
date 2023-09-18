import {Book} from "../../domain/Book";
import {User} from "../../domain/User";


export interface BookRepository {
    createBook(
        name: string,
        author: string,
        description: string,
        file: string,
        ISBN: string,
        typeId: number,
        publisherId: number

    ): Promise<User>;
    getAllBooks(): Promise<Book[]>;
    getBookById(id: number): Promise<Book | null>;
    deleteBook(id: number): Promise<void>;

}