import { Component, OnInit } from '@angular/core';
import { CaseStudy } from 'src/app/core/mocks/case-study';
import { BreadcumDataService } from 'src/app/shared/services/breadcum-data.service';
import { StaticDataService } from 'src/app/shared/services/static-data.service';

@Component({
  selector: 'app-electronics-introduction',
  templateUrl: './electronics-introduction.component.html',
  styleUrls: ['./electronics-introduction.component.scss']
})
export class ElectronicsIntroductionComponent implements OnInit {

  caseStudyItems:any;
  title!:string;
  gifUrl: string ="";
  pageName: string = 'Electronics';
  constructor(private staticDataService:StaticDataService,private breadcumDataService:BreadcumDataService) { }

  ngOnInit(): void {
    this.title="Case Studies : Value Added Results";
    this.caseStudyItems=this.staticDataService.getCaseStudyData("Electronics");
    this.gifUrl = "assets/media/images/electronics/Electronics.gif";
    this.breadcumDataService.currentPage(this.pageName)
  }

}
