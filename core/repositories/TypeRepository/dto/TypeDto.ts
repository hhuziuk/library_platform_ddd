import {Type} from "../../../domain/Type";
export class TypeDto {
    readonly id: any;
    readonly name: string;

    constructor(type: Type) {
        this.id = type.id;
        this.name = type.name;
    }
}