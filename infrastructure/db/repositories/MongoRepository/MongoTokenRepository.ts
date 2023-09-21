import Token from "../../entities/MongoSchemas/TokenSchema";


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

    async findOneBy(id: number){
        return Token.findById(id)
    }

    async removeToken(refreshToken: object) {
        return Token.deleteOne(refreshToken);
    }
}

export default new MongoTokenRepository()