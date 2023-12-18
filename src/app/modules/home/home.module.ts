import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';

import { SwiperModule } from 'swiper/angular';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgwWowModule } from 'ngx-wow';
import { AboutModule } from "../about/about.module";


@NgModule({
    declarations: [
        HomeComponent,
    ],
    imports: [
        CommonModule,
        HomeRoutingModule,
        SharedModule,
        SwiperModule,
        NgwWowModule,
        AboutModule
    ]
})
export class HomeModule { }
