import {Response, Request, NextFunction} from "express";
import PublisherInfrastructureService from "../services/PublisherInfrastructureService";

class PublisherController{
    /**
     * @swagger
     * tags:
     *   name: Publishers
     *   description: Operations related to publishers
     */

    /**
     * @swagger
     * /api/publishers:
     *   post:
     *     summary: Create a new publisher
     *     tags: [Publishers]
     *     parameters:
     *       - in: body
     *         name: name
     *         type: string
     *         required: true
     *         description: The name of the publisher
     *     responses:
     *       201:
     *         description: Publisher created successfully
     *       400:
     *         description: Bad request
     */
    async create(req: Request, res: Response, next: NextFunction){
        try{
            const {name} = req.body
            const publisher = await PublisherInfrastructureService.create(name)
            return res.json(publisher)
        } catch(e){
            next(e);
        }
    }
    /**
     * @swagger
     * /api/publishers:
     *   get:
     *     summary: Get all publishers
     *     tags: [Publishers]
     *     responses:
     *       200:
     *         description: List of all publishers
     *       500:
     *         description: Internal server error
     */
    async getAll(req: Request, res: Response, next: NextFunction){
        try{
            const publishers = await PublisherInfrastructureService.getAll();
            return res.json(publishers);
        } catch(e) {
            next(e);
        }
    }
    /**
     * @swagger
     * /api/publishers/{id}:
     *   get:
     *     summary: Get a publisher by ID
     *     tags: [Publishers]
     *     parameters:
     *       - in: path
     *         name: id
     *         type: integer
     *         required: true
     *         description: The ID of the publisher to retrieve
     *     responses:
     *       200:
     *         description: Publisher retrieved successfully
     *       404:
     *         description: Publisher not found
     *       500:
     *         description: Internal server error
     */

    async getOne(req: Request, res: Response, next: NextFunction){
        try{
            const {id} = req.params
            const publisher = await PublisherInfrastructureService.getOne(parseInt(id, 10))
            return res.json(publisher)
        } catch(e){
            next(e);
        }
    }

    /**
     * @swagger
     * /api/publishers:
     *   delete:
     *     summary: Delete a publisher by ID
     *     tags: [Publishers]
     *     parameters:
     *       - in: body
     *         name: id
     *         type: integer
     *         required: true
     *         description: The ID of the publisher to delete
     *     responses:
     *       200:
     *         description: Publisher deleted successfully
     *       404:
     *         description: Publisher not found
     *       500:
     *         description: Internal server error
     */

    async delete(req: Request, res: Response, next: NextFunction){
        try{
            const {id} = req.body;
            const publisher = await PublisherInfrastructureService.delete(id)
            return res.json(publisher)
        } catch(e){
            next(e);
        }
    }
}
export default new PublisherController()