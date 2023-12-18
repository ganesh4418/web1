import { Component, Input, OnInit, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { BreadcumDataService } from 'src/app/shared/services/breadcum-data.service';
import { StaticDataService } from 'src/app/shared/services/static-data.service';

@Component({
  selector: 'app-study-template',
  templateUrl: './study-template.component.html',
  styleUrls: ['./study-template.component.scss']
})
export class StudyTemplateComponent implements OnInit, OnChanges {
  @Input() caseStudyItems: any;
  @Input() subCategoryList: any;
  @Input() selectedTab!: string;
  @Output() selectedItem = new EventEmitter<string>();
  caseStudyAllItems: any;
  subCategory: any;
  constructor(private staticDataService: StaticDataService, private router: Router, private breadcumDataService:BreadcumDataService) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.caseStudyAllItems = this.caseStudyItems;
    this.staticDataService.setAllCaseStudyData(this.caseStudyItems)
    if (this.caseStudyAllItems.length === 0) {
      this.router.navigateByUrl('/comingSoon');
    }

  }

  ngOnInit(): void {
    this.caseStudyAllItems = this.caseStudyItems;
    this.staticDataService.setAllCaseStudyData(this.caseStudyItems);
  }

  onFilteredValue(filteredType: string) {
    this.caseStudyItems = this.staticDataService.getAllCaseStudyData();
    this.selectedItem.emit(filteredType);
    if (filteredType == "All") {

      this.caseStudyItems = this.staticDataService.getAllCaseStudyData();
      this.staticDataService.setFilteredData(this.caseStudyItems)
    }
    else {
      this.caseStudyItems = this.caseStudyItems.filter(
        (el: any) => el.subcategory == filteredType
      );
      this.staticDataService.setFilteredData(this.caseStudyItems)
    }
  }

  onSortBy(sortType: string) {
    this.caseStudyItems = this.staticDataService.getFilteredData();
    switch (sortType) {
      case "newly-added": this.caseStudyItems = this.staticDataService.getFilteredData(); break;
      case "oldest_ones": this.caseStudyItems = this.staticDataService.getFilteredData(); break;
      case "sort_by_A-Z": if (this.caseStudyItems.length > 1) {
        this.caseStudyItems = this.caseStudyItems.sort(
          (a: any, b: any) => (a.title[0] > b.title[0] ? 1 : -1)
        );
      } else {
        this.caseStudyItems = this.staticDataService.getFilteredData();
      }
        break;
      case "sort_by_Z-A": if (this.caseStudyItems.length > 1) {
        this.caseStudyItems = this.caseStudyItems.sort(
          (a: any, b: any) => (a.title[0] > b.title[0] ? -1 : 1)
        );
      } else {
        this.caseStudyItems = this.staticDataService.getFilteredData();
      } break;
      case "default": this.caseStudyItems = this.staticDataService.getFilteredData(); break;
    }
  }

  onReadMore(data:any){
    
    this.staticDataService.getAllCaseStudyData();
    this.breadcumDataService.changeData(' '+data.title);
    this.staticDataService.setCaseStude(data);
    this.router.navigate(['/all-case-studies/casestudy-details']); 
  }

}
