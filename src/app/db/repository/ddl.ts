import {Model} from "../model/model";

export interface IDdl<T extends Model> {

    findAll(): Promise<Array<T>> ;
    findOne(id: number): Promise<T>;
    findOneBy(entity: T): Promise<T>;
}