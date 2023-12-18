import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SoftwareRoutingModule } from './software-routing.module';
import { IntroductionComponent } from './introduction/introduction.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { SoftwareHomeComponent } from './software-home/software-home.component';
import { ServicesComponent } from './services/services.component';
import { ArVrComponent } from './ar-vr/ar-vr.component';
import { ArchitectureDesignComponent } from './architecture-design/architecture-design.component';
import { ConsultingStaffingComponent } from './consulting-staffing/consulting-staffing.component';
import { DataScienceComponent } from './data-science/data-science.component';
import { InfraServiceComponent } from './infra-service/infra-service.component';
import { MobileWebDevelopementComponent } from './mobile-web-developement/mobile-web-developement.component';
import { ProductDevelopementComponent } from './product-developement/product-developement.component';
import { TechnologyConsultingComponent } from './technology-consulting/technology-consulting.component';





@NgModule({
  declarations: [
    IntroductionComponent,
    SoftwareHomeComponent,
    ServicesComponent,
    ProductDevelopementComponent,
    MobileWebDevelopementComponent,
    ArVrComponent,
    ArchitectureDesignComponent,
    DataScienceComponent,
    ConsultingStaffingComponent,
    InfraServiceComponent,
    TechnologyConsultingComponent,
  ],
  imports: [
    CommonModule,
    SoftwareRoutingModule,
    SharedModule
  ],
  exports:[
    IntroductionComponent,
    SoftwareHomeComponent,
    ServicesComponent,
    ProductDevelopementComponent,
    MobileWebDevelopementComponent,
    ArVrComponent,
    ArchitectureDesignComponent,
    DataScienceComponent,
    ConsultingStaffingComponent,
    InfraServiceComponent,
    TechnologyConsultingComponent,
  ]
})
export class SoftwareModule { }