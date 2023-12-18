import { Component, OnInit } from '@angular/core';
import { BreadcumDataService } from 'src/app/shared/services/breadcum-data.service';
import { StaticDataService } from 'src/app/shared/services/static-data.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {

  serviceItems:any;
  blogItems:any;
  tabchanedrop:any= 'Design';
  dropdownshow:any="";
  ourWorksItems:any;
  showDetail:boolean=false;
  service:any;
  category:any= '';

  caseStudyItems: any
  title!: string;

  constructor(private staticDataService: StaticDataService, private breadcumDataService:BreadcumDataService) { 

    this.staticDataService.servicesdropdown.subscribe( res=>{

      this.dropdownshow = res;
      console.log(res,"ddddd")
    })
  }
 


  ngOnInit(): void {
    this.breadcumDataService.changeData(this.tabchanedrop);
    this.serviceItems=this.staticDataService.getServicesData('Design');
    this.breadcumDataService.setclass('colorchange');
    this.ourWorksItems = this.serviceItems;
    window.scroll(0,0);

    this.title = "Recent Case Studies";
    this.caseStudyItems = this.staticDataService.getCaseStudyData("");
  }
  selectedTab = 0;
  servicesView(tabname: any) {
    this.dropdownshow ="";
    this.showDetail = false;
    this.tabchanedrop = tabname;

    this.serviceItems=this.staticDataService.getServicesData(this.tabchanedrop);
    this.ourWorksItems = this.serviceItems;
    console.log(this.serviceItems,"dddddd")
    switch(tabname){
      case "Design": 
      this.breadcumDataService.changeData(' Design'); 
      break;
      case "Software": 
      this.breadcumDataService.changeData(' Software'); 
      break;
      case "Electronics": 
      this.breadcumDataService.changeData(' Electronics'); 
      break;
      case "default": this.breadcumDataService.changeData(''); break;
    }
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  onExplore(title:string,category:any){
    this.showDetail = true;
    this.service= title;
    this.dropdownshow = category;
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  servicesViewInnpage(title:string){
    this.showDetail = true;
    this.service= title;

    this.breadcumDataService.changeData(this.service);
  }

  onChangeTab(event:any){

    switch(event.tab.textLabel){
      case "Design": this.breadcumDataService.changeData(' / Design'); break;
      case "Software": this.breadcumDataService.changeData(' / Software'); break;
      case "Electronics": this.breadcumDataService.changeData(' / Electronics'); break;
      case "default": this.breadcumDataService.changeData(''); break;
    }
    console.log(event.tab.textLabel);
  }

  getCategory(category:any){
    console.log(category);
    this.category=category;
  }

  onDropDown(subCategory:any,category:any){
    this.tabchanedrop =category;
    this.staticDataService.setCategoryService(subCategory)
  }


}