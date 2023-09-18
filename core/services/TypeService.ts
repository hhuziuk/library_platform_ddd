import {TypeRepository} from "../repositories/TypeRepository/TypeRepository";

export class TypeService implements TypeRepository {
    constructor(private typeRepository: TypeRepository) {}

    async createType(name: string){
        const createdType = await this.typeRepository.createType(name);
        return createdType;
    }
    async getAllTypes(){
        return this.typeRepository.getAllTypes();
    }
    async getTypeById(id: number){
        return this.typeRepository.getTypeById(id);
    }
    async deleteType(id: number){
        return this.typeRepository.deleteType(id);
    }
}