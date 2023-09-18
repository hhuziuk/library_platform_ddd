import {Response, Request, NextFunction} from "express";
import {validate} from "class-validator";
import ApiError from "../exceptions/Api-Error";
import {plainToClass} from "class-transformer";
import {BookEntity} from "../db/entities/BookModel";
import {v4} from "uuid";
import path from "path";
import logger from "../../tools/logger";
import {UploadedFile} from "express-fileupload";
import {BookDomainService} from "../../core/services/BookDomainService";

export class BookController{
    constructor(readonly bookService: BookDomainService){}
    async create(req: Request, res: Response, next: NextFunction){
        try{
            const {name, author, description, ISBN, typeId, publisherId} = req.body
            const {file} = req.files as { file: UploadedFile };
            const validationBook = plainToClass(BookEntity, {name, author, description, file, ISBN, typeId, publisherId});
            const errors : any = await validate(validationBook)
            if (errors.length > 0) {
                return next(ApiError.BadRequest('validation error', errors))
            }
            const fileName = v4() + '.pdf';
            logger.info(fileName)
            file.mv(path.resolve(__dirname, '..', 'static', fileName))

            const book = await this.bookService.createBook(name, author, description, fileName, ISBN, typeId, publisherId)
            return res.json(book)
        } catch(e){
            next(e);
            logger.error(e)
        }
    }
    async getAll(req: Request, res: Response, next: NextFunction){
        try{
            const books = await this.bookService.getAllBooks();
            return res.json(books);
        } catch(e) {
            next(e);
        }
    }

    async getOne(req: Request, res: Response, next: NextFunction){
        try{
            const {id} = req.params
            const book = await this.bookService.getBookById(parseInt(id, 10))
            return res.json(book)
        } catch(e){
            next(e);
        }
    }

    async delete(req: Request, res: Response, next: NextFunction){
        try{
            const {id} = req.body;
            const book = await this.bookService.deleteBook(id)
            return res.json(book)
        } catch(e){
            next(e);
        }
    }
}
export default new BookController()