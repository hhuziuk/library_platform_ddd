import {Response, Request, NextFunction} from "express";
import ApiError from "../exceptions/Api-Error";

export default function (error: Error, req: Request, res: Response, next: NextFunction)  {
    if (error instanceof ApiError) {
        return res.status(error.status).json({message: error.message, errors: error.errors})
    }
    return res.status(500).json({ message: 'unexpected error' });
}