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

  ngOnInit() {
    console.log(this.authService.getTokenExp());
    console.log(this.authService.getToken());
    if (this.authService.getToken() !== null && this.authService.getTokenExp() !== null) {
      const tokenExpValue = new Date(this.authService.getTokenExp() || '');
      
      if (tokenExpValue instanceof Date) {
        const tokenExpTimestamp: number = tokenExpValue.getTime();
        
        if (Date.now() <= tokenExpTimestamp) {
          console.log('token is valid');

          const userId = this.authService.getUserId();
          // Get user information in UserService
          this.userService.getUser({id: userId}).subscribe(
            (userInfoResponse) => {
              if (userInfoResponse && userInfoResponse.name && userInfoResponse.id !== undefined) {
                console.log(userInfoResponse.email);
                console.log(userInfoResponse.password);
                this.user.email = userInfoResponse.email;
                this.user.password = userInfoResponse.password;

                this.authService.loginUser(this.user)
                alert('Login successful');
                this.router.navigate(['/profile']);
              }
            },
            (userInfoError) => {
              console.error('Error fetching user info:', userInfoError);
            }
          );
          
          
        } else {
          console.log('Token has expired');
        }
      } else {
        // Handle the case where tokenExpValue is not a Date
        console.error('Unexpected type for token expiration:', typeof tokenExpValue);
      }
    }
    else {
      console.log('Invalid token or token expiry');
    }
  }

  onSubmit(loginForm: NgForm) {
    if (loginForm.valid) {
      this.authService.loginUser(this.user).subscribe(
        (response) => {
          console.log(response);
          if(response && response.token && response.id !== undefined){
            // Set the token in AuthService
            this.authService.setToken(response.token);

            Promise.resolve().then(() => {
              console.log(response.id);
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

