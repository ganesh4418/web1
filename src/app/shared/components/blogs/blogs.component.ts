import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BreadcumDataService } from '../../services/breadcum-data.service';
import { StaticDataService } from '../../services/static-data.service';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss', './../case-studies/case-studies.component.scss']
})
export class BlogsComponent implements OnInit {
  @Input() blogItems: any;
  selectedTab: string = '';
  subCategoryList: any;

  constructor(private staticDataService: StaticDataService, private breadcumDataService: BreadcumDataService, private router: Router) { }

  ngOnInit(): void {
    this.staticDataService.setAllBlogData(this.blogItems);
    this.subCategoryList = this.getSubcategoryList()
    this.staticDataService.setFilterTabForBlog('All')
  }

  onFilteredValue(filteredType: string) {
    this.staticDataService.setFilterTabForBlog(filteredType)
    this.breadcumDataService.changeData(` Blogs - ${filteredType}`);
    this.blogItems = this.staticDataService.getAllBlogData();
    if (filteredType == "All") {
      this.blogItems = this.staticDataService.getAllBlogData();
      this.staticDataService.setFilteredData(this.blogItems);
    }

    else {
      this.blogItems = this.blogItems.filter(
        (el: any) => el.subcategory == filteredType
      );
      this.staticDataService.setFilteredData(this.blogItems);
    }
  }

  onSortBy(sortType: string) {
    this.blogItems = this.staticDataService.getFilteredData();
    
    switch (sortType) {
      case "newly-added": this.blogItems = this.staticDataService.getFilteredData(); break;
      case "oldest_ones": this.blogItems = this.staticDataService.getFilteredData(); break;
      case "sort_by_A-Z": if (this.blogItems.length > 1) {
        this.blogItems = this.blogItems.sort(
          (a: any, b: any) => (a.title[0] > b.title[0] ? 1 : -1)
        );
      } else {
        this.blogItems = this.staticDataService.getFilteredData();
      }
        break;
      case "sort_by_Z-A": if (this.blogItems.length > 1) {
        this.blogItems = this.blogItems.sort(
          (a: any, b: any) => (a.title[0] > b.title[0] ? -1 : 1)
        );
      } else {
        this.blogItems = this.staticDataService.getFilteredData();
      } break;
      case "default": this.blogItems = this.staticDataService.getFilteredData(); break;
    }
  }

  getSubcategoryList() {
    let list = [];
    for (let i in this.blogItems) {
      list.push(this.blogItems[i].subcategory);
    }
    list.unshift("All");
    list = [...new Set(list)];
    return list;
  }

  onKeyPress(event: any) {
    let data = this.staticDataService.getFilteredData();
    const filterValue = event.target.value.toLowerCase();
    if (data != undefined && filterValue != '') {
      this.blogItems = data.filter((data: any) => data.title.toLowerCase().includes(filterValue));
      if (this.blogItems.length != 0)
        this.staticDataService.setFilteredData(this.blogItems)
    } else {
      this.blogItems = this.staticDataService.getAllBlogData();
      this.blogItems = this.blogItems.filter((data: any) => data.title.toLowerCase().includes(filterValue));
      this.staticDataService.setFilteredData(this.blogItems)
      this.staticDataService.setFilterTabForBlog('All')
    }
  }

  onReadMore(data: any) {
    // this.staticDataService.setFilterTabForBlog('All')
    this.breadcumDataService.changeData(' ' + data.title);
    this.staticDataService.setBlog(data);
    this.router.navigate(['/design/blogs']);
  }

}
