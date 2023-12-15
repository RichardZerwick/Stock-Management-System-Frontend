import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
//import { HomeContentComponent } from './home-content/home-content.component';
import { HomeComponent } from './home.component';


@NgModule({
  declarations: [
    //HomeContentComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
