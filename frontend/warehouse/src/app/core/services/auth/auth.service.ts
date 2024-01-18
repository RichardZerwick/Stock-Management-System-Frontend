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
  private userId: number | null = null; // User ID property
  private userName: string | null = null; // User Name property

  constructor(
    private http: HttpClient,
    private apiService: ApiService) {
    // Initialize token from local storage if available
    this.token = localStorage.getItem('token');
    //this.userId = parseInt(localStorage.getItem('userId') || '', 10);
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
  
  // Save the currently logged-in user's ID to local storage
  setUserId(userData: number | undefined): void {
    if (userData && (userData !== null && userData !== undefined)) {
      this.userId = userData;
      localStorage.setItem('userId', userData.toString());
    } else {
      // Handle the case where userData.id is null or undefined
      console.error('Invalid user data provided for setUserId');
    }
  }

  // Get the currently logged-in user's ID from local storage
  getUserId(): number | null {
    return this.userId;
  }

  // Save the currently logged-in user's name
  setUserName(name: string | null): void {
    this.userName = name;
  }

  // Get the currently logged-in user's name
  getUserName(): string | null {
    return this.userName;
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
