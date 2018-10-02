import {NgModule} from "@angular/core";
import {LoginComponent} from "./views/login/component/login.component";
import {AppComponent} from "./app.component";
import {FormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {routing} from "./app.routing.module";
import {UserRepository} from "./views/login/repository/user.repository";
import {SettingsImpl} from "./db/repository/impl/settings.impl";
import {LoginService} from "./views/login/service/login.service";
import {BautismoComponent} from "./views/bautismo/component/bautismo.component";
import {MenuComponent} from "./views/menu/component/menu.component";


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        routing
    ],
    declarations: [
        AppComponent,
        LoginComponent,
        BautismoComponent,
        MenuComponent
    ],
    providers: [SettingsImpl, UserRepository, LoginService],
    bootstrap: [ AppComponent ]
})
export class AppModule { }