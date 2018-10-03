import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { MarketModule } from './market/market.module';

import { AppRoutingModule } from './app.routing';
import { RouterModule } from '@angular/router';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';


import { HomeComponent } from './home/home.component';
import { AuthGuard } from './_guards/auth.guard';
import { LoginComponent } from './login/login.component';
import { AuthComponent } from './auth/auth.component';
import { AuthenticationService } from "./authentication.service";
import { AzureService } from "./azure.service";
import { AccountService } from "./account.service";
import { LogoutComponent } from './logout/logout.component';

import { UploadModule } from './upload/upload.module';
import { AccountComponent } from './account/account.component';
import { FooterComponent } from './footer/footer.component';
import { AuthInterceptor } from "./auth/interceptor.service";
import { HTTP_INTERCEPTORS } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomeComponent,
    LoginComponent,
    AuthComponent,
    LogoutComponent,
    AccountComponent,
    FooterComponent
 
  ],
  imports: [
    BrowserModule,
    MarketModule,
    AppRoutingModule,
    RouterModule,
    UploadModule,
    MatMenuModule,
    MatButtonModule
   
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    AuthGuard,
    AuthenticationService,
    AzureService,
    AccountService
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
