import { TestBed } from '@angular/core/testing';

import { MobileinternetService } from './mobileinternet.service';

describe('MobileinternetService', () => {
  let service: MobileinternetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MobileinternetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
