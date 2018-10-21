import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./views/login/component/login.component";
import {ModuleWithProviders} from "@angular/core";
import {BautismoComponent} from "./views/bautismo/component/bautismo.component";
import {BuscadorComponent} from "./views/buscador/component/buscador.component";
import {ComunionComponent} from "./views/comunion/component/comunion.component";
import {MatrimonioComponent} from "./views/matrimonio/component/matrimonio.component";
import {ConfirmacionComponent} from "./views/confirmacion/component/confirmacion.component";

const appRoutes: Routes = [

    { path: 'login', component: LoginComponent},
    { path: 'bautismo', component: BautismoComponent},
    { path: 'comunion', component: ComunionComponent},
    { path: 'confirmacion', component: ConfirmacionComponent},
    { path: 'matrimonio', component: MatrimonioComponent},
    { path: 'buscador', component: BuscadorComponent},
    { path: '', redirectTo: '/login', pathMatch: 'full'}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes, { useHash: true });