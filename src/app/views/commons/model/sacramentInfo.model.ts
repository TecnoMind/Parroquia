import {Model} from "../../../db/model/model";

export class SacramentInfo extends Model{

    private _id: number;
    private _sacrament: number = 1;
    private _name: string;
    private _bornPlace: string;
    private _date: Date;
    private _fatherName: string;
    private _motherName: string;
    private _godFatherName:string;
    private _godMotherName: string;
    private _baptismChurch: string;
	private _baptismPlace: string;
    private _baptismDate: Date;
    private _paternalGrandMotherName: string;
    private _paternalGrandFatherName: string;
    private _maternalGrandMotherName: string;
    private _maternalGrandFatherName: string;
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

    get bornPlace(): string {
        return this._bornPlace;
    }

    set bornPlace(value: string) {
        this._bornPlace = value;
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

    get baptismChurch(): string {
        return this._baptismChurch;
    }

    set baptismChurch(value: string) {
        this._baptismChurch = value;
    }

    get baptismPlace(): string {
        return this._baptismPlace;
    }

    set baptismPlace(value: string) {
        this._baptismPlace = value;
    }

    get baptismDate(): Date {
        return this._baptismDate;
    }

    set baptismDate(value: Date) {
        this._baptismDate = value;
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
