import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductsRoutingModule } from './products-routing.module';
import { AddProductsComponent } from './components/add-products/add-products.component';
import { AllProductsComponent } from './components/all-products/all-products.component';


@NgModule({
  declarations: [
    AddProductsComponent,
    AllProductsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ProductsRoutingModule
  ]
})
export class ProductsModule { }
