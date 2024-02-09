import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { UsersService } from 'src/app/core/services/users/users.service';
import { IUser, IUserData } from 'src/app/core/types/user';
import { IResponse } from 'src/app/core/types/response';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login-user.component.html',
})
export class LoginUserComponent {
  user: IUser = {
    email: '',
    password: '',
    name: '',
    token:'',
    role: 'admin',
  };

  userId: IUserData = {
    id: 0,
  };

  constructor(
    private authService: AuthService,
    private userService: UsersService,
    private router: Router
  ) {}

  onSubmit(loginForm: NgForm) {
    if (loginForm.valid) {
      this.authService.loginUser(this.user).subscribe(
        (response) => {
          if(response && response.token && response.id !== undefined && response.role !== undefined && response.tokenExpiry !== undefined){
            const tokenExpiryDate = new Date(response.tokenExpiry);
            
            // Set the token in AuthService
            this.authService.setToken(response.token);
            this.authService.setUserRole(response.role);
            this.authService.setTokenExp(tokenExpiryDate);
            
            Promise.resolve().then(() => {
              const id = response.id as unknown;
              const userId = id as number;

              // Set the id in AuthService
              this.authService.setUserId(userId);

              // Get user information in UserService
              this.userService.getUser({id: userId}).subscribe(
                (userInfoResponse) => {
                  if (userInfoResponse && userInfoResponse.name && userInfoResponse.id !== undefined) {
                    // Set the user's name and last login in AuthService
                    this.authService.setUserName(userInfoResponse.name);
                    if(userInfoResponse.lastLogin){
                      this.authService.setLastLogin(userInfoResponse.lastLogin);
                    }
                  
                  }
                },
                (userInfoError) => {
                  console.error('Error fetching user info:', userInfoError);
                }
              );

              // Handle successful login
              console.log('Login successful');
              alert('Login successful');

              this.router.navigate(['/profile']);
            });
          }
          
        },
        (error) => {
          // Handle login error
          console.error('Login failed', error);
          if (error.error && error.error.message) {
            alert(error.error.message);
        }
        }
      );
    }
  }
}

