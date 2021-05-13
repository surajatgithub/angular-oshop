import { ProductService } from 'shared/services/product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnInit {
  products;
  filteredProducts;

  constructor(private productService: ProductService) {
    this.productService.products$.subscribe(
      (products) => {
        this.products = this.filteredProducts = products;
      }
    );
  }

  filter(filter: string = null) {
    this.filteredProducts = filter
      ? this.products.filter(p => (p.title as string).toLocaleLowerCase().includes(filter.toLocaleLowerCase()))
      : this.products;
  }

  ngOnInit(): void {

  }
}
