import {Component} from '@angular/core';
import {SacramentInfo} from "../../commons/model/bautismo.model";
import {SacramentRepository} from "../../commons/repository/sacrament.repository";

@Component({
    templateUrl: './comunion.component.html'
})
export class ComunionComponent {
    // @ts-ignore
    private sacrament: SacramentInfo = new SacramentInfo();

    constructor(private sacramentRepository: SacramentRepository){}


    // @ts-ignore
    private save(model: SacramentInfo) {
        this.sacramentRepository.openDb(this.sacramentRepository.settings.dbPath)
            .then(() => {
            })
            .then(() => {
                this.sacramentRepository.save(model).then(() => {
                })

            })
            .catch((reason) => {
                // Handle errors
                console.log('Error occurred while opening database: ', reason);
            });
    }
}
