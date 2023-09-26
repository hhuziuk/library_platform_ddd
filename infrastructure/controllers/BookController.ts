import {Response, Request, NextFunction} from "express";
import logger from "../../tools/logger";
import {UploadedFile} from "express-fileupload";
import BookInfrastructureService from "../services/BookInfrastructureService";
import FileService from "../services/FileService";
class BookController{
    constructor(readonly bookService: any = BookInfrastructureService) {}
    async create(req: Request, res: Response, next: NextFunction){
        try{
            const {name, author, description, ISBN, typeId, publisherId} = req.body
            const {file} = req.files as { file: UploadedFile };
            const fileName = await FileService.saveFile(file)
            const book = await BookInfrastructureService.create(name, author, description, fileName, ISBN, typeId, publisherId)
            return res.json(book)
        } catch(e){
            next(e);
            logger.error(e)
        }
    }
    async getAll(req: Request, res: Response, next: NextFunction){
        try{
            const books = await BookInfrastructureService.getAll();
            return res.json(books);
        } catch(e) {
            next(e);
        }
    }

    async getOne(req: Request, res: Response, next: NextFunction){
        try{
            const {id} = req.params
            const book = await BookInfrastructureService.getOne(parseInt(id, 10))
            return res.json(book)
        } catch(e){
            next(e);
        }
    }

    async delete(req: Request, res: Response, next: NextFunction){
        try{
            const {id} = req.body;
            const book = await BookInfrastructureService.delete(id)
            return res.json(book)
        } catch(e){
            next(e);
        }
    }
}
export default new BookController(BookInfrastructureService);