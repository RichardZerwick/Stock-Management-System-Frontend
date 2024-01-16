import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { IUser } from 'src/app/core/types/user';
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

  constructor(
    private authService: AuthService,
    private router: Router
    ) {}

  onSubmit(loginForm: NgForm) {
    if (loginForm.valid) {
      this.authService.loginUser(this.user).subscribe(
        (response) => {
          if(response && response.token){
            // Set the token in AuthService
            this.authService.setToken(response.token);

            // Handle successful login
            console.log('Login successful');
            alert('Login successful');

            //Store the token in local storage (for demonstration purposes)
            localStorage.setItem('token', response.token);

            this.router.navigate(['/profile']);
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

