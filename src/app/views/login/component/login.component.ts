import {Component} from '@angular/core';
import {UserRepository} from "../service/user.repository";
import {User} from "../model/user.model";

@Component({
  templateUrl: './login.component.html'
})
export class LoginComponent {
  title = 'angular-electron';

  constructor(private userRepository: UserRepository) {
  }


  public login(model: User): void {
    this.userRepository.findOne(model.id).then(model => {
      console.log(model);
    });
  }


}
