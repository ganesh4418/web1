import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildyourteamComponent } from './buildyourteam.component';

describe('BuildyourteamComponent', () => {
  let component: BuildyourteamComponent;
  let fixture: ComponentFixture<BuildyourteamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuildyourteamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildyourteamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
