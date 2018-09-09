import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./views/login/component/login.component";
import {ModuleWithProviders} from "@angular/core";


const appRoutes: Routes = [

    { path: 'app', component: LoginComponent},
 //   { path: 'bautismo', component: BautismoComponent},
  //  { path: 'menu', component: LoginComponent},
    { path: '', redirectTo: '/app', pathMatch: 'full'}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);