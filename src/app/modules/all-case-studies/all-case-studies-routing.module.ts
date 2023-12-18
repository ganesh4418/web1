import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllCaseStudiesComponent } from './all-case-studies/all-case-studies.component';
import { IndividualcasestudyComponent } from './individualcasestudy/individualcasestudy.component';


const routes: Routes = [
  { path:'', component:AllCaseStudiesComponent},
  {path:"casestudy-details",component:IndividualcasestudyComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AllCaseStudiesRoutingModule { }
