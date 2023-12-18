import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServicesRoutingModule } from './services-routing.module';
import { ServicesComponent } from './services.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductDesignComponent } from '../design/product-design/product-design.component';
import { DesignModule } from '../design/design.module';
import { ServiceDetailsComponent } from './service-details/service-details.component';
import { SoftwareModule } from '../software/software.module';
import { MatIconModule } from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
@NgModule({
  declarations: [
    ServicesComponent,
    ServiceDetailsComponent
  ],
  imports: [
    CommonModule,
    ServicesRoutingModule,
    SharedModule,
    DesignModule,
    SoftwareModule,  
    MatMenuModule,
    MatIconModule,
  ]
})
export class ServicesModule { }
