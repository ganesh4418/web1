import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuildyourteamComponent } from './buildyourteam.component';

const routes: Routes = [
  {
    path: '',
    component: BuildyourteamComponent
  },
  {
    path: 'hiring-details',
    component: BuildyourteamComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BuildyourteamRoutingModule { }
