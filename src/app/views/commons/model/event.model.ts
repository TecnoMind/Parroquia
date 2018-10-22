import {Model} from "../../../db/model/model";

export class EventModel extends Model {

    private _bautizm: boolean = true;
    private _confirm: boolean = true;
    private _marriage: boolean = true;
    private _communion: boolean = true;


    get bautizm(): boolean {
        return this._bautizm;
    }

    set bautizm(value: boolean) {
        this._bautizm = value;
    }

    get confirm(): boolean {
        return this._confirm;
    }

    set confirm(value: boolean) {
        this._confirm = value;
    }

    get marriage(): boolean {
        return this._marriage;
    }

    set marriage(value: boolean) {
        this._marriage = value;
    }

    get communion(): boolean {
        return this._communion;
    }

    set communion(value: boolean) {
        this._communion = value;
    }
}