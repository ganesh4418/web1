import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HiringDetailsComponent } from './hiring-details/hiring-details.component';
import { HiringComponent } from './hiring.component';

const routes: Routes = [
  {
    path: '',
    component: HiringComponent
  },
  {
    path: 'hiring-details',
    data: {
      breadcrumb: 'Hiring-details'
    },
    component: HiringDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HiringRoutingModule { }
