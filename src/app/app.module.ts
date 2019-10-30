import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HeaderComponent } from './header/header.component';
import { FeaturesComponent } from './features/features.component';
import { NetworkComponent } from './network/network.component';
import { FooterComponent } from './footer/footer.component';
import { AuditComponent } from './audit/audit.component';
import { GasComponent } from './gas/gas.component';
import { TokensComponent } from './tokens/tokens.component';
import { ServicesComponent } from './services/services.component';

import { FormsModule } from '@angular/forms';
import { HowtoComponent } from './howto/howto.component';
import { SendneofsComponent } from './services/sendneofs/sendneofs.component';
import { SdkComponent } from './services/sdk/sdk.component';
import { TestnetComponent } from './services/testnet/testnet.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HeaderComponent,
    FeaturesComponent,
    NetworkComponent,
    FooterComponent,
    AuditComponent,
    GasComponent,
    TokensComponent,
    ServicesComponent,
    HowtoComponent,
    SendneofsComponent,
    SdkComponent,
    TestnetComponent
  ],
  imports: [
    NgbModule, 
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
