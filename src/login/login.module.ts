import {NgModule} from "@angular/core";
import {LoginComponent} from "./views/login/login.component";
import {AppComponent} from "./app.component";
import {FormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {routing} from "./app.routing.module";


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        routing
    ],
    declarations: [
        AppComponent,
        LoginComponent
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }