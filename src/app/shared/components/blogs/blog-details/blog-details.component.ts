import { Component, OnInit } from '@angular/core';
import { StaticDataService } from 'src/app/shared/services/static-data.service';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.scss']
})
export class BlogDetailsComponent implements OnInit {
  blog: any;
  blogsItems: any;
  title: string = "";
  constructor(private staticDataService: StaticDataService) { }

  ngOnInit(): void {
    this.staticDataService.getBlog().subscribe(
      data => {
        this.blog = data;
        window.scroll({
          top: 0,
          left: 0,
          behavior: 'smooth'
        })
      }
    );
    this.title = 'Recommended Blogs';
    this.blogsItems = this.staticDataService.getAllBlogData();
  }

}
