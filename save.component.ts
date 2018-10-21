import {SacramentInfo} from "../../commons/model/bautismo.model";
import {SacramentRepository} from "../../commons/repository/sacrament.repository";
import swall from 'sweetalert2'
import {Router} from "@angular/router";

export class saveComponent {
    // @ts-ignore
    //private sacrament: SacramentInfo = new SacramentInfo();

    // @ts-ignore
    private showForm : boolean = true;

    // @ts-ignore
    private tabs = ['Catecumeno', 'Testigos', 'Celebrante'];

    // @ts-ignore
    private viewMode: string =  this.tabs[0];
        
    constructor(protected sacramentRepository: SacramentRepository, protected router: Router){
        //this.sacrament.sacrament = 1;
    }

      // @ts-ignore
      private save(model: SacramentInfo) {
        this.showForm = false;
        swall({
            text: '¿Desea generar el acta?',
            showCancelButton: true,
            confirmButtonText: 'Aceptar',
            cancelButtonColor: '#d33',
            cancelButtonText:'Cancelar'
        }).then((result) =>{
            if (result.dismiss !== swall.DismissReason.cancel) {
            this.saveSacrament(model);
            }
            setTimeout(() => {
                this.showForm = true;
            }, 100);

        });
    }

    private saveSacrament(model: SacramentInfo) {
        this.sacramentRepository.openDb(this.sacramentRepository.settings.dbPath)
            .then(() => {
            })
            .then(() => {
                this.sacramentRepository.save(model).then(() => {
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