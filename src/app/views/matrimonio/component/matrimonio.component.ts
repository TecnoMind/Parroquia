import {Component} from '@angular/core';
import {SacramentRepository} from "../../commons/repository/sacrament.repository";
import {ActivatedRoute, Router} from "@angular/router";
import { SaveComponent } from '../../commons/component/save.component';

@Component({
    templateUrl: './matrimonio.component.html'
})
export class MatrimonioComponent extends SaveComponent{

    constructor(protected sacramentRepository: SacramentRepository, protected router: Router,protected route :ActivatedRoute) {
        super(sacramentRepository, router, route);
        this.sacrament.sacrament = 4;
    }
}