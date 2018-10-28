import {Component, OnInit} from '@angular/core';
import {EventModel} from "../../commons/model/event.model";
import {SacramentInfo} from "../../commons/model/sacramentInfo.model";
import {SacramentRepository} from "../../commons/repository/sacrament.repository";
import {Router} from "@angular/router";
import {EventRepository} from "../../commons/repository/event.repository";


@Component({
    templateUrl: './search.component.html'
})

export class SearchComponent implements OnInit {

    // @ts-ignore
    private eventModel: EventModel = new EventModel();

    // @ts-ignore
    private sacraments : Array<SacramentInfo> = [];
    // @ts-ignore
    private sacramentsLeftList : Array<SacramentInfo> = [];
    private sacramentsRightList : Array<SacramentInfo> = [];

    constructor(private sacramentInfoRepository: SacramentRepository, private router : Router,private sacramentRepository: EventRepository) {

    }

    private getSacraments() {
        this.sacramentInfoRepository.openDb(this.sacramentInfoRepository.settings.dbPath)
            .then(() => {
            })
            .then(() => {
                this.sacramentInfoRepository.findAll().then(sacraments => {
                    this.sacraments = sacraments;
                    this.getSpecificSacrament(this.sacraments);
                    this.sacramentsLeftList =  this.leftSide(this.sacraments);
                    this.sacramentsRightList = this.rightSide(this.sacraments);
                })
            })
            .catch((reason) => {
                // Handle errors
                console.log('Error occurred while opening database: ', reason);
            });
    }

    getSpecificSacrament(sacraments: Array<SacramentInfo>) {
        this.sacramentRepository.openDb(this.sacramentRepository.settings.dbPath)
            .then(() => {
            })
            .then(() => {
                sacraments.forEach(sacrament  => {
                    this.sacramentRepository.findOne(sacrament.sacrament).then(event => {
                        sacrament.event = event;
                    })
                });

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
        this.sacramentsLeftList = this.leftSide(this.sacraments);
        this.sacramentsLeftList = this.sacramentsLeftList.filter(sacrament => ((sacrament.sacrament == 1 && this.eventModel.bautizm )
        || (sacrament.sacrament == this.eventModel.confirmId && this.eventModel.confirm ) || (sacrament.sacrament == this.eventModel.marriageId && this.eventModel.marriage ) ||
            (sacrament.sacrament == this.eventModel.communionId && this.eventModel.communion )));

        this.sacramentsRightList = this.rightSide(this.sacraments);
        this.sacramentsRightList = this.sacramentsRightList.filter(sacrament => ((sacrament.sacrament == 1 && this.eventModel.bautizm )
            || (sacrament.sacrament == this.eventModel.confirmId && this.eventModel.confirm ) || (sacrament.sacrament == this.eventModel.marriageId && this.eventModel.marriage ) ||
            (sacrament.sacrament == this.eventModel.communionId && this.eventModel.communion )));
    }

    // @ts-ignore
    private changeStatus(type: string, status: boolean) {
        this.eventModel[type] = status;
        this.filterSacraments()
    }

    public getLink(sacrament:  string, id:number): void {
        this.router.navigate(["/" + sacrament.toLowerCase().replace('ó','o'), id]);
    }

    public rightSide(sacramentInfo: Array<SacramentInfo>): Array<SacramentInfo> {
        return sacramentInfo.slice(0, this.sacraments.length/2);
    }

    public leftSide(sacramentInfo: Array<SacramentInfo>): Array<SacramentInfo> {
        return sacramentInfo.slice( this.sacraments.length/2 , this.sacraments.length );
    }

    public delete(id: number) {
        this.sacramentInfoRepository.openDb(this.sacramentInfoRepository.settings.dbPath)
            .then(() => {
            })
            .then(() => {
                setTimeout(() => {
                    //  this.getSacraments();
                    this.sacramentInfoRepository.deleteOne(id);
                    this.getSacraments();
                }, 400);
            })
            .catch((reason) => {
                // Handle errors
                console.log('Error occurred while opening database: ', reason);
            });
    }

    public print(sacrament: string, id: number){
        this.router.navigate(["/" + sacrament.toLowerCase().replace('ó','o') + "/print", id]);
    }
}