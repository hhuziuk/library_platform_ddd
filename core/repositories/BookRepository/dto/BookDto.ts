import {Book} from "../../../domain/Book";
import {WishListBook} from "../../../domain/WishListBook";
import {Publisher} from "../../../domain/Publisher";
import {Type} from "../../../domain/Type";

export class BookDto {
    readonly id: number;
    readonly name: string;
    readonly author: string;
    readonly description: string;
    readonly file: string;
    readonly ISBN: string;
    readonly type: Type;
    readonly publisher: Publisher;
    readonly wishlistBooks: WishListBook[];

    constructor(book: Book) {
        this.id = book.id;
        this.name = book.name;
        this.author = book.author;
        this.description = book.description;
        this.file = book.file;
        this.ISBN = book.ISBN;
        this.type = book.type;
        this.publisher = book.publisher;
        this.wishlistBooks = book.wishlistBooks;
    }
}



