import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CaseStudy } from 'src/app/core/mocks/case-study';
import { BreadcumDataService } from 'src/app/shared/services/breadcum-data.service';
import { FilteredDataService } from 'src/app/shared/services/filtered-data.service';
import { StaticDataService } from 'src/app/shared/services/static-data.service';

@Component({
  selector: 'app-design',
  templateUrl: './design.component.html',
  styleUrls: ['./design.component.scss'],
 

})
export class DesignComponent implements OnInit {
  caseStudyItems: any;
  title!: string;
  tabchanedrop: any;

  ourWorksItems: any;
  blogItems: any;

  swiperConfig: any = {
    slidesPerView: 'auto',
    breakpoints: {
      1200: {
        slidesPerView: 6,
      },
      992: {
        slidesPerView: 5
      },
      768: {
        slidesPerView: 4
      },
      320: {
        slidesPerView: 3
      }
    }
  }

  constructor(private staticDataService: StaticDataService, private breadcumDataService: BreadcumDataService) { }

  ngOnInit(): void {
    this.breadcumDataService.changeData(' Introduction');
    this.staticDataService.getChangedTab().subscribe(
      tab => {
        window.scrollTo(0, 0);
        console.log(tab)
        if (tab == 'introduction') {
          this.breadcumDataService.changeData(' Introduction');
          this.tabchanedrop = tab;
        }
        if (tab == 'blogs') {
          this.breadcumDataService.changeData(' Blogs - All');
          this.tabchanedrop = tab;
        }
      }
    )

    this.ourWorksItems = this.staticDataService.getOurWorksData('Design');
    this.blogItems = this.staticDataService.getBlogsData('Design');
  }
  selectedTab = 0;
  // servicesView(tabname: any) {
  //   this.tabchanedrop = tabname;
  // }

  servicesView(tabname: any) {
    this.tabchanedrop = tabname;
    switch (tabname) {
      case "introduction": this.breadcumDataService.changeData(' Introduction'); break;
      case "services": this.breadcumDataService.changeData(' Services'); break;
      case "productdesign": this.breadcumDataService.changeData(' Service - Product Design'); break;
      case "uiuxdesign": this.breadcumDataService.changeData(' Service - UI-UX Design'); break;
      case "graphicsdesign": this.breadcumDataService.changeData(' Service - Graphics Design'); break;
      case "animationdesign": this.breadcumDataService.changeData(' Service - Animation Design'); break;
      case "photography": this.breadcumDataService.changeData(' Service - Photography'); break;
      case "ourwork": this.breadcumDataService.changeData(' Our Works - All'); break;
      case "blogs": this.breadcumDataService.changeData(' Blogs - All'); break;
      case "default": this.breadcumDataService.changeData(''); break;
    }
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

}
