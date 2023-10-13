import ApiError from "../../exceptions/Api-Error";
import {PublisherDomainService} from "../../../core/services/PublisherDomainService";
import PostgresPublisherRepository from "../../db/repositories/PostgresRepository/PostgresPublisherRepository";
import MongoPublisherRepository from "../../db/repositories/MongoRepository/MongoPublisherRepository";

class PublisherInfrastructureService{
    constructor(readonly publisherRepository: any = new PublisherDomainService(publisherRepository)) {}
    async create (name: string){
        const userPublisher = await this.publisherRepository.findOne({where: {name}})
        if(userPublisher){
            throw ApiError.BadRequest(`The same type already exists`)
        }
        const publisher = await this.publisherRepository.create({name})
        await this.publisherRepository.save(publisher)
        return publisher;
    }
    async getAll (){
        const publishers = await this.publisherRepository.find()
        return {publishers};
    }
    async getOne (id: any){
        if(!id){
            throw ApiError.BadRequest(`No id was provided`)
        }
        const publisher = this.publisherRepository.findOneBy({id})
        return publisher
    }

    async delete (id: any){
        if(!id){
            throw ApiError.BadRequest(`No id was provided`)
        }
        const publisher = this.publisherRepository.delete({id})
        return {publisher}
    }

}
//export default new PublisherInfrastructureService(MongoPublisherRepository);
export default new PublisherInfrastructureService(PostgresPublisherRepository);