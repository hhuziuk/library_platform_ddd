import {Publisher} from "./Publisher";
import {Type} from "./Type";
import {WishListBook} from "./WishListBook";

export class Book {
    constructor(
        readonly id: number,
        readonly name: string,
        readonly author: string,
        readonly description: string,
        readonly file: string,
        readonly ISBN: string,
        readonly typeId: number,
        readonly publisherId: number
    ) {}
}