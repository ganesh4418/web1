import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CaseStudy } from 'src/app/core/mocks/case-study';
import { BreadcumDataService } from 'src/app/shared/services/breadcum-data.service';
import { StaticDataService } from 'src/app/shared/services/static-data.service';

@Component({
  selector: 'app-all-case-studies',
  templateUrl: './all-case-studies.component.html',
  styleUrls: ['./all-case-studies.component.scss']
})
export class AllCaseStudiesComponent implements OnInit, OnDestroy {
  caseStudyItems: any;
  selectedTab: string = "All"
  
  blogItems: any;
  subCategoryList: any;
  selectedButton: string = '';
  selectedTabIndex = 0;
  private currentPageSub: any;
  tabchanedrop:any= 'All';
  constructor(private staticDataService: StaticDataService, private breadcumDataService: BreadcumDataService, private router: Router) { }

  ngOnInit(): void {
     this.caseStudyItems = this.staticDataService.getCaseStudyData('');
    this.breadcumDataService.changeData('All');
    this.currentPageSub = this.breadcumDataService.currentPageSelect.subscribe((x) => {
      this.selectedTab = x;
      this.tabchanedrop =this.selectedTab ;
      this.getTabIndex(this.selectedTab)
      this.changeTabs(this.selectedTab)
    })
    this.servicesView(this.tabchanedrop);
    this.blogItems = this.staticDataService.getAllResourcesData();
    this.subCategoryList = this.getSubcategoryList('');
  }


  servicesView(tabname: any) {
    this.tabchanedrop = tabname;
    this.getSubcategoryList(this.tabchanedrop);
    this.changeTabs(this.tabchanedrop);
    switch(tabname){
      case "All": this.breadcumDataService.changeData(' All'); break;
      case "Design": this.breadcumDataService.changeData(' Design'); break;
      case "Software": this.breadcumDataService.changeData(' Software'); break;
      case "Mechanical":  this.breadcumDataService.changeData(' Mechanical'); break;
      case "Electronics":  this.breadcumDataService.changeData(' Electronics'); break;
      
      case "default": this.breadcumDataService.changeData(''); break;
    }
  }


  getTabIndex(selectedTab: any) {
    switch (selectedTab) {
      case 'Design':
        this.selectedTabIndex = 1;
        break;
      case 'Software':
        this.selectedTabIndex = 2;
        break;
      case 'Mechanical':
        this.selectedTabIndex = 3;
        break;
      case 'Electronics':
        this.selectedTabIndex = 4;
        break;
      case 'All':
        this.selectedTabIndex = 0;
        break;
    }
  }

  onChangeTab(event: any) {
    // console.log(this.selectedButton)
    this.selectedTab = event.tab.textLabel;
    // console.log(this.selectedTab);
    this.changeTabs(event.tab.textLabel);
    this.subCategoryList = this.getSubcategoryList('');
  }

  getSubcategoryList(items: any) {
    let list = [];
    for (let i in this.caseStudyItems) {
      list.push(this.caseStudyItems[i].subcategory);
    }
    list.unshift("All");
    list = [...new Set(list)];
    return list;
  }

  onSelectedButton(item: string) {
    this.selectedButton = item;
    //  this.breadcumDataService.changeData(` / ${item} `);
  }

  changeTabs(selectedTab: any) {

    switch (selectedTab) {
      case "All": this.caseStudyItems = this.staticDataService.getCaseStudyData('');
        this.breadcumDataService.changeData('');
        this.subCategoryList = this.getSubcategoryList(this.caseStudyItems);
        console.log(this.subCategoryList);
        
        break;
      case "Design": this.caseStudyItems = this.staticDataService.getCaseStudyData('Design');
        this.breadcumDataService.changeData(` ${this.selectedTab} `);
        this.subCategoryList = this.getSubcategoryList(this.caseStudyItems);
        break;
      case "Software": this.caseStudyItems = this.staticDataService.getCaseStudyData('Software');
        this.breadcumDataService.changeData(` ${this.selectedTab} `);
        this.subCategoryList = this.getSubcategoryList(this.caseStudyItems);
        break;
      case "Mechanical": this.caseStudyItems = this.staticDataService.getCaseStudyData('Mechanical');
        this.breadcumDataService.changeData(` ${this.selectedTab} `);
        this.subCategoryList = this.getSubcategoryList(this.caseStudyItems);
        break;
      case "Electronics": this.caseStudyItems = this.staticDataService.getCaseStudyData('Electronics');
        this.breadcumDataService.changeData(` ${this.selectedTab} `);
        this.subCategoryList = this.getSubcategoryList(this.caseStudyItems);
        break;
      default: this.caseStudyItems = this.staticDataService.getCaseStudyData('');
        this.breadcumDataService.changeData('');
        break;
    }
    // if (this.caseStudyItems.length === 0) {
    //   this.router.navigateByUrl('/comingSoon');
    // }    
  }

  ngOnDestroy(): void {
    this.currentPageSub.unsubscribe()
  }

  
}
