import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IProduct } from 'src/app/core/types/product';
import { ProductsService } from 'src/app/core/services/products/products.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.scss']
})
export class AddProductsComponent {

  product: IProduct = {
    product_name: '',
    product_quantity: 0,
    product_category: 'food',
    createdBy: 0,
  };

  constructor(
    private productsService: ProductsService,
    private authService: AuthService){}
  
  onSubmit(addProductsForm: NgForm){
    const id = this.authService.getUserId();

    if(addProductsForm.valid && id !== null && this.product.product_quantity !== undefined){
      this.product.createdBy = id;
      
      if(this.product.product_quantity > 0 && this.product.product_quantity <= 100 && Number.isInteger(this.product.product_quantity)){
        this.productsService.createProduct(this.product).subscribe(
          (response) => {
            if(response.success){
              console.log("Product added successfully");
              alert("Product added successfully");
  
              addProductsForm.resetForm();
            }
            else{
              console.error('Failed to add product');
              alert('Failed to add product');
            }
          },
          (error) => {
            // Handle error
            console.error('Failed to add product', error);
            if (error.error && error.error.message) {
              alert(error.error.message);
          }
        }
        );
      }
      else{
        console.log("Please enter valid product quantity");
        alert("Please enter valid product quantity");
      }
      
    }
  }

}
