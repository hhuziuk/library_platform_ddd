export class Book {
    constructor(
        readonly id: any,
        readonly name: string,
        readonly author: string,
        readonly description: string,
        readonly file: string,
        readonly ISBN: string,
        readonly typeId: any,
        readonly publisherId: any
    ) {}
}