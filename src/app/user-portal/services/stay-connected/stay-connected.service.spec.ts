import { TestBed } from '@angular/core/testing';

import { StayConnectedService } from './stay-connected.service';

describe('StayConnectedService', () => {
  let service: StayConnectedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StayConnectedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
