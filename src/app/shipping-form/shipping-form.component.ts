import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ShoppingCart } from '../model/shopping-cart.model';
import { Shipping } from '../model/shipping.model';
import { Router } from '@angular/router';
import { OrderService } from '../order.service';
import { Order } from '../model/order.model';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.scss']
})
export class ShippingFormComponent implements OnInit {
  @Input('shoppingCart') shoppingCart: ShoppingCart;

  authUserSubscription: Subscription;
  userId: string;
  shippingDetails: Shipping = {
    name: null,
    addressLine1: null,
    addressLine2: null,
    city: null
  };

  constructor(
    private orderService: OrderService,
    private authService: AuthService,
    private router: Router
  ) {

  }

  async checkout() {
    let result = await this.orderService.saveOrder(new Order(
      this.userId,
      this.shippingDetails,
      this.shoppingCart
    ));

    this.router.navigate(['/order-success', result.key]);
  }

  ngOnInit(): void {
    this.authUserSubscription = this.authService.user$.subscribe((authUser) => { this.userId = authUser.uid; });
  }

  onDestroy() {
    this.authUserSubscription.unsubscribe();
  }
}
