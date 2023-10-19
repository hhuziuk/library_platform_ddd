export class Book {
    constructor(
        readonly id: string | number,
        readonly name: string,
        readonly author: string,
        readonly description: string,
        readonly file: string,
        readonly ISBN: string,
        readonly typeId: string | number,
        readonly publisherId: string | number
    ) {}
}