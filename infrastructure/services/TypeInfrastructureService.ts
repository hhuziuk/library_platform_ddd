import {PostgresDataSource} from "../../tools/PGconnect";
import {Type} from "../db/PostgresEntities/TypeModel";
import ApiError from "../exceptions/Api-Error";
import {TypeDomainService} from "../../core/services/TypeDomainService";


class TypeInfrastructureService{
    constructor(readonly typeRepository: any = new TypeDomainService(typeRepository)) {}
    async create (name: string){
        const userType = await this.typeRepository.findOne({where: {name}})
        if(userType){
            throw ApiError.BadRequest(`The same type already exists`)
        }
        const type = await this.typeRepository.create({name})
        await this.typeRepository.save(type)
        return type;
    }
    async getAll (){
        const types = await this.typeRepository.find()
        return types;
    }
    async getOne (id: number){
        if(!id){
            throw ApiError.BadRequest(`No id was provided`)
        }
        const type = this.typeRepository.findOneBy({id})
        return type

    }

    async delete (id: number){
        if(!id){
            throw ApiError.BadRequest(`No id was provided`)
        }
        const type = this.typeRepository.delete({id})
        return {type}
    }

}

const typeService = new TypeInfrastructureService(PostgresDataSource.getRepository(Type));
export default typeService;