import {UserDomainService} from "../../core/services/UserDomainService";
import RedisClient from "../../tools/RedisConnect";
import {UserDto} from "../../core/repositories/UserRepository/dto/UserDto";
import logger from "../../tools/logger";
import tokenInfrastructureService from "./TokenInfrastructureService";
import {NextFunction, Request, Response} from "express";
import ApiError from "../exceptions/Api-Error";

class RedisService {
    async registration(user: any) {
        const userDto = new UserDto(user) // id, email, role, isActivated
        return {
            user: userDto,
        }
    }
    async login(user: any) {
        const userDto = new UserDto(user) // id, email, role, isActivated
        return {
            user: userDto,
        }
    }

    async logout(argument: any) {
        return null;
    }

    async refresh(refreshToken: any) {
        return null;
    }

}

export default new RedisService();