import {Publisher} from "./Publisher";
import {Book} from "./Book";

export class Type {
    constructor(
        readonly id: any,
        readonly name: string,
        readonly books: Book[],
        readonly publishers: Publisher[]
    ) {}
}
