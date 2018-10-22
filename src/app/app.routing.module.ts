import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./views/login/component/login.component";
import {ModuleWithProviders} from "@angular/core";
import {BautismoComponent} from "./views/bautismo/component/bautismo.component";
import {ComunionComponent} from "./views/comunion/component/comunion.component";
import {MatrimonioComponent} from "./views/matrimonio/component/matrimonio.component";
import {ConfirmacionComponent} from "./views/confirmacion/component/confirmacion.component";
import {SearchComponent} from "./views/buscador/component/search.component";
//import {MenuComponent} from "./views/menu/component/menu.component";

const appRoutes: Routes = [

    { path: 'login', component: LoginComponent},

    { path: 'bautismo', component: BautismoComponent},
    { path: 'bautismo/:id', component: BautismoComponent},
    { path: 'confirmacion', component: ConfirmacionComponent},
    { path: 'confirmacion/:id', component: ConfirmacionComponent},
    { path: 'matrimonio', component: MatrimonioComponent},
    { path: 'matrimonio/:id', component: MatrimonioComponent},
    { path: 'comunion', component: ComunionComponent},
    { path: 'comunion/:id', component: ComunionComponent},
    { path: 'buscador', component: SearchComponent},
    { path: '', redirectTo: '/login', pathMatch: 'full'}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes, { useHash: true });