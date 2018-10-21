import {Repository} from '../../../db/repository/impl/repository';
import {Injectable} from "@angular/core";
import {SettingsImpl} from "../../../db/repository/impl/settings.impl";
import {SacramentInfo} from "../model/bautismo.model";

/**
 * Simple class for selecting, inserting, updating and deleting Heroes in hero table.
 *
 * @export
 * @class Hero
 */
@Injectable()
export class SacramentRepository extends Repository<SacramentInfo> {

    constructor(public settings: SettingsImpl) {
        super(SacramentInfo.name,  settings);
    }


}