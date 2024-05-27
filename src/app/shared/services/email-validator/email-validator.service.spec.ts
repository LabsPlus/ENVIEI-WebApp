import { TestBed } from '@angular/core/testing';

import { EmailValidatorService } from './email-validator.service';

describe('EmailValidatorService', () => {
  let service: EmailValidatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmailValidatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
