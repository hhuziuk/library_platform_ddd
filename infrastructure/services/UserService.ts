import {UserDomainService} from "../../core/services/UserDomainService";
import ApiError from "../exceptions/Api-Error";
import bcrypt from "bcrypt";
import {v4} from "uuid";
import mailService from "./MailService";
import {UserDto} from "../../core/repositories/UserRepository/dto/UserDto";
import {AuthDomainService} from "../../core/services/AuthDomainService";
import PostgresUserRepository from "../db/repositories/PostgresRepository/PostgresUserRepository";
import JWTService from "./JWTService";
import RedisService from "./RedisService";

class UserService {
    constructor(readonly userRepository: any = new UserDomainService(userRepository),
                readonly authRepository: any = new AuthDomainService(authRepository)) {}
    async registration(email: string, username: string, password: string, role: string) {
        const candidate = await this.userRepository.findOne({ email });
        if (candidate) {
            throw ApiError.BadRequest(`User with the same ${email} already exists`)
        }
        const hashPassword = await bcrypt.hash(password, 8)
        const activationLink = v4()

        const user = await this.userRepository.create({email, username, password: hashPassword, activationLink, role})
        await this.userRepository.save(user)
        await mailService.sendActivationMail(email, `${process.env.API_URL}api/user/activate/${activationLink}`)

        const userDto = new UserDto(user)
        return await this.authRepository.registration(email, username, hashPassword, activationLink, role)
    }

    async activate(activationLink: any) {
        const user = await this.userRepository.findOne({activationLink})
        if (!user) {
            throw ApiError.BadRequest("activation link is not correct")
        }
        user.isActivated = true;
        await this.userRepository.save(user)
    }

    async login(email: string, password: string) {
        const user = await this.userRepository.findOne({ email });
        if (!user) {
            throw ApiError.BadRequest("User with this email does not exist")
        }

        const comparePassword = await bcrypt.compare(password, user.password)
        if (!comparePassword) {
            throw ApiError.BadRequest("Wrong password")
        }
        const userDto = new UserDto(user) // id, email, role, isActivated
        return await this.authRepository.login(email, password)
    }

    async logout(argument: any) {
        return await this.authRepository.logout(argument)
    }

    async refresh(refreshToken: any) {
        return await this.authRepository.refresh(refreshToken)
    }

    async getUsers(){
        const users = await this.userRepository.find();
        return users;
    }

    async delete (id: any){
        const user = this.userRepository.delete({id})
        return {user}
    }
}

export default new UserService(PostgresUserRepository, RedisService)