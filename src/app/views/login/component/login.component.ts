import {Component} from '@angular/core';
import {UserRepository} from "../repository/user.repository";
import {User} from "../model/user.model";
import {LoginService} from "../service/login.service";
import {Router} from "@angular/router";

@Component({
    templateUrl: './login.component.html'
})
export class LoginComponent {

    private user: User = new User();

    constructor(private userRepository: UserRepository,private loginService: LoginService, private router:Router) {
    }


    public login(model: User): void {
        console.log(model);
        this.userRepository.openDb(this.userRepository.settings.dbPath)
            .then(() => {
            })
            .then(() => {
                let fields = model.toArray();
                this.userRepository.findOneBy(fields, model.toValues(fields)).then(user => {
                    if(user) {
                        this.loginService.setToken(user);
                        this.router.navigateByUrl("/bautismo");
                    }
                })

            })
            .catch((reason) => {
                // Handle errors
                console.log('Error occurred while opening database: ', reason);
            });
    }

}
