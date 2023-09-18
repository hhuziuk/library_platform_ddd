import {PublisherRepostiory} from "../repositories/PublisherRepository/PublisherRepostiory";

export class PublisherDomainService implements PublisherRepostiory {
    constructor(private publisherRepository: PublisherRepostiory) {}

    async createPublisher(name: string){
        const createdPublisher = await this.publisherRepository.createPublisher(name);
        return createdPublisher;
    }
    async getAllPublishers(){
        return this.publisherRepository.getAllPublishers();
    }
    async getPublisherById(id: number){
        return this.publisherRepository.getPublisherById(id);
    }
    async deletePublisher(id: number){
        return this.publisherRepository.deletePublisher(id);
    }

}