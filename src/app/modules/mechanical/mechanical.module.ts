import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MechanicalRoutingModule } from './mechanical-routing.module';
import { MechanicalIntroductionComponent } from './mechanical-introduction/mechanical-introduction.component';
import { MechanicalHomeComponent } from './mechanical-home/mechanical-home.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    MechanicalIntroductionComponent,
    MechanicalHomeComponent
  ],
  imports: [
    CommonModule,
    MechanicalRoutingModule,
    SharedModule
  ]
})
export class MechanicalModule { }
