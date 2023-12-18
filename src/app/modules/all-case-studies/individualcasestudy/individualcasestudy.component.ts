import { Component, OnInit } from '@angular/core';
import { CaseStudy } from 'src/app/core/mocks/case-study';
import { BreadcumDataService } from 'src/app/shared/services/breadcum-data.service';
import { StaticDataService } from 'src/app/shared/services/static-data.service';

@Component({
  selector: 'app-individualcasestudy',
  templateUrl: './individualcasestudy.component.html',
  styleUrls: ['./individualcasestudy.component.scss']
})
export class IndividualcasestudyComponent implements OnInit {
  caseStudy: any;
  caseStudyItems: any;
  title: string = "";

  constructor(private breadcumDataService: BreadcumDataService, private staticDataService: StaticDataService) { }

  ngOnInit(): void {
    this.staticDataService.getCaseStude().subscribe(
      data => {
        this.caseStudy = data;
        window.scroll({
          top: 0,
          left: 0,
          behavior: 'smooth'
        });

      }

    );
    this.title = 'Recent Case Studies';
    this.caseStudyItems = new CaseStudy().caseStudyData;
  }

}
