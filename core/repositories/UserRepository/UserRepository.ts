import {UserDto} from "./dto/UserDto";
import {User} from "../../domain/User";
export interface UserRepository {
    create(
        email: string,
        username: string,
        password: string,
        role: string
    ): Promise<UserDto>;
    save(user: User): Promise<UserDto>;
    getAll(): Promise<UserDto>;
    getById(id: any): Promise<UserDto>;
    delete(id: any): Promise<UserDto>;

}