import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/core/services/products/products.service';
import { IProduct } from 'src/app/core/types/product';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss']
})
export class AllProductsComponent implements OnInit {

  products: IProduct[] = [];
  tableHeaders: string[] = [];

  constructor(
    private productService: ProductsService,
    private authService: AuthService,) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  private loadProducts(): void {
    this.productService.getAllProducts().subscribe(
      response => {
        if (response.success && response.products !== undefined) {
          this.products = response.products;
          this.tableHeaders = this.getTableHeaders(response.products);
        } else {
          console.error('Failed to load products');
        }
      },
      error => {
        console.error('Error loading products', error);
      }
    );
  }

  private getTableHeaders(products: IProduct[]): string[] {
    // Extract headers from product properties
    const headersSet = new Set<string>();
    products.forEach(product => {
      Object.keys(product).forEach(key => {
        headersSet.add(key);
      });
    });

    return Array.from(headersSet);
  }

  // Delete product by ID
  deleteProduct(productId: number |undefined): void {
    if(productId !== undefined){
      this.productService.deleteProduct(productId).subscribe(
        response => {
          if (response.success) {
            console.log('Product deleted successfully');
            alert('Product deleted successfully');
            // Reload products after deletion
            this.loadProducts();
          } else {
            console.error('Failed to delete product');
          }
        },
        error => {
          console.error('Error deleting product', error);
        }
      );
    }
    else{
      console.error('Invalid product ID');
    }
    
  }

  // Check if the logged-in user is an admin
  isAdmin(): boolean {
    if(this.authService.getUserRole() == "admin"){
      return true;
    }
    else{
      return false;
    }
  }
}
