import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { IUser } from 'src/app/core/types/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
})
export class RegisterUserComponent {
  user: IUser = {
    name: '',
    password: '',
    token: '',
    role: 'admin', // Set the default role
  };

  constructor(
    private authService: AuthService,
    private router: Router) {}

  onSubmit(registrationForm: NgForm) {
    if (registrationForm.valid) {
      // Call your user service to register the user
      this.authService.registerUser(this.user).subscribe(
        (response) => {
          if(response && response.token && response.tokenExpiry){
            const tokenExpiryDate = new Date(response.tokenExpiry);
            // Set the token and token expiry in AuthService
            this.authService.setToken(response.token);
            this.authService.setTokenExp(tokenExpiryDate);
  
            console.log('User registered successfully');
            alert('User registered successfully');

            this.router.navigate(['/login']);
          }
          else{
            console.error('Token missing in the response');
            alert('Token missing in the response');
          }
          
        },
        (error) => {
          // Handle registration error
          console.error('Registration failed', error);
          if (error.error && error.error.message) {
            alert(error.error.message);
        }
      }
      );
    }
  }
}
