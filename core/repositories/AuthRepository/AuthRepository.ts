export interface AuthRepository {
    registration(user: any): Promise<any>,
    login(user: any): Promise<any>,
    logout(refreshToken: any): Promise<any>,
    refresh(refreshToken: any): Promise<any>
}