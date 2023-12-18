import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyTemplateComponent } from './study-template.component';

describe('StudyTemplateComponent', () => {
  let component: StudyTemplateComponent;
  let fixture: ComponentFixture<StudyTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudyTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
