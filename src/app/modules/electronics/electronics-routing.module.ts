import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ElectronicsHomeComponent } from './electronics-home/electronics-home.component';
import { ServicesComponent } from './services/services.component';

const routes: Routes = [
  { path:'', component:ElectronicsHomeComponent },
  {
    path: 'services',
    component: ServicesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ElectronicsRoutingModule { }
