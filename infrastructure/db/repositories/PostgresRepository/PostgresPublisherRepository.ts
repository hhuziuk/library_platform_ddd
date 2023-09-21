import {PostgresDataSource} from "../../../../tools/PGconnect";
import {Publisher} from "../../entities/PostgresEntities/PublisherModel";

class PostgresPublisherRepository {
    async findOne(data: object){
        return PostgresDataSource.getRepository(Publisher).findOne({where: data})
    }
    async create(data: object){
        return PostgresDataSource.getRepository(Publisher).create(data)
    }

    async save(data: any){
        return PostgresDataSource.getRepository(Publisher).save(data)
    }

    async find(){
        return PostgresDataSource.getRepository(Publisher).find()
    }

    async delete(id: number){
        return PostgresDataSource.getRepository(Publisher).delete(id)
    }

}

export default new PostgresPublisherRepository()