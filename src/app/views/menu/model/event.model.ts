import {Model} from "../../../db/model/model";

export class Event extends Model{

    private _id: number;
    private _name:string;
    private _icon: string;


    get icon(): string {
        return this._icon;
    }

    set icon(value: string) {
        this._icon = value;
    }


    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }


}