import {PublisherDto} from "./dto/PublisherDto";
import {Publisher} from "../../domain/Publisher";


export interface PublisherRepostiory {
    createPublisher(name: string): Promise<PublisherDto>;
    getAllPublishers(): Promise<Publisher[]>;
    getPublisherById(id: number): Promise<Publisher | null>;
    deletePublisher(id: number): Promise<void>;
}