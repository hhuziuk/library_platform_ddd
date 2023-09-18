import {User} from "./User";

export class Token {
    constructor(
        readonly id: number,
        readonly user: User,
        readonly refreshToken: string
    ) {}
}
