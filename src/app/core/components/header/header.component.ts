import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { sidebar } from '../../mocks/sidebar';
import { FilteredDataService } from 'src/app/shared/services/filtered-data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  leftmenu: any;
  mobile_menu = false;
  showBox:boolean=false;
  searchText:string='';
  coverflow = [
    {
      pic: "assets/media/images/header/india.png",
      name: "India"
    },
    {
      pic: "assets/media/images/header/south-africa 1.png",
      name: "South Africa"
    },
    {
      pic: "assets/media/images/header/zimbabwe.png",
      name: "zimbabwe"
    },
    {
      pic: "assets/media/images/header/australia.png",
      name: "Australia"
    }
  ]

  constructor(private router:Router, private filteredDataService:FilteredDataService) {
    let sidebar_menu = new sidebar();
    this.leftmenu = sidebar_menu.side_menu;
  }

  ngOnInit(): void {
  }

  toggleMenu() {
    this.mobile_menu = !this.mobile_menu;
  }

  onSearch(text:string){

    console.log(text)
    if(text!=''){
      this.filteredDataService.changeSearchText(text);
      this.router.navigate(['/search'])
    }
  }

  client: any = {
    slidesPerView: 'auto',
    spaceBetween: 1,
    breakpoints: {
      768: {
        effect: 'coverflow',
        slidesPerView: 'auto',
        coverflowEffect: {
          rotate: 0,
          stretch: 0,
          depth: 0,
          modifier: 0,
          slideShadows: false
        }
      },
      320: {
        effect: 'coverflow',
        slidesPerView: 1,
        coverflowEffect: {
          rotate: 0,
          stretch: 0,
          depth: 0,
          modifier: 0,
          slideShadows: false
        }
      }
    }
  }

}
