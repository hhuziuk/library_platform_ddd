import {UserDomainService} from "../../core/services/UserDomainService";
import RedisClient from "../../tools/RedisConnect";
import {UserDto} from "../../core/repositories/UserRepository/dto/UserDto";

class RedisService {
    constructor(readonly userRepository: any = new UserDomainService(userRepository)) {
    }
    async registration(user: any){
        try {
            const userDto = new UserDto(user)
            await RedisClient.set(userDto.email, JSON.stringify(user));
            return {
                message: "Registration successful",
                user: userDto
            };
        } catch (error) {
            throw error;
        }
    }
    async login(user: any){
        try {
            const userDto = new UserDto(user)
            const userJson = await RedisClient.get(userDto.email);
            return {
                message: "Login successful",
                user: userDto
            };
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