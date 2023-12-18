import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { OurWorks } from 'src/app/core/mocks/our-works';
import { BreadcumDataService } from '../../services/breadcum-data.service';
import { StaticDataService } from '../../services/static-data.service';

@Component({
  selector: 'app-our-works',
  templateUrl: './our-works.component.html',
  styleUrls: ['./our-works.component.scss', './../case-studies/case-studies.component.scss']
})
export class OurWorksComponent implements OnInit, OnChanges {
  @Input() ourWorksItems: any;
  selectedTab: string = '';
  subCategoryList: any;
  connectClicked: boolean = false;
  showConnectNow: boolean = false;

  constructor(private staticDataService: StaticDataService, private breadcumDataService: BreadcumDataService) { }
  ngOnChanges(changes: SimpleChanges): void {
    this.staticDataService.setAllOurWorkData(this.ourWorksItems);
    this.ourWorksItems[0].category === 'Mechanical' ? this.showConnectNow = true : this.showConnectNow = false;
    this.subCategoryList = this.getSubcategoryList();
  }
  ngOnInit(): void {
    this.staticDataService.setAllOurWorkData(this.ourWorksItems);
    this.ourWorksItems[0].category === 'Mechanical' ? this.showConnectNow = true : this.showConnectNow = false;
    this.subCategoryList = this.getSubcategoryList();
    console.log(this.subCategoryList)
  }

  onFilteredValue(filteredType: string) {
    this.breadcumDataService.changeData(` Our Works - ${filteredType}`);
    this.ourWorksItems = this.staticDataService.getAllOurWorkData();
    if (filteredType == "All") {
      this.ourWorksItems = this.staticDataService.getAllOurWorkData();
      this.staticDataService.setFilteredData(this.ourWorksItems);
    } else {
      this.ourWorksItems = this.ourWorksItems.filter(
        (el: any) => el.subcategory == filteredType
      );
      this.staticDataService.setFilteredData(this.ourWorksItems);
    }
  }

  onSortBy(sortType: string) {
    this.ourWorksItems = this.staticDataService.getFilteredData();
    switch (sortType) {
      case "newly-added": this.ourWorksItems = this.staticDataService.getFilteredData(); break;
      case "oldest_ones": this.ourWorksItems = this.staticDataService.getFilteredData(); break;
      case "sort_by_A-Z": if (this.ourWorksItems.length > 1) {
        this.ourWorksItems = this.ourWorksItems.sort(
          (a: any, b: any) => (a.title[0] > b.title[0] ? 1 : -1)
        );
      } else {
        this.ourWorksItems = this.staticDataService.getFilteredData();
      }
        break;
      case "sort_by_Z-A": if (this.ourWorksItems.length > 1) {
        this.ourWorksItems = this.ourWorksItems.sort(
          (a: any, b: any) => (a.title[0] > b.title[0] ? -1 : 1)
        );
      } else {
        this.ourWorksItems = this.staticDataService.getFilteredData();
      } break;
      case "default": this.ourWorksItems = this.staticDataService.getFilteredData(); break;
    }
  }

  getSubcategoryList() {
    let list = [];
    for (let i in this.ourWorksItems) {
      if (this.ourWorksItems[i].subcategory != '') {
        list.push(this.ourWorksItems[i].subcategory);
      }
    }
    if ((this.ourWorksItems[0].category === 'Mechanical') || (this.ourWorksItems[0].category === 'Electronics')) {
      this.selectedTab = this.ourWorksItems[0].category;
      list = [...new Set(list)];
    } else {
      list.unshift("All");
      list = [...new Set(list)];
    }
    return list;
  }
  connect() {
    this.connectClicked = true;
  }
}
