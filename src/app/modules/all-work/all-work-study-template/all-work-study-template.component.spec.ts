import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllWorkStudyTemplateComponent } from './all-work-study-template.component';

describe('AllWorkStudyTemplateComponent', () => {
  let component: AllWorkStudyTemplateComponent;
  let fixture: ComponentFixture<AllWorkStudyTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllWorkStudyTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllWorkStudyTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
