import { Component, OnInit } from '@angular/core';
import { StaticDataService } from 'src/app/shared/services/static-data.service';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-buildyourteam',
  templateUrl: './buildyourteam.component.html',
  styleUrls: ['./buildyourteam.component.scss']
})
export class BuildyourteamComponent implements OnInit {
  countriesList: any;
  youAreDropdown: any = ['Organisation', 'Studio', 'Student', 'Freelancer', 'Other'];
  domain: any = ['Design','Software','Mechanical','Electronics','Others'];
  idea: any = ['Idea Sharing','Designed And Engineered','Prototyped','Manufactured With Inventory','Already Selling'];

  todo = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];

  done = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];

  constructor(private staticDataService: StaticDataService) { }

  ngOnInit(): void {
    this.countriesList = this.staticDataService.getCountriesList();
    console.log(this.countriesList)
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

}
