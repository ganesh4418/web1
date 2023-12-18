import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ElectronicsRoutingModule } from './electronics-routing.module';
import { ElectronicsHomeComponent } from './electronics-home/electronics-home.component';
import { ElectronicsIntroductionComponent } from './electronics-introduction/electronics-introduction.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ServicesComponent } from './services/services.component';


@NgModule({
  declarations: [
    ElectronicsHomeComponent,
    ElectronicsIntroductionComponent,
    ServicesComponent
  ],
  imports: [
    CommonModule,
    ElectronicsRoutingModule,
    SharedModule
  ]
})
export class ElectronicsModule { }
