import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// ***************************** Environment ***************************** //
import { environment } from './../environments/environment';

// ***************************** Routing ***************************** //
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';

// ***************************** Firebase ***************************** //
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';

// ***************************** Other modules ***************************** //
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// ***************************** Services ***************************** //
import { AuthGuardService } from './auth-guard.service';
import { AdminAuthGuardService } from './admin-auth-guard.service';
import { AuthService } from './auth.service';
import { UserService } from './user.service';

// ***************************** Components ***************************** //
import { AppComponent } from './app.component';
import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,

    LoginComponent,
    BsNavbarComponent,
    HomeComponent,
    ProductsComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,

    AdminProductsComponent,
    AdminOrdersComponent
  ],
  imports: [
    BrowserModule,

    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,

    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'login', component: LoginComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'shopping-cart', component: ShoppingCartComponent },

      { path: 'my/orders', component: MyOrdersComponent, canActivate: [AuthGuardService] },
      { path: 'checkout', component: CheckOutComponent, canActivate: [AuthGuardService] },
      { path: 'order-success', component: OrderSuccessComponent, canActivate: [AuthGuardService] },

      { path: 'admin/products', component: AdminProductsComponent, canActivate: [AuthGuardService, AdminAuthGuardService] },
      { path: 'admin/orders', component: AdminOrdersComponent, canActivate: [AuthGuardService, AdminAuthGuardService] },
    ]),
    NgbModule,
  ],
  providers: [
    AuthService,
    AuthGuardService,
    AdminAuthGuardService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
