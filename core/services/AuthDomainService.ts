import {AuthRepository} from "../repositories/AuthRepository/AuthRepository";


export class AuthDomainService implements AuthRepository{
    constructor(private authRepository: AuthRepository) {}
    registration(user: any){
        return this.authRepository.registration(user);
    }
    login(user: any){
        return this.authRepository.login(user);
    }
    logout(argument: any){
        return this.authRepository.logout(argument);
    }
    refresh(refreshToken: any){
        return this.authRepository.refresh(refreshToken);
    }
}