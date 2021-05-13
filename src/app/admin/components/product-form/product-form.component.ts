import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ProductService } from 'shared/services/product.service';
import { CategoryService } from 'shared/services/category.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  categories$;

  productId: string = null;
  productRef$;
  product: any = {
    key: null,
    title: null,
    price: null,
    category: null,
    imageUrl: null
  };

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.categories$ = this.categoryService.getAll();

    // Get product details
    this.productId = this.route.snapshot.paramMap.get('id');
    this.productService.getById(this.productId).subscribe(
      (product) => {
        if (product) {
          product['key'] = this.productId;
          this.product = product;
        }
      }
    );
  }

  ngOnInit(): void {

  }

  save(product) {
    if (this.productId) {
      this.productService.update(this.productId, product);
    } else {
      this.productService.create(product);
    }

    this.router.navigate(['/admin/products']);
  }

  delete() {
    if (confirm('Are you sure wnat to delete this product?')) {
      this.productService.delete(this.productId);
      this.router.navigate(['/admin/products']);
    }
  }
}