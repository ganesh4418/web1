import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StaticDataService } from 'src/app/shared/services/static-data.service';
import { ImagePopupComponent } from '../image-popup/image-popup.component';


@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {


  @Input() galleryItems: any;
  @Input() subCategoryList: any;
  @Input() selectedTab!: string;
  caseStudyAllItems: any;
  subCategory: any;
  showMultiImageIcon: boolean = false;
  constructor(private staticDataService: StaticDataService, public dialog: MatDialog, private dialogRef: MatDialog) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.caseStudyAllItems = this.galleryItems;
    this.galleryItems.length > 1 ? this.showMultiImageIcon = true : this.showMultiImageIcon = false;
    this.staticDataService.setAllCaseStudyData(this.galleryItems)

  }

  ngOnInit(): void {
    this.caseStudyAllItems = this.galleryItems;
    this.staticDataService.setAllCaseStudyData(this.galleryItems)
  }

  onFilteredValue(filteredType: string) {
    this.galleryItems = this.staticDataService.getAllCaseStudyData();
    if (filteredType == "All") {

      this.galleryItems = this.staticDataService.getAllCaseStudyData();
      this.staticDataService.setFilteredData(this.galleryItems)
    }
    else {
      this.galleryItems = this.galleryItems.filter(
        (el: any) => el.subcategory == filteredType
      );
      this.staticDataService.setFilteredData(this.galleryItems)
    }
  }

  onSortBy(sortType: string) {
    this.galleryItems = this.staticDataService.getFilteredData();
    switch (sortType) {
      case "newly-added": this.galleryItems = this.staticDataService.getFilteredData(); break;
      case "oldest_ones": this.galleryItems = this.staticDataService.getFilteredData(); break;
      case "sort_by_A-Z": if (this.galleryItems.length > 1) {
        this.galleryItems = this.galleryItems.sort(
          (a: any, b: any) => (a.title[0] > b.title[0] ? 1 : -1)
        );
      } else {
        this.galleryItems = this.staticDataService.getFilteredData();
      }
        break;
      case "sort_by_Z-A": if (this.galleryItems.length > 1) {
        this.galleryItems = this.galleryItems.sort(
          (a: any, b: any) => (a.title[0] > b.title[0] ? -1 : 1)
        );
      } else {
        this.galleryItems = this.staticDataService.getFilteredData();
      } break;
      case "default": this.galleryItems = this.staticDataService.getFilteredData(); break;
    }
  }
  openImage(info: any) {
    console.log(info)
    console.log(this.galleryItems)
    const dialogRef = this.dialog.open(ImagePopupComponent, {
      width: '100%',
      height: '100%',
      maxWidth: '100vw',
      panelClass: 'image-popup',
      data: { currentImageInfo: info, allImageInfo:info.allPics },
    });
    dialogRef.afterClosed().subscribe(result => {

    });
  }
}
