import {Component} from '@angular/core';
import {SacramentInfo} from "../../commons/model/bautismo.model";
import {BautismoRepository} from "../../commons/repository/bautismo.repository";


@Component({
    templateUrl: './confirmacion.component.html'
})
export class ConfirmacionComponent {
    // @ts-ignore
    private sacrament: SacramentInfo = new SacramentInfo();

    constructor(private bautismoRepository: BautismoRepository){}


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
