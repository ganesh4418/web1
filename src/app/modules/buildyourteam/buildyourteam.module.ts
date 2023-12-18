import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BuildyourteamRoutingModule } from './buildyourteam-routing.module';
import {DragDropModule} from '@angular/cdk/drag-drop';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BuildyourteamRoutingModule,
    DragDropModule
  ]
})
export class BuildyourteamModule { }
