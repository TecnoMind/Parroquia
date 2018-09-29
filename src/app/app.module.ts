import {NgModule} from "@angular/core";
import {LoginComponent} from "./views/login/component/login.component";
import {AppComponent} from "./app.component";
import {FormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {routing} from "./app.routing.module";
import {UserRepository} from "./views/login/service/user.repository";
import {Settings} from "./db/settings";
//import {BautismoComponent} from "./views/baptism/bautismo.component";


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        routing
    ],
    declarations: [
        AppComponent,
        LoginComponent,
        //BautismoComponent
    ],
    providers: [Settings, UserRepository],
    bootstrap: [ AppComponent ]
})
export class AppModule { }