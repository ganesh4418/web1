import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OurWorks } from 'src/app/core/mocks/our-works';
import { BreadcumDataService } from 'src/app/shared/services/breadcum-data.service';
import { StaticDataService } from 'src/app/shared/services/static-data.service';

@Component({
  selector: 'app-service-details',
  templateUrl: './service-details.component.html',
  styleUrls: ['./service-details.component.scss',  './../../../shared/components/case-studies/case-studies.component.scss']
})
export class ServiceDetailsComponent implements OnInit {
  
  @Input() serviceItems:any;
  selectedService:any='';
  @Output() category = new EventEmitter<string>();
  ourWorksItems:any;
  showDetail:boolean=false;
  service:string='PhysicalProductDesign';
  varElectronics: boolean = false;

  constructor(private breadcumDataService:BreadcumDataService,private staticDataService: StaticDataService,) {
    console.log(this.serviceItems)
   
   }

  ngOnInit(): void {
    this.ourWorksItems=this.serviceItems;
    // this.category=this.serviceItems[0].category

    this.breadcumDataService.backState.subscribe(
      back=>{
        this.showDetail=false;
        this.breadcumDataService.changeData(this.serviceItems[0].category)
      }
    )

    this.staticDataService.getCategoryService().subscribe(
      data=>{
        if(data!=''){
          // this.service=data;
          // this.showDetail=true;
          // this.onExplore(data,true)
        }
        
      }
    )
  }

  onExplore(title:string,isShow:boolean,category:any){
      this.showDetail=isShow;
      this.service=title;
      this.staticDataService.servicesdropdown.next(category);
      this.breadcumDataService.changeData(this.serviceItems[0].category+' / '+title); 
  }
}
