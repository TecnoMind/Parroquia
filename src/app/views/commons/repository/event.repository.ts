import {Injectable} from "@angular/core";
import {Repository} from "../../../db/repository/impl/repository";
import {Sacrament} from "../model/sacrament.model";
import {SettingsImpl} from "../../../db/repository/impl/settings.impl";

/**
 * Simple class for selecting, inserting, updating and deleting Heroes in hero table.
 *
 * @export
 * @class Hero
 */
@Injectable()
export class EventRepository extends Repository<Sacrament> {

    constructor(public settings: SettingsImpl) {
        super("sacrament", settings);
    }

}
