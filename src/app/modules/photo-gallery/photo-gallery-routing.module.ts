import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PhotoGalleryComponent } from './photo-gallery.component';
import { ResourceComponent } from './resource/resource.component';

const routes: Routes = [
  {
    path: '',
    component: PhotoGalleryComponent
  },
  {
      path: 'resources',
      component: ResourceComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PhotoGalleryRoutingModule { }
