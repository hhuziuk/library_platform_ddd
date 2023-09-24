import ApiError from "../exceptions/Api-Error";
import {NextFunction, Request, Response} from "express";
import logger from "../../tools/logger";
import RedisClient from "../../tools/RedisConnect";

export default async function authRedisMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        if (!req.session || !req.session.user) {
            return next(ApiError.UnauthorizedError());
        }
        logger.info(req.sessionID)
        if (!req.sessionID) {
            return next(ApiError.UnauthorizedError());
        }

        next();
    } catch (e) {
        next(e);
    }
}