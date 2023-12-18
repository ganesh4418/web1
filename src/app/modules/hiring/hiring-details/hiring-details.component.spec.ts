import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HiringDetailsComponent } from './hiring-details.component';

describe('HiringDetailsComponent', () => {
  let component: HiringDetailsComponent;
  let fixture: ComponentFixture<HiringDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HiringDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HiringDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
