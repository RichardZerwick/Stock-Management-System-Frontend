import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL, UserEndPoints } from '../const';
import { IUser, IUserData } from '../../types/user';
import { IResponse } from '../../types/response';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) {}

  // Fetch User Information
  getUser(userId: IUserData): Observable<IResponse<IUserData>> {
    return this.http.get<IResponse<IUserData>>(`${API_URL}${UserEndPoints.RETRIEVE}/${userId.id}`);
  }

  // Update User Profile
  updateUser(userId: IUserData, userData: IUser): Observable<IResponse<IUserData>> {
    return this.http.put<IResponse<IUserData>>(`${API_URL}${UserEndPoints.UPDATE}/${userId.id}`, userData);
  }
}
