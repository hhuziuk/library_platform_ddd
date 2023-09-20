import {PublisherDto} from "./dto/PublisherDto";
import {Publisher} from "../../domain/Publisher";


export interface PublisherRepostiory {
    create(name: string): Promise<PublisherDto>;
    getAll(): Promise<Publisher[]>;
    getById(id: number): Promise<Publisher | null>;
    delete(id: number): Promise<void>;
}