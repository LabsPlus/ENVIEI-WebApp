import { TestBed } from '@angular/core/testing';

import { ApiKeysService } from './api-keys.service';

describe('ApiKeysService', () => {
  let service: ApiKeysService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiKeysService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
