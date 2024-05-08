import { TestBed } from '@angular/core/testing';

import { NameValidatorService } from './name-validator.service';

describe('NameValidatorService', () => {
  let service: NameValidatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NameValidatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});