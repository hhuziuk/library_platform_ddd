import {TypeRepository} from "../repositories/TypeRepository/TypeRepository";
export class TypeDomainService implements TypeRepository {
    constructor(private typeRepository: TypeRepository) {}

    async createType(name: string){
        const createdType = await this.typeRepository.createType(name);
        return createdType;
    }
    async getAllTypes(){
        return this.typeRepository.getAllTypes();
    }
    async getTypeById(id: any){
        return this.typeRepository.getTypeById(id);
    }
    async deleteType(id: any){
        return this.typeRepository.deleteType(id);
    }
}