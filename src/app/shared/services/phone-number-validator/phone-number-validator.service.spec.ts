import { TestBed } from '@angular/core/testing';

import { PhoneNumberValidatorService } from './phone-number-validator.service';

describe('PhoneNumberValidatorService', () => {
  let service: PhoneNumberValidatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PhoneNumberValidatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
