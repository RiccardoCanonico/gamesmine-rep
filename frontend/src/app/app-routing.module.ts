import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { GamePageComponent } from './components/pages/game-page/game-page.component';
import { CartPageComponent } from './components/pages/cart-page/cart-page.component';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { RegisterPageComponent } from './components/pages/register-page/register-page.component';
import { PaymentPageComponent } from './components/pages/payment-page/payment-page.component';
import { OrdersPageComponent } from './components/pages/orders-page/orders-page.component';
import { AdminHomeComponent } from './components/pages/admin-home/admin-home.component';
import { isAdminGuard } from './components/guards/is-admin.guard';
import { AdminOrdersComponent } from './components/pages/admin-orders/admin-orders.component';
import { AdminUsersComponent } from './components/pages/admin-users/admin-users.component';
import { AdminProductsComponent } from './components/pages/admin-products/admin-products.component';
import { AdminUpdateProductComponent } from './components/pages/admin-update-product/admin-update-product.component';

const routes: Routes = [
  {path: '', component:HomeComponent},
  {path: 'admin', component:AdminHomeComponent, canActivate: [isAdminGuard]},
  {path: 'search/:searchTerm', component:HomeComponent},
  {path: 'game/:id', component:GamePageComponent},
  {path: 'cart-page', component:CartPageComponent},
  {path: 'login', component:LoginPageComponent},
  {path: 'register', component:RegisterPageComponent},
  {path: 'payment', component:PaymentPageComponent},
  {path: 'orders/:userToken', component:OrdersPageComponent},
  {path: 'admin/orders', component:AdminOrdersComponent, canActivate: [isAdminGuard]},
  {path: 'admin/users', component:AdminUsersComponent, canActivate: [isAdminGuard]},
  {path: 'admin/products', component: AdminProductsComponent, canActivate: [isAdminGuard]},
  {path: 'admin/products/update-product/:id', component: AdminUpdateProductComponent, canActivate: [isAdminGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
