import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutRoutingModule } from './about-routing.module';
import { AboutComponent } from './about.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { SwiperModule } from 'swiper/angular';
import { AllWorkSliderComponent } from './all-work-slider/all-work-slider/all-work-slider.component';


@NgModule({
  declarations: [
    AboutComponent,
    AllWorkSliderComponent
  ],
  imports: [
    CommonModule,
    AboutRoutingModule,
    SharedModule,
    SwiperModule
  ],
  exports:[
    AllWorkSliderComponent
  ]
})
export class AboutModule { }
