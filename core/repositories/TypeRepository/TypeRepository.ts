import {TypeDto} from "./dto/TypeDto";
import {Type} from "../../domain/Type";


export interface TypeRepository {
    createType(name: string): Promise<TypeDto>;
    getAllTypes(): Promise<Type[]>;
    getTypeById(id: any): Promise<Type | null>;
    deleteType(id: any): Promise<void>;
}