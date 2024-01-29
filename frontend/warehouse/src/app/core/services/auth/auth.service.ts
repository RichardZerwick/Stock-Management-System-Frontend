import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUser, IUserData } from '../../types/user';
import { IResponse } from '../../types/response';
import { ApiService } from '../api/api.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData: IUserData = {
    id: 0,
  };

  user: IUser = {
    role: 'admin',
  }
  
  private token: string | null = null; // Token property
  private tokenExp: Date | null = null; // Token expiry property
  private userId: number | null = null; // User ID property
  private userName: string | null = null; // User Name property
  private lastLogin: Date | null = null; // Last Login property
  private role: string | undefined = undefined;

  constructor(
    private http: HttpClient,
    private apiService: ApiService,
    private router: Router) {
    // Initialize token from local storage if available
    this.token = localStorage.getItem('token');
    this.tokenExp = localStorage.getItem('tokenExp')
      ? new Date(localStorage.getItem('tokenExp') || '')
      : null;
    this.userId = parseInt(localStorage.getItem('userId') || '', 10);
    this.lastLogin = localStorage.getItem('lastLogin')
      ? new Date(localStorage.getItem('lastLogin') || '')
      : null;
    this.role = localStorage.getItem('role') || undefined;
    this.userName = localStorage.getItem('userName');
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
    return !!this.token && !!this.lastLogin;
  }

  logoutUser(): void{
    this.setToken(null);
    this.setTokenExp(null);
    this.setLastLogin(null);
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    localStorage.removeItem('role');
    this.router.navigate(['/login']);
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

  // Set the token expriry
  setTokenExp(tokenExp: Date | null) {
    this.tokenExp = tokenExp;
    // Store the token expiry in local storage
    if(tokenExp){
      localStorage.setItem('tokenExp', tokenExp.toString());
    }else{
      localStorage.removeItem('tokenExp');
    }
  }

  // get the token expiry
  getTokenExp(): Date | null {
    return this.tokenExp;
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
    if(name !== null)
    localStorage.setItem('userName', name);
  }

  // Get the currently logged-in user's name
  getUserName(): string | null {
    return this.userName;
  }

  // Save the last login timestamp
  setLastLogin(lastLogin: Date | null): void {
    this.lastLogin = lastLogin;
    if (lastLogin) {
      localStorage.setItem('lastLogin', lastLogin.toString());
    } else {
      localStorage.removeItem('lastLogin');
    }
  }

  // Get the last login timestamp
  getLastLogin(): Date | null {
    return this.lastLogin;
  }

  // Save the user's role
  setUserRole(role: string): void {
    this.role = role;
    if(role){
      localStorage.setItem('role', role);
    }else{
      localStorage.removeItem('role');
    }
  }

  // Get the user's role
  getUserRole(): string | undefined {
    return this.role;
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
