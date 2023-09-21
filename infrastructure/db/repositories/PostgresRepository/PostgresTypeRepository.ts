import {PostgresDataSource} from "../../../../tools/PGconnect";
import {User} from "../../entities/PostgresEntities/UserModel";
import {Type} from "../../entities/PostgresEntities/TypeModel";

class PostgresTypeRepository {
    async findOne(data: object){
        return PostgresDataSource.getRepository(Type).findOne({where: data})
    }
    async create(data: object){
        return PostgresDataSource.getRepository(Type).create(data)
    }

    async save(data: any){
        return PostgresDataSource.getRepository(Type).save(data)
    }

    async find(){
        return PostgresDataSource.getRepository(Type).find()
    }

    async findOneBy(id: number){
        return PostgresDataSource.getRepository(Type).findOneBy({id})
    }

    async delete(id: number){
        return PostgresDataSource.getRepository(Type).findOneBy({id})
    }

}

export default new PostgresTypeRepository()