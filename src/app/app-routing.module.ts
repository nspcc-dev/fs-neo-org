import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {NetworkComponent} from "./network/network.component";
import {FeaturesComponent} from "./features/features.component";
import {AuditComponent} from "./audit/audit.component";
import {GasComponent} from "./gas/gas.component";
import {ServicesComponent} from "./services/services.component";


const routes: Routes = [
  {path: '', component: FeaturesComponent },
  {path: 'features', component: FeaturesComponent},
  {path: 'network', component: NetworkComponent},
  {path: 'audit', component: AuditComponent},
  {path: 'gas', component: GasComponent},
  {path: 'services', component: ServicesComponent},
  { path: '**', redirectTo: '' },
];


@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled', // Add options right here
  })],
  exports: [RouterModule],
})


export class AppRoutingModule { }
