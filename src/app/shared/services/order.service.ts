import { ShoppingCartService } from './shopping-cart.service';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private ordersRef$;

  constructor(
    private afDatabase: AngularFireDatabase,
    private shoppingCartService: ShoppingCartService
  ) {
    this.ordersRef$ = this.afDatabase.list('/orders/');
  }

  async saveOrder(order) {
    let result = await this.ordersRef$.push(order);
    this.shoppingCartService.clearCart();
    return result;
  }
}
