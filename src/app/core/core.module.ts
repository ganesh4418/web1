import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LocationComponent, MailComponent, SidebarComponent } from './components/sidebar/sidebar.component';
import { SwiperModule } from 'swiper/angular';
import {RouterModule} from '@angular/router';
import { ContactComponent } from './components/sidebar/modal/contact/contact.component';
import { CommentComponent } from './components/sidebar/modal/comment/comment.component';
import { MatIconModule } from '@angular/material/icon';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import {MatTooltipModule} from '@angular/material/tooltip';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    ContactComponent,
    CommentComponent,
    MailComponent,
    LocationComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SwiperModule,
    RouterModule,
    MatIconModule,
    MatMenuModule,
    MatDatepickerModule,
    MatTooltipModule
  ],
  exports:[
    FormsModule,
    ReactiveFormsModule,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,LocationComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CoreModule { }
