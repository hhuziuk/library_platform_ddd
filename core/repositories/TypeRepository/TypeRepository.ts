import {TypeDto} from "./dto/TypeDto";
import {Type} from "../../domain/Type";

export interface TypeRepository {
    createType(name: string): Promise<TypeDto>;
    getAllTypes(): Promise<Type[]>;
    getTypeById(id: string | number): Promise<Type | null>;
    deleteType(id: string | number): Promise<void>;
}