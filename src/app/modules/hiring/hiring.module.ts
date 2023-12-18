import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HiringRoutingModule } from './hiring-routing.module';
import { HiringComponent } from './hiring.component';
import { MatTabsModule } from '@angular/material/tabs';
import { SharedModule } from 'src/app/shared/shared.module';
import { HiringDetailsComponent } from './hiring-details/hiring-details.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    HiringComponent,
    HiringDetailsComponent
  ],
  imports: [
    CommonModule,
    HiringRoutingModule,
    MatTabsModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class HiringModule { }
