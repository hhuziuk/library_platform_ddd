export class User {
    readonly name: string;
    readonly author: string;
    readonly description: string;
    readonly file: string;
    readonly ISBN: string;
    readonly typeId: string | number;
    readonly publisherId: string | number;
    constructor(model: {name: string, author: string, description: string, file: string, ISBN: string,
        typeId: string | number, publisherId: string | number}){
        this.name = model.name;
        this.author = model.author;
        this.description = model.description;
        this.file = model.file;
        this.ISBN = model.ISBN;
        this.typeId = model.typeId;
        this.publisherId = model.publisherId;
    }
}
