import { Response, Request, NextFunction } from "express";
import ApiError from "../exceptions/Api-Error";
import tokenInfrastructureService from "../services/RestInfrastructureServices/TokenInfrastructureService";
import logger from "../../tools/logger";

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

export default function(role: any){
    return function(req: RequestWithUser, res: Response, next: NextFunction) {
        if (req.method === "OPTIONS") {
            next();
            logger.info('no')
        }
        try {
            const token = req.headers?.authorization?.split(' ')[1];
            if (!token) {
                return ApiError.UnauthorizedError()
            }
            const decoded = <IDecode> tokenInfrastructureService.validateAccessToken(token);
            if(decoded.role !== role){
                return ApiError.AccessDenied()
            }
            req.user = decoded;
            next();
        } catch (e) {
            return ApiError.UnauthorizedError()
        }
    }
}