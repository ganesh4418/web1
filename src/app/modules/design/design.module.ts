import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DesignRoutingModule } from './design-routing.module';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from 'src/app/shared/shared.module';
import { DesignHomeComponent } from './design-home/design-home.component';
import { DesignIntroductionComponent } from './design-introduction/design-introduction.component';
import { DesignComponent } from './design.component';
import { ProductDesignComponent } from './product-design/product-design.component';
import { UiuxdesignComponent } from './uiuxdesign/uiuxdesign.component';
import { GraphicsdesignComponent } from './graphicsdesign/graphicsdesign.component';
import { AnimationComponent } from './animation/animation.component';
import { PhotographyComponent } from './photography/photography.component';
import { AppearDirective } from 'src/app/shared/directives/appear';


@NgModule({
  declarations: [
    DesignComponent,
    DesignHomeComponent,
    DesignIntroductionComponent,
    ProductDesignComponent,
    UiuxdesignComponent,
    GraphicsdesignComponent,
    AnimationComponent,
    PhotographyComponent,
    AppearDirective
  ],
  imports: [
    CommonModule,
    DesignRoutingModule,
    SharedModule,
    MatTabsModule,
    MatMenuModule,
    MatIconModule,
    
  ],
  exports:[
    DesignComponent,
    DesignHomeComponent,
    DesignIntroductionComponent,
    ProductDesignComponent,
    UiuxdesignComponent,
    GraphicsdesignComponent,
    AnimationComponent,
    PhotographyComponent,
    AppearDirective
  ]
})
export class DesignModule { }
