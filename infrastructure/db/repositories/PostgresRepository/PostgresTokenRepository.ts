import {PostgresDataSource} from "../../../../tools/PGconnect";
import {Type} from "../../entities/PostgresEntities/TypeModel";
import {Token} from "../../entities/PostgresEntities/TokenModel";

class PostgresTokenRepository {
    async findOne(data: object){
        return PostgresDataSource.getRepository(Token).findOne({where: data})
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

    async removeToken(refreshToken: object) {
        return PostgresDataSource.getRepository(Type).delete(refreshToken);
    }
}

export default new PostgresTokenRepository()