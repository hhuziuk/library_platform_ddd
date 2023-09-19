import {Response, Request, NextFunction} from "express";
import UserInfrastructureService from "../services/UserInfrastructureService";
import {User} from "../db/PostgresEntities/UserModel";
import { validate } from 'class-validator';
import ApiError from "../exceptions/Api-Error";
import {plainToClass} from "class-transformer";
import logger from "../../tools/logger";
class UserController{
    constructor(readonly bookService: any = UserInfrastructureService) {}
    async registration(req: Request, res: Response, next: NextFunction){
        try{
            const {email, username, password, role} = req.body
            const user: any = plainToClass(User, { email, username, password, role})
            const errors: any = await validate(user)
            if (errors.length > 0) {
                return next(ApiError.BadRequest('validation error', errors))
            }
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
            const user: any = plainToClass(User, { email, username, password });
            const errors: any = await validate(user)
            if (errors.length > 0) {
                return next(ApiError.BadRequest('validation error', errors))
            }
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
}

export default new UserController()