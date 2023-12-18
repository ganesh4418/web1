import { Component, OnInit } from '@angular/core';
import { BreadcumDataService } from 'src/app/shared/services/breadcum-data.service';
import { StaticDataService } from 'src/app/shared/services/static-data.service';

@Component({
  selector: 'app-design-home',
  templateUrl: './design-home.component.html',
  styleUrls: ['./design-home.component.scss']
})
export class DesignHomeComponent implements OnInit {
  ourWorksItems:any;
  blogItems:any;
  selectedPage: any;
  currentPageSub: any;
  tabIndex:number=2;
  constructor(private staticDataService: StaticDataService, private breadcumDataService:BreadcumDataService) { }

  ngOnInit(): void {    
    this.breadcumDataService.changeData(' Introduction');
    this.ourWorksItems=this.staticDataService.getOurWorksData('Design');
    this.blogItems=this.staticDataService.getBlogsData('Design');
    this.breadcumDataService.setclass('colorchange');
  }

  servicesView(tabIndexany: any) {
  }

  onChangeTab(event:any){    
    // this.selectedPage = 'Design';
    switch(event.tab.textLabel){
      case "Introduction": this.breadcumDataService.changeData(' Introduction'); break;
      case "Servics": this.breadcumDataService.changeData(' Services'); break;
      case "Our Works": this.breadcumDataService.changeData(' Our Works - All'); break;
      case "Blogs":  this.breadcumDataService.changeData(' Blogs - All'); break;
      case "default": this.breadcumDataService.changeData(''); break;
    }
  }

  // ngOnDestroy(): void {
  //   this.currentPageSub.unsubscribe()
  // }

}
