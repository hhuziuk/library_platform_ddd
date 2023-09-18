import {WishList} from "./WishList";

export class User {
    constructor(
        readonly id: number,
        readonly username: string,
        readonly password: string,
        readonly email: string,
        readonly isActivated: boolean,
        readonly activationLink: string,
        readonly role: string,
        readonly wishlist: WishList
    ) {}
}
