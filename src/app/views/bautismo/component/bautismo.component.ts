import {Component} from '@angular/core';
import {SacramentInfo} from "../../commons/model/bautismo.model";
import {Router} from "@angular/router";
import {SaveComponent} from "../../commons/component/save.component";
import {SacramentRepository} from "../../commons/repository/sacrament.repository";


@Component({
    templateUrl: './bautismo.component.html'
})
export class BautismoComponent extends SaveComponent{
    // @ts-ignore
    private sacrament: SacramentInfo = new SacramentInfo();

    constructor(protected sacramentRepository: SacramentRepository, protected router: Router) {
        super(sacramentRepository, router);
        this.sacrament.sacrament = 1;
    }
}
