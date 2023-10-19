import {WishListBook} from "./WishListBook";
import {User} from "./User";

export class WishList {
    constructor(
        readonly id: string | number,
        readonly wishlistBooks: WishListBook[],
        readonly user: User
    ) {}
}
