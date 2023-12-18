import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BreadcumDataService } from 'src/app/shared/services/breadcum-data.service';
import { StaticDataService } from 'src/app/shared/services/static-data.service';

@Component({
  selector: 'app-all-work',
  templateUrl: './all-work.component.html',
  styleUrls: ['./all-work.component.scss']
})
export class AllWorkComponent implements OnInit {
  // @Input() selectedPage: any;
  ourWorkItems: any;
  selectedTab: string = "All"
  subCategoryList: any;
  selectedButton: string = '';
  tabchanedrop: any = 'All';
  type: string = "";

  constructor(private staticDataService: StaticDataService, private breadcumDataService: BreadcumDataService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.type = this.route.snapshot.data.breadcrumb.includes("Products") ? "Products" : "Projects";
    this.ourWorkItems = this.staticDataService.getOurWorkData('', this.type);
    this.breadcumDataService.changeData(' All');
    this.breadcumDataService.setclass('colorchange');
    // this.getDataByCategory(this.selectedPage)
  }

  servicesView(tabname: any) {
    this.tabchanedrop = tabname;
    this.getDataByCategory(this.tabchanedrop)
    switch (tabname) {
      case "All": this.breadcumDataService.changeData(' All'); break;
      case "Design": this.breadcumDataService.changeData(' Design'); break;
      case "Software": this.breadcumDataService.changeData(' Software'); break;
      case "Mechanical": this.breadcumDataService.changeData(' Mechanical'); break;
      case "Electronics": this.breadcumDataService.changeData(' Electronics'); break;

      case "default": this.breadcumDataService.changeData(''); break;
    }
  }



  getDataByCategory(page: any) {
    console.log(page);
    switch (page) {
      case "All": this.ourWorkItems = this.staticDataService.getOurWorkData('', this.type);
        this.breadcumDataService.changeData('');
        break;
      case "Design": this.ourWorkItems = this.staticDataService.getOurWorkData('Design', this.type);
        this.breadcumDataService.changeData(` ${this.selectedTab} `);
        this.subCategoryList = this.getSubcategoryList(this.ourWorkItems);
        break;
      case "Software": this.ourWorkItems = this.staticDataService.getOurWorkData('Software', this.type);
        this.breadcumDataService.changeData(` ${this.selectedTab} `);
        this.subCategoryList = this.getSubcategoryList(this.ourWorkItems);
        break;
      case "Mechanical": this.ourWorkItems = this.staticDataService.getOurWorkData('Mechanical', this.type);
        this.breadcumDataService.changeData(` ${this.selectedTab} `);
        this.subCategoryList = this.getSubcategoryList(this.ourWorkItems);
        break;
      case "Electronics": this.ourWorkItems = this.staticDataService.getOurWorkData('Electronics', this.type);
        this.breadcumDataService.changeData(` ${this.selectedTab} `);
        this.subCategoryList = this.getSubcategoryList(this.ourWorkItems);
        break;
      default: this.ourWorkItems = this.staticDataService.getOurWorkData('', this.type);
        this.breadcumDataService.changeData('');
        break;
    }
  }
  getSubcategoryList(items: any) {
    let list = [];
    for (let i in this.ourWorkItems) {
      if (this.ourWorkItems[i].subcategory != "") {
        list.push(this.ourWorkItems[i].subcategory);
      }
    }

    list.unshift("All");
    list = [...new Set(list)];

    return list;
  }

  onSelectedButton(item: string) {
    this.selectedButton = item;
    //  this.breadcumDataService.changeData(` / ${item} `);
  }
}
