import { TestBed } from '@angular/core/testing';

import { EngagmentAchatService } from './engagment-achat.service';

describe('EngagmentAchatService', () => {
  let service: EngagmentAchatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EngagmentAchatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
