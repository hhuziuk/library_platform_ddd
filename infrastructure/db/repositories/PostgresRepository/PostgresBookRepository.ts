import {User} from "../../entities/PostgresEntities/UserModel";
import {Book} from "../../entities/PostgresEntities/BookModel";
import {PostgresDataSource} from "../../../../tools/PGconnect";
import {Type} from "../../entities/PostgresEntities/TypeModel";

class PostgresBookRepository {
    async findOne(data: object){
        return PostgresDataSource.getRepository(Book).findOne({where: data})
    }
    async create(data: object){
        return PostgresDataSource.getRepository(Book).create(data)
    }

    async save(data: any){
        return PostgresDataSource.getRepository(Book).save(data)
    }

    async find(){
        return PostgresDataSource.getRepository(Book).find()
    }

    async delete(id: number){
        return PostgresDataSource.getRepository(Book).delete({id});
    }
}

export default new PostgresBookRepository()