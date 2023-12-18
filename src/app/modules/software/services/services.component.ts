import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {

  connectClicked: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }
  connect() {
    this.connectClicked = true;
  }
}
