import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminChartsComponent } from './components/admin-charts/admin-charts.component';
import { ProductsEventsService } from 'src/app/core/services/products/products-events.service';

@NgModule({
  declarations: [
    AdminChartsComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
  ],
  providers: [
    ProductsEventsService
  ]
})
export class AdminModule { }
