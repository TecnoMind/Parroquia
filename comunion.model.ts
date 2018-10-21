import {Model} from "../../../db/model/model";

export class SacramentInfo extends Model{

    private _id: number;
    private _sacrament: number = 2;
    private _name: string;
    private _baptismPlace: string;
    private _baptismDate: Date;
    private _date: Date;
    private _fatherName: string;
    private _motherName: string;
    private _godFatherName:string;
    private _godMotherName: string;
    private _priest: string;

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

    get baptismPlace(): string {
        return this._name;
    }

    set baptismPlace(value: string) {
        this._name = value;
    }

    get baptismDate(): string {
        return this._name;
    }

    set baptismDate(value: string) {
        this._name = value;
    }
    
    get date(): Date {
        return this._date;
    }

    set date(value: Date) {
        this._date = value;
    }

    get fatherName(): string {
        return this._fatherName;
    }

    set fatherName(value: string) {
        this._fatherName = value;
    }

    get motherName(): string {
        return this._motherName;
    }

    set motherName(value: string) {
        this._motherName = value;
    }

    get godFatherName(): string {
        return this._godFatherName;
    }

    set godFatherName(value: string) {
        this._godFatherName = value;
    }

    get godMotherName(): string {
        return this._godMotherName;
    }

    set godMotherName(value: string) {
        this._godMotherName = value;
    }

    get priest(): string {
        return this._priest;
    }

    set priest(value: string) {
        this._priest = value;
    }

    get sacrament(): number {
        return this._sacrament;
    }

    set sacrament(value: number) {
        this._sacrament = value;
    }
}
