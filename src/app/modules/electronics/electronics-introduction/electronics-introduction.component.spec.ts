import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectronicsIntroductionComponent } from './electronics-introduction.component';

describe('ElectronicsIntroductionComponent', () => {
  let component: ElectronicsIntroductionComponent;
  let fixture: ComponentFixture<ElectronicsIntroductionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElectronicsIntroductionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ElectronicsIntroductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
