import { Component, OnInit } from '@angular/core';
import { BreadcumDataService } from 'src/app/shared/services/breadcum-data.service';
import { StaticDataService } from 'src/app/shared/services/static-data.service';

@Component({
  selector: 'app-mechanical-home',
  templateUrl: './mechanical-home.component.html',
  styleUrls: ['./mechanical-home.component.scss']
})
export class MechanicalHomeComponent implements OnInit {

  ourWorksItems:any;
  blogItems:any;
  tabchanedrop:any= 'introduction';
  constructor(private staticDataService: StaticDataService, private breadcumDataService:BreadcumDataService) { }

  ngOnInit(): void {
    this.breadcumDataService.changeData(' Introduction');
    this.ourWorksItems=this.staticDataService.getOurWorksData('Mechanical');
    this.blogItems=this.staticDataService.getBlogsData('Mechanical');
    this.breadcumDataService.setclass('colorchange');
  }
  selectedTab = 0;
  servicesView(tabname: any) {
    this.tabchanedrop = tabname;
    switch(tabname){
      case "introduction": this.breadcumDataService.changeData(' Introduction'); break;
      case "services": this.breadcumDataService.changeData(' Services'); break;
      case "ourwork": this.breadcumDataService.changeData(' Our Works - All'); break;
      case "blogs":  this.breadcumDataService.changeData(' Blogs - All'); break;
      case "default": this.breadcumDataService.changeData(''); break;
    }
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  onChangeTab(event:any){

    switch(event.tab.textLabel){
      case "Introduction": this.breadcumDataService.changeData(' / Introduction'); break;
      case "Our Works": this.breadcumDataService.changeData(' / Our Works - All'); break;
      case "Blogs":  this.breadcumDataService.changeData(' / Blogs - All'); break;
      case "default": this.breadcumDataService.changeData(''); break;
    }
  }


}
