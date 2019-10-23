import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {NetworkComponent} from "./network/network.component";
import {FeaturesComponent} from "./features/features.component";





const routes: Routes = [
  {path: '', component: FeaturesComponent },
  {path: 'features', component: FeaturesComponent},
  {path: 'network', component: NetworkComponent},
  { path: '**', redirectTo: '' },
];


@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled', // Add options right here
  })],
  exports: [RouterModule],
})


export class AppRoutingModule { }
