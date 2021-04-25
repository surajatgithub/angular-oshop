import { Component, OnInit, Input } from '@angular/core';

import { ShoppingCartService } from './../shopping-cart.service';

import { Product } from './../model/product.model';
import { ShoppingCart } from './../model/shopping-cart.model';

@Component({
  selector: 'app-product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.scss']
})
export class ProductQuantityComponent implements OnInit {
  @Input('product') product: Product;
  @Input('shoppingCart') shoppingCart: ShoppingCart;

  constructor(
    private cartService: ShoppingCartService
  ) {

  }

  addToCart() {
    this.cartService.addToCart(this.product);
  }

  removeFromCart() {
    this.cartService.removeFromCart(this.product);
  }

  ngOnInit(): void {

  }
}
