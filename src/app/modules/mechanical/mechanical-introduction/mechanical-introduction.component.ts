import { Component, OnInit } from '@angular/core';
import { CaseStudy } from 'src/app/core/mocks/case-study';
import { BreadcumDataService } from 'src/app/shared/services/breadcum-data.service';
import { StaticDataService } from 'src/app/shared/services/static-data.service';

@Component({
  selector: 'app-mechanical-introduction',
  templateUrl: './mechanical-introduction.component.html',
  styleUrls: ['./mechanical-introduction.component.scss']
})
export class MechanicalIntroductionComponent implements OnInit {

  caseStudyItems: any;
  title!: string;
  gifUrl: string = "";
  pageName: string = 'Mechanical';
  constructor(private staticDataService: StaticDataService,private breadcumDataService:BreadcumDataService) { }

  ngOnInit(): void {
    this.title = "Case Studies : Value Added Results";
    this.caseStudyItems = this.staticDataService.getCaseStudyData("Mechanical");
    this.gifUrl = "assets/media/images/mechanical/Mechanical_2.gif";
    this.breadcumDataService.currentPage(this.pageName)

  }

}
