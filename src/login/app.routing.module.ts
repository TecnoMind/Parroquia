import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./views/login/login.component";
import {ModuleWithProviders} from "@angular/core";

const appRoutes: Routes = [

    { path: 'login', component: LoginComponent},
    { path: '', redirectTo: '/login', pathMatch: 'full'}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);