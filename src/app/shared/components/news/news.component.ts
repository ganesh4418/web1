import { Component, OnInit } from '@angular/core';
import { about } from 'src/app/core/mocks/about';
import { BreadcumDataService } from '../../services/breadcum-data.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  tabchanedrop: any = 'All';
  about: any[] = [];
  tabData: any[] = [];
  constructor(private breadcumDataService:BreadcumDataService) { }

  ngOnInit(): void {
    let data_about = new about();
    this.about = data_about.achivement;
    console.log(this.about);
    this.breadcumDataService.changeData(' All');
  }
  servicesView(tabname: any) {
    this.tabchanedrop = tabname;
    this.tabData = this.about.filter(function (item) {
      console.log(tabname, item.smallTitle);
      return tabname === item.smallTitle;
    })
    switch(tabname){
      case "All": this.breadcumDataService.changeData(' All'); break;
      case "Design": this.breadcumDataService.changeData(' Design'); break;
      case "Software": this.breadcumDataService.changeData(' Software'); break;
      case "Mechanical":  this.breadcumDataService.changeData(' Mechanical'); break;
      case "Electronics":  this.breadcumDataService.changeData(' Electronics'); break;
      case "default": this.breadcumDataService.changeData(''); break;
    }
  }

}
