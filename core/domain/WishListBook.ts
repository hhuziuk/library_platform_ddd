import {Book} from "./Book";
import {WishList} from "./WishList";

export class WishListBook {
    constructor(
        readonly id: number,
        readonly wishlist: WishList,
        readonly book: Book
    ) {}
}
