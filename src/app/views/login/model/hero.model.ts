


export class User {
    private _id: number;
    private _name: string;
    private _lastName: string;
    private _password: string;


    public constructor(id: number, name: string, lastName: string, password: string) {
        this._id = id;
        this._name = name;
        this._lastName = lastName;
        this._password = password;
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

    get lastName(): string {
        return this._lastName;
    }

    set lastName(value: string) {
        this._lastName = value;
    }

    get password(): string {
        return this._password;
    }

    set password(value: string) {
        this._password = value;
    }
}