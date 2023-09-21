import {User} from "./User";

export class Token {
    constructor(
        readonly id: any,
        readonly user: User,
        readonly refreshToken: string
    ) {}
}
