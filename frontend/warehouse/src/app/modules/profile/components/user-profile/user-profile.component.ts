import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IUser } from 'src/app/core/types/user';
import { UsersService } from 'src/app/core/services/users/users.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent {
  user: IUser = {
    email: '',
    name: '',
  };

  constructor(
    private usersService: UsersService,
    ) {}

  onSubmit(profileForm: NgForm){
    
  }

}
