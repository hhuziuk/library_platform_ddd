import {WishListBook} from "./WishListBook";
import {User} from "./User";

export class WishList {
    constructor(
        readonly id: any,
        readonly wishlistBooks: WishListBook[],
        readonly user: User
    ) {}
}
