import {Response, Request, NextFunction} from "express";
import TypeInfrastructureService from "../services/TypeInfrastructureService";

class TypeController{
    /**
     * @swagger
     * tags:
     *   name: Types
     *   description: Operations related to types
     */

    /**
     * @swagger
     * /api/types:
     *   post:
     *     summary: Create a new type
     *     tags: [Types]
     *     parameters:
     *       - in: body
     *         name: name
     *         type: string
     *         required: true
     *         description: The name of the type
     *     responses:
     *       201:
     *         description: Type created successfully
     *       400:
     *         description: Bad request
     */
    async create(req: Request, res: Response, next: NextFunction){
        try{
            const {name} = req.body
            const type = await TypeInfrastructureService.create(name)
            return res.json(type)
        } catch(e){
            next(e);
        }
    }
    /**
     * @swagger
     * /api/types:
     *   get:
     *     summary: Get all types
     *     tags: [Types]
     *     responses:
     *       200:
     *         description: List of all types
     *       500:
     *         description: Internal server error
     */
    async getAll(req: Request, res: Response, next: NextFunction){
        try{
            const types = await TypeInfrastructureService.getAll();
            return res.json(types);
        } catch(e) {
            next(e);
        }
    }
    /**
     * @swagger
     * /api/types/{id}:
     *   get:
     *     summary: Get a type by ID
     *     tags: [Types]
     *     parameters:
     *       - in: path
     *         name: id
     *         type: integer
     *         required: true
     *         description: The ID of the type to retrieve
     *     responses:
     *       200:
     *         description: Type retrieved successfully
     *       404:
     *         description: Type not found
     *       500:
     *         description: Internal server error
     */

    async getOne(req: Request, res: Response, next: NextFunction){
        try{
            const {id} = req.params
            const type = await TypeInfrastructureService.getOne(parseInt(id, 10))
            return res.json(type)
        } catch(e){
            next(e);
        }
    }

    /**
     * @swagger
     * /api/types:
     *   delete:
     *     summary: Delete a type by ID
     *     tags: [Types]
     *     parameters:
     *       - in: body
     *         name: id
     *         type: integer
     *         required: true
     *         description: The ID of the type to delete
     *     responses:
     *       200:
     *         description: Type deleted successfully
     *       404:
     *         description: Type not found
     *       500:
     *         description: Internal server error
     */

    async delete(req: Request, res: Response, next: NextFunction){
        try{
            const {id} = req.body;
            const type = await TypeInfrastructureService.delete(id)
            return res.json(type)
        } catch(e){
            next(e);
        }
    }
}
export default new TypeController()