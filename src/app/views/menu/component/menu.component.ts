import {Component} from '@angular/core';
import {Router} from "@angular/router";

@Component({
    templateUrl: './menu.component.html'
})
export class MenuComponent {

    private type: number ;
    constructor( private router: Router) {

    }

    public executeAdd(type: number) {
        console.log(type);
        switch (type) {
            case 1:
                this.router.navigateByUrl("/bautismo");
                break;
            case 2:
                break;
            case 3:
                break;
            case 4:
                break;
        }
    }

    public setType(type: number) {
        this.type = type;
    }

}
