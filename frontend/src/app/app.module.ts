import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/partials/header/header.component';
import { HomeComponent } from './components/pages/home/home.component';
import { SearchComponent } from './components/partials/search/search.component';
import { GamePageComponent } from './components/pages/game-page/game-page.component';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { CartPageComponent } from './components/pages/cart-page/cart-page.component';
import { NotFoundComponent } from './components/partials/not-found/not-found.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { FormsModule } from '@angular/forms';
import { RegisterPageComponent } from './components/pages/register-page/register-page.component';
import { PaymentPageComponent } from './components/pages/payment-page/payment-page.component';
import { OrdersPageComponent } from './components/pages/orders-page/orders-page.component';
import { AdminHomeComponent } from './components/pages/admin-home/admin-home.component';
import { AdminOrdersComponent } from './components/pages/admin-orders/admin-orders.component';
import { AdminUsersComponent } from './components/pages/admin-users/admin-users.component';
import { AdminProductsComponent } from './components/pages/admin-products/admin-products.component';
import { AdminUpdateProductComponent } from './components/pages/admin-update-product/admin-update-product.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    SearchComponent,
    GamePageComponent,
    CartPageComponent,
    NotFoundComponent,
    LoginPageComponent,
    RegisterPageComponent,
    PaymentPageComponent,
    OrdersPageComponent,
    AdminHomeComponent,
    AdminOrdersComponent,
    AdminUsersComponent,
    AdminProductsComponent,
    AdminUpdateProductComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas, far);
  }
}
