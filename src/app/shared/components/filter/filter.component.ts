import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { StaticDataService } from '../../services/static-data.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit, OnDestroy {
  sortBy: any = [
    { value: 'default', viewValue: 'Default' },
    { value: 'newly-added', viewValue: 'Newly Added' },
    { value: 'oldest_ones', viewValue: 'Oldest Ones' },
    { value: 'sort_by_A-Z', viewValue: 'Sort by A-Z' },
    { value: 'sort_by_Z-A', viewValue: 'Sort by Z-A' },
  ];
  sortItem: string = 'Default';
  selectedItem: string = "All"
  @Input() selectedTab!: string;
  @Input() subCategoryList: any;
  @Output() selectItem = new EventEmitter<string>();
  @Output() selectedSortBy = new EventEmitter<string>();
  subscription!: Subscription;

  constructor(private staticDataService: StaticDataService) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    if(this.subCategoryList!=undefined)
    this.subCategoryList.includes('All') ? this.selectedItem = 'All' : this.selectedItem = this.subCategoryList[0];
    this.subscription = this.staticDataService.getFilterTabForBlog().subscribe((value) => {
      this.selectedItem = value;
    })
    if (this.selectedItem !== 'All') {
      this.onFilterButton(this.subCategoryList[0]);
    }
  }

  onSortBy(type: string) {
    switch (type) {
      case 'default': this.sortItem = "Default"; this.selectedSortBy.emit(type);
      console.log(this.selectedSortBy.emit(type))
      break;
      
      case 'newly-added': this.sortItem = "Newly Added"; this.selectedSortBy.emit(type); 
      console.log(this.selectedSortBy.emit(type))
      break;
      
      case 'oldest_ones': this.sortItem = "Oldest Ones"; this.selectedSortBy.emit(type); break;
      case 'sort_by_A-Z': this.sortItem = "Sort by A-Z"; this.selectedSortBy.emit(type); break;
      case 'sort_by_Z-A': this.sortItem = "Sort by Z-A"; this.selectedSortBy.emit(type); break;
    }
  }

  onFilterButton(type: string) {
    this.selectedItem = type;
    this.selectItem.emit(type);
    console.log(type);
    
  }


}
