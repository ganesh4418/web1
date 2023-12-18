import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { SwiperModule } from 'swiper/angular';
import { RouterModule } from '@angular/router';
import { CaseStudiesComponent } from './components/case-studies/case-studies.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { OurWorksComponent } from './components/our-works/our-works.component';
import { BlogsComponent } from './components/blogs/blogs.component';
import { FilterComponent } from './components/filter/filter.component';
import { ButtonTabsComponent } from './components/button-tabs/button-tabs.component';
import { ConnectNowComponent } from './components/connect-now/connect-now.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewsComponent } from './components/news/news.component';
import { NewsTemplateComponent } from './components/news/news-template/news-template.component';
import { SubmittedConfirmComponent } from './components/submitted-confirm/submitted-confirm.component';
import { BlogDetailsComponent } from './components/blogs/blog-details/blog-details.component';
import { BlogsSliderComponent } from './components/blogs/blogs-slider/blogs-slider.component';
import { CaseStudySliderComponent } from './components/case-studies/case-study-slider/case-study-slider.component';
import { SearchResultComponent } from './components/search-result/search-result.component';
import { LoaderComponent } from './components/loader/loader.component';
import { ErrorModalComponent } from './components/modals/error-modal/error-modal.component';




@NgModule({
  declarations: [
    BreadcrumbComponent,
    CaseStudiesComponent,
    OurWorksComponent,
    BlogsComponent,
    FilterComponent,
    ButtonTabsComponent,
    ConnectNowComponent,
    NewsComponent,
    NewsTemplateComponent,
    SubmittedConfirmComponent,
    BlogDetailsComponent,
    BlogsSliderComponent,
    CaseStudySliderComponent,
    SearchResultComponent,
    // LoaderComponent,
    ErrorModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatDialogModule,
    MatIconModule,
    MatMenuModule,
    MatTabsModule,
    SwiperModule,
    
  ],
  exports: [
    CommonModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatDialogModule,
    MatIconModule,
    MatMenuModule,
    MatTabsModule,
    SwiperModule,
    BreadcrumbComponent,
    CaseStudiesComponent,
    OurWorksComponent,
    BlogsComponent,
    ButtonTabsComponent,
    FilterComponent,
    ConnectNowComponent,
    SubmittedConfirmComponent,
    BlogsSliderComponent,
    CaseStudySliderComponent,

  ]
})
export class SharedModule { }
