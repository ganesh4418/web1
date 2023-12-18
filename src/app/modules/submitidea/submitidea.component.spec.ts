import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitideaComponent } from './submitidea.component';

describe('SubmitideaComponent', () => {
  let component: SubmitideaComponent;
  let fixture: ComponentFixture<SubmitideaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubmitideaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitideaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
