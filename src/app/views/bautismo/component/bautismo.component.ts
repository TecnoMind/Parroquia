import {Component} from '@angular/core';
import {SacramentInfo} from "../../commons/model/bautismo.model";
import {BautismoRepository} from "../../commons/repository/bautismo.repository";
import swall from 'sweetalert2'
import {Router} from "@angular/router";


@Component({
    templateUrl: './bautismo.component.html'
})
export class BautismoComponent {
    // @ts-ignore
    private sacrament: SacramentInfo = new SacramentInfo();

    // @ts-ignore
    private showForm : boolean = true;

    // @ts-ignore
    private tabs = ['Catecumeno', 'Testigos', 'Celebrante'];

    // @ts-ignore
    private viewMode: string =  this.tabs[0];


    constructor(private bautismoRepository: BautismoRepository, private router: Router){
        this.sacrament.sacrament = 1;
    }

    // @ts-ignore
    private save(model: SacramentInfo) {
        this.showForm = false;
        swall({
            text: '¿Desea continuar?',
            showCancelButton: true,
            confirmButtonText: 'Aceptar',
            cancelButtonColor: '#d33',
            cancelButtonText:'Cancelar'
        }).then((result) =>{
            if (result.dismiss !== swall.DismissReason.cancel) {
               this.saveBautismo(model);
            }
            setTimeout(() => {
                this.showForm = true;
            }, 100);

        });
    }

    private saveBautismo(model: SacramentInfo) {
        this.bautismoRepository.openDb(this.bautismoRepository.settings.dbPath)
            .then(() => {
            })
            .then(() => {
                this.bautismoRepository.save(model).then(() => {
                    swall({
                        title: 'Guardado Correctamente',
                        type: 'success',
                    });
                    setTimeout(() => {
                        this.router.navigateByUrl("buscador");
                    }, 100);
                },reason => {
                    swall({
                        title: 'Error',
                        type: 'error',
                    });
                    console.log(reason);
                });
            })
            .catch((reason) => {
                // Handle errors
                console.log('Error occurred while opening database: ', reason);
            });
    }


}
