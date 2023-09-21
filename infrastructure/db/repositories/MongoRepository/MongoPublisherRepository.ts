
import Publisher from "../../entities/MongoSchemas/PublisherSchema";
import Type from "../../entities/MongoSchemas/TypeSchema";

class MongoPublisherRepository {
    async findOne(data) {
        return Publisher.findOne(data);
    }
    async create(data: object){
        return Publisher.create(data)
    }

    async save(data: any){
        return;
    }

    async find(){
        return Publisher.find()
    }

    async findOneBy(id) {
        return Publisher.findOne({ _id: id });
    }

    async delete(id) {
        return Publisher.deleteOne({ _id: id });
    }
}

export default new MongoPublisherRepository()