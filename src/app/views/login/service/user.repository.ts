import {Repository} from '../../../db/repository/impl/repository';
import {User} from "../model/user.model";
import {Injectable} from "@angular/core";
import {Settings} from "../../../db/settings";

/**
 * Simple class for selecting, inserting, updating and deleting Heroes in hero table.
 *
 * @export
 * @class Hero
 */
@Injectable()
export class UserRepository extends Repository<User> {

    constructor(protected settings: Settings) {
        super(User.name.toLowerCase(),  settings);
    }
}