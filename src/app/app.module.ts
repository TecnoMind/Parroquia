import {LoginComponent} from "./views/login/component/login.component";
import {AppComponent} from "./app.component";
import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {routing} from "./app.routing.module";
import {UserRepository} from "./views/login/repository/user.repository";
import {SettingsImpl} from "./db/repository/impl/settings.impl";
import {LoginService} from "./views/login/service/login.service";
import {BautismoComponent} from "./views/bautismo/component/bautismo.component";
import {MenuComponent} from "./views/menu/component/menu.component";
import {EventRepository} from "./views/menu/repository/event.repository";
import {BautismoRepository} from "./views/bautismo/repository/bautismo.repository";
import {BuscadorComponent} from "./views/buscador/component/buscador.component";
import { from } from 'rxjs';

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
        MenuComponent,
        BuscadorComponent
    ],
    providers: [SettingsImpl, UserRepository, LoginService, EventRepository, BautismoRepository],
    bootstrap: [ AppComponent ]
})
export class AppModule { }