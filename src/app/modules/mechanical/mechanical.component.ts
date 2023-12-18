import { Component, OnInit } from '@angular/core';
import { CaseStudy } from 'src/app/core/mocks/case-study';
import { StaticDataService } from 'src/app/shared/services/static-data.service';

@Component({
  selector: 'app-mechanical',
  templateUrl: './mechanical.component.html',
  styleUrls: ['./mechanical.component.scss']
})
export class MechanicalComponent implements OnInit {

  ourWorksItems:any;
  blogItems:any;
  constructor(private staticDataService: StaticDataService) { }

  ngOnInit(): void {
    this.ourWorksItems=this.staticDataService.getOurWorksData('Mechanical');
    this.blogItems=this.staticDataService.getBlogsData('Mechanical');
    
  }
  selectedTab = 0;
  servicesView(tabIndexany: any) {
  }

  onChangeTab(event:any){
    // this.labelName = event.tab.textLabel;
    switch(event.tab.textLabel){
      // case "Our Works":this.router.navigate(['/software/our-works']); break;
    }
  
    //  this.router.navigate([tab]);
  }


}
