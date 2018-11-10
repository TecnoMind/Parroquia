import {Component, OnInit, AfterViewInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {SacramentRepository} from "../../commons/repository/sacrament.repository";
import {SacramentInfo} from "../../commons/model/sacramentInfo.model";

@Component({
    templateUrl: './comunion.print.component.html'
})

export class ComunionPrintComponent implements OnInit, AfterViewInit {
    // @ts-ignore
    public sacrament: SacramentInfo = new SacramentInfo();

    constructor(public sacramentRepository: SacramentRepository, public router: Router, public route: ActivatedRoute) {
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

    ngAfterViewInit(): void{
        setTimeout(()=>{
            window.print();
            setTimeout(()=>{
                this.router.navigateByUrl("/buscador");
            },500);
        },500);
    }
}
