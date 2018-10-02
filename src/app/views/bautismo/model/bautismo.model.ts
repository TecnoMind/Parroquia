import {Model} from "../../../db/model/model";

export class Bautismo extends Model{

    private _id: number;


    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }
}