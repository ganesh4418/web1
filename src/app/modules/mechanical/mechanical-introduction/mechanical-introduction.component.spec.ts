import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MechanicalIntroductionComponent } from './mechanical-introduction.component';

describe('MechanicalIntroductionComponent', () => {
  let component: MechanicalIntroductionComponent;
  let fixture: ComponentFixture<MechanicalIntroductionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MechanicalIntroductionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MechanicalIntroductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
