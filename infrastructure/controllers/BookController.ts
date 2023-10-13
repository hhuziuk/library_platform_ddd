import {Response, Request, NextFunction} from "express";
import logger from "../../tools/logger";
import {UploadedFile} from "express-fileupload";
import BookInfrastructureService from "../services/RestInfrastructureServices/BookInfrastructureService";
import FileService from "../services/Services/FileService";

/**
 * @swagger
 * tags:
 *   name: Books
 *   description: Manage books
 */

/**
 * @swagger
 * /api/books:
 *   post:
 *     summary: Create a new book
 *     tags: [Books]
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: formData
 *         name: name
 *         type: string
 *         description: The name of the book
 *         required: true
 *       - in: formData
 *         name: author
 *         type: string
 *         description: The author of the book
 *         required: true
 *       - in: formData
 *         name: description
 *         type: string
 *         description: Description of the book
 *         required: true
 *       - in: formData
 *         name: ISBN
 *         type: string
 *         description: ISBN of the book
 *         required: true
 *       - in: formData
 *         name: typeId
 *         type: integer
 *         description: ID of the book type
 *         required: true
 *       - in: formData
 *         name: publisherId
 *         type: integer
 *         description: ID of the publisher
 *         required: true
 *       - in: formData
 *         name: file
 *         type: file
 *         description: Book cover file
 *         required: true
 *     responses:
 *       200:
 *         description: Book was created successfully
 */

/**
 * @swagger
 * /api/books:
 *   get:
 *     summary: Get a list of all books
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: List of books
 */

/**
 * @swagger
 * /api/books/{id}:
 *   get:
 *     summary: Get information about a book by its ID
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         type: integer
 *         description: ID of the book
 *         required: true
 *     responses:
 *       200:
 *         description: Information about the book
 *       404:
 *         description: Book with the specified ID was not found
 */

/**
 * @swagger
 * /api/books:
 *   delete:
 *     summary: Delete a book by its ID
 *     tags: [Books]
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: id
 *         type: integer
 *         description: ID of the book to delete
 *         required: true
 *     responses:
 *       200:
 *         description: Book was deleted successfully
 *       404:
 *         description: Book with the specified ID was not found
 */

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
            next(e)
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