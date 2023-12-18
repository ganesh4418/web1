import { Component, OnInit } from '@angular/core';
import { BreadcumDataService } from 'src/app/shared/services/breadcum-data.service';

@Component({
  selector: 'app-ayu',
  templateUrl: './ayu.component.html',
  styleUrls: ['./ayu.component.scss']
})
export class AyuComponent implements OnInit {

  tabchanedrop="Overviews"

  constructor(private breadcumDataService: BreadcumDataService) {
    this.tabchanedrop = "Overview";
   }

  ngOnInit(): void {
    this.servicesView('Overview');
    this.breadcumDataService.setclass('colorchange');
    this.breadcumDataService.changeData(' Ayu');
  }
  

  servicesView(tabname: any) {
    this.tabchanedrop = tabname;

  }
}
