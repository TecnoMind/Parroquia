import {Component} from '@angular/core';
import {SacramentRepository} from "../../commons/repository/sacrament.repository";
import {ActivatedRoute, Router} from "@angular/router";
import { SaveComponent } from '../../commons/component/save.component';

@Component({
    templateUrl: './confirmacion.component.html'
})
export class ConfirmacionComponent extends SaveComponent{

    constructor(protected sacramentRepository: SacramentRepository, protected router: Router,protected route :ActivatedRoute) {
        super(sacramentRepository, router, route);
        this.sacrament.sacrament = 3;
    }
}