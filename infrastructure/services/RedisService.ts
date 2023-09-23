import PostgresUserRepository from "../db/repositories/PostgresRepository/PostgresUserRepository";
import {UserDomainService} from "../../core/services/UserDomainService";
import {createClient} from "redis";
import RedisClient from "../../tools/RedisConnect";
import ApiError from "../exceptions/Api-Error";
import {UserDto} from "../../core/repositories/UserRepository/dto/UserDto";

class RedisService {
    constructor(readonly userRepository: any = new UserDomainService(userRepository)) {}
    async registration(email: string, username: string, password: string, activationLink: string, role: string){
        try {
            const user = {email, username, password, activationLink, role };
            await RedisClient.set(email, JSON.stringify(user));
            return user;
        } catch (error) {
            throw error;
        }
    }
    async login(email: string, password: string){
        try {
            const userJson = await RedisClient.get(email);
            if (!userJson) {
                throw ApiError.BadRequest("User not found");
            }
            const user = JSON.parse(userJson);
            return {
                message: "Login successful",
                user: new UserDto(user),
            };
            return { message: "User registration successful" };
        } catch (error) {
            throw error;
        }
    }
    async logout(email: string){
        try {
            await RedisClient.del(email);

            return { message: "Logout successful" };
        } catch (error) {
            throw error;
        }
    }
    async refresh(refreshToken: any){
        return null
    }

}

export default new RedisService();