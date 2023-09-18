import {UserRepository} from "../repositories/UserRepository/UserRepository";


export class UserService implements UserRepository{
    constructor(private userRepository: UserRepository) {}

    async createUser(email: string, username: string, password: string, role: string) {
        const createdUser = await this.userRepository.createUser(email, username, password, role);
        return createdUser;
    }

    async getAllUsers() {
        return this.userRepository.getAllUsers();
    }

    async getUserById(id: number) {
        return this.userRepository.getUserById(id);
    }

    async deleteUser(id: number) {
        return this.userRepository.deleteUser(id);
    }
}