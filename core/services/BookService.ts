import {BookRepository} from "../repositories/BookRepository/BookRepository";
import {Type} from "../domain/Type";
import {Publisher} from "../domain/Publisher";
import {WishListBook} from "../domain/WishListBook";


export class BookService implements BookRepository{
    constructor(private bookRepository: BookRepository) {}

    async createBook(
        name: string,
        author: string,
        description: string,
        file: string,
        ISBN: string,
        type: Type,
        publisher: Publisher,
        wishlistBooks: WishListBook[]
    ) {


        // const book = new Book(
        //     id, name, author, description, file, ISBN, type, publisher, wishlistBooks
        // );

        const createdBook = await this.bookRepository.createBook(name, author, description, file, ISBN, type, publisher, wishlistBooks);
        return createdBook;
    }

    async getAllBooks() {
        return this.bookRepository.getAllBooks();
    }

    async getBookById(id: number) {
        return this.bookRepository.getBookById(id);
    }

    async deleteBook(id: number) {
        return this.bookRepository.deleteBook(id);
    }
}

