import { TestBed } from '@angular/core/testing';

import { AdherentsService } from './adherents.service';

describe('AdherentsService', () => {
  let service: AdherentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdherentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
