import { switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';

import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { ProductService } from 'shared/services/product.service';

import { ShoppingCart } from 'shared/models/shopping-cart.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products = [];
  filteredProducts = [];

  category: string = null;

  shoppingCart$: Observable<ShoppingCart>;

  observableSubscription: Subscription;

  constructor(
    private aroute: ActivatedRoute,
    private productService: ProductService,
    private shoppingCartService: ShoppingCartService
  ) {

  }

  async ngOnInit(): Promise<void> {
    this.getProducts();
    this.getShoppingCart();
  }

  private getProducts() {
    this.productService.getAll()
      .pipe(
        switchMap(
          (products) => {
            this.products = products
            return this.aroute.queryParamMap;
          }
        )
      ).subscribe(
        (qParamsMap) => {
          this.category = qParamsMap.get('category') || null;
          this.filterProduct();
        }
      );
  }

  private filterProduct() {
    this.filteredProducts = this.category
      ? this.products.filter(p => (p.category as string).toLowerCase().includes(this.category.toLowerCase()))
      : this.products;
  }

  private async getShoppingCart() {
    this.shoppingCart$ = await this.shoppingCartService.getById();
  }
}