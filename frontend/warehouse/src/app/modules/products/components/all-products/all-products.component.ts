import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/core/services/products/products.service';
import { IProduct } from 'src/app/core/types/product';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss']
})
export class AllProductsComponent implements OnInit {

  products: IProduct[] = [];

  constructor(private productService: ProductsService) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  private loadProducts(): void {
    this.productService.getAllProducts().subscribe(
      response => {
        if (response.success && response.products !== undefined) {
          this.products = response.products;
        } else {
          console.error('Failed to load products');
        }
      },
      error => {
        console.error('Error loading products', error);
      }
    );
  }
}
