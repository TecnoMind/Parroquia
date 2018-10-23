import {Model} from "../model/model";


export interface ICrud<T extends Model> {
    save(entity: T): Promise<void>;
    update(entity: T): Promise<void>;
    deleteOne(id: number): void;
}