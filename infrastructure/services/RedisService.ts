import {UserDto} from "../../core/repositories/UserRepository/dto/UserDto";
import { EventEmitter } from 'events';

class RedisService {
    async registration(user: any) {
        const userDto = new UserDto(user)
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