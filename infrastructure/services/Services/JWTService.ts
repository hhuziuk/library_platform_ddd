import {UserDto} from "../../../core/repositories/UserRepository/dto/UserDto";
import tokenInfrastructureService from "../RestInfrastructureServices/TokenInfrastructureService";
import ApiError from "../../exceptions/Api-Error";
import {UserDomainService} from "../../../core/services/UserDomainService";
import PostgresUserRepository from "../../db/repositories/PostgresRepository/PostgresUserRepository";
import MongoUserRepository from "../../db/repositories/MongoRepository/MongoUserRepository";


class JWTService {
    constructor(readonly userRepository: any = new UserDomainService(userRepository)) {}
    async registration(user: any) {
        const userDto = new UserDto(user) // id, email, role, isActivated
        const tokens = tokenInfrastructureService.generateTokens({...userDto})
        await tokenInfrastructureService.saveToken(userDto.id, tokens.refreshToken)
        return {
            ...tokens,
            user: userDto,
        }
    }

    async login(user: any) {
        const userDto = new UserDto(user) // id, email, role, isActivated
        const tokens = tokenInfrastructureService.generateTokens({...userDto})
        await tokenInfrastructureService.saveToken(userDto.id, tokens.refreshToken)
        return {
            ...tokens,
            user: userDto,
        }
    }

    async logout(refreshToken: any) {
        const token = await tokenInfrastructureService.removeToken(refreshToken)
        return token;
    }

    async refresh(refreshToken: any) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError()
        }
        const userData = tokenInfrastructureService.validateRefreshToken(refreshToken)
        const tokenFromDatabase = await tokenInfrastructureService.findToken(refreshToken);
        if(!userData || !tokenFromDatabase){
            throw ApiError.UnauthorizedError()
        }
        const user = await this.userRepository.findOne({id: userData.id})
        const userDto = new UserDto(user)
        const tokens = tokenInfrastructureService.generateTokens({...userDto})
        await tokenInfrastructureService.saveToken(userDto.id, tokens.refreshToken)
        return {
            ...tokens,
            user: userDto,
        }
    }
}
//export default new UserInfrastructureService(MongoUserRepository);
export default new JWTService(PostgresUserRepository);