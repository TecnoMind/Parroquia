import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Event} from  "../model/event.model";
import {EventRepository} from "../repository/event.repository";
@Component({
    templateUrl: './menu.component.html'
})
export class MenuComponent implements OnInit{

    // @ts-ignore
    private events: Array<Event>;
    // @ts-ignore
    private  show: boolean = true;

    constructor( private router: Router,private eventRepository: EventRepository) {
        console.log(this.router);
    }

    ngOnInit(): void {
        this.eventRepository.openDb(this.eventRepository.settings.dbPath)
            .then(() => {
            })
            .then(() => {
                this.eventRepository.findAll().then(events =>{
                    this.events = events;
                })
            })
            .catch((reason) => {
                // Handle errors
                console.log('Error occurred while opening database: ', reason);
            });

    }

    public changeShow(){
        this.show = !this.show;
    }






}
