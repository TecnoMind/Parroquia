import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./views/login/component/login.component";
import {ModuleWithProviders} from "@angular/core";
import {BautismoComponent} from "./views/bautismo/component/bautismo.component";
import {MenuComponent} from "./views/menu/component/menu.component";

const appRoutes: Routes = [

    { path: 'login', component: LoginComponent},
    { path: 'bautismo', component: BautismoComponent},
    { path: 'menu', component: MenuComponent},
    { path: '', redirectTo: '/login', pathMatch: 'full'}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes, { useHash: true });