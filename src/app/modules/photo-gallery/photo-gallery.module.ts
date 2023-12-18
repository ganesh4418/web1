import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PhotoGalleryRoutingModule } from './photo-gallery-routing.module';
import { EventsComponent } from './events/events.component';
import { ResourceComponent } from './resource/resource.component';
import { PhotoGalleryComponent } from './photo-gallery.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatTabsModule } from '@angular/material/tabs';
import { ImagePopupComponent } from './image-popup/image-popup.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    EventsComponent,
    ResourceComponent,
    PhotoGalleryComponent,
    ImagePopupComponent
  ],
  imports: [
    CommonModule,
    PhotoGalleryRoutingModule,
    SharedModule,
    MatTabsModule,
    FormsModule
  ]
})
export class PhotoGalleryModule { }
