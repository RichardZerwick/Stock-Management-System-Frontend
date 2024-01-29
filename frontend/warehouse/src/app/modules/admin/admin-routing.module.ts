import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminChartsComponent } from './components/admin-charts/admin-charts.component';

const routes: Routes = [
  { path: '', component: AdminChartsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
