import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignIntroductionComponent } from './design-introduction.component';

describe('DesignIntroductionComponent', () => {
  let component: DesignIntroductionComponent;
  let fixture: ComponentFixture<DesignIntroductionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DesignIntroductionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DesignIntroductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
