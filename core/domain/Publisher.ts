import {Book} from "./Book";
import {Type} from "./Type";

export class Publisher {
    constructor(
        readonly id: any,
        readonly name: string,
        readonly books: Book[],
        readonly types: Type[]
    ) {}
}
