import {Response, Request, NextFunction} from "express";
import PublisherInfrastructureService from "../services/PublisherInfrastructureService";

class PublisherController{
    async create(req: Request, res: Response, next: NextFunction){
        try{
            const {name} = req.body
            const publisher = await PublisherInfrastructureService.create(name)
            return res.json(publisher)
        } catch(e){
            next(e);
        }
    }
    async getAll(req: Request, res: Response, next: NextFunction){
        try{
            const publishers = await PublisherInfrastructureService.getAll();
            return res.json(publishers);
        } catch(e) {
            next(e);
        }
    }

    async getOne(req: Request, res: Response, next: NextFunction){
        try{
            const {id} = req.params
            const publisher = await PublisherInfrastructureService.getOne(parseInt(id, 10))
            return res.json(publisher)
        } catch(e){
            next(e);
        }
    }

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