import {Repository} from '../../../db/repository/impl/repository';
import {Injectable} from "@angular/core";
import {SettingsImpl} from "../../../db/repository/impl/settings.impl";
import {Bautismo} from "../model/bautismo.model";

/**
 * Simple class for selecting, inserting, updating and deleting Heroes in hero table.
 *
 * @export
 * @class Hero
 */
@Injectable()
export class BautismoRepository extends Repository<Bautismo> {

    constructor(public settings: SettingsImpl) {
        super(Bautismo.name.toLowerCase(),  settings);
    }


}