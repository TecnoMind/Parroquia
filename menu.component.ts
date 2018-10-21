import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Sacrament} from "../model/sacrament.model";
import {EventRepository} from "../repository/event.repository";
import {UserRepository} from "../repository/user.repository";
import {LoginService} from "../../login/service/login.service";

@Component({
    templateUrl: './menu.component.html',
    selector: 'menu'
})
export class MenuComponent implements OnInit{

    // @ts-ignore
    private sacraments: Array<Sacrament>;
    // @ts-ignore
    private  show: boolean = true;
    // @ts-ignore
    private user: string;

    // @ts-ignore
    constructor( private router: Router,private eventRepository: EventRepository,
                 private userRepository:UserRepository, private loginService: LoginService) {
    }

    ngOnInit(): void {
      this.getSacraments();
      this.getUser();
    }

    public changeShow(){
        this.show = !this.show;
    }

    private getSacraments(): void {
        this.eventRepository.openDb(this.eventRepository.settings.dbPath)
            .then(() => {
            })
            .then(() => {

                this.eventRepository.findAll().then(sacraments =>{
                    this.sacraments = sacraments;
                })
            })
            .catch((reason) => {
                // Handle errors
                console.log('Error occurred while opening database: ', reason);
            });

    }

    private getUser(): void {
        this.userRepository.openDb(this.userRepository.settings.dbPath)
            .then(() => {
            })
            .then(() => {
                this.user = this.loginService.getUser();
            })
            .catch((reason) => {
                // Handle errors
                console.log('Error occurred while opening database: ', reason);
            });

    }

    public getLink(link: string):void {
        this.router.navigateByUrl("/" + link.toLowerCase().replace('ó','o'));
    }
}
