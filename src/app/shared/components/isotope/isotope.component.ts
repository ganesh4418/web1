import { trigger, transition, style, animate, AnimationBuilder, AnimationPlayer, query, stagger } from '@angular/animations';
import { Component, ElementRef, HostBinding, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormControl } from '@angular/forms';
import { startWith, debounceTime, map, tap } from 'rxjs/operators';


export interface Hero {
  id: number;
  name: string;
}

export const HEROES: Hero[] = [
  { id: 11, name: 'Dr Nice' },
  { id: 12, name: 'Narco' },
  { id: 13, name: 'Bombasto' },
  { id: 14, name: 'Celeritas' },
  { id: 15, name: 'Magneta' },
  { id: 16, name: 'RubberMan' },
  { id: 17, name: 'Dynama' },
  { id: 18, name: 'Dr IQ' },
  { id: 19, name: 'Magma' },
  { id: 20, name: 'Tornado' }
];

@Component({
  selector: 'app-isotope',
  templateUrl: './isotope.component.html',
  styleUrls: ['./isotope.component.scss'],
  animations:[
    trigger('pageAnimations', [
      transition(':enter', [
        query('.hero, form', [
          style({opacity: 0, transform: 'translateY(-100px)'}),
          stagger(-30, [
            animate('500ms cubic-bezier(0.35, 0, 0.25, 1)', style({ opacity: 1, transform: 'none' }))
          ])
        ])
      ])
    ]),
    trigger('filterAnimation', [
      transition(':enter, * => 0, * => -1', []),
      transition(':increment', [
        query(':enter', [
          style({ opacity: 0, width: '0px' }),
          stagger(50, [
            animate('300ms ease-out', style({ opacity: 1, width: '*' })),
          ]),
        ], { optional: true })
      ]),
      transition(':decrement', [
        query(':leave', [
          stagger(50, [
            animate('300ms ease-out', style({ opacity: 0, width: '0px' })),
          ]),
        ])
      ]),
    ]),
  ]
})
export class IsotopeComponent implements OnInit {
  @HostBinding('@pageAnimations')
  public animatePage = true;

  heroTotal = -1;
  get heroes() { return this._heroes; }
  private _heroes: Hero[] = [];

  ngOnInit() {
    this._heroes = HEROES;
  }

  updateCriteria(criteria: string) {
    criteria = criteria ? criteria.trim() : '';

    this._heroes = HEROES.filter(hero => hero.name.toLowerCase().includes(criteria.toLowerCase()));
    const newTotal = this.heroes.length;

    if (this.heroTotal !== newTotal) {
      this.heroTotal = newTotal;
    } else if (!criteria) {
      this.heroTotal = -1;
    }
  }
}
