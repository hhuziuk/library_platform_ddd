import {BookRepository} from "../repositories/BookRepository/BookRepository";
import {Book} from "../domain/Book";


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

    async findOne(object: object) {
        return this.bookRepository.findOne(object);
    }

    async save(book: Book){
        return this.bookRepository.save(book);
    }

    async create(object: object) {
        return this.bookRepository.create(object);
    }

    async getBookById(id: number) {
        return this.bookRepository.getBookById(id);
    }

    async deleteBook(id: number) {
        return this.bookRepository.deleteBook(id);
    }
}

