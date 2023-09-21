import Book from "../../entities/MongoSchemas/BookSchema";

class MongoBookRepository {
    async findOne(data) {
        return Book.findOne(data);
    }
    async create(data: object){
        return Book.create(data)
    }

    async save(data: any){
        return;
    }

    async find(){
        return Book.find()
    }

    async findOneBy(id) {
        return Book.findOne({ _id: id });
    }

    async delete(id) {
        return Book.deleteOne({ _id: id });
    }
}

export default new MongoBookRepository()

