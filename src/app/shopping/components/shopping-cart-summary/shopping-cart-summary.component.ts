import { ShoppingCart } from 'shared/models/shopping-cart.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-shopping-cart-summary',
  templateUrl: './shopping-cart-summary.component.html',
  styleUrls: ['./shopping-cart-summary.component.scss']
})
export class ShoppingCartSummaryComponent implements OnInit {
  @Input('shoppingCart') shoppingCart: ShoppingCart;
  constructor() {

  }

  ngOnInit(): void {

  }
}
