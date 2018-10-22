import {Component, OnInit} from '@angular/core';
//import {SacramentInfo} from "../../commons/model/sacramentInfo.model";
import {ActivatedRoute, Router} from "@angular/router";
import {SaveComponent} from "../../commons/component/save.component";
import {SacramentRepository} from "../../commons/repository/sacrament.repository";


@Component({
    templateUrl: './bautismo.component.html'
})
export class BautismoComponent extends SaveComponent implements OnInit {

    // @ts-ignore
    private isValid: boolean = false;

    constructor(protected sacramentRepository: SacramentRepository, protected router: Router,protected route :ActivatedRoute) {
        super(sacramentRepository, router, route);
        this.sacrament.sacrament = 1;
    }
}
