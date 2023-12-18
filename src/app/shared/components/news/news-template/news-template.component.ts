import { Component, Input, OnInit } from '@angular/core';
import { about } from 'src/app/core/mocks/about';

@Component({
  selector: 'app-news-template',
  templateUrl: './news-template.component.html',
  styleUrls: ['./news-template.component.scss']
})
export class NewsTemplateComponent implements OnInit {
  swiperConfig: any = {
    slidesPerView: 'auto',

    breakpoints: {
      1200: {
        slidesPerView: 3,
        spaceBetween: 40,
      },
      992: {
        spaceBetween: 40,
        slidesPerView: 3
      },
      768: {
        spaceBetween: 10,
        slidesPerView: 3
      },
      425: {
        slidesPerView: 1
      }
    }
  }
  about: any[]=[];
  @Input() tabName: any;
  @Input() tabData:any;
  constructor() { }

  ngOnInit(): void {
    // let data_about = new about();
    // this.about = data_about.achivement;
    
    console.log(this.tabName,this.tabData);
  }

}
