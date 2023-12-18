import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileWebDevelopementComponent } from './mobile-web-developement.component';

describe('MobileWebDevelopementComponent', () => {
  let component: MobileWebDevelopementComponent;
  let fixture: ComponentFixture<MobileWebDevelopementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MobileWebDevelopementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileWebDevelopementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
