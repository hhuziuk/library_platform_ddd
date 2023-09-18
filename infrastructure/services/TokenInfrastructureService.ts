import jwt from 'jsonwebtoken'
import {PostgresDataSource} from "../../tools/PGconnect";
import {Token} from "../db/entities/TokenModel";
import type { JwtPayload } from "jsonwebtoken"

const tokenRepository = PostgresDataSource.getRepository(Token);

class TokenService{
    generateTokens(payload: any) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET || '', {expiresIn: '1h'})
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET || '', {expiresIn: '30d'})
        return {
            accessToken,
            refreshToken
        }
    }

    validateAccessToken(token: any){
        try{
            const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET || '') as JwtPayload
            return userData;
        } catch(e){
            return null;
        }
    }
    validateRefreshToken(token: any){
        try{
            const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET || '') as JwtPayload
            return userData;
        } catch(e){
            return null;
        }
    }

    async saveToken(userId: any, refreshToken: any){
        const tokenData = await tokenRepository.findOne({where: {
                user: {
                    id: userId
                }
            }})
        if(tokenData){
            tokenData.refreshToken = refreshToken;
            return tokenRepository.save(tokenData);
        }
        const token = await tokenRepository.create({user: userId, refreshToken})
        await tokenRepository.save(token)
        return token;
    }

    async removeToken(refreshToken: any){
        const tokenData = await tokenRepository.delete({refreshToken})
        return tokenData;
    }

    async findToken(refreshToken: any){
        const tokenData = await tokenRepository.findOne({where: {refreshToken}})
        return tokenData;
    }

}

export default new TokenService()