import { Component, OnInit } from '@angular/core';
import { Designation } from 'src/app/core/mocks/designations';
import { Domain } from 'src/app/core/mocks/designations';
import { Location } from 'src/app/core/mocks/designations';
import { Position } from 'src/app/core/mocks/hiring';
import { BreadcumDataService } from 'src/app/shared/services/breadcum-data.service';
import { FilteredDataService } from 'src/app/shared/services/filtered-data.service';
import { StaticDataService } from 'src/app/shared/services/static-data.service';

@Component({
  selector: 'app-hiring',
  templateUrl: './hiring.component.html',
  styleUrls: ['./hiring.component.scss', './../our-team/our-team.component.scss']
})
export class HiringComponent implements OnInit {
  open_hiring: any;
  hiringItems: any;
  sortItem: string = 'Default';
  location: any = new Location().locations;
  domain: any = new Domain().domains;
  designation: any = new Designation().designations;
  selectedLocation = 'All';
  selectedDomain = 'All';
  selectedDesignation = 'All';
  filteredOpening: any = [];
  searchText:string='';
  constructor(private breadcumDataService: BreadcumDataService, private filteredDataService: FilteredDataService, private staticDataService: StaticDataService) {
    this.getAllData();
  }

  ngOnInit(): void {
    this.breadcumDataService.changeData('');
    let hiring = new Position();
    this.open_hiring = hiring.opening;
    this.filteredOpening = hiring.opening;
    for (let i in hiring.opening) {
      // this.location.push(hiring.opening[i].location);
      // this.domain.push(hiring.opening[i].position);
      // this.designation.push(hiring.opening[i].name)
    }
    this.location = this.location.filter((item: any, index: any) => this.location.indexOf(item) === index);
    this.domain = this.domain.filter((item: any, index: any) => this.domain.indexOf(item) === index);
    this.designation = this.designation.filter((item: any, index: any) => this.designation.indexOf(item) === index);
  }

  onDeatil(index: number) {
    this.filteredDataService.changeJobData(index);
  }

  getAllData() {
    let hiring = new Position();
    this.open_hiring = hiring.opening;
  }



  onSortBy(sortType: string) {
    this.getAllData();
    switch (sortType) {
      case "newly-added": this.getAllData(); break;
      case "oldest_ones": this.getAllData(); break;
      case "sort_by_A-Z": if (this.filteredOpening.length > 1) {
        this.filteredOpening = this.filteredOpening.sort(
          (a: any, b: any) => (a.name[0] > b.name[0] ? 1 : -1)
        );
      }
        break;
      case "sort_by_Z-A": if (this.filteredOpening.length > 1) {
        this.filteredOpening = this.filteredOpening.sort(
          (a: any, b: any) => (a.name[0] > b.name[0] ? -1 : 1)
        );
      } break;
      case "default": this.getAllData(); break;
    }
  }

  onKeyPress(event: any) {
    this.searchText = event.target.value;
    let data = this.open_hiring;
    const filterValue = event.target.value.toLowerCase();
    if (data != undefined && filterValue != '') {
      this.filteredOpening = data.filter((data: any) => (data.name.toLowerCase().includes(filterValue) || data.position.toLowerCase().includes(filterValue)));
    } else {
      this.getAllData();
      this.filteredOpening = this.open_hiring.filter((data: any) => (data.name.toLowerCase().includes(filterValue) || data.position.toLowerCase().includes(filterValue)));
    }
  }

  onLocation(location: string) {
    this.searchText = location;
    this.selectedLocation = location;
    this.selectedDomain = 'All';
    this.selectedDesignation = 'All';
    if (location == 'All') {
      this.filteredOpening = this.open_hiring;
    }
    else
      this.filteredOpening = this.open_hiring.filter((data: any) => data.location.toLowerCase().includes(location.toLowerCase()));

    if (location == 'All' && this.selectedDesignation == 'All' && this.selectedDomain == 'All')
      this.filteredOpening = this.open_hiring;
    this.getFilteredDomain(this.filteredOpening);
  }

