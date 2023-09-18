//email: string, username: string, password: string, role: string

import {UserDto} from "./dto/UserDto";
import {User} from "../../domain/User";

export interface UserRepository {
    createUser(
        email: string,
        username: string,
        password: string,
        role: string
    ): Promise<UserDto>;
    getAllUsers(): Promise<User[]>;
    getUserById(id: number): Promise<User | null>;
    deleteUser(id: number): Promise<void>;

}