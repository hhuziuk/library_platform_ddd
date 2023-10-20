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
    getById(id: string | number): Promise<UserDto>;
    delete(id: string | number): Promise<UserDto>;
}