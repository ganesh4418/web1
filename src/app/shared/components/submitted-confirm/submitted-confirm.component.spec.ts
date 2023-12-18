import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmittedConfirmComponent } from './submitted-confirm.component';

describe('SubmittedConfirmComponent', () => {
  let component: SubmittedConfirmComponent;
  let fixture: ComponentFixture<SubmittedConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubmittedConfirmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmittedConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
