import {Repository} from '../../../db/repository/impl/repository';
import {User} from "../model/user.model";
import {Injectable} from "@angular/core";
import {SettingsImpl} from "../../../db/repository/impl/settings.impl";

/**
 * Simple class for selecting, inserting, updating and deleting Heroes in hero table.
 *
 * @export
 * @class Hero
 */
@Injectable()
export class UserRepository extends Repository<User> {

    constructor(public settings: SettingsImpl) {
        super(User.name.toLowerCase(),  settings);
    }


}