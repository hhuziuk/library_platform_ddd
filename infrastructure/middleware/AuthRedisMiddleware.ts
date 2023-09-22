import ApiError from "../exceptions/Api-Error";
import {NextFunction, Request, Response} from "express";
import { Session } from "express-session";

import tokenInfrastructureService from "../services/TokenInfrastructureService";

export default async function authRedisMiddleware(req: Request & { session: Session }, res: Response, next: NextFunction) {
    try {
        const session = req.session;
        if (session.username && session.password) {
            return next(ApiError.UnauthorizedError());
        }
        next();

    } catch (e) {
        next(e);
    }
}