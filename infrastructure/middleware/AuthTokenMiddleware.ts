import { Response, Request, NextFunction } from "express";
import ApiError from "../exceptions/Api-Error";
import jwt, { JwtPayload } from "jsonwebtoken";

interface IDecode {
    id: string;
    username: string;
    email: string;
    isActivated: boolean;
    role: string;
}
interface RequestWithUser extends Request {
    user?: IDecode;
}

export default async function authMiddleware(req: RequestWithUser, res: Response, next: NextFunction) {
    try {
        const authorizationHeader = req.headers.authorization;
        if (authorizationHeader) {
            const accessToken = authorizationHeader.split(' ')[1];
            if (accessToken) {
                const userData = <IDecode>jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET );

                if (userData) {
                    req.user = userData;
                    return next();
                }
            }
        }

        if (!req.session.user) {
            return next(ApiError.UnauthorizedError());
        }
        next();
    } catch (e) {
        next(e);
    }
}