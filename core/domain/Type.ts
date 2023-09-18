import {Publisher} from "./Publisher";
import {Book} from "./Book";

export class Type {
    constructor(
        readonly id: number,
        readonly name: string,
        readonly books: Book[],
        readonly publishers: Publisher[]
    ) {}
}
