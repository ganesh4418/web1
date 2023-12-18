import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllWorkComponent } from './all-work/all-work.component';

const routes: Routes = [
  { path:'', component:AllWorkComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AllWorkRoutingModule { }
