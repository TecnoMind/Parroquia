import {LoginComponent} from "./views/login/component/login.component";
import {AppComponent} from "./app.component";
import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {routing} from "./app.routing.module";
import {UserRepository} from "./views/commons/repository/user.repository";
import {SettingsImpl} from "./db/repository/impl/settings.impl";
import {LoginService} from "./views/login/service/login.service";
import {BautismoComponent} from "./views/bautismo/component/bautismo.component";
import {MenuComponent} from "./views/commons/component/menu.component";
import {EventRepository} from "./views/commons/repository/event.repository";
import {ConfirmacionComponent} from "./views/confirmacion/component/confirmacion.component";
import {MatrimonioComponent} from "./views/matrimonio/component/matrimonio.component";
import {ComunionComponent} from "./views/comunion/component/comunion.component";
import {SweetAlert2Module} from '@toverux/ngx-sweetalert2';
import {InputValidateComponent} from "./views/commons/component/input.validate.component";
import {SearchComponent} from "./views/buscador/component/search.component";
import {SacramentRepository} from "./views/commons/repository/sacrament.repository";

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        routing,
        SweetAlert2Module.forRoot()
    ],
    declarations: [
        AppComponent,
        LoginComponent,
        BautismoComponent,
        MenuComponent,
        SearchComponent,
        ConfirmacionComponent,
        MatrimonioComponent,
        ComunionComponent,
        InputValidateComponent
    ],
    providers: [SettingsImpl, UserRepository, LoginService, EventRepository, SacramentRepository],
    bootstrap: [ AppComponent ]
})
export class AppModule { }