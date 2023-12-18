import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllWorkSliderComponent } from './all-work-slider.component';

describe('AllWorkSliderComponent', () => {
  let component: AllWorkSliderComponent;
  let fixture: ComponentFixture<AllWorkSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllWorkSliderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllWorkSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
