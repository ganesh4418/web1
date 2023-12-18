import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IntroductionComponent } from './introduction/introduction.component';
import { SoftwareHomeComponent } from './software-home/software-home.component';

const routes: Routes = [
  {
    path: '',
    component: SoftwareHomeComponent,
  },
  {
    path: 'introduction',
    data: {
      breadcrumb: 'Introduction'
    },
    component: IntroductionComponent
  },
  // { 
  // path:'blogs',
  // data: {
  // breadcrumb: 'Blogs'
  // },
  // component:BlogsComponent 
  // },
  // { 
  // path:'our-works',
  // data: {
  // breadcrumb: 'Oue Works'
  // },
  // component:OurWorksComponent 
  // },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SoftwareRoutingModule { }
