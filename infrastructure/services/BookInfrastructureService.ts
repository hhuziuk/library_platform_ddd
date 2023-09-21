import ApiError from "../exceptions/Api-Error";
import logger from "../../tools/logger";
import BookDto from "../../core/repositories/BookRepository/dto/BookDto";
import {BookDomainService} from "../../core/services/BookDomainService";
import MongoBookRepository from "../db/repositories/MongoRepository/MongoBookRepository";
import PostgresBookRepository from "../db/repositories/PostgresRepository/PostgresBookRepository";

class BookInfrastructureService{
    constructor(readonly bookRepository: any = new BookDomainService(bookRepository)) {}
    async create (name: string, author: string, description: string, file: string, ISBN: string,
                  typeId: any, publisherId: any) {
        const userBook = await this.bookRepository.findOne({ISBN})
        if(userBook){
            logger.info("yes")
            throw ApiError.BadRequest(`The same book already exists`)
        }
        const book  = await this.bookRepository.create({name, author, description, file, ISBN, typeId, publisherId})
        await this.bookRepository.save(book)

        const bookDto = new BookDto(book)
        return {
            BookDto: bookDto
        };
    }
    async getAll (){
        const books = await this.bookRepository.find()
        return {
            books
        };
    }
    async getOne (id: any){
        if(!id){
            throw ApiError.BadRequest(`No id was provided`)
        }
        const book = this.bookRepository.findOneBy({id})
        return book;
    }

    async delete (id: any){
        if(!id){
            throw ApiError.BadRequest(`No id was provided`)
        }
        const book = this.bookRepository.delete({id})
        return {book}
    }

}
//export default new BookInfrastructureService(MongoBookRepository);

export default new BookInfrastructureService(PostgresBookRepository);