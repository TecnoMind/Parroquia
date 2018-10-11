import {Component} from '@angular/core';
import {Bautismo} from "../model/bautismo.model";
import {BautismoRepository} from "../repository/bautismo.repository";


@Component({
    templateUrl: './bautismo.component.html'
})
export class BautismoComponent {
    // @ts-ignore
    private bautismo: Bautismo = new Bautismo();
    // @ts-ignore
    private viewMode:string = "tab1";

    constructor(private bautismoRepository: BautismoRepository){}


    private save(model: Bautismo) {
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
