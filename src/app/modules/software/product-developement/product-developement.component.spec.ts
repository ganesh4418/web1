import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDevelopementComponent } from './product-developement.component';

describe('ProductDevelopementComponent', () => {
  let component: ProductDevelopementComponent;
  let fixture: ComponentFixture<ProductDevelopementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductDevelopementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDevelopementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
