import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IUser, IUserData } from 'src/app/core/types/user';
import { UsersService } from 'src/app/core/services/users/users.service';
import { AuthService } from '../../../../core/services/auth/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent {
  userId: IUserData = {
    id: 0,
  };

  user: IUser = {
    name: '',
    email: '',
  };

  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    this.fetchUserData(); // Fetch user data when the component initializes
  }

  fetchUserData() {
    const userId = this.authService.getUserId();
    console.log(userId);
    if (userId) {
      this.usersService.getUser({ id: userId }).subscribe(
        (response) => {
          console.log('User Data:', response);
          if (response && response.id) {
            this.user = response; // Assign fetched user data to 'user' property directly
          }
        },
        (error) => {
          console.error('Failed to fetch user data', error);
          // Handle error
        }
      );
    } else {
      console.error('User ID not found');
    }
  }

  onSubmit(profileForm: NgForm){
    if (profileForm.valid) {
      const userId = this.authService.getUserId();
      if(userId){
        this.usersService.updateUser({id: userId}, this.user).subscribe(
          (response) => {
            if(response){
              // Handle successful login
              console.log('Updated successfully');
              alert('Updated successfully');

              // Get user information in UserService
              this.usersService.getUser({id: userId}).subscribe(
                (userInfoResponse) => {
                  if (userInfoResponse && userInfoResponse.name && userInfoResponse.id !== undefined) {
                    // Set the user's name in AuthService
                    this.authService.setUserName(userInfoResponse.name);
                  }
                },
                (userInfoError) => {
                  console.error('Error fetching user info:', userInfoError);
                }
              );

            }
          },
          (error) => {
            // Handle login error
            console.error('Update failed', error);
            if (error.error && error.error.message) {
              alert(error.error.message);
          }
          }
        );
      } else{
        console.error('Error updating user information');
      }
      
    }
  }

}
