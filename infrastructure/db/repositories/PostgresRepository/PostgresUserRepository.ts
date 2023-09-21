import UserSchema from "../../entities/MongoSchemas/UserSchema";
import ApiError from "../../../exceptions/Api-Error";
import {PostgresDataSource} from "../../../../tools/PGconnect";
import {User} from "../../entities/PostgresEntities/UserModel";


class PostgresUserRepository {
    async findOne(data: object){
        return PostgresDataSource.getRepository(User).findOne({where: data})
    }
    async create(data: object){
        return PostgresDataSource.getRepository(User).create(data)
    }

    async save(data: any){
        return PostgresDataSource.getRepository(User).save(data)
    }

    async find(){
        return PostgresDataSource.getRepository(User).find()
    }
}

export default new PostgresUserRepository()

