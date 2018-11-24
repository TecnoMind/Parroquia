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
import {BautismoPrintComponent} from "./views/bautismo/component/bautismo.print.component";
import {MenuComponent} from "./views/commons/component/menu.component";
import {EventRepository} from "./views/commons/repository/event.repository";
import {ConfirmacionComponent} from "./views/confirmacion/component/confirmacion.component";
import {ConfirmacionPrintComponent} from "./views/confirmacion/component/confirmacion.print.component";
import {MatrimonioComponent} from "./views/matrimonio/component/matrimonio.component";
import {ComunionComponent} from "./views/comunion/component/comunion.component";
import {ComunionPrintComponent} from "./views/comunion/component/comunion.print.component";
import {SweetAlert2Module} from '@toverux/ngx-sweetalert2';
import {InputValidateComponent} from "./views/commons/component/input.validate.component";
import {SearchComponent} from "./views/buscador/component/search.component";
import {SacramentRepository} from "./views/commons/repository/sacrament.repository";
//import { TooltipModule } from 'ng2-tooltip-directive';
import { CustomDatePipe } from './views/commons/pipes/custom-date.pipe';
import { MatrimonioPrintComponent } from './views/matrimonio/component/matrimonio.print.component';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        routing,
        SweetAlert2Module.forRoot(),
        //TooltipModule
    ],
    declarations: [
        AppComponent,
        LoginComponent,
        BautismoComponent,
        BautismoPrintComponent,
        MenuComponent,
        SearchComponent,
        ConfirmacionComponent,
        ConfirmacionPrintComponent,
        MatrimonioComponent,
        MatrimonioPrintComponent,
        ComunionComponent,
        ComunionPrintComponent,
        InputValidateComponent,
        CustomDatePipe
    ],
    providers: [SettingsImpl, UserRepository, LoginService, EventRepository, SacramentRepository],
    bootstrap: [ AppComponent ]
})
export class AppModule { }