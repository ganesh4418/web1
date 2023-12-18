import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BreadcumDataService } from 'src/app/shared/services/breadcum-data.service';
import { StaticDataService } from 'src/app/shared/services/static-data.service';

@Component({
  selector: 'app-case-study-slider',
  templateUrl: './case-study-slider.component.html',
  styleUrls: ['./case-study-slider.component.scss']
})
export class CaseStudySliderComponent implements OnInit {

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

  constructor(private staticDataService: StaticDataService, private breadcumDataService: BreadcumDataService, private router:Router) { }

  ngOnInit(): void {
  }

  onReadMore(data:any){
    
    this.staticDataService.getAllCaseStudyData();
    this.breadcumDataService.changeData(' '+data.title);
    this.staticDataService.setCaseStude(data);
    this.router.navigate(['/all-case-studies/casestudy-details']);
    
  }

  onAllCaseStudy(){
    this.router.navigate(['/all-case-studies']);
  }
}
