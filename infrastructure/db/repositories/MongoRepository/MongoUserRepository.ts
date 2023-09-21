import UserSchema from "../../entities/MongoSchemas/UserSchema";
import User from "../../entities/MongoSchemas/UserSchema";
class MongoUserRepository {
    async findOne(data) {
        return User.findOne(data);
    }
    async create(data: object){
        return User.create(data)
    }

    async save(data: any){
        return;
    }

    async find(){
        return User.find()
    }
}

export default new MongoUserRepository()

