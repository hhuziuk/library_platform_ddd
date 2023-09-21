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
        typeId: any,
        publisherId: any
    ) {
        const createdBook = await this.bookRepository.createBook(name, author, description, file, ISBN, typeId, publisherId);
        return createdBook;
    }

    async getAll() {
        return this.bookRepository.getAll();
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

    async getById(id: any) {
        return this.bookRepository.getById(id);
    }

    async delete(id: any) {
        return this.bookRepository.delete(id);
    }
}

