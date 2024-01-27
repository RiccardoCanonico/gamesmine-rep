import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { GamePageComponent } from './components/pages/game-page/game-page.component';
import { CartPageComponent } from './components/pages/cart-page/cart-page.component';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { RegisterPageComponent } from './components/pages/register-page/register-page.component';
import { PaymentPageComponent } from './components/pages/payment-page/payment-page.component';

const routes: Routes = [
  {path: '', component:HomeComponent},
  {path: 'search/:searchTerm', component:HomeComponent},
  {path: 'game/:id', component:GamePageComponent},
  {path: 'cart-page', component:CartPageComponent},
  {path: 'login', component:LoginPageComponent},
  {path: 'register', component:RegisterPageComponent},
  {path: 'payment', component:PaymentPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
