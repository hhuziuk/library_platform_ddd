import ApiError from "../exceptions/Api-Error";
import {NextFunction, Request, Response} from "express";
import tokenInfrastructureService from "../services/TokenInfrastructureService";

export default async function authRedisMiddleware(req: Request, res: Response, next: NextFunction) {
    try {

        next();

    } catch (e) {
        next(e);
    }
}