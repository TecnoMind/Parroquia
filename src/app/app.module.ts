import {LoginComponent} from "./views/login/component/login.component";
import {AppComponent} from "./app.component";
import { MatTabsModule, MatIconModule } from "@angular/material";
import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {routing} from "./app.routing.module";
import {UserRepository} from "./views/login/repository/user.repository";
import {SettingsImpl} from "./db/repository/impl/settings.impl";
import {LoginService} from "./views/login/service/login.service";
import {BautismoComponent} from "./views/bautismo/component/bautismo.component";
import {MenuComponent} from "./views/menu/component/menu.component";
import {MaterialModule} from "./material.module";
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        routing,
        MaterialModule,
        NoopAnimationsModule,
        MatTabsModule,
        MatIconModule
    ],
    declarations: [
        AppComponent,
        LoginComponent,
        BautismoComponent,
        MenuComponent,
    ],
    providers: [SettingsImpl, UserRepository, LoginService],
    bootstrap: [ AppComponent ]
})
export class AppModule { }