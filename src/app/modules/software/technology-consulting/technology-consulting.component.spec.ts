import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnologyConsultingComponent } from './technology-consulting.component';

describe('TechnologyConsultingComponent', () => {
  let component: TechnologyConsultingComponent;
  let fixture: ComponentFixture<TechnologyConsultingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TechnologyConsultingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TechnologyConsultingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
