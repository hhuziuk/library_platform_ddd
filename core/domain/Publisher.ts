import {Book} from "./Book";
import {Type} from "./Type";
export class Publisher {
    constructor(
        readonly id: string | number,
        readonly name: string,
        readonly books: Book[],
        readonly types: Type[]
    ) {}
}
