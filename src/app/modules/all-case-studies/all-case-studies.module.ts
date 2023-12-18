import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AllCaseStudiesRoutingModule } from './all-case-studies-routing.module';
import { AllCaseStudiesComponent } from './all-case-studies/all-case-studies.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { StudyTemplateComponent } from './study-template/study-template.component';
import { ComingSoonModule } from 'src/app/shared/components/coming-soon/coming-soon.module';
import { IndividualcasestudyComponent } from './individualcasestudy/individualcasestudy.component';



@NgModule({
  declarations: [
    AllCaseStudiesComponent,
    StudyTemplateComponent,
    IndividualcasestudyComponent
  ],
  imports: [
    CommonModule,
    AllCaseStudiesRoutingModule,
    SharedModule
  ]
})
export class AllCaseStudiesModule { }
