import {Component} from '@angular/core';
//import {SacramentInfo} from "../../commons/model/sacramentInfo.model";
import {SacramentRepository} from "../../commons/repository/sacrament.repository";
import { SaveComponent } from '../../commons/component/save.component';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    templateUrl: './comunion.component.html'
})
export class ComunionComponent extends SaveComponent{

    constructor(protected sacramentRepository: SacramentRepository, protected router: Router,protected route :ActivatedRoute) {
        super(sacramentRepository, router, route);
        this.sacrament.sacrament = 2;
    }
}
