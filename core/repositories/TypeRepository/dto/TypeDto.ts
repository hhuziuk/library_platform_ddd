import {Type} from "../../../domain/Type";
export class TypeDto {
    readonly id: string | number;
    readonly name: string;

    constructor(type: Type) {
        this.id = type.id;
        this.name = type.name;
    }
}