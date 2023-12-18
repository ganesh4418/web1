import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphicsdesignComponent } from './graphicsdesign.component';

describe('GraphicsdesignComponent', () => {
  let component: GraphicsdesignComponent;
  let fixture: ComponentFixture<GraphicsdesignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraphicsdesignComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphicsdesignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
