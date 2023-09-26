import {Response, Request, NextFunction} from "express";
import UserService from "../services/UserService";
import logger from "../../tools/logger";

class UserController{
    constructor(readonly userService: any = UserService) {}
    async registration(req: Request, res: Response, next: NextFunction){
        try{
            const {email, username, password, role} = req.body
            const userData = await UserService.registration(email, username, password, role)
            UserService.cookiesEnabled ? res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
                : req.session.user = {...userData};
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
            UserService.cookiesEnabled ? res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
                : req.session.user = {...userData};
            logger.info(UserService.cookiesEnabled)
            return res.json(userData)
        } catch(e){
            next(e);
        }
    }


    async logout(req: Request, res: Response, next: NextFunction){
        try{
            const {email} = req.body;
            const userData = UserService.logout(email)
            UserService.cookiesEnabled ? res.clearCookie('userData')
                : await req.session.destroy((err) => {
                if (err) {
                    res.clearCookie('sessioncookie')
                    logger.error(err);
                }
            })
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
            UserService.cookiesEnabled ? res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
                : null
            return res.json(userData)
        } catch(e){
            next(e);
        }
    }
    async getUsers(req: Request, res: Response, next: NextFunction){
        try{
            const users = await UserService.getUsers();
            return res.json(users);
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