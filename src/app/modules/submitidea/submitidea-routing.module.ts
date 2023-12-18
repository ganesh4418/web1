import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubmitideaComponent } from './submitidea.component';

const routes: Routes = [
  {path:"",component:SubmitideaComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubmitideaRoutingModule { }
