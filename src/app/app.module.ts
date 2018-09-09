import {NgModule} from "@angular/core";
import {LoginComponent} from "./views/login/component/login.component";
import {AppComponent} from "./app.component";
import {FormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {routing} from "./app.routing.module";
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
    bootstrap: [ AppComponent ]
})
export class AppModule { }