import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AuthModule } from '@auth0/auth0-angular';
import { ComponentsModule } from './components/components.module';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { SidemenuComponent } from './components/sidemenu/sidemenu.component';
import { AuthModalComponent } from './auth-modal/auth-modal.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AuthModule.forRoot({
      domain: 'dev-ge18shrpotjsh68b.us.auth0.com',
      clientId: 'fQLoXnPLiquM1ztmal3uRNEE71FuqLdP',
      authorizationParams: {
        redirect_uri: window.location.origin + '/home'
      }
    }),
    HttpClientModule,
    ComponentsModule
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
