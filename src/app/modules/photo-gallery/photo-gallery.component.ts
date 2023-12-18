import { Component, OnInit } from '@angular/core';
import { BreadcumDataService } from 'src/app/shared/services/breadcum-data.service';
import { StaticDataService } from 'src/app/shared/services/static-data.service';

@Component({
  selector: 'app-photo-gallery',
  templateUrl: './photo-gallery.component.html',
  styleUrls: ['./photo-gallery.component.scss']
})
export class PhotoGalleryComponent implements OnInit {

  galleryItems: any;
  selectedTab: string = "All"
  subCategoryList: any;
  tabchanedrop: any = 'All';

  constructor(private staticDataService: StaticDataService, private breadcumDataService: BreadcumDataService) { }

  ngOnInit(): void {
    this.breadcumDataService.changeData('All');
    this.galleryItems = this.staticDataService.getGalleryData('');
    this.breadcumDataService.setclass('colorchange');
  }

  // onChangeTab(event: any) {
  //   this.selectedTab = event.tab.textLabel;
  //   console.log(this.selectedTab)
  //   this.breadcumDataService.changeData(event.tab.textLabel);
  //   switch (event.tab.textLabel) {
  //     case "All": this.galleryItems = this.staticDataService.getGalleryData('');
  //       break;
  //     case "Events": this.galleryItems = this.staticDataService.getGalleryData('Events & Exhibitions');
  //       this.subCategoryList = this.getSubcategoryList(this.galleryItems);
  //       break;
  //     case "Celebrations": this.galleryItems = this.staticDataService.getGalleryData('Celebrations');
  //       this.subCategoryList = this.getSubcategoryList(this.galleryItems);
  //       break;
  //     case "Others": this.galleryItems = this.staticDataService.getGalleryData('Others');
  //       this.subCategoryList = this.getSubcategoryList(this.galleryItems);
  //       break;
  //     default: this.galleryItems = this.staticDataService.getGalleryData('');
  //       this.breadcumDataService.changeData('');
  //       break;
  //   }
  // }

  servicesView(tabname: any) {
    this.tabchanedrop = tabname;
    switch (tabname) {
      case "All": this.breadcumDataService.changeData(' All');
        this.galleryItems = this.staticDataService.getGalleryData('');
        break;
      case "Events": this.breadcumDataService.changeData(' Events');
        this.galleryItems = this.staticDataService.getGalleryData('Events & Exhibitions');
        break;
      case "Celebrations": this.breadcumDataService.changeData(' Celebrations');
        this.galleryItems = this.staticDataService.getGalleryData('Celebrations');
        break;
      case "Others": this.breadcumDataService.changeData(' Others');
        this.galleryItems = this.staticDataService.getGalleryData('Others');
        break;
      case "default": this.breadcumDataService.changeData('');
        this.staticDataService.getGalleryData('');
        break;
    }
  }

  getSubcategoryList(items: any) {
    let list = [];
    for (let i in this.galleryItems) {
      list.push(this.galleryItems[i].subcategory);
    }
    list.unshift("All");
    list = [...new Set(list)];
    return list;
  }
}