import {Book} from "./Book";
import {Type} from "./Type";

export class Publisher {
    constructor(
        readonly id: number,
        readonly name: string,
        readonly books: Book[],
        readonly types: Type[]
    ) {}
}
