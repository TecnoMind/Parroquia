import {Component, OnInit} from '@angular/core';
import {EventModel} from "../../commons/model/event.model";
import {SacramentInfo} from "../../commons/model/bautismo.model";
import {SacramentRepository} from "../../commons/repository/sacrament.repository";

@Component({
    templateUrl: './search.component.html'
})

export class SearchComponent implements OnInit{

    // @ts-ignore
    private eventModel: EventModel = new EventModel();

    // @ts-ignore
    private sacraments : Array<SacramentInfo> = [];

    constructor(private sacramentInfoRepository: SacramentRepository) {
    }

    private getSacraments() {
        this.sacramentInfoRepository.openDb(this.sacramentInfoRepository.settings.dbPath)
            .then(() => {
            })
            .then(() => {
                this.sacramentInfoRepository.findAll().then(sacraments => {
                    this.sacraments = sacraments;
                })
            })
            .catch((reason) => {
                // Handle errors
                console.log('Error occurred while opening database: ', reason);
            });
    }

    ngOnInit(): void {
        this.getSacraments();
    }
}