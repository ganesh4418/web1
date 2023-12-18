import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { SharedModule } from 'src/app/shared/shared.module';
import { ComingSoonComponent } from './coming-soon.component';
import { ComingSoonRoutingModule } from './coming-soon-routing.module';


@NgModule({
  declarations: [
    ComingSoonComponent
  ],
  imports: [
    CommonModule,
    MatTabsModule,
    SharedModule,
    ComingSoonRoutingModule
  ]
})
export class ComingSoonModule { }
