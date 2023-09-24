import ApiError from "../exceptions/Api-Error";
import {NextFunction, Request, Response} from "express";
import logger from "../../tools/logger";

export default async function authRedisMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        if (!req.session.user) {
            return next(ApiError.UnauthorizedError());
        }
        next();
    } catch (e) {
        next(e);
    }
}