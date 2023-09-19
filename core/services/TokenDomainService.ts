import jwt, {JwtPayload} from "jsonwebtoken";
import {TokenRepository} from "../repositories/TokenRepository/TokenRepository";


export class TokenDomainService implements TokenRepository {
    constructor(private tokenRepository: TokenRepository) {}

    generateTokens(payload: JwtPayload) {
        return this.tokenRepository.generateTokens(payload)
    }

    validateAccessToken(token: string) {
        return this.tokenRepository.validateAccessToken(token)
    }

    validateRefreshToken(token: string) {
        return this.tokenRepository.validateAccessToken(token)
    }
}