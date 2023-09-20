//email: string, username: string, password: string, role: string

import {UserDto} from "./dto/UserDto";
import {User} from "../../domain/User";

export interface UserRepository {
    create(
        email: string,
        username: string,
        password: string,
        role: string
    ): Promise<UserDto>;
    getAll(): Promise<any>;
    getById(id: number): Promise<any>;
    delete(id: number): Promise<any>;

}