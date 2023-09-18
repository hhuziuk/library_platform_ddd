import {TypeDto} from "./dto/TypeDto";
import {Type} from "../../domain/Type";


export interface TypeRepository {
    createType(name: string): Promise<TypeDto>;
    getAllTypes(): Promise<Type[]>;
    getTypeById(id: number): Promise<Type | null>;
    deleteType(id: number): Promise<void>;
}