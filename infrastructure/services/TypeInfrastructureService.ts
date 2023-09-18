import {PostgresDataSource} from "../../tools/PGconnect";
import {Type} from "../db/entities/TypeModel";
import ApiError from "../exceptions/Api-Error";

const typeRepository = PostgresDataSource.getRepository(Type);

class TypeService{
    async create (name: string){
        const userType = await typeRepository.findOne({where: {name}})
        if(userType){
            throw ApiError.BadRequest(`The same type already exists`)
        }
        const type = await typeRepository.create({name})
        await typeRepository.save(type)
        return type;
    }
    async getAll (){
        const types = await typeRepository.find()
        return types;
    }
    async getOne (id: number){
        if(!id){
            throw ApiError.BadRequest(`No id was provided`)
        }
        const type = typeRepository.findOneBy({id})
        return type

    }

    async delete (id: number){
        if(!id){
            throw ApiError.BadRequest(`No id was provided`)
        }
        const type = typeRepository.delete({id})
        return {type}
    }

}

export default new TypeService();