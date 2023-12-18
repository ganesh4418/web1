import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AyuRoutingModule } from './ayu-routing.module';
import { AyuComponent } from './ayu.component';
import { OverviewComponent } from './overview/overview.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { SwiperModule } from 'swiper/angular';
import { TechspecsComponent } from './techspecs/techspecs.component';
import { AllWorkSliderComponent } from '../about/all-work-slider/all-work-slider/all-work-slider.component';
import { AboutModule } from '../about/about.module';


@NgModule({
  declarations: [
    AyuComponent,
    OverviewComponent,
    TechspecsComponent
  ],
  imports: [
    CommonModule,
    AyuRoutingModule,
    SharedModule,
    SwiperModule,
    AboutModule
   
  ]
})
export class AyuModule { }
