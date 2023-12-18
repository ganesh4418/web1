import { Component, OnInit } from '@angular/core';
import { BreadcumDataService } from 'src/app/shared/services/breadcum-data.service';
import { StaticDataService } from 'src/app/shared/services/static-data.service';
import { member } from './../../core/mocks/member'

@Component({
  selector: 'app-our-team',
  templateUrl: './our-team.component.html',
  styleUrls: ['./our-team.component.scss']
})
export class OurTeamComponent implements OnInit {
  categoryList: any;
  teamInfo: any;
  groupTeamData: any;
  users: ({ pic: string; name: string; position: string; category: string; linkedin: string; } | { pic: string; name: string; position: string; category: string; linkedin?: undefined; })[];
  constructor(private breadcumDataService: BreadcumDataService, private staticDataService: StaticDataService) {
    let members = new member();
    this.users = members.user;
    this.teamInfo = members.teaminfo;
  }

  ngOnInit(): void {
    this.breadcumDataService.changeData('');
    this.categoryList = this.getSubcategoryList();
    this.staticDataService.setAllTeamData(this.users);
    this.groupTeamInfo('All');
    this.breadcumDataService.setclass('');
  }

  onSelectedButton(filteredType: string) {
    this.users = this.staticDataService.getAllTeamData();
    this.groupTeamInfo(filteredType);

    if (filteredType == "All") {
      this.breadcumDataService.changeData('');
      let users = this.staticDataService.getAllTeamData();
      this.staticDataService.setFilteredData(users)
    }
    else {
      this.breadcumDataService.changeData(` Team ${filteredType}`);
      this.users = this.users.filter(
        (el: any) => el.category == filteredType
      );
      this.staticDataService.setFilteredData(this.users)
    }
  }

  getSubcategoryList() {
    let list = [];
    for (let i in this.users) {
      list.push(this.users[i].category);
    }
    list.unshift("All");
    list = [...new Set(list)];
    return list;
  }

  groupTeamInfo(type: string) {
    for (let i in this.teamInfo) {
      if (type == this.teamInfo[i].category) {
        this.groupTeamData = { image: this.teamInfo[i].pic, dis: this.teamInfo[i].discription, team: this.teamInfo[i].category }
      }
    }

  }

}
