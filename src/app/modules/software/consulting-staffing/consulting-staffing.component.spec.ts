import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultingStaffingComponent } from './consulting-staffing.component';

describe('ConsultingStaffingComponent', () => {
  let component: ConsultingStaffingComponent;
  let fixture: ComponentFixture<ConsultingStaffingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultingStaffingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultingStaffingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
