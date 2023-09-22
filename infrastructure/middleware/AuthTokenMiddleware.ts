import { Response, Request, NextFunction } from "express";
import ApiError from "../exceptions/Api-Error";
import tokenInfrastructureService from "../services/TokenInfrastructureService";

interface IDecode {
    id: string;
    username: string;
    email: string;
    isActivated: boolean;
    role: string;
}
interface RequestWithUser extends Request {
    user?: IDecode,
}

export default function authTokenMiddleware(req: RequestWithUser, res: Response, next: NextFunction) {
    try {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            return next(ApiError.UnauthorizedError());
        }
        const accessToken = authorizationHeader.split(' ')[1];
        if (!accessToken) {
            return next(ApiError.UnauthorizedError());
        }
        const userData = <IDecode>tokenInfrastructureService.validateAccessToken(accessToken);
        if (!userData) {
            return next(ApiError.UnauthorizedError());
        }
        req.user = userData;
        next();

    } catch (e) {
        next(e);
    }
}