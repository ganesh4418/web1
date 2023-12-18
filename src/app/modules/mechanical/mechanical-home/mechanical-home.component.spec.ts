import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MechanicalHomeComponent } from './mechanical-home.component';

describe('MechanicalHomeComponent', () => {
  let component: MechanicalHomeComponent;
  let fixture: ComponentFixture<MechanicalHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MechanicalHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MechanicalHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
