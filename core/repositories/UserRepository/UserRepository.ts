import {UserDto} from "./dto/UserDto";
export interface UserRepository {
    create(
        email: string,
        username: string,
        password: string,
        role: string
    ): Promise<UserDto>;
    save(user: any): Promise<any>;
    getAll(): Promise<any>;
    getById(id: any): Promise<any>;
    delete(id: any): Promise<any>;

}