import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RegisterRoutingModule } from './register-routing.module';
import { RegisterUserComponent } from './components/register-user/register-user.component';


@NgModule({
  declarations: [
    RegisterUserComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RegisterRoutingModule
  ]
})
export class RegisterModule { }
