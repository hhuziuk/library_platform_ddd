import {Response, Request, NextFunction} from "express";
import TypeInfrastructureService from "../services/TypeInfrastructureService";

class TypeController{
    async create(req: Request, res: Response, next: NextFunction){
        try{
            const {name} = req.body
            const type = await TypeInfrastructureService.create(name)
            return res.json(type)
        } catch(e){
            next(e);
        }
    }
    async getAll(req: Request, res: Response, next: NextFunction){
        try{
            const types = await TypeInfrastructureService.getAll();
            return res.json(types);
        } catch(e) {
            next(e);
        }
    }

    async getOne(req: Request, res: Response, next: NextFunction){
        try{
            const {id} = req.params
            const type = await TypeInfrastructureService.getOne(parseInt(id, 10))
            return res.json(type)
        } catch(e){
            next(e);
        }
    }

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