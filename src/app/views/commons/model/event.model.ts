import {Model} from "../../../db/model/model";

export class EventModel extends Model {

    private _bautizm: boolean = true;
    private _confirm: boolean = true;
    private _marriage: boolean = true;
    private _communion: boolean = true;

    private _bautizmId: number = 1;
    private _communionId: number = 2;
    private _confirmId: number = 3;
    private _marriageId: number = 4;



    get bautizmId(): number {
        return this._bautizmId;
    }

    set bautizmId(value: number) {
        this._bautizmId = value;
    }

    get confirmId(): number {
        return this._confirmId;
    }

    set confirmId(value: number) {
        this._confirmId = value;
    }

    get communionId(): number {
        return this._communionId;
    }

    set communionId(value: number) {
        this._communionId = value;
    }

    get marriageId(): number {
        return this._marriageId;
    }

    set marriageId(value: number) {
        this._marriageId = value;
    }

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