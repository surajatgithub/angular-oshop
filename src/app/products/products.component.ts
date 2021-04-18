import { switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products = [];
  filteredProducts = [];
  category: string = null;

  constructor(
    private aroute: ActivatedRoute,
    private productService: ProductService
  ) {
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
          this.filteredProducts = this.category
            ? this.products.filter(p => (p.category as string).toLowerCase().includes(this.category.toLowerCase()))
            : this.products;
        }
      );
  }

  ngOnInit(): void {

  }
}
