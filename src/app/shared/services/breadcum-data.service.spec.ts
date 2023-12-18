import { TestBed } from '@angular/core/testing';

import { BreadcumDataService } from './breadcum-data.service';

describe('BreadcumDataService', () => {
  let service: BreadcumDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BreadcumDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
