import { Component, OnInit } from '@angular/core';
import { BreadcumDataService } from 'src/app/shared/services/breadcum-data.service';
import { StaticDataService } from 'src/app/shared/services/static-data.service';

@Component({
  selector: 'app-software-home',
  templateUrl: './software-home.component.html',
  styleUrls: ['./software-home.component.scss']
})
export class SoftwareHomeComponent implements OnInit {

  
  tabchanedrop: any = 'introduction';
  ourWorksItems: any;
  selectedTab: any;
  blogItems: any;
  constructor(private staticDataService: StaticDataService, private breadcumDataService: BreadcumDataService) { }

  ngOnInit(): void {
    this.breadcumDataService.changeData(' Introduction');
    this.ourWorksItems = this.staticDataService.getOurWorksData('Software');
    this.blogItems = this.staticDataService.getBlogsData('Software');
    this.breadcumDataService.setclass('colorchange')
  }

  servicesView(tabname: any) {
    console.log(tabname);
    this.tabchanedrop = tabname;
    switch (tabname) {
      case "introduction": this.breadcumDataService.changeData(' Introduction'); break;
      case "services": this.breadcumDataService.changeData(' Services'); break;
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
  changePage(id: any) {
    console.log(id);
    this.servicesView('services');
    switch (id) {
      case 1: this.selectedTab = 1; this.breadcumDataService.changeData(' Services - Product Developement'); break;
      case 2: this.selectedTab = 2; this.breadcumDataService.changeData(' Services - Mobile and Web Developement');break;
      case 3: this.selectedTab = 3; this.breadcumDataService.changeData(' Services - Architecture and Design');break;
      case 4: this.selectedTab = 4; this.breadcumDataService.changeData(' Services - Data Science');break;
      case 5: this.selectedTab = 5; this.breadcumDataService.changeData(' Services - AR/VR');break;
      case 6: this.selectedTab = 6; this.breadcumDataService.changeData(' Services - Consulting and Staffing');break;
      case 7: this.selectedTab = 7; this.breadcumDataService.changeData(' Services - Infra Services');break;
      case 8: this.selectedTab = 8; this.breadcumDataService.changeData(' Services - Technology Consulting');break;
    }

  }

}