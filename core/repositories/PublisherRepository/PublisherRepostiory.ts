import {PublisherDto} from "./dto/PublisherDto";
import {Publisher} from "../../domain/Publisher";

export interface PublisherRepostiory {
    create(name: string): Promise<PublisherDto>;
    getAll(): Promise<Publisher[]>;
    getById(id: any): Promise<Publisher | null>;
    delete(id: any): Promise<void>;
}