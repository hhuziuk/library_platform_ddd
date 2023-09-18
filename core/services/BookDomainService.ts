import {BookRepository} from "../repositories/BookRepository/BookRepository";
import {Type} from "../domain/Type";
import {Publisher} from "../domain/Publisher";
import {WishListBook} from "../domain/WishListBook";
import {UserDto} from "../repositories/UserRepository/dto/UserDto";


export class BookDomainService implements BookRepository{
    constructor(private bookRepository: BookRepository) {}

    async createBook(
        name: string,
        author: string,
        description: string,
        file: string,
        ISBN: string,
        typeId: number,
        publisherId: number) {
        const createdBook = await this.bookRepository.createBook(name, author, description, file, ISBN, typeId, publisherId);
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

