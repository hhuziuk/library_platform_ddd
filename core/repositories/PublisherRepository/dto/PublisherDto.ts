import {Publisher} from "../../../domain/Publisher";

export class PublisherDto {
    readonly id: string | number;
    readonly name: string;
    constructor(publisher: Publisher) {
        this.id = publisher.id;
        this.name = publisher.name;

    }
}