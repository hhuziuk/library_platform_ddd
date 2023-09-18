import jwt, {JwtPayload} from "jsonwebtoken";
import {TokenRepository} from "../repositories/TokenRepository/TokenRepository";
import {Token} from "../domain/Token";


export class TokenService implements TokenRepository {
    constructor(
        private readonly accessTokenSecret: string,
        private readonly refreshTokenSecret: string
    ) {}

    generateTokens(payload: JwtPayload) {
        const accessToken = jwt.sign(payload, this.accessTokenSecret, {
            expiresIn: '1h',
        });
        const refreshToken = jwt.sign(payload, this.refreshTokenSecret, {
            expiresIn: '30d',
        });
        return {
            accessToken,
            refreshToken,
        };
    }

    validateAccessToken(token: string) {
        try {
            const userData = jwt.verify(token, this.accessTokenSecret) as JwtPayload;
            return userData;
        } catch (e) {
            return null;
        }
    }

    validateRefreshToken(token: string) {
        try {
            const userData = jwt.verify(token, this.refreshTokenSecret) as JwtPayload;
            return userData;
        } catch (e) {
            return null;
        }
    }
}