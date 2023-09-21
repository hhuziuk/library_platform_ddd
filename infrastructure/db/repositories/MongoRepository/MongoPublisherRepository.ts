
import Publisher from "../../entities/MongoSchemas/PublisherSchema";

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
        return Publisher.findById(id);
    }

    async delete(id) {
        return Publisher.findByIdAndDelete(id);
    }
}

export default new MongoPublisherRepository()