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

    async delete(id) {
        return Book.findByIdAndDelete(id);
    }
}

export default new MongoBookRepository()

