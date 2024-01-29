import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL, ProductEndPoints } from '../const';
import { IProduct, IProductData } from '../../types/product';
import { IResponse } from '../../types/response';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  // Create new product
  createProduct(product: IProduct): Observable<IResponse<IProductData>> {
    return this.http.post<IResponse<IProductData>>(`${API_URL}${ProductEndPoints.CREATE}`, product);
  }

  // Retrieve all products
  getAllProducts(): Observable<IResponse<IProduct[]>> {
    return this.http.get<IResponse<IProduct[]>>(`${API_URL}${ProductEndPoints.RETRIEVE}`);
  }

  // Delete a product
  deleteProduct(productId: number): Observable<IResponse<any>> {
    return this.http.delete<IResponse<IProductData>>(`${API_URL}${ProductEndPoints.DELETE}/${productId}`);
  }

}
