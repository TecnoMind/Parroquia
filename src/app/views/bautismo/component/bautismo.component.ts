import {Component, OnInit} from '@angular/core';
import {SacramentInfo} from "../../commons/model/sacramentInfo.model";
import {ActivatedRoute, Router} from "@angular/router";
import {SaveComponent} from "../../commons/component/save.component";
import {SacramentRepository} from "../../commons/repository/sacrament.repository";


@Component({
    templateUrl: './bautismo.component.html'
})
export class BautismoComponent extends SaveComponent implements OnInit{
    // @ts-ignore
    private sacrament: SacramentInfo = new SacramentInfo();

    constructor(protected sacramentRepository: SacramentRepository, protected router: Router,private route :ActivatedRoute) {
        super(sacramentRepository, router);
        this.sacrament.sacrament = 1;
    }

    ngOnInit(): void {
      this.route.params.subscribe(params => {
          if(params.id) {
              this.sacramentRepository.openDb(this.sacramentRepository.settings.dbPath)
                  .then(() => {
                  })
                  .then(() => {
                      this.sacramentRepository.findOne(params.id).then(sacrament => {
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
}
