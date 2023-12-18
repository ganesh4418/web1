import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewsComponent } from './shared/components/news/news.component';
import { SearchResultComponent } from './shared/components/search-result/search-result.component';
import { SubmittedConfirmComponent } from './shared/components/submitted-confirm/submitted-confirm.component';
import { AllProductsComponent } from './modules/all-work/all-products/all-products.component';
import { ResourceComponent } from './modules/photo-gallery/resource/resource.component';

const routes: Routes = [
  {
    path: '',
    data: {
      breadcrumb: 'Home'
    },
    loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'our-team',
    data: {
      breadcrumb: 'Our Team'
    },
    loadChildren: () => import('./modules/our-team/our-team.module').then(m => m.OurTeamModule)
  },
  {
    path: 'design',
    data: {
      breadcrumb: 'Design'
    },
    loadChildren: () => import('./modules/design/design.module').then(m => m.DesignModule)
  },
  {
    path: 'software',
    data: {
      breadcrumb: 'Software'
    },
    loadChildren: () => import('./modules/software/software.module').then(m => m.SoftwareModule)
  },
  {
    path: 'all-case-studies',
    data: {
      breadcrumb: 'All Case Studies'
    },
    loadChildren: () => import('./modules/all-case-studies/all-case-studies.module').then(m => m.AllCaseStudiesModule)
  },
  {
    path: 'all-products',
    data: {
      breadcrumb: 'All Products'
    },
    loadChildren: () => import('./modules/all-work/all-work.module').then(m => m.AllWorkModule)
    
  },
  {
    path: 'all-projects',
    data: {
      breadcrumb: 'All Projects'
    },
    loadChildren: () => import('./modules/all-work/all-work.module').then(m => m.AllWorkModule)
  },
  {
    path: 'about',
    data: {
      breadcrumb: 'About Us'
    },
    loadChildren: () => import('./modules/about/about.module').then(m => m.AboutModule)
  },
  {
    path: 'mechanical',
    data: {
      breadcrumb: 'Mechanical'
    },
    loadChildren: () => import('./modules/mechanical/mechanical.module').then(m => m.MechanicalModule)
  },
  {
    path: 'electronics',
    data: {
      breadcrumb: 'Electronics'
    },
    loadChildren: () => import('./modules/electronics/electronics.module').then(m => m.ElectronicsModule)
  },
  {
    path: 'gallery',
    data: {
      breadcrumb: 'Gallery'
    },
    loadChildren: () => import('./modules/photo-gallery/photo-gallery.module').then(m => m.PhotoGalleryModule)
  },
  {
    path: 'hiring',
    data: {
      breadcrumb: 'We are hiring'
    },
    loadChildren: () => import('./modules/hiring/hiring.module').then(m => m.HiringModule)
  },
  {
    path: 'submitidea',
    data: {
      breadcrumb: 'Submit idea'
    },
    loadChildren: () => import('./modules/submitidea/submitidea.module').then(m => m.SubmitideaModule)
  },
  {
    path: 'buildyourteam',
    data: {
      breadcrumb: 'Build Your Team'
    },
    loadChildren: () => import('./modules/buildyourteam/buildyourteam.module').then(m => m.BuildyourteamModule)
  },
  {
    path: 'services',
    data: {
      breadcrumb: 'Services'
    },
    loadChildren: () => import('./modules/services/services.module').then(m => m.ServicesModule)
  },
  {
    path: 'ayu',
    data: {
      breadcrumb: ' Design / Our Work - Product'
    },
    loadChildren: () => import('./modules/ayu/ayu.module').then(m => m.AyuModule)
  },
  {
    path: 'comingSoon',
    data: {
      breadcrumb: 'Coming soon'
    },
    loadChildren: () => import('./shared/components/coming-soon/coming-soon.module').then(m => m.ComingSoonModule)
  },
  {
    path: 'news',
    data: {
      breadcrumb: 'News'
    },
    component: NewsComponent
  },
  {
    path: 'submitted', 
    data: {
      breadcrumb: 'Submitted'
    },
    component: SubmittedConfirmComponent
  },
  {
    path: 'search',
    data: {
      breadcrumb: 'Search'
    },
    component: SearchResultComponent
  },
  {
    path : 'resources',
    data: {
      breadcrumb: 'Resources'
    },
    component: ResourceComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled'
  })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
