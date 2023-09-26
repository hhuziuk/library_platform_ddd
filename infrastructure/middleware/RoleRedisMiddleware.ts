import { Response, Request, NextFunction } from "express";
import ApiError from "../exceptions/Api-Error";
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

export default function(requiredRole: string){
    return function(req: RequestWithUser, res: Response, next: NextFunction) {
        try {
            if (!req.session.user) {
                return next(ApiError.UnauthorizedError());
            }

            const {user} = req.session.user;
            if (user.role !== requiredRole) {
                return next(ApiError.AccessDenied());
            }

            next();
        } catch (e) {
            return next(ApiError.UnauthorizedError());
        }
    }
}