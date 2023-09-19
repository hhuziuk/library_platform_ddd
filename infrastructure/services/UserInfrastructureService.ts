import {UserDto} from "../../core/repositories/UserRepository/dto/UserDto";
import {User} from "../db/PGentities/UserModel";
import {PostgresDataSource} from "../../tools/PGconnect";
import bcrypt from "bcrypt";
import {v4} from 'uuid'
import mailService from "./MailService";
import tokenInfrastructureService from "./TokenInfrastructureService";
import ApiError from "../exceptions/Api-Error";
import {UserDomainService} from "../../core/services/UserDomainService";
import {Book} from "../db/PGentities/BookModel";


class UserInfrastructureService {
    constructor(readonly userRepository: any = new UserDomainService(userRepository)) {}
    async registration(email: string, username: string, password: string, role: string) {
        const candidate = await this.userRepository.findOne({where: {email}})
        if (candidate) {
            throw ApiError.BadRequest(`User with the same ${email} already exists`)
        }
        const hashPassword = await bcrypt.hash(password, 8)
        const activationLink = v4()

        const user = await this.userRepository.create({email, username, password: hashPassword, activationLink, role})
        await this.userRepository.save(user)
        await mailService.sendActivationMail(email, `${process.env.API_URL}api/user/activate/${activationLink}`)

        const userDto = new UserDto(user) // id, email, role, isActivated
        const tokens = tokenInfrastructureService.generateTokens({...userDto})
        await tokenInfrastructureService.saveToken(userDto.id, tokens.refreshToken)

        return {
            ...tokens,
            user: userDto,
        }
    }

    async activate(activationLink: any) {
        const user = await this.userRepository.findOne({where: {activationLink}})
        if (!user) {
            throw ApiError.BadRequest("activation link is not correct")
        }
        user.isActivated = true;
        await this.userRepository.save(user);
    }

    async login(email: string, password: string) {
        //const user = await userRepository.findOne({where: {email}})
        const user = await this.userRepository.findOne({
            where: {email}
        })
        if (!user) {
            throw ApiError.BadRequest("User with this email does not exist")
        }
        const comparePassword = await bcrypt.compare(password, user.password)
        if (!comparePassword) {
            throw ApiError.BadRequest("Wrong password")
        }
        const userDto = new UserDto(user) // id, email, isActivated
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
        const user = await this.userRepository.findOneOrFail({
            where: {id: userData.id},
            select: {
                id: true,
                email: true,
                username: true,
                isActivated: true
            }
        })
        const userDto = new UserDto(user)
        const tokens = tokenInfrastructureService.generateTokens({...userDto})

        await tokenInfrastructureService.saveToken(userDto.id, tokens.refreshToken)

        return {
            ...tokens,
            user: userDto,
        }
    }

    async getUsers(){
        const users = await this.userRepository.find();
        return users;
    }
}

const userService = new UserInfrastructureService(PostgresDataSource.getRepository(User));
export default userService;