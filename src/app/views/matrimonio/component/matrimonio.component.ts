import {Component} from '@angular/core';
import {SacramentInfo} from "../../commons/model/sacramentInfo.model";
import {SacramentRepository} from "../../commons/repository/sacrament.repository";


@Component({
    templateUrl: './matrimonio.component.html'
})
export class MatrimonioComponent {
    // @ts-ignore
    private sacrament: SacramentInfo = new SacramentInfo();

    constructor(private bautismoRepository: SacramentRepository){}


    // @ts-ignore
    private save(model: SacramentInfo) {
        this.bautismoRepository.openDb(this.bautismoRepository.settings.dbPath)
            .then(() => {
            })
            .then(() => {
                this.bautismoRepository.save(model).then(() => {

                })

            })
            .catch((reason) => {
                // Handle errors
                console.log('Error occurred while opening database: ', reason);
            });
    }
}
