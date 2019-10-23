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
    ServicesComponent
  ],
  imports: [
    NgbModule, 
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
