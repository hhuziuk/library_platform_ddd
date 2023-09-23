import PostgresUserRepository from "../db/repositories/PostgresRepository/PostgresUserRepository";
import {UserDomainService} from "../../core/services/UserDomainService";
import {createClient} from "redis";

class RedisService {
    constructor(readonly userRepository: any = new UserDomainService(userRepository)) {}
    async registration(user: any){
        await redisClient.set()
    }
    // async login(user: any){
    //     return this.authRepository.login(user);
    // }
    // async logout(argument: any){
    //     return this.authRepository.logout(argument);
    // }
    // async refresh(refreshToken: any){
    //     return this.authRepository.refresh(refreshToken);
    // }

}

export default new RedisService(PostgresUserRepository);