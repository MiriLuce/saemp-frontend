import { TestBed } from '@angular/core/testing';

import { CommonListService } from './commonList.service';

describe('CommonListService', () => {
  let service: CommonListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommonListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
