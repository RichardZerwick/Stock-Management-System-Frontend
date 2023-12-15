import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUser, IUserData } from '../../types/user';
import { IResponse } from '../../types/response';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token: string | null = null; // Token property

  constructor(
    private http: HttpClient,
    private apiService: ApiService) {
    // Initialize token from local storage if available
    this.token = localStorage.getItem('token');
  }

  // User Registration
  registerUser(user: IUser): Observable<IResponse<IUserData>> {
    return this.apiService.registerUser(user);
  }

  // User Login
  loginUser(user: IUser): Observable<IResponse<IUserData>> {
    return this.apiService.loginUser(user);
  }

  isLoggedIn(): boolean{
    return !!localStorage.getItem('token');
  }

  logoutUser(): void{
    this.setToken(null);
  }

  // Set the token
  setToken(token: string | null) {
    this.token = token;
    // Store the token in local storage
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }

  // Get the token
  getToken(): string | null {
    return this.token;
  }

  // Attach token to HTTP headers
  attachTokenToHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    if (this.token) {
      headers = headers.set('Authorization', `Bearer ${this.token}`);
    }
    return headers;
  }

  // Include this method to make HTTP requests with the token attached to headers
  // For example, when making authenticated API requests
  makeAuthenticatedRequest<T>(url: string, method: 'get' | 'post' | 'put' | 'delete', data?: any): Observable<T> {
    const headers = this.attachTokenToHeaders();
    const requestOptions = { headers };

    if (method === 'get') {
      return this.http.get<T>(url, requestOptions);
    } else if (method === 'post') {
      return this.http.post<T>(url, data, requestOptions);
    } else if (method === 'put') {
      return this.http.put<T>(url, data, requestOptions);
    } else if (method === 'delete') {
      return this.http.delete<T>(url, requestOptions);
    }

    throw new Error('Invalid HTTP method provided');
  }
}
