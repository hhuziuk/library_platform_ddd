import {PostgresDataSource} from "../../tools/PGconnect";
import {Book} from "../db/PGentities/BookModel";
import ApiError from "../exceptions/Api-Error";
import logger from "../../tools/logger";
import BookDto from "../../core/repositories/BookRepository/dto/BookDto";
import {BookDomainService} from "../../core/services/BookDomainService";

class BookInfrastructureService{
    constructor(readonly bookRepository: any = new BookDomainService(bookRepository)) {}
    async create (name: string, author: string, description: string, file: string, ISBN: string,
                  typeId: number, publisherId: number) {
        const userBook = await this.bookRepository.findOne({where: {ISBN}})
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
    async getOne (id: number){
        if(!id){
            throw ApiError.BadRequest(`No id was provided`)
        }
        const book = this.bookRepository.findOneBy({id})
        return book;
    }

    async delete (id: number){
        if(!id){
            throw ApiError.BadRequest(`No id was provided`)
        }
        const book = this.bookRepository.delete({id})
        return {book}
    }

}

const bookService = new BookInfrastructureService(PostgresDataSource.getRepository(Book));
export default bookService;