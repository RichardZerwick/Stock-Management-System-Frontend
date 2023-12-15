import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUser, IUserData } from '../../types/user';
import { IResponse } from '../../types/response';
import { API_URL, AuthEndPoints } from '../const';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {}

  registerUser(user: IUser): Observable<IResponse<IUserData>> {
    return this.http.post<IResponse<IUserData>>(`${API_URL}${AuthEndPoints.REGISTER}`, user);
  }

  loginUser(user: IUser): Observable<IResponse<IUserData>> {
    return this.http.post<IResponse<IUserData>>(`${API_URL}${AuthEndPoints.LOGIN}`, user);
  }
}
