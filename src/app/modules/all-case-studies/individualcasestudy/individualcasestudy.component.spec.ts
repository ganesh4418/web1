import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualcasestudyComponent } from './individualcasestudy.component';

describe('IndividualcasestudyComponent', () => {
  let component: IndividualcasestudyComponent;
  let fixture: ComponentFixture<IndividualcasestudyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndividualcasestudyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndividualcasestudyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
