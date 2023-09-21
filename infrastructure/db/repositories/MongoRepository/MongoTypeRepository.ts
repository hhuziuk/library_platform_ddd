import Type from "../../entities/MongoSchemas/TypeSchema";

class MongoTypeRepository {
    async findOne(data) {
        return Type.findOne(data);
    }
    async create(data: object){
        return Type.create(data)
    }

    async save(data: any){
        return;
    }

    async find(){
        return Type.find()
    }

    async findOneBy(id) {
        return Type.findOne({ _id: id });
    }

    async delete(id) {
        return Type.deleteOne({ _id: id });
    }
}

export default new MongoTypeRepository()