import {Response, Request, NextFunction} from "express";
import UserService from "../services/UserService";
import logger from "../../tools/logger";
import {parseJsonSafe} from "@mikro-orm/core";

class UserController{
    constructor(readonly userService: any = UserService) {}
    async registration(req: Request, res: Response, next: NextFunction){
        try{
            const {email, username, password, role} = req.body
            const userData = await UserService.registration(email, username, password, role)
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            req.session.user = {...userData};
            return res.json(userData)
        } catch(e){
            next(e);
            logger.error(e)
        }
    }
    async login(req: Request, res: Response, next: NextFunction){
        try{
            const {email, password} = req.body
            const userData = await UserService.login(email, password)
            req.session.user = {...userData};
            logger.info(parseJsonSafe(req.session.user))
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData)
        } catch(e){
            next(e);
        }
    }


    //// !!!!!!!!!!!!!!! email -> id
    async logout(req: Request, res: Response, next: NextFunction){
        try{
            const {email} = req.body;
            const userData = UserService.logout(email)
            await req.session.destroy((err) => {
                if (err) {
                    res.clearCookie('sessioncookie')
                    logger.error(err);
                }
            });
            res.clearCookie('userData')
            return res.json(userData)
        } catch(e){
            next(e)
        }
    }
    async activate(req: Request, res: Response, next: NextFunction){
        try{
            const activationLink = req.params.link;
            await UserService.activate(activationLink);
            return res.redirect(process.env.CLIENT_URL || '')
        } catch(e){
            next(e);
        }
    }
    async refresh(req: Request, res: Response, next: NextFunction){
        try{
            const {refreshToken} = req.cookies
            const userData = await UserService.refresh(refreshToken)
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData)
        } catch(e){
            next(e);
        }
    }
    async getUsers(req: Request, res: Response, next: NextFunction){
        try{
            const users = await UserService.getUsers();
            //if(user){
                return res.json(users);
            //}
        } catch(e){
            next(e);
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const {id} = req.body;
            const userData = await UserService.delete(id)
            await req.session.destroy((err) => {
                logger.error(err);
                res.clearCookie('userData');
            });
            return res.json(userData)
        } catch(e){
            next(e);
        }
    }
}

export default new UserController()