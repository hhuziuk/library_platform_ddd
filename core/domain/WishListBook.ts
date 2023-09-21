import {Book} from "./Book";
import {WishList} from "./WishList";

export class WishListBook {
    constructor(
        readonly id: any,
        readonly wishlist: WishList,
        readonly book: Book
    ) {}
}
