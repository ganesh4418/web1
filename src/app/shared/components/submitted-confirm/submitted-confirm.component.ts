import { Component, Input, OnInit } from '@angular/core';
import { StaticDataService } from '../../services/static-data.service';

@Component({
  selector: 'app-submitted-confirm',
  templateUrl: './submitted-confirm.component.html',
  styleUrls: ['./submitted-confirm.component.scss']
})
export class SubmittedConfirmComponent implements OnInit {
   highlitedtitle!: string;
 nothighlitedtitle!: string;
  caseStudyItems: any;
  title: string = "";
  email:any;
  code:any;
  constructor(private staticDataService: StaticDataService) { }

  ngOnInit(): void {
    this.staticDataService.getSubmittedData().subscribe(
      data=>{
        console.log(data)
        this.highlitedtitle=data.highlitedtitle;
        this.nothighlitedtitle=data.nothighlitedtitle;
        this.email=data.email;
        this.code=data.code;
      }
    )
    this.title = "Case Studies : Value Added Results";
    this.caseStudyItems = this.staticDataService.getCaseStudyData('Design');
  }

}
