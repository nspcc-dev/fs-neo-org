import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {NetworkComponent} from "./network/network.component";
import {FeaturesComponent} from "./features/features.component";
import {AuditComponent} from "./audit/audit.component";
import {GasComponent} from "./gas/gas.component";
import {ServicesComponent} from "./services/services.component";
import {TokensComponent} from "./tokens/tokens.component";
import {HowtoComponent} from "./howto/howto.component";


import { SendneofsComponent } from './services/sendneofs/sendneofs.component';
import { SdkComponent } from './services/sdk/sdk.component';
import { TestnetComponent } from './services/testnet/testnet.component';
import { WalletComponent } from './wallet/wallet.component';

const routes: Routes = [
  {path: '', component: FeaturesComponent },
  {path: 'features', component: FeaturesComponent},
  {path: 'network', component: NetworkComponent},
  {path: 'audit', component: AuditComponent},
  {path: 'gas', component: GasComponent},
  {path: 'services', component: ServicesComponent},
  {path: 'wallet', component: WalletComponent},

  {path: 'services/sendneofs', component: SendneofsComponent},
  {path: 'services/sdk', component: SdkComponent},
  {path: 'services/testnet', component: TestnetComponent},

  {path: 'tokens', component: TokensComponent},
  {path: 'howto', component: HowtoComponent},
  { path: '**', redirectTo: '' },
];


@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled', // Add options right here
  })],
  exports: [RouterModule],
})


export class AppRoutingModule { }
