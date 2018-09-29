


export class User {
    private _id: number;
    private _lastName: string;
    private _password: string;



    public constructor(id: number, lastName: string, password: string) {
        this._id = id;
        this._lastName = lastName;
        this._password = password;
    }


    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
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