import {Component, OnInit} from '@angular/core';
import {EventModel} from "../../commons/model/event.model";
import {SacramentInfo} from "../../commons/model/sacramentInfo.model";
import {SacramentRepository} from "../../commons/repository/sacrament.repository";
import {Router} from "@angular/router";

@Component({
    templateUrl: './search.component.html'
})

export class SearchComponent implements OnInit{

    // @ts-ignore
    private eventModel: EventModel = new EventModel();

    // @ts-ignore
    private sacraments : Array<SacramentInfo> = [];
    // @ts-ignore
    private sacramentsLeftList : Array<SacramentInfo> = [];
    private sacramentsRightList : Array<SacramentInfo> = [];

    constructor(private sacramentInfoRepository: SacramentRepository, private router : Router) {
    }

    private getSacraments() {
        this.sacramentInfoRepository.openDb(this.sacramentInfoRepository.settings.dbPath)
            .then(() => {
            })
            .then(() => {
                this.sacramentInfoRepository.findAll().then(sacraments => {
                    this.sacraments = sacraments;
                    this.sacramentsLeftList = this.sacraments.slice(0, this.sacraments.length/2);
                    this.sacramentsRightList = this.sacraments.slice( this.sacraments.length/2 , this.sacraments.length );
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

    // @ts-ignore
    private filterSacraments() {
        this.sacramentsLeftList = this.sacraments.slice(0, this.sacraments.length/2);
        this.sacramentsLeftList = this.sacramentsLeftList.filter(sacrament => ((sacrament.sacrament == 1 && this.eventModel.bautizm )
        || (sacrament.sacrament == 2 && this.eventModel.confirm ) || (sacrament.sacrament == 3 && this.eventModel.marriage ) ||
            (sacrament.sacrament == 4 && this.eventModel.communion )));

        this.sacramentsRightList = this.sacraments.slice( this.sacraments.length/2 , this.sacraments.length );
        this.sacramentsRightList = this.sacramentsRightList.filter(sacrament => ((sacrament.sacrament == 1 && this.eventModel.bautizm )
            || (sacrament.sacrament == 2 && this.eventModel.confirm ) || (sacrament.sacrament == 3 && this.eventModel.marriage ) ||
            (sacrament.sacrament == 4 && this.eventModel.communion )));
    }

    // @ts-ignore
    private changeStatus(type: string, status: boolean) {
        this.eventModel[type] = status;
        this.filterSacraments()
    }

    public getLink(sacrament:  number, id:number):void {
        let link = '';
        switch (sacrament) {
            case 1: link = 'bautismo';  break;
            case 2: link = 'confirmacion';  break;
            case 3: link = 'matrimonio';  break;
            case 4: link = 'comunion';  break;
        }
        this.router.navigate(["/" + link, id]);
    }

}