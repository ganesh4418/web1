import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-all-work-slider',
  templateUrl: './all-work-slider.component.html',
  styleUrls: ['./all-work-slider.component.scss']
})
export class AllWorkSliderComponent implements OnInit {
  @Input() ourWorksItems:any;
  @Input() title!: string;

  constructor() { }

  ngOnInit(): void {
  }
  swiperConfig: any = {
    slidesPerView: 'auto',
    spaceBetween: 10,
    breakpoints: {
      1200: { 
        slidesPerView: 3
      },
      992: {
        slidesPerView: 3
      },
      768: {
        slidesPerView: 3
      }
    }
  }
}
