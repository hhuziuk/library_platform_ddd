import {Book} from "../../domain/Book";
import {BookDto} from "./dto/BookDto";

export interface BookRepository {
    create(
        req: Request,
        name: string,
        author: string,
        description: string,
        file: string,
        ISBN: string,
        typeId: number,
        publisherId: number,
    ): Promise<BookDto>;
    getAll(req: Request): Promise<{ books: Book[] }>;
    getOne(req: Request, id: number): Promise<Book | null>;
    delete(req: Request, id: number): Promise<{ book: Book | null }>;
}