import { Component, OnInit } from '@angular/core';
import { CaseStudy } from 'src/app/core/mocks/case-study';
import { BreadcumDataService } from 'src/app/shared/services/breadcum-data.service';
import { StaticDataService } from 'src/app/shared/services/static-data.service';

@Component({
  selector: 'app-introduction',
  templateUrl: './introduction.component.html',
  styleUrls: ['./introduction.component.scss']
})
export class IntroductionComponent implements OnInit {
  caseStudyItems:any;
  title !:string;
  gifUrl: string = "";
  pageName: string = 'Software';
  constructor(private staticDataService:StaticDataService, private breadcumDataService:BreadcumDataService) { }

  ngOnInit(): void {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
    this.title="Case Studies : Results of Our Artistry & Engineering"
    this.caseStudyItems= this.staticDataService.getCaseStudyData("Software");
    this.gifUrl = "assets/media/images/software/Software-Domain-Development-Process.gif";
    this.breadcumDataService.currentPage(this.pageName)
  }

}
