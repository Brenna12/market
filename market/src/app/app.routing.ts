import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { MarketComponent } from './market/market.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './_guards/auth.guard';
import { AuthComponent } from './auth/auth.component';
import { LogoutComponent } from './logout/logout.component';
import { AccountComponent } from './account/account.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'market', component: MarketComponent,  canActivate: [AuthGuard] },
  { path: 'auth', component: AuthComponent},
  { path: 'account', component: AccountComponent},
  { path: 'logout', component: LogoutComponent},
  // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}