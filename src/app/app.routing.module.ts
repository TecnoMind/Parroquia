import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./views/login/component/login.component";
import {ModuleWithProviders} from "@angular/core";
import {BautismoComponent} from "./views/bautismo/component/bautismo.component";
import {BautismoPrintComponent} from "./views/bautismo/component/bautismo.print.component";
import {MatrimonioComponent} from "./views/matrimonio/component/matrimonio.component";
import {ConfirmacionComponent} from "./views/confirmacion/component/confirmacion.component";
import {ConfirmacionPrintComponent} from "./views/confirmacion/component/confirmacion.print.component";
import {SearchComponent} from "./views/buscador/component/search.component";
import { ComunionComponent } from './views/comunion/component/comunion.component';
import { ComunionPrintComponent } from './views/comunion/component/comunion.print.component';

const appRoutes: Routes = [

    { path: 'login', component: LoginComponent},

    { path: 'bautismo', component: BautismoComponent},
    { path: 'bautismo/:id', component: BautismoComponent},
    { path: 'bautismo/print/:id', component: BautismoPrintComponent},
    { path: 'comunion', component: ComunionComponent},
    { path: 'comunion/:id', component: ComunionComponent},
    { path: 'comunion/print/:id', component: ComunionPrintComponent},
    { path: 'confirmacion', component: ConfirmacionComponent},
    { path: 'confirmacion/:id', component: ConfirmacionComponent},
    { path: 'confirmacion/print/:id', component: ConfirmacionPrintComponent},
    { path: 'matrimonio', component: MatrimonioComponent},
    { path: 'matrimonio/:id', component: MatrimonioComponent},
    { path: 'buscador', component: SearchComponent},
    { path: '', redirectTo: '/login', pathMatch: 'full'}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes, { useHash: true });