import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL, ProductEndPoints } from '../const';
import { IProduct, IProductData } from '../../types/product';
import { IResponse } from '../../types/response';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(
    private http: HttpClient, 
    private authService: AuthService) { }

  // Create new product
  createProduct(product: IProduct): Observable<IResponse<IProductData>> {
    return this.authService.makeAuthenticatedRequest<IResponse<IProductData>>(
      `${API_URL}${ProductEndPoints.CREATE}`, 
      'post', 
      product
    );
  }

  // Retrieve all products
  getAllProducts(): Observable<IResponse<IProduct[]>> {
    return this.authService.makeAuthenticatedRequest<IResponse<IProduct[]>>(
      `${API_URL}${ProductEndPoints.RETRIEVE}`, 
      'get'
    );
  }

  // Delete a product
  deleteProduct(productId: number): Observable<IResponse<any>> {
    return this.authService.makeAuthenticatedRequest<IResponse<any>>(
      `${API_URL}${ProductEndPoints.DELETE}/${productId}`, 
      'delete'
    );
  }

}
