import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogDetailsComponent } from 'src/app/shared/components/blogs/blog-details/blog-details.component';
import { DesignHomeComponent } from './design-home/design-home.component';
import { DesignComponent } from './design.component';

const routes: Routes = [
  {
    path: '',
    data: {
      breadcrumb: 'Introduction'
    },
    component: DesignComponent
  },
  {
    path: 'blogs',
    data: {
      breadcrumb: 'Blogs'
    },
    component: BlogDetailsComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DesignRoutingModule { }
