import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfraServiceComponent } from './infra-service.component';

describe('InfraServiceComponent', () => {
  let component: InfraServiceComponent;
  let fixture: ComponentFixture<InfraServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfraServiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfraServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
