import { Component, OnInit } from '@angular/core';
import { StaticDataService } from 'src/app/shared/services/static-data.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  title = "Other products";
  ourWorksItems: any;
  constructor(private staticDataService: StaticDataService) { }

  ngOnInit(): void {

    this.ourWorksItems = this.staticDataService.getProductData('Product');
    
  
  }

}
