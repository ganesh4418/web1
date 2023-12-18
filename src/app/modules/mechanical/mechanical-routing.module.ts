import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MechanicalHomeComponent } from './mechanical-home/mechanical-home.component';

const routes: Routes = [
  { path: '', component: MechanicalHomeComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MechanicalRoutingModule { }
