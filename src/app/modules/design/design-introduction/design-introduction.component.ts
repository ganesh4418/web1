import { Component, OnInit } from '@angular/core';
import { CaseStudy } from 'src/app/core/mocks/case-study';
import { StaticDataService } from 'src/app/shared/services/static-data.service';
import {
  trigger, state, style, animate, transition, query, group
} from '@angular/animations';
import { BreadcumDataService } from 'src/app/shared/services/breadcum-data.service';

@Component({
  selector: 'app-design-introduction',
  templateUrl: './design-introduction.component.html',
  styleUrls: ['./design-introduction.component.scss'],
  animations: [
    trigger('fadeSlide', [
      // state('true' , style({ opacity: 1, transform: 'scale(1.0)' })),
      // state('false', style({ opacity: 0, transform: 'scale(0.0)'  })),
      transition(':enter', [
        group([
          query('.col-md-4:nth-child(odd)', [
            style({ opacity: 0, transform: 'translateX(-250px)' }),
            animate(
              5000,
              style({ opacity: 1, transform: 'translateX(0)' })
            )
          ]),
          query('.col-md-4:nth-child(even)', [
            style({ opacity: 0, transform: 'translateX(250px)' }),
            animate(
              5000,
              style({ opacity: 1, transform: 'translateX(0)' })
            )
          ])
        ])
      ]),
      transition(':leave', [
        group([
          query('.col-md-4:nth-child(odd)', [
            animate(
              5000,
              style({ opacity: 0, transform: 'translateX(-250px)' })
            )
          ]),
          query('.col-md-4:nth-child(even)', [
            animate(
              5000,
              style({ opacity: 0, transform: 'translateX(250px)' })
            ),
          ])
        ])
      ])
    ])
  ]
})
export class DesignIntroductionComponent implements OnInit {
  caseStudyItems: any;
  title: string = "";
  explore_design = false;
  hasAppeared: boolean = false;
  pageName: string = "Design"
  events = [
    {
      time: '08:00 - 09:00 AM',
      action: 'Eat Breakfast',
      bgColor: 'bg-amber-100'
    },
    {
      time: '10:00 - 11:00 AM',
      action: 'Buy Groceries',
      bgColor: 'bg-teal-100'
    }
  ]

  showEvents = true;
  gifUrl: string = "";

  constructor(private staticDataService: StaticDataService, private breadcumDataService: BreadcumDataService) { }

  ngOnInit(): void {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
    this.title = "Case Studies : Value Added Results";
    this.caseStudyItems = this.staticDataService.getCaseStudyData('Design');
    this.gifUrl = "assets/media/images/design/Design-Domain_2.gif";
    this.breadcumDataService.currentPage(this.pageName)
  }
  explore() {
    this.explore_design = true;
  }

  onAppear() {
    this.hasAppeared = true;
  }
}

