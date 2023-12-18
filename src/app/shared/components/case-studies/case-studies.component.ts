import { Component, Input, OnInit } from '@angular/core';
import { CaseStudy } from '../../../core/mocks/case-study';
import SwiperCore, { EffectCoverflow, Pagination, Navigation } from 'swiper';
import { BreadcumDataService } from '../../services/breadcum-data.service';
import { Router } from '@angular/router';
import { StaticDataService } from '../../services/static-data.service';
SwiperCore.use([EffectCoverflow, Pagination, Navigation]);


@Component({
  selector: 'app-case-studies',
  templateUrl: './case-studies.component.html',
  styleUrls: ['./case-studies.component.scss']
})
export class CaseStudiesComponent implements OnInit {
  @Input() caseStudyItems: any;
  @Input() title!: string;
  // @Input() page!: string;

  swiperConfig: any = {
    slidesPerView: 'auto',

    breakpoints: {
      1200: {
        slidesPerView: 3,
        spaceBetween: 40,
      },
      992: {
        spaceBetween: 20,
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

  constructor(private breadcumDataService: BreadcumDataService, private router:Router, private staticDataService:StaticDataService) {

  }

  ngOnInit(): void {
    // console.log(this.page);
    // this.breadcumDataService.currentPage(this.page)
  }

  onExlore(data:any){
    this.staticDataService.setCaseStude(data);
    this.router.navigate(['/all-case-studies/casestudy-details'])
  }
  
}
