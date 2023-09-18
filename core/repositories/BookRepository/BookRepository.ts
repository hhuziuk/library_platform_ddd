import {Book} from "../../domain/Book";
import {BookDto} from "./dto/BookDto";
import {WishListBook} from "../../domain/WishListBook";
import {Publisher} from "../../domain/Publisher";
import {Type} from "../../domain/Type";


export interface BookRepository {
    createBook(
        name: string,
        author: string,
        description: string,
        file: string,
        ISBN: string,
        type: Type,
        publisher: Publisher,
        wishlistBooks: WishListBook[]
    ): Promise<BookDto>;
    getAllBooks(): Promise<Book[]>;
    getBookById(id: number): Promise<Book | null>;
    deleteBook(id: number): Promise<void>;

}