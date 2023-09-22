import {Response, Request, NextFunction} from "express";
import UserInfrastructureService from "../services/UserInfrastructureService";
import logger from "../../tools/logger";
class UserController{
    constructor(readonly userService: any = UserInfrastructureService) {}
    async registration(req: Request, res: Response, next: NextFunction){
        try{
            const {email, username, password, role} = req.body
            const userData = await UserInfrastructureService.registration(email, username, password, role)
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData)
        } catch(e){
            next(e);
            logger.error(e)
        }
    }
    async login(req: Request, res: Response, next: NextFunction){
        try{
            const {email, username, password} = req.body
            const userData = await UserInfrastructureService.login(email, password)
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData)
        } catch(e){
            next(e);
        }
    }
    async logout(req: Request, res: Response, next: NextFunction){
        try{
            const {refreshToken} = req.cookies;
            const userData = UserInfrastructureService.logout(refreshToken)
            res.clearCookie('userData')
            return res.json(userData)
        } catch(e){
            next(e)
        }
    }
    async activate(req: Request, res: Response, next: NextFunction){
        try{
            const activationLink = req.params.link;
            await UserInfrastructureService.activate(activationLink);
            return res.redirect(process.env.CLIENT_URL || '')
        } catch(e){
            next(e);
        }
    }
    async refresh(req: Request, res: Response, next: NextFunction){
        try{
            const {refreshToken} = req.cookies
            const userData = await UserInfrastructureService.refresh(refreshToken)
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData)
        } catch(e){
            next(e);
        }
    }
    async getUsers(req: Request, res: Response, next: NextFunction){
        try{
            const users = await UserInfrastructureService.getUsers();
            return res.json(users);
        } catch(e){
            next(e);
        }
    }

    async delete(req: Request, res: Response, next: NextFunction){
        try{
            const {id} = req.body;
            const user = await UserInfrastructureService.delete(id)
            return res.json(user)
        } catch(e){
            next(e);
        }
    }
}

export default new UserController()