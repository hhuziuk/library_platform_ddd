import {UserRepository} from "../repositories/UserRepository/UserRepository";

export class UserDomainService implements UserRepository{
    constructor(private userRepository: UserRepository) {}

    async create(email: string, username: string, password: string, role: string) {
        const createdUser = await this.userRepository.create(email, username, password, role);
        return createdUser;
    }
    async save(user: any){
        return this.userRepository.save(user);
    }

    async getAll() {
        return this.userRepository.getAll();
    }

    async getById(id: string | number) {
        return this.userRepository.getById(id);
    }

    async delete(id: string | number) {
        return this.userRepository.delete(id);
    }
}