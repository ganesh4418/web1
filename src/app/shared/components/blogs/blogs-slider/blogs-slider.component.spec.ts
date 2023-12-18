import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogsSliderComponent } from './blogs-slider.component';

describe('BlogsSliderComponent', () => {
  let component: BlogsSliderComponent;
  let fixture: ComponentFixture<BlogsSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlogsSliderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogsSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
