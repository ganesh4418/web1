import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-button-tabs',
  templateUrl: './button-tabs.component.html',
  styleUrls: ['./button-tabs.component.scss']
})
export class ButtonTabsComponent implements OnInit {
  defaultSelected:string="All"
  @Input() categoryList:any;
  @Output() selectedButton= new EventEmitter<string>();
  constructor() { }

  ngOnInit(): void {
  }

  onSelectedButton(type:string){
    this.defaultSelected=type;
    this.selectedButton.emit(type);
  }

}
