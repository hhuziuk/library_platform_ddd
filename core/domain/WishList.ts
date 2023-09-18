import {WishListBook} from "./WishListBook";
import {User} from "./User";

export class WishList {
    constructor(
        readonly id: number,
        readonly wishlistBooks: WishListBook[],
        readonly user: User
    ) {}
}
