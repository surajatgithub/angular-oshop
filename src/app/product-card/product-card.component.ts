import { Component, OnInit, Input } from '@angular/core';
import { ShoppingCartService } from './../shopping-cart.service';
import { ShoppingCart } from './../model/shopping-cart.model';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {
  @Input('product') product;
  @Input('showActions') showActions: boolean;
  @Input('shoppingCart') shoppingCart: ShoppingCart;

  constructor(private cartService: ShoppingCartService) {

  }

  addToCart() {
    this.cartService.addToCart(this.product);
  }

  // getProductQuantityInCart() {
  //   return this.shoppingCart.getIemQuantity(this.product.key);
  // }

  ngOnInit(): void {

  }
}
