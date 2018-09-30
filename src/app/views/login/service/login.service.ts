import {Injectable} from "@angular/core";
import {User} from "../model/user.model";
// @ts-ignore
import * as jwt from 'jsonwebtoken';

@Injectable()
export class LoginService {

    private readonly tokenItem : string = 'token';

    public setToken(user: User): void {
        let token = jwt.sign({ anyObject: user }, user.password);
        localStorage.setItem(this.tokenItem, token);
    }

    public getToken() : string | null{
        return localStorage.getItem(this.tokenItem);
    }
}