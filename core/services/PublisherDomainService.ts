import {PublisherRepostiory} from "../repositories/PublisherRepository/PublisherRepostiory";

export class PublisherDomainService implements PublisherRepostiory {
    constructor(private publisherRepository: PublisherRepostiory) {}

    async create(name: string){
        const createdPublisher = await this.publisherRepository.create(name);
        return createdPublisher;
    }
    async getAll(){
        return this.publisherRepository.getAll();
    }
    async getById(id: number){
        return this.publisherRepository.getById(id);
    }
    async delete(id: number){
        return this.publisherRepository.delete(id);
    }

}