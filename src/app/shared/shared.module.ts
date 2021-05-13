import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CustomFormsModule } from 'ng2-validation';

import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductQuantityComponent } from './components/product-quantity/product-quantity.component';
import { AuthGuardService } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { CategoryService } from './services/category.service';
import { OrderService } from './services/order.service';
import { ProductService } from './services/product.service';
import { UserService } from './services/user.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from '../app-routing.module';
import { AngularFireDatabaseModule } from '@angular/fire/database';

@NgModule({
  declarations: [
    ProductCardComponent,
    ProductQuantityComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    CustomFormsModule,
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    AngularFireDatabaseModule,
  ],
  providers: [
    AuthService,
    AuthGuardService,
    UserService,
    CategoryService,
    ProductService,
    OrderService
  ],
  exports: [
    // Modules
    CommonModule,
    FormsModule,
    CustomFormsModule,
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    AngularFireDatabaseModule,

    // Components
    ProductCardComponent,
    ProductQuantityComponent
  ],
})
export class SharedModule { }
