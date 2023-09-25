import { Response, Request, NextFunction } from "express";
import ApiError from "../exceptions/Api-Error";
import tokenInfrastructureService from "../services/TokenInfrastructureService";
import logger from "../../tools/logger";
import redisService from "../services/RedisService";

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

// export default function(role: any){
//     return function(req: RequestWithUser, res: Response, next: NextFunction) {
//         try {
//             if (!req.session.user) {
//                 return next(ApiError.UnauthorizedError());
//             }
//
//             next();
//         } catch (e) {
//             return ApiError.UnauthorizedError()
//         }
//     }
// }

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

            const {role} = req.session.user;
            if (role !== requiredRole) {
                return next(ApiError.AccessDenied());
            }

            next();
        } catch (e) {
            return next(ApiError.UnauthorizedError());
        }
    }
}