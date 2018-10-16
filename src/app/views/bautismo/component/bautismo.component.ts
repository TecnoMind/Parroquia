import {Component} from '@angular/core';
import {SacramentInfo} from "../../commons/model/bautismo.model";
import {BautismoRepository} from "../../commons/repository/bautismo.repository";
import swall from 'sweetalert2'


@Component({
    templateUrl: './bautismo.component.html'
})
export class BautismoComponent {
    // @ts-ignore
    private sacrament: SacramentInfo = new SacramentInfo();

    // @ts-ignore
    private show: boolean = true;

    constructor(private bautismoRepository: BautismoRepository){
        this.sacrament.sacrament = 1;
    }


    // @ts-ignore
    private save(model: SacramentInfo) {
        this.show = false;
        swall({
            title: 'Exito!',
            text: 'Do you want to continue',
            type: 'success',
            showCancelButton: true,
            confirmButtonText: 'Cool',
            cancelButtonColor: '#d33',
            cancelButtonText:'Cancelar'
        }).then((result) =>{
            if (result.dismiss !== swall.DismissReason.cancel) {
               this.saveBautismo(model);
            }else {
                console.log(result);
            }
            this.show = true;

        });
    }

    private saveBautismo(model: SacramentInfo) {
        this.bautismoRepository.openDb(this.bautismoRepository.settings.dbPath)
            .then(() => {
            })
            .then(() => {
                this.bautismoRepository.save(model).then(() => {
                    console.log("test");
                    swall({
                        title: 'Exito!',
                        text: 'Do you want to continue',
                        type: 'success',
                    })
                });
            })
            .catch((reason) => {
                // Handle errors
                console.log('Error occurred while opening database: ', reason);
            });
    }


}
