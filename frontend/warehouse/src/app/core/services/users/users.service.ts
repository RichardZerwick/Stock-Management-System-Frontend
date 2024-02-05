import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL, UserEndPoints } from '../const';
import { IUser, IUserData } from '../../types/user';
import { IResponse } from '../../types/response';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private http: HttpClient,
    private authService: AuthService) {}

  // Fetch User Information
  getUser(userId: IUserData): Observable<IResponse<IUserData>> {
    return this.authService.makeAuthenticatedRequest<IResponse<IUserData>>(
      `${API_URL}${UserEndPoints.RETRIEVE}/${userId.id}`,
      'get'
    );
  }

  // Update User Profile
  updateUser(userId: IUserData, userData: IUser): Observable<IResponse<IUserData>> {
    return this.authService.makeAuthenticatedRequest<IResponse<IUserData>>(
      `${API_URL}${UserEndPoints.UPDATE}/${userId.id}`,
      'put',
      userData
    );
  }
}
