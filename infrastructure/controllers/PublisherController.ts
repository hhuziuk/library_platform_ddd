import {Response, Request, NextFunction} from "express";
import {plainToClass} from "class-transformer";
import {Publisher} from "../db/PGentities/PublisherModel";
import {validate} from "class-validator";
import ApiError from "../exceptions/Api-Error";
import PublisherInfrastructureService from "../services/PublisherInfrastructureService";

class PublisherController{
    //constructor(readonly publisherService: PublisherDomainService){}
    async create(req: Request, res: Response, next: NextFunction){
        try{
            const {name} = req.body
            const userPublisher = plainToClass(Publisher, { name })
            const errors : any = await validate(userPublisher)
            if (errors.length > 0) {
                return next(ApiError.BadRequest('validation error', errors))
            }
            //const publisher = await this.publisherService.createPublisher(name)
            const publisher = await PublisherInfrastructureService.create(name)
            return res.json(publisher)
        } catch(e){
            next(e);
        }
    }
    async getAll(req: Request, res: Response, next: NextFunction){
        try{
            //const publishers = await this.publisherService.getAllPublishers();
            const publishers = await PublisherInfrastructureService.getAll();
            return res.json(publishers);
        } catch(e) {
            next(e);
        }
    }

    async getOne(req: Request, res: Response, next: NextFunction){
        try{
            const {id} = req.params
            //const publisher = await this.publisherService.getPublisherById(parseInt(id, 10))
            const publisher = await PublisherInfrastructureService.getOne(parseInt(id, 10))
            return res.json(publisher)
        } catch(e){
            next(e);
        }
    }

    async delete(req: Request, res: Response, next: NextFunction){
        try{
            const {id} = req.body;
            //const publisher = await this.publisherService.deletePublisher(id)
            const publisher = await PublisherInfrastructureService.delete(id)
            return res.json(publisher)
        } catch(e){
            next(e);
        }
    }
}
export default new PublisherController()