import { Component, OnInit } from '@angular/core';
import { CaseStudy } from 'src/app/core/mocks/case-study';

@Component({
  selector: 'app-photography',
  templateUrl: './photography.component.html',
  styleUrls: ['./photography.component.scss']
})
export class PhotographyComponent implements OnInit {

  caseStudyItems:any;
  title!:string;
  connectClicked: boolean = false;
  constructor() { }

  ngOnInit(): void {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
    let data=new CaseStudy();
    this.title="Case Studies";
    this.caseStudyItems=[];
    for(let i in data.caseStudyData){
      if(data.caseStudyData[i].category=="Design"){
        this.caseStudyItems.push(data.caseStudyData[i]);
      }
    } 
  }
  connect() {
    this.connectClicked = true;
  }

  connectCloseClicked(event: boolean) {
    this.connectClicked = event;
  }
}
