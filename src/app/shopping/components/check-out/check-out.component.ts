import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';

import { ShoppingCartService } from 'shared/services/shopping-cart.service';

import { ShoppingCart } from 'shared/models/shopping-cart.model';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss']
})
export class CheckOutComponent implements OnInit {
  shoppingCart$: Observable<ShoppingCart>;

  constructor(private shoppingCartService: ShoppingCartService) {

  }

  async ngOnInit() {
    this.shoppingCart$ = await this.shoppingCartService.getById();
  }
}
