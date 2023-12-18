import { Component, OnInit } from '@angular/core';
import { BreadcumDataService } from 'src/app/shared/services/breadcum-data.service';
import { StaticDataService } from 'src/app/shared/services/static-data.service';
import SwiperCore, { EffectCoverflow, Pagination, Navigation } from 'swiper';

SwiperCore.use([EffectCoverflow, Pagination, Navigation]);


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  pageName: string = 'All'

  constructor(private staticDataService: StaticDataService, private breadcumDataService: BreadcumDataService) { }

  ngOnInit(): void {
  }
  setIncomingPage(x: any) {
    this.staticDataService.setIncomingPage(x);
  }
  setPageForCaseStudies() {
    this.breadcumDataService.currentPage(this.pageName)
  }
}
