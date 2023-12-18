import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-software',
  templateUrl: './software.component.html',
  styleUrls: ['./software.component.scss']
})
export class SoftwareComponent implements OnInit {
  tabchanedrop:any= 'introduction';
  constructor() { }

  ngOnInit(): void {
  }

  selectedTab = 0;
  servicesView(tabname: any) {
    this.tabchanedrop = tabname;
  }

}
