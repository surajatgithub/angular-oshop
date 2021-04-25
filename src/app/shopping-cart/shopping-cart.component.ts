import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';

import { ShoppingCartService } from './../shopping-cart.service';

import { ShoppingCart } from './../model/shopping-cart.model';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  shoppingCart$: Observable<ShoppingCart>;

  constructor(
    private shoppingCartService: ShoppingCartService
  ) {

  }

  clearCart() {
    this.shoppingCartService.clearCart();
  }

  async ngOnInit() {
    this.shoppingCart$ = await this.shoppingCartService.getById();
  }
}