  onDomain(domain: string) {
    this.searchText = domain;
    this.selectedDomain = domain;
    this.selectedDesignation = 'All';
    if (domain == 'All')
      this.filteredOpening = this.open_hiring.filter((data: any) => data.location.toLowerCase().includes(this.selectedLocation.toLowerCase()));
    else if (this.selectedLocation == 'All')
      this.filteredOpening = this.open_hiring.filter((data: any) => (data.position.toLowerCase().includes(domain.toLowerCase())));
    else
      this.filteredOpening = this.open_hiring.filter((data: any) => (data.position.toLowerCase().includes(domain.toLowerCase()) && data.location.toLowerCase().includes(this.selectedLocation.toLowerCase())));

    console.log(domain == 'All' && this.selectedLocation == 'All' && this.selectedDesignation == 'All')
    if (domain == 'All' && this.selectedLocation == 'All' && this.selectedDesignation == 'All')
      this.filteredOpening = this.open_hiring;
    this.getFilteredDesignation(this.filteredOpening);
  }

  onDesignation(designation: string) {
    this.searchText = designation;
    this.selectedDesignation = designation;
    if (designation == 'All')
      this.filteredOpening = this.open_hiring.filter((data: any) => (data.position.toLowerCase().includes(this.selectedDomain.toLowerCase()) && data.location.toLowerCase().includes(this.selectedLocation.toLowerCase())));
    else if (this.selectedDomain == 'All')
      this.filteredOpening = this.open_hiring.filter((data: any) => (data.name.toLowerCase().includes(designation.toLowerCase()) && data.location.toLowerCase().includes(this.selectedLocation.toLowerCase())));
    else if (this.selectedLocation == 'All')
      this.filteredOpening = this.open_hiring.filter((data: any) => (data.name.toLowerCase().includes(designation.toLowerCase()) && data.position.toLowerCase().includes(this.selectedDomain.toLowerCase())));
    else
      this.filteredOpening = this.open_hiring.filter((data: any) => (data.name.toLowerCase().includes(designation.toLowerCase()) && data.location.toLowerCase().includes(this.selectedLocation.toLowerCase()) && data.position.toLowerCase().includes(this.selectedDomain.toLowerCase())));

    if (this.selectedLocation == 'All' && designation == 'All')
      this.filteredOpening = this.open_hiring.filter((data: any) => (data.position.toLowerCase().includes(this.selectedDomain.toLowerCase())));
    else if (this.selectedDomain == 'All' && designation == 'All')
      this.filteredOpening = this.open_hiring.filter((data: any) => (data.location.toLowerCase().includes(this.selectedLocation.toLowerCase())));
    else if (this.selectedDomain == 'All' && this.selectedLocation == 'All')
      this.filteredOpening = this.open_hiring.filter((data: any) => (data.name.toLowerCase().includes(designation.toLowerCase())));

    if (designation == 'All' && this.selectedLocation == 'All' && this.selectedDomain == 'All')
      this.filteredOpening = this.open_hiring;
  }

  getFilteredDomain(hiring: any) {
    console.log(hiring)
    this.domain = ['All'];
    this.designation = ['All'];
    for (let i in hiring) {
      this.domain.push(hiring[i].position);
      this.designation.push(hiring[i].name)
    }
    this.domain = this.domain.filter((item: any, index: any) => this.domain.indexOf(item) === index);
    this.designation = this.designation.filter((item: any, index: any) => this.designation.indexOf(item) === index);
  }

  getFilteredDesignation(hiring: any) {
    this.designation = ['All'];
    for (let i in hiring) {
      this.designation.push(hiring[i].name)
    }
    this.designation = this.designation.filter((item: any, index: any) => this.designation.indexOf(item) === index);
  }

}
