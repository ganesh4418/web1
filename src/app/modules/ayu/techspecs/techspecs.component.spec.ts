import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechspecsComponent } from './techspecs.component';

describe('TechspecsComponent', () => {
  let component: TechspecsComponent;
  let fixture: ComponentFixture<TechspecsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TechspecsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TechspecsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
