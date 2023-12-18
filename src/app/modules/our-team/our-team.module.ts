import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OurTeamRoutingModule } from './our-team-routing.module';
import { OurTeamComponent } from './our-team.component';
import { MatTabsModule } from '@angular/material/tabs';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    OurTeamComponent
  ],
  imports: [
    CommonModule,
    OurTeamRoutingModule,
    MatTabsModule,
    SharedModule
  ]
})
export class OurTeamModule { }
