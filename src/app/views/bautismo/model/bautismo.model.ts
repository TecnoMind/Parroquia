import {Model} from "../../../db/model/model";

export class Bautismo extends Model{

    private _id: number;
    private _name: string;
    private _place: string;
    private _date: Date;
    private _fatherName: string;
    private _motherName: string;
    private _goodFatherName:string;
    private _goodMotherName: string;
    private _paternalGrandMotherName: string;
    private _paternalGrandFatherName: string;
    private _maternalGrandMotherName: string;
    private _maternalGrandFatherName: string;
    private _grandMotherName: string;
    private _grandFatherName: string;
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

    get place(): string {
        return this._place;
    }

    set place(value: string) {
        this._place = value;
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

    get goodFatherName(): string {
        return this._goodFatherName;
    }

    set goodFatherName(value: string) {
        this._goodFatherName = value;
    }

    get goodMotherName(): string {
        return this._goodMotherName;
    }

    set goodMotherName(value: string) {
        this._goodMotherName = value;
    }

    get paternalGrandMotherName(): string {
        return this._paternalGrandMotherName;
    }

    set paternalGrandMotherName(value: string) {
        this._paternalGrandMotherName = value;
    }

    get paternalGrandFatherName(): string {
        return this._paternalGrandFatherName;
    }

    set paternalGrandFatherName(value: string) {
        this._paternalGrandFatherName = value;
    }

    get maternalGrandMotherName(): string {
        return this._maternalGrandMotherName;
    }

    set maternalGrandMotherName(value: string) {
        this._maternalGrandMotherName = value;
    }

    get maternalGrandFatherName(): string {
        return this._maternalGrandFatherName;
    }

    set maternalGrandFatherName(value: string) {
        this._maternalGrandFatherName = value;
    }

    get grandMotherName(): string {
        return this._grandMotherName;
    }

    set grandMotherName(value: string) {
        this._grandMotherName = value;
    }

    get grandFatherName(): string {
        return this._grandFatherName;
    }

    set grandFatherName(value: string) {
        this._grandFatherName = value;
    }

    get priest(): string {
        return this._priest;
    }

    set priest(value: string) {
        this._priest = value;
    }
}
