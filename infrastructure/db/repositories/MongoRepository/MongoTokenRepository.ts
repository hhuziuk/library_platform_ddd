import Token from "../../entities/MongoSchemas/TokenSchema";
import Type from "../../entities/MongoSchemas/TypeSchema";

class MongoTokenRepository {
    async findOne(data: object){
        return Token.findOne(data)
    }
    async create(data: object){
        return Token.create(data)
    }

    async save(data: any){
        return;
    }

    async find(){
        return Token.find()
    }

    async findOneBy(id) {
        return Token.findOne({ _id: id });
    }

    async removeToken(refreshToken: object) {
        return Token.deleteOne(refreshToken);
    }
}

export default new MongoTokenRepository()