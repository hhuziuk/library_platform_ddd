import {PostgresDataSource} from "../../tools/PGconnect";
import {Publisher} from "../db/entities/PublisherModel";
import ApiError from "../exceptions/Api-Error";

const publisherRepository = PostgresDataSource.getRepository(Publisher);

class PublisherService{
    async create (name: string){
        const userPublisher = await publisherRepository.findOne({where: {name}})
        if(userPublisher){
            throw ApiError.BadRequest(`The same type already exists`)
        }
        const publisher = await publisherRepository.create({name})
        await publisherRepository.save(publisher)
        return publisher;
    }
    async getAll (){
        const publishers = await publisherRepository.find()
        return {publishers};
    }
    async getOne (id: number){
        if(!id){
            throw ApiError.BadRequest(`No id was provided`)
        }
        const publisher = publisherRepository.findOneBy({id})
        return publisher
    }

    async delete (id: number){
        if(!id){
            throw ApiError.BadRequest(`No id was provided`)
        }
        const publisher = publisherRepository.delete({id})
        return {publisher}
    }

}

export default new PublisherService();