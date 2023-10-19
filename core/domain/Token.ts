import {User} from "./User";

export class Token {
    constructor(
        readonly id: string | number,
        readonly user: User,
        readonly refreshToken: string
    ) {}
}
