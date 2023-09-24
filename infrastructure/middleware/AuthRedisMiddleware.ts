import ApiError from "../exceptions/Api-Error";
import {NextFunction, Request, Response} from "express";
import session, {Session} from 'express-session';

export default async function authRedisMiddleware(req: Request & { session: Session }, res: Response, next: NextFunction) {
    try {
        if (req.session.user === null) {
            return next(ApiError.UnauthorizedError());
        }
        next();

    } catch (e) {
        next(e);
    }
}