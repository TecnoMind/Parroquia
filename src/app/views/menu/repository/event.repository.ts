import {Injectable} from "@angular/core";
import {Repository} from "../../../db/repository/impl/repository";
import {Event} from "../model/event.model";
import {SettingsImpl} from "../../../db/repository/impl/settings.impl";

/**
 * Simple class for selecting, inserting, updating and deleting Heroes in hero table.
 *
 * @export
 * @class Hero
 */
@Injectable()
export class EventRepository extends Repository<Event> {

    constructor(public settings: SettingsImpl) {
        super(Event.name.toLowerCase(), settings);
    }

}
