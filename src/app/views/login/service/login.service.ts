import {Injectable} from "@angular/core";
import {User} from "../../commons/model/user.model";
// @ts-ignore
import * as jwt from 'jsonwebtoken';

@Injectable()
export class LoginService {

    private readonly tokenItem : string = 'token';

    public setToken(user: User): void {
        let token = jwt.sign({ anyObject: user }, user.password);
        localStorage.setItem(this.tokenItem, token);
    }

    public getUser() : string  {
        let user = jwt.decode(  localStorage.getItem(this.tokenItem),{complete: true}).payload.anyObject;
        delete user.password;
        return user;
    }
}