import {SacramentInfo} from "../model/sacramentInfo.model";
import {SacramentRepository} from "../repository/sacrament.repository";
import swall from 'sweetalert2'
import {ActivatedRoute, Router} from "@angular/router";
import {OnInit} from '@angular/core';

export class SaveComponent implements OnInit {
    // @ts-ignore
    protected sacrament: SacramentInfo = new SacramentInfo();

    // @ts-ignore
    private showForm: boolean = true;

    // @ts-ignore
    private tabs = ['Catecumeno', 'Testigos', 'Celebrante'];

    // @ts-ignore
    private viewMode: string = this.tabs[0];

    private validArray : Array<boolean> = [];

    constructor(protected sacramentRepository: SacramentRepository, protected router: Router, protected route: ActivatedRoute) {
    }

    // @ts-ignore
    protected save(model: SacramentInfo, id: number) {

        this.showForm = false;
        // @ts-ignore


        swall({
            text: '¿Deseas guardar el acta?',
            showCancelButton: true,
            confirmButtonText: 'Aceptar',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.dismiss !== swall.DismissReason.cancel) {
                (id) ? this.updateSacrament(model) : this.saveSacrament(model);
            }

            setTimeout(() => {
                this.showForm = true;
            }, 100);

        });
    }

    protected updateSacrament(model: SacramentInfo) {
        this.sacramentRepository.openDb(this.sacramentRepository.settings.dbPath)
            .then(() => {
            })
            .then(() => {
                this.sacramentRepository.update(new SacramentInfo(model)).then(() => {
                    swall({
                        title: 'Acta actualizada correctamente',
                        type: 'success',
                    });
                    console.log(this.sacramentRepository);
                    setTimeout(() => {
                        this.router.navigateByUrl("buscador");
                    }, 100);
                }, reason => {
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

    private saveSacrament(model: SacramentInfo) {
        this.sacramentRepository.openDb(this.sacramentRepository.settings.dbPath)
            .then(() => {
            })
            .then(() => {
                this.sacramentRepository.save(model).then(() => {
                    swall({
                        title: 'Acta guardada correctamente',
                        type: 'success',
                    });
                    console.log(this.sacramentRepository);
                    setTimeout(() => {
                        this.router.navigateByUrl("buscador");
                    }, 100);
                }, reason => {
                    swall({
                        title: 'Porfavor, llene todos los campos del formulario',
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

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            if (params.id) {
                this.sacramentRepository.openDb(this.sacramentRepository.settings.dbPath)
                    .then(() => {
                    })
                    .then(() => {
                        this.sacramentRepository.findOne(params.id).then(sacrament  =>  {
                            this.sacrament = sacrament;
                        })
                    })
                    .catch((reason) => {
                        // Handle errors
                        console.log('Error occurred while opening database: ', reason);
                    });
            }
        });
    }


    // @ts-ignore
    protected validate(event) {
     //   console.log(event);
        this.validArray[event.position] = event.status;
    }

    protected isValidArray() {
     //   console.log(this.validArray.some(valid => !valid));
        return this.validArray.some(valid => !valid);
    }
}