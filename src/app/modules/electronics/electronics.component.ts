import { Component, OnInit } from '@angular/core';
import { BreadcumDataService } from 'src/app/shared/services/breadcum-data.service';
import { StaticDataService } from 'src/app/shared/services/static-data.service';

@Component({
  selector: 'app-electronics',
  templateUrl: './electronics.component.html',
  styleUrls: ['./electronics.component.scss']
})
export class ElectronicsComponent implements OnInit {

  ourWorksItems:any;
  blogItems:any;
  tabchanedrop:any= 'introduction';
  constructor(private staticDataService: StaticDataService,private breadcumDataService:BreadcumDataService) { }

  ngOnInit(): void {
    this.ourWorksItems=this.staticDataService.getOurWorksData('Electronics');
    this.blogItems=this.staticDataService.getBlogsData('Electronics');
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
  }

  onChangeTab(event:any){

    switch(event.tab.textLabel){
    }
  }

}
