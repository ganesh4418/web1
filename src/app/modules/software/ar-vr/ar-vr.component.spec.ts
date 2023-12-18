import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArVrComponent } from './ar-vr.component';

describe('ArVrComponent', () => {
  let component: ArVrComponent;
  let fixture: ComponentFixture<ArVrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArVrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArVrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
