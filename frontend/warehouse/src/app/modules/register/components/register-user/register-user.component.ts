import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { IUser } from 'src/app/core/types/user';

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

  constructor(private authService: AuthService) {}

  onSubmit(registrationForm: NgForm) {
    if (registrationForm.valid) {
      // Call your user service to register the user
      this.authService.registerUser(this.user).subscribe(
        (response) => {
          if(response && response.token){
            // Set the token in AuthService
            this.authService.setToken(response.token);
            console.log('User registered successfully');
            alert('User registered successfully');
          }
          else{
            console.error('Token missing in the response');
            alert('Token missing in the response');
          }
          
          
          // Handle successful registration
          console.log('User registered successfully');
          alert('User registered successfully');
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
