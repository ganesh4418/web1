import { Component, OnInit } from '@angular/core';
import { CaseStudy } from 'src/app/core/mocks/case-study';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss','./../../software/services/services.component.scss']
})
export class ServicesComponent implements OnInit {

caseStudyItems:any;
title!:string;
tabchanedrop:any= 'introduction';
connectClicked: boolean = false;

constructor() { }

ngOnInit(): void {
  let data=new CaseStudy();
  this.title="Case Studies : Value Added Results";
  this.caseStudyItems=[];
  for(let i in data.caseStudyData){
    if(data.caseStudyData[i].category=="Electronics-intro"){
      this.caseStudyItems.push(data.caseStudyData[i]);
    }
  } 
}
selectedTab = 0;
servicesView(tabname: any) {
  this.tabchanedrop = tabname;
}

connect() {
  this.connectClicked = true;
}
}


